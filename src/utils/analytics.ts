/**
 * Inicializa o Pixel do Facebook
 */
import { getPixelId, getCurrentFunnelConfig, getFacebookToken, getCtaUrl, getUtmCampaign, trackFunnelEvent } from '@/services/pixelManager';

// ===== SISTEMA DE DEDUPLICAÇÃO =====
/**
 * Armazena eventos já enviados para prevenir duplicatas
 */
const sentEvents = new Set<string>();

/**
 * Gera um ID único para o evento baseado no tipo, dados e timestamp
 */
const generateEventId = (eventType: string, eventData: Record<string, any> = {}): string => {
  const timestamp = Date.now();
  const dataHash = JSON.stringify(eventData);
  const sessionId = getOrCreateSessionId();
  return `${eventType}_${sessionId}_${timestamp}_${btoa(dataHash).slice(0, 8)}`;
};

/**
 * Obtém ou cria um ID de sessão único
 */
const getOrCreateSessionId = (): string => {
  let sessionId = sessionStorage.getItem('fb_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('fb_session_id', sessionId);
  }
  return sessionId;
};

/**
 * Verifica se um evento já foi enviado recentemente
 */
const isDuplicateEvent = (eventId: string): boolean => {
  return sentEvents.has(eventId);
};

/**
 * Marca um evento como enviado
 */
const markEventAsSent = (eventId: string): void => {
  sentEvents.add(eventId);
  
  // Remove eventos antigos para evitar memory leak (manter apenas últimos 100 eventos)
  if (sentEvents.size > 100) {
    const eventsArray = Array.from(sentEvents);
    eventsArray.slice(0, sentEvents.size - 100).forEach(oldEventId => {
      sentEvents.delete(oldEventId);
    });
  }
};

/**
 * Envia evento para Facebook Pixel com deduplicação automática
 */
const sendFacebookEvent = (
  eventType: 'track' | 'trackCustom', 
  eventName: string, 
  eventData: Record<string, any> = {},
  options: { allowDuplicate?: boolean } = {}
): void => {
  if (!window.fbq) {
    console.warn('Facebook Pixel não inicializado');
    return;
  }

  try {
    // Gerar event_id único
    const eventId = generateEventId(eventName, eventData);
    
    // Verificar duplicata (a menos que explicitamente permitido)
    if (!options.allowDuplicate && isDuplicateEvent(eventId)) {
      console.log(`Evento duplicado bloqueado: ${eventName} (${eventId})`);
      return;
    }

    // Adicionar event_id aos dados do evento
    const enhancedEventData = {
      ...addUtmParamsToEvent(eventData),
      event_id: eventId,
      timestamp: Date.now(),
      session_id: getOrCreateSessionId()
    };

    // Enviar evento
    if (eventType === 'track') {
      window.fbq('track', eventName, enhancedEventData);
    } else {
      window.fbq('trackCustom', eventName, enhancedEventData);
    }

    // Marcar como enviado
    markEventAsSent(eventId);
    
    console.log(`Evento enviado: ${eventName}`, {
      event_id: eventId,
      data: enhancedEventData
    });

  } catch (error) {
    console.error(`Erro ao enviar evento ${eventName}:`, error);
  }
};

// ===== FUNÇÕES PÚBLICAS ATUALIZADAS =====

export const initFacebookPixel = () => {
  if (typeof window === 'undefined') return;

  try {
    // Verifica se o objeto fbq já existe
    if (!window.fbq) {
      // Se não existir, criamos o script do Facebook Pixel manualmente
      (function(f,b,e,v,n,t,s) {
        if (f.fbq) return; n=f.fbq=function() {
          n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
        n.queue=[]; t=b.createElement(e); t.async=!0;
        t.src=v; s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)
      })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      
      console.log('Facebook Pixel script carregado manualmente');
    }

    // Obtém o ID do pixel para o funil atual
    const pixelId = getPixelId();
    console.log('Inicializando Facebook Pixel com ID:', pixelId);

    // Inicializa o Pixel
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
    
    // Registra adicionalmente o funil atual para análises
    const funnelConfig = getCurrentFunnelConfig();
    console.log('Funil atual:', funnelConfig.funnelName, '(', funnelConfig.utmCampaign, ')');

  } catch (error) {
    console.error('Erro ao inicializar o Facebook Pixel:', error);
  }
};

// Utilitário para adicionar parâmetros UTM aos eventos - REMOVIDO - duplicado abaixo

