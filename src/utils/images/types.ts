
/**
 * TypeScript type definitions for image utilities
 */

export interface FixBlurryImagesOptions {
  quality?: number;
  format?: 'auto' | 'webp' | 'avif';
  skipOptimized?: boolean;
  forceOptimize?: boolean;
  debug?: boolean;
  placeholderColor?: string;
}

export interface ImageDiagnosticResult {
  totalImages: number;
  optimizedImages: number;
  blurryImages: number;
  largeImages: number;
  recommendations: string[];
}

export interface ImageMetrics {
  url: string;
  naturalWidth: number;
  naturalHeight: number;
  displayWidth: number;
  displayHeight: number;
  isOptimized: boolean;
  isBlurry: boolean;
  fileSize?: number;
}

export interface OptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'limit';
  dpr?: number;
}
