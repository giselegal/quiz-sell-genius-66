// Configurações de Autenticação - Quiz Sell Genius
// Este arquivo contém as credenciais de acesso administrativo

export const AdminCredentials = {
  // Credencial principal
  main: {
    username: 'admin',
    password: 'quiz123',
    role: 'superadmin'
  },
  
  // Credenciais alternativas
  alternatives: [
    {
      username: 'administrator',
      password: 'admin123',
      role: 'admin'
    },
    {
      username: 'root',
      password: 'root123',
      role: 'admin'
    },
    {
      username: 'quizadmin',
      password: 'genius2024',
      role: 'admin'
    },
    {
      username: 'manager',
      password: 'manager123',
      role: 'manager'
    }
  ],
  
  // Configurações de segurança
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutos
    sessionDuration: 24 * 60 * 60 * 1000, // 24 horas
    requirePasswordChange: false
  },
  
  // Função para validar credenciais
  validateCredentials: (username: string, password: string) => {
    // Verificar credencial principal
    if (username === AdminCredentials.main.username && 
        password === AdminCredentials.main.password) {
      return {
        valid: true,
        user: AdminCredentials.main
      };
    }
    
    // Verificar credenciais alternativas
    const altUser = AdminCredentials.alternatives.find(
      cred => cred.username === username && cred.password === password
    );
    
    if (altUser) {
      return {
        valid: true,
        user: altUser
      };
    }
    
    return {
      valid: false,
      user: null
    };
  }
};

// Credenciais para desenvolvimento (pode ser removido em produção)
export const DevCredentials = {
  username: 'dev',
  password: 'dev123',
  role: 'developer'
};

// Função de acesso rápido para desenvolvimento
export const enableQuickAccess = () => {
  localStorage.setItem('userRole', 'admin');
  localStorage.setItem('userName', 'Quick Admin');
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('isAdminAuthenticated', 'true');
  localStorage.setItem('adminBypass', 'true');
  localStorage.setItem('authMethod', 'quick');
  localStorage.setItem('loginTimestamp', Date.now().toString());
};

// Função de acesso de emergência
export const enableEmergencyAccess = () => {
  const emergencyConfig = {
    userRole: 'admin',
    userName: 'Emergency Admin',
    isAuthenticated: 'true',
    isAdminAuthenticated: 'true',
    adminBypass: 'true',
    emergencyAccess: 'true',
    authLevel: 'superuser',
    authMethod: 'emergency',
    loginTimestamp: Date.now().toString()
  };
  
  Object.entries(emergencyConfig).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export default AdminCredentials;
