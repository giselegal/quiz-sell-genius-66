
import React, { useState, useEffect } from 'react';
import { QuizQuestion as QuizQuestionType, UserResponse } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  showQuestionImage?: boolean;
  autoAdvance?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  canProceed?: boolean;
  showNavigationButtons?: boolean;
  isStrategicQuestion?: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  showQuestionImage = true,
  autoAdvance = true,
  onNext,
  onPrevious,
  canProceed = false,
  showNavigationButtons = false,
  isStrategicQuestion = false
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(currentAnswers);
  const [hasAutoAdvanced, setHasAutoAdvanced] = useState(false);

  useEffect(() => {
    setSelectedOptions(currentAnswers);
    setHasAutoAdvanced(false);
  }, [question.id, currentAnswers]);

  const handleOptionClick = (optionId: string) => {
    let newSelection: string[];
    
    if (selectedOptions.includes(optionId)) {
      newSelection = selectedOptions.filter(id => id !== optionId);
    } else {
      if (selectedOptions.length >= question.multiSelect) {
        newSelection = [...selectedOptions.slice(1), optionId];
      } else {
        newSelection = [...selectedOptions, optionId];
      }
    }

    setSelectedOptions(newSelection);
    
    const response: UserResponse = {
      questionId: question.id,
      selectedOptions: newSelection
    };
    
    onAnswer(response);

    // Auto advance if enabled and we have enough selections
    if (autoAdvance && newSelection.length === question.multiSelect && !hasAutoAdvanced) {
      setHasAutoAdvanced(true);
      setTimeout(() => {
        onNext?.();
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Question Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#432818] mb-4 leading-tight">
          {question.title}
        </h2>
        
        {question.type !== 'text' && showQuestionImage && question.imageUrl && (
          <div className="mb-6">
            <img 
              src={question.imageUrl} 
              alt="Imagem da questão"
              className="mx-auto rounded-lg shadow-lg max-w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}
        
        <p className="text-[#8F7A6A] text-lg">
          Escolha {question.multiSelect} {question.multiSelect === 1 ? 'opção' : 'opções'}:
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          
          return (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`relative cursor-pointer transition-all duration-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg ${
                isSelected 
                  ? 'ring-4 ring-[#B89B7A] ring-opacity-60 transform scale-105' 
                  : 'hover:transform hover:scale-102'
              }`}
            >
              {question.type !== 'text' && option.imageUrl && (
                <div className="aspect-square w-full">
                  <img 
                    src={option.imageUrl} 
                    alt={option.text}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className={`p-4 ${
                question.type === 'text' 
                  ? 'min-h-[80px] flex items-center justify-center' 
                  : 'bg-white'
              } ${
                isSelected ? 'bg-[#B89B7A] text-white' : 'bg-white text-[#432818]'
              }`}>
                <p className={`text-center font-medium ${
                  question.type === 'text' ? 'text-lg' : 'text-base'
                }`}>
                  {option.text}
                </p>
              </div>
              
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection Counter */}
      <div className="text-center mb-6">
        <p className="text-[#8F7A6A]">
          {selectedOptions.length} de {question.multiSelect} selecionadas
        </p>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2 max-w-md mx-auto">
          <div 
            className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(selectedOptions.length / question.multiSelect) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Buttons (when not auto-advancing) */}
      {showNavigationButtons && (
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="flex items-center gap-2"
            disabled={!onPrevious}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <Button
            onClick={onNext}
            disabled={!canProceed || !onNext}
            className="flex items-center gap-2 bg-[#B89B7A] hover:bg-[#A0895B] text-white"
          >
            Próxima
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
