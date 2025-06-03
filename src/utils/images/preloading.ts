
import { type BankImage } from '@/data/imageBank';
import { type PreloadOptions } from './types';

// Cache para imagens já pré-carregadas
const preloadedImages = new Set<string>();

export const isImagePreloaded = (url: string): boolean => {
  return preloadedImages.has(url);
};

export const preloadImagesByIds = async (
  imageIds: string[], 
  options: PreloadOptions = {}
): Promise<void> => {
  const { quality = 85, batchSize = 5 } = options;
  
  for (let i = 0; i < imageIds.length; i += batchSize) {
    const batch = imageIds.slice(i, i + batchSize);
    const promises = batch.map(id => {
      const url = `/images/${id}`;
      return preloadSingleImage(url);
    });
    
    await Promise.allSettled(promises);
  }
};

export const preloadImagesByUrls = async (
  urls: string[], 
  options: PreloadOptions = {}
): Promise<void> => {
  const { batchSize = 5 } = options;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const promises = batch.map(url => preloadSingleImage(url));
    
    await Promise.allSettled(promises);
  }
};

export const preloadImages = async (
  images: BankImage[], 
  options: PreloadOptions = {}
): Promise<void> => {
  const urls = images.map(img => img.src).filter(Boolean);
  await preloadImagesByUrls(urls, options);
};

export const preloadCriticalImages = async (
  images: BankImage[], 
  options: PreloadOptions = {}
): Promise<void> => {
  const criticalImages = images.filter(img => img.preloadPriority && img.preloadPriority >= 8);
  await preloadImages(criticalImages, options);
};

export const preloadImagesByCategory = async (
  category: string, 
  options: PreloadOptions = {}
): Promise<void> => {
  console.log(`Preloading images for category: ${category}`);
};

export const getLowQualityImage = (url: string): string => {
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', '/upload/q_20,w_50/');
  }
  return url;
};

const preloadSingleImage = (url: string): Promise<void> => {
  return new Promise((resolve) => {
    if (preloadedImages.has(url)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      preloadedImages.add(url);
      resolve();
    };
    img.onerror = () => {
      resolve(); // Resolve mesmo com erro para não bloquear o batch
    };
    img.src = url;
  });
};
