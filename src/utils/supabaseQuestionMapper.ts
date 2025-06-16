
import { useSupabaseQuestions } from '@/hooks/useSupabaseQuestions';

// Função para obter questão específica por ID do step
export const getQuestionByStepId = (stepId: string, questions: any[], strategicQuestions: any[]) => {
  console.log(`🔍 Looking for question data for step: ${stepId}`);
  
  // Para questões regulares (step-question-1 a step-question-10)
  if (stepId.startsWith('step-question-')) {
    const questionNumber = stepId.replace('step-question-', '');
    const question = questions.find(q => q.id === questionNumber);
    
    if (question) {
      console.log(`✅ Found regular question for ${stepId}:`, question.title);
      return question;
    }
  }
  
  // Para questões estratégicas (step-strategic-strategic-1 a step-strategic-strategic-7)
  if (stepId.startsWith('step-strategic-')) {
    const strategicPart = stepId.replace('step-strategic-', '');
    const question = strategicQuestions.find(q => q.id === strategicPart);
    
    if (question) {
      console.log(`✅ Found strategic question for ${stepId}:`, question.title);
      return question;
    }
  }
  
  console.warn(`⚠️ No question found for step: ${stepId}`);
  return null;
};

// Hook para usar em componentes que precisam de dados de questões
export const useQuestionData = () => {
  const { questions, strategicQuestions, loading, error } = useSupabaseQuestions();
  
  const getQuestionForStep = (stepId: string) => {
    return getQuestionByStepId(stepId, questions, strategicQuestions);
  };
  
  return {
    questions,
    strategicQuestions,
    loading,
    error,
    getQuestionForStep
  };
};
