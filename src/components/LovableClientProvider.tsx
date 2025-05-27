"use client";

import React, { useEffect, useState } from 'react';

interface LovableProviderProps {
  children: React.ReactNode;
}

export function LovableClientProvider({ children }: LovableProviderProps) {
  const [isEditorMode, setIsEditorMode] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const isEditor =
        url.pathname.includes('/admin') ||
        url.pathname === '/' ||
        url.pathname.startsWith('/dashboard') ||
        url.pathname.startsWith('/resultado/') ||
        url.searchParams.has('lovable') ||
        url.searchParams.has('editor');

      setIsEditorMode(isEditor);

      if (isEditor) {
        // Corrigindo a configuração do script do Lovable
        const scriptId = 'lovable-cdn-script';
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = 'https://cdn.gpteng.co/gptengineer.js';
          script.type = 'module';
          document.head.appendChild(script);
        }
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
  
  return (
    <div className={isEditorMode ? 'lovable-editable-page' : ''} data-lovable-root={isEditorMode ? 'true' : undefined}>
      {children}
    </div>
  );
}
