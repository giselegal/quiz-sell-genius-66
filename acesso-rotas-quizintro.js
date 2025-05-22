/**
 * Script para facilitar o acesso ao QuizIntro na rota raiz "/"
 * Este script garante que o usuário acesse a rota raiz e limpa o localStorage para garantir
 * que o QuizIntro seja exibido corretamente
 * 
 * Uso:
 * - Execute este script no console do navegador para redirecionar para a rota raiz
 * - O localStorage será limpo para garantir que o QuizIntro seja exibido
 */

(function() {
  // Limpar localStorage para garantir que o QuizIntro seja exibido
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('quizAnswers');
  localStorage.removeItem('quizResults');
  localStorage.removeItem('quiz_start_time');
  localStorage.removeItem('quizCompletedAt');
  
  console.log('✅ LocalStorage limpo - QuizIntro será exibido na rota raiz');
  
  // Redirecionar para a rota raiz
  if (window.location.pathname !== '/') {
    console.log('🔄 Redirecionando para a rota raiz...');
    window.location.href = '/';
  } else {
    console.log('✅ Já está na rota raiz, recarregando a página...');
    window.location.reload();
  }
})();
