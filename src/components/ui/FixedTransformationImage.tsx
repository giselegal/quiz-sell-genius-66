
import React from 'react';
import OptimizedImageV2 from './optimized-image-v2';

interface FixedTransformationImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

/**
 * FixedTransformationImage - Componente específico para exibição de imagens de transformação
 * com configurações já otimizadas para esse caso de uso
 */
export const FixedTransformationImage: React.FC<FixedTransformationImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false
}) => {
  return (
    <OptimizedImageV2
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      quality={90} // Qualidade específica para transformações
      placeholder="#f8f5f2" // Cor de fundo que combina com interface
    />
  );
};
