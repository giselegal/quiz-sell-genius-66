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
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(option.id);
    }
  };

  const isImageOption = type !== 'text' && option.imageUrl;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer bg-white",
        // MOBILE: Efeito 3D SELECIONADO para imagem
        isImageOption && isSelected && isMobile && "shadow-2xl transform scale-[1.04]",
        // MOBILE: Sombra leve no hover para imagem não selecionada
        isImageOption && !isSelected && !isDisabled && isMobile && "hover:shadow-lg",
        // MOBILE: NUNCA borda para imagem
        // DESKTOP: Mantém padrão anterior (sem borda, mas sem efeito especial)
        // Texto selecionado: borda dourada forte + sombra
        !isImageOption && isSelected && "border-2 border-[#B89B7A] shadow-xl transform scale-[1.01]",
        // Texto não selecionado: borda dourada sutil
        !isImageOption && !isSelected && !isDisabled && "border border-[#B89B7A]/40",
        // Desabilitado
        isDisabled && "border border-gray-200 opacity-75 cursor-not-allowed",
        type === 'text' ? "p-4" : "flex flex-col"
      )}
    >
      {type !== 'text' && option.imageUrl && (
        <div className={cn("w-full flex-1 flex items-stretch", isMobile && "min-h-[220px]")}> 
          <img 
            src={option.imageUrl} 
            alt={option.text}
            className={cn(
              "w-full h-full object-contain rounded-t-lg",
              isSelected && isMobile && "opacity-95"
            )}
            style={isMobile ? { height: '220px', maxHeight: '260px' } : {}} 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
            }}
          />
        </div>
      )}
      <div className={cn(
        "flex-1 p-3 text-[#432818]",
        type !== 'text' && option.imageUrl && isMobile ? "border-t border-[#B89B7A]/10 text-[10px]" : ""
      )}>
        <p>{option.text}</p>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center bg-[#B89B7A] text-white shadow-sm">
          <Check className="w-3 h-3" />
        </div>
      )}
    </div>
  );
};

export default QuizOption;
