
import { useState, useCallback } from 'react';
import { QuizQuestion, UserResponse, QuizResult } from '@/types/quiz';
import { calculateStyleResults } from '@/services/quizService';

export interface UseQuizReturn {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  isCompleted: boolean;
  result: QuizResult | null;
  handleAnswer: (response: UserResponse) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetQuiz: () => void;
  calculateResults: (questions: QuizQuestion[]) => QuizResult;
}

export const useQuiz = (questions: QuizQuestion[]): UseQuizReturn => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const isCompleted = currentQuestionIndex >= questions.length;

  const handleAnswer = useCallback((response: UserResponse) => {
    setAnswers(prev => ({
      ...prev,
      [response.questionId]: response.selectedOptions
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  }, []);

  const calculateResults = useCallback((quizQuestions: QuizQuestion[]): QuizResult => {
    const quizResult = calculateStyleResults(answers, quizQuestions);
    setResult(quizResult);
    return quizResult;
  }, [answers]);

  return {
    currentQuestionIndex,
    answers,
    isCompleted,
    result,
    handleAnswer,
    nextQuestion,
    previousQuestion,
    resetQuiz,
    calculateResults
  };
};
