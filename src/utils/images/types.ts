export interface ImageMetadata {
  url: string;
  width?: number;
  height?: number;
  format?: string;
  size?: number;
  quality?: number;
}

export interface ImageCacheEntry {
  url: string;
  timestamp: number;
  metadata: ImageMetadata;
  blob?: Blob;
}

export interface ImageSettings {
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
  maxWidth?: number;
  maxHeight?: number;
}

export interface ImageOptimizationOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export interface PreloadOptions {
  quality?: number;
  batchSize?: number;
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}

export interface ImageAnalysis {
  dimensions: {
    width: number;
    height: number;
  };
  format: string;
  size: number;
  quality: number;
}

export interface ImageDiagnosticResult {
  url: string;
  status: 'success' | 'error' | 'loading';
  analysis?: ImageAnalysis;
  error?: string;
  loadTime?: number;
}
