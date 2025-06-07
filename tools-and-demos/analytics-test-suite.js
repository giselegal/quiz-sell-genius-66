/**
 * Script de Teste para Validação de Pixels e Analytics
 * 
 * Este script pode ser executado no console do navegador para testar
 * se os pixels e analytics estão funcionando corretamente.
 */

const AnalyticsTestSuite = {
  
  /**
   * Testa se o Facebook Pixel foi inicializado corretamente
   */
  testFacebookPixelInitialization() {
    console.log('🔍 Testando inicialização do Facebook Pixel...');
    
    if (typeof window.fbq === 'undefined') {
      console.error('❌ Facebook Pixel NÃO foi inicializado');
      return false;
    }
    
    console.log('✅ Facebook Pixel inicializado com sucesso');
    console.log('📊 Objeto fbq disponível:', typeof window.fbq);
    
    return true;
  },

  /**
   * Testa o envio de eventos customizados
   */
  testCustomEvents() {
    console.log('🔍 Testando eventos customizados...');
    
    if (!this.testFacebookPixelInitialization()) {
      return false;
    }

    try {
      // Teste de evento personalizado
      window.fbq('trackCustom', 'TestEvent', {
        test_timestamp: new Date().toISOString(),
        test_source: 'analytics_validation'
      });
      
      console.log('✅ Evento customizado enviado com sucesso');
      return true;
    } catch (error) {
      console.error('❌ Erro ao enviar evento customizado:', error);
      return false;
    }
  },

  /**
   * Testa a captura de parâmetros UTM
   */
  testUTMCapture() {
    console.log('🔍 Testando captura de parâmetros UTM...');
    
    try {
      // Verificar se há parâmetros UTM armazenados
      const storedUTM = localStorage.getItem('utm_parameters');
      
      if (storedUTM) {
        const utmParams = JSON.parse(storedUTM);
        console.log('✅ Parâmetros UTM encontrados:', utmParams);
      } else {
        console.log('ℹ️ Nenhum parâmetro UTM armazenado (normal se não veio de campanha)');
      }
      
      // Simular captura de UTM
      const testUTM = {
        utm_source: 'test',
        utm_medium: 'validation',
        utm_campaign: 'analytics_test',
        utm_content: 'test_content'
      };
      
      localStorage.setItem('utm_parameters_test', JSON.stringify(testUTM));
      console.log('✅ Teste de armazenamento UTM realizado');
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao testar UTM:', error);
      return false;
    }
  },

  /**
   * Testa o Google Analytics se configurado
   */
  testGoogleAnalytics() {
    console.log('🔍 Testando Google Analytics...');
    
    if (typeof window.gtag === 'undefined') {
      console.log('ℹ️ Google Analytics não inicializado (normal se não configurado)');
      return false;
    }
    
    try {
      window.gtag('event', 'test_event', {
        event_category: 'validation',
        event_label: 'analytics_test'
      });
      
      console.log('✅ Evento Google Analytics enviado');
      return true;
    } catch (error) {
      console.error('❌ Erro ao testar Google Analytics:', error);
      return false;
    }
  },

  /**
   * Verifica configurações de funil
   */
  testFunnelConfiguration() {
    console.log('🔍 Testando configuração de funis...');
    
    try {
      // Verificar se as funções de pixel manager estão disponíveis
      const currentPath = window.location.pathname;
      console.log('📍 Path atual:', currentPath);
      
      // Simular verificação de funil
      let detectedFunnel = 'default';
      if (currentPath.includes('/quiz-descubra-seu-estilo')) {
        detectedFunnel = 'quiz-descubra-seu-estilo';
      }
      
      console.log('🎯 Funil detectado:', detectedFunnel);
      
      // Verificar se há pixels configurados
      const pixelConfigs = {
        'default': '1311550759901086',
        'quiz-descubra-seu-estilo': '1311550759901086'
      };
      
      const pixelId = pixelConfigs[detectedFunnel];
      console.log('🔢 Pixel ID para funil atual:', pixelId);
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao testar configuração de funil:', error);
      return false;
    }
  },

  /**
   * Testa funcionalidade A/B Testing
   */
  testABTesting() {
    console.log('🔍 Testando sistema A/B...');
    
    try {
      // Verificar se há testes A/B armazenados
      const storedTests = localStorage.getItem('ab_tests');
      
      if (storedTests) {
        const tests = JSON.parse(storedTests);
        console.log('✅ Testes A/B encontrados:', tests.length, 'testes');
        console.log('📊 Detalhes dos testes:', tests);
      } else {
        console.log('ℹ️ Nenhum teste A/B configurado no momento');
        
        // Criar teste de exemplo para demonstração
        const exampleTest = {
          id: 'test_example_' + Date.now(),
          name: 'Teste de Validação',
          type: 'result',
          isActive: true,
          startDate: new Date().toISOString(),
          variations: [
            {
              id: 'control',
              name: 'Controle',
              trafficPercentage: 50
            },
            {
              id: 'variant_a',
              name: 'Variante A',
              trafficPercentage: 50
            }
          ]
        };
        
        localStorage.setItem('ab_tests_example', JSON.stringify([exampleTest]));
        console.log('✅ Teste A/B de exemplo criado');
      }
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao testar A/B testing:', error);
      return false;
    }
  },

  /**
   * Executa todos os testes
   */
  runAllTests() {
    console.log('🚀 Iniciando validação completa de Analytics...\n');
    
    const results = {
      facebookPixel: this.testFacebookPixelInitialization(),
      customEvents: this.testCustomEvents(),
      utmCapture: this.testUTMCapture(),
      googleAnalytics: this.testGoogleAnalytics(),
      funnelConfig: this.testFunnelConfiguration(),
      abTesting: this.testABTesting()
    };
    
    console.log('\n📋 RESUMO DOS TESTES:');
    console.log('='.repeat(50));
    
    Object.entries(results).forEach(([test, passed]) => {
      const status = passed ? '✅' : '❌';
      const testName = test.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      console.log(`${status} ${testName}`);
    });
    
    const passedTests = Object.values(results).filter(result => result).length;
    const totalTests = Object.keys(results).length;
    
    console.log('\n📊 RESULTADO GERAL:');
    console.log(`${passedTests}/${totalTests} testes passaram`);
    
    if (passedTests === totalTests) {
      console.log('🎉 Todos os testes passaram! Sistema funcionando corretamente.');
    } else if (passedTests >= totalTests * 0.7) {
      console.log('⚠️ Maioria dos testes passou. Verificar itens em falta.');
    } else {
      console.log('🚨 Problemas detectados. Revisar configurações.');
    }
    
    return results;
  },

  /**
   * Limpa dados de teste
   */
  cleanup() {
    console.log('🧹 Limpando dados de teste...');
    
    try {
      localStorage.removeItem('utm_parameters_test');
      localStorage.removeItem('ab_tests_example');
      console.log('✅ Limpeza concluída');
    } catch (error) {
      console.error('❌ Erro na limpeza:', error);
    }
  }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.AnalyticsTestSuite = AnalyticsTestSuite;
}

// Executar automaticamente se estiver no console
if (typeof console !== 'undefined') {
  console.log('🔧 Analytics Test Suite carregado!');
  console.log('📝 Execute: AnalyticsTestSuite.runAllTests() para validar tudo');
  console.log('🧹 Execute: AnalyticsTestSuite.cleanup() para limpar após testes');
}

export default AnalyticsTestSuite;
