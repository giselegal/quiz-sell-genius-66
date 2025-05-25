import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface User {
  userName: string;
  email?: string; // Added email as optional property
  role?: string;  // Added role property for admin access
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email?: string) => void;
  logout: () => void;
  isAdmin: boolean;
  hasEditorAccess: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedRole = localStorage.getItem('userRole');
    
    return savedName ? { 
      userName: savedName,
      ...(savedEmail && { email: savedEmail }),
      ...(savedRole && { role: savedRole })
    } : null;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [hasEditorAccess, setHasEditorAccess] = useState(false);

  const login = (name: string, email?: string) => {
    const userData: User = { 
      userName: name 
    };
    
    if (email) {
      userData.email = email;
      localStorage.setItem('userEmail', email);
    }
    
    // Preservar o status de admin caso exista
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      userData.role = savedRole;
    }
    
    setUser(userData);
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  };

  const checkAdminStatus = useCallback(async () => {
    const adminEmails = [
      'admin@sellgenius.com.br',
      'editor@sellgenius.com.br',
      'seu-email@admin.com' // Adicione seu email aqui
    ];
    
    if (user?.email && adminEmails.includes(user.email.toLowerCase())) {
      setIsAdmin(true);
      setHasEditorAccess(true);
    } else {
      setIsAdmin(false);
      setHasEditorAccess(false);
    }
  }, [user?.email]);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  const value = {
    user,
    login,
    logout,
    isAdmin,
    hasEditorAccess
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
