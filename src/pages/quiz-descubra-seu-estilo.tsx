
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizIntro from '@/components/QuizIntro';
import { QuizContent } from '@/components/QuizContent';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { UserResponse } from '@/types/quiz';
import { storeUserForHotmart } from '@/utils/hotmartWebhook';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  const [user, setUser] = useState<{ userName: string } | null>(null);
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);

  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    handleAnswer,
    handleNext,
    handlePrevious,
    quizCompleted,
    strategicAnswers,
    handleStrategicAnswer,
    totalQuestions,
    isInitialLoadComplete,
    submitQuizIfComplete
  } = useQuizLogic();

  // Store user data for Hotmart integration when quiz starts
  useEffect(() => {
    if (user?.userName) {
      storeUserForHotmart(user.userName, {
        name: user.userName,
        quizStarted: true,
        timestamp: Date.now()
      });
    }
  }, [user?.userName]);

  const handleStart = (userName: string) => {
    setUser({ userName });
    setHasStarted(true);
    localStorage.setItem('userName', userName);
  };

  const handleAnswerSubmit = (response: UserResponse) => {
    if (showingStrategicQuestions) {
      handleStrategicAnswer(response.questionId, response.selectedOptions);
    } else {
      handleAnswer(response.questionId, response.selectedOptions);
    }
  };

  const handleNextClick = () => {
    if (showingStrategicQuestions) {
      if (currentStrategicQuestionIndex < 6) {
        setCurrentStrategicQuestionIndex(prev => prev + 1);
      } else {
        // Strategic questions completed, submit quiz and navigate to result
        submitQuizIfComplete();
        navigate('/resultado');
      }
    } else {
      if (currentQuestionIndex < totalQuestions - 1) {
        handleNext();
      } else {
        // Regular questions completed, show strategic questions
        setShowingStrategicQuestions(true);
        setCurrentStrategicQuestionIndex(0);
      }
    }
  };

  // Get current answers based on question type
  const getCurrentAnswers = () => {
    if (showingStrategicQuestions) {
      const currentStrategicQuestion = require('@/data/strategicQuestions').strategicQuestions[currentStrategicQuestionIndex];
      return currentStrategicQuestion ? (strategicAnswers[currentStrategicQuestion.id] || []) : [];
    }
    return currentAnswers;
  };

  // Redirect to result if quiz is completed
  useEffect(() => {
    if (quizCompleted) {
      navigate('/resultado');
    }
  }, [quizCompleted, navigate]);

  if (!isInitialLoadComplete) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
          <p className="text-[#432818]">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return <QuizIntro onStart={handleStart} />;
  }

  return (
    <QuizContent
      user={user}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={totalQuestions}
      showingStrategicQuestions={showingStrategicQuestions}
      currentStrategicQuestionIndex={currentStrategicQuestionIndex}
      currentQuestion={showingStrategicQuestions 
        ? require('@/data/strategicQuestions').strategicQuestions[currentStrategicQuestionIndex]
        : currentQuestion
      }
      currentAnswers={getCurrentAnswers()}
      handleAnswerSubmit={handleAnswerSubmit}
      handleNextClick={handleNextClick}
      handlePrevious={handlePrevious}
    />
  );
};

export default QuizPage;
