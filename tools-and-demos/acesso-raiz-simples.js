/* Script de acesso para a raiz do aplicativo
 * Versão simplificada sem autenticação por senha
 */

javascript:(function() {
  // Configuração de acesso admin (sem senha)
  localStorage.setItem('userRole', 'admin');
  localStorage.setItem('userName', localStorage.getItem('userName') || 'Admin');
  
  // Verificar se estamos na página raiz
  const isRootPage = window.location.pathname === '/';
  
  if (isRootPage) {
    // Se já estamos na raiz, apenas recarregamos
    console.log('✅ Recarregando a página raiz...');
    window.location.reload();
  } else {
    // Caso contrário, navegamos para a raiz
    console.log('✅ Redirecionando para a raiz do aplicativo...');
    window.location.href = '/';
  }
})();
