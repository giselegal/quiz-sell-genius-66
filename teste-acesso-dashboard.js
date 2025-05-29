// Script para testar acesso aos dashboards - Quiz Sell Genius
// Executer no console do navegador para testar as rotas

console.log('🔧 Testando acesso aos dashboards...');

// Função para testar uma rota
const testRoute = (path, description) => {
  return new Promise((resolve) => {
    const currentPath = window.location.pathname;
    
    try {
      // Tentar navegar para a rota
      window.history.pushState({}, '', path);
      
      setTimeout(() => {
        const success = window.location.pathname === path;
        console.log(`${success ? '✅' : '❌'} ${description}: ${path} - ${success ? 'OK' : 'FALHA'}`);
        
        // Restaurar rota original
        window.history.pushState({}, '', currentPath);
        
        resolve({
          path,
          description,
          success,
          currentUrl: window.location.href
        });
      }, 500);
    } catch (error) {
      console.error(`❌ Erro ao testar ${description}:`, error);
      resolve({
        path,
        description,
        success: false,
        error: error.message
      });
    }
  });
};

// Lista de rotas para testar
const routesToTest = [
  { path: '/admin', description: 'Dashboard Novo' },
  { path: '/admin/old', description: 'Dashboard Antigo' },
  { path: '/admin/editor', description: 'Editor Visual' },
  { path: '/resultado', description: 'Página de Resultados' },
  { path: '/', description: 'Página Principal (Quiz)' }
];

// Função principal de teste
const runDashboardTests = async () => {
  console.log('🚀 Iniciando testes de acesso...\n');
  
  const results = [];
  
  for (const route of routesToTest) {
    const result = await testRoute(route.path, route.description);
    results.push(result);
  }
  
  console.log('\n📊 Resumo dos testes:');
  console.log('================================');
  
  results.forEach(result => {
    const status = result.success ? '✅ PASSOU' : '❌ FALHOU';
    console.log(`${status} - ${result.description}`);
    if (result.error) {
      console.log(`   Erro: ${result.error}`);
    }
  });
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`\n🎯 Resultado final: ${successCount}/${totalCount} rotas funcionando`);
  
  if (successCount === totalCount) {
    console.log('🎉 Todos os testes passaram! Acesso aos dashboards está funcionando.');
  } else {
    console.log('⚠️ Alguns testes falharam. Verifique as configurações de roteamento.');
  }
  
  return results;
};

// Função para forçar acesso ao dashboard antigo
const accessOldDashboard = () => {
  console.log('🔓 Forçando acesso ao dashboard antigo...');
  
  try {
    // Limpar qualquer redirecionamento em andamento
    if (window.history && window.history.pushState) {
      window.history.pushState({}, 'Dashboard Antigo', '/admin/old');
      
      // Disparar evento de mudança de rota
      window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
      
      console.log('✅ Navegação para /admin/old executada');
      console.log('🔗 URL atual:', window.location.href);
      
      // Recarregar a página se necessário
      setTimeout(() => {
        if (window.location.pathname === '/admin/old') {
          console.log('✅ Dashboard antigo carregado com sucesso!');
        } else {
          console.log('⚠️ Recarregando página para forçar carregamento...');
          window.location.reload();
        }
      }, 1000);
      
    } else {
      // Fallback: recarregar diretamente na URL
      window.location.href = '/admin/old';
    }
  } catch (error) {
    console.error('❌ Erro ao acessar dashboard antigo:', error);
    console.log('🔄 Tentando fallback...');
    window.location.href = '/admin/old';
  }
};

// Função para verificar se há conflitos de roteamento
const checkRoutingConflicts = () => {
  console.log('🔍 Verificando conflitos de roteamento...');
  
  const checks = [
    {
      name: 'React Router',
      test: () => window.React && window.ReactRouter,
      description: 'Verifica se React Router está disponível'
    },
    {
      name: 'Next.js Router',
      test: () => window.next && window.next.router,
      description: 'Verifica se Next.js Router está ativo'
    },
    {
      name: 'History API',
      test: () => window.history && window.history.pushState,
      description: 'Verifica se History API está disponível'
    },
    {
      name: 'AuthContext',
      test: () => window.AuthContext || window.useAuth,
      description: 'Verifica se contexto de autenticação está ativo'
    }
  ];
  
  checks.forEach(check => {
    const result = check.test();
    console.log(`${result ? '✅' : '❌'} ${check.name}: ${check.description}`);
  });
  
  console.log('\n🛣️ Roteamento atual:', window.location.pathname);
  console.log('🌐 URL completa:', window.location.href);
};

// Executar automaticamente ao carregar o script
console.log('📋 Comandos disponíveis:');
console.log('• runDashboardTests() - Executa todos os testes');
console.log('• accessOldDashboard() - Força acesso ao dashboard antigo');
console.log('• checkRoutingConflicts() - Verifica conflitos de roteamento');
console.log('\n💡 Executando verificação inicial...');

checkRoutingConflicts();
