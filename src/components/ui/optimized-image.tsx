"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { optimizeCloudinaryUrl } from '@/utils/imageUtils';
import { getImageMetadata, isImagePreloaded, getOptimizedImage } from '@/utils/imageManager';

export interface ImageOptimizationOptions {
  quality?: number;
  height?: number;
  width?: number;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  style?: React.CSSProperties;
  quality?: number;
  placeholderColor?: string;
}

/**
 * Componente de imagem otimizado com melhor experiência visual
 * - Carregamento progressivo com efeito blur
 * - Suporte para lazy loading e carregamento prioritário
 * - Tamanhos responsivos otimizados
 * - Fallback para imagens indisponíveis
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  onLoad,
  objectFit = 'cover',
  style,
  quality = 85,
  placeholderColor = '#f5f5f5'
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [blurredLoaded, setBlurredLoaded] = useState(false);
  // Obter metadados da imagem do banco de imagens
  const imageMetadata = useMemo(() => src ? getImageMetadata(src) : undefined, [src]);
  // Gerar placeholder manualmente (blur de baixa qualidade)
  const placeholderSrc = useMemo(() => {
    if (!src) return '';
    // Gera uma versão extremamente pequena para efeito blur
    return getOptimizedImage(src, { width: 16, quality: 10 });
  }, [src]);
  // Otimizar URLs do Cloudinary automaticamente
  const optimizedSrc = useMemo(() => {
    const imgWidth = width || (imageMetadata?.width || undefined);
    const imgHeight = height || (imageMetadata?.height || undefined);
    return getOptimizedImage(src, {
      width: imgWidth,
      height: imgHeight
    });
  }, [src, width, height, imageMetadata, quality]);
  // Responsivo: não implementado sem função utilitária
  const responsiveImageProps = { srcSet: '', sizes: '' };
  // Para imagens prioritárias, verificamos se já estão pré-carregadas
  useEffect(() => {
    setLoaded(false);
    setBlurredLoaded(false);
    setError(false);
    if (src && priority) {
      if (isImagePreloaded(src)) {
        setLoaded(true);
        onLoad?.();
      } else {
        const img = new window.Image();
        img.src = optimizedSrc;
        img.onload = () => {
          setLoaded(true);
          onLoad?.();
        };
        img.onerror = () => setError(true);
      }
      // Placeholder blur (não implementado sem utilitário)
      setBlurredLoaded(true);
    }
  }, [optimizedSrc, placeholderSrc, priority, src, onLoad]);
  const aspectRatio = width && height ? `${width} / ${height}` : undefined;
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{
        aspectRatio,
        ...style
      }}
    >
      {!loaded && !error && (
        <>
          {/* Placeholder de carregamento */}
          {placeholderSrc && (
            <img
              src={placeholderSrc}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-lg scale-105 transition-opacity duration-300"
              style={{ backgroundColor: placeholderColor }}
            />
          )}
          <div
            className="absolute inset-0 animate-pulse"
            style={{ backgroundColor: placeholderColor }}
          />
        </>
      )}
      <img
        src={optimizedSrc}
        alt={imageMetadata?.alt || alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        srcSet={responsiveImageProps.srcSet || undefined}
        sizes={responsiveImageProps.sizes || undefined}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full transition-opacity duration-300",
          !loaded && "opacity-0",
          loaded && "opacity-100",
          objectFit === 'cover' && "object-cover",
          objectFit === 'contain' && "object-contain",
          objectFit === 'fill' && "object-fill",
          objectFit === 'none' && "object-none",
          objectFit === 'scale-down' && "object-scale-down"
        )}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          <span className="text-sm text-gray-500">Imagem não disponível</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
