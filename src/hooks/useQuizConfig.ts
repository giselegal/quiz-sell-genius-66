"use client";

import { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';
// Storage keys
const QUIZ_CONFIG_KEY = 'quiz_config';
interface QuizConfig {
  questions: QuizQuestion[];
  title: string;
  description: string;
  version: number;
  updatedAt: string;
}
export const useQuizConfig = () => {
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [loading, setLoading] = useState(true);
  // Load config from localStorage
  useEffect(() => {
    const loadConfig = () => {
      setLoading(true);
      try {
        const savedConfig = localStorage.getItem(QUIZ_CONFIG_KEY);
        if (savedConfig) {
          setConfig(JSON.parse(savedConfig));
        } else {
          // Initialize with default config
          const defaultConfig: QuizConfig = {
            questions: [],
            title: 'Quiz de Estilo Pessoal',
            description: 'Descubra seu estilo predominante respondendo às perguntas abaixo.',
            version: 1,
            updatedAt: new Date().toISOString()
          };
          setConfig(defaultConfig);
          localStorage.setItem(QUIZ_CONFIG_KEY, JSON.stringify(defaultConfig));
        }
      } catch (error) {
        console.error('Error loading quiz config:', error);
        toast({
          title: "Erro ao carregar configuração",
          description: "Não foi possível carregar a configuração do quiz.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    loadConfig();
  }, []);
  // Save config to localStorage
  const saveConfig = useCallback((newConfig: QuizConfig) => {
    try {
      const updatedConfig = {
        ...newConfig,
        updatedAt: new Date().toISOString(),
        version: (newConfig.version || 0) + 1
      };
      localStorage.setItem(QUIZ_CONFIG_KEY, JSON.stringify(updatedConfig));
      setConfig(updatedConfig);
      return true;
    } catch (error) {
      console.error('Error saving quiz config:', error);
      toast({
        title: "Erro ao salvar configuração",
        description: "Não foi possível salvar a configuração do quiz.",
        variant: "destructive"
      });
      return false;
    }
  // Update questions
  const updateQuestions = useCallback((questions: QuizQuestion[]) => {
    if (!config) return false;
    return saveConfig({
      ...config,
      questions
    });
  }, [config, saveConfig]);
  // Add a question
  const addQuestion = useCallback((question: QuizQuestion) => {
    return updateQuestions([...config.questions, question]);
  }, [config, updateQuestions]);
  // Update a question
  const updateQuestion = useCallback((questionId: string, updates: Partial<QuizQuestion>) => {
    const updatedQuestions = config.questions.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    );
    return updateQuestions(updatedQuestions);
  // Delete a question
  const deleteQuestion = useCallback((questionId: string) => {
    return updateQuestions(config.questions.filter(q => q.id !== questionId));
  return {
    config,
    loading,
    saveConfig,
    updateQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestion
  };
};
