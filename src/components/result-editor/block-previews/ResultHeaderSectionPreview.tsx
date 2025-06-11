
import React from 'react';
import { ResultHeaderBlockContent } from '@/types/resultPageBlocks';

interface ResultHeaderSectionPreviewProps {
  content: ResultHeaderBlockContent;
}

export const ResultHeaderSectionPreview: React.FC<ResultHeaderSectionPreviewProps> = ({
  content
}) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#FAF9F7] via-[#F5F3F0] to-[#F0EDE8] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#B89B7A]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#8F7A6A]/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#D4C5B9]/30 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          {content.userName && (
            <div className="mb-8 animate-fade-in">
              <p className="text-xl lg:text-2xl font-medium text-[#8F7A6A] mb-2">
                Olá, {content.userName}! 👋
              </p>
              <p className="text-[#8F7A6A]">
                Finalizamos a análise do seu perfil de estilo
              </p>
            </div>
          )}

          {/* Main title */}
          <div className="mb-12 animate-fade-in animation-delay-200">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold mb-6 text-[#432818] leading-tight">
              Seu Estilo Predominante é
            </h1>
            
            {/* Style badge */}
            <div className="inline-block bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] text-white px-8 py-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 mb-8">
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-playfair font-bold">
                {content.primaryStyle?.category || 'Natural'}
              </h2>
              {content.showPersonalization && (
                <p className="text-xl lg:text-2xl mt-2 opacity-90">
                  {content.primaryStyle?.percentage || 85}% de compatibilidade
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-12 animate-fade-in animation-delay-400">
            <p className="text-lg lg:text-xl text-[#8F7A6A] leading-relaxed max-w-3xl mx-auto">
              Baseado nas suas respostas, identificamos que você tem uma forte conexão com o estilo{' '}
              <span className="font-semibold text-[#432818]">
                {content.primaryStyle?.category || 'Natural'}
              </span>
              . Este resultado foi calculado através de uma análise detalhada das suas preferências e personalidade.
            </p>
          </div>

          {/* Secondary styles */}
          {content.showSecondaryStyles && content.secondaryStyles && content.secondaryStyles.length > 0 && (
            <div className="animate-fade-in animation-delay-600">
              <h3 className="text-2xl lg:text-3xl font-playfair font-semibold text-[#432818] mb-8">
                Estilos Secundários
              </h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {content.secondaryStyles.map((style, index) => (
                  <div 
                    key={index} 
                    className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl border border-[#B89B7A]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <span className="font-semibold text-[#432818] text-lg">{style.category}</span>
                    <span className="text-[#8F7A6A] ml-3 text-sm">{style.percentage}%</span>
                  </div>
                ))}
              </div>
              <p className="text-[#8F7A6A] mt-6 max-w-2xl mx-auto">
                Estes são estilos que também fazem parte da sua personalidade e podem ser incorporados ao seu visual para criar looks únicos e versáteis.
              </p>
            </div>
          )}

          {/* Call to action hint */}
          <div className="mt-16 animate-fade-in animation-delay-800">
            <div className="inline-flex items-center gap-2 text-[#8F7A6A] bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-[#B89B7A]/20">
              <span className="w-2 h-2 bg-[#B89B7A] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Continue rolando para descobrir como transformar seu estilo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
};
