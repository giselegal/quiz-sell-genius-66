
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContent } from '@/components/quiz/QuizContent';
import { QuizTransitionManager } from '@/components/quiz/QuizTransitionManager';
import { MainTransition } from '@/components/quiz/MainTransition';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { strategicQuestions } from '@/data/strategicQuestions';
import { UserResponse } from '@/types/quiz';
import { trackQuizStart, trackQuizAnswer, trackQuizComplete } from '@/utils/analytics';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
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
    quizResults,
    handleStrategicAnswer,
    submitQuizIfComplete,
    isInitialLoadComplete
  } = useQuizLogic();

  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const [showingTransition, setShowingTransition] = useState(false);
  const [showingFinalTransition, setShowingFinalTransition] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      trackQuizStart(userName);
    }
  }, []);

  const handleAnswerSubmit = (response: UserResponse) => {
    console.log('Answer submitted:', response);
    
    // Track analytics
    trackQuizAnswer(response.questionId, response.selectedOptions, currentQuestionIndex, totalQuestions);
    
    if (showingStrategicQuestions) {
      handleStrategicAnswer(response.questionId, response.selectedOptions);
      
      if (currentStrategicQuestionIndex < strategicQuestions.length - 1) {
        setCurrentStrategicQuestionIndex(prev => prev + 1);
      } else {
        console.log('Strategic questions completed, showing final transition');
        setShowingFinalTransition(true);
      }
    } else {
      handleAnswer(response.questionId, response.selectedOptions);
      
      if (isLastQuestion) {
        console.log('Main quiz completed, showing transition to strategic questions');
        setShowingTransition(true);
        setTimeout(() => {
          setShowingTransition(false);
          setShowingStrategicQuestions(true);
        }, 2000);
      } else {
        handleNext();
      }
    }
  };

  const handleShowResult = () => {
    console.log('Preparing to show results...');
    
    // Calculate and save results before navigation
    let results = calculateResults();
    
    if (!results) {
      console.warn('Results not calculated, attempting to force calculation...');
      results = submitQuizIfComplete();
    }
    
    if (results) {
      console.log('Quiz completed successfully, navigating to results:', results);
      
      // Track completion
      trackQuizComplete();
      
      // Ensure results are saved to localStorage
      try {
        localStorage.setItem('quiz_result', JSON.stringify(results));
        console.log('Results saved to localStorage before navigation');
        
        // Navigate to results page
        navigate('/resultado');
      } catch (error) {
        console.error('Failed to save results before navigation:', error);
        // Even with error, try to navigate
        navigate('/resultado');
      }
    } else {
      console.error('Cannot show results - quiz not completed or results calculation failed');
      // Stay on current page
    }
  };

  // Show loading while initial data loads
  if (!isInitialLoadComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Show transition to strategic questions
  if (showingTransition) {
    return (
      <div className="min-h-screen">
        <MainTransition onProceedToStrategicQuestions={() => {
          setShowingTransition(false);
          setShowingStrategicQuestions(true);
        }} />
      </div>
    );
  }

  // Show final transition or quiz content
  return (
    <div className="min-h-screen">
      <QuizTransitionManager
        showingFinalTransition={showingFinalTransition}
        handleShowResult={handleShowResult}
      />
      
      {!showingFinalTransition && (
        <QuizContent
          user={{ userName: localStorage.getItem('userName') }}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          showingStrategicQuestions={showingStrategicQuestions}
          currentStrategicQuestionIndex={currentStrategicQuestionIndex}
          currentQuestion={currentQuestion}
          currentAnswers={currentAnswers}
          handleAnswerSubmit={handleAnswerSubmit}
        />
      )}
    </div>
  );
};

export default QuizPage;
