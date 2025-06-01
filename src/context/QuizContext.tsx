
import React, { createContext, useContext, ReactNode } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';

type QuizContextType = ReturnType<typeof useQuizLogic> & {
  startQuiz: (name: string, email: string, quizId: string) => Promise<any>;
  submitAnswers: (answers: Array<{ questionId: string; optionId: string; points: number }>) => Promise<void>;
  submitResults: (results: any) => Promise<void>;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log('🎯 QuizProvider carregando...');
  const quizLogic = useQuizLogic();
  
  const startQuiz = async (name: string, email: string, quizId: string) => {
    console.log(`Starting quiz for ${name} (${email}) with quiz ID ${quizId}`);
    return { id: '1', name, email };
  };

  const submitAnswers = async (answers: Array<{ questionId: string; optionId: string; points: number }>) => {
    console.log('Submitting answers:', answers);
  };

  const submitResults = async (results: any) => {
    console.log("Results submitted:", results);
    window.location.href = '/resultado';
  };
  
  const contextValue = {
    ...quizLogic,
    startQuiz,
    submitAnswers,
    submitResults
  };
  
  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};

export const useQuiz = () => {
  const getQuizResult = () => {
    try {
      const savedResult = localStorage.getItem('quizResult');
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        return {
          primaryStyle: parsedResult.primaryStyle,
          secondaryStyles: parsedResult.secondaryStyles || []
        };
      }
      return null;
    } catch (error) {
      console.error('Error loading quiz result:', error);
      return null;
    }
  };

  const quizResult = getQuizResult();
  
  return {
    ...quizResult,
    startQuiz: async (name: string, email: string, quizId: string) => {
      console.log(`Starting quiz for ${name} (${email}) with quiz ID ${quizId}`);
      return { id: '1', name, email };
    },
    
    submitAnswers: async (answers: Array<{ questionId: string; optionId: string; points: number }>) => {
      console.log('Submitting answers:', answers);
    },
    
    submitResults: async (results: any) => {
      console.log("Results submitted:", results);
      window.location.href = '/resultado';
    }
  };
};
