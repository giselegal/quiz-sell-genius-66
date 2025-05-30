import React, { useState, useEffect } from 'react';
import { getLowQualityPlaceholder } from '@/utils/imageUtils';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressiveImageProps {
  src: string;
  lowQualitySrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  style?: React.CSSProperties;
  fit?: 'cover' | 'contain' | 'fill';
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  lowQualitySrc,
  alt,
  className = '',
  width,
  height,
  onLoad,
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
  style,
  fit = 'cover'
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [loadStartTime] = useState(Date.now());

  // Gerar placeholder de baixa qualidade se não for fornecido
  const placeholder = lowQualitySrc || getLowQualityPlaceholder(src, { width: 40, quality: 30 });

  // Controlar o carregamento da imagem
  const handleLoad = () => {
    // Log do tempo de carregamento para otimizações futuras
    const loadTime = Date.now() - loadStartTime;
    console.debug(`[Image] Carregada em ${loadTime}ms: ${src}`);
    
    setLoaded(true);
    if (onLoad) onLoad();
  };

  // Lidar com erro de carregamento
  const handleError = () => {
    console.warn(`[Image] Erro ao carregar: ${src}`);
    setError(true);
    // Garantir que o callback onLoad seja chamado mesmo em erro
    // para não travar a progressão do carregamento
    if (onLoad) onLoad();
  };

  // Iniciar temporizador para garantir eventual carregamento
  useEffect(() => {
    // Reset dos estados quando src muda
    setLoaded(false);
    setError(false);
    
    // Timeout de 5 segundos para garantir que a imagem seja considerada carregada
    // mesmo sem eventos de onload/onerror (fallback de segurança)
    const safetyTimer = setTimeout(() => {
      if (!loaded && !error) {
        console.warn(`[Image] Timeout de carregamento: ${src}`);
        setLoaded(true);
        if (onLoad) onLoad();
      }
    }, 5000); // Aumentado de 3000 para 5000ms

    return () => clearTimeout(safetyTimer);
  }, [loaded, error, src, onLoad]);

  return (
    <div className={`progressive-image-container relative overflow-hidden ${className}`} style={style}>
      {/* Imagem de baixa qualidade para carregamento progressivo */}
      {!loaded && !error && (
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={placeholder} 
            alt={alt} 
            className="w-full h-full blur-lg scale-110 transition-opacity" 
            style={{ objectFit: fit }} 
            aria-hidden="true"
            width={width}
            height={height}
          />
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        </div>
      )}

      {/* Imagem principal com efeito de fade-in */}
      <AnimatePresence>
        {!error ? (
          <motion.img 
            src={src} 
            alt={alt} 
            width={width}
            height={height}
            loading={loading}
            fetchPriority={fetchPriority}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full transition-all"
            style={{ objectFit: fit }}
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-400 text-sm py-8 px-4 rounded-lg"
          >
            <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-center">Não foi possível carregar a imagem</span>
            <span className="text-xs text-gray-300 mt-1 text-center">Verifique sua conexão</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressiveImage;
