
import { useQuizStore } from '../store/quizStore';
import { useEffect, useState } from 'react';
import { StyleResult } from '../types/quiz';
import { calculateStyleResult } from '../utils/quizLogic';

export const useQuizResults = () => {
  const { responses, currentQuestionIndex } = useQuizStore();
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>([]);

  useEffect(() => {
    if (responses.length > 0) {
      const result = calculateStyleResult(responses);
      if (result) {
        setPrimaryStyle(result.primaryStyle);
        setSecondaryStyles(result.secondaryStyles);
      }
    }
  }, [responses]);

  return {
    primaryStyle,
    secondaryStyles,
    isComplete: responses.length > 0 && currentQuestionIndex >= 10
  };
};
