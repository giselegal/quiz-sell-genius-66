// src/utils/builderConfig.ts
import { builder } from '@builder.io/react';
import { registerComponents } from './builderComponentRegistry';

// API Key demo do Builder.io - substitua pela sua quando conseguir acesso
// Esta é uma chave pública de demonstração que permite testar a funcionalidade básica
const DEMO_API_KEY = 'YJIGb4i01jvw0SRdL5Bt';

// Inicializar Builder.io
builder.init(DEMO_API_KEY);

// Configurações básicas do Builder.io
builder.configure({
  apiKey: DEMO_API_KEY,
  // Configurações adicionais podem ser adicionadas aqui
});

// Registrar componentes customizados
registerComponents();

export { builder };

// Exportar função para re-inicializar com nova API key quando necessário
export const reinitializeBuilder = (apiKey: string) => {
  builder.init(apiKey);
  builder.configure({ apiKey });
  // Re-registrar componentes após reinicialização
  registerComponents();
};
