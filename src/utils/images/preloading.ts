import { type BankImage } from '@/data/imageBank';
import { type PreloadOptions } from './types';
import { updateImageCache, hasImageWithStatus } from './caching';
/**
 * Check if an image is already preloaded
 * @param url Image URL to check
 * @returns Boolean indicating if the image is preloaded
 */
export const isImagePreloaded = (url: string): boolean => {
  return hasImageWithStatus(url, 'loaded');
};
/**
 * Preload images by their IDs from the image bank
 * @param ids Array of image IDs to preload
 * @param options Preload options
 * @returns Promise que resolve quando o preload termina
 */
export const preloadImagesByIds = async (
  ids: string[],
  options: PreloadOptions = {}
): Promise<void> => {
  // This would need to be implemented with actual image bank data
  console.log('Preloading images by IDs:', ids);
  return Promise.resolve();
};
/**
 * Preload images by URLs
 * @param urls Array of image URLs to preload
 */
export const preloadImagesByUrls = async (
  urls: string[],
  const { 
    quality = 85,
    batchSize = 4,
    timeout = 30000,
    onProgress,
    onComplete
  } = options;
  let loaded = 0;
  const total = urls.length;
  const loadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (isImagePreloaded(url)) {
        resolve();
        return;
      }
      updateImageCache(url, { 
        timestamp: Date.now()
      });
      const img = new Image();
      const timeoutId = setTimeout(() => {
        updateImageCache(url, { 
          timestamp: Date.now()
        });
        reject(new Error(`Timeout loading image: ${url}`));
      }, timeout);
      img.onload = () => {
        clearTimeout(timeoutId);
          timestamp: Date.now(),
          loadStatus: 'loaded'
        loaded++;
        onProgress?.(loaded, total);
      };
      img.onerror = () => {
          loadStatus: 'error'
        reject(new Error(`Failed to load image: ${url}`));
      // Optimize URL if it's from Cloudinary
      if (url.includes('cloudinary.com')) {
        img.src = url.includes('/upload/') 
          ? url.replace('/upload/', `/upload/q_${quality}/`) 
          : url;
      } else {
        img.src = url;
    });
  };
  // Process in batches
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }
  try {
    for (const batch of batches) {
      await Promise.allSettled(batch.map(loadImage));
    }
    onComplete?.();
  } catch (error) {
    console.error('Error preloading images:', error);
  }
};
/**
 * Preload images from bank images array
 * @param images Array of bank images to preload
 */
export const preloadImages = async (
  images: BankImage[],
  // Extract URLs from BankImage objects - assuming they have a 'src' property
  const urls = images.map(img => img.src || img.imageUrl || '').filter(Boolean);
  return preloadImagesByUrls(urls, options);
};
/**
 * Preload critical images by category
 * @param categories Array of categories or single category
 */
export const preloadCriticalImages = async (
  categories: string | string[],
  console.log('Preloading critical images for categories:', categories);
};
/**
 * Preload images by category
 * @param category Category to preload
 */
export const preloadImagesByCategory = async (
  category: string,
  console.log('Preloading images for category:', category);
};
/**
 * Get low quality version of an image
 * @param url Original image URL
 * @returns Low quality image URL
 */
export const getLowQualityImage = (url: string): string => {
  if (url.includes('cloudinary.com')) {
    return url.includes('/upload/') 
      ? url.replace('/upload/', '/upload/q_30,w_50/') 
      : url;
  return url;
};
