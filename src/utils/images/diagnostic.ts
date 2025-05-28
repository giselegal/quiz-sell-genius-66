
/**
 * Image diagnostic utility for performance monitoring
 */

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

/**
 * Diagnoses image performance issues on the page
 * @param rootElement Optional root element to scope the analysis
 * @returns Diagnostic results with recommendations
 */
export function diagnoseImagePerformance(rootElement?: HTMLElement): ImageDiagnosticResult {
  const targetElement = rootElement || document.body;
  const images = targetElement.querySelectorAll('img');
  
  const metrics: ImageMetrics[] = [];
  let optimizedCount = 0;
  let blurryCount = 0;
  let largeCount = 0;
  
  images.forEach((img) => {
    const rect = img.getBoundingClientRect();
    const metric: ImageMetrics = {
      url: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayWidth: rect.width,
      displayHeight: rect.height,
      isOptimized: isImageOptimized(img),
      isBlurry: isImageBlurry(img)
    };
    
    metrics.push(metric);
    
    if (metric.isOptimized) optimizedCount++;
    if (metric.isBlurry) blurryCount++;
    if (metric.naturalWidth > 2000 || metric.naturalHeight > 2000) largeCount++;
  });
  
  const recommendations = generateRecommendations(metrics);
  
  return {
    totalImages: images.length,
    optimizedImages: optimizedCount,
    blurryImages: blurryCount,
    largeImages: largeCount,
    recommendations
  };
}

function isImageOptimized(img: HTMLImageElement): boolean {
  return img.dataset.optimized === 'true' || 
         img.src.includes('q_') || 
         img.src.includes('f_auto');
}

function isImageBlurry(img: HTMLImageElement): boolean {
  const rect = img.getBoundingClientRect();
  const scaleFactor = Math.max(
    rect.width / img.naturalWidth,
    rect.height / img.naturalHeight
  );
  
  return scaleFactor > 1.2;
}

function generateRecommendations(metrics: ImageMetrics[]): string[] {
  const recommendations: string[] = [];
  
  const unoptimizedImages = metrics.filter(m => !m.isOptimized);
  if (unoptimizedImages.length > 0) {
    recommendations.push(`Optimize ${unoptimizedImages.length} unoptimized images`);
  }
  
  const blurryImages = metrics.filter(m => m.isBlurry);
  if (blurryImages.length > 0) {
    recommendations.push(`Fix ${blurryImages.length} blurry/upscaled images`);
  }
  
  const largeImages = metrics.filter(m => m.naturalWidth > 2000 || m.naturalHeight > 2000);
  if (largeImages.length > 0) {
    recommendations.push(`Resize ${largeImages.length} oversized images`);
  }
  
  return recommendations;
}

export default {
  diagnoseImagePerformance,
  isImageOptimized,
  isImageBlurry
};
