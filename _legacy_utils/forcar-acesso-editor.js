/* 
 * FERRAMENTA AVANÇADA DE ACESSO AO EDITOR
 * Esta ferramenta irá forçar o acesso ao editor de forma robusta
 * e lidar com problemas comuns que possam estar impedindo o acesso
 */

javascript:(function() {
  console.clear();
  console.log('🔧 FERRAMENTA DE DIAGNÓSTICO E ACESSO AO EDITOR');
  console.log('-----------------------------------------------');
  
  // 1. Verificar o estado atual
  console.log('1️⃣ Verificando estado atual...');
  
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');
  const isEditorPage = window.location.pathname === '/resultado/editor';
  
  console.log(`• Página atual: ${window.location.pathname}`);
  console.log(`• userRole no localStorage: ${userRole || 'não definido'}`);
  console.log(`• userName no localStorage: ${userName || 'não definido'}`);
  
  // 2. Limpar estado potencialmente problemático
  console.log('2️⃣ Limpando qualquer estado problemático...');
  
  // Limpar qualquer flag de redirecionamento
  sessionStorage.removeItem('redirectToEditor');
  
  // 3. Configurar o acesso de admin
  console.log('3️⃣ Configurando acesso admin...');
  
  localStorage.setItem('userRole', 'admin');
  localStorage.setItem('userName', localStorage.getItem('userName') || 'Admin');
  localStorage.setItem('adminAccessTime', Date.now().toString());
  
  // 4. Verificar se precisa ir para a página de editor
  console.log('4️⃣ Processando navegação...');
  
  if (isEditorPage) {
    console.log('Já estamos na página do editor, forçando reinicialização completa...');
    
    // Criar um elemento na página para mostrar o status
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '100%';
    div.style.padding = '15px';
    div.style.backgroundColor = '#4CAF50';
    div.style.color = 'white';
    div.style.zIndex = '9999';
    div.style.fontFamily = 'Arial, sans-serif';
    div.style.textAlign = 'center';
    div.innerHTML = '<b>REINICIANDO EDITOR</b> - Aguarde um momento...';
    document.body.appendChild(div);
    
    // Delay para mostrar a mensagem antes de redirecionar
    setTimeout(() => {
      window.location.href = '/?forcedRedirect=true&ts=' + Date.now();
    }, 1500);
  } else if (window.location.search.includes('forcedRedirect=true')) {
    // Estamos voltando do redirecionamento forçado, ir para o editor
    console.log('Voltando para o editor após redirecionamento forçado...');
    
    // Criar um elemento na página para mostrar o status
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '100%';
    div.style.padding = '15px';
    div.style.backgroundColor = '#2196F3';
    div.style.color = 'white';
    div.style.zIndex = '9999';
    div.style.fontFamily = 'Arial, sans-serif';
    div.style.textAlign = 'center';
    div.innerHTML = '<b>ACESSANDO EDITOR</b> - Redirecionando...';
    document.body.appendChild(div);
    
    // Delay para mostrar a mensagem antes de redirecionar
    setTimeout(() => {
      window.location.href = '/resultado/editor?auth=' + Date.now();
    }, 1500);
  } else {
    // Primeira execução, ir para o editor
    console.log('Redirecionando para o editor...');
    window.location.href = '/resultado/editor';
  }
})();
