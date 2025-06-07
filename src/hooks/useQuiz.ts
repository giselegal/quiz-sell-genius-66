
import { useQuizStore } from '../store/quizStore';
import { useEffect, useState } from 'react';
import { StyleResult } from '../types/quiz';
import { calculateStyleResult } from '../utils/quizLogic';

export const useQuiz = () => {
  const { responses } = useQuizStore();
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load from localStorage first for faster loading
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      try {
        const result = JSON.parse(savedResult);
        setPrimaryStyle(result.primaryStyle);
        setSecondaryStyles(result.secondaryStyles);
        setIsLoading(false);
        return;
      } catch (error) {
        console.error('Error loading saved result:', error);
      }
    }

    // Calculate from responses if no saved result
    if (responses.length > 0) {
      const result = calculateStyleResult(responses);
      if (result) {
        setPrimaryStyle(result.primaryStyle);
        setSecondaryStyles(result.secondaryStyles);
        // Save result for future loads
        localStorage.setItem('quizResult', JSON.stringify(result));
      }
      setIsLoading(false);
    }
  }, [responses]);

  return {
    primaryStyle,
    secondaryStyles,
    isComplete: primaryStyle !== null,
    isLoading
  };
};
