/* Script Definitivo de Acesso ao Editor
 * Este script utiliza técnicas avançadas para garantir o acesso
 * quando outras abordagens falharem.
 */

javascript:(function() {
  // Verificar se o React está carregado (indicando que a aplicação está rodando)
  const isReactLoaded = !!(window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || window._REACT_);
  
  // Limpar o estado de autenticação atual
  localStorage.removeItem('userRole');
  localStorage.removeItem('adminAuthTimestamp');
  localStorage.removeItem('editorAccessTime');
  sessionStorage.removeItem('redirectToEditor');
  
  // Configurar acesso admin com timestamp para prevenir problemas de cache
  localStorage.setItem('userRole', 'admin');
  localStorage.setItem('userName', localStorage.getItem('userName') || 'Admin');
  localStorage.setItem('editorAccessToken', btoa(Date.now().toString()));
  
  // Mostrar notificação visual ao usuário
  const notifyUser = () => {
    // Remover qualquer notificação anterior
    const existingNotification = document.getElementById('editor-access-notification');
    if (existingNotification) {
      document.body.removeChild(existingNotification);
    }
    
    // Criar notificação
    const notification = document.createElement('div');
    notification.id = 'editor-access-notification';
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '12px 20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.zIndex = '9999';
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.textAlign = 'center';
    notification.innerHTML = '<b>✅ ACESSO CONFIGURADO</b><br>Redirecionando para o editor...';
    
    document.body.appendChild(notification);
  };
  
  // Exibir notificação ao usuário
  notifyUser();
  
  // Determinar a próxima ação com base na página atual
  const isEditorPage = window.location.pathname === '/resultado/editor';
  
  if (isEditorPage) {
    // Se já estamos na página do editor, recarregar com parâmetro para evitar cache
    setTimeout(() => {
      window.location.href = '/resultado/editor?reload=' + Date.now();
    }, 1000);
  } else {
    // Caso contrário, acessar o editor com parâmetro para evitar cache
    setTimeout(() => {
      window.location.href = '/resultado/editor?access=' + Date.now();
    }, 1000);
  }
})();
