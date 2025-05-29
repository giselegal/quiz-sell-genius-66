/* 
 * Bookmarklet para acesso a Testes A/B
 * Versão 1.0 - Quiz Sell Genius
 * Copie e cole este código no console do seu navegador
 */

// Configura o acesso administrativo
localStorage.setItem('userRole', 'admin');
localStorage.setItem('userName', 'Admin');
localStorage.setItem('adminTimestamp', Date.now().toString());

// Agora navegue para uma destas páginas:
// - /resultado/editor
// - /admin/ab-test-manager
// - /resultado-prototipo
// - /admin/ab-test
// - /admin/editor

// Criar um teste A/B padrão se não existir
if (!localStorage.getItem('ab_tests')) {
  const defaultTest = {
    id: `test_${Date.now()}`,
    name: 'Teste A/B da Página de Resultados',
    type: 'result',
    isActive: true,
    startDate: new Date().toISOString(),
    variations: [
      {
        id: `var_${Date.now()}_a`,
        name: 'Variação A (Original)',
        trafficPercentage: 50,
        content: {}
      },
      {
        id: `var_${Date.now()}_b`,
        name: 'Variação B',
        trafficPercentage: 50,
        content: {}
      }
    ]
  };
  
  localStorage.setItem('ab_tests', JSON.stringify([defaultTest]));
  console.log('✅ Teste A/B padrão criado com sucesso!');
}

// Redirecionar para o gerenciador de testes A/B
console.log('✅ Acesso administrativo configurado. Redirecionando...');
window.location.href = '/admin/ab-test-manager';

// Versão compacta para bookmarklet:
// javascript:(function(){localStorage.setItem('userRole','admin');localStorage.setItem('userName','Admin');localStorage.setItem('adminTimestamp',Date.now().toString());if(!localStorage.getItem('ab_tests')){localStorage.setItem('ab_tests',JSON.stringify([{id:`test_${Date.now()}`,name:'Teste A/B da Página de Resultados',type:'result',isActive:true,startDate:new Date().toISOString(),variations:[{id:`var_${Date.now()}_a`,name:'Variação A (Original)',trafficPercentage:50,content:{}},{id:`var_${Date.now()}_b`,name:'Variação B',trafficPercentage:50,content:{}}]}]));}window.location.href='/admin/ab-test-manager';})();
