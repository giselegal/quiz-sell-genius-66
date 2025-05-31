
export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  url: string;
  quality?: number;
  alt?: string;
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
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  width?: number;
  height?: number;
  lazy?: boolean;
}

export interface PreloadOptions {
  quality?: number;
  batchSize?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}

export interface ImageAnalysis {
  url: string;
  loadTime: number;
  size: number;
  format: string;
  cached: boolean;
}

export interface ImageDiagnosticResult {
  totalImages: number;
  averageLoadTime: number;
  totalSize: number;
  cacheHitRate: number;
  slowImages: ImageAnalysis[];
}
