/* Script de acesso para o editor de resultados
 * Versão 3.0 - Forçando recarregamento total
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
  
  // Verificar se estamos na página do editor
  const isEditorPage = window.location.pathname === '/resultado/editor';
  
  // Se já estamos na página do editor, faça um redirecionamento completo
  if (isEditorPage) {
    // Fazer um redirecionamento duplo para forçar uma reinicialização completa da aplicação
    console.log('✅ Reiniciando o editor...');
    // Primeiro, vá para a página inicial
    window.location.href = '/?ts=' + Date.now();
    // O navegador irá para a página inicial, e depois executar o script novamente
  } else {
    // Verificamos se estamos voltando da página inicial
    if (window.location.search.includes('ts=')) {
      // Estamos voltando da página inicial, agora vamos para o editor
      console.log('✅ Redirecionando para o editor...');
      window.location.href = '/resultado/editor';
    } else {
      // Primeira execução do script, indo para o editor diretamente
      console.log('✅ Redirecionando para o editor...');
      window.location.href = '/resultado/editor';
    }
  }
})();
