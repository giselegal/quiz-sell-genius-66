
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
