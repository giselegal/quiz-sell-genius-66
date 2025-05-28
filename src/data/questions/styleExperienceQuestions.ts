
import { QuizQuestion } from '../../types/quiz';

export const styleExperienceQuestions: QuizQuestion[] = [
  {
    id: 'strategic-3',
    title: 'Com que frequência você se pega pensando: "Com que roupa eu vou?" — mesmo com o guarda-roupa cheio?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193438/5702e50d-7785-426a-a0c6-3c47af176523_p9acfp.webp',
    options: [
      {
        id: 'strategic-3-1',
        text: 'Quase todos os dias — é sempre uma indecisão'
      },
      {
        id: 'strategic-3-2',
        text: 'Sempre que tenho um compromisso importante'
      },
      {
        id: 'strategic-3-3',
        text: 'Às vezes, mas me sinto limitada nas escolhas'
      },
      {
        id: 'strategic-3-4',
        text: 'Raramente — já me sinto segura ao me vestir'
      }
    ]
  },
  {
    id: 'strategic-4',
    title: 'Qual desses objetivos mais representa o que você deseja com sua imagem pessoal?',
    type: 'text',
    multiSelect: 1,
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515862/Sem_nome_1000_x_1000_px_1280_x_720_px_vmqk3j.webp',
    options: [
      {
        id: 'strategic-4-1',
        text: 'Me sentir confiante e com presença'
      },
      {
        id: 'strategic-4-2',
        text: 'Ser percebida com mais elegância e autoridade'
      },
      {
        id: 'strategic-4-3',
        text: 'Vestir minha autenticidade com leveza'
      },
      {
        id: 'strategic-4-4',
        text: 'Ser reconhecida e admirada pela imagem que transmito'
      }
    ]
  }
];
