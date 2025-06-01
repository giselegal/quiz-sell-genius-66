// src/utils/builderConfig.ts
import { builder } from '@builder.io/react';

// API Key real do Builder.io - PRODUÇÃO
const BUILDER_API_KEY = '15b188fc9daf4dc5a37e11da13166d10';

// Função segura para registrar componentes
const registerComponentsSafely = async () => {
  try {
    const { registerComponents } = await import('./builderComponentRegistry');
    registerComponents();
  } catch (error) {
    console.warn('Erro ao registrar componentes Builder.io:', error);
  }
};

// Inicializar Builder.io de forma segura
const initializeBuilderSafely = () => {
  try {
    // Inicializar Builder.io apenas com a API key
    builder.init(BUILDER_API_KEY);

    // Registrar componentes customizados de forma assíncrona
    registerComponentsSafely();
    
    console.log('Builder.io inicializado com sucesso - API Key real conectada');
  } catch (error) {
    console.warn('Erro ao inicializar Builder.io:', error);
  }
};

export { builder };

// Exportar função para re-inicializar com nova API key quando necessário
export const reinitializeBuilder = (apiKey: string) => {
  try {
    builder.init(apiKey);
    // Re-registrar componentes após reinicialização
    registerComponentsSafely();
  } catch (error) {
    console.error('Erro ao reinicializar Builder.io:', error);
  }
};

// Exportar função de inicialização segura
export const initializeBuilder = initializeBuilderSafely;
