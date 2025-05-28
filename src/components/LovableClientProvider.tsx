import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Interface para o contexto
interface LovableContextType {
  isLovableMode: boolean;
  isEditable: boolean;
}

// Valor default para o contexto
const defaultContextValue: LovableContextType = {
  isLovableMode: false,
  isEditable: false
};

// Criação do contexto
const LovableContext = createContext<LovableContextType>(defaultContextValue);

// Hook personalizado para usar o contexto
export const useLovable = () => useContext(LovableContext);

interface LovableClientProviderProps {
  children: React.ReactNode;
}

export const LovableClientProvider: React.FC<LovableClientProviderProps> = ({ children }) => {
  const location = useLocation();
  const [isLovableMode, setIsLovableMode] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // Verifica se está rodando no ambiente Lovable
    const checkLovableMode = () => {
      const isLovableDomain = 
        typeof window !== 'undefined' &&
        (window.location.hostname.includes('lovable.dev') || 
         window.location.hostname.includes('lovableproject.com'));
      
      const hasLovableParam = 
        typeof window !== 'undefined' &&
        (window.location.search.includes('lovable=true') ||
         window.location.search.includes('lovable_edit=true'));
      
      return isLovableDomain || hasLovableParam;
    };

    // Verifica se a rota atual é editável
    const checkEditableRoute = () => {
      // Rota principal (quiz)
      if (location.pathname === '/') {
        return true;
      }
      
      // Rota de resultado ou subpáginas de resultado
      if (location.pathname === '/resultado' || location.pathname.startsWith('/resultado/')) {
        return true;
      }
      
      // Rota de oferta de quiz
      if (location.pathname === '/quiz-descubra-seu-estilo') {
        return true;
      }
      
      return false;
    };

    setIsLovableMode(checkLovableMode());
    setIsEditable(checkEditableRoute());
    
    // Log para debug
    console.log(`Lovable status: mode=${checkLovableMode()}, editable=${checkEditableRoute()}, path=${location.pathname}`);
  }, [location]);

  return (
    <LovableContext.Provider value={{ isLovableMode, isEditable }}>
      {children}
    </LovableContext.Provider>
  );
};

export default LovableClientProvider;
