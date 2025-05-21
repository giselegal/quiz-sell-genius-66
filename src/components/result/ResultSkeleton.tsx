import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import OptimizedImage from '@/components/ui/optimized-image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ResultSkeletonProps {
  primaryStyle?: StyleResult;
}

const ResultSkeleton: React.FC<ResultSkeletonProps> = ({ primaryStyle }) => {
  const mainImageSrc = primaryStyle && styleConfig[primaryStyle.category]?.image;
  const [progressPercentage, setProgressPercentage] = useState(10);
  const [preloadStartTime] = useState(Date.now());
  
  // Constantes para garantir proporções consistentes em todos os breakpoints
  const IMAGE_ASPECT_RATIO = 4/5; // Proporção altura/largura (4:5)
  const BASE_WIDTH = 256; // w-64 em pixels
  const BASE_HEIGHT = Math.round(BASE_WIDTH / IMAGE_ASPECT_RATIO);

  // Simulação do progresso de carregamento baseado no tempo decorrido
  // e no pré-carregamento que já foi feito durante as questões estratégicas
  useEffect(() => {
    // Verifica se houve pré-carregamento durante questões estratégicas
    const hasPreloadedResults = localStorage.getItem('preloadedResults') === 'true';
    // Início com 10% ou 50% dependendo se houve pré-carregamento
    const startPercentage = hasPreloadedResults ? 50 : 10;
    setProgressPercentage(startPercentage);
    
    // Progresso simulado que avança mais rápido se houve pré-carregamento
    const interval = setInterval(() => {
      setProgressPercentage(prev => {
        // Simulação de progresso que desacelera próximo a 90%
        const increment = prev < 30 ? 10 : prev < 60 ? 5 : prev < 80 ? 2 : 1;
        const newValue = Math.min(90, prev + increment);
        return newValue;
      });
    }, hasPreloadedResults ? 200 : 350); // Mais rápido se pré-carregado
    
    return () => clearInterval(interval);
  }, []);

  // Calcular tempo decorrido desde o início do carregamento
  const elapsedTimeMs = Date.now() - preloadStartTime;
  const elapsedSeconds = Math.floor(elapsedTimeMs / 1000);

  return (
    <div className="min-h-screen bg-[#fffaf7] p-4 md:p-6" aria-busy="true" role="status">
      <div className="container mx-auto max-w-4xl">
        {/* Header skeleton with brand logo */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-white relative overflow-hidden" aria-busy="true" role="status">
          <div className="flex flex-col items-center gap-4 sm:gap-5">
            <LoadingSpinner size="md" color="#aa6b5d" className="mb-2" />
            <div className="w-full max-w-xs sm:max-w-md h-6 sm:h-8 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md" />
          </div>
        </Card>
        
        {/* Indicador de progresso - mostra o pré-carregamento em andamento */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-[#8F7A6A]">Carregando resultado personalizado</span>
            <span className="text-sm text-[#8F7A6A]">{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-[#F3E8E6] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] transition-all duration-300 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-[#8F7A6A]/70">
            <span>Tempo decorrido: {elapsedSeconds}s</span>
            <span>Otimizando imagens...</span>
          </div>
        </div>
        
        {/* Main content skeleton */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-10 bg-white relative overflow-hidden">
          <div className="flex flex-col gap-4 sm:gap-6 relative items-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40 animate-pulse z-0"></div>
            <div className="w-full h-6 sm:h-8 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md relative z-10" />
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-center w-full">
                {/* Placeholder de imagem para o skeleton principal, evitando carregamento de imagens pesadas */}
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[4/5] bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mx-auto" />
              </div>
            </div>
          </div>
        </Card>
        
        {/* Before-after transformation skeleton */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-10 bg-white relative overflow-hidden">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-3/4 h-6 sm:h-8 bg-gradient-to-r from-[#aa6b5d]/20 to-gray-100 animate-pulse rounded-md mx-auto mb-3 sm:mb-4" />
              <div className="w-2/3 h-3 sm:h-4 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-3 sm:mt-4">
              <div className="space-y-2">
                <div className="h-3 sm:h-4 w-14 sm:w-16 bg-gradient-to-r from-[#aa6b5d]/20 to-gray-100 animate-pulse rounded-md mx-auto" />
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-[#aa6b5d]/5 animate-pulse rounded-md" />
              </div>
              
              <div className="space-y-2">
                <div className="h-3 sm:h-4 w-14 sm:w-16 bg-gradient-to-r from-[#aa6b5d]/20 to-gray-100 animate-pulse rounded-md mx-auto" />
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-[#B89B7A]/10 animate-pulse rounded-md" />
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-3 sm:mt-4">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${i === 1 ? 'bg-[#aa6b5d]/50' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </Card>
        
        {/* Additional sections skeleton */}
        <div className="space-y-6 sm:space-y-8">
          {[1, 2].map(i => (
            <Card key={i} className="p-4 sm:p-6 bg-white">
              <div className="w-full h-6 sm:h-8 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md mb-4 sm:mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3].map(j => (
                  <div key={j} className="h-24 sm:h-32 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md" />
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        {/* CTA skeleton */}
        <Card className="p-4 sm:p-6 mt-6 sm:mt-8 bg-white">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="w-full sm:w-3/4 h-6 sm:h-10 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-md" />
            <div className="w-3/4 sm:w-1/2 h-12 sm:h-16 bg-gradient-to-r from-[#4CAF50]/20 to-[#45a049]/20 animate-pulse rounded-md" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultSkeleton;
