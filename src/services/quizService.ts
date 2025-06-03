
import { QuizQuestion, QuizOption, StyleResult, QuizResult } from '@/types/quiz';
import { clothingQuestions } from '@/data/questions/clothingQuestions';
import { personalityQuestions } from '@/data/questions/personalityQuestions';
import { stylePreferencesQuestions } from '@/data/questions/stylePreferencesQuestions';
import { outerwearQuestions } from '@/data/questions/outerwearQuestions';
import { accessoriesQuestions } from '@/data/questions/accessoriesQuestions';
import { accessoryStyleQuestions } from '@/data/questions/accessoryStyleQuestions';

interface StyleCount {
  category: string;
  count: number;
}

interface CalculateStyleResultsParams {
  answers: Record<string, string[]>;
  questions: QuizQuestion[];
}

export const getQuizQuestions = async (): Promise<QuizQuestion[]> => {
  // Combine all question categories
  return [
    ...clothingQuestions,
    ...personalityQuestions,
    ...stylePreferencesQuestions,
    ...outerwearQuestions,
    ...accessoriesQuestions,
    ...accessoryStyleQuestions
  ];
};

export const calculateStyleResults = (answers: Record<string, string[]>, questions: QuizQuestion[]): QuizResult => {
  const styleCounts: Record<string, number> = {};
  let totalSelections = 0;

  // Count selections for each style category
  Object.entries(answers).forEach(([questionId, selectedOptionIds]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    selectedOptionIds.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option && option.styleCategory) {
        styleCounts[option.styleCategory] = (styleCounts[option.styleCategory] || 0) + (option.points || 1);
        totalSelections++;
      }
    });
  });

  // Convert counts to StyleResult objects with percentages
  const styleResults: StyleResult[] = Object.entries(styleCounts).map(([category, score]) => ({
    category,
    score,
    percentage: totalSelections > 0 ? Math.round((score / totalSelections) * 100) : 0
  }));

  // Sort results by score in descending order
  styleResults.sort((a, b) => b.score - a.score);

  // Determine primary and secondary styles
  const primaryStyle = styleResults.length > 0 ? styleResults[0] : { category: 'Unknown', score: 0, percentage: 0 };
  const secondaryStyles = styleResults.slice(1, 4); // Get top 3 secondary styles

  const userName = 'User'; // Replace with actual user name if available

  return {
    primaryStyle,
    secondaryStyles,
    totalSelections,
    userName
  };
};
