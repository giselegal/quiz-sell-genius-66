
import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion } from 'framer-motion';
import ResultHeader from '@/components/quiz-result/ResultHeader';
import PrimaryStyleCard from '@/components/quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import OfferCard from '@/components/quiz-result/sales/OfferCard';
import { useUtmParameters } from '@/hooks/useUtmParameters';

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('Visitante');
  const { utmParams } = useUtmParameters();

  useEffect(() => {
    // Simular loading mínimo para experiência suave
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  useEffect(() => {
    if (!primaryStyle) {
      console.log('Redirecionando para quiz - dados incompletos');
      navigate('/quiz');
      return;
    }

    // Log completion event (simplified)
    console.log('Quiz completed:', {
      primaryStyle: primaryStyle.category,
      userName: userName,
      utmParams: utmParams
    });
  }, [primaryStyle, userName, navigate, utmParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fffaf7] to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <LoadingSpinner size="lg" color="#B89B7A" className="mx-auto mb-4" />
          <p className="text-[#432818] text-lg">Preparando seus resultados...</p>
        </motion.div>
      </div>
    );
  }

  if (!primaryStyle) {
    return null; // O useEffect já fez o redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf7] to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Header com nome do usuário */}
          <ResultHeader userName={userName} />
          
          {/* Estilo principal */}
          <PrimaryStyleCard primaryStyle={primaryStyle} />
          
          {/* Estilos secundários */}
          {secondaryStyles && secondaryStyles.length > 0 && (
            <SecondaryStylesSection secondaryStyles={secondaryStyles} />
          )}
          
          {/* Seção de oferta */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <OfferCard primaryStyle={primaryStyle} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;
