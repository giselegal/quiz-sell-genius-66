// src/utils/builderConfig.ts
import { builder } from '@builder.io/react';

// API Key demo do Builder.io - substitua pela sua quando conseguir acesso
// Esta é uma chave pública de demonstração que permite testar a funcionalidade básica
const DEMO_API_KEY = 'YJIGb4i01jvw0SRdL5Bt';

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
    builder.init(DEMO_API_KEY);

    // Registrar componentes customizados de forma assíncrona
    registerComponentsSafely();
    
    console.log('Builder.io inicializado com sucesso');
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
