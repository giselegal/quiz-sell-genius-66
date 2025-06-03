
import { useState, useEffect } from 'react';
import { QuizQuestion, QuizResult } from '@/types/quiz';
import { getQuizQuestions, calculateStyleResults } from '@/services/quizService';

export interface UseQuizReturn {
  questions: QuizQuestion[];
  currentQuestion: QuizQuestion | null;
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  quizResult: QuizResult | null;
  isLoading: boolean;
  error: string | null;
  primaryStyle?: string;
  secondaryStyles?: string[];
  handleAnswerSelect: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuiz = (): UseQuizReturn => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex] || null;

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const loadedQuestions = await getQuizQuestions();
      setQuestions(loadedQuestions);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar perguntas do quiz');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      
      if (question.multiSelect > 1) {
        if (currentAnswers.includes(optionId)) {
          return { ...prev, [questionId]: currentAnswers.filter(id => id !== optionId) };
        } else if (currentAnswers.length < question.multiSelect) {
          return { ...prev, [questionId]: [...currentAnswers, optionId] };
        }
        return prev;
      } else {
        return { ...prev, [questionId]: [optionId] };
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const completeQuiz = () => {
    const result = calculateStyleResults(answers, questions);
    setQuizResult(result);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizResult(null);
  };

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    answers,
    quizResult,
    isLoading,
    error,
    primaryStyle: quizResult?.primaryStyle?.category,
    secondaryStyles: quizResult?.secondaryStyles?.map(s => s.category),
    handleAnswerSelect,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz
  };
};
