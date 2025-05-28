
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedAutoFixedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  fallbackSrc?: string;
  onError?: () => void;
  onLoad?: () => void;
}

const OptimizedAutoFixedImage: React.FC<OptimizedAutoFixedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  priority = false,
  fallbackSrc,
  onError,
  onLoad
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 2;

  const handleImageError = useCallback(() => {
    console.error(`Failed to load image: ${currentSrc}`);
    
    if (retryCount < maxRetries && fallbackSrc) {
      setRetryCount(prev => prev + 1);
      setCurrentSrc(fallbackSrc);
    } else {
      setImageError(true);
      onError?.();
    }
  }, [currentSrc, retryCount, fallbackSrc, onError]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  if (imageError) {
    return (
      <div className={cn(
        "bg-gray-200 flex items-center justify-center rounded",
        className
      )} style={{ width, height }}>
        <div className="text-center p-4">
          <div className="text-gray-400 mb-2">📷</div>
          <span className="text-gray-500 text-xs">Imagem não disponível</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={cn(
          "transition-all duration-300 ease-in-out",
          imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className
        )}
      />
    </div>
  );
};

export default OptimizedAutoFixedImage;
