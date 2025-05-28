'use client';

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
                      window.location.search.includes('lovable=true') || 
                      window.location.search.includes('editor=true'); // Mantém compatibilidade com implementação anterior
      
      setIsEditorMode(isEditor);
      
      if (isEditor) {
        // Em uma implementação real, aqui seria carregado o script do editor
        console.log('Modo de edição ativado', { 
          isLovableMode: window.location.search.includes('lovable=true'),
          params: window.location.search
        });
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Diagnóstico Lovable Mode:', {
        pathname: window.location.pathname,
        search: window.location.search,
        hasLovableParam: window.location.search.includes('lovable=true'),
        hasEditorParam: window.location.search.includes('editor=true'),
        isAdminPath: window.location.pathname.includes('/admin')
      });
    }
  }, []);
  
  // Em modo de edição, adicionamos classes e atributos para o editor
  return (
    <div className={isEditorMode ? 'lovable-editable-page' : ''} data-lovable-root={isEditorMode ? 'true' : undefined}>
      {children}
    </div>
  );
}
