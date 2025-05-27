
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface AutoFixedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const AutoFixedImage: React.FC<AutoFixedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = useCallback(() => {
    console.error(`Failed to load image: ${src}`);
    setImageError(true);
  }, [src]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  if (imageError) {
    return (
      <div className={cn(
        "bg-gray-200 flex items-center justify-center",
        className
      )}>
        <span className="text-gray-500 text-sm">Imagem não disponível</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={cn(
          "transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
};

export default AutoFixedImage;
