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

  let optionClasses = "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer bg-white";

  if (isDisabled) {
    optionClasses = cn(optionClasses, "border border-gray-200 opacity-75 cursor-not-allowed");
  } else if (isSelected) {
    if (isImageOption) {
      optionClasses = cn(optionClasses, "shadow-xl transform scale-[1.02]"); // Imagem selecionada: Efeito 3D
    } else {
      optionClasses = cn(optionClasses, "border-2 border-[#B89B7A] shadow-lg transform scale-[1.01]"); // Texto selecionado: Borda dourada forte
    }
  } else { // Não selecionado e não desabilitado
    if (isImageOption) {
      optionClasses = cn(optionClasses, "border border-transparent hover:border-[#B89B7A]/60 hover:shadow-md"); // Imagem não selecionada
    } else {
      optionClasses = cn(optionClasses, "border border-[#B89B7A]/40 hover:border-[#B89B7A]/80 hover:shadow-sm"); // Texto não selecionado
    }
  }

  if (type === 'text') {
    optionClasses = cn(optionClasses, "p-4");
  } else {
    optionClasses = cn(optionClasses, "flex flex-col");
  }

  return (
    <div
      onClick={handleClick}
      className={optionClasses}
    >
      {type !== 'text' && option.imageUrl && (
        <div className="w-full">
          <img 
            src={option.imageUrl} 
            alt={option.text}
            className={cn(
              "w-full object-contain rounded-t-lg", // Alterado de object-cover para object-contain
              isSelected && "opacity-95"
            )}
            style={{ height: '180px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
            }}
          />
        </div>
      )}
      
      <div className={cn(
        "flex-1 p-3 text-[#432818]",
        type !== 'text' && option.imageUrl ? "border-t border-[#B89B7A]/10 text-sm" : ""
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
