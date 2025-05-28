
import { QuizQuestion } from '../types/quiz';
import { clothingQuestions } from './questions/clothingQuestions';
import { personalityQuestions } from './questions/personalityQuestions';
import { accessoriesQuestions } from './questions/accessoriesQuestions';
import { stylePreferencesQuestions } from './questions/stylePreferencesQuestions';
import { outerwearQuestions } from './questions/outerwearQuestions';
import { accessoryStyleQuestions } from './questions/accessoryStyleQuestions';

export const quizQuestions: QuizQuestion[] = [
  ...clothingQuestions,         // Questões 1 e 3
  ...personalityQuestions,      // Questões 2 e 4
  ...stylePreferencesQuestions, // Questões 5 e 10
  ...outerwearQuestions,       // Questões 6 e 7
  ...accessoriesQuestions,     // Questão 8
  ...accessoryStyleQuestions   // Questão 9
];

