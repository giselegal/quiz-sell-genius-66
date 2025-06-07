
import { StyleResult } from '@/types/quiz';

export const calculateStyleResult = (responses: any[]): { primaryStyle: StyleResult; secondaryStyles: StyleResult[] } | null => {
  if (!responses || responses.length === 0) {
    // Try to get from localStorage if no responses
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      try {
        return JSON.parse(savedResult);
      } catch (error) {
        console.error('Error parsing saved result:', error);
      }
    }
    return null;
  }

  // Fast calculation for better performance
  const styleCounter: Record<string, number> = {
    Natural: 0,
    Clássico: 0,
    Contemporâneo: 0,
    Elegante: 0,
    Romântico: 0,
    Sexy: 0,
    Dramático: 0,
    Criativo: 0,
  };

  let totalSelections = 0;

  // Count style selections
  responses.forEach(response => {
    if (response && response.styleCategory) {
      styleCounter[response.styleCategory] = (styleCounter[response.styleCategory] || 0) + 1;
      totalSelections++;
    }
  });

  if (totalSelections === 0) {
    return null;
  }

  // Convert to StyleResult array and sort
  const styleResults: StyleResult[] = Object.entries(styleCounter)
    .map(([category, score]) => ({
      category: category as StyleResult['category'],
      score,
      percentage: Math.round((score / totalSelections) * 100),
    }))
    .sort((a, b) => b.score - a.score);

  const primaryStyle = styleResults[0];
  const secondaryStyles = styleResults.slice(1, 3); // Get top 2 secondary styles

  const result = {
    primaryStyle,
    secondaryStyles,
  };

  // Cache result for faster subsequent loads
  try {
    localStorage.setItem('quizResult', JSON.stringify(result));
  } catch (error) {
    console.error('Error saving result to localStorage:', error);
  }

  return result;
};

// Helper function to clear cached results
export const clearQuizCache = () => {
  localStorage.removeItem('quizResult');
  localStorage.removeItem('strategicAnswers');
  localStorage.removeItem('quizResponses');
};
