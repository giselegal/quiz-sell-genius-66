
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizIntro from '@/components/QuizIntro';
import { QuizContent } from '@/components/QuizContent';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { UserResponse } from '@/types/quiz';
import { storeUserForHotmart } from '@/utils/hotmartWebhook';
import { strategicQuestions } from '@/data/strategicQuestions';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  const [user, setUser] = useState<{ userName: string } | null>(null);
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  
  // Estado separado para questões estratégicas, sem referência circular
  const [strategicAnswersState, setStrategicAnswersState] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('strategicAnswers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

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
    console.log('[DEBUG] handleAnswerSubmit called:', response);
    
    if (showingStrategicQuestions) {
      console.log('[DEBUG] Handling strategic answer:', response);
      
      // Atualizar estado local das questões estratégicas
      const newStrategicAnswers = {
        ...strategicAnswersState,
        [response.questionId]: response.selectedOptions
      };
      setStrategicAnswersState(newStrategicAnswers);
      
      // Salvar no localStorage
      localStorage.setItem('strategicAnswers', JSON.stringify(newStrategicAnswers));
      
      // Também chamar o handler do useQuizLogic para manter consistência
      handleStrategicAnswer(response.questionId, response.selectedOptions);
    } else {
      console.log('[DEBUG] Handling normal answer:', response);
      handleAnswer(response.questionId, response.selectedOptions);
    }
  };

  const handleNextClick = () => {
    console.log('[DEBUG] handleNextClick called. Strategic mode:', showingStrategicQuestions);
    console.log('[DEBUG] Current strategic question index:', currentStrategicQuestionIndex);
    
    if (showingStrategicQuestions) {
      if (currentStrategicQuestionIndex < strategicQuestions.length - 1) {
        console.log('[DEBUG] Moving to next strategic question');
        setCurrentStrategicQuestionIndex(prev => prev + 1);
      } else {
        console.log('[DEBUG] Strategic questions completed, submitting quiz');
        // Strategic questions completed, submit quiz and navigate to result
        submitQuizIfComplete();
        navigate('/resultado');
      }
    } else {
      if (currentQuestionIndex < totalQuestions - 1) {
        console.log('[DEBUG] Moving to next normal question');
        handleNext();
      } else {
        console.log('[DEBUG] Normal questions completed, showing strategic questions');
        // Regular questions completed, show strategic questions
        setShowingStrategicQuestions(true);
        setCurrentStrategicQuestionIndex(0);
      }
    }
  };

  // Get current answers based on question type
  const getCurrentAnswers = () => {
    if (showingStrategicQuestions) {
      const currentStrategicQuestion = strategicQuestions[currentStrategicQuestionIndex];
      if (currentStrategicQuestion) {
        const answers = strategicAnswersState[currentStrategicQuestion.id] || [];
        console.log('[DEBUG] Strategic answers for question', currentStrategicQuestion.id, ':', answers);
        return answers;
      }
      return [];
    }
    console.log('[DEBUG] Normal answers:', currentAnswers);
    return currentAnswers;
  };

  // Get current question based on question type
  const getCurrentQuestion = () => {
    if (showingStrategicQuestions) {
      const question = strategicQuestions[currentStrategicQuestionIndex];
      console.log('[DEBUG] Current strategic question:', question);
      return question;
    }
    console.log('[DEBUG] Current normal question:', currentQuestion);
    return currentQuestion;
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
      currentQuestion={getCurrentQuestion()}
      currentAnswers={getCurrentAnswers()}
      handleAnswerSubmit={handleAnswerSubmit}
      handleNextClick={handleNextClick}
      handlePrevious={handlePrevious}
    />
  );
};

export default QuizPage;
