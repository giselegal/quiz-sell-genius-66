
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  userName?: string;
  email?: string;
  role?: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userName: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Get user name from localStorage if available
    const userName = localStorage.getItem('userName');
    if (userName) {
      return {
        id: '1',
        userName,
        email: 'user@quiz.com',
        role: 'user'
      };
    }
    return null;
  });

  const login = (userName: string) => {
    const newUser = {
      id: '1',
      userName,
      email: 'user@quiz.com',
      role: 'user' as const
    };
    setUser(newUser);
    localStorage.setItem('userName', userName);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userName');
  };

  const contextValue = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
