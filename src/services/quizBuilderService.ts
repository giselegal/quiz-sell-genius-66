
import { QuizBuilderState, QuizComponentData, QuizComponentType, QuizStage } from '@/types/quizBuilder';
import { generateId } from '@/utils/idGenerator';
import { ResultPageConfig } from '@/types/resultPageConfig';
// Function to create a basic quiz builder state with initial stages
export const generateInitialStages = () => {
  const welcomeStage: QuizStage = {
    id: generateId(),
    title: 'Bem-vindo',
    type: 'cover',
    order: 0
  };
  
  const questionStage: QuizStage = {
    title: 'Pergunta 1',
    type: 'question',
    order: 1
  const resultStage: QuizStage = {
    title: 'Seu Resultado',
    type: 'result',
    order: 2
  const stages = [welcomeStage, questionStage, resultStage];
  // Create default components
  const components: QuizComponentData[] = [
    {
      id: generateId(),
      type: 'headline',
      stageId: welcomeStage.id,
      data: {
        title: 'Quiz de Estilo Pessoal',
        subtitle: 'Descubra seu estilo predominante',
        alignment: 'center'
      },
      order: 0
    },
      type: 'text',
      stageId: questionStage.id,
        text: 'Qual opção descreve melhor seu estilo?',
      type: 'quizResult',
      stageId: resultStage.id,
        title: 'Seu Resultado de Estilo Pessoal',
        showShare: true,
    }
  ];
  return { stages, components };
};
export const createBuilderStateFromQuiz = (
  quizQuestions: any[],
  title: string = 'Quiz de Estilo Pessoal',
  subtitle: string = 'Descubra seu estilo predominante',
  resultTitle: string = 'Seu Resultado de Estilo Pessoal'
) => {
  // Create stages
  // Create a question stage for each question
  const questionStages: QuizStage[] = quizQuestions.map((_, index) => ({
    title: `Pergunta ${index + 1}`,
    order: index + 1
  }));
    order: questionStages.length + 1
  const stages = [welcomeStage, ...questionStages, resultStage];
  // Create welcome components
  const welcomeComponents: QuizComponentData[] = [
        title,
        subtitle,
      type: 'button',
        text: 'Iniciar Quiz',
        action: 'next',
      order: 1
  // Create question components
  const questionComponents: QuizComponentData[] = [];
  quizQuestions.forEach((question, qIndex) => {
    questionComponents.push({
      stageId: questionStages[qIndex].id,
        text: question.text || `Pergunta ${qIndex + 1}`,
    });
    
    // Add options
    if (question.options && Array.isArray(question.options)) {
      question.options.forEach((option, oIndex) => {
        questionComponents.push({
          id: generateId(),
          type: 'multipleChoice',
          stageId: questionStages[qIndex].id,
          data: {
            text: option.text || `Opção ${oIndex + 1}`,
            value: option.value || String(oIndex),
            image: option.image || '',
            alignment: 'center'
          },
          order: oIndex + 1
        });
      });
  });
  // Create result component
  const resultComponents: QuizComponentData[] = [
        title: resultTitle,
  const components = [...welcomeComponents, ...questionComponents, ...resultComponents];
// Add function to convert ResultPageConfig to QuizBuilderState
export const createBuilderStateFromResultPage = (config: ResultPageConfig): QuizBuilderState => {
  const resultStageId = generateId();
  const stage: QuizStage = {
    id: resultStageId,
    title: 'Página de Resultado',
  // Convert blocks from ResultPageConfig to QuizComponentData
  const components: QuizComponentData[] = config.blocks?.map((block, index) => ({
    type: block.type as QuizComponentType, // Fixing this line to use the imported QuizComponentType
    stageId: resultStageId,
    data: block.content,
    order: index
  })) || [];
  return {
    stages: [stage],
    components
export const loadQuizResultConfig = (styleType: string) => {
  try {
    const configKey = `result_page_config_${styleType}`;
    const savedConfig = localStorage.getItem(configKey);
    if (savedConfig) {
      return JSON.parse(savedConfig);
    return null;
  } catch (error) {
    console.error('Error loading quiz result config:', error);
  }
