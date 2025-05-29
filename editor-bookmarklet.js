// Editor Access Bookmarklet
// Arraste este link para a barra de favoritos do seu navegador para criar um bookmarklet

/**
 * BOOKMARKLET DE ACESSO RÁPIDO AO EDITOR
 * ======================================
 * 
 * Este arquivo contém um bookmarklet que você pode salvar nos favoritos do seu navegador
 * para acessar o editor com apenas um clique, sem precisar usar o console.
 * 
 * COMO USAR:
 * 
 * 1. Acesse a página: https://giselegalvao.com.br/resultado
 * 
 * 2. MÉTODO BOOKMARKLET (mais fácil):
 *    - Arraste o link abaixo para a barra de favoritos do seu navegador:
 *    
 *    📝 Abrir Editor
 *    
 *    - Sempre que estiver na página de resultados, clique neste favorito
 *      para ativar o acesso de administrador e abrir o editor
 * 
 * 3. MÉTODO CÓDIGO (alternativo):
 *    - Copie o código abaixo e crie um novo favorito no seu navegador
 *    - Cole este código no campo "URL" do favorito
 *    - Dê um nome como "Abrir Editor Gisele"
 *    
 *    javascript:(function(){localStorage.setItem('userRole','admin');localStorage.setItem('userName',localStorage.getItem('userName')||'Admin');location.href='/resultado/editor';})();
 * 
 * 4. QUANDO USAR:
 *    - Use este bookmarklet diretamente na página https://giselegalvao.com.br/resultado
 *    - Ele irá configurar o acesso de administrador e abrir o editor automaticamente
 *    - Não é necessário usar o console ou executar comandos manualmente
 */

// Link do bookmarklet (arraste para a barra de favoritos):
// <a href="javascript:(function(){localStorage.setItem('userRole','admin');localStorage.setItem('userName',localStorage.getItem('userName')||'Admin');location.href='/resultado/editor';})();" style="display:inline-block;padding:8px 16px;background:#4CAF50;color:white;text-decoration:none;border-radius:4px;font-weight:bold;">📝 Abrir Editor</a>

// Código fonte do bookmarklet (para referência):
(function() {
  // Definir usuário como admin
  localStorage.setItem('userRole', 'admin');
  
  // Garantir que existe um nome de usuário
  localStorage.setItem('userName', localStorage.getItem('userName') || 'Admin');
  
  // Abrir o editor diretamente
  location.href = '/resultado/editor';
})();
