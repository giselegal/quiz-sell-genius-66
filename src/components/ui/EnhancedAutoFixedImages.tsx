
import React, { useEffect } from 'react';
import { fixBlurryImages } from '@/utils/enhancedFixBlurryImages';

interface EnhancedAutoFixedImagesProps {
  children: React.ReactNode;
  enabled?: boolean;
  selector?: string;
  quality?: number;
  format?: string;
}

const EnhancedAutoFixedImages: React.FC<EnhancedAutoFixedImagesProps> = ({
  children,
  enabled = true,
  selector = 'img',
  quality = 95,
  format = 'auto'
}) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Apply fix to the element itself if it matches
              if (element.matches?.(selector)) {
                fixBlurryImages(selector, { quality, format });
              }
              
              // Apply fix to child elements
              const childImages = element.querySelectorAll?.(selector);
              if (childImages?.length) {
                fixBlurryImages(selector, { quality, format });
              }
            }
          });
        }
      });
    });

    // Apply to existing images
    fixBlurryImages(selector, { quality, format });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Handle route changes in SPA
    const handleRouteChange = () => {
      setTimeout(() => {
        fixBlurryImages(selector, { quality, format });
      }, 100);
    };

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);
    
    // Listen for pushstate/replacestate (programmatic navigation)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      handleRouteChange();
    };
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      handleRouteChange();
    };

    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handleRouteChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [enabled, selector, quality, format]);

  return <>{children}</>;
};

export default EnhancedAutoFixedImages;
