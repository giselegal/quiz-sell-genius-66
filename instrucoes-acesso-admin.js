/* INSTRUÇÕES DE ACESSO PARA O ADMIN QUIZ-SELL-GENIUS
 * --------------------------------------------------
 * Última atualização: 15 de maio de 2025
 */

// SCRIPT PARA ACESSAR O EDITOR DE RESULTADOS
// ------------------------------------------
// Este script configura as permissões de administrador e redireciona para o editor de resultados
// COMO USAR: Copie todo o código abaixo e execute-o no console do navegador

javascript:(function(){localStorage.setItem('userRole','admin');localStorage.setItem('userName',localStorage.getItem('userName')||'Admin');const e=window.location.pathname==='/resultado/editor';if(e){console.log('✅ Recarregando a página do editor...');window.location.reload();}else{console.log('✅ Redirecionando para o editor...');window.location.href='/resultado/editor';}})();

// SCRIPT PARA ACESSAR A RAIZ DO APLICATIVO COMO ADMIN
// --------------------------------------------------
// Este script configura as permissões de administrador e redireciona para a raiz do aplicativo "/"
// COMO USAR: Copie todo o código abaixo e execute-o no console do navegador

javascript:(function(){localStorage.setItem('userRole','admin');localStorage.setItem('userName',localStorage.getItem('userName')||'Admin');const e=window.location.pathname==='/';if(e){console.log('✅ Recarregando a página raiz...');window.location.reload();}else{console.log('✅ Redirecionando para a raiz do aplicativo...');window.location.href='/';}})();

// SOLUÇÃO DE PROBLEMAS
// -------------------
// Se encontrar uma tela em branco ao acessar o editor:
// 1. Volte para a página inicial (/)
// 2. Execute o script novamente
// 3. Se ainda não funcionar, tente limpar o cache do navegador e reiniciar o navegador
// 4. Execute o script novamente após reiniciar o navegador

// VERSÃO PARA FAVORITOS (BOOKMARKLET)
// ----------------------------------
// Para criar um bookmarklet, crie um novo favorito e cole um dos scripts acima no campo URL.
// Dê um nome como "📝 Acessar Editor" ou "🏠 Home Admin"
