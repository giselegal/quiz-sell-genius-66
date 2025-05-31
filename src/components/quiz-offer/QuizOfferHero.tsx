
import React from 'react';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/utils/analytics';
import { Clock, Users, Star, CheckCircle } from 'lucide-react';

interface QuizOfferHeroProps {
  onStartQuiz: () => void;
}

const QuizOfferHero: React.FC<QuizOfferHeroProps> = ({ onStartQuiz }) => {
  const handleStartQuiz = () => {
    trackButtonClick('quiz-offer-hero-cta', 'Descobrir Meu Estilo', 'quiz-offer-hero');
    onStartQuiz();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[#B89B7A]/8 rounded-full blur-3xl -translate-y-1/4 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#aa6b5d]/8 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge de urgência */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Star className="w-4 h-4" />
          <span>Quiz Gratuito • Resultado Instantâneo</span>
        </div>

        {/* Título principal otimizado */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#432818] mb-6 leading-tight">
          Qual é o Seu
          <span className="block text-transparent bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text">
            Estilo Único?
          </span>
        </h1>
        
        {/* Subtítulo mais persuasivo */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#432818]/80 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
          Descubra em 3 minutos qual é o seu estilo pessoal autêntico e 
          <strong className="text-[#B89B7A] font-medium"> transforme sua forma de se vestir para sempre</strong>
        </p>
        
        {/* Benefícios em destaque */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-[#432818]">
            <Clock className="w-5 h-5 text-[#B89B7A]" />
            <span className="text-sm sm:text-base font-medium">3 minutos</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#432818]">
            <CheckCircle className="w-5 h-5 text-[#B89B7A]" />
            <span className="text-sm sm:text-base font-medium">100% Gratuito</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#432818]">
            <Users className="w-5 h-5 text-[#B89B7A]" />
            <span className="text-sm sm:text-base font-medium">+50mil mulheres</span>
          </div>
        </div>
        
        {/* CTA principal melhorado */}
        <div className="space-y-4">
          <Button 
            onClick={handleStartQuiz}
            size="lg"
            className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] hover:from-[#45a049] hover:to-[#3d8b40] text-white text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-full font-bold shadow-xl transform hover:scale-105 transition-all duration-300 border-0 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-3">
              <Star className="w-5 h-5" />
              Descobrir Meu Estilo Agora
            </span>
          </Button>
          
          <p className="text-sm text-[#432818]/60 max-w-md mx-auto">
            Mais de 50.000 mulheres já descobriram seu estilo único. 
            <strong className="text-[#B89B7A]"> Seja a próxima!</strong>
          </p>
        </div>

        {/* Elementos de credibilidade */}
        <div className="mt-12 pt-8 border-t border-[#B89B7A]/20">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#432818]/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
              <span>Sem cadastro necessário</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
              <span>Resultado personalizado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
              <span>Baseado em análise profissional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOfferHero;
