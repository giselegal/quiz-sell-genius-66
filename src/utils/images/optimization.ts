
import { type ImageOptimizationOptions } from './types';

export const optimizeCloudinaryUrl = (
  url: string, 
  options: ImageOptimizationOptions = {}
): string => {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const {
    width = 0,
    height = 0,
    quality = 85,
    format = 'auto',
    crop = 'fill'
  } = options;

  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const [baseUrl, pathPart] = parts;
  const pathSegments = pathPart.split('/');
  
  // Check if transformations already exist
  const hasExistingTransforms = pathSegments[0].includes('_') || 
                                pathSegments[0].includes(',') || 
                                pathSegments[0].startsWith('f_');

  // Build transformation string
  let transforms = `f_${format}`;
  
  if (quality) {
    transforms += `,q_${quality}`;
  }
  
  if (width && height) {
    transforms += `,c_${crop},w_${width},h_${height}`;
  } else if (width) {
    transforms += `,w_${width}`;
  } else if (height) {
    transforms += `,h_${height}`;
  }

  if (hasExistingTransforms) {
    return `${baseUrl}/upload/${transforms}/${pathSegments.slice(1).join('/')}`;
  } else {
    return `${baseUrl}/upload/${transforms}/${pathPart}`;
  }
};

export const getOptimizedImage = (url: string, options: ImageOptimizationOptions = {}): string => {
  return optimizeCloudinaryUrl(url, {
    quality: 85,
    format: 'auto',
    crop: 'fill',
    ...options
  });
};

export const getLowQualityPlaceholder = (url: string, options = { width: 30, quality: 20 }): string => {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const { width = 30, quality = 20 } = options;
  const parts = url.split('/upload/');
  
  if (parts.length !== 2) return url;
  
  return `${parts[0]}/upload/f_auto,q_${quality},w_${width}/${parts[1].split('/').slice(1).join('/')}`;
};

export const getOptimizedImageUrl = getOptimizedImage;

export const getResponsiveImageSources = (url: string, widths = [320, 640, 960, 1280]) => {
  if (!url || !url.includes('cloudinary.com')) {
    return {
      srcSet: url,
      sizes: '100vw'
    };
  }

  return {
    srcSet: widths.map(width => 
      `${optimizeCloudinaryUrl(url, { width, quality: 85, format: 'auto' })} ${width}w`
    ).join(', '),
    sizes: '(max-width: 768px) 100vw, 50vw'
  };
};
