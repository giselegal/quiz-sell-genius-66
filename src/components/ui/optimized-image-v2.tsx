
import React, { useState, useCallback } from 'react';

interface OptimizedImageV2Props {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  quality?: number;
}

export const OptimizedImageV2: React.FC<OptimizedImageV2Props> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  onLoad,
  quality = 85
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Image not available</span>
      </div>
    );
  }

  const optimizedSrc = `${src}?q=${quality}&f=auto${width ? `&w=${width}` : ''}`;

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
};
