"use client";
import * as React from 'react';
import { safeLocalStorage } from "@/utils/safeLocalStorage";
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
import { useRouter } from 'next/navigation';
import { MainTransition } from './quiz/MainTransition';

const QuizPage: React.FC = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  
  // Modificado: Sempre exibir o QuizIntro primeiro, independente do histórico
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
  // Removida a verificação de sessionStorage - o quiz sempre iniciará com o QuizIntro
  // Garante que sem nome salvo, sempre exibe a intro
  useEffect(() => {
    if (!showIntro) {
      const savedName = safeLocalStorage.getItem('userName');
      if (!savedName || !savedName.trim()) {
        setShowIntro(true);
      }
    }
  }, [showIntro]);

  return (
    <div>
      {/* Implementação do QuizPage */}
      <QuizIntro 
        showIntro={showIntro} 
        setShowIntro={setShowIntro}
      />
      
      {!showIntro && currentQuestion && (
        <QuizContainer>
          <QuizContent 
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswers={currentAnswers}
          />
          <QuizNavigation 
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={currentAnswers.length > 0}
            isLastQuestion={isLastQuestion}
          />
        </QuizContainer>
      )}
    </div>
  );
};

export default QuizPage;
