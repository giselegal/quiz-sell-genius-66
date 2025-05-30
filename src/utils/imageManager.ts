
export interface PreloadImageOptions {
  src: string;
  id: string;
  alt: string;
  category: string;
  preloadPriority: number;
}

export interface PreloadOptions {
  quality?: number;
  batchSize?: number;
}

export interface ImageMetadata {
  alt?: string;
  width?: number;
  height?: number;
  category?: string;
}
export const preloadImages = async (
  images: PreloadImageOptions[], 
  options: PreloadOptions = {}
): Promise<void> => {
  const { batchSize = 5 } = options;
  
  // Process images in batches
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    
    await Promise.allSettled(
      batch.map(image => 
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to preload ${image.src}`));
          img.src = image.src;
        })
      )
    );
  }
};

// Additional utility functions
export const isImagePreloaded = (src: string): boolean => {
  // Simple check - in a real implementation this would track preloaded images
  return false;
};

export const getOptimizedImage = (src: string, options?: { quality?: number; format?: string; width?: number; height?: number }): string => {
  // For Cloudinary URLs, add optimization parameters
  if (src.includes('cloudinary.com')) {
    const baseUrl = src.split('/upload/')[0] + '/upload/';
    const imagePath = src.split('/upload/')[1];
    const params = [];
    
    if (options?.quality) params.push(`q_${options.quality}`);
    if (options?.format) params.push(`f_${options.format}`);
    if (options?.width) params.push(`w_${options.width}`);
    if (options?.height) params.push(`h_${options.height}`);
    
    return baseUrl + (params.length > 0 ? params.join(',') + '/' : '') + imagePath;
  }
  
  return src;
};

export const getImageMetadata = (src: string): ImageMetadata | null => {
  // Return null for now - could be enhanced to store actual metadata
  return null;
};

export const preloadCriticalImages = async (categories: string[], options: PreloadOptions = {}): Promise<void> => {
  // Placeholder implementation
  console.log(`Preloading critical images for categories: ${categories.join(', ')}`);
};

export const preloadImagesByUrls = async (urls: string[], options: PreloadOptions = {}): Promise<void> => {
  const images = urls.map((url, index) => ({
    src: url,
    id: `preload-${index}`,
    alt: `Preloaded image ${index}`,
    category: 'preload',
    preloadPriority: 1
  }));
  
  await preloadImages(images, options);
};

export const getLowQualityPlaceholder = (src: string): string => {
  // Return a low quality version for Cloudinary images
  if (src.includes('cloudinary.com')) {
    return getOptimizedImage(src, { quality: 10, width: 50 });
  }
  return src;
};
