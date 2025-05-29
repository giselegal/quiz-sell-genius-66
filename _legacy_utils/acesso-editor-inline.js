// Acesso direto ao editor - Script para ser colado no console
// Criado em 15 de maio de 2025

/*
INSTRUÇÕES DE USO:
1. Acesse https://giselegalvao.com.br/ no seu navegador
2. Abra o console do navegador (F12 ou Ctrl+Shift+I, depois selecione "Console")
3. Cole todo este código no console e pressione Enter
4. Siga as instruções exibidas na tela
*/

(function() {
  // Criar a interface visual diretamente na página
  function createDiagnosticInterface() {
    // Remover qualquer interface existente
    const existingUI = document.getElementById('editor-access-ui');
    if (existingUI) {
      document.body.removeChild(existingUI);
    }
    
    // Criar o container principal
    const container = document.createElement('div');
    container.id = 'editor-access-ui';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    
    // Criar o painel
    const panel = document.createElement('div');
    panel.style.backgroundColor = '#FAF9F7';
    panel.style.width = '90%';
    panel.style.maxWidth = '600px';
    panel.style.borderRadius = '8px';
    panel.style.padding = '20px';
    panel.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    panel.style.fontFamily = 'Arial, sans-serif';
    panel.style.maxHeight = '90vh';
    panel.style.overflow = 'auto';
    
    // Título
    const title = document.createElement('h2');
    title.textContent = 'Ferramenta de Acesso ao Editor - Quiz Sell Genius';
    title.style.color = '#432818';
    title.style.marginTop = '0';
    title.style.textAlign = 'center';
    panel.appendChild(title);
    
    // Área de informações
    const infoArea = document.createElement('div');
    infoArea.style.backgroundColor = '#e3f2fd';
    infoArea.style.padding = '10px';
    infoArea.style.borderRadius = '4px';
    infoArea.style.marginBottom = '20px';
    infoArea.style.borderLeft = '4px solid #2196F3';
    
    const infoTitle = document.createElement('h3');
    infoTitle.textContent = 'Informações do Sistema';
    infoTitle.style.marginTop = '0';
    infoTitle.style.color = '#0d47a1';
    
    const infoContent = document.createElement('div');
    infoContent.id = 'system-info';
    infoContent.style.fontFamily = 'monospace';
    infoContent.style.fontSize = '13px';
    
    infoArea.appendChild(infoTitle);
    infoArea.appendChild(infoContent);
    panel.appendChild(infoArea);
    
    // Área de status
    const statusArea = document.createElement('div');
    statusArea.id = 'status-area';
    statusArea.style.padding = '10px';
    statusArea.style.borderRadius = '4px';
    statusArea.style.marginBottom = '20px';
    statusArea.style.display = 'none';
    panel.appendChild(statusArea);
    
    // Botões de ação
    const buttonStyles = [
      'display: block',
      'width: 100%',
      'padding: 12px',
      'margin: 10px 0',
      'border: none',
      'border-radius: 4px',
      'color: white',
      'font-weight: bold',
      'cursor: pointer',
      'text-align: center'
    ].join(';');
    
    // Botão de acesso normal
    const normalButton = document.createElement('button');
    normalButton.textContent = '🔑 Acesso Normal ao Editor';
    normalButton.style.cssText = buttonStyles + ';background-color: #4CAF50';
    normalButton.addEventListener('click', function() {
      triggerNormalAccess();
    });
    panel.appendChild(normalButton);
    
    // Botão de acesso forçado
    const forceButton = document.createElement('button');
    forceButton.textContent = '⚡ Forçar Acesso ao Editor';
    forceButton.style.cssText = buttonStyles + ';background-color: #2196F3';
    forceButton.addEventListener('click', function() {
      triggerForceAccess();
    });
    panel.appendChild(forceButton);
    
    // Botão para limpar dados de autenticação
    const resetButton = document.createElement('button');
    resetButton.textContent = '🧹 Limpar Dados de Autenticação';
    resetButton.style.cssText = buttonStyles + ';background-color: #FF9800';
    resetButton.addEventListener('click', function() {
      clearAuthData();
    });
    panel.appendChild(resetButton);
    
    // Botão para fechar
    const closeButton = document.createElement('button');
    closeButton.textContent = '❌ Fechar';
    closeButton.style.cssText = buttonStyles + ';background-color: #f44336';
    closeButton.addEventListener('click', function() {
      document.body.removeChild(container);
    });
    panel.appendChild(closeButton);
    
    // Adicionar o painel ao container
    container.appendChild(panel);
    
    // Adicionar o container ao body
    document.body.appendChild(container);
    
    // Atualizar informações do sistema
    updateSystemInfo();
  }
  
  // Atualizar informações do sistema
  function updateSystemInfo() {
    const infoElement = document.getElementById('system-info');
    if (!infoElement) return;
    
    // Coletar informações
    const info = {
      'URL Atual': window.location.href,
      'Navegador': navigator.userAgent,
      'LocalStorage': {}
    };
    
    // Obter dados do localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      info.LocalStorage[key] = localStorage.getItem(key);
    }
    
    // Formatar e exibir as informações
    let infoHTML = '';
    for (const key in info) {
      if (key === 'LocalStorage') {
        infoHTML += `<strong>${key}:</strong><br>`;
        const localStorageData = info[key];
        if (Object.keys(localStorageData).length === 0) {
          infoHTML += '  Nenhum dado encontrado<br>';
        } else {
          for (const lsKey in localStorageData) {
            infoHTML += `  ${lsKey}: ${localStorageData[lsKey]}<br>`;
          }
        }
      } else {
        infoHTML += `<strong>${key}:</strong> ${info[key]}<br>`;
      }
    }
    
    infoElement.innerHTML = infoHTML;
  }
  
  // Exibir status
  function showStatus(message, isError = false) {
    const statusArea = document.getElementById('status-area');
    if (!statusArea) return;
    
    statusArea.textContent = message;
    statusArea.style.display = 'block';
    
    if (isError) {
      statusArea.style.backgroundColor = '#FFEBEE';
      statusArea.style.borderLeft = '4px solid #F44336';
    } else {
      statusArea.style.backgroundColor = '#E8F5E9';
      statusArea.style.borderLeft = '4px solid #4CAF50';
    }
    
    // Atualizar informações do sistema
    updateSystemInfo();
  }
  
  // Acesso normal ao editor
  function triggerNormalAccess() {
    showStatus('Configurando acesso admin e redirecionando para o editor...');
    
    // Configuração básica
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('userName', localStorage.getItem('userName') || 'Admin');
    
    // Adicionar atraso antes do redirecionamento
    setTimeout(function() {
      window.location.href = '/resultado/editor';
    }, 1500);
  }
  
  // Forçar acesso ao editor
  function triggerForceAccess() {
    showStatus('Executando procedimento de acesso forçado...');
    
    // Limpar qualquer estado problemático
    sessionStorage.removeItem('redirectToEditor');
    
    // Configurar acesso de admin com timestamp
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('userName', localStorage.getItem('userName') || 'Admin');
    localStorage.setItem('adminAccessTime', Date.now().toString());
    
    // Adicionar notificação adicional
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '15px 20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.innerHTML = '<b>ACESSANDO EDITOR</b> - Redirecionando...';
    document.body.appendChild(notification);
    
    // Redirecionamento com parâmetro de tempo para evitar cache
    setTimeout(function() {
      window.location.href = '/resultado/editor?force=' + Date.now();
    }, 2000);
  }
  
  // Limpar dados de autenticação
  function clearAuthData() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('adminAccessTime');
    localStorage.removeItem('adminAuthTimestamp');
    sessionStorage.removeItem('redirectToEditor');
    
    showStatus('Dados de autenticação limpos com sucesso.');
  }
  
  // Iniciar a ferramenta
  console.clear();
  console.log('🚀 Iniciando ferramenta de acesso ao editor...');
  createDiagnosticInterface();
})();
