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

/**
 * Retorna todos os eventos de analytics rastreados (do dataLayer).
 * @returns {Array<object>} Array de eventos de analytics.
 */
export const getAnalyticsEvents = () => {
  if (typeof window !== 'undefined' && window.dataLayer && Array.isArray(window.dataLayer)) {
    // Retorna uma cópia para evitar mutações externas do dataLayer original
    return [...window.dataLayer];
  }
  return [];
};

/**
 * Limpa os dados de analytics, incluindo o dataLayer e os parâmetros UTM armazenados.
 */
export const clearAnalyticsData = () => {
  if (typeof window === 'undefined') return;

  // Limpar o dataLayer
  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.length = 0; // Esvazia o array mantendo a referência
    console.log('[Analytics] window.dataLayer foi limpo.');
  }

  // Lista de parâmetros UTM para remover do localStorage
  const utmKeys = [
    'utm_source', 
    'utm_medium', 
    'utm_campaign', 
    'utm_term', 
    'utm_content',
    'ref',
    'source'
  ];

  // Remover parâmetros UTM do localStorage
  utmKeys.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[Analytics] Falha ao remover ${key} do localStorage`, e);
    }
  });
  console.log('[Analytics] Parâmetros UTM do localStorage foram limpos.');

  // Nota: A limpeza do cache de métricas (resetMetricsCache) é feita em analyticsHelpers.ts
  // e deve ser chamada separadamente se necessário.
};

/**
 * Testa a configuração do Facebook Pixel enviando um evento de PageView.
 * (Esta é uma função de exemplo, pode precisar de ajustes)
 */
export const testFacebookPixel = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
    console.log('[Analytics] Evento PageView de teste enviado para o Facebook Pixel.');
    return true;
  }
  console.warn('[Analytics] Facebook Pixel (window.fbq) não encontrado.');
  return false;
};

/**
 * Rastreia o início de um quiz.
 * @param {string} quizId - Identificador do quiz.
 * @param {object} eventData - Dados adicionais sobre o evento.
 */
export const trackQuizStart = (quizId, eventData = {}) => {
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
  console.log(`[Analytics] Quiz iniciado: ${quizId}`, data);
};

/**
 * Rastreia uma resposta a uma pergunta do quiz.
 * @param {string} quizId - Identificador do quiz.
 * @param {string} questionId - Identificador da pergunta.
 * @param {string} answer - Resposta fornecida.
 * @param {object} eventData - Dados adicionais sobre o evento.
 */
export const trackQuizAnswer = (quizId, questionId, answer, eventData = {}) => {
  if (typeof window === 'undefined') return;
  const data = { quiz_id: quizId, question_id: questionId, answer: answer, ...eventData };

  if (window.gtag) {
    window.gtag('event', 'quiz_answer', data);
  }
  if (window.fbq) {
    window.fbq('trackCustom', 'QuizAnswer', data);
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: 'quiz_answer', ...data });
  }
  console.log(`[Analytics] Resposta ao quiz: ${questionId} - ${answer}`, data);
};

/**
 * Rastreia a conclusão de um quiz.
 * @param {string} quizId - Identificador do quiz.
 * @param {object} eventData - Dados adicionais sobre o evento (ex: pontuação).
 */
export const trackQuizComplete = (quizId, eventData = {}) => {
  if (typeof window === 'undefined') return;
  const data = { quiz_id: quizId, ...eventData };

  if (window.gtag) {
    window.gtag('event', 'quiz_complete', data);
  }
  if (window.fbq) {
    window.fbq('trackCustom', 'QuizComplete', data);
  }
  if (window.dataLayer) {
    window.dataLayer.push({ event: 'quiz_complete', ...data });
  }
  console.log(`[Analytics] Quiz concluído: ${quizId}`, data);
};

/**
 * Rastreia a visualização da página de resultados do quiz.
 * @param {string} quizId - Identificador do quiz.
 * @param {string} resultId - Identificador do resultado/persona.
 * @param {object} eventData - Dados adicionais sobre o evento.
 */
export const trackResultView = (quizId, resultId, eventData = {}) => {
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
  console.log(`[Analytics] Visualização de resultado: ${quizId} - ${resultId}`, data);
};
