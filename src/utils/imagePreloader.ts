
const preloadedImages = new Set<string>();

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (preloadedImages.has(src)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      preloadedImages.add(src);
      resolve();
    };
    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      resolve(); // Don't reject to avoid blocking the app
    };
    img.src = src;
  });
};

export const preloadCriticalImages = async (imageUrls: string[]) => {
  const validUrls = imageUrls.filter(url => url && url.trim() !== '');
  
  try {
    await Promise.allSettled(
      validUrls.map(url => preloadImage(url))
    );
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Preload result page images when quiz starts
export const preloadResultImages = () => {
  const resultImages = [
    'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80/v1744920983/romantico_image.webp',
    'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80/v1744920983/elegante_image.webp',
    'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80/v1744920983/sexy_image.webp',
    'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80/v1744920983/casual_image.webp'
  ];
  
  preloadCriticalImages(resultImages);
};
