
import { EditorElement } from '@/hooks/useModernEditor';
import { quizQuestions } from '@/data/quizQuestions';
import { strategicQuestions } from '@/data/strategicQuestions';

export interface StepTemplate {
  components: Partial<EditorElement>[];
}

export const createQuizIntroTemplate = (stepId: string): StepTemplate => {
  return {
    components: [
      {
        type: 'brand-header',
        content: {
          logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/57_whzmff.webp',
          logoAlt: 'Gisele Galvão - Consultora de Imagem'
        },
        order: 0,
        stepId
      },
      {
        type: 'quiz-hero-title',
        content: {
          title: 'Descubra Seu Estilo Pessoal',
          subtitle: 'Um quiz completo para descobrir qual estilo combina mais com você'
        },
        order: 1,
        stepId
      },
      {
        type: 'quiz-hero-image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp',
          alt: 'Mulher elegante descobrindo seu estilo'
        },
        order: 2,
        stepId
      },
      {
        type: 'quiz-description',
        content: {
          text: 'Responda às perguntas a seguir para descobrir qual estilo de vestuário mais combina com sua personalidade e estilo de vida.'
        },
        order: 3,
        stepId
      },
      {
        type: 'quiz-input',
        content: {
          placeholder: 'Digite seu primeiro nome',
          label: 'Seu nome:'
        },
        order: 4,
        stepId
      },
      {
        type: 'quiz-button',
        content: {
          text: 'Iniciar Quiz',
          variant: 'primary'
        },
        order: 5,
        stepId
      }
    ]
  };
};

export const createQuizQuestionTemplate = (stepId: string, questionData?: any): StepTemplate => {
  const questionIndex = questionData ? parseInt(questionData.id) - 1 : 0;
  const question = questionData || quizQuestions[questionIndex] || quizQuestions[0];
  
  return {
    components: [
      {
        type: 'question-header',
        content: {
          logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/57_whzmff.webp',
          showProgress: true,
          currentStep: questionIndex + 1,
          totalSteps: quizQuestions.length
        },
        order: 0,
        stepId
      },
      {
        type: 'progress-bar',
        content: {
          current: questionIndex + 1,
          total: quizQuestions.length,
          percentage: ((questionIndex + 1) / quizQuestions.length) * 100
        },
        order: 1,
        stepId
      },
      {
        type: 'question-title',
        content: {
          title: question.title,
          questionNumber: questionIndex + 1
        },
        order: 2,
        stepId
      },
      {
        type: 'question-options-grid',
        content: {
          options: question.options,
          layout: question.type === 'image' ? 'grid' : 'list',
          multiSelect: question.multiSelect > 1,
          maxSelections: question.multiSelect
        },
        order: 3,
        stepId
      },
      {
        type: 'quiz-button',
        content: {
          text: 'Continuar',
          variant: 'primary',
          disabled: true
        },
        order: 4,
        stepId
      }
    ]
  };
};

export const createStrategicQuestionTemplate = (stepId: string, questionData?: any): StepTemplate => {
  const questionIndex = questionData ? parseInt(questionData.id.split('-')[1]) - 1 : 0;
  const question = questionData || strategicQuestions[questionIndex] || strategicQuestions[0];
  
  return {
    components: [
      {
        type: 'question-header',
        content: {
          logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/57_whzmff.webp',
          showProgress: true,
          currentStep: quizQuestions.length + questionIndex + 1,
          totalSteps: quizQuestions.length + strategicQuestions.length
        },
        order: 0,
        stepId
      },
      {
        type: 'progress-bar',
        content: {
          current: quizQuestions.length + questionIndex + 1,
          total: quizQuestions.length + strategicQuestions.length,
          percentage: ((quizQuestions.length + questionIndex + 1) / (quizQuestions.length + strategicQuestions.length)) * 100
        },
        order: 1,
        stepId
      },
      {
        type: 'question-title',
        content: {
          title: question.title,
          questionNumber: quizQuestions.length + questionIndex + 1,
          isStrategic: true
        },
        order: 2,
        stepId
      },
      {
        type: 'question-option-card',
        content: {
          options: question.options,
          layout: 'list',
          multiSelect: false,
          maxSelections: 1
        },
        order: 3,
        stepId
      },
      {
        type: 'quiz-button',
        content: {
          text: 'Continuar',
          variant: 'primary',
          disabled: true
        },
        order: 4,
        stepId
      }
    ]
  };
};

