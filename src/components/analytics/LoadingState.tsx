
import React from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Carregando...",
  fullScreen = false,
  size = "md",
  className = ""
}) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    : "flex items-center justify-center p-8";

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <LoadingSpinner size={size} />
        </div>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
};
