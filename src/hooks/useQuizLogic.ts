
import { useState } from 'react';

export const useQuizLogic = () => {
  console.log('🧠 useQuizLogic carregando...');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  const calculateResults = (clickOrder: string[]) => {
    console.log('Calculando resultados com ordem de cliques:', clickOrder);
    
    // Mock result for now
    const mockResult = {
      primaryStyle: 'Clássico Elegante',
      secondaryStyles: ['Moderno Sofisticado', 'Boho Chic']
    };
    
    setQuizResult(mockResult);
    localStorage.setItem('quizResult', JSON.stringify(mockResult));
    return mockResult;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizResult(null);
    localStorage.removeItem('quizResult');
  };

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    loading,
    setLoading,
    quizResult,
    calculateResults,
    resetQuiz,
    // Funções básicas para compatibilidade
    submitAnswer: (answer: any) => {
      console.log('Resposta submetida:', answer);
      setAnswers(prev => [...prev, answer]);
    },
    nextQuestion: () => {
      setCurrentQuestionIndex(prev => prev + 1);
    },
    previousQuestion: () => {
      setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
    }
  };
};
