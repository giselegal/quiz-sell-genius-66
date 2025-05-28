
// Facebook Pixel and Analytics utility functions
declare global {
  interface Window {
    fbq?: (event: string, eventName: string, params?: any) => void;
    _fbq?: any;
    gtag?: (...args: any[]) => void;
  }
}

export const initFacebookPixel = (): boolean => {
  try {
    const pixelId = process.env.REACT_APP_FACEBOOK_PIXEL_ID || '';
    
    if (!pixelId) {
      console.warn('Facebook Pixel ID not provided');
      return false;
    }
    
    // Initialize Facebook Pixel
    window.fbq = window.fbq || function() {
      (window.fbq as any).q = (window.fbq as any).q || [];
      (window.fbq as any).q.push(arguments);
    };
    
    window._fbq = window._fbq || window.fbq;
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
    
    console.log(`Facebook Pixel initialized with ID: ${pixelId}`);
    return true;
  } catch (error) {
    console.error('Error initializing Facebook Pixel:', error);
    return false;
  }
};

export const trackPageView = (path: string, params?: Record<string, any>): void => {
  try {
    if (typeof window === 'undefined' || !window.fbq) {
      console.warn('Facebook Pixel not initialized');
      return;
    }
    
    if (params) {
      window.fbq('track', 'PageView', params);
    } else {
      window.fbq('track', 'PageView');
    }
    
    console.log(`Tracked Facebook Pixel PageView: ${path}`, params || '');
  } catch (error) {
    console.error('Error tracking Facebook Pixel PageView:', error);
  }
};

export const trackPixelEvent = (
  eventName: string, 
  params?: Record<string, any>
): void => {
  try {
    if (typeof window === 'undefined' || !window.fbq) {
      console.warn('Facebook Pixel not initialized');
      return;
    }
    
    if (params) {
      window.fbq('track', eventName, params);
    } else {
      window.fbq('track', eventName);
    }
    
    console.log(`Tracked Facebook Pixel event: ${eventName}`, params || '');
  } catch (error) {
    console.error(`Error tracking Facebook Pixel event ${eventName}:`, error);
  }
};

export default {
  initFacebookPixel,
  trackPageView,
  trackPixelEvent
};
