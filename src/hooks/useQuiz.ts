
"use client";

import { useState, useCallback } from 'react';
import { QuizQuestion, QuizAnswer, StyleResult } from '@/types/quiz';

export const useQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<StyleResult | null>(null);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const addAnswer = useCallback((answer: QuizAnswer) => {
    setAnswers(prev => [...prev, answer]);
  }, []);

  const completeQuiz = useCallback(() => {
    setIsCompleted(true);
  }, []);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    setResult(null);
  }, []);

  const loadQuestions = useCallback((newQuestions: QuizQuestion[]) => {
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    setResult(null);
  }, []);

  const calculateResult = useCallback(() => {
    // Logic to calculate result based on answers
    const styleResults: { [key: string]: number } = {};
    
    answers.forEach(answer => {
      if (answer.styleCategory) {
        styleResults[answer.styleCategory] = (styleResults[answer.styleCategory] || 0) + 1;
      }
    });

    const dominantStyle = Object.keys(styleResults).reduce((a, b) => 
      styleResults[a] > styleResults[b] ? a : b
    );

    const total = answers.length;
    const percentage = Math.round((styleResults[dominantStyle] / total) * 100);

    const calculatedResult: StyleResult = {
      category: dominantStyle,
      percentage,
      description: `Você tem ${percentage}% de afinidade com o estilo ${dominantStyle}`
    };

    setResult(calculatedResult);
    return calculatedResult;
  }, [answers]);

  return {
    currentQuestionIndex,
    answers,
    questions,
    isCompleted,
    result,
    nextQuestion,
    previousQuestion,
    addAnswer,
    completeQuiz,
    resetQuiz,
    loadQuestions,
    calculateResult
  };
};
