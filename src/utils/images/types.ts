
export interface ImageMetadata {
  width?: number;
  height?: number;
  format?: string;
  size?: number;
  isLoaded?: boolean;
  alt?: string;
}

export interface ImageCacheEntry {
  url: string;
  metadata: ImageMetadata;
  timestamp: number;
}

export interface ImageSettings {
  quality?: number;
  format?: string;
  width?: number;
  height?: number;
}

export interface ImageOptimizationOptions {
  quality?: number;
  format?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
}

export interface PreloadOptions {
  quality?: number;
  batchSize?: number;
  priority?: number;
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}
