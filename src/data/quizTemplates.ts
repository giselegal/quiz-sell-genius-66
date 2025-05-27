
/**
 * Templates pré-definidos para o Quiz
 * Cada template contém uma estrutura completa de quiz que pode ser carregada rapidamente
 */

import { QuizStage } from '@/types/quizBuilder';

export interface QuizTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  stages: QuizStage[];
}

export const quizTemplates: QuizTemplate[] = [
  {
    id: 'template-estilo-pessoal',
    name: 'Quiz de Estilo Pessoal',
    description: 'Template para descobrir o estilo pessoal dos participantes, com foco em moda e imagem.',
    thumbnail: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
    stages: [
      {
        id: 'stage-cover-1',
        title: 'Etapa 1: Capa do Quiz',
        order: 0,
        type: 'cover',
        config: {
          title: 'Descubra seu Estilo Pessoal',
          subtitle: 'Responda algumas perguntas e descubra qual estilo combina mais com você',
          buttonText: 'Começar Quiz',
          backgroundImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg'
        }
      },
      {
        id: 'stage-question-1',
        title: 'Etapa 2: Questão 1',
        order: 1,
        type: 'question',
        config: {
          questionText: 'Quais dessas peças você mais gosta de usar no dia a dia?',
          questionType: 'image',
          multiSelect: 3,
          options: [
            {
              id: 'option-1',
              text: 'Roupas confortáveis e casuais',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
              styleCategory: 'Natural'
            },
            {
              id: 'option-2',
              text: 'Peças clássicas e atemporais',
              styleCategory: 'Clássico'
            },
            {
              id: 'option-3',
              text: 'Looks modernos e minimalistas',
              styleCategory: 'Contemporâneo'
            },
            {
              id: 'option-4',
              text: 'Peças sofisticadas e refinadas',
              styleCategory: 'Elegante'
            }
          ]
        }
      },
      {
        id: 'stage-question-2',
        title: 'Etapa 3: Questão 2',
        order: 2,
        type: 'question',
        config: {
          questionText: 'Qual dessas paletas de cores mais combina com você?',
          options: [
            {
              id: 'option-1',
              text: 'Cores neutras e terrosas',
              styleCategory: 'Natural'
            },
            {
              id: 'option-2',
              text: 'Cores tradicionais e sóbrias',
              styleCategory: 'Clássico'
            },
            {
              id: 'option-3',
              text: 'Cores vibrantes e contrastantes',
              styleCategory: 'Criativo'
            },
            {
              id: 'option-4',
              text: 'Cores suaves e românticas',
              styleCategory: 'Romântico'
            }
          ]
        }
      },
      {
        id: 'stage-result-1',
        title: 'Etapa 4: Página de Resultado',
        order: 3,
        type: 'result',
        config: {
          title: 'Seu Estilo Pessoal',
          subtitle: 'Baseado nas suas respostas, seu estilo predominante é:',
          ctaText: 'Ver Guia Completo',
          ctaUrl: '/resultado'
        }
      }
    ]
  },
  {
    id: 'template-consultoria-imagem',
    name: 'Quiz de Consultoria de Imagem',
    description: 'Template para consultoria de imagem profissional, com foco em coloração pessoal e formato corporal.',
    thumbnail: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
    stages: [
      {
        id: 'stage-cover-2',
        title: 'Etapa 1: Capa do Quiz',
        order: 0,
        type: 'cover',
        config: {
          title: 'Descubra sua Coloração Pessoal',
          subtitle: 'Responda algumas perguntas e descubra quais cores valorizam mais sua beleza natural',
          buttonText: 'Começar Análise',
          backgroundImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp'
        }
      },
      {
        id: 'stage-question-3',
        title: 'Etapa 2: Questão 1',
        order: 1,
        type: 'question',
        config: {
          questionText: 'Qual a cor natural dos seus olhos?',
          options: [
            {
              id: 'option-1',
              text: 'Castanho escuro',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
              styleCategory: 'Outono'
            },
            {
              id: 'option-2',
              text: 'Azul ou verde',
              styleCategory: 'Verão'
            },
            {
              id: 'option-3',
              text: 'Castanho claro ou mel',
              styleCategory: 'Primavera'
            },
            {
              id: 'option-4',
              text: 'Preto ou castanho muito escuro',
              styleCategory: 'Inverno'
            }
          ]
        }
      },
      {
        id: 'stage-question-4',
        title: 'Etapa 3: Questão 2',
        order: 2,
        type: 'question',
        config: {
          questionText: 'Qual a cor natural do seu cabelo?',
          options: [
            {
              id: 'option-1',
              text: 'Loiro dourado ou ruivo',
              styleCategory: 'Primavera'
            },
            {
              id: 'option-2',
              text: 'Castanho médio ou escuro',
              styleCategory: 'Outono'
            },
            {
              id: 'option-3',
              text: 'Loiro claro ou cinza',
              styleCategory: 'Verão'
            }
          ]
        }
      },
      {
        id: 'stage-result-2',
        title: 'Etapa 4: Página de Resultado',
        order: 3,
        type: 'result',
        config: {
          title: 'Sua Coloração Pessoal',
          subtitle: 'Baseado nas suas respostas, sua coloração pessoal é:',
          ctaText: 'Ver Paleta Completa',
          ctaUrl: '/resultado'
        }
      }
    ]
  },
  {
    id: 'template-estilo-vida',
    name: 'Quiz de Estilo de Vida',
    description: 'Template para identificar o estilo de vida e preferências pessoais dos participantes.',
    thumbnail: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
    stages: [
      {
        id: 'stage-cover-3',
        title: 'Etapa 1: Capa do Quiz',
        order: 0,
        type: 'cover',
        config: {
          title: 'Descubra seu Estilo de Vida',
          subtitle: 'Responda algumas perguntas e descubra qual estilo de vida combina mais com você',
          buttonText: 'Começar Quiz',
          backgroundImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp'
        }
      },
      {
        id: 'stage-question-5',
        title: 'Etapa 2: Questão 1',
        order: 1,
        type: 'question',
        config: {
          questionText: 'Como você prefere passar seu tempo livre?',
          questionType: 'text',
          options: [
            {
              id: 'option-1',
              text: 'Atividades ao ar livre e esportes',
              styleCategory: 'Ativo'
            },
            {
              id: 'option-2',
              text: 'Leitura e atividades culturais',
              styleCategory: 'Intelectual'
            },
            {
              id: 'option-3',
              text: 'Encontros sociais e festas',
              styleCategory: 'Social'
            },
            {
              id: 'option-4',
              text: 'Relaxar em casa com filmes ou séries',
              styleCategory: 'Caseiro'
            }
          ]
        }
      },
      {
        id: 'stage-question-6',
        title: 'Etapa 3: Questão 2',
        order: 2,
        type: 'question',
        config: {
          questionText: 'Qual ambiente você se sente mais confortável?',
          options: [
            {
              id: 'option-1',
              text: 'Ambientes naturais como praias ou montanhas',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
              styleCategory: 'Ativo'
            },
            {
              id: 'option-2',
              text: 'Bibliotecas, museus ou cafés',
              styleCategory: 'Intelectual'
            },
            {
              id: 'option-3',
              text: 'Bares, restaurantes ou eventos',
              styleCategory: 'Social'
            },
            {
              id: 'option-4',
              text: 'Em casa, no conforto do seu lar',
              styleCategory: 'Caseiro'
            }
          ]
        }
      },
      {
        id: 'stage-result-3',
        title: 'Etapa 4: Página de Resultado',
        order: 3,
        type: 'result',
        config: {
          title: 'Seu Estilo de Vida',
          subtitle: 'Baseado nas suas respostas, seu estilo de vida predominante é:',
          ctaText: 'Ver Recomendações',
          ctaUrl: '/resultado'
        }
      }
    ]
  }
];
