
import React from 'react';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/utils/analytics';

interface QuizOfferCTAProps {
  onStartQuiz: () => void;
}

const QuizOfferCTA: React.FC<QuizOfferCTAProps> = ({ onStartQuiz }) => {
  const handleStartQuiz = () => {
    // Track button click with 3 parameters as expected
    trackButtonClick('quiz-offer-cta', 'Começar Quiz Agora', 'quiz-offer-page');
    
    // Track conversion with 1 parameter as expected
    trackButtonClick('quiz-offer-start', 'Quiz Started from Offer', 'quiz-offer-page');
    
    onStartQuiz();
  };

  return (
    <div className="text-center py-12 bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] text-white">
      <h2 className="text-3xl font-bold mb-4">
        Pronta para Descobrir Seu Estilo?
      </h2>
      <p className="text-xl mb-8 opacity-90">
        Faça o quiz agora e receba seu guia personalizado gratuitamente!
      </p>
      
      <Button 
        onClick={handleStartQuiz}
        size="lg"
        className="bg-white text-[#8F7A6A] hover:bg-gray-100 text-xl px-8 py-4 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        Começar Quiz Agora - É Grátis!
      </Button>
      
      <p className="text-sm mt-4 opacity-75">
        ⏱️ Leva apenas 3 minutos para completar
      </p>
    </div>
  );
};

export default QuizOfferCTA;
