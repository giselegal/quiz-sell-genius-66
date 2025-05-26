"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { optimizeCloudinaryUrl } from '@/utils/imageManager';
interface OptimizedImageV2Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
  placeholder?: string;
}
const OptimizedImageV2: React.FC<OptimizedImageV2Props> = ({
  src,
  alt,
  width = 400,
  height = 300,
  quality = 75,
  className = '',
  placeholder
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
    img.onerror = () => {
      setError(true);
  }, [src]);
  const optimizedSrc = useMemo(() => {
    if (!src) return '';
    
    // Use optimizeCloudinaryUrl with correct single parameter
    return optimizeCloudinaryUrl(src, { quality, width, height });
  }, [src, width, height, quality]);
  if (error) {
    return <div className="text-red-500">Failed to load image</div>;
  }
  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        objectFit: 'cover',
        backgroundColor: placeholder || '#f2f2f2',
      }}
    />
  );
};
export default OptimizedImageV2;
