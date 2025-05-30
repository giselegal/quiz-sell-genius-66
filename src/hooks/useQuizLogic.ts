
import { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, UserResponse, QuizResult, StyleResult } from '@/types/quiz';
import { quizQuestions } from '@/data/quizQuestions';
import { preloadImages } from '@/utils/imageManager';

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [allAnswers, setAllAnswers] = useState<Record<string, string[]>>({});
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>({});
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const totalQuestions = quizQuestions.length;

  // Preload images on initial load
  useEffect(() => {
    const preloadInitialImages = async () => {
      const imagesToPreload = quizQuestions.slice(0, 3).flatMap(question => {
        const images = [];
        if (question.imageUrl) {
          images.push({
            src: question.imageUrl,
            id: `question-${question.id}`,
            alt: question.title,
            category: 'quiz' as const,
            preloadPriority: 5
          });
        }
        question.options.forEach((option, i) => {
          if (option.imageUrl) {
            images.push({
              src: option.imageUrl,
              id: `option-${question.id}-${i}`,
              alt: option.text,
              category: 'quiz' as const,
              preloadPriority: 4
            });
          }
        });
        return images;
      });

      await preloadImages(imagesToPreload, { quality: 90 });
      setIsInitialLoadComplete(true);
    };

    preloadInitialImages();
  }, []);

  // Preload next question images
  useEffect(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      const nextQuestion = quizQuestions[currentQuestionIndex + 1];
      const imagesToPreload = [];

      if (nextQuestion.imageUrl) {
        imagesToPreload.push({
          src: nextQuestion.imageUrl,
          id: `question-${nextQuestion.id}`,
          alt: nextQuestion.title,
          category: 'quiz' as const,
          preloadPriority: 3
        });
      }

      nextQuestion.options.forEach((option, i) => {
        if (option.imageUrl) {
          imagesToPreload.push({
            src: option.imageUrl,
            id: `option-${nextQuestion.id}-${i}`,
            alt: option.text,
            category: 'quiz' as const,
            preloadPriority: 2
          });
        }
      });

      if (imagesToPreload.length > 0) {
        preloadImages(imagesToPreload, { quality: 85 });
      }
    }
  }, [currentQuestionIndex]);

  const handleAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    const question = quizQuestions.find(q => q.id === questionId);
    if (!question) return;

    // For multiselect questions, allow multiple selections
    if (question.multiSelect) {
      setCurrentAnswers(selectedOptions);
    } else {
      // For single select questions, allow exactly 3 selections
      if (selectedOptions.length <= 3) {
        setCurrentAnswers(selectedOptions);
      }
    }

    // Update allAnswers
    setAllAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // Load existing answers for the next question
      const nextQuestionId = quizQuestions[nextIndex].id;
      const existingAnswers = allAnswers[nextQuestionId] || [];
      setCurrentAnswers(existingAnswers);
    }
  }, [currentQuestionIndex, allAnswers]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      
      // Load existing answers for the previous question
      const prevQuestionId = quizQuestions[prevIndex].id;
      const existingAnswers = allAnswers[prevQuestionId] || [];
      setCurrentAnswers(existingAnswers);
    }
  }, [currentQuestionIndex, allAnswers]);

  const calculateResults = useCallback((): QuizResult => {
    const scores: Record<string, number> = {};
    let totalSelections = 0;

    // Calculate scores from main quiz answers
    Object.entries(allAnswers).forEach(([questionId, selectedOptions]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      if (!question) return;

      selectedOptions.forEach(optionId => {
        const option = question.options.find(opt => opt.id === optionId);
        if (option && option.styleCategory) {
          const styleCode = option.styleCategory;
          scores[styleCode] = (scores[styleCode] || 0) + (option.points || 1);
          totalSelections++;
        }
      });
    });

    // Add strategic answers to scores
    Object.entries(strategicAnswers).forEach(([questionId, selectedOptions]) => {
      selectedOptions.forEach(optionId => {
        // Strategic answers contribute to style calculations
        totalSelections++;
      });
    });

    // Convert to StyleResult array
    const styleResults: StyleResult[] = Object.entries(scores)
      .map(([category, score]) => ({
        category,
        score,
        percentage: Math.round((score / Math.max(totalSelections * 3, 1)) * 100)
      }))
      .sort((a, b) => b.score - a.score);

    // Ensure we have at least some results
    if (styleResults.length === 0) {
      styleResults.push({
        category: 'Elegante',
        score: 0,
        percentage: 0
      });
    }

    const primaryStyle = styleResults[0];
    const secondaryStyles = styleResults.slice(1, 4);

    // Get userName from localStorage
    const userName = localStorage.getItem('userName') || 'Usuário';

    const result: QuizResult = {
      userName,
      primaryStyle,
      secondaryStyles,
      totalSelections
    };

    // Save to localStorage
    localStorage.setItem('quiz_result', JSON.stringify(result));
    
    return result;
  }, [allAnswers, strategicAnswers]);

  const handleStrategicAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setStrategicAnswers(prev => ({
      ...prev,
      [questionId]: selectedOptions
    }));
  }, []);

  const submitQuizIfComplete = useCallback((): QuizResult | null => {
    const result = calculateResults();
    return result;
  }, [calculateResults]);

  return {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    allAnswers,
    isLastQuestion,
    totalQuestions,
    handleAnswer,
    handleNext,
    handlePrevious,
    calculateResults,
    handleStrategicAnswer,
    submitQuizIfComplete,
    isInitialLoadComplete
  };
};
