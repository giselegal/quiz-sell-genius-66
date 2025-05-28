import { QuizQuestion } from '../../types/quiz';
export const stylePreferencesQuestions: QuizQuestion[] = [
  {
    id: '5',
    title: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
    type: 'both',
    multiSelect: 3,
    options: [
      {
        id: '5a',
        text: 'Estampas naturais, listras, xadrez, tons terrosos.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735367/20_ytqj2g.webp',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: '5b',
        text: 'Estampas clássicas e atemporais.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735368/21_o7wkte.webp',
        styleCategory: 'Clássico',
      },
      {
        id: '5c',
        text: 'Estampas geométricas, animal print, grafismos.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735368/22_ytqj2g.webp',
        styleCategory: 'Contemporâneo',
      },
      {
        id: '5d',
        text: 'Estampas sofisticadas, arabescos, poás.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735369/23_ytqj2g.webp',
        styleCategory: 'Elegante',
      },
      {
        id: '5e',
        text: 'Estampas florais delicadas, tons pastel.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735370/24_ytqj2g.webp',
        styleCategory: 'Romântico',
      },
      {
        id: '5f',
        text: 'Estampas sensuais, animal print, cores quentes.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735370/25_ytqj2g.webp',
        styleCategory: 'Sexy',
      },
      {
        id: '5g',
        text: 'Estampas impactantes, contrastes fortes.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/26_ytqj2g.webp',
        styleCategory: 'Dramático',
      },
      {
        id: '5h',
        text: 'Estampas criativas, mix de cores e formas.',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/27_ytqj2g.webp',
        styleCategory: 'Criativo',
      }
    ]
  },
  {
    id: '10',
    title: 'VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...',
    type: 'text',
    options: [
      {
        id: '10a',
        text: 'São fáceis de cuidar.',
      },
      {
        id: '10b',
        text: 'São de excelente qualidade.',
      },
      {
        id: '10c',
        text: 'São fáceis de cuidar e modernos.',
      },
      {
        id: '10d',
        text: 'São sofisticados.',
      },
      {
        id: '10e',
        text: 'São delicados.',
      },
      {
        id: '10f',
        text: 'São perfeitos ao meu corpo.',
      },
      {
        id: '10g',
        text: 'São diferentes, e trazem um efeito para minha roupa.',
      },
      {
        id: '10h',
        text: 'São exclusivos, criam identidade no look.',
      },
    ]
  }
];
