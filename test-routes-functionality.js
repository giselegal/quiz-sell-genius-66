/**
 * Teste para verificar se as rotas /resultado e /quiz-descubra-seu-estilo estão funcionando
 * após as correções implementadas
 */

// Função para testar uma URL
const testRoute = async (url, routeName) => {
  console.log(`\n🔍 Testando rota: ${routeName}`);
  console.log(`📍 URL: ${url}`);
  
  try {
    const response = await fetch(url);
    console.log(`📊 Status: ${response.status}`);
    console.log(`📋 Status Text: ${response.statusText}`);
    
    if (response.ok) {
      const html = await response.text();
      const hasContent = html.includes('<div') && html.length > 1000;
      console.log(`✅ Conteúdo carregado: ${hasContent ? 'Sim' : 'Não'}`);
      console.log(`📏 Tamanho do HTML: ${html.length} caracteres`);
      
      // Verificar se não é uma página de erro
      const hasError = html.includes('Cannot GET') || html.includes('404') || html.includes('Error');
      if (hasError) {
        console.log(`🚨 Página de erro detectada`);
        return false;
      }
      
      // Verificar se possui elementos React
      const hasReact = html.includes('root') || html.includes('react');
      console.log(`⚛️ Elementos React detectados: ${hasReact ? 'Sim' : 'Não'}`);
      
      return hasContent && !hasError;
    } else {
      console.log(`❌ Falha no carregamento`);
      return false;
    }
  } catch (error) {
    console.log(`🚨 Erro na requisição: ${error.message}`);
    return false;
  }
};

// Função principal para testar todas as rotas
const testAllRoutes = async () => {
  console.log('🚀 Iniciando teste das rotas corrigidas...\n');
  
  const baseUrl = 'http://localhost:8083';
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/admin', name: 'Admin Dashboard' },
    { path: '/admin/header-editor', name: 'Header Editor' },
    { path: '/resultado', name: 'Página de Resultado' },
    { path: '/quiz-descubra-seu-estilo', name: 'Quiz Oferta' },
  ];
  
  const results = {};
  
  for (const route of routes) {
    const url = `${baseUrl}${route.path}`;
    const success = await testRoute(url, route.name);
    results[route.name] = success;
    
    // Pequena pausa entre requisições
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 RESUMO DOS RESULTADOS:');
  console.log('=' .repeat(50));
  
  for (const [routeName, success] of Object.entries(results)) {
    const status = success ? '✅ PASSOU' : '❌ FALHOU';
    console.log(`${status} - ${routeName}`);
  }
  
  const successCount = Object.values(results).filter(Boolean).length;
  const totalCount = Object.keys(results).length;
  
  console.log(`\n🏆 Resultado final: ${successCount}/${totalCount} rotas funcionando`);
  
  if (successCount === totalCount) {
    console.log('🎉 Todas as rotas estão funcionando corretamente!');
  } else {
    console.log('⚠️  Algumas rotas ainda precisam de atenção.');
  }
};

// Executar os testes
testAllRoutes().catch(console.error);
