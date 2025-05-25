import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface User {
  userName: string;
  email?: string;
  role?: string;
  plan?: 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';
  features?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email?: string) => void;
  logout: () => void;
  isAdmin: boolean;
  hasEditorAccess: boolean;
  hasPremiumFeatures: boolean;
  hasFeature: (feature: string) => boolean;
  userPlan: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Definição dos planos e recursos
const PLAN_FEATURES = {
  FREE: ['basic-components', 'text', 'buttons', 'basic-forms'],
  STARTER: ['basic-components', 'text', 'buttons', 'basic-forms', 'images', 'simple-animations'],
  PROFESSIONAL: ['basic-components', 'text', 'buttons', 'basic-forms', 'images', 'simple-animations', 'videos', 'audio', 'carousels', 'advanced-animations', 'custom-css'],
  ENTERPRISE: ['all-features', 'white-label', 'api-access', 'custom-integrations']
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedRole = localStorage.getItem('userRole');
    const savedPlan = localStorage.getItem('userPlan') as any || 'PROFESSIONAL'; // Definindo como PROFESSIONAL por padrão para teste
    
    return savedName ? { 
      userName: savedName,
      ...(savedEmail && { email: savedEmail }),
      ...(savedRole && { role: savedRole }),
      plan: savedPlan,
      features: PLAN_FEATURES[savedPlan] || PLAN_FEATURES.FREE
    } : null;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [hasEditorAccess, setHasEditorAccess] = useState(false);
  const [hasPremiumFeatures, setHasPremiumFeatures] = useState(false);

  const login = (name: string, email?: string) => {
    const userData: User = { 
      userName: name,
      plan: 'PROFESSIONAL', // Por padrão, dar acesso premium para teste
      features: PLAN_FEATURES.PROFESSIONAL
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
    localStorage.setItem('userPlan', 'PROFESSIONAL');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userPlan');
  };

  const hasFeature = useCallback((feature: string) => {
    if (!user) return false;
    return user.features?.includes(feature) || user.features?.includes('all-features') || false;
  }, [user]);

  const checkAdminStatus = useCallback(async () => {
    const adminEmails = [
      'admin@sellgenius.com.br',
      'editor@sellgenius.com.br',
      'seu-email@admin.com'
    ];
    
    if (user?.email && adminEmails.includes(user.email.toLowerCase())) {
      setIsAdmin(true);
      setHasEditorAccess(true);
      setHasPremiumFeatures(true);
    } else {
      setIsAdmin(false);
      setHasEditorAccess(true); // Permitir acesso ao editor para todos por enquanto
      setHasPremiumFeatures(user?.plan === 'PROFESSIONAL' || user?.plan === 'ENTERPRISE');
    }
  }, [user?.email, user?.plan]);

  useEffect(() => {
    checkAdminStatus();
  }, [checkAdminStatus]);

  const value = {
    user,
    login,
    logout,
    isAdmin,
    hasEditorAccess,
    hasPremiumFeatures,
    hasFeature,
    userPlan: user?.plan || 'FREE'
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
