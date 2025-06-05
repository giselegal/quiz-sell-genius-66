import React, { useState, useEffect, useRef, memo } from 'react';
import { cn } from '@/lib/utils';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';

interface UltraOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
  fallbackSrc?: string;
  quality?: number;
}

export const UltraOptimizedImage = memo<UltraOptimizedImageProps>(({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  loading = 'lazy',
  fallbackSrc,
  quality = 85
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const { settings, getOptimalImageQuality, isLowPerformanceDevice } = usePerformanceOptimization();

  // Otimizar qualidade da imagem baseado na performance do dispositivo
  const optimizedQuality = getOptimalImageQuality(quality);
  
  // Gerar URL otimizada com base nas configurações de performance
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc.includes('cloudinary.com')) return originalSrc;
    
    const qualityParam = `q_${optimizedQuality}`;
    const formatParam = isLowPerformanceDevice ? 'f_auto,fl_progressive' : 'f_avif,fl_progressive';
    
    if (originalSrc.includes('/upload/')) {
      return originalSrc.replace('/upload/', `/upload/${formatParam},${qualityParam},c_limit,w_${width || 800}/`);
    }
    
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);

  // Intersection Observer para lazy loading eficiente
  useEffect(() => {
    if (!imgRef.current || priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: isLowPerformanceDevice ? '50px' : '100px',
        threshold: 0.1
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority, isInView, isLowPerformanceDevice]);

  // Handle image loading
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
    
    // Report loading performance for priority images
    if (priority && 'performance' in window) {
      try {
        performance.mark(`img-loaded-${alt.substring(0, 20)}`);
      } catch {
        // Ignore performance marking errors
      }
    }
  };

  const handleError = () => {
    setHasError(true);
    console.warn(`Failed to load image: ${src.substring(0, 50)}...`);
  };

  // Para dispositivos de baixíssimo desempenho, usar placeholder simples
  if (isLowPerformanceDevice && !isInView && !priority) {
    return (
      <div 
        ref={imgRef}
        className={cn("bg-gray-200 animate-pulse", className)}
        style={{ width, height }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ width, height }}>
      {/* Placeholder enquanto carrega */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}

      {/* Imagem principal */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "transition-opacity duration-300 w-full h-full object-cover",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          // Preconnect para Cloudinary se for prioridade
          {...(priority && src.includes('cloudinary.com') && {
            crossOrigin: 'anonymous'
          })}
        />
      )}

      {/* Fallback em caso de erro */}
      {hasError && fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          onError={() => console.warn('Fallback image also failed to load')}
        />
      )}

      {/* Fallback final - placeholder de erro */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-xs text-gray-500">Imagem indisponível</span>
        </div>
      )}
    </div>
  );
});

UltraOptimizedImage.displayName = 'UltraOptimizedImage';
