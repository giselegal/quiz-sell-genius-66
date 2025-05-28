import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingFallbackProps {
  message?: string;
  className?: string;
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = "Carregando...", 
  className 
}) => {
  return (
    <div className={cn(
      "flex h-screen w-full items-center justify-center bg-gradient-to-b from-white to-gray-50",
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner otimizado */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#B89B7A]/20 border-t-[#B89B7A] rounded-full animate-spin" />
        </div>
        
        {/* Mensagem de loading */}
        <p className="text-[#432818] font-medium text-center animate-pulse">
          {message}
        </p>
        
        {/* Barra de progresso indeterminada */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#B89B7A] animate-loading-bar" />
        </div>
      </div>
    </div>
  );
};
