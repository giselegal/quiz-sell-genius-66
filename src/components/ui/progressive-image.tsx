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
  const placeholder = lowQualitySrc || getLowQualityPlaceholder(src, { width: 30, quality: 15 });

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
    // Timeout de 3 segundos para garantir que a imagem seja considerada carregada
    // mesmo sem eventos de onload/onerror (fallback de segurança)
    const safetyTimer = setTimeout(() => {
      if (!loaded && !error) {
        console.warn(`[Image] Timeout de carregamento: ${src}`);
        setLoaded(true);
        if (onLoad) onLoad();
      }
    }, 3000);

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
          <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400 text-sm py-4">
            Não foi possível carregar a imagem
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressiveImage;
