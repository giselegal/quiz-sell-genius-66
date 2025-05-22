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

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer bg-white",
        // Estilos quando selecionado
        isSelected
          ? (type !== 'text' && option.imageUrl
              ? "shadow-xl transform scale-[1.02]" // Imagem selecionada: efeito 3D, SEM borda explícita aqui
              : "border-2 border-[#B89B7A] shadow-lg transform scale-[1.01]") // Texto selecionado: borda dourada forte
          // Estilos quando NÃO selecionado
          : (isDisabled
              ? "border border-gray-200 opacity-75 cursor-not-allowed" // Desabilitado: borda cinza sutil
              : (type === 'text' || !option.imageUrl // Aplica à texto ou imagem sem URL (considerado como texto)
                  ? "border border-[#B89B7A]/40 hover:border-[#B89B7A]/80 hover:shadow-md" // Texto não selecionado: borda dourada sutil, mais forte no hover
                  : "border border-transparent hover:border-[#B89B7A]/60 hover:shadow-md") // Imagem com URL não selecionada: borda transparente, aparece no hover
            ),
        type === 'text' ? "p-4" : "flex flex-col" // Padding ou flex dependendo do tipo
      )}
    >
      {type !== 'text' && option.imageUrl && (
        <div className="w-full">
          <img 
            src={option.imageUrl} 
            alt={option.text}
            className={cn(
              "w-full object-cover rounded-t-lg",
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
