
export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  value?: string;
  styleCategory?: string;
  points?: number;
}

export interface Question {
  id: string;
  text: string;
  title: string;
  type: 'image' | 'text' | 'both';
  imageUrl?: string;
  options: QuizOption[];
  multiSelect?: number;
  order?: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  title: string;
  type: 'image' | 'text' | 'both';
  imageUrl?: string;
  options: QuizOption[];
  multiSelect: number;
  order?: number;
}

export interface StyleResult {
  category: string;
  score: number;
  percentage: number;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
  userName: string;
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface QuizComponentData {
  type: string;
  content: any;
}
