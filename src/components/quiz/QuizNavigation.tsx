
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface QuizNavigationProps {
  canProceed: boolean;
  onNext: () => void;
  onPrevious?: () => void;
  currentQuestionType: 'normal' | 'strategic';
  selectedOptionsCount: number;
  isLastQuestion?: boolean;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  canProceed,
  onNext,
  onPrevious,
  currentQuestionType,
  selectedOptionsCount,
  isLastQuestion = false
}) => {
  const [showActivationEffect, setShowActivationEffect] = useState(false);
  const [autoAdvanceTimer, setAutoAdvanceTimer] = useState<NodeJS.Timeout | null>(null);

  const shouldAutoAdvance = useCallback((): boolean => {
    // Auto-avanço apenas para questões normais quando completar 3 seleções
    return currentQuestionType === 'normal' && selectedOptionsCount === 3 && canProceed;
  }, [canProceed, currentQuestionType, selectedOptionsCount]);

  useEffect(() => {
    // Limpar timer anterior se existir
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }

    if (canProceed) {
      // Efeito de ativação quando o botão fica disponível
      setShowActivationEffect(true);
      const visualTimer = setTimeout(() => {
        setShowActivationEffect(false);
      }, 1500);

      // Auto-avanço instantâneo para questões normais
      if (shouldAutoAdvance()) {
        console.log('[DEBUG Navigation] Auto-avançando questão normal após 3 seleções');
        const newTimer = setTimeout(() => {
          onNext();
        }, 100); // Tempo mínimo para feedback visual
        setAutoAdvanceTimer(newTimer);
      } else if (currentQuestionType === 'strategic') {
        console.log('[DEBUG Navigation] Questão estratégica pronta para avanço manual');
      }

      return () => {
        clearTimeout(visualTimer);
        if (autoAdvanceTimer) {
          clearTimeout(autoAdvanceTimer);
        }
      };
    } else {
      setShowActivationEffect(false);
    }
  }, [canProceed, onNext, shouldAutoAdvance, currentQuestionType]);

  const getHelperText = useCallback((): string => {
    if (!canProceed) {
      return currentQuestionType === 'strategic'
        ? 'Selecione 1 opção para continuar'
        : 'Selecione 3 opções para continuar';
    }
    
    if (currentQuestionType === 'normal' && canProceed) {
      return 'Avançando automaticamente...';
    }
    
    if (currentQuestionType === 'strategic' && canProceed) {
      return 'Clique em "Avançar" para continuar';
    }
    
    return '';
  }, [canProceed, currentQuestionType]);

  const nextButtonText = isLastQuestion ? 'Ver Resultado' : 'Avançar';

  console.log('[DEBUG Navigation]', {
    canProceed,
    currentQuestionType,
    selectedOptionsCount,
    helperText: getHelperText()
  });

  return (
    <div className="mt-8 w-full px-4 md:px-0">
      <div className="flex flex-col items-center w-full">
        {/* Helper text sempre visível */}
        <p className="text-sm text-[#8F7A6A] mb-4 text-center">
          {getHelperText()}
        </p>

        <div className="flex justify-center items-center w-full gap-4">
          {onPrevious && (
            <Button
              variant="outline"
              onClick={onPrevious}
              className="text-[#8F7A6A] border-[#8F7A6A] hover:bg-[#F3E8E6]/50 hover:text-[#A38A69] py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-opacity-50"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          )}

          {/* Botão sempre visível, mas habilitado apenas quando pode prosseguir */}
          <Button
            onClick={onNext}
            disabled={!canProceed}
            variant="outline"
            className={`text-lg px-8 py-3 flex items-center transition-all duration-300 ease-in-out rounded-lg shadow-sm hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b29670]
              ${
                canProceed
                  ? `bg-[#b29670] text-white hover:bg-[#a0845c] border-[#b29670] ${
                      showActivationEffect ? 'scale-105 shadow-lg animate-pulse' : ''
                    }`
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
              }`}
            aria-label={nextButtonText}
            aria-disabled={!canProceed}
          >
            {nextButtonText}
            {isLastQuestion ? <Check className="ml-2 h-5 w-5" /> : <ChevronRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>

        {/* Indicador de progresso para questões normais */}
        {currentQuestionType === 'normal' && (
          <div className="mt-4 text-xs text-[#8F7A6A] text-center">
            <p>Selecionadas: {selectedOptionsCount} de 3</p>
            {selectedOptionsCount === 3 && (
              <p className="text-[#b29670] font-medium">✓ Completo! Avançando...</p>
            )}
          </div>
        )}

        {/* Indicador para questões estratégicas */}
        {currentQuestionType === 'strategic' && selectedOptionsCount > 0 && (
          <div className="mt-4 text-xs text-[#b29670] text-center font-medium">
            ✓ Opção selecionada! Clique em "Avançar" para continuar
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizNavigation;
