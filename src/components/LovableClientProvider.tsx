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
                      window.location.search.includes('editor=true');
      
      setIsEditorMode(isEditor);
      
      if (isEditor) {
        // Em uma implementação real, aqui seria carregado o script do editor
        console.log('Modo de edição ativado');
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
