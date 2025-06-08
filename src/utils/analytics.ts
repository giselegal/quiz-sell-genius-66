// Existing analytics functions
export const trackPageView = (page: string, additionalData?: Record<string, any>) => {
  console.log('Page view tracked:', page, additionalData);
  // Implementation for page view tracking
  
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: page,
        page_location: window.location.href,
        ...additionalData
      });
    }
    
    // DataLayer for Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        pageName: page,
        ...additionalData
      });
    }
  }
};

export const trackSaleConversion = (email: string, value: number) => {
  console.log('Sale conversion tracked:', { email, value });
  // Implementation for sale conversion tracking
  
  if (typeof window !== 'undefined') {
    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: value,
        currency: 'BRL',
        content_name: 'Guia de Estilo'
      });
    }
    
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: 'T_' + Date.now(),
        value: value,
        currency: 'BRL'
      });
    }
  }
};

export const trackOfferClick = async (eventData: Record<string, any>) => {
  console.log('Offer click tracked:', eventData);
  
  // Track with Facebook Pixel if available
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      content_name: eventData.style_category,
      content_category: 'Quiz Result',
      value: eventData.style_data?.score || 0,
      currency: 'BRL'
    });
  }
  
  // Store in localStorage for analytics
  try {
    const existingEvents = JSON.parse(localStorage.getItem('tracked_events') || '[]');
    existingEvents.push({
      ...eventData,
      event_type: 'offer_click',
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('tracked_events', JSON.stringify(existingEvents));
  } catch (error) {
    console.error('Error storing analytics event:', error);
  }
};

export const addUtmParamsToEvent = (eventData: Record<string, any>) => {
  try {
    const utmParams = JSON.parse(localStorage.getItem('utm_parameters') || '{}');
    return {
      ...eventData,
      ...utmParams
    };
  } catch (error) {
    console.error('Error adding UTM params:', error);
    return eventData;
  }
};

// Additional missing exports
export const trackButtonClick = (buttonId: string, buttonText: string, pageName: string, eventData: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', 'button_click', {
      button_id: buttonId,
      button_text: buttonText,
      page_name: pageName,
      ...eventData
    });
  }
  
  // DataLayer for Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'button_click',
      buttonId,
      buttonText,
      pageName,
      ...eventData
    });
  }
  
  console.log(`[Analytics] Button click: ${buttonText} (${buttonId}) on ${pageName}`, eventData);
};

export const captureUTMParameters = () => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  const utmKeys = [
    'utm_source', 
    'utm_medium', 
    'utm_campaign', 
    'utm_term', 
    'utm_content',
    'ref',
    'source'
  ];
  
  utmKeys.forEach(key => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn(`[Analytics] Failed to store ${key} in localStorage`, e);
      }
    }
  });
  
  if (window.gtag && Object.keys(utmParams).length > 0) {
    window.gtag('set', 'user_properties', utmParams);
  }
  
  if (window.dataLayer && Object.keys(utmParams).length > 0) {
    window.dataLayer.push({
      event: 'utm_capture',
      ...utmParams
    });
  }
  
  console.log('[Analytics] UTM parameters captured:', utmParams);
  return utmParams;
};

export const initFacebookPixel = () => {
  if (typeof window === 'undefined') return;
  
  // Initialize Facebook Pixel
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  
  // Initialize with a default pixel ID (should be configured per project)
  if (window.fbq) {
    window.fbq('init', '1234567890123456'); // This should be configured
    window.fbq('track', 'PageView');
  }
};

export const trackQuizStart = (quizId: string, eventData: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  const data = { quiz_id: quizId, ...eventData };

  if (window.gtag) {
    window.gtag('event', 'quiz_start', data);
  }
  if (window.fbq) {
    window.fbq('trackCustom', 'QuizStart', data);
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: 'quiz_start', ...data });
  }
  console.log(`[Analytics] Quiz started: ${quizId}`, data);
};

export const trackQuizAnswer = (quizId: string, questionId: string, answer: string, eventData: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  const data = { quiz_id: quizId, question_id: questionId, answer: answer, ...eventData };

  if (window.gtag) {
    window.gtag('event', 'quiz_answer', data);
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: 'quiz_answer', ...data });
  }
  console.log(`[Analytics] Quiz answer: ${questionId} - ${answer}`, data);
};

export const trackQuizComplete = (quizId: string, eventData: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  const data = { quiz_id: quizId, ...eventData };

  if (window.gtag) {
    window.gtag('event', 'quiz_complete', data);
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: 'quiz_complete', ...data });
  }
  console.log(`[Analytics] Quiz completed: ${quizId}`, data);
};

export const trackResultView = (quizId: string, resultId: string, eventData: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  const data = { quiz_id: quizId, result_id: resultId, ...eventData };

  if (window.gtag) {
    window.gtag('event', 'result_view', data);
  }
  if (window.fbq) {
    window.fbq('trackCustom', 'ResultView', data);
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: 'result_view', ...data });
  }
  console.log(`[Analytics] Result view: ${quizId} - ${resultId}`, data);
};

export const getAnalyticsEvents = () => {
  if (typeof window !== 'undefined' && window.dataLayer && Array.isArray(window.dataLayer)) {
    return [...window.dataLayer];
  }
  return [];
};

export const clearAnalyticsData = () => {
  if (typeof window === 'undefined') return;

  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.length = 0;
    console.log('[Analytics] window.dataLayer cleared.');
  }

  const utmKeys = [
    'utm_source', 
    'utm_medium', 
    'utm_campaign', 
    'utm_term', 
    'utm_content',
    'ref',
    'source'
  ];

  utmKeys.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[Analytics] Failed to remove ${key} from localStorage`, e);
    }
  });
  console.log('[Analytics] UTM parameters cleared from localStorage.');
};

export const testFacebookPixel = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'QuizStart', { test: true });
    console.log('[Analytics] Test QuizStart event sent to Facebook Pixel.');
    return true;
  }
  console.warn('[Analytics] Facebook Pixel (window.fbq) not found.');
  return false;
};

export const trackLeadGeneration = (formId: string, leadData: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  const data = { form_id: formId, ...leadData };

  if (window.gtag) {
    window.gtag('event', 'lead', data);
  }
  if (window.fbq) {
    window.fbq('track', 'Lead', data);
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: 'lead', ...data });
  }
  console.log(`[Analytics] Lead generation: ${formId}`, data);
};

export const trackConversion = (conversionType: string, conversionData: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  
  if (window.gtag) {
    window.gtag('event', conversionType, conversionData);
  }
  
  if (window.fbq) {
    if (conversionType === 'purchase') {
      window.fbq('track', 'Purchase', conversionData);
    } else if (conversionType === 'lead') {
      window.fbq('track', 'Lead', conversionData);
    } else {
      window.fbq('trackCustom', conversionType, conversionData);
    }
  }
  
  if (window.dataLayer) {
    window.dataLayer.push({
      event: conversionType,
      ...conversionData
    });
  }
  
  console.log(`[Analytics] Conversion: ${conversionType}`, conversionData);
};
