
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { AnimatedWrapper } from './ui/animated-wrapper';

interface QuizFinalTransitionProps {
  onShowResult: () => void;
}

const QuizFinalTransition: React.FC<QuizFinalTransitionProps> = ({ onShowResult }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.png"
            alt="Logo Gisele Galvão"
            className="h-16 mx-auto mb-6"
          />
        </div>

        <AnimatedWrapper>
          <Card className="p-6 space-y-6 bg-white shadow-md">
            <h2 className="text-xl font-playfair text-[#432818] text-center mb-6">
              Obrigada por compartilhar.
            </h2>
            
            <p className="text-[#1A1818]/80">
              Chegar até aqui já mostra que você está pronta para se olhar com mais amor, se vestir com mais intenção e deixar sua imagem comunicar quem você é de verdade — com leveza, presença e propósito.
            </p>
            
            <p className="text-[#1A1818]/80">
              Agora, é hora de revelar o seu Estilo Predominante — e os seus Estilos Complementares.
              E, mais do que isso, uma oportunidade real de aplicar o seu Estilo com leveza e confiança — todos os dias.
            </p>
            
            <div className="bg-[#B89B7A]/10 p-4 rounded-lg">
              <p className="text-[#432818]">
                Ah, e lembra do valor que mencionamos?
                <br />
                Prepare-se para uma surpresa: o que você vai receber vale muito mais do que imagina — e vai custar muito menos do que você esperava.
              </p>
            </div>

            <Button 
              onClick={onShowResult}
              className="w-full bg-[#B89B7A] hover:bg-[#B89B7A]/90 py-6"
            >
              Vamos ao resultado?
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default QuizFinalTransition;
