
import { QuizQuestion } from '../../types/quiz';
export const personalityQuestions: QuizQuestion[] = [
  {
    id: '2',
    title: 'RESUMA A SUA PERSONALIDADE:',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '2a',
        text: 'Informal, espontânea, alegre, essencialista.',
        styleCategory: 'Natural',
        points: 1
      },
        id: '2b',
        text: 'Conservadora, séria, organizada.',
        styleCategory: 'Clássico',
        id: '2c',
        text: 'Informada, ativa, prática.',
        styleCategory: 'Contemporâneo',
        id: '2d',
        text: 'Exigente, sofisticada, seletiva.',
        styleCategory: 'Elegante',
        id: '2e',
        text: 'Feminina, meiga, delicada, sensível.',
        styleCategory: 'Romântico',
        id: '2f',
        text: 'Glamorosa, vaidosa, sensual.',
        styleCategory: 'Sexy',
        id: '2g',
        text: 'Cosmopolita, moderna e audaciosa.',
        styleCategory: 'Dramático',
        id: '2h',
        text: 'Exótica, aventureira, livre.',
        styleCategory: 'Criativo',
      }
    ]
  }
];
