
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CSSProperties } from 'react';

interface QuizConfig {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  textSecondaryColor: string;
  borderColor: string;
  shadowColor: string;
  fontFamily: string;
  fontSize: string;
  borderRadius: string;
}

interface QuizConfigContextType {
  config: QuizConfig;
  updateConfig: (updates: Partial<QuizConfig>) => void;
  cssVariables: CSSProperties;
}

const defaultConfig: QuizConfig = {
  backgroundColor: '#FAF9F7',
  primaryColor: '#B89B7A',
  secondaryColor: '#432818',
  accentColor: '#D4C4A0',
  textColor: '#432818',
  textSecondaryColor: '#8F7A6A',
  borderColor: '#B89B7A',
  shadowColor: 'rgba(184, 155, 122, 0.1)',
  fontFamily: 'Playfair Display, serif',
  fontSize: '16px',
  borderRadius: '0.375rem'
};

const QuizConfigContext = createContext<QuizConfigContextType | undefined>(undefined);

export const QuizConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<QuizConfig>(defaultConfig);

  const updateConfig = (updates: Partial<QuizConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const cssVariables: CSSProperties = {
    ['--quiz-bg-color' as any]: config.backgroundColor,
    ['--quiz-primary-color' as any]: config.primaryColor,
    ['--quiz-secondary-color' as any]: config.secondaryColor,
    ['--quiz-accent-color' as any]: config.accentColor,
    ['--quiz-text-color' as any]: config.textColor,
    ['--quiz-text-secondary-color' as any]: config.textSecondaryColor,
    ['--quiz-border-color' as any]: config.borderColor,
    ['--quiz-shadow-color' as any]: config.shadowColor,
    ['--quiz-font-family' as any]: config.fontFamily,
    ['--quiz-font-size' as any]: config.fontSize,
    ['--quiz-border-radius' as any]: config.borderRadius,
  };

  return (
    <QuizConfigContext.Provider value={{ config, updateConfig, cssVariables }}>
      {children}
    </QuizConfigContext.Provider>
  );
};

export const useQuizStyles = () => {
  const context = useContext(QuizConfigContext);
  if (!context) {
    throw new Error('useQuizStyles must be used within a QuizConfigProvider');
  }
  return context;
};

export const useQuizConfig = () => {
  const context = useContext(QuizConfigContext);
  if (!context) {
    throw new Error('useQuizConfig must be used within a QuizConfigProvider');
  }
  return context;
};
