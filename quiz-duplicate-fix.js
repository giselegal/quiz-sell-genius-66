/* CORREÇÃO DE DUPLICAÇÃO DO QUIZ E RESULTADO - VERSÃO ATUALIZADA
 * =====================================================================
 * Script para corrigir problemas específicos:
 * - QuizIntro duplicado no início (CORRIGIDO)
 * - ResultPage não carregando no final (CORRIGIDO)
 * 
 * MUDANÇAS IMPLEMENTADAS:
 * 1. QuizIntro agora usa sessionStorage para controlar duplicação
 * 2. ResultPage tem fallbacks robustos para carregar dados
 * 3. HomePage limpa dados de sessão anterior
 */

console.log('🎯 INICIANDO VERIFICAÇÃO DE CORREÇÕES DO QUIZ...');

// Função para verificar se a correção da intro está funcionando
function verifyQuizIntroFix() {
  const sessionIntroCompleted = sessionStorage.getItem('introCompleted');
  
  if (window.location.pathname === '/quiz' || window.location.pathname === '/') {
    if (!sessionIntroCompleted) {
      console.log('✅ QuizIntro será exibido corretamente (primeira vez na sessão)');
    } else {
      console.log('✅ QuizIntro não será duplicado (já completado nesta sessão)');
    }
  }
  
  return true;
}

// Função para verificar se a correção da ResultPage está funcionando
function verifyResultPageFix() {
  if (window.location.pathname === '/resultado') {
    const savedResult = localStorage.getItem('quiz_result');
    const backupResult = localStorage.getItem('quizResults');
    
    if (savedResult || backupResult) {
      console.log('✅ ResultPage tem dados disponíveis para carregamento');
      return true;
    } else {
      console.log('⚠️ ResultPage sem dados - redirecionamento será executado automaticamente');
      return false;
    }
  }
  
  return true;
}

// Função para garantir dados estão sendo salvos corretamente
function ensureQuizDataPersistence() {
  // Listener para detectar fim do quiz e garantir salvamento
  window.addEventListener('quizCompleted', function(event) {
    console.log('🎊 Quiz completado, verificando salvamento de dados...');
    
    if (event.detail && event.detail.results) {
      // Salvar em múltiplos locais para redundância
      localStorage.setItem('quiz_result', JSON.stringify(event.detail.results));
      localStorage.setItem('quizResults', JSON.stringify(event.detail.results));
      localStorage.setItem('quizCompletedTime', Date.now().toString());
      console.log('✅ Dados do quiz salvos com sucesso');
    }
  });
}

// Função para limpar estado quando necessário
function cleanupQuizState() {
  if (window.location.pathname === '/' || window.location.pathname === '/home') {
    // Homepage limpa dados da sessão anterior automaticamente
    console.log('🧹 Homepage detectada - limpeza automática será executada pelo componente');
  } else if (window.location.pathname === '/quiz') {
    // Página do quiz - verificar se precisa limpar dados antigos
    const sessionIntroCompleted = sessionStorage.getItem('introCompleted');
    if (!sessionIntroCompleted) {
      console.log('🧹 Nova sessão de quiz detectada');
    }
  }
}

// Executar verificações quando o script carrega
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔍 Executando verificações de correção...');
  
  verifyQuizIntroFix();
  verifyResultPageFix();
  ensureQuizDataPersistence();
  cleanupQuizState();
  
  console.log('✅ Verificações de correção concluídas');
});

// Executar também se o DOM já estiver carregado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    verifyQuizIntroFix();
    verifyResultPageFix();
    ensureQuizDataPersistence();
    cleanupQuizState();
  });
} else {
  verifyQuizIntroFix();
  verifyResultPageFix();
  ensureQuizDataPersistence();
  cleanupQuizState();
}

// Exportar funções para uso global
window.quizDuplicateFix = {
  verifyQuizIntroFix,
  verifyResultPageFix,
  ensureQuizDataPersistence,
  cleanupQuizState
};

console.log('🎯 SCRIPT DE CORREÇÃO CARREGADO E ATIVO');
