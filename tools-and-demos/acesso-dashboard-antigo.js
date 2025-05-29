// Script para acesso direto ao Dashboard Antigo - Quiz Sell Genius
// Este script força o acesso ao dashboard legacy sem redirecionamentos

console.log('🔧 Forçando acesso ao Dashboard Antigo...');

// Função para limpar redirecionamentos automáticos
const clearAutoRedirects = () => {
  console.log('🧹 Limpando redirecionamentos automáticos...');
  
  // Limpar timers que podem estar causando redirecionamentos
  const highestTimeoutId = setTimeout(() => {}, 0);
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }
  
  // Limpar intervals
  const highestIntervalId = setInterval(() => {}, 1000);
  for (let i = 0; i < highestIntervalId; i++) {
    clearInterval(i);
  }
  
  console.log('✅ Redirecionamentos automáticos limpos');
};

// Função para forçar navegação
const forceNavigateToDashboard = () => {
  console.log('🎯 Navegando para o dashboard antigo...');
  
  try {
    // Método 1: Usar history.pushState
    if (window.history && window.history.pushState) {
      window.history.pushState(
        { page: 'old-admin-dashboard' }, 
        'Dashboard Antigo - Quiz Sell Genius', 
        '/admin/old'
      );
      
      // Disparar evento de mudança de rota
      const popStateEvent = new PopStateEvent('popstate', {
        state: { page: 'old-admin-dashboard' }
      });
      window.dispatchEvent(popStateEvent);
      
      console.log('✅ Navegação via History API executada');
    }
    
    // Método 2: Forçar atualização da URL
    window.location.hash = '#old-dashboard';
    
    // Método 3: Se React Router estiver disponível
    if (window.ReactRouter) {
      console.log('🔄 Usando React Router...');
      // Tentar usar o router do React se disponível
    }
    
    console.log('📍 URL atual:', window.location.href);
    console.log('📂 Pathname:', window.location.pathname);
    
  } catch (error) {
    console.error('❌ Erro na navegação:', error);
    
    // Fallback: Recarregar diretamente na URL
    console.log('🔄 Usando fallback - redirecionamento direto...');
    setTimeout(() => {
      window.location.href = '/admin/old';
    }, 500);
  }
};

// Função para verificar se o dashboard foi carregado
const checkDashboardLoaded = () => {
  setTimeout(() => {
    const currentPath = window.location.pathname;
    const hasOldDashboard = document.querySelector('[data-dashboard="old"]') || 
                           document.querySelector('.old-admin-dashboard') ||
                           document.title.includes('Dashboard Antigo');
    
    if (currentPath.includes('/admin/old') || hasOldDashboard) {
      console.log('🎉 Dashboard antigo carregado com sucesso!');
      console.log('📍 Localização atual:', window.location.href);
    } else {
      console.log('⚠️ Dashboard antigo ainda não carregou. Tentando novamente...');
      
      // Tentar novamente após um delay
      setTimeout(() => {
        window.location.href = '/admin/old';
      }, 1000);
    }
  }, 2000);
};

// Função para mostrar informações de depuração
const showDebugInfo = () => {
  console.log('\n🔍 Informações de Depuração:');
  console.log('================================');
  console.log('🌐 URL completa:', window.location.href);
  console.log('📂 Pathname:', window.location.pathname);
  console.log('🔗 Hash:', window.location.hash);
  console.log('🔍 Search:', window.location.search);
  console.log('🏠 Origin:', window.location.origin);
  
  // Verificar se há elementos específicos do dashboard
  const dashboardElements = {
    'Dashboard Novo': document.querySelector('[data-testid="new-dashboard"]'),
    'Dashboard Antigo': document.querySelector('[data-testid="old-dashboard"]'),
    'Editor Visual': document.querySelector('[data-testid="visual-editor"]'),
    'Tabs de Navegação': document.querySelectorAll('[role="tab"]').length
  };
  
  console.log('\n🎯 Elementos encontrados:');
  Object.entries(dashboardElements).forEach(([name, element]) => {
    console.log(`${element ? '✅' : '❌'} ${name}:`, element ? 'Encontrado' : 'Não encontrado');
  });
  
  // Verificar contextos React
  console.log('\n⚛️ Contextos React:');
  console.log('AuthContext:', window.AuthContext ? 'Ativo' : 'Inativo');
  console.log('QuizContext:', window.QuizContext ? 'Ativo' : 'Inativo');
};

// Função principal
const accessOldDashboard = () => {
  console.log('🚀 Iniciando acesso ao Dashboard Antigo...');
  console.log('Timestamp:', new Date().toISOString());
  
  // 1. Limpar redirecionamentos
  clearAutoRedirects();
  
  // 2. Mostrar informações atuais
  showDebugInfo();
  
  // 3. Forçar navegação
  forceNavigateToDashboard();
  
  // 4. Verificar se carregou
  checkDashboardLoaded();
  
  console.log('\n📋 Para mais informações, execute:');
  console.log('• showDebugInfo() - Mostra informações de depuração');
  console.log('• clearAutoRedirects() - Limpa redirecionamentos automáticos');
  console.log('• forceNavigateToDashboard() - Força navegação manual');
};

// Função para criar botão de acesso rápido
const createQuickAccessButton = () => {
  // Remover botão existente se houver
  const existingButton = document.getElementById('quick-access-old-dashboard');
  if (existingButton) {
    existingButton.remove();
  }
  
  const button = document.createElement('button');
  button.id = 'quick-access-old-dashboard';
  button.innerHTML = '🏠 Dashboard Antigo';
  button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: linear-gradient(135deg, #B89B7A, #D4C4A0);
    color: #432818;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
  `;
  
  button.onmouseover = () => {
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
  };
  
  button.onmouseout = () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
  };
  
  button.onclick = () => {
    console.log('🖱️ Botão de acesso rápido clicado');
    accessOldDashboard();
  };
  
  document.body.appendChild(button);
  console.log('🔲 Botão de acesso rápido criado no canto superior direito');
};

// Executar automaticamente
console.log('🎯 Script de acesso ao Dashboard Antigo carregado!');
console.log('📞 Execute accessOldDashboard() para acessar');

// Criar botão de acesso rápido
createQuickAccessButton();

// Auto-executar se estivermos na página admin
if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/admin/old')) {
  console.log('🔄 Detectada página admin - oferecendo opção de acesso ao dashboard antigo...');
  
  setTimeout(() => {
    const shouldAccess = confirm('Deseja acessar o Dashboard Antigo? (Recomendado se houver problemas com redirecionamentos)');
    if (shouldAccess) {
      accessOldDashboard();
    }
  }, 2000);
}
