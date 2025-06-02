import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { optimizeCloudinaryUrl } from '@/utils/images/optimization';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  lazy?: boolean;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImageV2: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 80,
  lazy = true,
  priority = false,
  className,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const optimizedSrc = optimizeCloudinaryUrl(src, { // Fixed: pass object instead of individual parameters
    quality,
    width,
    height
  });

  // Handle image loading completion
  const handleImageLoaded = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Report load error
  const handleImageError = () => {
    console.error('Error loading image:', optimizedSrc);
    setHasError(true);
    if (onError) onError();
  };

  // Reset state on src change
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={lazy && !priority ? 'lazy' : 'eager'}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        hasError && 'opacity-50',
        className
      )}
      onLoad={handleImageLoaded}
      onError={handleImageError}
      {...props}
    />
  );
};

export default OptimizedImageV2;
