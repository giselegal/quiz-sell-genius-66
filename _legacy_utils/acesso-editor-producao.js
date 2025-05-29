/* Script para acessar o editor no ambiente de produção
 * Este script deve ser executado diretamente no console do navegador
 * enquanto estiver na página https://giselegalvao.com.br/resultado
 */

(function() {
  // Função para definir o usuário como administrador
  function configureAdminAccess() {
    // 1. Definir usuário como admin
    localStorage.setItem('userRole', 'admin');
    
    // 2. Garantir que exista um nome de usuário
    if (!localStorage.getItem('userName')) {
      localStorage.setItem('userName', 'Admin');
    }
    
    console.log('✅ Acesso de administrador configurado com sucesso!');
    
    // 3. Recarregar a página para mostrar o botão de edição
    setTimeout(() => {
      console.log('🔄 Recarregando a página...');
      window.location.reload();
    }, 1000);
  }

  // Função para navegar diretamente para o editor
  function goToEditor() {
    console.log('🚀 Redirecionando para o editor...');
    window.location.href = '/admin/editor?tab=result';
  }

  // Verificar se já existe um botão para editar a página
  const editButtonExists = document.querySelector('a[href="/resultado/editor"]');
  
  if (editButtonExists) {
    console.log('🔍 Botão de edição encontrado! Clicando...');
    editButtonExists.click();
  } else {
    console.log('⚙️ Configurando acesso de administrador...');
    configureAdminAccess();
    
    // Alternativa: ir diretamente para o editor unificado
    // Pode funcionar melhor se a rota /resultado/editor estiver com problemas
    // goToEditor();
  }
})();
