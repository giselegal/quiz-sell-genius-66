// Utilitários para rastreamento de eventos na aplicação

/**
 * Rastreia visualizações de página
 * @param {string} pageName - Nome da página visualizada
 * @param {object} pageData - Dados adicionais sobre a página
 */
export const trackPageView = (pageName, pageData = {}) => {
  if (typeof window === 'undefined') return;
  
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      ...pageData
    });
  }
  
  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
  
  // DataLayer para Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      pageName,
      ...pageData
    });
  }
  
  console.log(`[Analytics] Visualização de página: ${pageName}`, pageData);
};

/**
 * Rastreia cliques em botões
 * @param {string} buttonId - Identificador único do botão
 * @param {string} buttonText - Texto exibido no botão
 * @param {string} pageName - Nome da página onde o botão está
 * @param {object} eventData - Dados adicionais sobre o evento
 */
export const trackButtonClick = (buttonId, buttonText, pageName, eventData = {}) => {
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
  
  // Facebook Pixel
  if (window.fbq) {
    window.fbq('trackCustom', 'ButtonClick', {
      button_id: buttonId,
      button_text: buttonText,
      page_name: pageName,
      ...eventData
    });
  }
  
  // DataLayer para Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'button_click',
      buttonId,
      buttonText,
      pageName,
      ...eventData
    });
  }
  
  console.log(`[Analytics] Clique em botão: ${buttonText} (${buttonId}) em ${pageName}`, eventData);
};

/**
 * Rastreia conversões (ex: inscrições, compras)
 * @param {string} conversionType - Tipo de conversão (ex: 'lead', 'purchase')
 * @param {object} conversionData - Dados sobre a conversão
 */
export const trackConversion = (conversionType, conversionData = {}) => {
  if (typeof window === 'undefined') return;
  
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', conversionType, conversionData);
  }
  
  // Facebook Pixel
  if (window.fbq) {
    if (conversionType === 'purchase') {
      window.fbq('track', 'Purchase', conversionData);
    } else if (conversionType === 'lead') {
      window.fbq('track', 'Lead', conversionData);
    } else {
      window.fbq('trackCustom', conversionType, conversionData);
    }
  }
  
  // DataLayer para Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: conversionType,
      ...conversionData
    });
  }
  
  console.log(`[Analytics] Conversão: ${conversionType}`, conversionData);
};

/**
 * Captura parâmetros UTM da URL e os armazena para uso em analytics
 * @returns {object} Objeto com os parâmetros UTM capturados
 */
export const captureUTMParameters = () => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};
  
  // Lista de parâmetros UTM a capturar
  const utmKeys = [
    'utm_source', 
    'utm_medium', 
    'utm_campaign', 
    'utm_term', 
    'utm_content',
    'ref',
    'source'
  ];
  
  // Extrair parâmetros da URL
  utmKeys.forEach(key => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
      
      // Armazenar no localStorage para uso posterior
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn(`[Analytics] Falha ao armazenar ${key} no localStorage`, e);
      }
    }
  });
  
  // Registrar no Google Analytics
  if (window.gtag && Object.keys(utmParams).length > 0) {
    window.gtag('set', 'user_properties', utmParams);
  }
  
  // Enviar para Facebook Pixel
  if (window.fbq && Object.keys(utmParams).length > 0) {
    window.fbq('trackCustom', 'UTMCapture', utmParams);
  }
  
  // DataLayer para Google Tag Manager
  if (window.dataLayer && Object.keys(utmParams).length > 0) {
    window.dataLayer.push({
      event: 'utm_capture',
      ...utmParams
    });
  }
  
  console.log('[Analytics] Parâmetros UTM capturados:', utmParams);
  return utmParams;
};
