
import { type BankImage } from '@/data/imageBank';
import { type ImageCacheEntry } from './types';

let imageCache: Map<string, ImageCacheEntry> = new Map();
let imageBank: BankImage[] = [];

export const initializeImageCache = () => {
  if (typeof window !== 'undefined') {
    // Load bank from imageBank file
    import('@/data/imageBank').then(module => {
      imageBank = module.imageBank || [];
      console.log(`[Image Cache] Initialized with ${imageBank.length} bank images`);
    });
  }
};

export const isImageCached = (url: string): boolean => {
  const entry = imageCache.get(url);
  return entry?.preloaded === true && entry?.loadStatus === 'loaded';
};

export const markImageAsPreloaded = (url: string): void => {
  const existing = imageCache.get(url);
  if (existing) {
    imageCache.set(url, {
      ...existing,
      preloaded: true,
      lastAccessed: Date.now(),
      loadStatus: 'loaded'
    });
  } else {
    imageCache.set(url, {
      url,
      timestamp: Date.now(),
      preloaded: true,
      lastAccessed: Date.now(),
      loadStatus: 'loaded'
    });
  }
};

export const getImageMetadata = (url: string): BankImage | undefined => {
  return imageBank.find(img => img.src === url);
};

export const cleanupImageCache = (): void => {
  const now = Date.now();
  const maxAge = 30 * 60 * 1000; // 30 minutes
  
  for (const [url, entry] of imageCache.entries()) {
    if (entry.lastAccessed && now - entry.lastAccessed > maxAge) {
      imageCache.delete(url);
    }
  }
};

// Auto cleanup every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(cleanupImageCache, 10 * 60 * 1000);
}
