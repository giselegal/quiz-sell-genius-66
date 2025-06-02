
import React, { useEffect } from 'react';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { useAuth } from '@/context/AuthContext';
import { QuizContent } from '@/components/quiz/QuizContent';
import { QuizFinalTransition } from '@/components/QuizFinalTransition';
import { strategicQuestions } from '@/data/strategicQuestions';
import { UserResponse } from '@/types/quiz';
import { useUniversalNavigation } from '@/hooks/useUniversalNavigation';

const QuizPage: React.FC = () => {
  const { user, setUser } = useAuth();
  const { navigate } = useUniversalNavigation();
  
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    handleAnswer,
    handleNext,
    canProceed,
    isLastQuestion,
    quizCompleted,
    totalQuestions,
    strategicAnswers,
    handleStrategicAnswer,
    submitQuizIfComplete,
    isInitialLoadComplete
  } = useQuizLogic();

  // State for strategic questions
  const [showingStrategicQuestions, setShowingStrategicQuestions] = React.useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = React.useState(0);

  // Get user name from localStorage and set in auth context
  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (userName && (!user || !user.userName)) {
      setUser({
        id: '1',
        userName,
        email: 'user@quiz.com',
        role: 'user'
      });
    }
  }, [user, setUser]);

  // Handle quiz completion
  useEffect(() => {
    if (quizCompleted) {
      setShowingStrategicQuestions(true);
    }
  }, [quizCompleted]);

  // Handle strategic questions completion
  useEffect(() => {
    if (showingStrategicQuestions && currentStrategicQuestionIndex >= strategicQuestions.length) {
      // Submit final results and navigate
      submitQuizIfComplete();
      navigate('/resultado');
    }
  }, [showingStrategicQuestions, currentStrategicQuestionIndex, submitQuizIfComplete, navigate]);

  const handleAnswerSubmit = (response: UserResponse) => {
    if (showingStrategicQuestions) {
      // Handle strategic question
      handleStrategicAnswer(response.questionId, response.selectedOptions);
      setCurrentStrategicQuestionIndex(prev => prev + 1);
    } else {
      // Handle style question
      handleAnswer(response.questionId, response.selectedOptions);
      
      if (canProceed) {
        setTimeout(() => {
          handleNext();
        }, 300);
      }
    }
  };

  // Show transition screen when quiz is completed but strategic questions haven't started
  if (quizCompleted && !showingStrategicQuestions) {
    return <QuizFinalTransition />;
  }

  // Show loading while initial images load
  if (!isInitialLoadComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF9F7] to-[#F5F2E9]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
          <p className="text-[#432818]">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F2E9]">
      <QuizContent
        user={user}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        showingStrategicQuestions={showingStrategicQuestions}
        currentStrategicQuestionIndex={currentStrategicQuestionIndex}
        currentQuestion={currentQuestion}
        currentAnswers={currentAnswers}
        handleAnswerSubmit={handleAnswerSubmit}
      />
    </div>
  );
};

export default QuizPage;