export const createQuizTransitionTemplate = (stepId: string): StepTemplate => {
  return {
    components: [
      {
        type: 'brand-header',
        content: {
          logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/57_whzmff.webp',
          logoAlt: 'Gisele Galvão - Consultora de Imagem'
        },
        order: 0,
        stepId
      },
      {
        type: 'transition-hero',
        content: {
          title: 'Agora vamos conhecer você melhor...',
          subtitle: 'Algumas perguntas estratégicas para personalizar ainda mais seu resultado',
          imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp'
        },
        order: 1,
        stepId
      },
      {
        type: 'transition-continue',
        content: {
          text: 'Continuar',
          variant: 'primary'
        },
        order: 2,
        stepId
      }
    ]
  };
};

export const createQuizResultTemplate = (stepId: string): StepTemplate => {
  return {
    components: [
      {
        type: 'brand-header',
        content: {
          logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/57_whzmff.webp',
          logoAlt: 'Gisele Galvão - Consultora de Imagem'
        },
        order: 0,
        stepId
      },
      {
        type: 'result-hero',
        content: {
          title: 'Parabéns! Descobrimos seu estilo!',
          subtitle: 'Baseado nas suas respostas, identificamos seu perfil de estilo pessoal'
        },
        order: 1,
        stepId
      },
      {
        type: 'result-title',
        content: {
          dynamicTitle: true,
          placeholder: 'Seu estilo é: [ESTILO_DESCOBERTO]'
        },
        order: 2,
        stepId
      },
      {
        type: 'result-subtitle',
        content: {
          dynamicDescription: true,
          placeholder: 'Descrição personalizada do seu estilo...'
        },
        order: 3,
        stepId
      },
      {
        type: 'offer-section',
        content: {
          title: 'Quer saber mais sobre seu estilo?',
          description: 'Tenho algo especial preparado para você...',
          ctaText: 'Ver Oferta Especial',
          ctaVariant: 'primary'
        },
        order: 4,
        stepId
      }
    ]
  };
};

export const createOfferPageTemplate = (stepId: string): StepTemplate => {
  return {
    components: [
      {
        type: 'brand-header',
        content: {
          logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735479/57_whzmff.webp',
          logoAlt: 'Gisele Galvão - Consultora de Imagem'
        },
        order: 0,
        stepId
      },
      {
        type: 'offer-section',
        content: {
          title: 'Guia Completo do Seu Estilo Personal',
          subtitle: 'Transforme sua imagem com orientações personalizadas',
          features: [
            'Guia completo do seu estilo descoberto',
            'Paleta de cores personalizada',
            'Sugestões de looks para diferentes ocasiões',
            'Lista de compras estratégicas',
            'Acesso vitalício ao material'
          ]
        },
        order: 1,
        stepId
      },
      {
        type: 'price-highlight',
        content: {
          originalPrice: 'R$ 497',
          currentPrice: 'R$ 197',
          discount: '60% OFF',
          urgency: 'Oferta por tempo limitado'
        },
        order: 2,
        stepId
      },
      {
        type: 'cta-button',
        content: {
          text: 'Quero Meu Guia Personalizado',
          variant: 'primary',
          size: 'large'
        },
        order: 3,
        stepId
      }
    ]
  };
};

export const getStepTemplate = (stepType: string, stepId: string, questionData?: any): StepTemplate => {
  switch (stepType) {
    case 'quiz-intro':
      return createQuizIntroTemplate(stepId);
    case 'quiz-question':
      return createQuizQuestionTemplate(stepId, questionData);
    case 'strategic-question':
      return createStrategicQuestionTemplate(stepId, questionData);
    case 'quiz-transition':
      return createQuizTransitionTemplate(stepId);
    case 'quiz-result':
      return createQuizResultTemplate(stepId);
    case 'offer-page':
      return createOfferPageTemplate(stepId);
    default:
      return { components: [] };
  }
};
