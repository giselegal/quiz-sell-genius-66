import { ImageCacheEntry, ImageMetadata } from './types';

class ImageCacheManager {
  private cache: Map<string, ImageCacheEntry> = new Map();
  private maxCacheSize = 100;
  private cacheDuration = 1000 * 60 * 60; // 1 hour

  private evictLeastUsed(): void {
    if (this.cache.size >= this.maxCacheSize) {
      let keyToEvict: string | null = null;
      let leastUsed = Number.MAX_SAFE_INTEGER;

      this.cache.forEach((entry, key) => {
        if (entry.hits < leastUsed) {
          leastUsed = entry.hits;
          keyToEvict = key;
        }
      });

      if (keyToEvict) {
        this.cache.delete(keyToEvict);
      }
    }
  }

  get(url: string): ImageCacheEntry | undefined {
    const entry = this.cache.get(url);
    if (entry) {
      if (this.shouldEvict(entry)) {
        this.cache.delete(url);
        return undefined;
      }
      entry.hits++;
      entry.lastAccessed = Date.now();
      this.cache.set(url, entry);
      return entry;
    }
    return undefined;
  }

  set(url: string, metadata: ImageMetadata): void {
    this.evictLeastUsed();
    const entry: ImageCacheEntry = {
      url,
      metadata,
      timestamp: Date.now(),
      hits: 0,
      lastAccessed: Date.now(),
      loadStatus: 'loaded'
    };
    this.cache.set(url, entry);
  }

  remove(url: string): void {
    this.cache.delete(url);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  private shouldEvict(entry: ImageCacheEntry): boolean {
    const isExpired = Date.now() - entry.timestamp > this.cacheDuration;
    const isUnused = (entry.lastAccessed || 0) < Date.now() - this.cacheDuration / 2;
    const hasError = entry.loadStatus === 'error';
    
    return isExpired || isUnused || hasError;
  }

  async preloadImage(url: string, metadata?: Partial<ImageMetadata>): Promise<ImageCacheEntry> {
    const existingEntry = this.cache.get(url);
    if (existingEntry && existingEntry.loadStatus === 'loaded') {
      existingEntry.hits++;
      existingEntry.lastAccessed = Date.now();
      return existingEntry;
    }

    const entry: ImageCacheEntry = {
      url,
      metadata: metadata as ImageMetadata || {
        width: 0,
        height: 0,
        format: 'unknown',
        size: 0,
        url
      },
      timestamp: Date.now(),
      hits: 1,
      lastAccessed: Date.now(),
      loadStatus: 'loading'
    };

    this.cache.set(url, entry);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        entry.loadStatus = 'loaded';
        entry.metadata = {
          ...entry.metadata,
          width: img.width,
          height: img.height
        };
        this.cache.set(url, entry);
        resolve(entry);
      };

      img.onerror = () => {
        entry.loadStatus = 'error';
        this.cache.set(url, entry);
        reject(new Error(`Failed to load image: ${url}`));
      };
    });
  }
}

export const imageCacheManager = new ImageCacheManager();
