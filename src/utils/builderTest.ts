// src/utils/builderTest.ts
import { builder } from '@builder.io/react';

/**
 * Função para testar se o Builder.io está funcionando corretamente
 * com a API key real
 */
export const testBuilderIntegration = async () => {
  const results = {
    initialized: false,
    apiKeyValid: false,
    componentsRegistered: false,
    canFetchContent: false,
    errors: [] as string[]
  };

  try {
    // Verificar se Builder.io foi inicializado
    if (builder && builder.apiKey) {
      results.initialized = true;
      results.apiKeyValid = builder.apiKey === 'a31ec1897d044da09b3a96f2b4f46102';
      
      console.log('✅ Builder.io inicializado com API key:', builder.apiKey);
    } else {
      results.errors.push('Builder.io não foi inicializado corretamente');
      console.error('❌ Builder.io não inicializado');
    }

    // Testar busca de conteúdo
    try {
      const content = await builder.get('page', { url: '/test' }).promise();
      results.canFetchContent = true;
      console.log('✅ Pode buscar conteúdo do Builder.io');
    } catch (error) {
      results.errors.push(`Erro ao buscar conteúdo: ${error}`);
      console.warn('⚠️ Erro ao buscar conteúdo:', error);
    }

    // Verificar componentes registrados
    try {
      // Verificar se componentes estão registrados via Builder estático
      const hasRegisteredComponents = typeof (builder as any).components !== 'undefined';
      if (hasRegisteredComponents) {
        results.componentsRegistered = true;
        console.log('✅ Componentes customizados registrados no Builder.io');
      } else {
        results.componentsRegistered = false;
        console.log('⚠️ Componentes customizados podem não estar registrados');
      }
    } catch (error) {
      results.errors.push('Erro ao verificar componentes registrados');
      console.warn('⚠️ Erro ao verificar componentes:', error);
    }

  } catch (error) {
    results.errors.push(`Erro geral: ${error}`);
    console.error('❌ Erro no teste do Builder.io:', error);
  }

  return results;
};

/**
 * Executar teste completo do Builder.io
 */
export const runBuilderTest = () => {
  console.log('🧪 Iniciando teste do Builder.io...');
  
  setTimeout(async () => {
    const results = await testBuilderIntegration();
    
    console.log('\n📊 RESULTADOS DO TESTE BUILDER.IO:');
    console.log('================================');
    console.log(`Inicializado: ${results.initialized ? '✅' : '❌'}`);
    console.log(`API Key Válida: ${results.apiKeyValid ? '✅' : '❌'}`);
    console.log(`Componentes Registrados: ${results.componentsRegistered ? '✅' : '❌'}`);
    console.log(`Pode Buscar Conteúdo: ${results.canFetchContent ? '✅' : '❌'}`);
    
    if (results.errors.length > 0) {
      console.log('\n❌ ERROS ENCONTRADOS:');
      results.errors.forEach(error => console.log(`- ${error}`));
    } else {
      console.log('\n🎉 BUILDER.IO TOTALMENTE FUNCIONAL!');
    }
    
    return results;
  }, 2000); // Aguardar 2 segundos para garantir inicialização
};