/**
 * Rastreia um evento de geração de lead
 * @param email Email do lead
 * @param name Nome do lead (opcional)
 */
export const trackLeadGeneration = (email: string, name?: string) => {
  const eventData = {
    email: email,
    name: name || 'unknown',
    value: 0,
    currency: 'BRL',
    funnel: getCurrentFunnelConfig().funnelName
  };

  // Armazenar dados do usuário para tracking posterior
  storeUserTrackingData(email, { name, lead_timestamp: Date.now() });

  // Enviar para Facebook Pixel com deduplicação
  sendFacebookEvent('track', 'Lead', eventData);

  // Registrar no log de eventos para análise
  logEventForAnalysis('Lead', eventData);
  
  // Track in Google Analytics, if available
  if (window.gtag) {
    window.gtag('event', 'lead_generation', {
      event_category: 'lead',
      event_label: email,
      funnel: getCurrentFunnelConfig().funnelName
    });
  }
};

/**
 * Captura parâmetros UTM da URL atual e armazena no localStorage
 * Retorna os parâmetros UTM capturados
 */
export const captureUTMParameters = (): Record<string, string> => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    
    // Parâmetros UTM padrão
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'];
    utmKeys.forEach(key => {
      if (urlParams.has(key)) {
        const value = urlParams.get(key);
        if (value) {
          utmParams[key] = value;
        }
      }
    });
    
    // Parâmetro específico do Facebook
    if (urlParams.has('fbclid')) {
      utmParams['fbclid'] = urlParams.get('fbclid') || '';
    }
    
    // Gclid para Google Ads
    if (urlParams.has('gclid')) {
      utmParams['gclid'] = urlParams.get('gclid') || '';
    }
    
    // Se encontrou algum parâmetro UTM, armazena no localStorage
    if (Object.keys(utmParams).length > 0) {
      localStorage.setItem('utm_parameters', JSON.stringify(utmParams));
      
      // Track UTM parameters if Facebook Pixel is available
      sendFacebookEvent('trackCustom', 'UTMCaptured', utmParams);
      
      console.log('UTM parameters captured:', utmParams);
    }
    
    return utmParams;
  } catch (error) {
    console.error('Error capturing UTM parameters:', error);
    return {};
  }
};

/**
 * Adiciona parâmetros UTM armazenados ao evento do Facebook Pixel
 */
export const addUtmParamsToEvent = (eventData: Record<string, any> = {}): Record<string, any> => {
  try {
    const storedUtmParams = localStorage.getItem('utm_parameters');
    if (storedUtmParams) {
      const utmParams = JSON.parse(storedUtmParams);
      // Adiciona parâmetros UTM ao objeto eventData para o Facebook Pixel
      return {
        ...eventData,
        utm_source: utmParams.utm_source || utmParams.source,
        utm_medium: utmParams.utm_medium || utmParams.medium,
        utm_campaign: utmParams.utm_campaign || utmParams.campaign,
        utm_content: utmParams.utm_content || utmParams.content,
        utm_term: utmParams.utm_term || utmParams.term,
        fbclid: utmParams.fbclid
      };
    }
    return eventData;
  } catch (error) {
    console.error('Error adding UTM parameters to event:', error);
    return eventData;
  }
};

/**
 * Rastreia o início do quiz
 * @param userName Nome do usuário
 * @param userEmail Email do usuário (opcional)
 */
export const trackQuizStart = (userName?: string, userEmail?: string) => {
  const eventData = {
    username: userName || 'Anônimo',
    user_email: userEmail || '',
    funnel: getCurrentFunnelConfig().funnelName
  };
  
  // Enviar para Facebook Pixel com deduplicação
  sendFacebookEvent('trackCustom', 'QuizStart', eventData);

  // Registrar no log de eventos para análise
  logEventForAnalysis('QuizStart', eventData);
  
  // Adicionar tracking específico para análises de funil
  trackFunnelEvent('FunnelQuizStart', {
    username: userName || 'Anônimo',
    has_email: !!userEmail
  });
  
  // Track in Google Analytics, if available
  if (window.gtag) {
    window.gtag('event', 'quiz_start', {
      event_category: 'quiz',
      event_label: userEmail ? 'with_email' : 'anonymous',
      funnel: getCurrentFunnelConfig().funnelName
    });
  }
};

/**
 * Rastreia uma resposta no quiz
 * @param questionId ID da pergunta
 * @param selectedOptions IDs das opções selecionadas
 * @param currentQuestionIndex Índice da pergunta atual
 * @param totalQuestions Número total de perguntas
 */
