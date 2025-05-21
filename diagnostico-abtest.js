/* 
 * Ferramenta de Diagnóstico - Testes A/B e Protótipos
 * Quiz Sell Genius - Versão 1.0
 * 
 * Este script pode ser executado no console do navegador para 
 * diagnosticar problemas com acesso aos recursos de testes A/B
 * e protótipos.
 */

(function() {
  // Estilo para o output formatado
  const style = `
    .diag-section { 
      margin: 10px 0;
      padding: 12px;
      border-radius: 8px;
      background: #f9f9f9;
      border-left: 4px solid #B89B7A;
    }
    .diag-title { 
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 8px;
      color: #432818;
    }
    .diag-item { 
      margin: 5px 0;
      font-family: monospace;
    }
    .diag-ok { color: green; }
    .diag-warn { color: orange; }
    .diag-error { color: red; }
    .diag-actions { 
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #eee;
    }
    .diag-btn {
      background: #B89B7A;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 5px;
      font-size: 12px;
    }
    .diag-btn:hover { background: #a38a69; }
  `;

  // Cria um elemento de diagnóstico na página
  const createDiagElement = () => {
    // Remove o diagnóstico existente se houver
    const existingDiag = document.getElementById('qsg-diagnostic');
    if (existingDiag) existingDiag.remove();
    
    const diagContainer = document.createElement('div');
    diagContainer.id = 'qsg-diagnostic';
    diagContainer.style.position = 'fixed';
    diagContainer.style.top = '20px';
    diagContainer.style.right = '20px';
    diagContainer.style.zIndex = '9999';
    diagContainer.style.width = '400px';
    diagContainer.style.maxHeight = '90vh';
    diagContainer.style.overflowY = 'auto';
    diagContainer.style.background = 'white';
    diagContainer.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
    diagContainer.style.borderRadius = '8px';
    diagContainer.style.padding = '15px';
    diagContainer.style.fontFamily = 'Arial, sans-serif';
    diagContainer.style.fontSize = '14px';
    
    // Adicionar o estilo
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    diagContainer.appendChild(styleEl);
    
    // Adicionar título
    const title = document.createElement('h2');
    title.textContent = 'Diagnóstico de Testes A/B e Protótipos';
    title.style.margin = '0 0 15px 0';
    title.style.color = '#432818';
    title.style.borderBottom = '2px solid #B89B7A';
    title.style.paddingBottom = '10px';
    diagContainer.appendChild(title);
    
    // Botão para fechar
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#432818';
    closeBtn.onclick = () => diagContainer.remove();
    diagContainer.appendChild(closeBtn);
    
    document.body.appendChild(diagContainer);
    return diagContainer;
  };

  // Adiciona uma seção ao diagnóstico
  const addSection = (container, title) => {
    const section = document.createElement('div');
    section.className = 'diag-section';
    
    const titleEl = document.createElement('div');
    titleEl.className = 'diag-title';
    titleEl.textContent = title;
    section.appendChild(titleEl);
    
    container.appendChild(section);
    return section;
  };

  // Adiciona um item de diagnóstico
  const addItem = (container, label, value, status = 'ok') => {
    const item = document.createElement('div');
    item.className = `diag-item diag-${status}`;
    item.innerHTML = `<strong>${label}:</strong> ${value}`;
    container.appendChild(item);
    return item;
  };

  // Adiciona um botão de ação
  const addAction = (container, label, onClick) => {
    const button = document.createElement('button');
    button.className = 'diag-btn';
    button.textContent = label;
    button.onclick = onClick;
    container.appendChild(button);
    return button;
  };

  // Mostra um relatório completo de diagnóstico
  const runDiagnostic = () => {
    const container = createDiagElement();
    
    // Verificar acesso administrativo
    const accessSection = addSection(container, 'Acesso Administrativo');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    addItem(accessSection, 'Papel do Usuário', userRole || 'Não definido', userRole === 'admin' ? 'ok' : 'error');
    addItem(accessSection, 'Nome do Usuário', userName || 'Não definido', userName ? 'ok' : 'warn');
    
    // Adicionar ações para acesso
    const accessActions = document.createElement('div');
    accessActions.className = 'diag-actions';
    accessSection.appendChild(accessActions);
    
    addAction(accessActions, 'Configurar como Admin', () => {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Admin');
      localStorage.setItem('adminTimestamp', Date.now().toString());
      runDiagnostic(); // Atualizar o diagnóstico
    });
    
    addAction(accessActions, 'Limpar Acesso', () => {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
      localStorage.removeItem('adminTimestamp');
      runDiagnostic(); // Atualizar o diagnóstico
    });
    
    // Verificar testes A/B
    const abTestSection = addSection(container, 'Testes A/B');
    const storedTests = localStorage.getItem('ab_tests');
    
    if (!storedTests) {
      addItem(abTestSection, 'Status', 'Nenhum teste encontrado', 'warn');
    } else {
      try {
        const tests = JSON.parse(storedTests);
        
        if (tests.length === 0) {
          addItem(abTestSection, 'Status', 'Nenhum teste configurado', 'warn');
        } else {
          addItem(abTestSection, 'Qtd. Testes', tests.length, 'ok');
          
          tests.forEach((test, index) => {
            const testItem = document.createElement('div');
            testItem.style.margin = '10px 0';
            testItem.style.padding = '8px';
            testItem.style.backgroundColor = '#f5f5f5';
            testItem.style.borderRadius = '4px';
            
            testItem.innerHTML = `
              <strong>Teste ${index + 1}:</strong> ${test.name}<br>
              <span style="color: ${test.isActive ? 'green' : 'red'}">
                ${test.isActive ? '✓ Ativo' : '✗ Inativo'}
              </span> | 
              Tipo: ${test.type} | 
              Variações: ${test.variations.length}
            `;
            
            abTestSection.appendChild(testItem);
          });
        }
      } catch (e) {
        addItem(abTestSection, 'Status', `Erro de formato: ${e.message}`, 'error');
      }
    }
    
    // Adicionar ações para testes A/B
    const abTestActions = document.createElement('div');
    abTestActions.className = 'diag-actions';
    abTestSection.appendChild(abTestActions);
    
    addAction(abTestActions, 'Criar Teste Padrão', () => {
      const defaultTest = {
        id: `test_${Date.now()}`,
        name: 'Teste A/B da Página de Resultados',
        type: 'result',
        isActive: true,
        startDate: new Date().toISOString(),
        variations: [
          {
            id: `var_${Date.now()}_a`,
            name: 'Variação A (Original)',
            trafficPercentage: 50,
            content: {}
          },
          {
            id: `var_${Date.now()}_b`,
            name: 'Variação B',
            trafficPercentage: 50,
            content: {}
          }
        ]
      };
      
      const existingTests = localStorage.getItem('ab_tests');
      let tests = [];
      
      if (existingTests) {
        try {
          tests = JSON.parse(existingTests);
        } catch (e) {
          tests = [];
        }
      }
      
      tests.push(defaultTest);
      localStorage.setItem('ab_tests', JSON.stringify(tests));
      runDiagnostic(); // Atualizar o diagnóstico
    });
    
    addAction(abTestActions, 'Ativar/Desativar Testes', () => {
      const storedTests = localStorage.getItem('ab_tests');
      
      if (!storedTests) {
        alert('⚠️ Nenhum teste A/B encontrado para ativar/desativar.');
        return;
      }
      
      try {
        const tests = JSON.parse(storedTests);
        
        if (tests.length === 0) {
          alert('⚠️ Nenhum teste A/B encontrado para ativar/desativar.');
          return;
        }
        
        // Por simplicidade, alterna o status de todos os testes
        const updatedTests = tests.map(test => ({
          ...test,
          isActive: !test.isActive
        }));
        
        localStorage.setItem('ab_tests', JSON.stringify(updatedTests));
        runDiagnostic(); // Atualizar o diagnóstico
      } catch (e) {
        alert('⚠️ Erro ao manipular os testes A/B: ' + e.message);
      }
    });
    
    addAction(abTestActions, 'Limpar Testes', () => {
      if (confirm('Tem certeza que deseja remover todos os testes A/B? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('ab_tests');
        runDiagnostic(); // Atualizar o diagnóstico
      }
    });
    
    // Verificar a URL atual
    const urlSection = addSection(container, 'Navegação');
    const currentUrl = window.location.pathname;
    
    addItem(urlSection, 'URL Atual', currentUrl);
    
    // URLs importantes
    const urls = [
      { path: '/resultado/editor', label: 'Editor de Resultados' },
      { path: '/admin/ab-test-manager', label: 'Gerenciador de Testes A/B' },
      { path: '/resultado-prototipo', label: 'Página de Protótipo' },
      { path: '/admin/ab-test', label: 'Testes A/B (admin)' },
      { path: '/admin/editor', label: 'Editor Unificado' }
    ];
    
    // Adicionar ações para navegação
    const urlActions = document.createElement('div');
    urlActions.className = 'diag-actions';
    urlSection.appendChild(urlActions);
    
    urls.forEach(url => {
      addAction(urlActions, url.label, () => {
        window.location.href = url.path;
      });
    });
    
    // Informações sobre o localStorage
    const storageSection = addSection(container, 'Armazenamento Local');
    
    const localStorageSize = (() => {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += (localStorage[key].length * 2) / 1024; // aproximado em KB
        }
      }
      return total.toFixed(2);
    })();
    
    addItem(storageSection, 'Uso Total', `${localStorageSize} KB`);
    addItem(storageSection, 'Limite do Navegador', 'Aproximadamente 5-10 MB');
    
    // Adicionar ações para armazenamento
    const storageActions = document.createElement('div');
    storageActions.className = 'diag-actions';
    storageSection.appendChild(storageActions);
    
    addAction(storageActions, 'Limpar Todo localStorage', () => {
      if (confirm('ATENÇÃO: Isso removerá todos os dados armazenados localmente, incluindo preferências, testes A/B e configurações de usuário. Continuar?')) {
        localStorage.clear();
        runDiagnostic(); // Atualizar o diagnóstico
      }
    });
  };

  // Executar o diagnóstico
  runDiagnostic();
})();

// Versão minimizada para bookmark:
// javascript:(function(){const e=`...`,...})();
