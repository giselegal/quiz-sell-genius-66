/**
 * Configuração unificada do Facebook Pixel para Testes A/B
 * 
 * Este arquivo centraliza toda a configuração do pixel para evitar duplicações
 * e garantir consistência nas métricas entre os diferentes testes.
 */

// Configuração única do pixel
export const PIXEL_CONFIG = {
  // Pixel único para ambos os testes
  PIXEL_ID: "1311550759901086",
  ACCESS_TOKEN: "EAAEJYWeJHLABOZCPfFdzFEgAh8lHkcZAH1hJpVMmuU81MBETMnbfHVTRE41HqxkowK2eZCbF1oLmHyyFTR0v4AJQkUHotjqwzQ6issC2PQVOsbMc2yaZCcZCiErmmS7ghVCeHJDBi3txBnnRcmPpaaAi4qZCiTSsBtQMgg8GdLUsYZCbMMMIsgYLvgRYDrOiAZDZD",
  
  // URLs de teste
  TESTE_A_URLS: [
    "https://giselegalvao.com.br/quiz",
    "https://giselegalvao.com.br/resultado"
  ],
  
  TESTE_B_URLS: [
    "https://giselegalvao.com.br/quiz-descubra-seu-estilo"
  ]
} as const;

// Configurações específicas dos testes
export const TESTE_CONFIG = {
  A: {
    name: "Teste A - Quiz + Resultado Separados",
    description: "Quiz como ferramenta de captura + página de resultado com oferta",
    campaign_source: "teste_a_quiz_separado",
    funnel_type: "two_step"
  },
  B: {
    name: "Teste B - Quiz Embutido na Oferta", 
    description: "Página de venda direta com quiz como parte da oferta",
    campaign_source: "teste_b_quiz_embutido",
    funnel_type: "single_step"
  }
} as const;

/**
 * Identifica qual teste está sendo executado baseado na URL
 */
export const detectCurrentTest = (): 'A' | 'B' => {
  if (typeof window === 'undefined') return 'A';
  
  const currentUrl = window.location.href;
  const pathname = window.location.pathname;
  
  // Verifica se é teste B
  if (pathname.includes('/quiz-descubra-seu-estilo')) {
    return 'B';
  }
  
  // Por padrão, assume teste A
  return 'A';
};

/**
 * Obtém a configuração do teste atual
 */
export const getCurrentTestConfig = () => {
  const currentTest = detectCurrentTest();
  return TESTE_CONFIG[currentTest];
};

/**
 * Evento customizado para trackear diferenciação entre testes
 */
export const trackTestEvent = (eventName: string, additionalData: Record<string, unknown> = {}) => {
  const testConfig = getCurrentTestConfig();
  const currentTest = detectCurrentTest();
  
  const eventData = {
    ...additionalData,
    test_variant: currentTest,
    test_name: testConfig.name,
    campaign_source: testConfig.campaign_source,
    funnel_type: testConfig.funnel_type,
    pixel_id: PIXEL_CONFIG.PIXEL_ID,
    timestamp: new Date().toISOString()
  };
  
  // Log para debugging
  console.log(`[PIXEL TRACKING] ${eventName}:`, eventData);
  
  // Envia para Facebook Pixel se disponível
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, eventData);
  }
  
  return eventData;
};

/**
 * Eventos padrão para ambos os testes
 */
export const TRACKING_EVENTS = {
  // Eventos do Quiz
  QUIZ_START: 'quiz_start',
  QUIZ_QUESTION_ANSWERED: 'quiz_question_answered', 
  QUIZ_COMPLETED: 'quiz_completed',
  
  // Eventos de Resultado/Oferta
  RESULT_VIEWED: 'result_viewed',
  OFFER_VIEWED: 'offer_viewed',
  CTA_CLICKED: 'cta_clicked',
  
  // Eventos de Conversão
  LEAD_GENERATED: 'lead_generated',
  PURCHASE_INITIATED: 'purchase_initiated',
  PURCHASE_COMPLETED: 'purchase_completed'
} as const;

export default {
  PIXEL_CONFIG,
  TESTE_CONFIG,
  detectCurrentTest,
  getCurrentTestConfig,
  trackTestEvent,
  TRACKING_EVENTS
};
