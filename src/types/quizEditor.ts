
export type QuizCategory = 
  | 'clothingQuestions' 
  | 'accessoriesQuestions' 
  | 'styleQuestions' 
  | 'strategicQuestions';

export interface QuizEditorState {
  questions: any[];
  editingQuestionId: string | null;
  selectedCategory: QuizCategory | null;
}

export const QUIZ_CATEGORIES = [
  {
    id: 'clothingQuestions' as QuizCategory,
    name: 'Roupas',
    description: 'Perguntas sobre preferências de vestuário',
    icon: '👕',
    isStrategic: false
  },
  {
    id: 'accessoriesQuestions' as QuizCategory,
    name: 'Acessórios',
    description: 'Perguntas sobre acessórios e complementos',
    icon: '💎',
    isStrategic: false
  },
  {
    id: 'styleQuestions' as QuizCategory,
    name: 'Estilo',
    description: 'Perguntas sobre estilo pessoal',
    icon: '✨',
    isStrategic: false
  },
  {
    id: 'strategicQuestions' as QuizCategory,
    name: 'Estratégicas',
    description: 'Perguntas estratégicas para leads',
    icon: '🎯',
    isStrategic: true
  }
];
