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
import { useAuth } from '../context/AuthContext';
import QuizResult from './QuizResult';
import { QuizOfferHero } from './quiz-offer/QuizOfferHero';
import { QuizOfferCTA } from './quiz-offer/QuizOfferCTA';

const QuizPage: React.FC = () => {
  const { user, login } = useAuth();
  
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
  const quizLogic = useQuizLogic();
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions,
    calculateResults
    // submitQuizIfComplete removido
    // ...outros retornos se necessário...
  } = quizLogic;

  // Função para iniciar o quiz após o nome
  const handleStartQuiz = (nome: string) => {
    if (nome && nome.trim()) {
      safeLocalStorage.setItem('userName', nome.trim());
      setShowIntro(false);
    }
  };

  // Wrapper para adaptar a assinatura do QuizContent
  const handleAnswerSubmit = (response: UserResponse) => {
    handleAnswer(response.questionId, response.selectedOptions);
  };

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

  // Novo estado para controlar exibição do resultado e oferta
  const [showResult, setShowResult] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  // Função para finalizar quiz e mostrar resultado
  const handleQuizComplete = () => {
    const result = calculateResults();
    setQuizResult(result);
    setShowResult(true);
  };

  // Quando resultado for exibido, mostrar oferta após X segundos
  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => setShowOffer(true), 3000); // 3s após resultado
      return () => clearTimeout(timer);
    }
  }, [showResult]);

  return (
    <div>
      {/* Intro do Quiz */}
      {showIntro && (
        <QuizIntro onStart={handleStartQuiz} />
      )}
      {/* Perguntas do Quiz */}
      {!showIntro && !showResult && currentQuestion && (
        <QuizContainer>
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
          <QuizNavigation 
            canProceed={currentAnswers.length > 0}
            onNext={isLastQuestion ? handleQuizComplete : handleNext}
            onPrevious={handlePrevious}
            currentQuestionType={showingStrategicQuestions ? 'strategic' : 'normal'}
            selectedOptionsCount={currentAnswers.length}
            isLastQuestion={isLastQuestion}
          />
        </QuizContainer>
      )}
      {/* Resultado do Quiz */}
      {showResult && quizResult && (
        <>
          <QuizResult {...quizResult} />
          {/* Oferta aparece após resultado */}
          {showOffer && (
            <div className="mt-8">
              <QuizOfferHero onStartQuizClick={() => router.push('/')} />
              <QuizOfferCTA />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizPage;
