
import React, { createContext, useContext, ReactNode } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';

interface QuizContextType {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  answers: any[];
  setAnswers: (answers: any[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  quizResult: any;
  calculateResults: (clickOrder: string[]) => any;
  resetQuiz: () => void;
  submitAnswer: (answer: any) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log('🎯 QuizProvider carregando...');
  
  const quizLogic = useQuizLogic();

  return (
    <QuizContext.Provider value={quizLogic}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
