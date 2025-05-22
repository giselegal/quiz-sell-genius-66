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
  forStrategic?: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false,
  forStrategic = false
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
        // Efeitos para opções com imagem
        isImageOption && isSelected && !forStrategic && "shadow-2xl", 
        isImageOption && isSelected && forStrategic && "shadow-2xl strategic-element",
        isImageOption && !isSelected && !isDisabled && "hover:shadow-lg",

        // Efeitos para opções apenas de texto
        !isImageOption && isSelected && !forStrategic && "shadow-xl transform scale-[1.01] border border-[#B89B7A]/40",
        !isImageOption && isSelected && forStrategic && "shadow-2xl shadow-[#FFD700]/30 strategic-element transform scale-[1.01] border border-[#B89B7A]/40",
        !isImageOption && !isSelected && !isDisabled && "border border-[#B89B7A]/40 hover:shadow-md",

        isDisabled && "border border-gray-200 opacity-75 cursor-not-allowed",
        type === 'text' ? "p-4" : "flex flex-col"
      )}
      data-strategic={forStrategic ? `${questionId}-${option.id}` : ""}
    >
      {type !== 'text' && option.imageUrl && (
        <div className="w-full flex-1 flex items-stretch min-h-[220px] p-0 relative gap-2">
          <img
            src={option.imageUrl}
            alt={option.text}
            className={cn(
              "w-full h-[260px] object-cover rounded-t-lg transition-all duration-200",
              // Aumentar z-index e escala quando selecionado para sobressair ao texto
              isSelected && "scale-[1.04] shadow-2xl z-[60]",
              !isSelected && "hover:scale-[1.02] hover:shadow-lg z-10"
            )}
            style={{ maxHeight: '260px', minHeight: '180px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
            }}
          />
          <div className={cn(
            "absolute bottom-0 left-0 w-full bg-white/80 px-2 py-1 rounded-b-lg flex items-center justify-center transition-all duration-200 z-[50]",
            // Diminuir opacidade quando selecionado para destacar a imagem
            isSelected && "opacity-85"
          )}>
            <span className="text-[10px] text-[#432818] text-center font-medium leading-tight">
              {option.text}
            </span>
          </div>
        </div>
      )}

      {(!option.imageUrl || type === 'text') && (
        <div className="flex-1 p-3 text-[#432818] relative bg-white transition-shadow duration-200">
          <span className="block w-full text-base sm:text-lg font-semibold text-[#432818] text-center break-words leading-tight">
            {option.text}
          </span>
        </div>
      )}

      {/* Check pequeno e elegante para opções normais */}
      {isSelected && !forStrategic && (
        <div 
          className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white shadow-sm border border-white bg-[#B89B7A]"
          style={{ zIndex: 100 }}
        >
          <Check className="w-2.5 h-2.5" />
        </div>
      )}

      {/* Abordagem COMPLETAMENTE DIFERENTE para questões estratégicas */}
      {forStrategic && (
        <div 
          className={cn(
            "absolute top-0 right-0 left-0 bottom-0 rounded-lg",
            isSelected 
              ? "border-2 border-[#B89B7A] bg-[#B89B7A]/10" 
              : "border border-dashed border-[#B89B7A]/30"
          )}
          style={{ zIndex: 20 }}
        >
          {/* Indicador de seleção para questões estratégicas */}
          {isSelected && (
            <div className="absolute top-0 right-0 w-auto h-auto py-1 px-2 bg-[#B89B7A] rounded-bl-md text-white text-xs font-medium">
              Selecionado
            </div>
          )}
        </div>
      )}

      {/* Remover todos os outros elementos de estilo para questões estratégicas */}
    </div>
  );
};

export default QuizOption;
