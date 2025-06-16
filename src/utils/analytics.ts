
/**
 * Utilitários para tracking e analytics
 */

// Declara o tipo para o Facebook Pixel
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    gtag: (...args: any[]) => void;
  }
}

/**
 * Registra clique em botão
 */
export const trackButtonClick = (buttonId: string, buttonText: string, section: string) => {
  console.log('Button click tracked:', { buttonId, buttonText, section });
  
  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ButtonClick', {
      button_id: buttonId,
      button_text: buttonText,
      section: section
    });
  }

  // Google Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Button',
      event_label: buttonText,
      custom_parameter_button_id: buttonId,
      custom_parameter_section: section
    });
  }
};

/**
 * Registra conversão de venda
 */
export const trackSaleConversion = (email: string, value: number) => {
  console.log('Sale conversion tracked:', { email, value });
  
  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: 'BRL',
      content_type: 'product',
      content_ids: ['quiz-completo'],
      email: email
    });
  }

  // Google Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: Date.now().toString(),
      value: value,
      currency: 'BRL',
      items: [{
        item_id: 'quiz-completo',
        item_name: 'Quiz Completo + Bônus',
        category: 'Digital Product',
        quantity: 1,
        price: value
      }]
    });
  }
};

/**
 * Registra visualização de página
 */
export const trackPageView = (pageName: string, pageUrl?: string) => {
  console.log('Page view tracked:', { pageName, pageUrl });
  
  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView', {
      page_name: pageName,
      page_url: pageUrl || window.location.href
    });
  }

  // Google Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: pageUrl || window.location.href
    });
  }
};

/**
 * Registra evento personalizado
 */
export const trackCustomEvent = (eventName: string, eventData: Record<string, any> = {}) => {
  console.log('Custom event tracked:', { eventName, eventData });
  
  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, eventData);
  }

  // Google Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
};

/**
 * Registra início do quiz
 */
export const trackQuizStart = (quizName: string) => {
  trackCustomEvent('QuizStart', {
    quiz_name: quizName,
    timestamp: new Date().toISOString()
  });
};

/**
 * Registra conclusão do quiz
 */
export const trackQuizComplete = (quizName: string, result: string) => {
  trackCustomEvent('QuizComplete', {
    quiz_name: quizName,
    quiz_result: result,
    timestamp: new Date().toISOString()
  });
};

/**
 * Registra lead (captura de email)
 */
export const trackLead = (email: string, source: string) => {
  console.log('Lead tracked:', { email, source });
  
  // Facebook Pixel tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      email: email,
      source: source
    });
  }

  // Google Analytics tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'BRL',
      value: 0,
      lead_source: source
    });
  }
};
