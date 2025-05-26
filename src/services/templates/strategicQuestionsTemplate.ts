
import { QuizBuilderState } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';
import { selfPerceptionQuestions } from '@/data/questions/selfPerceptionQuestions';
import { styleExperienceQuestions } from '@/data/questions/styleExperienceQuestions';
import { purchaseIntentQuestions } from '@/data/questions/purchaseIntentQuestions';
import { desiredOutcomesQuestions } from '@/data/questions/desiredOutcomesQuestions';
export const strategicQuestionsTemplate: QuizBuilderState = {
  components: [
    {
      id: generateId(),
      type: 'stageCover',
      order: 0,
      stageId: 'cover',
      data: {
        title: 'Perguntas Estratégicas',
        subtitle: 'Nos ajude a entender melhor suas necessidades',
        stageTitle: 'Início',
        stageNumber: 1,
        buttonText: 'Iniciar',
        backgroundColor: '#FFFAF0',
        textColor: '#432818'
      },
      style: {
        textColor: '#432818',
        paddingY: '2rem',
        paddingX: '1rem',
        borderRadius: '8px'
      }
    },
    ...selfPerceptionQuestions.map((question, index) => ({
      type: 'stageQuestion' as const,
      order: index + 1,
      stageId: `q${index + 1}`,
        title: question.title,
        question: 'Selecione a opção que mais se aproxima da sua realidade',
        options: question.options.map(opt => opt.text),
        multiSelect: question.multiSelect,
        displayType: 'text' as const,
        required: true,
        stageTitle: `Pergunta ${index + 1}`,
        stageNumber: index + 2,
        layout: {
          columns: 1 as const,
          direction: 'vertical' as const
        },
        backgroundColorQuestion: '#FFFAF0',
        textColorQuestion: '#432818',
        selectionIndicator: 'border' as const
    })),
    ...styleExperienceQuestions.map((question, index) => ({
      order: index + selfPerceptionQuestions.length + 1,
      stageId: `q${index + selfPerceptionQuestions.length + 1}`,
        stageTitle: `Pergunta ${index + selfPerceptionQuestions.length + 1}`,
        stageNumber: index + selfPerceptionQuestions.length + 2,
    ...purchaseIntentQuestions.map((question, index) => ({
      order: index + selfPerceptionQuestions.length + styleExperienceQuestions.length + 1,
      stageId: `q${index + selfPerceptionQuestions.length + styleExperienceQuestions.length + 1}`,
        stageTitle: `Pergunta ${index + selfPerceptionQuestions.length + styleExperienceQuestions.length + 1}`,
        stageNumber: index + selfPerceptionQuestions.length + styleExperienceQuestions.length + 2,
    ...desiredOutcomesQuestions.map((question, index) => ({
      order: index + selfPerceptionQuestions.length + styleExperienceQuestions.length + purchaseIntentQuestions.length + 1,
      stageId: `q${index + selfPerceptionQuestions.length + styleExperienceQuestions.length + purchaseIntentQuestions.length + 1}`,
        stageTitle: `Pergunta ${index + selfPerceptionQuestions.length + styleExperienceQuestions.length + purchaseIntentQuestions.length + 1}`,
        stageNumber: index + selfPerceptionQuestions.length + styleExperienceQuestions.length + purchaseIntentQuestions.length + 2,
    }))
  ],
  stages: [
      id: 'cover',
      title: 'Início',
      type: 'cover'
    ...[...selfPerceptionQuestions, ...styleExperienceQuestions, ...purchaseIntentQuestions, ...desiredOutcomesQuestions].map((_, index) => ({
      id: `q${index + 1}`,
      title: `Pergunta ${index + 1}`,
      type: 'question' as const
  ]
};
