
import React from 'react';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/utils/analytics';

interface QuizOfferHeroProps {
  onStartQuiz: () => void;
}

const QuizOfferHero: React.FC<QuizOfferHeroProps> = ({ onStartQuiz }) => {
  const handleStartQuiz = () => {
    // Track button click with 3 parameters as expected
    trackButtonClick('quiz-offer-hero-cta', 'Descobrir Meu Estilo', 'quiz-offer-hero');
    onStartQuiz();
  };

  const handleSecondaryClick = () => {
    // Track button click with 3 parameters as expected  
    trackButtonClick('quiz-offer-hero-secondary', 'Fazer Quiz Gratuito', 'quiz-offer-hero');
    onStartQuiz();
  };

  return (
    <div className="relative bg-gradient-to-br from-[#FAF9F7] to-[#F5F2EE] py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[#8F7A6A] mb-6 leading-tight">
          Descubra Seu 
          <span className="text-[#B89B7A] block">Estilo Único</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Um quiz personalizado que revela seu estilo autêntico e te ajuda a se vestir com mais confiança e elegância todos os dias.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={handleStartQuiz}
            size="lg"
            className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white text-xl px-8 py-4 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Descobrir Meu Estilo Agora
          </Button>
          
          <Button 
            onClick={handleSecondaryClick}
            variant="outline"
            size="lg"
            className="border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white text-lg px-6 py-3 rounded-full font-medium transition-all duration-200"
          >
            Fazer Quiz Gratuito
          </Button>
        </div>
        
        <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            ✓ 100% Gratuito
          </span>
          <span className="flex items-center gap-2">
            ✓ 3 minutos
          </span>
          <span className="flex items-center gap-2">
            ✓ Resultado instantâneo
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizOfferHero;
