// Teste de integração Hotmart + Analytics
// Para testar no console do navegador

import { hotmartWebhookManager, simulateHotmartWebhook } from '../src/utils/hotmartWebhook';

// Função para testar a integração
export const testHotmartIntegration = () => {
  console.log('🚀 Iniciando teste de integração Hotmart + Analytics');
  
  // 1. Armazenar dados de usuário (simulando quiz completado)
  console.log('📝 Simulando completion de quiz...');
  hotmartWebhookManager.storeUserData('teste@example.com', {
    utm_parameters: {
      utm_source: 'facebook',
      utm_medium: 'paid',
      utm_campaign: 'transformacao-imagem',
      utm_content: 'video-depoimento',
      utm_term: 'estilo-feminino'
    },
    quiz_results: {
      estilo_preferido: 'elegante',
      tipo_corpo: 'ampulheta',
      ocasiao_principal: 'trabalho'
    },
    funnel_step: 'quiz_completion'
  });

  // 2. Simular webhook de compra
  console.log('💳 Simulando compra via webhook...');
  simulateHotmartWebhook('teste@example.com');

  // 3. Verificar dados armazenados
  setTimeout(() => {
    console.log('📊 Verificando métricas geradas...');
    const metrics = hotmartWebhookManager.getAnalyticsMetrics();
    const salesData = hotmartWebhookManager.getSalesData();
    
    console.log('Métricas calculadas:', metrics);
    console.log('Dados de vendas:', salesData);
    console.log('Revenue total:', hotmartWebhookManager.getTotalRevenue());
    console.log('Total de vendas:', hotmartWebhookManager.getTotalSales());
    console.log('Tem dados reais?', hotmartWebhookManager.hasRealSalesData());
    
    console.log('✅ Teste concluído! Verifique o dashboard para ver os dados reais.');
  }, 1000);
};

// Função para limpar dados de teste
export const clearTestData = () => {
  localStorage.removeItem('hotmart_sales_data');
  localStorage.removeItem('hotmart_analytics_metrics');
  localStorage.removeItem('user_data_teste@example.com');
  console.log('🧹 Dados de teste limpos!');
};

// Para usar no console:
// testHotmartIntegration() - para simular dados
// clearTestData() - para limpar dados de teste

if (typeof window !== 'undefined') {
  (window as any).testHotmartIntegration = testHotmartIntegration;
  (window as any).clearTestData = clearTestData;
  console.log('🔧 Funções de teste disponíveis: testHotmartIntegration(), clearTestData()');
}
