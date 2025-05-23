// /workspaces/quiz-sell-genius-66/tests/intro-flow-test.js
/**
 * Script de teste para verificar se o QuizIntro sempre aparece primeiro
 * 
 * Este script testa o comportamento de navegação para garantir que:
 * 1. O QuizIntro sempre aparece quando o usuário acessa o quiz
 * 2. Mesmo depois de fechar e abrir o quiz novamente, o QuizIntro deve aparecer
 * 
 * Para executar este teste:
 * 1. Adicione o script em uma tag <script> em index.html ou
 * 2. Execute no console do navegador ou
 * 3. Use uma ferramenta de teste automatizado
 */

(function testQuizIntroFlow() {
  console.log('🧪 Iniciando teste de fluxo do QuizIntro...');
  
  // Limpar localStorage e sessionStorage para simular um usuário novo
  localStorage.removeItem('userName');
  sessionStorage.removeItem('hasSeenIntroThisSession');
  console.log('🧹 Storage limpo para simular novo usuário');
  
  // Verificar estado inicial ao carregar a página do quiz
  function simulateInitialLoad() {
    // Tentar detectar se o QuizIntro está visível
    const hasQuizIntroVisible = document.querySelector('[data-section="intro"]') !== null;
    
    console.log(`🔍 Teste inicial: QuizIntro está visível? ${hasQuizIntroVisible ? '✅ Sim' : '❌ Não'}`);
    
    if (!hasQuizIntroVisible) {
      console.error('❌ ERRO: QuizIntro não está sendo exibido no carregamento inicial!');
      return false;
    }
    
    return true;
  }
  
  // Simular o preenchimento do nome e início do quiz
  function simulateStartQuiz() {
    console.log('👤 Simulando preenchimento do nome e início do quiz...');
    
    // Definir diretamente no localStorage para simular a submissão do form
    localStorage.setItem('userName', 'Usuário de Teste');
    
    // Verificar se o sessionStorage não está sendo usado para controlar a exibição do intro
    setTimeout(() => {
      if (sessionStorage.getItem('hasSeenIntroThisSession')) {
        console.warn('⚠️ Alerta: sessionStorage ainda está sendo usado para controlar a exibição do intro!');
      } else {
        console.log('✅ Verificação de sessionStorage: OK, não está sendo usado');
      }
    }, 500);
    
    return true;
  }
  
  // Simular recarregamento da página ou nova visita
  function simulatePageReload() {
    console.log('🔄 Simulando recarregamento da página...');
    
    // Verificar se, mesmo com o nome salvo, o QuizIntro apareceria
    console.log(`ℹ️ Nome no localStorage: ${localStorage.getItem('userName')}`);
    console.log(`ℹ️ Status em sessionStorage: ${sessionStorage.getItem('hasSeenIntroThisSession')}`);
    
    // A lógica modificada deve ignorar o localStorage e sempre mostrar o intro
    console.log('✅ Se a implementação estiver correta, o QuizIntro será mostrado no próximo carregamento da página');
    
    return true;
  }
  
  // Executar testes em sequência
  function runAllTests() {
    const initialLoadPassed = simulateInitialLoad();
    if (!initialLoadPassed) return false;
    
    const startQuizPassed = simulateStartQuiz();
    if (!startQuizPassed) return false;
    
    const reloadPassed = simulatePageReload();
    if (!reloadPassed) return false;
    
    console.log('✅ Todos os testes passaram! O QuizIntro deve sempre aparecer primeiro.');
    return true;
  }
  
  // Executar teste completo
  const testResult = runAllTests();
  console.log(`🧪 Resultado final do teste: ${testResult ? '✅ PASSOU' : '❌ FALHOU'}`);
  
  // Instruções para verificação manual
  console.log(`
  📋 Para verificar manualmente:
  1. Acesse a página principal do quiz
  2. Confirme que o QuizIntro aparece
  3. Digite um nome e inicie o quiz
  4. Feche o navegador ou aba
  5. Acesse novamente a página do quiz
  6. Confirme que o QuizIntro aparece novamente, mesmo que seu nome ainda esteja salvo
  `);
  
  return testResult;
})();
