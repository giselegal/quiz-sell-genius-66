
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
  debug?: boolean;
  placeholderColor?: string;
}
export interface PreloadImageDefinition {
  placeholderColor?: string;
export interface PreloadImageDefinition {
  src: string;
  preloadPriority?: number;
  tags?: string[];
}
export interface PreloadOptions {
  preloadPriority?: number;
  tags?: string[];
export interface PreloadOptions {
  priority?: 'high' | 'low' | 'auto';
  categories?: string[];
  limit?: number;
  timeout?: number;
  batchSize?: number;
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
// Additional missing types
export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  alt?: string;
export interface ImageCacheEntry {
  metadata: ImageMetadata;
  timestamp: number;
  blob?: Blob;
  loadStatus?: 'loading' | 'loaded' | 'error';
  lastAccessed?: number;
export interface ImageSettings {
  quality: number;
  width?: number;
  height?: number;
  responsive?: boolean;
  crop?: string;
export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'limit';
  progressive?: boolean;
  lossless?: boolean;
