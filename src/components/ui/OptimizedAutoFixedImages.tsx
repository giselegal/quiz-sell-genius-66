
import React, { useEffect } from 'react';

interface OptimizedAutoFixedImagesProps {
  children: React.ReactNode;
  enabled?: boolean;
  quality?: number;
}

const OptimizedAutoFixedImages: React.FC<OptimizedAutoFixedImagesProps> = ({
  children,
  enabled = true,
  quality = 90
}) => {
  useEffect(() => {
    if (!enabled) return;

    const optimizeImages = (selector: string = 'img') => {
      const images = document.querySelectorAll(selector);
      
      images.forEach(img => {
        if (img instanceof HTMLImageElement) {
          const originalSrc = img.src;

          if (originalSrc && originalSrc.includes('cloudinary.com')) {
            // Simple Cloudinary optimization
            const optimizedSrc = originalSrc.replace(
              /\/upload\//,
              `/upload/f_auto,q_${quality}/`
            );

            if (optimizedSrc !== originalSrc) {
              img.src = optimizedSrc;
            }
          }
        }
      });
    };

    // Apply optimization on mount
    optimizeImages();

    // Set up mutation observer for dynamic content
    const observer = new MutationObserver(() => {
      optimizeImages();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Handle route changes
    const handleRouteChange = () => {
      setTimeout(() => optimizeImages(), 100);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handleRouteChange();
    };

    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handleRouteChange);
      history.pushState = originalPushState;
    };
  }, [enabled, quality]);

  return <>{children}</>;
};

export default OptimizedAutoFixedImages;
