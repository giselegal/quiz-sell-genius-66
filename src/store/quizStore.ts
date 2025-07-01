
import { create } from 'zustand';
import { StyleResult } from '@/types/quiz';

interface QuizState {
  responses: any[];
  currentQuestionIndex: number;
  setResponses: (responses: any[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  responses: [],
  currentQuestionIndex: 0,
  setResponses: (responses) => set({ responses }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
}));
