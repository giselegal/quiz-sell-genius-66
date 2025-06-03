
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
  calculateResults: () => QuizResult | null;
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

  const calculateResults = useCallback((): QuizResult | null => {
    console.log('Calculating results with answers:', answers);
    console.log('Strategic answers:', strategicAnswers);
    
    // Verificar se temos respostas suficientes
    if (answers.length !== questions.length) {
      console.warn('Not enough answers to calculate results:', answers.length, 'vs', questions.length);
      return null;
    }

    const styleCounts: { [key: string]: number } = {};

    // Contar ocorrências de cada estilo nas respostas
    answers.forEach((answer, index) => {
      console.log(`Processing answer ${index}:`, answer);
      answer.forEach(style => {
        styleCounts[style] = (styleCounts[style] || 0) + 1;
      });
    });

    console.log('Style counts:', styleCounts);

    // Converter contagem de estilos em array ordenado
    const styleArray: { category: string; score: number }[] = Object.entries(styleCounts)
      .map(([category, score]) => ({ category, score }))
      .sort((a, b) => b.score - a.score);

    if (styleArray.length === 0) {
      console.warn('No styles found in answers');
      return null;
    }

    let totalSelections = 0;
    styleArray.forEach(item => {
      totalSelections += item.score;
    });

    // Determinar estilo primário
    const primaryStyle = {
      category: styleArray[0].category,
      score: styleArray[0].score,
      percentage: (styleArray[0].score / totalSelections) * 100
    };

    // Determinar estilos secundários
    const secondaryStyles = styleArray.slice(1).map(style => ({
      category: style.category,
      score: style.score,
      percentage: (style.score / totalSelections) * 100
    }));

    const userName = user?.userName || localStorage.getItem('userName') || 'Anônimo';

    const calculatedResults: QuizResult = {
      primaryStyle: primaryStyle as StyleResult,
      secondaryStyles: secondaryStyles as StyleResult[],
      totalSelections: totalSelections,
      userName: userName
    };

    console.log('Calculated results:', calculatedResults);
    
    // Salvar no estado local
    setQuizResults(calculatedResults);
    
    // Salvar no localStorage imediatamente
    try {
      localStorage.setItem('quiz_result', JSON.stringify(calculatedResults));
      console.log('Results saved to localStorage');
    } catch (error) {
      console.error('Failed to save results to localStorage:', error);
    }

    return calculatedResults;
  }, [answers, user, questions.length]);

  const handleStrategicAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    console.log('Strategic answer received:', questionId, selectedOptions);
    setStrategicAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
  }, []);

  const submitQuizIfComplete = useCallback((): QuizResult | null => {
    console.log('Checking if quiz is complete...');
    console.log('Answers length:', answers.length, 'Questions length:', questions.length);
    console.log('Strategic answers:', Object.keys(strategicAnswers).length, 'Strategic questions:', strategicQuestions.length);
    
    // Verificar se todas as perguntas principais foram respondidas
    if (answers.length !== questions.length) {
      console.warn('Main quiz not complete');
      return null;
    }

    // Verificar se todas as perguntas estratégicas foram respondidas
    if (Object.keys(strategicAnswers).length !== strategicQuestions.length) {
      console.warn('Strategic questions not complete');
      return null;
    }

    // Calcular resultados se ainda não foram calculados
    let results = quizResults;
    if (!results) {
      console.log('Results not calculated, calculating now...');
      results = calculateResults();
    }

    if (!results) {
      console.error('Failed to calculate results');
      return null;
    }

    console.log('Quiz complete, returning results:', results);
    return results;
  }, [answers, strategicAnswers, quizResults, questions.length, calculateResults]);

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
