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

  // Forçar re-render visual correto para seleção em questões estratégicas
  // Se for questão estratégica, sempre use a prop isStrategicQuestion para aplicar o efeito de seleção

  // Se for imagem e está selecionada, sempre aplica o efeito 3D, independente do device
  // (corrige casos onde o mobile não detecta corretamente ou o contexto é estratégico)
  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer bg-white",
        isImageOption && isSelected && "shadow-2xl transform scale-[1.04]",
        isImageOption && !isSelected && !isDisabled && "hover:shadow-lg",
        // Nunca borda para imagem
        !isImageOption && isSelected && "border-2 border-[#B89B7A] shadow-xl transform scale-[1.01]",
        !isImageOption && !isSelected && !isDisabled && "border border-[#B89B7A]/40",
        isDisabled && "border border-gray-200 opacity-75 cursor-not-allowed",
        type === 'text' ? "p-4" : "flex flex-col"
      )}
    >
      {type !== 'text' && option.imageUrl && (
        <div className={cn("w-full flex-1 flex items-stretch min-h-[220px] p-0")}> 
          <img 
            src={option.imageUrl} 
            alt={option.text}
            className={cn(
              "w-full h-[260px] object-cover rounded-t-lg",
              isSelected && "opacity-95"
            )}
            style={{ maxHeight: '260px', minHeight: '180px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
            }}
          />
        </div>
      )}
      <div className={cn(
        "flex-1 p-3 text-[#432818]",
        type !== 'text' && option.imageUrl ? "border-t border-[#B89B7A]/10 text-[10px]" : ""
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
