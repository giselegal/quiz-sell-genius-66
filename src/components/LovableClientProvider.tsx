"use client";

import React, { useEffect, useState } from 'react';

interface LovableProviderProps {
  children: React.ReactNode;
}

// Este é um componente para integrar com o editor visual Lovable
export function LovableClientProvider({ children }: LovableProviderProps) {
  const [isEditorMode, setIsEditorMode] = useState(false);
  
  // Lógica para inicializar o editor quando estamos em modo de edição
  useEffect(() => {
    // Só executa no cliente
    if (typeof window !== 'undefined') {
      const isEditor = window.location.pathname.includes('/admin') || 
                      window.location.pathname === '/' ||
                      window.location.pathname.startsWith('/resultado/') ||
                      window.location.search.includes('lovable=true');
      
      setIsEditorMode(isEditor);
      if (isEditor) {
        // Configuração global para o Lovable
        (window as any).LOVABLE_CONFIG = {
          projectId: 'quiz-sell-genius',
          apiBaseUrl: 'https://api.lovable.dev',
        };
        return () => {
          delete (window as any).LOVABLE_CONFIG;
        };
      }
    }
  }, []);
  
  // Em modo de edição, adicionamos classes e atributos para o editor
  return (
    <div className={isEditorMode ? 'lovable-editable-page' : ''} data-lovable-root={isEditorMode ? 'true' : undefined}>
      {children}
    </div>
  );
}
