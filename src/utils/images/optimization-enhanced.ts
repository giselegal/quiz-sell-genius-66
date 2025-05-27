
/**
 * Enhanced image optimization utilities
 */

export interface OptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'limit';
  dpr?: number;
}

/**
 * Optimizes Cloudinary image URLs with enhanced parameters
 * @param url Original image URL
 * @param options Optimization options
 * @returns Optimized image URL
 */
export function optimizeCloudinaryImage(url: string, options: OptimizationOptions = {}): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }
  
  const {
    width,
    height,
    quality = 85,
    format = 'auto',
    crop = 'fill',
    dpr = 1
  } = options;
  
  try {
    const baseUrlParts = url.split('/upload/');
    if (baseUrlParts.length !== 2) return url;
    
    let transformations = `f_${format},q_${quality}`;
    
    if (dpr > 1) {
      transformations += `,dpr_${dpr}`;
    }
    
    if (width && height) {
      transformations += `,c_${crop},w_${width},h_${height}`;
    } else if (width) {
      transformations += `,w_${width}`;
    } else if (height) {
      transformations += `,h_${height}`;
    }
    
    return `${baseUrlParts[0]}/upload/${transformations}/${baseUrlParts[1]}`;
  } catch (error) {
    console.error('Error optimizing Cloudinary image:', error);
    return url;
  }
}

/**
 * Generates responsive image sources for different screen sizes
 * @param url Base image URL
 * @param sizes Array of widths to generate
 * @returns Object with srcSet and sizes attributes
 */
export function generateResponsiveSources(
  url: string, 
  sizes: number[] = [320, 640, 960, 1280]
): { srcSet: string; sizes: string } {
  if (!url || !url.includes('cloudinary.com')) {
    return { srcSet: url, sizes: '100vw' };
  }
  
  const srcSet = sizes
    .map(size => {
      const optimizedUrl = optimizeCloudinaryImage(url, { 
        width: size,
        quality: 85,
        format: 'auto'
      });
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
  
  return {
    srcSet,
    sizes: '(max-width: 768px) 100vw, 50vw'
  };
}

export default {
  optimizeCloudinaryImage,
  generateResponsiveSources
};
