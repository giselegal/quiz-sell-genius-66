
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

const defaultQuizConfig: QuizBuilderConfig = {
  id: 'default-quiz',
  title: 'Descubra Seu Estilo',
  description: 'Um quiz personalizado para descobrir seu estilo único',
  questions: [
    {
      id: 'q1',
      text: 'Qual é o seu estilo preferido?',
      type: 'multiple-choice',
      options: [
        { id: 'o1', text: 'Clássico', value: 'classico' },
        { id: 'o2', text: 'Moderno', value: 'moderno' },
        { id: 'o3', text: 'Casual', value: 'casual' },
        { id: 'o4', text: 'Elegante', value: 'elegante' }
      ]
    }
  ],
  styles: {
    primaryColor: '#B89B7A',
    secondaryColor: '#432818',
    backgroundColor: '#FAF9F7',
    textColor: '#432818',
    fontFamily: 'Playfair Display, serif'
  }
};

export const quizBuilderService = {
  getDefaultConfig: (): QuizBuilderConfig => {
    return { ...defaultQuizConfig };
  },

  saveConfig: (config: QuizBuilderConfig): void => {
    try {
      localStorage.setItem('quiz-builder-config', JSON.stringify(config));
    } catch (error) {
      console.error('Error saving quiz config:', error);
    }
  },

  loadConfig: (): QuizBuilderConfig => {
    try {
      const saved = localStorage.getItem('quiz-builder-config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading quiz config:', error);
    }
    return defaultQuizConfig;
  },

  addQuestion: (config: QuizBuilderConfig, question: QuizQuestion): QuizBuilderConfig => {
    return {
      ...config,
      questions: [...config.questions, question]
    };
  },

  updateQuestion: (config: QuizBuilderConfig, questionId: string, updates: Partial<QuizQuestion>): QuizBuilderConfig => {
    return {
      ...config,
      questions: config.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    };
  },

  removeQuestion: (config: QuizBuilderConfig, questionId: string): QuizBuilderConfig => {
    return {
      ...config,
      questions: config.questions.filter(q => q.id !== questionId)
    };
  }
};
