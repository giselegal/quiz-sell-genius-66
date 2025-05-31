
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

// Track quiz start
export const trackQuizStart = (userName: string, userEmail?: string): void => {
  try {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Quiz Started',
        custom_parameter_1: userName
      });
    }
    
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_start', {
        event_category: 'engagement',
        event_label: userName,
        user_email: userEmail
      });
    }
    
    console.log(`Quiz start tracked for user: ${userName}`);
  } catch (error) {
    console.error('Error tracking quiz start:', error);
  }
};

// Track quiz answer
export const trackQuizAnswer = (questionId: string, selectedOptions: string[], currentIndex: number, totalQuestions: number): void => {
  try {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'QuizAnswer', {
        question_id: questionId,
        selected_options: selectedOptions,
        progress: Math.round((currentIndex / totalQuestions) * 100)
      });
    }
    
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_answer', {
        event_category: 'quiz_interaction',
        event_label: questionId,
        custom_parameter_1: selectedOptions.join(','),
        value: currentIndex
      });
    }
    
    console.log(`Quiz answer tracked: ${questionId}`, selectedOptions);
  } catch (error) {
    console.error('Error tracking quiz answer:', error);
  }
};

// Track quiz completion
export const trackQuizComplete = (): void => {
  try {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'CompleteRegistration');
    }
    
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'quiz_complete', {
        event_category: 'engagement',
        event_label: 'Quiz Completed'
      });
    }
    
    console.log('Quiz completion tracked');
  } catch (error) {
    console.error('Error tracking quiz completion:', error);
  }
};

// Track result view
export const trackResultView = (resultCategory: string): void => {
  try {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_type: 'quiz_result',
        content_category: resultCategory
      });
    }
    
    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'result_view', {
        event_category: 'quiz_result',
        event_label: resultCategory
      });
    }
    
    console.log(`Result view tracked: ${resultCategory}`);
  } catch (error) {
    console.error('Error tracking result view:', error);
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

// Get analytics events
export const getAnalyticsEvents = () => {
  if (typeof window !== 'undefined' && (window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
    return [...(window as any).dataLayer];
  }
  return [];
};

// Clear analytics data
export const clearAnalyticsData = () => {
  if (typeof window === 'undefined') return;

  if ((window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.length = 0;
    console.log('[Analytics] window.dataLayer cleared.');
  }

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'source'];
  utmKeys.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[Analytics] Failed to remove ${key} from localStorage`, e);
    }
  });
  console.log('[Analytics] UTM parameters cleared from localStorage.');
};

// Test Facebook Pixel
export const testFacebookPixel = () => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'PageView');
    console.log('[Analytics] Test PageView event sent to Facebook Pixel.');
    return true;
  }
  console.warn('[Analytics] Facebook Pixel (window.fbq) not found.');
  return false;
};

// Get creative performance
export const getCreativePerformance = (days = 7) => {
  const events = JSON.parse(localStorage.getItem('all_tracked_events') || '[]');
  
  const filteredEvents = days ? events.filter((event: any) => {
    const eventDate = new Date(event.date || event.timestamp);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return eventDate >= cutoffDate;
  }) : events;
  
  const creativeStats: any = {};
  
  filteredEvents.forEach((event: any) => {
    const creative = event.utm_content || 'unknown';
    
    if (!creativeStats[creative]) {
      creativeStats[creative] = {
        creative_name: creative.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        page_views: 0,
        quiz_starts: 0,
        quiz_completions: 0,
        leads: 0,
        purchases: 0,
        revenue: 0,
        conversion_rate: '0%',
        cost_per_lead: 0
      };
    }
    
    switch(event.event_name) {
      case 'PageView':
        creativeStats[creative].page_views++;
        break;
      case 'QuizStart':
        creativeStats[creative].quiz_starts++;
        break;
      case 'QuizComplete':
        creativeStats[creative].quiz_completions++;
        break;
      case 'Lead':
        creativeStats[creative].leads++;
        break;
      case 'Purchase':
        creativeStats[creative].purchases++;
        creativeStats[creative].revenue += event.value || 0;
        break;
    }
  });
  
  Object.values(creativeStats).forEach((stats: any) => {
    if (stats.page_views > 0) {
      const convRate = (stats.leads / stats.page_views) * 100;
      stats.conversion_rate = `${convRate.toFixed(1)}%`;
      
      const assumedCPC = 1.2;
      const assumedCost = stats.page_views * assumedCPC;
      stats.cost_per_lead = stats.leads > 0 ? assumedCost / stats.leads : 0;
    }
  });
  
  return creativeStats;
};
