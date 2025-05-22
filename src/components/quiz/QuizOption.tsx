
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
  isStrategicOption?: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false,
  isStrategicOption = false
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onSelect(option.id);
    }
  };

  if (isStrategicOption) {
    return (
      <div
        onClick={handleClick}
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-200 cursor-pointer bg-white border-2",
          isSelected 
            ? "border-[#B89B7A] shadow-lg transform scale-[1.02]" 
            : isDisabled 
              ? "border-gray-200 opacity-60 cursor-not-allowed" 
              : "border-gray-200 hover:border-[#B89B7A]/60 hover:shadow-md",
          "p-4 md:p-5 flex items-start"
        )}
      >
        <div className={cn(
          "min-w-5 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 border-2",
          isSelected 
            ? "bg-[#B89B7A] border-[#B89B7A]" 
            : "border-gray-300"
        )}>
          {isSelected && <Check className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={3} />}
        </div>
        
        <div className="flex-grow">
          <p className="text-[#432818] text-base md:text-lg font-medium">{option.text}</p>
        </div>
      </div>
    );
  }

  // Original QuizOption rendering for non-strategic questions
  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer bg-white",
        isSelected 
          ? "border-2 border-[#B89B7A] shadow-lg transform scale-[1.01]" 
          : isDisabled 
            ? "border-2 border-transparent opacity-75 cursor-not-allowed" 
            : "border-2 border-transparent hover:border-[#B89B7A]/60 hover:shadow-md hover:scale-[1.005]",
        type === 'text' ? "p-4" : "flex flex-col"
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
        type !== 'text' && option.imageUrl ? "border-t border-[#B89B7A]/10" : ""
      )}>
        <p>{option.text}</p>
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center bg-[#B89B7A] text-white shadow-sm">
          <Check className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default QuizOption;
