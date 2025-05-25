
export interface ImageAnalysis {
  url: string;
  element?: HTMLImageElement;
  issues?: string[];
  dimensions?: {
    natural: { width: number; height: number },
    display: { width: number; height: number }
  };
  downloadSize?: number;
  format?: string | number;
  quality?: string | number;
  width?: string | number;
  height?: string | number;
  isOptimized?: boolean;
  isResponsive?: boolean;
  suggestedImprovements?: string[];
  estimatedSizeReduction?: number;
}

export interface ImageDiagnosticResult {
  url?: string;
  issues?: string[];
  recommendations?: string[];
  optimizationPotential?: number;
  summary?: {
    totalImagesRendered: number;
    totalImagesWithIssues: number;
    totalDownloadedBytes: number;
    estimatedPerformanceImpact: string;
  };
  detailedIssues?: ImageAnalysis[];
}

export interface FixBlurryImagesOptions {
  quality?: number;
  format?: string;
  skipOptimized?: boolean;
  forceOptimize?: boolean;
  debug?: boolean;
  placeholderColor?: string;
}

export interface PreloadImageDefinition {
  src: string;
  id: string;
  alt: string;
  category: string;
  preloadPriority?: number;
  tags?: string[];
  quality?: number;
}

export interface PreloadOptions {
  quality?: number;
  priority?: 'high' | 'low' | 'auto';
  categories?: string[];
  limit?: number;
  timeout?: number;
  batchSize?: number;
  format?: string;
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}

// Additional missing types
export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  url: string;
}

export interface ImageCacheEntry {
  url: string;
  metadata: ImageMetadata;
  timestamp: number;
  blob?: Blob;
}

export interface ImageSettings {
  quality: number;
  format: string;
  width?: number;
  height?: number;
}

export interface ImageOptimizationOptions {
  quality?: number;
  format?: string;
  width?: number;
  height?: number;
  progressive?: boolean;
  lossless?: boolean;
}
