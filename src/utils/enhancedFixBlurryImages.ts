
import { optimizeCloudinaryUrl } from './images/optimization';
import { type FixBlurryImagesOptions } from './images/types';

export const fixBlurryImages = (selector: string, options: FixBlurryImagesOptions = {}) => {
  const images = document.querySelectorAll(selector);

  images.forEach(img => {
    if (img instanceof HTMLImageElement) {
      const originalSrc = img.src;

      if (originalSrc && originalSrc.includes('cloudinary.com')) {
        const optimizedSrc = optimizeCloudinaryUrl(originalSrc, {
          quality: options.quality || 95,
          format: (options.format as 'auto' | 'webp' | 'jpg' | 'png') || 'auto',
          width: options.width,
          height: options.height
        });

        img.src = optimizedSrc;
      }
    }
  });
};
