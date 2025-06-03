
import { useState, useCallback, useEffect } from 'react';
import { strategicQuestions } from '@/data/strategicQuestions';
import { Question, QuizResult, StyleResult, UserResponse } from '@/types/quiz';
import { useAuth } from '../context/AuthContext';
import { getQuizQuestions } from '@/services/quizService';
import { preloadImages } from '@/utils/imageManager';

interface QuizLogic {
  currentQuestion: Question | undefined;
  currentQuestionIndex: number;
  currentAnswers: string[];
  isLastQuestion: boolean;
  handleAnswer: (questionId: string, selectedOptions: string[]) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  totalQuestions: number;
  calculateResults: () => void;
  quizResults: QuizResult | null;
  handleStrategicAnswer: (questionId: string, selectedOptions: string[]) => void;
  submitQuizIfComplete: () => QuizResult | null;
  isInitialLoadComplete: boolean;
}

const useQuizLogic = (): QuizLogic => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<QuizResult | null>(null);
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>({});
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await getQuizQuestions();
        setQuestions(fetchedQuestions);

        // Pré-carregar imagens da primeira pergunta
        if (fetchedQuestions.length > 0 && fetchedQuestions[0].imageUrl) {
          preloadImages([{ 
            src: fetchedQuestions[0].imageUrl, 
            id: `question-0`,
            alt: 'First Question',
            category: 'quiz',
            preloadPriority: 5 
          }], { quality: 90 });
        }
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setIsInitialLoadComplete(true);
      }
    };

    loadQuestions();
  }, []);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = selectedOptions;
      return newAnswers;
    });
  }, [currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      // Pré-carregar imagens para a próxima pergunta
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length && questions[nextIndex].imageUrl) {
        preloadImages([{ 
          src: questions[nextIndex].imageUrl, 
          id: `question-${nextIndex}`,
          alt: `Question ${nextIndex}`,
          category: 'quiz',
          preloadPriority: 5 
        }], { quality: 90 });
      }
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions]);

  const handlePrevious = useCallback(() => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  }, []);

  const calculateResults = useCallback(() => {
    const styleCounts: { [key: string]: number } = {};

    // Contar ocorrências de cada estilo nas respostas
    answers.forEach(answer => {
      answer.forEach(style => {
        styleCounts[style] = (styleCounts[style] || 0) + 1;
      });
    });

    // Converter contagem de estilos em array ordenado
    const styleArray: { category: string; score: number }[] = Object.entries(styleCounts)
      .map(([category, score]) => ({ category, score }))
      .sort((a, b) => b.score - a.score);

    let totalSelections = 0;
    styleArray.forEach(item => {
      totalSelections += item.score;
    });

    // Determinar estilo primário
    const primaryStyle = styleArray.length > 0 ? {
      category: styleArray[0].category,
      score: styleArray[0].score,
      percentage: (styleArray[0].score / totalSelections) * 100
    } : null;

    // Determinar estilos secundários
    const secondaryStyles = styleArray.slice(1).map(style => ({
      category: style.category,
      score: style.score,
      percentage: (style.score / totalSelections) * 100
    }));

    const userName = user?.userName || localStorage.getItem('userName') || 'Anônimo';

    const quizResults: QuizResult = {
      primaryStyle: primaryStyle as StyleResult,
      secondaryStyles: secondaryStyles as StyleResult[],
      totalSelections: totalSelections,
      userName: userName
    };

    setQuizResults(quizResults);
  }, [answers, user]);

  const handleStrategicAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setStrategicAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
  }, []);

  const submitQuizIfComplete = useCallback(() => {
    if (answers.length === questions.length && strategicAnswers && Object.keys(strategicAnswers).length === strategicQuestions.length) {
      const userName = user?.userName || localStorage.getItem('userName') || 'Anônimo';
      
      const results = {
        primaryStyle: quizResults?.primaryStyle as StyleResult,
        secondaryStyles: quizResults?.secondaryStyles as StyleResult[],
        totalSelections: quizResults?.totalSelections as number,
        userName: userName
      };
      
      return results;
    }
    return null;
  }, [answers, strategicAnswers, quizResults, user, questions.length]);

  return {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers: answers[currentQuestionIndex] || [],
    isLastQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions,
    calculateResults,
    quizResults,
    handleStrategicAnswer,
    submitQuizIfComplete,
    isInitialLoadComplete
  };
};

export { useQuizLogic };
