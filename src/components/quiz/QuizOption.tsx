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
        !isImageOption && isSelected && !forStrategic && "border-2 border-[#B89B7A] shadow-xl transform scale-[1.01]",
        !isImageOption && isSelected && forStrategic && "border-2 border-[#B89B7A] shadow-2xl animate-pulse-border ring-2 ring-[#B89B7A]/60",
        !isImageOption && !isSelected && !isDisabled && "border border-[#B89B7A]/40",
        isDisabled && "border border-gray-200 opacity-75 cursor-not-allowed",
        type === 'text' ? "p-4" : "flex flex-col"
      )}
      style={{ boxShadow: !isImageOption && isSelected && forStrategic ? '0 0 0 4px #B89B7A33, 0 4px 24px #B89B7A22' : undefined }}
    >
      {type !== 'text' && option.imageUrl && (
        <div className={cn("w-full flex-1 flex items-stretch min-h-[220px] p-0 relative")}> 
          <div className="w-full h-[12px]" /> {/* respiro superior */}
          <img 
            src={option.imageUrl} 
            alt={option.text}
            className={cn(
              "w-full h-[260px] object-cover rounded-t-lg z-20 transition-all duration-200",
              isSelected ? "scale-[1.04] shadow-2xl" : "",
              "mx-auto"
            )}
            style={{ maxHeight: '260px', minHeight: '180px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
            }}
          />
          <div className="w-full h-[8px]" /> {/* respiro inferior */}
          {/* Texto sobreposto na base da imagem, com fundo translúcido */}
          <div className={cn(
            "absolute bottom-0 left-0 w-full bg-white/80 px-2 py-1 rounded-b-lg flex items-center justify-center transition-all duration-200 z-20",
            isSelected && "opacity-70"
          )}>
            <span className="text-[10px] text-[#432818] text-center font-medium leading-tight">{option.text}</span>
          </div>
          {isSelected && (
            <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center bg-[#B89B7A] text-white shadow-sm z-40">
              <Check className="w-2.5 h-2.5" />
            </div>
          )}
        </div>
      )}
      {/* Para opções de texto puro, mantém layout anterior mas ativa só sombra na seleção */}
      {(!option.imageUrl || type === 'text') && (
        <div className={cn(
          "flex-1 p-3 text-[#432818] relative bg-white",
          isSelected && !forStrategic && "border-2 border-[#B89B7A] shadow-xl transform scale-[1.01]",
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
