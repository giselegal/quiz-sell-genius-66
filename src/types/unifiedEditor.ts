
import { QuizComponentData } from './quiz';
import { Block } from './editor';

export interface UnifiedEditorState {
  activeTab: 'quiz' | 'result' | 'sales';
  isPreviewing: boolean;
  quizEditorState: {
    components: QuizComponentData[];
    stages: any[];
    previewMode?: boolean;
  };
  resultEditorState: {
    config: any;
    blocks: Block[];
  };
  salesEditorState: {
    // Define sales editor state
  };
}

export interface ResultPageConfig {
  styleType: string;
  title?: string;
  header: {
    visible: boolean;
    content: Record<string, any>;
  };
  mainContent: {
    // Define main content structure
  };
  offer: {
    hero: {
      visible: boolean;
      content: Record<string, any>;
    };
    benefits: {
      // Define benefits structure
    };
    products: {
      // Define products structure
    };
    pricing: {
      // Define pricing structure
    };
    testimonials: {
      // Define testimonials structure
    };
    guarantee: {
      // Define guarantee structure
    };
  };
}
