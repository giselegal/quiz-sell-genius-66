import React from 'react';

interface SecondaryStyle {
  category: string;
  percentage: number;
}

interface SecondaryStylesSectionProps {
  secondaryStyles: SecondaryStyle[];
}

const SecondaryStylesSection: React.FC<SecondaryStylesSectionProps> = ({ secondaryStyles }) => {
  if (!secondaryStyles || secondaryStyles.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-[#8F7A6A] text-sm">Nenhum estilo secundário identificado</p>
      </div>
    );
  }

  // Ordenar por porcentagem e pegar apenas os top 3
  const topSecondaryStyles = secondaryStyles
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  return (
    <div className="space-y-3">
      {topSecondaryStyles.map((style, index) => (
        <div 
          key={style.category}
          className="group transition-all duration-300 hover:scale-[1.02]"
        >
          {/* Header com nome e porcentagem */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {/* Ranking badge */}
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-300 group-hover:scale-110 ${
                index === 0 ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]' :
                index === 1 ? 'bg-gradient-to-r from-[#aa6b5d] to-[#8F5A4D]' :
                'bg-gradient-to-r from-[#8F7A6A] to-[#6B6B6B]'
              }`}>
                {index + 2}
              </div>
              
              {/* Nome do estilo */}
              <h4 className="font-medium text-[#432818] text-sm group-hover:text-[#aa6b5d] transition-colors">
                {style.category}
              </h4>
            </div>
            
            {/* Porcentagem */}
            <span className="text-xs font-semibold text-[#aa6b5d] bg-[#fff7f3] px-2 py-1 rounded-full border border-[#B89B7A]/20 group-hover:bg-[#aa6b5d] group-hover:text-white transition-all duration-300">
              {style.percentage}%
            </span>
          </div>
          
          {/* Barra de progresso otimizada */}
          <div className="relative">
            <div className="w-full h-2 bg-[#F5F2EC] rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-700 ease-out group-hover:shadow-sm ${
                  index === 0 ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]' :
                  index === 1 ? 'bg-gradient-to-r from-[#aa6b5d] to-[#8F5A4D]' :
                  'bg-gradient-to-r from-[#8F7A6A] to-[#6B6B6B]'
                }`}
                style={{ 
                  width: `${style.percentage}%`,
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                  animation: `fillProgress-${index} 0.8s ease-out ${index * 0.2}s forwards`
                }}
              />
            </div>
            
            {/* Indicador de destaque para o primeiro */}
            {index === 0 && style.percentage > 15 && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#aa6b5d] rounded-full animate-pulse shadow-sm" />
            )}
          </div>
        </div>
      ))}
      
      {/* Nota explicativa */}
      <div className="mt-4 p-3 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg border border-[#B89B7A]/10">
        <p className="text-xs text-[#8F7A6A] leading-relaxed text-center">
          <span className="font-medium text-[#aa6b5d]">Dica:</span> Estes estilos complementam seu estilo principal e podem ser incorporados em ocasiões específicas ou para criar looks mais versáteis.
        </p>
      </div>

      {/* Animações CSS */}
      <style jsx>{`
        @keyframes fillProgress-0 {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fillProgress-1 {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fillProgress-2 {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default SecondaryStylesSection;
