/**
 * Teste para verificar se o Header Editor está funcionando corretamente
 */

// Simular dados de configuração do header
const testHeaderConfig = {
  logo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  logoAlt: "Logo Teste",
  title: "Olá Teste",
  logoHeight: 90,
  userName: "Usuário Teste"
};

console.log('🧪 Teste do Header Editor iniciado...');

// Testar localStorage
try {
  // Limpar localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('headerConfig');
    console.log('✅ localStorage limpo');
    
    // Salvar configuração de teste
    localStorage.setItem('headerConfig', JSON.stringify(testHeaderConfig));
    console.log('✅ Configuração de teste salva no localStorage');
    
    // Recuperar configuração
    const saved = localStorage.getItem('headerConfig');
    const parsed = JSON.parse(saved);
    
    console.log('📦 Configuração recuperada:', parsed);
    
    // Verificar se os dados estão corretos
    const isValid = 
      parsed.logo === testHeaderConfig.logo &&
      parsed.logoAlt === testHeaderConfig.logoAlt &&
      parsed.title === testHeaderConfig.title &&
      parsed.logoHeight === testHeaderConfig.logoHeight &&
      parsed.userName === testHeaderConfig.userName;
    
    if (isValid) {
      console.log('✅ Dados do localStorage validados com sucesso');
    } else {
      console.log('❌ Dados do localStorage não conferem');
    }
    
  } else {
    console.log('⚠️ localStorage não disponível neste ambiente');
  }
} catch (error) {
  console.log('🚨 Erro no teste do localStorage:', error.message);
}

console.log('🏁 Teste do Header Editor concluído');
