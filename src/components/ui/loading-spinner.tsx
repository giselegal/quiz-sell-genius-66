
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  thickness?: 'thin' | 'normal' | 'thick';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = '#B89B7A',
  className = '',
  thickness = 'normal'
}) => {
  const sizeMap = {
    xs: 'w-2 h-2',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };
  
  const thicknessMap = {
    thin: 'border-2',
    normal: 'border-3',
    thick: 'border-[5px]'
  };
  
  const sizeClass = sizeMap[size] || sizeMap.md;
  const thicknessClass = thicknessMap[thickness] || thicknessMap.normal;
  
  return (
    <div className={`flex justify-center items-center ${className}`} role="status" aria-label="Loading">
      <div
        className={`${sizeClass} ${thicknessClass} rounded-full elegant-spinner`}
        style={{
          borderColor: `${color} transparent transparent transparent`,
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
};
