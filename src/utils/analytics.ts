// Existing analytics functions
export const trackPageView = (page: string) => {
  console.log('Page view tracked:', page);
  // Implementation for page view tracking
};

export const trackSaleConversion = (email: string, value: number) => {
  console.log('Sale conversion tracked:', { email, value });
  // Implementation for sale conversion tracking
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
