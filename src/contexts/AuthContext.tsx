
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  userName: string;
  email?: string;
  role?: string;
}

interface AuthData {
  user: User | null;
  token?: string;
}

interface AuthContextType {
  authData: AuthData | null;
  login: (name: string, email?: string) => void;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData | null>(() => {
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedRole = localStorage.getItem('userRole');
    
    return savedName ? { 
      user: {
        userName: savedName,
        ...(savedEmail && { email: savedEmail }),
        ...(savedRole && { role: savedRole })
      }
    } : null;
  });

  const login = (name: string, email?: string) => {
    const userData: User = { userName: name };
    
    if (email) {
      userData.email = email;
      localStorage.setItem('userEmail', email);
    }
    
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      userData.role = savedRole;
    }
    
    setAuthData({ user: userData });
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
  };

  const checkAuth = () => {
    // Implementation for checking auth state
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
