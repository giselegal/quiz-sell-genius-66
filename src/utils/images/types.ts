
export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'crop';
}

export interface PreloadOptions {
  quality?: number;
  batchSize?: number;
}

export interface ImageCacheEntry {
  url: string;
  timestamp: number;
  preloaded: boolean;
  lastAccessed?: number;
  loadStatus?: 'loading' | 'loaded' | 'error';
}

export interface ImageSettings extends ImageOptimizationOptions {
  responsive?: boolean;
}

export interface PreloadImageDefinition {
  id: string;
  url: string;
  priority: number;
  category: string;
}

export interface FixBlurryImagesOptions {
  quality?: number;
  format?: string;
  width?: number;
  height?: number;
}
