import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuizContext } from '../context/QuizContext';
import { calculateResults } from '../utils/resultsCalculator';
import { useTransformation } from '../hooks/useTransformation';
import { useIsMobile } from '@/hooks/use-mobile';
import { FixedTransformationImage } from '@/components/ui/FixedTransformationImage';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { preloadCriticalImages } from '@/utils/imageManager';
import { UserAnswer } from '@/utils/resultsCalculator';
import { QuizResult } from '@/types/quiz';

interface ResultPageProps {
  // Add any props if needed
}

const ResultPage: React.FC<ResultPageProps> = () => {
  // Type assertion to fix incompatible types
  const { answers, userName, resetQuiz } = useQuizContext() as {
    answers: Record<string, UserAnswer[]>;
    userName: string;
    resetQuiz: () => void;
  };
  
  const [results, setResults] = useState<any>(null);
  const [currentTransformationIndex, setCurrentTransformationIndex] = useState(0);
  const { transformation, isLoading, error } = useTransformation(results?.style);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Preload critical images for the result page
    preloadCriticalImages(["results"]);
    
    if (answers) {
      const calculatedResults = calculateResults(answers);
      setResults(calculatedResults);
    }
  }, [answers]);

  const handleRestartQuiz = () => {
    resetQuiz();
    navigate('/');
  };

  const handleNextTransformation = () => {
    setCurrentTransformationIndex((prevIndex) =>
      prevIndex + 1 < transformation.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevTransformation = () => {
    setCurrentTransformationIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : transformation.length - 1
    );
  };
  
  const fadeStyles = {
    opacity: 1,
    transition: 'opacity 0.5s ease-in-out'
  };

  if (!results) {
    return <div>Calculando resultados...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center py-8"
      >
        <h1 className="text-3xl font-playfair text-brand-coffee font-semibold mb-4">
          {userName ? `Parabéns, ${userName}!` : "Seu Resultado"}
        </h1>
        <p className="text-brand-text">
          Com base nas suas respostas, identificamos o seu estilo predominante como:
        </p>
        <h2 className="text-2xl font-playfair text-brand-primary font-semibold mt-2">
          {results.style}
        </h2>
        <p className="text-brand-text mt-4">
          {results.description}
        </p>
        <div className="text-center mb-8">
          <div className="max-w-md mx-auto mb-6">
            <div className="text-sm text-[#8F7A6A] text-center mb-2">
              Seu estilo predominante
            </div>
            <Progress value={primaryStyle.percentage} className="h-2 bg-[#F3E8E6]" indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full flex flex-col items-center"
      >
        <h3 className="text-xl font-playfair text-brand-coffee font-semibold mb-4">
          Inspire-se com essa transformação
        </h3>
        {isLoading ? (
          <div>Carregando transformação...</div>
        ) : error ? (
          <div>Erro ao carregar transformação.</div>
        ) : transformation && transformation.length > 0 ? (
          <div className="relative w-full max-w-md">
            <div style={{ ...fadeStyles }}>
              <FixedTransformationImage
                src={transformation[currentTransformationIndex].imageUrl}
                alt={`Transformação ${currentTransformationIndex + 1}`}
                width={500}
                height={500}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="flex justify-between mt-2">
              <Button variant="outline" size="icon" onClick={handlePrevTransformation}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextTransformation}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div>Nenhuma transformação disponível para este estilo.</div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full mt-8"
      >
        <Button className="w-full" onClick={handleRestartQuiz}>
          Fazer o Quiz Novamente
        </Button>
      </motion.div>
    </div>
  );
};

export default ResultPage;
