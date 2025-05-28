
import { QuizComponentType } from '@/types/quizBuilder';
export const getDefaultData = (type: QuizComponentType) => {
  switch (type) {
    case 'header':
      return {
        title: 'Título do Quiz',
        subtitle: 'Descrição breve do quiz'
      };
    
    case 'text':
        text: 'Digite seu texto aqui. Este é um parágrafo de exemplo para o seu quiz.'
    case 'image':
        imageUrl: '',
        alt: 'Imagem do quiz',
        caption: ''
    case 'multipleChoice':
        question: 'Digite sua pergunta aqui?',
        options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
        optionImages: [],
        optionStyleCategories: ['Natural', 'Clássico', 'Contemporâneo', 'Elegante'],
        multiSelect: 3,
        required: true,
        displayType: 'text' as 'text' | 'image' | 'both'
    case 'singleChoice':
        required: true
    case 'scale':
        minLabel: 'Discordo totalmente',
        maxLabel: 'Concordo totalmente',
        steps: 5,
    case 'openEnded':
        placeholder: 'Digite sua resposta...',
    case 'benefitsList':
        title: 'Benefícios',
        benefits: [
          'Benefício 1 - Descreva o primeiro benefício',
          'Benefício 2 - Descreva o segundo benefício',
          'Benefício 3 - Descreva o terceiro benefício'
        ]
    case 'faq':
        title: 'Perguntas Frequentes',
        items: [
          { question: 'Pergunta 1?', answer: 'Resposta para a pergunta 1.' },
          { question: 'Pergunta 2?', answer: 'Resposta para a pergunta 2.' }
    case 'quizResult':
        title: 'Seu Resultado',
        description: 'Descrição do resultado do quiz baseado nas respostas fornecidas.',
        showSecondaryStyles: true,
        showOffer: true
    case 'stageCover':
        stageTitle: 'Capa do Quiz',
        headline: 'Bem-vindo ao Quiz!',
        subheadline: 'Descubra seu estilo respondendo às perguntas a seguir.',
        buttonText: 'Começar'
    case 'stageQuestion':
        stageTitle: 'Pergunta',
        stageNumber: 1,
        progressText: 'Questão {current} de {total}'
    case 'stageResult':
        stageTitle: 'Resultado',
        headline: 'Seu Resultado',
        subheadline: 'Confira o resultado baseado nas suas respostas.'
    default:
      return {};
  }
};
