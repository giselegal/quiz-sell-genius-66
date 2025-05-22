import React, { memo } from 'react';

// Tipo para componentes que podem se beneficiar de memo
interface MemoizedComponentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onlyUpdateOn?: any[]; // Valores que, quando alterados, devem causar re-renderização
}

/**
 * Componente otimizado que só renderiza novamente quando suas props específicas mudam
 * Útil para componentes pesados que não precisam renderizar frequentemente
 */
const OptimizedRender: React.FC<MemoizedComponentProps> = memo(
  ({ children, className, style }) => {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Se onlyUpdateOn for fornecido, comparamos apenas esses valores
    if (prevProps.onlyUpdateOn && nextProps.onlyUpdateOn) {
      return JSON.stringify(prevProps.onlyUpdateOn) === JSON.stringify(nextProps.onlyUpdateOn);
    }
    
    // Se não for fornecido, comparamos todas as props
    return (
      prevProps.className === nextProps.className &&
      JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style) &&
      prevProps.children === nextProps.children
    );
  }
);

OptimizedRender.displayName = 'OptimizedRender';

export { OptimizedRender };

/**
 * Componente otimizado que usa will-change apenas quando necessário
 * Evita problemas de performance por uso excessivo de will-change
 */
interface HardwareAcceleratedProps {
  children: React.ReactNode;
  className?: string;
  accelerate: boolean; // Ativar aceleração por hardware quando true
  property?: 'transform' | 'opacity' | 'filter' | 'all'; // Propriedade a ser acelerada
  style?: React.CSSProperties;
}

const HardwareAccelerated: React.FC<HardwareAcceleratedProps> = memo(
  ({ children, className, accelerate, property = 'transform', style = {} }) => {
    const willChangeStyle: React.CSSProperties = accelerate
      ? {
          ...style,
          willChange: property,
          transform: 'translateZ(0)', // Força aceleração de GPU
          backfaceVisibility: 'hidden' as 'hidden',
        }
      : style;

    return (
      <div className={className} style={willChangeStyle}>
        {children}
      </div>
    );
  }
);

HardwareAccelerated.displayName = 'HardwareAccelerated';

export { HardwareAccelerated };

/**
 * Wrapper para imagens que implementa lazy loading e placeholders otimizados
 */
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderColor?: string;
  lazy?: boolean;
  priority?: 'high' | 'low' | 'auto';
}

const OptimizedImage: React.FC<OptimizedImageProps> = memo(({
  src,
  alt,
  width,
  height,
  className,
  placeholderColor = '#f4f1ea',
  lazy = true,
  priority = 'auto'
}) => {
  // Determinar loading com base nas props
  const loadingStrategy = priority === 'high' 
    ? 'eager' 
    : lazy ? 'lazy' : 'eager';
  
  // Determinar fetchPriority
  const fetchPriorityValue = priority === 'high' 
    ? 'high' 
    : priority === 'low' ? 'low' : 'auto';
  
  return (
    <div 
      className={`relative overflow-hidden ${className || ''}`}
      style={{ 
        backgroundColor: placeholderColor,
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto'
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loadingStrategy}
        decoding="async"
        fetchPriority={fetchPriorityValue}
        className="w-full h-full object-cover"
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage };

// Exportar todos os componentes otimizados
export default {
  OptimizedRender,
  HardwareAccelerated,
  OptimizedImage
};
