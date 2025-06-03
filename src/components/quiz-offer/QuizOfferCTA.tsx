
import React from 'react';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/utils/analytics';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import './QuizOfferCTA.css';

interface QuizOfferCTAProps {
  onStartQuiz: () => void;
}

function QuizOfferCTA({ onStartQuiz }: QuizOfferCTAProps) {
  const handleStartQuiz = () => {
    trackButtonClick('quiz-offer-cta', 'Começar Quiz Agora', 'quiz-offer-page');
    onStartQuiz();
  };

  return (
    <div className="relative py-16 px-4 overflow-hidden">
      {/* Background gradient melhorado */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#B89B7A] via-[#A38A69] to-[#8F7A6A]"></div>
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        {/* Ícone decorativo */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Pronta para Se Descobrir?
        </h2>
        
        <p className="text-lg sm:text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
          Milhares de mulheres já transformaram sua autoestima descobrindo seu estilo único.
          <span className="block mt-2 font-medium">
            <Heart className="w-5 h-5 inline mr-2" />
            Agora é a sua vez de brilhar!
          </span>
        </p>
        
        {/* Stats rápidos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">50k+</div>
            <div className="text-sm opacity-90">Mulheres</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">3min</div>
            <div className="text-sm opacity-90">Para completar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">8</div>
            <div className="text-sm opacity-90">Estilos únicos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">100%</div>
            <div className="text-sm opacity-90">Gratuito</div>
          </div>
        </div>
        
        <Button 
          onClick={handleStartQuiz}
          size="lg"
          className="bg-white text-[#8F7A6A] hover:bg-gray-50 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 w-full sm:w-auto"
        >
          <span className="flex items-center justify-center gap-3">
            <span>Começar Meu Quiz Gratuito</span>
            <ArrowRight className="w-5 h-5" />
          </span>
        </Button>
        
        <p className="text-sm mt-4 opacity-85">
          <Sparkles className="w-4 h-4 inline mr-1" />
          Resultado instantâneo • Sem spam • Sem cadastro
        </p>
      </div>
    </div>
  );
}

export default QuizOfferCTA;
