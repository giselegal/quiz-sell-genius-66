import React, { memo } from 'react';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';

interface OptimizedLoadingProps {
  message?: string;
  showLogo?: boolean;
  size?: 'sm' | 'md' | 'lg';
  minimal?: boolean;
}

// Componente de loading ultra-otimizado
export const OptimizedLoading = memo<OptimizedLoadingProps>(({ 
  message = 'Carregando...', 
  showLogo = true,
  size = 'md',
  minimal = false
}) => {
  const isLowPerformance = useIsLowPerformanceDevice();
  
  // Para dispositivos de baixo desempenho, usar loading minimal
  if (isLowPerformance || minimal) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#B89B7A] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    );
  }

  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10', 
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#FEFEFE]">
      {showLogo && (
        <div className="mb-6">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
            alt="Logo"
            width={112}
            height={56}
            loading="eager"
            decoding="sync"
            className="w-28 h-auto"
          />
        </div>
      )}
      
      <div className="relative">
        {/* Spinner otimizado com transform3d para GPU acceleration */}
        <div 
          className={`${sizes[size]} border-4 border-[#B89B7A]/20 border-t-[#B89B7A] rounded-full`}
          style={{
            animation: 'spin 1s linear infinite',
            transform: 'translateZ(0)', // Force GPU layer
            willChange: 'transform'
          }}
        />
        
        {/* Progress indicator simplificado */}
        <div className="mt-4 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#B89B7A] rounded-full animate-pulse"
            style={{ width: '60%' }}
          />
        </div>
      </div>
      
      <p className="mt-4 text-[#432818] font-medium text-center">{message}</p>
    </div>
  );
});

OptimizedLoading.displayName = 'OptimizedLoading';

// CSS-only spinner para casos extremos de performance
export const MinimalSpinner = memo(() => (
  <div className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
));

MinimalSpinner.displayName = 'MinimalSpinner';
