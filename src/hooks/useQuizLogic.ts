
import { useState } from 'react';

export const useQuizLogic = () => {
  console.log('🧠 useQuizLogic carregando...');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    loading,
    setLoading,
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
    },
    resetQuiz: () => {
      setCurrentQuestionIndex(0);
      setAnswers([]);
    }
  };
};
