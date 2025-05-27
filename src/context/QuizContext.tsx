
"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { QuizQuestion, QuizAnswer, StyleResult } from '@/types/quiz';

interface QuizState {
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  isCompleted: boolean;
  result: StyleResult | null;
  questions: QuizQuestion[];
}

type QuizAction =
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'ADD_ANSWER'; payload: QuizAnswer }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'SET_RESULT'; payload: StyleResult }
  | { type: 'RESET_QUIZ' }
  | { type: 'SET_QUESTIONS'; payload: QuizQuestion[] };

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: [],
  isCompleted: false,
  result: null,
  questions: []
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
      };
    case 'ADD_ANSWER':
      return {
        ...state,
        answers: [...state.answers, action.payload]
      };
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        isCompleted: true
      };
    case 'SET_RESULT':
      return {
        ...state,
        result: action.payload
      };
    case 'RESET_QUIZ':
      return initialState;
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload
      };
    default:
      return state;
  }
}

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
} | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
