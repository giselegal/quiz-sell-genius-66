import { getAnalyticsEvents } from './analytics';

// Function to track a generic event
export const trackEvent = (event_name: string, params?: object) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event_name, params);
  }
  console.log(`[Analytics] Event: ${event_name}`, params);
};

// Function to track a custom event
export const trackCustomEvent = (category: string, action: string, label: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  console.log(`[Analytics] Custom Event: ${category} - ${action} - ${label} - ${value}`);
};

// Function to track timing
export const trackTiming = (category: string, variable: string, value: number, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      event_category: category,
      name: variable,
      value: value,
      event_label: label,
    });
  }
  console.log(`[Analytics] Timing: ${category} - ${variable} - ${value} - ${label}`);
};

// Function to track an exception
export const trackException = (description: string, fatal: boolean = false) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: description,
      fatal: fatal,
    });
  }
  console.log(`[Analytics] Exception: ${description} - Fatal: ${fatal}`);
};

// Function to set user properties
export const setUserProperties = (properties: object) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
  console.log(`[Analytics] User Properties:`, properties);
};

// Function to track a page view
export const trackPageView = (page_path: string, page_title?: string, page_location?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: page_path,
      page_title: page_title,
      page_location: page_location,
    });
  }
  console.log(`[Analytics] Page View: ${page_path} - ${page_title} - ${page_location}`);
};

// Function to track a social interaction
export const trackSocialInteraction = (network: string, action: string, target: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social', {
      event_category: 'social',
      social_network: network,
      social_action: action,
      social_target: target,
    });
  }
  console.log(`[Analytics] Social Interaction: ${network} - ${action} - ${target}`);
};

// Function to track a refund
export const trackRefund = (transaction_id: string, value?: number, currency?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'refund', {
      transaction_id: transaction_id,
      value: value,
      currency: currency,
    });
  }
  console.log(`[Analytics] Refund: ${transaction_id} - ${value} - ${currency}`);
};

// Function to track a checkout progress
export const trackCheckoutProgress = (step: number, option?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'checkout_progress', {
      checkout_step: step,
      checkout_option: option,
    });
  }
  console.log(`[Analytics] Checkout Progress: ${step} - ${option}`);
};

// Function to track a product impression
export const trackProductImpression = (products: object[], list_name: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item_list', {
      items: products,
      item_list_name: list_name,
    });
  }
  console.log(`[Analytics] Product Impression: ${list_name}`, products);
};

// Function to track a product click
export const trackProductClick = (product: object, list_name: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_content', {
      content_type: 'product',
      items: [product],
      item_list_name: list_name,
    });
  }
  console.log(`[Analytics] Product Click: ${list_name}`, product);
};

// Function to track a product detail view
export const trackProductDetailView = (product: object) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      items: [product],
    });
  }
  console.log(`[Analytics] Product Detail View`, product);
};

// Function to track adding a product to the cart
export const trackAddToCart = (product: object) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      items: [product],
    });
  }
  console.log(`[Analytics] Add to Cart`, product);
};

// Function to track removing a product from the cart
export const trackRemoveFromCart = (product: object) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      items: [product],
    });
  }
  console.log(`[Analytics] Remove from Cart`, product);
};

// Function to track starting a checkout process
export const trackBeginCheckout = (products: object[], coupon?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      items: products,
      coupon: coupon,
    });
  }
  console.log(`[Analytics] Begin Checkout`, products, coupon);
};

// Function to track adding payment information
export const trackAddPaymentInfo = (payment_type: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_payment_info', {
      payment_type: payment_type,
    });
  }
  console.log(`[Analytics] Add Payment Info`, payment_type);
};

// Function to track a purchase
export const trackPurchase = (transaction_id: string, value: number, currency: string, products: object[], coupon?: string, shipping?: number, tax?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transaction_id,
      value: value,
      currency: currency,
      items: products,
      coupon: coupon,
      shipping: shipping,
      tax: tax,
    });
  }
  console.log(`[Analytics] Purchase`, transaction_id, value, currency, products, coupon, shipping, tax);
};

// Add missing exports
export const trackQuizStart = (data?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_start', {
      event_category: 'engagement',
      ...data
    });
  }
  console.log('[Analytics] Quiz Start:', data);
};

export const trackQuizAnswer = (questionId: string, answer: string, data?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_answer', {
      event_category: 'engagement',
      question_id: questionId,
      answer: answer,
      ...data
    });
  }
  console.log('[Analytics] Quiz Answer:', { questionId, answer, data });
};

export const trackQuizComplete = (result: any, data?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_complete', {
      event_category: 'conversion',
      result_type: result?.primaryStyle?.category,
      ...data
    });
  }
  console.log('[Analytics] Quiz Complete:', { result, data });
};

export const trackResultView = (resultType: string, data?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'result_view', {
      event_category: 'engagement',
      result_type: resultType,
      ...data
    });
  }
  console.log('[Analytics] Result View:', { resultType, data });
};

export const getCreativePerformance = async () => {
  // Mock implementation for now
  return {
    campaigns: [],
    totalImpressions: 0,
    totalClicks: 0,
    totalConversions: 0,
    ctr: 0,
    conversionRate: 0
  };
};
