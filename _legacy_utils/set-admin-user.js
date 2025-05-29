// Este script é para definir o usuário atual como administrador na aplicação
// Executando este script você poderá acessar o editor da página de resultado

// Função para definir o usuário atual como admin
function setCurrentUserAsAdmin() {
  // Verificar se há um usuário armazenado no localStorage
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  
  if (!userName) {
    console.log('Nenhum usuário encontrado. Criando um usuário administrador...');
    
    // Criar um novo usuário administrador
    const adminName = 'Admin';
    const adminEmail = 'admin@example.com';
    
    localStorage.setItem('userName', adminName);
    localStorage.setItem('userEmail', adminEmail);
    localStorage.setItem('userRole', 'admin');
    
    console.log('Usuário administrador criado com sucesso!');
    console.log('Nome:', adminName);
    console.log('Email:', adminEmail);
    console.log('Role: admin');
  } else {
    // Atualizar o usuário existente para administrador
    localStorage.setItem('userRole', 'admin');
    
    console.log('Usuário existente atualizado para administrador:');
    console.log('Nome:', userName);
    console.log('Email:', userEmail || 'N/A');
    console.log('Role: admin');
  }
  
  console.log('\nAgora você pode acessar o editor em:');
  console.log('- /resultado/editor');
  console.log('\nOu visite a página de resultado e você verá o botão "Editar Página":');
  console.log('- /resultado');
  
  console.log('\nPressione F5 para recarregar a página após executar este script.');
}

// Executar a função
setCurrentUserAsAdmin();

// Adicionando o campo role ao contexto de autenticação
// (Isso apenas exibe informações, a mudança real acontece ao executar o script)
console.log('\nInformações para desenvolvedores:');
console.log('Foi adicionado o campo "role" ao localStorage com o valor "admin".');
console.log('Isso permite que o sistema reconheça você como administrador.');
