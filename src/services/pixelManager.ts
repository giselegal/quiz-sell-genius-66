
/**
 * Serviço para gerenciar múltiplos Facebook Pixels no sistema
 */

interface FunnelConfig {
  pixelId: string;
  token: string;
  utmCampaign: string;
  funnelName: string;
  ctaUrl: string;
}

export const FUNNEL_CONFIGS: Record<string, FunnelConfig> = {
  // Teste A - Quiz separado + página de resultado
  "default": {
    pixelId: "1311550759901086",
    token: "EAAEJYWeJHLABOZCPfFdzFEgAh8lHkcZAH1hJpVMmuU81MBETMnbfHVTRE41HqxkowK2eZCbF1oLmHyyFTR0v4AJQkUHotjqwzQ6issC2PQVOsbMc2yaZCcZCiErmmS7ghVCeHJDBi3txBnnRcmPpaaAi4qZCiTSsBtQMgg8GdLUsYZCbMMMIsgYLvgRYDrOiAZDZD",
    utmCampaign: "Teste_A_Quiz_Separado",
    funnelName: "teste_a_quiz_separado",
    ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
  },
  // Teste B - Quiz como parte da oferta (página de venda direta)
  "quiz-descubra-seu-estilo": {
    pixelId: "1311550759901086",
    token: "EAAEJYWeJHLABOZCPfFdzFEgAh8lHkcZAH1hJpVMmuU81MBETMnbfHVTRE41HqxkowK2eZCbF1oLmHyyFTR0v4AJQkUHotjqwzQ6issC2PQVOsbMc2yaZCcZCiErmmS7ghVCeHJDBi3txBnnRcmPpaaAi4qZCiTSsBtQMgg8GdLUsYZCbMMMIsgYLvgRYDrOiAZDZD",
    utmCampaign: "Teste_B_Quiz_Embutido",
    funnelName: "teste_b_quiz_embutido",
    ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
  }
};

/**
 * Identifica o funil atual baseado na URL
 */
export const getCurrentFunnel = (): string => {
  if (typeof window === 'undefined') return 'default';
  
  const path = window.location.pathname;
  
  // Verifica caminhos específicos para identificar o funil
  if (path.includes('/quiz-descubra-seu-estilo')) {
    return 'quiz-descubra-seu-estilo';
  }
  
  // Funil padrão se nenhuma condição for atendida
  return 'default';
};

/**
 * Obtém a configuração do funil atual
 */
export const getCurrentFunnelConfig = (): FunnelConfig => {
  const funnelId = getCurrentFunnel();
  return FUNNEL_CONFIGS[funnelId] || FUNNEL_CONFIGS.default;
};

/**
 * Obtém o ID do Pixel do Facebook para o funil atual
 */
export const getPixelId = (): string => {
  return getCurrentFunnelConfig().pixelId;
};

/**
 * Obtém o token de acesso do Facebook para o funil atual
 */
export const getFacebookToken = (): string => {
  return getCurrentFunnelConfig().token;
};

/**
 * Obtém a campanha UTM para o funil atual
 */
export const getUtmCampaign = (): string => {
  return getCurrentFunnelConfig().utmCampaign;
};

/**
 * Obtém a URL de CTA para o funil atual
 */
export const getCtaUrl = (): string => {
  return getCurrentFunnelConfig().ctaUrl;
};

/**
 * Marca evento específico de funil para análises
 */
export const trackFunnelEvent = (eventName: string, eventData: Record<string, unknown> = {}): void => {
  const funnelConfig = getCurrentFunnelConfig();
  
  // Adiciona informações do funil aos dados do evento
  const enrichedData = {
    ...eventData,
    funnel_id: funnelConfig.funnelName,
    funnel_name: funnelConfig.funnelName === 'teste_a_quiz_separado' ? 'Teste A - Quiz Separado' : 'Teste B - Quiz Embutido',
    funnel_campaign: funnelConfig.utmCampaign,
    pixel_id: funnelConfig.pixelId
  };
  
  // Registra no console para debugging
  console.log(`Tracking funnel event: ${eventName}`, enrichedData);
  
  // Se o Facebook Pixel estiver disponível, envia o evento
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, enrichedData);
  }
};
