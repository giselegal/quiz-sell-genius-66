// Função para detectar e limpar dados problemáticos do storage
(function detectAndCleanProblematicData() {
  console.log('🔍 Verificando localStorage e sessionStorage...');
  
  // Verificar localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      if (value && value.includes('via.placeholder.com') && value.includes('120x40')) {
        console.warn('🔥 Dados problemáticos encontrados no localStorage:', key);
        console.warn('📄 Conteúdo:', value);
        
        // Tentar limpar os dados problemáticos
        try {
          const parsed = JSON.parse(value);
          const cleaned = JSON.stringify(parsed).replace(/https?:\/\/via\.placeholder\.com[^"'\s]*/g, '/placeholder.svg');
          if (cleaned !== value) {
            localStorage.setItem(key, cleaned);
            console.log('✅ Dados limpos no localStorage para:', key);
          }
        } catch (e) {
          // Se não for JSON, simplesmente substituir
          const cleaned = value.replace(/https?:\/\/via\.placeholder\.com[^"'\s]*/g, '/placeholder.svg');
          if (cleaned !== value) {
            localStorage.setItem(key, cleaned);
            console.log('✅ Dados limpos no localStorage para:', key);
          }
        }
      }
    }
  }
  
  // Verificar sessionStorage
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key) {
      const value = sessionStorage.getItem(key);
      if (value && value.includes('via.placeholder.com') && value.includes('120x40')) {
        console.warn('🔥 Dados problemáticos encontrados no sessionStorage:', key);
        console.warn('📄 Conteúdo:', value);
        
        // Tentar limpar os dados problemáticos
        try {
          const parsed = JSON.parse(value);
          const cleaned = JSON.stringify(parsed).replace(/https?:\/\/via\.placeholder\.com[^"'\s]*/g, '/placeholder.svg');
          if (cleaned !== value) {
            sessionStorage.setItem(key, cleaned);
            console.log('✅ Dados limpos no sessionStorage para:', key);
          }
        } catch (e) {
          // Se não for JSON, simplesmente substituir
          const cleaned = value.replace(/https?:\/\/via\.placeholder\.com[^"'\s]*/g, '/placeholder.svg');
          if (cleaned !== value) {
            sessionStorage.setItem(key, cleaned);
            console.log('✅ Dados limpos no sessionStorage para:', key);
          }
        }
      }
    }
  }
  
  console.log('✅ Verificação completa');
})();
