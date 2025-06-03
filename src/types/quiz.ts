
export interface Question {
  id: string;
  text: string;
  imageUrl?: string;
  options: string[];
  multiSelect?: boolean;
  order?: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  imageUrl?: string;
  options: string[];
  multiSelect?: number;
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
  userName?: string;
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface QuizComponentData {
  type: string;
  content: any;
}
