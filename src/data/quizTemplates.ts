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
        id: 'stage-question-1',
        title: 'Etapa 2: Questão 1',
        order: 1,
        type: 'question',
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
              id: 'option-2',
              text: 'Peças clássicas e atemporais',
              styleCategory: 'Clássico'
              id: 'option-3',
              text: 'Looks modernos e minimalistas',
              styleCategory: 'Contemporâneo'
              id: 'option-4',
              text: 'Peças sofisticadas e refinadas',
              styleCategory: 'Elegante'
            }
          ]
        id: 'stage-question-2',
        title: 'Etapa 3: Questão 2',
        order: 2,
          questionText: 'Qual dessas paletas de cores mais combina com você?',
              text: 'Cores neutras e terrosas',
              text: 'Cores tradicionais e sóbrias',
              text: 'Cores vibrantes e contrastantes',
              styleCategory: 'Criativo'
              text: 'Cores suaves e românticas',
              styleCategory: 'Romântico'
        id: 'stage-result-1',
        title: 'Etapa 4: Página de Resultado',
        order: 3,
        type: 'result',
          title: 'Seu Estilo Pessoal',
          subtitle: 'Baseado nas suas respostas, seu estilo predominante é:',
          ctaText: 'Ver Guia Completo',
          ctaUrl: '/resultado'
      }
    ]
  },
    id: 'template-consultoria-imagem',
    name: 'Quiz de Consultoria de Imagem',
    description: 'Template para consultoria de imagem profissional, com foco em coloração pessoal e formato corporal.',
    thumbnail: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
          title: 'Descubra sua Coloração Pessoal',
          subtitle: 'Responda algumas perguntas e descubra quais cores valorizam mais sua beleza natural',
          buttonText: 'Começar Análise',
          backgroundImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp'
          questionText: 'Qual a cor natural dos seus olhos?',
              text: 'Castanho escuro',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
              styleCategory: 'Outono'
              text: 'Azul ou verde',
              styleCategory: 'Verão'
              text: 'Castanho claro ou mel',
              styleCategory: 'Primavera'
              text: 'Preto ou castanho muito escuro',
              styleCategory: 'Inverno'
          questionText: 'Qual a cor natural do seu cabelo?',
              text: 'Loiro dourado ou ruivo',
              text: 'Castanho médio ou escuro',
              text: 'Loiro claro ou cinza',
          title: 'Sua Coloração Pessoal',
          subtitle: 'Baseado nas suas respostas, sua coloração pessoal é:',
          ctaText: 'Ver Paleta Completa',
    id: 'template-estilo-vida',
    name: 'Quiz de Estilo de Vida',
    description: 'Template para identificar o estilo de vida e preferências pessoais dos participantes.',
    thumbnail: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
          title: 'Descubra seu Estilo de Vida',
          subtitle: 'Responda algumas perguntas e descubra qual estilo de vida combina mais com você',
          backgroundImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp'
          questionText: 'Como você prefere passar seu tempo livre?',
          questionType: 'text',
              text: 'Atividades ao ar livre e esportes',
              styleCategory: 'Ativo'
              text: 'Leitura e atividades culturais',
              styleCategory: 'Intelectual'
              text: 'Encontros sociais e festas',
              styleCategory: 'Social'
              text: 'Relaxar em casa com filmes ou séries',
              styleCategory: 'Caseiro'
          questionText: 'Qual ambiente você se sente mais confortável?',
              text: 'Ambientes naturais como praias ou montanhas',
              imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
              text: 'Bibliotecas, museus ou cafés',
              text: 'Bares, restaurantes ou eventos',
              text: 'Em casa, no conforto do seu lar',
          title: 'Seu Estilo de Vida',
          subtitle: 'Baseado nas suas respostas, seu estilo de vida predominante é:',
          ctaText: 'Ver Recomendações',
  }
];
