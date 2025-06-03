
import { type PreloadOptions, type PreloadImageDefinition } from './types';
import { optimizeCloudinaryUrl } from './optimization';
import { markImageAsPreloaded } from './caching';

const criticalImagesByCategory: Record<string, PreloadImageDefinition[]> = {
  strategic: [
    {
      id: 'strategic-bg-1',
      url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp',
      priority: 1,
      category: 'strategic'
    }
  ],
  results: [
    {
      id: 'result-bg-1',
      url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp',
      priority: 1,
      category: 'results'
    }
  ]
};

const defaultOptions: Required<PreloadOptions> = {
  quality: 85,
  batchSize: 3
};

export const preloadCriticalImagesByCategory = async (
  categories: string[],
  options: PreloadOptions = {}
): Promise<void> => {
  const opts = { ...defaultOptions, ...options };
  
  const imagesToPreload = categories.flatMap(category => 
    criticalImagesByCategory[category] || []
  );

  if (imagesToPreload.length === 0) {
    console.warn(`[Preload] No critical images found for categories: ${categories.join(', ')}`);
    return;
  }

  // Sort by priority
  imagesToPreload.sort((a, b) => a.priority - b.priority);

  // Process in batches
  for (let i = 0; i < imagesToPreload.length; i += opts.batchSize) {
    const batch = imagesToPreload.slice(i, i + opts.batchSize);
    
    await Promise.allSettled(
      batch.map(async (imageDef) => {
        try {
          const optimizedUrl = optimizeCloudinaryUrl(imageDef.url, {
            quality: opts.quality,
            format: 'auto'
          });

          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = optimizedUrl;
          document.head.appendChild(link);

          markImageAsPreloaded(imageDef.url);
          console.log(`[Preload] Successfully preloaded: ${imageDef.id}`);
        } catch (error) {
          console.error(`[Preload] Failed to preload image: ${imageDef.id}`, error);
        }
      })
    );

    // Small delay between batches to avoid overwhelming the browser
    if (i + opts.batchSize < imagesToPreload.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
};
