// Script para acesso rápido às rotas do Quiz Sell Genius no lovable.dev
javascript:(function() {
  // Detecta se já está no ambiente lovable.dev
  const isInLovable = window.location.hostname.includes('lovableproject.com') || 
                       window.location.hostname.includes('lovable.dev');
  
  // Define o URL base do ambiente lovable.dev
  const lovableBaseUrl = isInLovable 
    ? window.location.origin 
    : 'https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com';
    
  // Configura acesso admin
  localStorage.setItem('userRole', 'admin');
  localStorage.setItem('userName', 'Admin');
  localStorage.setItem('adminTimestamp', Date.now().toString());
  
  // Lista de rotas disponíveis
  const routes = [
    { id: '1', name: 'Página Inicial', path: '/' },
    { id: '2', name: 'Página de Resultados (Funil A)', path: '/resultado' },
    { id: '3', name: 'Página de Venda (Funil B)', path: '/quiz-descubra-seu-estilo' },
    { id: '4', name: 'Painel Admin', path: '/admin' },
    { id: '5', name: 'Analytics', path: '/admin/analytics' },
    { id: '6', name: 'Testes A/B', path: '/admin/ab-test' },
    { id: '7', name: 'Editor', path: '/admin/editor' },
    { id: '8', name: 'Configurações', path: '/admin/settings' },
    { id: '9', name: 'Seletor de Rotas', path: '/acesso-rotas-lovable.html' }
  ];
  
  // Constrói o menu de seleção
  let menu = 'Selecione a rota desejada:\n\n';
  routes.forEach(route => {
    menu += `${route.id}. ${route.name}\n`;
  });
  
  // Mostra o prompt de seleção
  const choice = prompt(menu);
  
  if (!choice) return;
  
  // Encontra a rota selecionada
  const selectedRoute = routes.find(route => route.id === choice);
  
  if (!selectedRoute) {
    alert('Opção inválida!');
    return;
  }
  
  // Navegação para a rota selecionada
  const targetUrl = lovableBaseUrl + selectedRoute.path;
  
  if (isInLovable) {
    window.location.href = targetUrl;
  } else {
    window.open(targetUrl, '_blank');
  }
})();
