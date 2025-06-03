
import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { UserResponse } from '@/types/quiz';
import { toast } from './ui/use-toast';
import { QuizContainer } from './quiz/QuizContainer';
import { QuizContent } from './quiz/QuizContent';
import { QuizTransitionManager } from './quiz/QuizTransitionManager';
import QuizNavigation from './quiz/QuizNavigation';
import QuizIntro from './QuizIntro'; 
import { strategicQuestions } from '@/data/strategicQuestions';
import { useAuth } from '../context/AuthContext';
import { trackQuizStart, trackQuizAnswer, trackQuizComplete, trackResultView } from '../utils/analytics';
import { preloadImages } from '@/utils/imageManager';
import LoadingManager from './quiz/LoadingManager';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MainTransition } from './quiz/MainTransition';
import { EnchantedBackground, MorphingProgress } from './effects/EnchantedEffects';
import '../styles/enchanted-effects.css';

const QuizPage: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  
  const [showIntro, setShowIntro] = useState(true);
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [showingTransition, setShowingTransition] = useState(false);
  const [showingFinalTransition, setShowingFinalTransition] = useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>({});
  const [quizStartTracked, setQuizStartTracked] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [pageIsReady, setPageIsReady] = useState(false);

  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions,
    calculateResults,
    handleStrategicAnswer: saveStrategicAnswer,
    submitQuizIfComplete,
    isInitialLoadComplete
  } = useQuizLogic();

  useEffect(() => {
    if (!showIntro) {
      const savedName = localStorage.getItem('userName');
      if (!savedName || !savedName.trim()) {
        setShowIntro(true);
      }
    }
  }, [showIntro]);

  useEffect(() => {
    if (isInitialLoadComplete) {
      setPageIsReady(true);
    }
  }, [isInitialLoadComplete]);

  useEffect(() => {
    const totalSteps = totalQuestions + strategicQuestions.length;
    let currentStep = 0;
    if (showingStrategicQuestions) {
      currentStep = totalQuestions + currentStrategicQuestionIndex;
    } else if (!showingTransition && !showingFinalTransition) {
      currentStep = currentQuestionIndex;
    }
    const percentage = Math.round((currentStep / totalSteps) * 100);
    setProgressPercentage(percentage);
  }, [currentQuestionIndex, currentStrategicQuestionIndex, showingStrategicQuestions, showingTransition, showingFinalTransition, totalQuestions]);

  useEffect(() => {
    if (!quizStartTracked && !showIntro) {
      localStorage.setItem('quiz_start_time', Date.now().toString());
      const userName = user?.userName || localStorage.getItem('userName') || 'Anônimo';
      const userEmail = user?.email || localStorage.getItem('userEmail');
      trackQuizStart(userName, userEmail);
      setQuizStartTracked(true);
    }
  }, [quizStartTracked, user, showIntro]);

  const actualCurrentQuestionData = showingStrategicQuestions
    ? strategicQuestions[currentStrategicQuestionIndex]
    : currentQuestion;

  const calculatedRequiredOptions = actualCurrentQuestionData?.multiSelect !== undefined 
    ? actualCurrentQuestionData.multiSelect 
    : (showingStrategicQuestions ? 1 : 3);

  const handleStartQuiz = (name: string) => {
    if (!name || !name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, digite seu nome para continuar com o quiz.",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem('userName', name.trim());
    
    if (login) {
      login(name);
    }
    
    setShowIntro(false);
    
    // Pré-carregar imagens do quiz
    if (currentQuestion?.imageUrl) {
      preloadImages([{ 
        src: currentQuestion.imageUrl, 
        id: `question-0`,
        alt: 'First Question',
        category: 'quiz',
        preloadPriority: 5 
      }], { quality: 90 });
    }
    
    console.log(`Quiz iniciado por ${name}`);
  };

  const handleProceedToStrategic = () => {
    setShowingTransition(false);
    setShowingStrategicQuestions(true);
  };

  const recordStrategicAnswer = useCallback((response: UserResponse) => {
    try {
      const finalOptions = response.selectedOptions.length > 0 
        ? [response.selectedOptions[response.selectedOptions.length - 1]] 
        : [];
      
      if (finalOptions.length === 0) {
        const previousAnswer = strategicAnswers[response.questionId];
        if (previousAnswer && previousAnswer.length > 0) {
          return;
        }
      }
      
      setStrategicAnswers(prev => ({
        ...prev,
        [response.questionId]: finalOptions
      }));
      
      saveStrategicAnswer(response.questionId, finalOptions);
      
      trackQuizAnswer(
        response.questionId, 
        finalOptions,
        currentStrategicQuestionIndex + totalQuestions,
        totalQuestions + strategicQuestions.length
      );
      const currentProgress = ((currentStrategicQuestionIndex + totalQuestions + 1) / 
                              (totalQuestions + strategicQuestions.length)) * 100;
      if (currentProgress >= 45 && currentProgress <= 55) {
        trackQuizAnswer('quiz_middle_point', ['reached'], 
                       currentStrategicQuestionIndex + totalQuestions,
                       totalQuestions + strategicQuestions.length);
      }
    } catch (error) {
      toast({
        title: "Erro ao registrar resposta estratégica",
        description: "Não foi possível processar sua resposta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [currentStrategicQuestionIndex, saveStrategicAnswer, totalQuestions, strategicQuestions.length]);

  const goToNextStrategicQuestion = useCallback(() => {
    if (currentStrategicQuestionIndex < strategicQuestions.length - 1) {
      const nextIndex = currentStrategicQuestionIndex + 1;
      if (nextIndex < strategicQuestions.length) {
        const nextQuestionData = strategicQuestions[nextIndex];
        if (nextQuestionData.imageUrl && 
            !['strategic-3', 'strategic-4', 'strategic-5'].includes(nextQuestionData.id)) {
          preloadImages([{ 
            src: nextQuestionData.imageUrl, 
            id: `strategic-${nextIndex}`,
            category: 'strategic',
            alt: `Question ${nextIndex}`,
            preloadPriority: 5 
          }], { quality: 90 });
        }
        
        const optionImages = nextQuestionData.options
          .map(option => option.imageUrl)
          .filter(Boolean) as string[];
        if (optionImages.length > 0) {
          preloadImages(optionImages.map((src, i) => ({ 
            src, 
            id: `strategic-${nextIndex}-option-${i}`,
            category: 'strategic',
            alt: `Option ${i}`,
            preloadPriority: 4
          })), { quality: 85, batchSize: 3 });
        }
      }
      setCurrentStrategicQuestionIndex(prev => prev + 1);
    }
  }, [currentStrategicQuestionIndex, strategicQuestions]);

  const handleAnswerSubmitInternal = useCallback((response: UserResponse) => {
    try {
      handleAnswer(response.questionId, response.selectedOptions);
      trackQuizAnswer(
        response.questionId, 
        response.selectedOptions, 
        currentQuestionIndex, 
        totalQuestions
      );
      const currentProgress = ((currentQuestionIndex + 1) / 
                              (totalQuestions + strategicQuestions.length)) * 100;
      if (currentProgress >= 20 && currentProgress <= 30) {
        trackQuizAnswer('quiz_first_quarter', ['reached'], 
                       currentQuestionIndex,
                       totalQuestions + strategicQuestions.length);
      }
    } catch (error) {
      toast({
        title: "Erro na submissão da resposta",
        description: "Não foi possível processar sua resposta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [currentQuestionIndex, handleAnswer, totalQuestions, strategicQuestions.length]);

  const handleShowResult = useCallback(() => {
    try {
      const results = submitQuizIfComplete();
      localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
      
      localStorage.setItem('preloadedResults', 'true');
      localStorage.setItem('quizCompletedAt', Date.now().toString());
      
      if (results?.primaryStyle) {
        trackResultView(results.primaryStyle.category);
      }
      
      navigate('/resultado');
      
    } catch (error) {
      console.error('Erro ao navegar para a página de resultados:', error);
      toast({
        title: "Erro ao mostrar resultado",
        description: "Não foi possível carregar o resultado. Por favor, tente novamente.",
        variant: "destructive",
      });
      navigate('/resultado');
    }
  }, [strategicAnswers, submitQuizIfComplete, navigate]);

  const handleNextClickInternal = useCallback(() => {
    if (!showingStrategicQuestions) {
      const currentNormalSelectedCount = currentAnswers?.length || 0;
      const canActuallyProceed = currentNormalSelectedCount === calculatedRequiredOptions;
      if (!canActuallyProceed) {
        return; 
      }
      if (!isLastQuestion) {
        handleNext(); 
      } else {
        calculateResults();
        setShowingTransition(true);
        trackQuizAnswer(
          "quiz_main_complete", 
          ["completed"], 
          totalQuestions, 
          totalQuestions + strategicQuestions.length
        );
      }
    }
  }, [
    showingStrategicQuestions, 
    currentAnswers, 
    calculatedRequiredOptions, 
    isLastQuestion, 
    handleNext, 
    calculateResults, 
    totalQuestions,
    strategicQuestions.length
  ]);

  const currentQuestionTypeForNav = showingStrategicQuestions ? 'strategic' : 'normal';
  
  let finalSelectedCountForNav: number;
  let actualCanProceed: boolean; 
  let visualCanProceedButton: boolean;
  if (showingStrategicQuestions) {
    const strategicQuestionId = actualCurrentQuestionData?.id;
    const currentStrategicSelectedCount = strategicQuestionId ? (strategicAnswers[strategicQuestionId]?.length || 0) : 0;
    finalSelectedCountForNav = currentStrategicSelectedCount;
    actualCanProceed = currentStrategicSelectedCount >= calculatedRequiredOptions;
    visualCanProceedButton = actualCanProceed;
  } else {
    const currentNormalSelectedCount = currentAnswers?.length || 0;
    finalSelectedCountForNav = currentNormalSelectedCount;
    actualCanProceed = currentNormalSelectedCount === calculatedRequiredOptions;
    if (typeof calculatedRequiredOptions === 'number' && calculatedRequiredOptions >= 3) {
      visualCanProceedButton = currentNormalSelectedCount >= 3;
    } else {
      visualCanProceedButton = currentNormalSelectedCount >= calculatedRequiredOptions;
    }
  }

  const renderQuizNavigation = () => (
    <QuizNavigation
      canProceed={visualCanProceedButton} 
      onNext={
        showingStrategicQuestions && actualCurrentQuestionData
          ? (currentStrategicQuestionIndex === strategicQuestions.length - 1 
              ? () => { 
                  setShowingFinalTransition(true);  
                  trackQuizComplete();
                }
              : goToNextStrategicQuestion
            )
          : handleNextClickInternal
      }
      onPrevious={
        showingStrategicQuestions
          ? () => setCurrentStrategicQuestionIndex(prev => Math.max(0, prev - 1))
          : handlePrevious
      }
      currentQuestionType={currentQuestionTypeForNav}
      selectedOptionsCount={finalSelectedCountForNav}
      isLastQuestion={
        showingStrategicQuestions &&
        currentStrategicQuestionIndex === strategicQuestions.length - 1
      }
    />
  );

  useEffect(() => {
    if (showingFinalTransition) {
      const resultImages = [
        '/assets/results/background.jpg',
        '/assets/results/share-icon.svg',
      ];
      
      preloadImages(resultImages.map((src, i) => ({ 
        src, 
        id: `result-resource-${i}`,
        category: 'results',
        alt: `Recurso de resultado ${i}`,
        preloadPriority: 10
      })), { quality: 100 });
    }
  }, [showingFinalTransition]);

  return (
    <LoadingManager isLoading={!pageIsReady}>
      <div className="relative">
        {!showIntro && (
          <EnchantedBackground
            phase={showingStrategicQuestions ? 'strategic' : 'quiz'}
            intensity={progressPercentage > 75 ? 0.8 : 0.5}
          />
        )}
        
        {showIntro ? (
          <QuizIntro onStart={handleStartQuiz} />
        ) : (
          <>
            <MorphingProgress
              progress={progressPercentage}
              phase={showingStrategicQuestions ? 'strategic' : 'normal'}
            />
            
            <QuizContainer>
              <AnimatePresence mode="wait">
                {showingTransition ? (
                  <motion.div
                    key="main-transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <MainTransition onProceedToStrategicQuestions={handleProceedToStrategic} />
                  </motion.div>
                ) : showingFinalTransition ? (
                  <motion.div
                    key="final-transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <QuizTransitionManager
                      showingFinalTransition={showingFinalTransition}
                      handleShowResult={handleShowResult}
                    />
                  </motion.div>
                ) : (
                  actualCurrentQuestionData && ( 
                    <motion.div
                      key={actualCurrentQuestionData.id || 'content'} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <QuizContent
                        user={user}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={totalQuestions}
                        showingStrategicQuestions={showingStrategicQuestions}
                        currentStrategicQuestionIndex={currentStrategicQuestionIndex}
                        currentQuestion={actualCurrentQuestionData} 
                        currentAnswers={showingStrategicQuestions && actualCurrentQuestionData.id ? strategicAnswers[actualCurrentQuestionData.id] || [] : currentAnswers}
                        handleAnswerSubmit={
                          showingStrategicQuestions && actualCurrentQuestionData
                            ? recordStrategicAnswer
                            : handleAnswerSubmitInternal
                        }
                      />
                      {renderQuizNavigation()} 
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </QuizContainer>
          </>
        )}
      </div>
    </LoadingManager>
  );
};

export default QuizPage;
