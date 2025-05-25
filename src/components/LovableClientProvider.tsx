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
        // Configuração global para o Lovable
        window.LOVABLE_CONFIG = {
          projectId: 'quiz-sell-genius',
          apiBaseUrl: 'https://api.lovableproject.com',
          // Opcional: definir credenciais se necessário
          // authToken: 'seu-token-aqui'
        };
        
        // Carregamento dinâmico do script do editor
        const script = document.createElement('script');
        script.src = "https://cdn.lovableproject.com/editor/v1/editor.js";
        script.async = true;
        document.body.appendChild(script);
        
        return () => {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
          delete window.LOVABLE_CONFIG;
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
