
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
  onLoad,
  onError,
  style
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  if (imageError) {
    return (
      <div 
        className={cn("bg-gray-200 flex items-center justify-center", className)}
        style={{ width, height, ...style }}
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default ProgressiveImage;
