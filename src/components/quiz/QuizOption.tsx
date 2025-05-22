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
        isImageOption && isSelected && forStrategic && "shadow-2xl animate-enhanced-pulse",
        isImageOption && !isSelected && !isDisabled && "hover:shadow-lg",

        // Efeitos para opções apenas de texto
        !isImageOption && isSelected && !forStrategic && "shadow-xl transform scale-[1.01] border border-[#B89B7A]/40",
        !isImageOption && isSelected && forStrategic && "shadow-2xl shadow-[#FFD700]/30 animate-enhanced-pulse transform scale-[1.01] border border-[#B89B7A]/40",
        !isImageOption && !isSelected && !isDisabled && "border border-[#B89B7A]/40 hover:shadow-md",

        isDisabled && "border border-gray-200 opacity-75 cursor-not-allowed",
        type === 'text' ? "p-4" : "flex flex-col"
      )}
    >
      {/* Check único DEVE vir PRIMEIRO - posicionado sobre tudo */}
      {isSelected && (
        <div 
          className={cn(
            "absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white",
            forStrategic ? "bg-[#FFD700] animate-enhanced-pulse" : "bg-[#B89B7A]"
          )}
          style={{ zIndex: 9999 }}
        >
          <Check className="w-3 h-3 stroke-2" />
        </div>
      )}

      {type !== 'text' && option.imageUrl && (
        <div className="w-full flex-1 flex items-stretch min-h-[220px] p-0 relative gap-2">
          <img
            src={option.imageUrl}
            alt={option.text}
            className={cn(
              "w-full h-[260px] object-cover rounded-t-lg transition-all duration-200",
              isSelected && "scale-[1.04] shadow-2xl",
              !isSelected && "hover:scale-[1.02] hover:shadow-lg"
            )}
            style={{ maxHeight: '260px', minHeight: '180px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
            }}
          />
          <div className="absolute bottom-0 left-0 w-full bg-white/80 px-2 py-1 rounded-b-lg flex items-center justify-center transition-all duration-200">
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

      {/* Definição da animação enhanced-pulse */}
      <style jsx>{`
        @keyframes enhanced-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(179, 137, 49, 0.7);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
            box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
          }
        }
        .animate-enhanced-pulse {
          animation: enhanced-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default QuizOption;
