/* ACESSO RÁPIDO AO PAINEL ADMINISTRATIVO - Quiz Sell Genius
 * ================================================================
 * Este script resolve o erro HTTP 401 (Unauthorized) configurando
 * o acesso administrativo via localStorage
 * 
 * COMO USAR:
 * 1. Abra o console do navegador (F12 → Console)
 * 2. Cole este código e pressione Enter
 * 3. A página será recarregada com acesso administrativo
 */

console.clear();
console.log('🔧 CONFIGURANDO ACESSO ADMINISTRATIVO...');
console.log('=======================================');

// Limpar qualquer estado problemático anterior
console.log('🧹 Limpando dados antigos...');
localStorage.removeItem('userRole');
localStorage.removeItem('adminTimestamp');
sessionStorage.clear();

// Configurar acesso administrativo
console.log('⚙️ Configurando permissões de admin...');
localStorage.setItem('userRole', 'admin');
localStorage.setItem('userName', 'Admin');
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('adminAccessTime', Date.now().toString());

// Configurações específicas para corrigir problemas do quiz
console.log('🎯 Configurando correções do quiz...');
localStorage.setItem('quizIntroRendered', 'false');
localStorage.setItem('quizState', 'initial');
localStorage.setItem('resultPageEnabled', 'true');
sessionStorage.removeItem('quizProgress');
sessionStorage.removeItem('duplicateCheck');

// Verificar a página atual
const currentPath = window.location.pathname;
console.log(`📍 Página atual: ${currentPath}`);

// Exibir notificação visual
const notification = document.createElement('div');
notification.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  padding: 15px;
  text-align: center;
  z-index: 10000;
  font-family: Arial, sans-serif;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;
notification.innerHTML = '✅ ACESSO ADMINISTRATIVO CONFIGURADO! Recarregando página...';
document.body.appendChild(notification);

// Aguardar um momento e recarregar
setTimeout(() => {
  console.log('🔄 Recarregando página para aplicar configurações...');
  
  // Limpar possíveis estados duplicados antes do reload
  if (window.quizInstance) {
    window.quizInstance = null;
  }
  
  // Garantir que componentes não sejam duplicados
  const existingQuizIntro = document.querySelector('[data-component="quiz-intro"]');
  if (existingQuizIntro) {
    existingQuizIntro.remove();
  }
  
  window.location.reload();
}, 2000);

console.log('✅ Script executado com sucesso!');
console.log('📋 Permissões configuradas:');
console.log('   • userRole: admin');
console.log('   • userName: Admin');
console.log('   • isAuthenticated: true');
console.log('   • quizIntroRendered: false');
console.log('   • resultPageEnabled: true');
console.log('');
console.log('🚀 A página será recarregada automaticamente...');
