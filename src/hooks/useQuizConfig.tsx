
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

interface QuizTheme {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  textSecondaryColor: string;
}

interface QuizLayout {
  cardStyle: string;
  spacing: string;
  gridType: string;
}

interface QuizConfigContextType {
  config: QuizConfig;
  updateConfig: (updates: Partial<QuizConfig>) => void;
  cssVariables: CSSProperties;
  theme: QuizTheme;
  layout: QuizLayout;
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
    '--quiz-bg-color': config.backgroundColor,
    '--quiz-primary-color': config.primaryColor,
    '--quiz-secondary-color': config.secondaryColor,
    '--quiz-accent-color': config.accentColor,
    '--quiz-text-color': config.textColor,
    '--quiz-text-secondary-color': config.textSecondaryColor,
    '--quiz-border-color': config.borderColor,
    '--quiz-shadow-color': config.shadowColor,
    '--quiz-font-family': config.fontFamily,
    '--quiz-font-size': config.fontSize,
    '--quiz-border-radius': config.borderRadius,
  } as CSSProperties;

  const theme: QuizTheme = {
    backgroundColor: config.backgroundColor,
    primaryColor: config.primaryColor,
    secondaryColor: config.secondaryColor,
    accentColor: config.accentColor,
    textColor: config.textColor,
    textSecondaryColor: config.textSecondaryColor,
  };

  const layout: QuizLayout = {
    cardStyle: 'modern',
    spacing: 'normal',
    gridType: 'auto',
  };

  return (
    <QuizConfigContext.Provider value={{ config, updateConfig, cssVariables, theme, layout }}>
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

export const useQuizTheme = () => {
  const context = useContext(QuizConfigContext);
  if (!context) {
    throw new Error('useQuizTheme must be used within a QuizConfigProvider');
  }
  return { theme: context.theme };
};

export const useQuizBehavior = () => {
  return {
    autoAdvance: true,
    maxSelections: 3,
    showProgress: true,
  };
};

export const useQuizLayout = () => {
  const context = useContext(QuizConfigContext);
  if (!context) {
    throw new Error('useQuizLayout must be used within a QuizConfigProvider');
  }
  return { layout: context.layout };
};