export const trackQuizAnswer = (questionId: string, selectedOptions: string[], currentQuestionIndex: number, totalQuestions: number) => {
  const eventData = {
    question_id: questionId,
    selected_options: selectedOptions.join(', '),
    current_question_index: currentQuestionIndex,
    total_questions: totalQuestions
  };
  
  // Enviar para Facebook Pixel com deduplicação
  sendFacebookEvent('trackCustom', 'QuizAnswer', eventData);
  
  // Track in Google Analytics, if available
  if (window.gtag) {
    window.gtag('event', 'quiz_answer', {
      event_category: 'quiz',
      question_id: questionId,
      selected_options: selectedOptions.join(', '),
      current_question_index: currentQuestionIndex,
      total_questions: totalQuestions
    });
  }
};

/**
 * Rastreia a conclusão do quiz
 */
export const trackQuizComplete = () => {
  // Calcular o tempo decorrido desde o início do quiz
  const startTime = localStorage.getItem('quiz_start_time');
  const endTime = Date.now();
  const duration = startTime ? (endTime - parseInt(startTime, 10)) / 1000 : 0; // em segundos
  
  const eventData = {
    quiz_duration: duration
  };
  
  // Enviar para Facebook Pixel com deduplicação
  sendFacebookEvent('trackCustom', 'QuizComplete', eventData);
  
  // Track in Google Analytics, if available
  if (window.gtag) {
    window.gtag('event', 'quiz_complete', {
      event_category: 'quiz',
      quiz_duration: duration
    });
  }
};

/**
 * Rastreia a visualização do resultado
 * @param styleCategory Categoria do estilo predominante
 */
export const trackResultView = (styleCategory: string) => {
  const eventData = {
    style_category: styleCategory
  };
  
  // Enviar para Facebook Pixel com deduplicação
  sendFacebookEvent('trackCustom', 'ResultView', eventData);
  
  // Track in Google Analytics, if available
  if (window.gtag) {
    window.gtag('event', 'result_view', {
      event_category: 'quiz',
      event_label: styleCategory
    });
  }
};

/**
 * Registra cliques em botões para análise
 * @param buttonId ID do botão (opcional)
 * @param buttonText Texto do botão (opcional)
 * @param buttonLocation Localização do botão na interface (opcional)
 * @param actionType Tipo de ação associada ao botão (opcional)
 */
export const trackButtonClick = (
  buttonId?: string, 
  buttonText?: string, 
  buttonLocation?: string,
  actionType?: string
) => {
  const eventData = {
    button_id: buttonId || 'unknown',
    button_text: buttonText || 'unknown',
    button_location: buttonLocation || 'unknown',
    action_type: actionType || 'click',
    funnel: getCurrentFunnelConfig().funnelName
  };
  
  // Enviar para Facebook Pixel com deduplicação
  sendFacebookEvent('trackCustom', 'ButtonClick', eventData);
  
  // Track in Google Analytics, if available
  if (window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'interaction',
      event_label: buttonText || buttonId,
      button_location: buttonLocation,
      funnel: getCurrentFunnelConfig().funnelName
    });
  }
};

/**
 * Registra conversões de vendas
 * @param value Valor da venda
 * @param productName Nome do produto (opcional)
 * @param transactionId ID da transação (opcional)
 */
export const trackSaleConversion = (value: number, productName?: string, transactionId?: string) => {
  const eventData = {
    value: value,
    currency: 'BRL',
    content_name: productName || 'Guia de Estilo',
    content_type: 'product',
    transaction_id: transactionId || `T_${Date.now()}`,
    funnel: getCurrentFunnelConfig().funnelName
  };
  
  // Enviar evento Purchase para Facebook Pixel com deduplicação
  sendFacebookEvent('track', 'Purchase', eventData);

  // Registrar no log de eventos para análise
  logEventForAnalysis('Purchase', eventData);
  
  // Adicionar tracking específico para análises de funil
  trackFunnelEvent('FunnelPurchase', {
    value: value,
    product_name: productName || 'Guia de Estilo',
    transaction_id: transactionId
  });
  
  // Track in Google Analytics, if available
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId || 'T_' + Date.now(),
      value: value,
      currency: 'BRL',
      items: [{
        name: productName || 'Guia de Estilo',
        price: value,
        funnel: getCurrentFunnelConfig().funnelName
      }]
    });
  }
};

