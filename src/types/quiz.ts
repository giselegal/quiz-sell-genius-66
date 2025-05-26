
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
  text: string;
  stylePoints?: Record<string, number>;
  styleCategory?: string;
  points?: number;
export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
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
export interface StyleResult {
  category: string;
  name?: string;
  score: number;
  percentage: number; // Added percentage property
  colorPalette?: string[];
  attributes?: string[];
export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
  userName?: string;
export interface BlockType {
  type: string;
  content: any;
  settings?: Record<string, any>;
export interface QuizComponentData {
  style?: any;
  data?: {
    [key: string]: any;
    title?: string;
    subtitle?: string;
    text?: string;
    imageUrl?: string;
    alt?: string;
    question?: string;
    options?: Array<{
      id: string;
      text: string;
      isSelected?: boolean;
    }>;
  };
