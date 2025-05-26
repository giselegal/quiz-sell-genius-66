"use client";
import { safeLocalStorage } from "@/utils/safeLocalStorage";
import { useToast } from "@/components/ui/use-toast";

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { useToast } from '@/components/ui/use-toast';
import { QuizResult, StyleResult } from '@/types/quiz';
// Define the context type
type QuizContextType = ReturnType<typeof useQuizLogic> & {
  startQuiz: (name: string, email: string, quizId: string) => Promise<any>;
  submitAnswers: (answers: Array<{ questionId: string; optionId: string; points: number }>) => Promise<void>;
  submitResults: (results: QuizResult) => Promise<void>;
};
// Create context with undefined default
const QuizContext = createContext<QuizContextType | undefined>(undefined);
// Provider component
export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const quizLogic = useQuizLogic();
  const { toast } = useToast();
  
  // Define all context functions before returning the provider
  const startQuiz = async (name: string, email: string, quizId: string) => {
    try {
      console.log(`Starting quiz for ${name} (${email}) with quiz ID ${quizId}`);
      return { id: '1', name, email };
    } catch (error) {
      toast({
        title: "Erro ao iniciar o quiz",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };
  const submitAnswers = async (answers: Array<{ questionId: string; optionId: string; points: number }>) => {
      console.log('Submitting answers:', answers);
        title: "Erro ao salvar respostas",
  const submitResults = async (results: QuizResult) => {
      console.log("Results submitted:", results);
      window.location.href = '/resultado';
        title: "Erro ao salvar resultados",
  // Spread quizLogic and add our additional functions
  const contextValue = {
    ...quizLogic,
    startQuiz,
    submitAnswers,
    submitResults
  // Return the provider
  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
// Hook for using the context
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
// Export a simplification of the context
export const useQuiz = () => {
  const getQuizResult = (): { primaryStyle: StyleResult; secondaryStyles: StyleResult[] } | null => {
      const savedResult = safeLocalStorage.getItem('quizResult');
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        return {
          primaryStyle: parsedResult.primaryStyle,
          secondaryStyles: parsedResult.secondaryStyles || []
        };
      }
      return null;
      console.error('Error loading quiz result:', error);
  const quizResult = getQuizResult();
  return {
    ...quizResult,
    startQuiz: async (name: string, email: string, quizId: string) => {
      try {
        console.log(`Starting quiz for ${name} (${email}) with quiz ID ${quizId}`);
        return { id: '1', name, email };
      } catch (error) {
        toast({
          title: "Erro ao iniciar o quiz",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });
        throw error;
    },
    
    submitAnswers: async (
      answers: Array<{ questionId: string; optionId: string; points: number }>
    ) => {
        console.log('Submitting answers:', answers);
          title: "Erro ao salvar respostas",
    submitResults: async (results: QuizResult) => {
        console.log("Results submitted:", results);
        window.location.href = '/resultado';
          title: "Erro ao salvar resultados",
