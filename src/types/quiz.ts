
import { UserAnswer } from '../utils/resultsCalculator';

export interface QuizQuestion {
  id: string;
  title: string;
  description?: string;
  options: QuizOption[];
  imageUrl?: string;
  multiSelect?: number;
  type?: "image" | "text" | "both"; // Restrict to valid types
}

export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  stylePoints?: Record<string, number>;
  styleCategory?: string;
  points?: number;
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface QuizContextType {
  currentQuestion: QuizQuestion | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  isLastQuestion: boolean;
  currentAnswers: string[];
  answers: Record<string, UserAnswer[]>;
  userName: string;
  handleNext: () => void;
  handlePrevious: () => void;
  handleAnswer: (questionId: string, optionIds: string[]) => void;
  calculateResults: () => void;
  isSubmitted: boolean;
}

export interface StyleResult {
  category: string;
  name?: string;
  description?: string;
  score: number;
  percentage: number; // Added percentage property
  colorPalette?: string[];
  attributes?: string[];
  imageUrl?: string;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  userName: string;
  answers?: Record<string, UserAnswer[]>;
  strategicAnswers?: Record<string, string[]>;
  timestamp?: number;
  totalSelections?: number; // Added totalSelections property
}

export interface BlockType {
  id: string;
  type: string;
  content: any;
  settings?: Record<string, any>;
}
