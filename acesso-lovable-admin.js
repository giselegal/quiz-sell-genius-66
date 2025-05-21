javascript:(function() {
  // Detecta se já está no ambiente lovable.dev
  const isInLovable = window.location.hostname.includes('lovableproject.com') || 
                       window.location.hostname.includes('lovable.dev');
  
  // Se já estiver no lovable.dev, redirecionar para a rota /admin
  if (isInLovable) {
    window.location.href = window.location.origin + '/admin';
    return;
  }
  
  // Prepara o URL do ambiente lovable.dev
  const lovableUrl = 'https://a10d1b34-b5d4-426b-8c97-45f125d03ec1.lovableproject.com/admin';
  
  // Abre o ambiente lovable.dev em uma nova janela
  window.open(lovableUrl, '_blank');
})();
