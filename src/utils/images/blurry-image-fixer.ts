
/**
 * Utility for fixing blurry images in quiz and intro pages
 */

export interface FixBlurryImagesOptions {
  quality?: number;
  format?: 'auto' | 'webp' | 'avif';
  skipOptimized?: boolean;
  forceOptimize?: boolean;
  debug?: boolean;
  placeholderColor?: string;
}

interface FixedImage {
  element: HTMLImageElement;
  originalSrc: string;
  optimizedSrc: string;
}

/**
 * Fixes blurry images on intro and quiz pages
 * @param rootElement Optional root element to scope the fix
 * @param options Configuration options
 * @returns Array of fixed image elements
 */
export function fixBlurryImages(
  rootElement?: HTMLElement,
  options?: FixBlurryImagesOptions
): HTMLImageElement[] {
  const opts = {
    quality: 85,
    format: 'auto' as const,
    skipOptimized: true,
    forceOptimize: false,
    debug: false,
    placeholderColor: '#f8f5f2',
    ...options
  };
  
  const targetElement = rootElement || document.body;
  const fixedImages: HTMLImageElement[] = [];
  
  try {
    const images = targetElement.querySelectorAll('img');
    
    if (opts.debug) {
      console.log(`[fixBlurryImages] Analyzing ${images.length} images`);
    }
    
    images.forEach((img) => {
      if (img.dataset.optimized === 'true' && !opts.forceOptimize) {
        return;
      }
      
      const isRelevantImage = 
        img.classList.contains('intro-image') || 
        img.closest('[data-section="intro"]') || 
        img.classList.contains('quiz-image') || 
        img.closest('[data-section="quiz"]') ||
        img.id === 'lcp-image';
        
      if (!isRelevantImage) {
        return;
      }
      
      const originalSrc = img.src;
      const shouldOptimize = opts.forceOptimize || 
        !originalSrc.includes('w_') || 
        !originalSrc.includes('q_');
        
      if (shouldOptimize) {
        const newSrc = applyOptimizations(originalSrc, opts);
        img.src = newSrc;
        img.dataset.optimized = 'true';
        fixedImages.push(img);
        
        if (opts.debug) {
          console.log(`[fixBlurryImages] Image optimized:`, {
            original: originalSrc,
            optimized: newSrc
          });
        }
      }
    });
    
    if (opts.debug) {
      console.log(`[fixBlurryImages] Total images optimized: ${fixedImages.length}`);
    }
  } catch (error) {
    console.error('[fixBlurryImages] Error optimizing images:', error);
  }
  
  return fixedImages;
}

function applyOptimizations(imageUrl: string, options: FixBlurryImagesOptions): string {
  if (!imageUrl) return imageUrl;
  
  try {
    if (imageUrl.includes('cloudinary.com')) {
      const hasExistingTransformations = imageUrl.includes('/upload/');
      if (hasExistingTransformations) {
        return imageUrl.replace(
          /\/upload\//,
          `/upload/q_${options.quality},f_auto/`
        );
      }
    }
    
    return imageUrl;
  } catch (error) {
    console.error('[applyOptimizations] Error optimizing URL:', error);
    return imageUrl;
  }
}

export default fixBlurryImages;
