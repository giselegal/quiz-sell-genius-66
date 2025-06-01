// src/utils/builderConfig.ts
import { builder } from '@builder.io/react';
import { BUILDER_CONFIG } from '../config/builderConfig.js';

// Usar API Key configurada (produção, demo ou offline)
const BUILDER_API_KEY = BUILDER_CONFIG.getActiveApiKey();

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
    // Mostrar informações sobre a API key atual
    console.log(`🔧 Builder.io Mode: ${BUILDER_CONFIG.CURRENT_MODE}`);
    console.log(`🔑 API Key: ${BUILDER_API_KEY.substring(0, 8)}...`);
    
    // Verificar modo offline
    if (BUILDER_CONFIG.isOfflineMode()) {
      console.log('🔌 Modo offline ativo - Builder.io não será inicializado');
      return;
    }
    
    if (BUILDER_CONFIG.isDemoMode()) {
      console.warn('⚠️  USANDO API KEY DE DEMONSTRAÇÃO - Para produção, configure uma API key válida em BUILDER_CONFIG');
    }
    
    // Inicializar Builder.io apenas com a API key
    builder.init(BUILDER_API_KEY);

    // Registrar componentes customizados de forma assíncrona
    registerComponentsSafely();
    
    console.log('✅ Builder.io inicializado com sucesso');
  } catch (error) {
    console.warn('❌ Erro ao inicializar Builder.io:', error);
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
