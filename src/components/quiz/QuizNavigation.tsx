import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

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
    if (!canProceed) {
      return false;
    }
    
    // Testar condições específicas com maior detalhe para debugging
    const normalCondition = currentQuestionType === 'normal' && selectedOptionsCount === 3;
    const strategicCondition = currentQuestionType === 'strategic' && selectedOptionsCount >= 1;
    
    // Log detalhado para debugging
    console.log(`Verificando auto-avanço: canProceed=${canProceed}, tipo=${currentQuestionType}, selecionadas=${selectedOptionsCount}`);
    console.log(`Condições de auto-avanço: normal=${normalCondition}, estratégica=${strategicCondition}`);
    
    return normalCondition || strategicCondition;
  }, [canProceed, currentQuestionType, selectedOptionsCount]);

  useEffect(() => {
    // Limpar timer anterior para evitar avanços múltiplos
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      setAutoAdvanceTimer(null);
    }

    if (canProceed) {
      // Mostrar efeito de ativação
      setShowActivationEffect(true);
      const visualTimer = setTimeout(() => {
        setShowActivationEffect(false);
      }, 2000);

      // Configurar avanço automático quando apropriado
      if (shouldAutoAdvance()) {
        console.log('Configurando avanço automático em 45ms');
        // Utilizar setTimeout diretamente para garantir execução precisa
        const newTimer = setTimeout(() => {
          console.log('Executando avanço automático agora');
          onNext();
        }, 45);
        setAutoAdvanceTimer(newTimer);
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
  }, [canProceed, onNext, shouldAutoAdvance]);

  const getHelperText = useCallback((): string => {
    if (!canProceed) {
      return currentQuestionType === 'strategic'
        ? 'Selecione 1 opção para continuar'
        : 'Selecione 3 opções para continuar';
    }
    return '';
  }, [canProceed, currentQuestionType]);

  const nextButtonText = isLastQuestion
    ? 'Ver Resultado'
    : currentQuestionType === 'strategic'
      ? 'Avançar'
      : 'Avançar';

  const previousButtonText =
    currentQuestionType === 'strategic' ? 'Pergunta Estratégica Anterior' : 'Pergunta Anterior';

  return (
    <div className="mt-6 w-full px-4 md:px-0">
      <div className="flex flex-col items-center w-full">
        {!canProceed && currentQuestionType !== 'strategic' && (
          <p className="text-sm text-[#8F7A6A] mb-3">{getHelperText()}</p>
        )}

        <div className="flex justify-center items-center w-full gap-3">
          {onPrevious && (
            <Button
              variant="outline"
              onClick={onPrevious}
              className="text-[#8F7A6A] border-[#8F7A6A] hover:bg-[#F3E8E6]/50 hover:text-[#A38A69] py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-opacity-50"
            >
              Voltar
            </Button>
          )}

          {currentQuestionType !== 'strategic' && (
            <Button
              onClick={onNext}
              disabled={!canProceed}
              variant="outline"
              className={`text-lg px-6 py-3 flex items-center transition-all duration-300 ease-in-out
                ${canProceed
                  ? `bg-[#b29670] text-white hover:bg-[#a0845c] border-[#b29670] ${
                      showActivationEffect ? 'scale-105 shadow-lg' : ''
                    }`
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                } focus:ring-2 focus:ring-offset-2 focus:ring-[#b29670]`}
              aria-label={nextButtonText}
              aria-disabled={!canProceed}
            >
              {nextButtonText}
              {isLastQuestion ? <CheckCircle className="ml-2 h-5 w-5" /> : <ChevronRight className="ml-2 h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizNavigation;