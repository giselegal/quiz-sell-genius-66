/* 
 * Script de acesso para testes A/B e protótipos do Quiz Sell Genius
 * Versão 1.0
 */

javascript:(function() {
  // Limpar qualquer estado antigo para evitar problemas
  localStorage.removeItem('userRole');
  sessionStorage.removeItem('redirectToEditor');
  
  // Configurar acesso admin
  localStorage.setItem('userRole', 'admin');
  localStorage.setItem('userName', localStorage.getItem('userName') || 'Admin');
  
  // Adicionar timestamp para garantir que a mudança seja reconhecida
  localStorage.setItem('adminTimestamp', Date.now().toString());
  
  // Criar dados padrão para testes A/B se não existirem
  if (!localStorage.getItem('ab_tests')) {
    const defaultTests = [
      {
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
      }
    ];
    
    localStorage.setItem('ab_tests', JSON.stringify(defaultTests));
    console.log('✅ Dados de teste A/B criados');
  }
  
  // Exibir menu de opções
  const destino = prompt(`Selecione o destino:
1. Editor de Página de Resultados (/resultado/editor)
2. Gerenciador de Testes A/B (/admin/ab-test-manager)
3. Página de Protótipo (/resultado-prototipo)
4. Página de Testes A/B - Admin (/admin/ab-test)
5. Editor Unificado (/admin/editor)
(Digite o número correspondente)`);
  
  let url = '/';
  
  switch(destino) {
    case '1':
      url = '/resultado/editor';
      break;
    case '2':
      url = '/admin/ab-test-manager';
      break;
    case '3':
      url = '/resultado-prototipo';
      break;
    case '4':
      url = '/admin/ab-test';
      break;
    case '5':
      url = '/admin/editor';
      break;
    default:
      alert('Opção inválida ou cancelada. Permanecendo na página atual.');
      return;
  }
  
  alert(`✅ Acesso admin configurado. Redirecionando para ${url}...`);
  window.location.href = url;
})();
