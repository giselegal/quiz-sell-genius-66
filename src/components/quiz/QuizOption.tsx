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

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer bg-white",
        // Efeitos para opções com imagem
        isImageOption && isSelected && !forStrategic && "shadow-2xl", // Sombra no container para pop-out
        isImageOption && isSelected && forStrategic && "shadow-2xl animate-enhanced-pulse", // Sombra e pulso no container para estratégico
        isImageOption && !isSelected && !isDisabled && "hover:shadow-lg",

        // Efeitos para opções apenas de texto
        !isImageOption && isSelected && !forStrategic && "shadow-xl transform scale-[1.01] border border-[#B89B7A]/40", // Mantém borda original, adiciona sombra e escala
        !isImageOption && isSelected && forStrategic && "shadow-2xl shadow-[#FFD700]/30 animate-enhanced-pulse transform scale-[1.01] border border-[#B89B7A]/40", // Mantém borda original, adiciona sombra estratégica, pulso e escala
        !isImageOption && !isSelected && !isDisabled && "border border-[#B89B7A]/40 hover:shadow-md", // Borda original e sombra no hover

        isDisabled && "border border-gray-200 opacity-75 cursor-not-allowed",
        type === 'text' ? "p-4" : "flex flex-col"
      )}
    >
      {type !== 'text' && option.imageUrl && (
        <div className={cn(
          "w-full flex-1 flex items-stretch min-h-[220px] p-0 relative gap-2 z-10" // Adicionado z-10
          // Classes de container para imagem estratégica movidas para o div principal
        )}>
          <img
            src={option.imageUrl}
            alt={option.text}
            className={cn(
              "w-full h-[260px] object-cover rounded-t-lg transition-all duration-200",
              isSelected && "scale-[1.04] shadow-2xl z-50", // Efeito pop-out com z-index aumentado para 50
              !isSelected && "hover:scale-[1.02] hover:shadow-lg z-10" // z-index normal
            )}
            style={{ maxHeight: '260px', minHeight: '180px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
            }}
          />
          {/* Texto sobreposto na base da imagem, com fundo translúcido e z-40 para garantir visibilidade */}
          <div className={cn(
            "absolute bottom-0 left-0 w-full bg-white/80 px-2 py-1 rounded-b-lg flex items-center justify-center transition-all duration-200 z-40"
            // Removido: isSelected && "opacity-70" para manter visibilidade do texto
          )}>
            <span className="text-[10px] text-[#432818] text-center font-medium leading-tight">
              {option.text}
            </span>
          </div>
          {isSelected && (
            <div className="absolute top-[2px] right-[2px] w-3.5 h-3.5 rounded-full flex items-center justify-center bg-[#B89B7A] text-white shadow-sm z-60"> {/* Posicionado na extremidade e menor */}
              <Check className="w-2 h-2" /> {/* Ícone Check menor */}
            </div>
          )}
        </div>
      )}
      {/* Para opções de texto puro, mantém layout anterior mas ativa só sombra na seleção */}
      {(!option.imageUrl || type === 'text') && (
        <div className={cn(
          "flex-1 p-3 text-[#432818] relative bg-white transition-shadow duration-200 z-10" // Adicionado z-10
        )}>
          <span className="block w-full text-base sm:text-lg font-semibold text-[#432818] text-center break-words leading-tight z-30 relative">
            {option.text}
          </span>
          {isSelected && (
            <div className="absolute top-[2px] right-[2px] w-3.5 h-3.5 rounded-full flex items-center justify-center bg-[#B89B7A] text-white shadow-sm z-60"> {/* Posicionado na extremidade e menor */}
              <Check className="w-2 h-2" /> {/* Ícone Check menor */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizOption;
