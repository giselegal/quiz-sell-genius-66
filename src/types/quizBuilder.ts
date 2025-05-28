
export type QuizComponentType = 
  | 'header'
  | 'headline'
  | 'text'
  | 'image'
  | 'multipleChoice'
  | 'singleChoice'
  | 'scale'
  | 'quizResult'
  | 'stageCover'
  | 'stageQuestion'
  | 'stageResult'
  | 'benefitsList'
  | 'faq';

export interface QuizComponentData {
  id: string;
  type: QuizComponentType;
  order: number;
  stageId: string;
  data: Record<string, any>;
  style?: Record<string, any>;
}

export interface QuizStage {
  id: string;
  title: string;
  type: 'cover' | 'question' | 'result' | 'strategic';
  order: number;
}

export interface QuizBuilderState {
  components: QuizComponentData[];
  stages: QuizStage[];
}

export interface QuizBuilderConfig {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  styles: QuizStyles;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  type: 'multiple-choice' | 'text' | 'scale';
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
  image?: string;
}

export interface QuizStyles {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}
