
import { create } from 'zustand';
import { StyleResult } from '@/types/quiz';

interface QuizState {
  responses: any[];
  currentQuestionIndex: number;
  isCompleted: boolean;
  result: { primaryStyle: StyleResult; secondaryStyles: StyleResult[] } | null;
  setResponses: (responses: any[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setCompleted: (completed: boolean) => void;
  setResult: (result: { primaryStyle: StyleResult; secondaryStyles: StyleResult[] } | null) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  responses: [],
  currentQuestionIndex: 0,
  isCompleted: false,
  result: null,
  setResponses: (responses) => set({ responses }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setCompleted: (completed) => set({ isCompleted: completed }),
  setResult: (result) => set({ result }),
  resetQuiz: () => set({ 
    responses: [], 
    currentQuestionIndex: 0, 
    isCompleted: false, 
    result: null 
  }),
}));
