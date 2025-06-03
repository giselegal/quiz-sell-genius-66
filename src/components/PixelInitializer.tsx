
"use client";
// Facebook Pixel Initializer Component
import React, { useEffect } from 'react';
import { initFacebookPixel } from '@/utils/analytics';

interface PixelInitializerProps {
  pageType?: 'quiz' | 'result' | 'offer' | 'other';
}

/**
 * Componente para inicializar o Facebook Pixel em qualquer página
 * Pode ser utilizado em todas as rotas principais do aplicativo
 */
const PixelInitializer = ({ pageType = 'other' }: PixelInitializerProps) => {
  useEffect(() => {
    // Inicializa o Facebook Pixel com o ID correto do funil atual
    initFacebookPixel();
    
    console.log(`[PixelInitializer] Pixel inicializado na página: ${pageType}`);
    return () => {
      // Nenhuma limpeza necessária, mas mantém estrutura para futuros ajustes
    };
  }, [pageType]);
  
  // Componente não renderiza nenhum elemento visível
  return null;
};

export default PixelInitializer;
