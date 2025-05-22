
import { QuizQuestion } from '../../types/quiz';

export const purchaseIntentQuestions: QuizQuestion[] = [
  {
    id: 'strategic-5',
    title: 'Qual é o seu plano com relação a adquirir um guia de estilo?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_31_41_jmjkty.webp',
    options: [
      {
        id: 'strategic-5-1',
        text: 'Estou pronta para investir em mim mesma hoje',
        styleCategory: 'Strategic'
      },
      {
        id: 'strategic-5-2',
        text: 'Quero conhecer as opções antes de decidir',
        styleCategory: 'Strategic'
      },
      {
        id: 'strategic-5-3',
        text: 'Estou só curiosa por enquanto',
        styleCategory: 'Strategic'
      }
    ]
  },
  {
    id: 'strategic-6',
    title: 'O que mais te impediria de adquirir um guia de estilo hoje?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_01_31_03_bqjnc6.webp',
    options: [
      {
        id: 'strategic-6-1',
        text: 'Preço - preciso ter certeza que vale o investimento',
        styleCategory: 'Strategic'
      },
      {
        id: 'strategic-6-2',
        text: 'Insegurança - não sei se conseguirei aplicar sozinha',
        styleCategory: 'Strategic'
      },
      {
        id: 'strategic-6-3',
        text: 'Tempo - não sei se terei tempo para estudar o material',
        styleCategory: 'Strategic'
      },
      {
        id: 'strategic-6-4',
        text: 'Confiança - não sei se vai funcionar para o meu caso',
        styleCategory: 'Strategic'
      },
      {
        id: 'strategic-6-5',
        text: 'Nada me impediria, estou decidida',
        styleCategory: 'Strategic'
      }
    ]
  }
];
