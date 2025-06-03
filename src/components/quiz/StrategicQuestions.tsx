
import React, { useState, useEffect, useRef } from 'react';
import { QuizQuestion } from '../QuizQuestion';
import { UserResponse } from '@/types/quiz';
import { strategicQuestions } from '@/data/strategicQuestions';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { preloadCriticalImages, preloadImagesByUrls } from '@/utils/imageManager';
import OptimizedImage from '../ui/optimized-image';

// Result critical images as URLs array
const RESULT_CRITICAL_IMAGES: string[] = [
  'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp',
  'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80,w_800/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp',
  'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80,w_800/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp'
];

interface StrategicQuestionsProps {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  onAnswer: (response: UserResponse) => void;
}

export const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({
  currentQuestionIndex,
  answers,
  onAnswer
}) => {
  const [mountKey, setMountKey] = useState(Date.now());
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const resultImagesPreloadStarted = useRef<boolean>(false);
  
  useEffect(() => {
    if (!imagesPreloaded) {
      preloadCriticalImages(["strategic"]);
      setImagesPreloaded(true);
    }
    
    if (!resultImagesPreloadStarted.current) {
      resultImagesPreloadStarted.current = true;
      
      setTimeout(() => {
        console.log(`[Otimização] Iniciando pré-carregamento progressivo de imagens de resultado`);
        
        preloadCriticalImages(['results'], {
          quality: 80,
          batchSize: 2
        });
      }, 500);
    }
  }, [imagesPreloaded]);
  
  useEffect(() => {
    setMountKey(Date.now());
    
    if (currentQuestionIndex === 1) {
      preloadCriticalImages(['transformation'], {
        quality: 75,
        batchSize: 2
      });
    } else if (currentQuestionIndex === 2) {
      preloadCriticalImages(['bonus'], {
        quality: 75,
        batchSize: 2
      });
    } else if (currentQuestionIndex >= 3) {
      preloadCriticalImages(['testimonials'], {
        quality: 70,
        batchSize: 2
      });
      
      preloadImagesByUrls(RESULT_CRITICAL_IMAGES, {
        quality: 85, 
        batchSize: 1
      });
    }
  }, [currentQuestionIndex]);

  if (currentQuestionIndex >= strategicQuestions.length) return null;

  return (
    <AnimatedWrapper key={mountKey}>
      <QuizQuestion
        question={strategicQuestions[currentQuestionIndex]}
        onAnswer={onAnswer}
        currentAnswers={answers[strategicQuestions[currentQuestionIndex].id] || []}
        autoAdvance={false}
        showQuestionImage={true}
        isStrategicQuestion={true}
      />
    </AnimatedWrapper>
  );
};

export default StrategicQuestions;
