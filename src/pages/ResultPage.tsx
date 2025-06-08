"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'react-router-dom';
import QuizResult from '@/components/QuizResult';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { trackOfferClick } from '@/utils/analytics';
import { useAuth } from '@/context/AuthContext';
import { ResultPageConfig } from '@/types/resultPageConfig';

const ResultPage: React.FC = () => {
  const { quizResult, resetQuiz } = useQuizLogic();
  const { id } = useParams<{ id?: string }>();
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>('Visitante');
  const [offerClicked, setOfferClicked] = useState(false);
  const [config, setConfig] = useState<ResultPageConfig | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user && user.userName) {
      setUserName(user.userName);
    } else {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!quizResult) {
      // Redirect to quiz if no result is available
      router.push('/quiz-descubra-seu-estilo');
    }
  }, [quizResult, router]);

  useEffect(() => {
    const loadConfig = async () => {
      if (quizResult?.primaryStyle?.category) {
        try {
          const configKey = `quiz_result_config_${quizResult.primaryStyle.category}`;
          const savedConfig = localStorage.getItem(configKey);
          if (savedConfig) {
            setConfig(JSON.parse(savedConfig));
            console.log('Loaded config from localStorage:', configKey);
          } else {
            console.log('No saved config found for:', quizResult.primaryStyle.category);
            setConfig(null);
          }
        } catch (error) {
          console.error('Error loading custom settings:', error);
          setConfig(null);
        }
      }
    };

    loadConfig();
  }, [quizResult?.primaryStyle?.category]);

  const handleOfferClick = useCallback(async () => {
    if (!quizResult?.primaryStyle?.category) {
      console.error('No quiz result available for offer tracking');
      return;
    }

    try {
      setOfferClicked(true);
      const eventData = {
        style_category: quizResult.primaryStyle.category,
        user_name: userName,
        timestamp: new Date().toISOString(),
        // Convert StyleResult to proper record format
        style_data: {
          category: quizResult.primaryStyle.category,
          score: quizResult.primaryStyle.score,
          percentage: quizResult.primaryStyle.percentage
        } as Record<string, unknown>
      };

      await trackOfferClick(eventData);
      console.log('Offer click tracked:', eventData);
    } catch (error) {
      console.error('Error tracking offer click:', error);
    }
  }, [quizResult, userName]);

  const handleRetakeQuiz = () => {
    resetQuiz();
    router.push('/quiz-descubra-seu-estilo');
  };

  if (!quizResult) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#432818] mb-4">Aguarde...</h1>
          <p className="text-gray-600">Redirecionando para o quiz.</p>
        </div>
      </div>
    );
  }

  return (
    <QuizResult
      primaryStyle={quizResult.primaryStyle}
      secondaryStyles={quizResult.secondaryStyles}
      config={config || undefined}
      onReset={handleRetakeQuiz}
    />
  );
};

export default ResultPage;
