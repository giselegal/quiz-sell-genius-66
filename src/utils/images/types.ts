
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
  lastAccessed?: number;
  loadStatus?: 'loading' | 'loaded' | 'error';
  imageElement?: HTMLImageElement;
}

export interface ImageSettings {
  quality: number;
  format: 'webp' | 'jpeg' | 'png' | 'auto';
  sizes: number[];
  lazy: boolean;
  width?: number;
  height?: number;
  crop?: string;
  responsive?: boolean;
}

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  width?: number;
  height?: number;
  lazy?: boolean;
  crop?: string;
}

export interface PreloadOptions {
  quality?: number;
  batchSize?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  timeout?: number;
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}

export interface PreloadImageDefinition {
  url: string;
  priority?: number;
  sizes?: string;
}

export interface FixBlurryImagesOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  threshold?: number;
}

export interface ImageAnalysis {
  url: string;
  format: string;
  quality: string;
  width: string;
  height: string;
  isOptimized: boolean;
  isResponsive: boolean;
  suggestedImprovements: string[];
  estimatedSizeReduction?: number;
}

export interface ImageDiagnosticResult {
  summary: {
    totalImagesRendered: number;
    totalImagesWithIssues: number;
    totalDownloadedBytes: number;
    estimatedPerformanceImpact: string;
  };
  detailedIssues: Array<{
    url: string;
    element: HTMLImageElement;
    issues: string[];
    dimensions?: {
      natural: { width: number; height: number };
      display: { width: number; height: number };
    };
  }>;
}
