
export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  url: string;
  quality?: number;
}

export interface ImageCacheEntry {
  url: string;
  metadata: ImageMetadata;
  timestamp: number;
  hits: number;
}

export interface ImageSettings {
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
  sizes: number[];
  lazy: boolean;
}

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  lazy?: boolean;
}

export interface PreloadOptions {
  quality?: number;
  batchSize?: number;
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}
