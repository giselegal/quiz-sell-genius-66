
// Analytics utilities for tracking events and conversions

export interface UTMParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

// Initialize Facebook Pixel
export const initFacebookPixel = (pixelId?: string): void => {
  if (typeof window === 'undefined') return;
  
  const id = pixelId || process.env.REACT_APP_FB_PIXEL_ID || 'YOUR_PIXEL_ID';
  
  try {
    // Initialize Facebook Pixel if not already done
    if (!(window as any).fbq) {
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
      (window as any).fbq('init', id);
      (window as any).fbq('track', 'PageView');
    }
  } catch (error) {
    console.error('Error initializing Facebook Pixel:', error);
  }
};

// Track button clicks
export const trackButtonClick = (buttonId: string, buttonText: string, location: string): void => {
  try {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: buttonText,
        content_category: location
      });
    }
    
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'engagement',
        event_label: `${buttonId} - ${buttonText}`,
        custom_parameter_1: location
      });
    }
    
    console.log(`Button click tracked: ${buttonId} - ${buttonText} at ${location}`);
  } catch (error) {
    console.error('Error tracking button click:', error);
  }
};

// Track sale conversion
export const trackSaleConversion = (value: number): void => {
  try {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: value,
        currency: 'BRL'
      });
    }
    
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: Date.now().toString(),
        value: value,
        currency: 'BRL'
      });
    }
    
    // Make trackSaleConversion available globally for Hotmart integration
    if (typeof window !== 'undefined') {
      (window as any).trackSaleConversion = trackSaleConversion;
    }
    
    console.log(`Sale conversion tracked: R$ ${value}`);
  } catch (error) {
    console.error('Error tracking sale conversion:', error);
  }
};

// Capture UTM parameters
export const captureUTMParameters = (): UTMParameters => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: UTMParameters = {
    source: urlParams.get('utm_source') || undefined,
    medium: urlParams.get('utm_medium') || undefined,
    campaign: urlParams.get('utm_campaign') || undefined,
    term: urlParams.get('utm_term') || undefined,
    content: urlParams.get('utm_content') || undefined,
  };
  
  // Store in localStorage for later use
  try {
    localStorage.setItem('utm_parameters', JSON.stringify(utmParams));
  } catch (error) {
    console.error('Error storing UTM parameters:', error);
  }
  
  return utmParams;
};

// Track page view
export const trackPageView = (pageName: string): void => {
  try {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView', {
        content_name: pageName
      });
    }
    
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
    
    console.log(`Page view tracked: ${pageName}`);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};
