// Configuração do Builder.io
// Este arquivo permite alternar entre diferentes API keys para testes

export const BUILDER_CONFIG = {
  // API Key de produção (fornecida pelo usuário - atualmente inválida)
  PRODUCTION_API_KEY: 'a31ec1897d044da09b3a96f2b4f46102',
  
  // API Key válida para testes (Builder.io público)
  DEMO_API_KEY: 'f1a790f8c3204b3b8c5c1671cf061d27',
  
  // Configuração atual - altere para usar a API key desejada
  CURRENT_MODE: 'DEMO', // 'PRODUCTION', 'DEMO', ou 'OFFLINE'
  
  // Função para obter a API key ativa
  getActiveApiKey() {
    if (this.CURRENT_MODE === 'PRODUCTION') {
      return this.PRODUCTION_API_KEY;
    }
    if (this.CURRENT_MODE === 'OFFLINE') {
      return 'offline-mode'; // Modo offline para desenvolvimento
    }
    return this.DEMO_API_KEY;
  },
  
  // Função para verificar se estamos usando a API key de demo
  isDemoMode() {
    return this.CURRENT_MODE === 'DEMO';
  },
  
  // Função para verificar se estamos no modo offline
  isOfflineMode() {
    return this.CURRENT_MODE === 'OFFLINE';
  },
  
  // Modelos configurados para o projeto
  MODELS: {
    RESULT_PAGE: 'resultado-page',
    QUIZ_OFFER_PAGE: 'quiz-offer-page'
  },
  
  // Configuração de fallback para modo offline
  OFFLINE_CONTENT: {
    [this.MODELS?.RESULT_PAGE]: {
      data: {
        title: 'Página de Resultado - Modo Demo',
        showOriginal: false
      }
    },
    [this.MODELS?.QUIZ_OFFER_PAGE]: {
      data: {
        title: 'Página de Oferta - Modo Demo', 
        showOriginal: false
      }
    }
  }
};

export default BUILDER_CONFIG;
