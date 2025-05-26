"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { safeLocalStorage } from '@/utils/safeLocalStorage';

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
    // Para desenvolvimento, criar usuário automático se não existir
    const savedName = safeLocalStorage.getItem('userName');
    const savedEmail = safeLocalStorage.getItem('userEmail');
    const savedRole = safeLocalStorage.getItem('userRole');
    const savedPlan = safeLocalStorage.getItem('userPlan') as any || 'PROFESSIONAL';
    
    // Se não há usuário salvo, criar um automático para desenvolvimento
    if (!savedName) {
      const autoUser = {
        userName: 'Desenvolvedor',
        email: 'dev@teste.com',
        plan: 'PROFESSIONAL' as const,
        features: PLAN_FEATURES.PROFESSIONAL
      };
      
      // Salvar no localStorage apenas se estivermos no cliente
      if (typeof window !== 'undefined') {
        safeLocalStorage.setItem('userName', autoUser.userName);
        safeLocalStorage.setItem('userEmail', autoUser.email);
        safeLocalStorage.setItem('userPlan', autoUser.plan);
      }
      
      return autoUser;
    }
    
    return { 
      userName: savedName,
      ...(savedEmail && { email: savedEmail }),
      ...(savedRole && { role: savedRole }),
      plan: savedPlan,
      features: PLAN_FEATURES[savedPlan] || PLAN_FEATURES.FREE
    };
  });

  const [isAdmin, setIsAdmin] = useState(true); // Por padrão admin para desenvolvimento
  const [hasEditorAccess, setHasEditorAccess] = useState(true); // Sempre permitir acesso
  const [hasPremiumFeatures, setHasPremiumFeatures] = useState(true); // Sempre premium para desenvolvimento

  const login = (name: string, email?: string, password?: string) => {
    // Para desenvolvimento, aceitar qualquer senha ou sem senha
    const userData: User = { 
      userName: name,
      plan: 'PROFESSIONAL', // Por padrão, dar acesso premium para teste
      features: PLAN_FEATURES.PROFESSIONAL
    };
    
    if (email) {
      userData.email = email;
      safeLocalStorage.setItem('userEmail', email);
    }
    
    // Preservar o status de admin caso exista
    const savedRole = safeLocalStorage.getItem('userRole');
    if (savedRole) {
      userData.role = savedRole;
    }
    
    setUser(userData);
    safeLocalStorage.setItem('userName', name);
    safeLocalStorage.setItem('userPlan', 'PROFESSIONAL');
  };

  const logout = () => {
    setUser(null);
    safeLocalStorage.removeItem('userName');
    safeLocalStorage.removeItem('userEmail');
    safeLocalStorage.removeItem('userRole');
    safeLocalStorage.removeItem('userPlan');
  };

  const hasFeature = useCallback((feature: string) => {
    if (!user) return false;
    return user.features?.includes(feature) || user.features?.includes('all-features') || false;
  }, [user]);

  const checkAdminStatus = useCallback(async () => {
    // Para desenvolvimento, sempre dar acesso completo
    setIsAdmin(true);
    setHasEditorAccess(true);
    setHasPremiumFeatures(true);
  }, []);

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
