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

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer bg-white",
        // Base para todos os não desabilitados
        !isDisabled && (isImageOption ? "hover:shadow-md" : "hover:border-[#B89B7A]/80 hover:shadow-sm"),

        // Estilos quando SELECIONADO
        isSelected && isImageOption && "border-2 border-[#B89B7A] shadow-xl transform scale-[1.02]", // Imagem selecionada: Borda dourada forte + 3D
        isSelected && !isImageOption && "border-2 border-[#B89B7A] shadow-xl transform scale-[1.01]", // Texto selecionado: Borda dourada forte + sombra

        // Estilos quando NÃO SELECIONADO e NÃO DESABILITADO
        !isSelected && !isDisabled && isImageOption && "border border-transparent", // Imagem não selecionada: Borda transparente
        !isSelected && !isDisabled && !isImageOption && "border border-[#B89B7A]/40", // Texto não selecionado: Borda dourada sutil
        
        // Estilos quando DESABILITADO
        isDisabled && "border border-gray-200 opacity-75 cursor-not-allowed",
        
        type === 'text' ? "p-4" : "flex flex-col"
      )}
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
