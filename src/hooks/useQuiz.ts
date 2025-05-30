
import { StyleResult, QuizResult } from '@/types/quiz';
import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useQuizLogic } from './useQuizLogic';

export const useQuiz = () => {
  const quizLogic = useQuizLogic();
  const [isSubmittingResults, setIsSubmittingResults] = useState(false);
  const navigate = useNavigate();
  
  // Extract primaryStyle and secondaryStyles from quiz results
  const primaryStyle = quizLogic.allAnswers && Object.keys(quizLogic.allAnswers).length > 0 
    ? quizLogic.calculateResults().primaryStyle 
    : null;
  const secondaryStyles = quizLogic.allAnswers && Object.keys(quizLogic.allAnswers).length > 0 
    ? quizLogic.calculateResults().secondaryStyles 
    : [];

  // Get quiz result from localStorage or calculate it
  const getQuizResult = (): QuizResult | null => {
    try {
      // First try to get from localStorage
      const savedResult = localStorage.getItem('quiz_result');
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        return parsedResult;
      }
      
      // If not found and we have answers, calculate it
      if (quizLogic.allAnswers && Object.keys(quizLogic.allAnswers).length > 0) {
        return quizLogic.calculateResults();
      }
      
      return null;
    } catch (error) {
      console.error('Error loading quiz result:', error);
      return null;
    }
  };

  const startQuiz = async (name: string, email: string, quizId: string) => {
    try {
      console.log(`Starting quiz for ${name} (${email}) with quiz ID ${quizId}`);
      return { id: '1', name, email };
    } catch (error) {
      toast({
        title: "Erro ao iniciar o quiz",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const submitAnswers = async (
    answers: Array<{ questionId: string; optionId: string; points: number }>
  ) => {
    try {
      console.log('Submitting answers:', answers);
    } catch (error) {
      toast({
        title: "Erro ao salvar respostas",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const submitResults = useCallback(async () => {
    try {
      setIsSubmittingResults(true);
      console.log("Submitting results");
      
      const finalResults = quizLogic.calculateResults();
      
      if (finalResults) {
        console.log("Final results:", finalResults);
        // Navigate or handle completion
      } else {
        toast({
          title: "Erro ao calcular resultados",
          description: "Não foi possível finalizar o quiz. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting results:", error);
      toast({
        title: "Erro ao submeter resultados",
        description: "Ocorreu um problema ao finalizar o quiz.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingResults(false);
    }
  }, [quizLogic, navigate]);

  const resetQuiz = useCallback(() => {
    // Reset quiz logic by reloading or clearing state
    window.location.reload();
  }, []);

  return {
    ...quizLogic,
    primaryStyle,
    secondaryStyles,
    isSubmittingResults,
    startQuiz,
    submitAnswers,
    submitResults,
    resetQuiz,
    quizResult: getQuizResult()
  };
};

export default useQuiz;
