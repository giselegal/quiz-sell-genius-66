import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { UserResponse } from '@/types/quiz';
import { toast } from './ui/use-toast';
import { QuizContainer } from './quiz/QuizContainer';
import { QuizContent } from './quiz/QuizContent';
import { QuizTransitionManager } from './quiz/QuizTransitionManager';
import QuizNavigation from './quiz/QuizNavigation';
import QuizIntro from './QuizIntro'; // Import QuizIntro
import { strategicQuestions } from '@/data/strategicQuestions';
import { useAuth } from '../context/AuthContext';
import { trackQuizStart, trackQuizAnswer, trackQuizComplete, trackResultView } from '../utils/analytics';
import { preloadImages } from '@/utils/imageManager';
import LoadingManager from './quiz/LoadingManager';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MainTransition } from './quiz/MainTransition'; // Importar MainTransition

const QuizPage: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  
  const [showIntro, setShowIntro] = useState(true); // Add state for showing intro
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

  // Check for username in localStorage on component mount
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setShowIntro(false); // Skip intro if username exists
    }
  }, []);

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
    } else {
      currentStep = currentQuestionIndex;
    }
    const percentage = Math.round((currentStep / totalSteps) * 100);
    setProgressPercentage(percentage);
  }, [currentQuestionIndex, currentStrategicQuestionIndex, showingStrategicQuestions, totalQuestions]);

  useEffect(() => {
    if (!quizStartTracked && !showIntro) { // Only track quiz start when not showing intro
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
    // Save user name to localStorage
    localStorage.setItem('userName', name);
    
    // Update Auth context
    if (login) {
      login(name);
    }
    
    // Start the quiz
    setShowIntro(false);
    
    // Preload quiz images when starting the quiz
    preloadImages([{ 
      src: currentQuestion?.imageUrl || '', 
      id: `question-0`,
      alt: 'First Question',
      category: 'quiz',
      preloadPriority: 5 
    }], { quality: 90 });
    
    console.log(`Quiz started by ${name}`);
  };

  const handleStrategicAnswerInternal = useCallback((response: UserResponse) => {
    try {
      setStrategicAnswers(prev => ({
        ...prev,
        [response.questionId]: response.selectedOptions
      }));
      saveStrategicAnswer(response.questionId, response.selectedOptions);
      trackQuizAnswer(
        response.questionId, 
        response.selectedOptions,
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
      if (currentStrategicQuestionIndex === strategicQuestions.length - 1) {
        setShowingFinalTransition(true);
        trackQuizComplete();
      } else {
        const nextIndex = currentStrategicQuestionIndex + 1;
        if (nextIndex < strategicQuestions.length) {
          const nextQuestionData = strategicQuestions[nextIndex];
          if (nextQuestionData.imageUrl) {
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
          if (nextIndex + 1 < strategicQuestions.length) {
            const nextNextQuestion = strategicQuestions[nextIndex + 1];
            if (nextNextQuestion.imageUrl) {
              preloadImages([{ 
                src: nextNextQuestion.imageUrl,
                id: `strategic-${nextIndex+1}`,
                category: 'strategic',
                alt: `Question ${nextIndex+1}`,
                preloadPriority: 2
              }], { quality: 85 });
            }
          }
        }
        setCurrentStrategicQuestionIndex(prev => prev + 1);
      }
    } catch (error) {
      toast({
        title: "Erro no processamento da resposta estratégica",
        description: "Não foi possível processar sua resposta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [currentStrategicQuestionIndex, saveStrategicAnswer, totalQuestions, strategicQuestions.length]);

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
      
      // Registra que as imagens da página de resultados foram pré-carregadas
      localStorage.setItem('preloadedResults', 'true');
      
      // Registra o timestamp de quando o quiz foi finalizado
      localStorage.setItem('quizCompletedAt', Date.now().toString());
      
      if (results?.primaryStyle) {
        trackResultView(results.primaryStyle.category);
      }
      
      // Define uma flag para garantir que a navegação ocorra
      let navigationOccurred = false;
      
      // Adiciona um pequeno delay para garantir que a animação de transição seja concluída
      const navigationTimer = setTimeout(() => {
        if (!navigationOccurred) {
          navigationOccurred = true;
          navigate('/resultado');
        }
      }, 800); // Tempo suficiente para completar a animação
      
      // Adiciona um fallback caso a navegação não ocorra dentro de um tempo máximo
      const fallbackTimer = setTimeout(() => {
        if (!navigationOccurred) {
          console.warn('Navegação com timeout normal falhou, usando fallback');
          navigationOccurred = true;
          clearTimeout(navigationTimer);
          navigate('/resultado');
        }
      }, 3000); // Tempo máximo que o usuário deve ficar na tela de transição
      
      return () => {
        // Limpa os timers em caso de desmontagem do componente
        clearTimeout(navigationTimer);
        clearTimeout(fallbackTimer);
      };
    } catch (error) {
      console.error('Erro ao navegar para a página de resultados:', error);
      toast({
        title: "Erro ao mostrar resultado",
        description: "Não foi possível carregar o resultado. Por favor, tente novamente.",
        variant: "destructive",
      });
      // Em caso de erro, tenta navegar diretamente
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

  const handleProceedToStrategic = () => {
    setShowingTransition(false);
    setShowingStrategicQuestions(true);
  };

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
    if (calculatedRequiredOptions >= 3) {
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
          ? () => handleStrategicAnswerInternal({ 
              questionId: actualCurrentQuestionData.id,
              selectedOptions: strategicAnswers[actualCurrentQuestionData.id] || []
            })
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

  // Adicionar este useEffect para pré-carregar recursos da página de resultados
  useEffect(() => {
    if (showingFinalTransition) {
      // Pré-carregar qualquer imagem ou recurso específico da página de resultados
      // que ainda não tenha sido carregado durante o quiz
      const resultImages = [
        '/assets/results/background.jpg',
        '/assets/results/share-icon.svg',
        // Adicione outros recursos necessários
      ];
      
      preloadImages(resultImages.map((src, i) => ({ 
        src, 
        id: `result-resource-${i}`,
        category: 'results',
        alt: `Recurso de resultado ${i}`,
        preloadPriority: 10 // Alta prioridade para os recursos da página de resultados
      })), { quality: 100 });
    }
  }, [showingFinalTransition]);

  // Adicione este useEffect para garantir que o usuário não fique preso na tela de transição
  useEffect(() => {
    let maxTransitionTimer: NodeJS.Timeout | null = null;
    
    if (showingFinalTransition) {
      maxTransitionTimer = setTimeout(() => {
        console.warn('Tempo máximo de transição atingido, forçando navegação');
        navigate('/resultado');
      }, 5000); // Tempo máximo absoluto na tela de transição
    }
    
    return () => {
      if (maxTransitionTimer) {
        clearTimeout(maxTransitionTimer);
      }
    };
  }, [showingFinalTransition, navigate]);

  return (
    <LoadingManager isLoading={!pageIsReady}>
      <div className="relative">
        {showIntro ? (
          <QuizIntro onStart={handleStartQuiz} />
        ) : (
          <>
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
              <div 
                className="h-full bg-[#b29670]"
                style={{ width: `${progressPercentage}%` }}
                role="progressbar"
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
            <QuizContainer>
              <AnimatePresence mode="wait">
                {showingTransition ? (
                  <motion.div
                    key="main-transition" // Chave única para MainTransition
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut" 
                    }}
                  >
                    <MainTransition onProceedToStrategicQuestions={handleProceedToStrategic} />
                  </motion.div>
                ) : showingFinalTransition ? (
                  <motion.div
                    key="final-transition" // Chave para a transição final
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut" 
                    }}
                  >
                    <QuizTransitionManager
                      showingTransition={false} // Não é mais a transição principal
                      showingFinalTransition={showingFinalTransition}
                      // handleStrategicAnswer={handleStrategicAnswerInternal} // Removido, pois QuizPage lida com isso
                      // strategicAnswers={strategicAnswers} // Removido
                      handleShowResult={handleShowResult}
                      hideCounter={true}
                    />
                  </motion.div>
                ) : (
                  actualCurrentQuestionData && ( 
                    <motion.div
                      key={actualCurrentQuestionData.id || 'content'} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        duration: 0.5,
                        ease: "easeOut" 
                      }}
                    >
                      <QuizContent
                        user={user}
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={totalQuestions}
                        showingStrategicQuestions={showingStrategicQuestions}
                        currentStrategicQuestionIndex={currentStrategicQuestionIndex}
                        currentQuestion={actualCurrentQuestionData} 
                        currentAnswers={showingStrategicQuestions && actualCurrentQuestionData.id ? strategicAnswers[actualCurrentQuestionData.id] || [] : currentAnswers}
                        handleAnswerSubmit={showingStrategicQuestions ? handleStrategicAnswerInternal : handleAnswerSubmitInternal}
                        handleNextClick={handleNextClickInternal} 
                        handlePrevious={handlePrevious} 
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
