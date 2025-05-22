import React from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { Check } from 'lucide-react';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  type: string;
  questionId: string;
  isDisabled?: boolean;
  forStrategic?: boolean; // NOVO: indica se é questão estratégica
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false,
  forStrategic = false // NOVO
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(option.id);
    }
  };

  const isImageOption = type !== 'text' && option.imageUrl;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  // Forçar re-render visual correto para seleção em questões estratégicas
  // Se for questão estratégica, sempre use a prop isStrategicQuestion para aplicar o efeito de seleção

  // Se for imagem e está selecionada, sempre aplica o efeito 3D, independente do device
  // (corrige casos onde o mobile não detecta corretamente ou o contexto é estratégico)
  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer bg-white",
        isImageOption && isSelected && "shadow-2xl",
        isImageOption && !isSelected && !isDisabled && "hover:shadow-lg",
        // Nunca borda para imagem
        // Para texto, não aplica borda no container externo
        type === 'text' ? "p-4" : "flex flex-col"
      )}
      style={{ boxShadow: !isImageOption && isSelected && forStrategic ? '0 0 0 4px #B89B7A33, 0 4px 24px #B89B7A22' : undefined }}
    >
      {type !== 'text' && option.imageUrl && (
        <div className={cn(
          "w-full flex-1 flex items-stretch min-h-[220px] p-0 relative justify-center",
          forStrategic && isSelected ? "ring-4 ring-[#FFD700] animate-pulse-border shadow-[0_0_0_6px_rgba(255,215,0,0.25),0_8px_32px_rgba(184,155,122,0.18)]" : ""
        )}> 
          <div className="w-full h-[16px]" /> {/* respiro superior */}
          <div className="relative w-full flex items-end justify-center" style={{ minHeight: '240px', height: 'auto' }}>
            <div className="relative flex items-end justify-center w-full">
              <img 
                src={option.imageUrl} 
                alt={option.text}
                className={cn(
                  "block object-contain rounded-t-lg z-20 transition-all duration-200 bg-transparent",
                  isSelected ? "scale-[1.10] shadow-2xl -translate-y-2" : "",
                  "mx-auto",
                  // Remove w-full, define largura máxima real
                  "max-h-[340px] min-h-[180px] w-[90vw] sm:w-[380px] md:w-[440px] lg:w-[520px] xl:w-[600px]"
                )}
                style={{ maxHeight: '340px', minHeight: '180px' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
                }}
              />
            </div>
            {/* Texto sempre sobreposto, centralizado, nunca atrás da imagem */}
            <div className={cn(
              "absolute bottom-0 left-0 w-full px-3 py-2 flex items-center justify-center z-30 bg-white/90 rounded-b-lg",
              isSelected && "backdrop-blur-sm"
            )}>
              <span className="text-sm sm:text-base text-[#432818] text-center font-medium leading-tight line-clamp-2 drop-shadow-sm whitespace-normal break-words w-full">
                {option.text}
              </span>
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center bg-[#B89B7A] text-white shadow-sm z-40">
                <Check className="w-2.5 h-2.5" />
              </div>
            )}
          </div>
          <div className="w-full h-[12px]" /> {/* respiro inferior */}
        </div>
      )}
      {/* Para opções de texto puro, só a moldura interna */}
      {(!option.imageUrl || type === 'text') && (
        <div className={cn(
          "flex-1 p-3 text-[#432818] relative bg-white",
          isSelected && !forStrategic && "border-2 border-[#B89B7A] shadow-xl",
          isSelected && forStrategic && "border-2 border-[#B89B7A] shadow-2xl animate-pulse-border ring-2 ring-[#B89B7A]/60",
          !isSelected && "border border-[#B89B7A]/40"
        )}>
          <p>{option.text}</p>
          {isSelected && (
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center bg-[#B89B7A] text-white shadow-sm">
              <Check className="w-2.5 h-2.5" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizOption;
