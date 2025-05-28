
import { QuizQuestion } from '../../types/quiz';

export const selfPerceptionQuestions: QuizQuestion[] = [
  {
    id: 'strategic-1',
    title: 'Como você se vê hoje?\nQuando você se olha no espelho, como se sente com sua imagem pessoal atualmente?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193439/2dd7e159-43a1-40b0-8075-ba6f591074c1_gpsauh.webp',
    options: [
      {
        id: 'strategic-1-1',
        text: 'Me sinto desconectada da mulher que sou hoje'
      },
      {
        id: 'strategic-1-2',
        text: 'Tenho dúvidas sobre o que realmente me valoriza'
      },
      {
        id: 'strategic-1-3',
        text: 'Às vezes acerto, às vezes erro'
      },
      {
        id: 'strategic-1-4',
        text: 'Me sinto segura, mas sei que posso evoluir'
      }
    ]
  },
  {
    id: 'strategic-2',
    title: 'O que mais te desafia na hora de se vestir?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193438/6cceaaa9-9383-4890-95a4-da036f8421e3_u7tuaw.webp',
    options: [
      {
        id: 'strategic-2-1',
        text: 'Tenho peças, mas não sei como combiná-las'
      },
      {
        id: 'strategic-2-2',
        text: 'Compro por impulso e me arrependo depois'
      },
      {
        id: 'strategic-2-3',
        text: 'Minha imagem não reflete quem eu sou'
      },
      {
        id: 'strategic-2-4',
        text: 'Perco tempo e acabo usando sempre os mesmos looks'
      }
    ]
  }
];
