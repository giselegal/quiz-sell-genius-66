import { type BankImage } from '@/data/imageBank';
import { type PreloadOptions } from './images/types';
import { 
  initializeImageCache, 
  getImageMetadata 
} from './images/caching';
import { 
  optimizeCloudinaryUrl, 
  getOptimizedImage, 
  getLowQualityPlaceholder, 
  getOptimizedImageUrl,
  getResponsiveImageSources 
} from './images/optimization';
import { 
  isImagePreloaded, 
  preloadImagesByIds, 
  preloadImagesByUrls, 
  preloadImages,
  preloadCriticalImages,
  preloadImagesByCategory,
  getLowQualityImage 
} from './images/preloading';

initializeImageCache();

export {
  getImageMetadata,
  optimizeCloudinaryUrl,
  getOptimizedImage,
  getLowQualityPlaceholder,
  getResponsiveImageSources,
  isImagePreloaded,
  preloadImagesByIds,
  preloadImagesByUrls,
};

export type { BankImage, PreloadOptions };
