
export interface ImageAnalysis {
  url: string;
  element: HTMLImageElement;
  issues: string[];
  dimensions?: {
    natural: { width: number; height: number },
    display: { width: number; height: number }
  };
  downloadSize?: number;
  format?: string;
  isOptimized?: boolean;
  isResponsive?: boolean;
  quality?: number;
  width?: number;
  height?: number;
  suggestedImprovements?: string[];
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

// Add PreloadOptions interface to fix imports
export interface PreloadOptions {
  quality?: number;
  priority?: 'high' | 'low' | 'auto';
  categories?: string[];
  limit?: number;
  timeout?: number;
  batchSize?: number;
  format?: string;
}
