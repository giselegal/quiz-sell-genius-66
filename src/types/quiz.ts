
export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  styleCategory?: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';
  points?: number;
}

export interface QuizQuestion {
  id: string;
  title: string;
  type: 'text' | 'image' | 'both';
  multiSelect: number;
  imageUrl?: string;
  options: QuizOption[];
}

export interface UserResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface StyleResult {
  category: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';
  score: number;
  percentage: number;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
}