/**
 * Obtém todos os eventos analytics armazenados
 */
export const getAnalyticsEvents = () => {
  try {
    const eventsJson = localStorage.getItem('analytics_events');
    return eventsJson ? JSON.parse(eventsJson) : [];
  } catch (error) {
    console.error('Error getting analytics events:', error);
    return [];
  }
};

/**
 * Limpa todos os dados de analytics armazenados
 */
export const clearAnalyticsData = () => {
  try {
    localStorage.removeItem('analytics_events');
    localStorage.removeItem('fb_pixel_event_log');
    localStorage.removeItem('analytics_metrics_cache');
    console.log('Analytics data cleared');
    return true;
  } catch (error) {
    console.error('Error clearing analytics data:', error);
    return false;
  }
};

/**
 * Testa a funcionalidade do Facebook Pixel
 */
export const testFacebookPixel = () => {
  const testData = { test_value: 'test', test_timestamp: Date.now() };
  
  // Enviar evento de teste com deduplicação
  sendFacebookEvent('trackCustom', 'TestEvent', testData, { allowDuplicate: true });
  
  return !!window.fbq;
};

/**
 * Armazena dados de tracking do usuário para conectar com vendas posteriores
 */
export const storeUserTrackingData = (email: string, userData: any = {}) => {
  const trackingData = {
    email,
    utm_parameters: JSON.parse(localStorage.getItem('utm_parameters') || '{}'),
    session_id: getOrCreateSessionId(),
    timestamp: Date.now(),
    quiz_completion: userData,
    funnel: getCurrentFunnelConfig().funnelName,
    user_name: localStorage.getItem('userName') || 'unknown'
  };
  
  // Armazenar dados localmente (em produção seria enviado para backend)
  localStorage.setItem(`user_tracking_${email}`, JSON.stringify(trackingData));
  
  // Também manter uma lista de todos os usuários trackados
  const allUsers = JSON.parse(localStorage.getItem('tracked_users') || '[]');
  const existingUserIndex = allUsers.findIndex((user: any) => user.email === email);
  
  if (existingUserIndex >= 0) {
    allUsers[existingUserIndex] = trackingData;
  } else {
    allUsers.push(trackingData);
  }
  
  localStorage.setItem('tracked_users', JSON.stringify(allUsers));
  
  console.log('👤 Dados de tracking do usuário armazenados:', trackingData);
  
  return trackingData;
};

/**
 * Recupera dados de tracking de um usuário pelo email
 */
export const getUserTrackingData = (email: string) => {
  const userData = localStorage.getItem(`user_tracking_${email}`);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Registra eventos em um log global para análise posterior
 */
export const logEventForAnalysis = (eventType: string, eventData: Record<string, any>) => {
  const eventLog = {
    event_name: eventType,
    timestamp: Date.now(),
    date: new Date().toISOString(),
    ...eventData
  };
  
  // Armazenar em log global de eventos
  const allEvents = JSON.parse(localStorage.getItem('all_tracked_events') || '[]');
  allEvents.push(eventLog);
  
  // Manter apenas os últimos 1000 eventos para não sobrecarregar o localStorage
  if (allEvents.length > 1000) {
    allEvents.splice(0, allEvents.length - 1000);
  }
  
  localStorage.setItem('all_tracked_events', JSON.stringify(allEvents));
};

/**
 * Analisa performance por criativo/utm_content
 */
export const getCreativePerformance = (days: number = 7) => {
  const events = JSON.parse(localStorage.getItem('all_tracked_events') || '[]');
  const cutoffDate = Date.now() - (days * 24 * 60 * 60 * 1000);
  
  // Filtrar eventos dos últimos N dias
  const recentEvents = events.filter((event: any) => event.timestamp >= cutoffDate);
  
  const creativeStats: Record<string, any> = {};
  
  recentEvents.forEach((event: any) => {
    const creative = event.utm_content || 'unknown';
    
    if (!creativeStats[creative]) {
      creativeStats[creative] = {
        creative_name: creative,
        page_views: 0,
        quiz_starts: 0,
        quiz_completions: 0,
        leads: 0,
        purchases: 0,
        revenue: 0,
        conversion_rate: 0,
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
  
  // Calcular métricas
  Object.keys(creativeStats).forEach(creative => {
    const stats = creativeStats[creative];
    stats.conversion_rate = stats.page_views > 0 ? 
      ((stats.purchases / stats.page_views) * 100).toFixed(2) : '0.00';
  });
  
  return creativeStats;
};
