
export interface StyleResult {
  category: 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';
  score: number;
  percentage: number;
}

export interface QuizResult {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  totalSelections: number;
  userName: string;
}

export interface QuizComponentData {
  id: string;
  type: string;
  content: any;
}

export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
  styleCategory: StyleResult['category'];
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle?: string;
  options: QuizOption[];
  multiSelect?: number;
  type: 'single' | 'multiple';
}
