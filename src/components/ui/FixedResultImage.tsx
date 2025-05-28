
"use client";

import React, { useState } from 'react';

interface FixedResultImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
}

function getHighQualityUrl(url: string): string {
  if (!url) return url;
  
  if (!url.includes('cloudinary.com') && !url.includes('res.cloudinary.com')) {
    return url;
  }
  
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;
  
  const baseUrl = parts[0] + '/upload/';
  let pathAndQuery = parts[1];
  
  pathAndQuery = pathAndQuery.replace(/[,/]e_blur:[0-9]+/g, '');
  
  const versionMatch = pathAndQuery.match(/^(v\d+)\//);
  let version = '';
  let finalPath = pathAndQuery;
  
  if (versionMatch) {
    version = versionMatch[1] + '/';
    finalPath = pathAndQuery.substring(version.length);
  }
  
  const transforms = [
    'f_auto',
    'q_85',
    'dpr_auto',
    'e_sharpen:40'
  ].join(',');
  
  return `${baseUrl}${version}${transforms}/${finalPath}`;
}

const FixedResultImage: React.FC<FixedResultImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  containerClassName = '',
  priority = false,
  objectFit = 'cover',
  onLoad
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const highQualitySrc = getHighQualityUrl(src);
  const aspectRatio = height / width;
  const paddingBottom = `${aspectRatio * 100}%`;
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${containerClassName}`}
      style={{ paddingBottom }}
    >
      <img
        src={highQualitySrc}
        alt={alt}
        width={width}
        height={height}
        className={`absolute inset-0 w-full h-full object-${objectFit} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default FixedResultImage;
