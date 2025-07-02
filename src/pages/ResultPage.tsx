
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useQuizResult } from '@/hooks/useQuizResult';
import { styleConfig } from '@/data/styleConfig';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import { Button } from '@/components/ui/button';
import { SecurePurchaseElement, BuyButton } from '@/components/ui/SecurePurchaseElement';
import { 
  BonusSection, 
  MotivationSection, 
  GuaranteeSection, 
  TestimonialsBlock,
  TransformationsBlock 
} from '@/components/result/blocks';
import { ShoppingCart } from 'lucide-react';

const ResultPage: React.FC = () => {
  const { user } = useAuth();
  const { primaryStyle, secondaryStyles } = useQuizResult();
  const [userName, setUserName] = useState<string>('Visitante');

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

  if (!primaryStyle) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Carregando resultado...</div>
          <div className="text-sm text-gray-600">Por favor, aguarde</div>
        </div>
      </div>
    );
  }

  const styleInfo = styleConfig[primaryStyle.category as keyof typeof styleConfig];

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <AnimatedWrapper show={true}>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-4">
              Olá, {userName}! Seu Estilo Predominante é:
            </h1>
            <div className="w-24 h-1 bg-[#B89B7A] mx-auto rounded-full"></div>
          </div>
        </AnimatedWrapper>

        {/* Primary Style Card */}
        <AnimatedWrapper show={true}>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-[#B89B7A]/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img 
                  src={styleInfo.image} 
                  alt={primaryStyle.category}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#432818] mb-4">
                  {primaryStyle.category}
                </h2>
                <p className="text-[#8F7A6A] mb-6">
                  {styleInfo.description}
                </p>
                <div className="bg-[#B89B7A]/10 p-4 rounded-lg">
                  <div className="text-lg font-medium text-[#432818]">
                    {primaryStyle.percentage}% de compatibilidade
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedWrapper>

        {/* Secondary Styles */}
        {secondaryStyles && secondaryStyles.length > 0 && (
          <AnimatedWrapper show={true}>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-[#B89B7A]/20">
              <h3 className="text-xl font-semibold text-[#432818] mb-6 text-center">
                Seus Estilos Secundários
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {secondaryStyles.slice(0, 2).map((style, index) => {
                  const secondaryStyleInfo = styleConfig[style.category as keyof typeof styleConfig];
                  return (
                    <div key={index} className="text-center">
                      <img 
                        src={secondaryStyleInfo.image} 
                        alt={style.category}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-medium text-[#432818] mb-2">{style.category}</h4>
                      <div className="text-sm text-[#8F7A6A]">
                        {style.percentage}% de compatibilidade
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedWrapper>
        )}

        {/* Guia de Estilo Image */}
        <AnimatedWrapper show={true}>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-[#B89B7A]/20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#432818]">
              Seu Guia de Estilo Personalizado
            </h3>
            <img 
              src={styleInfo.guideImage} 
              alt={`Guia de Estilo ${primaryStyle.category}`}
              className="w-full max-w-md mx-auto rounded-lg mb-6"
            />
            <p className="text-lg mb-6 text-[#8F7A6A]">
              Transforme sua relação com a moda e eleve sua autoestima com nosso guia personalizado
            </p>
          </div>
        </AnimatedWrapper>

        {/* Nova Seção de Oferta */}
        <AnimatedWrapper show={true}>
          <div className="bg-gradient-to-r from-[#B89B7A] to-[#A1835D] rounded-xl shadow-lg p-8 mb-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Descubra Seu Guia de Estilo Completo
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Transforme sua relação com a moda e eleve sua autoestima com nosso guia personalizado
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="text-3xl font-bold mb-2">R$ 39,00</div>
                  <div className="text-sm opacity-80 line-through">De R$ 175,00</div>
                  <div className="text-sm mt-2">ou 4x de R$ 10,86</div>
                </div>
                <div className="text-left">
                  <ul className="space-y-2 text-sm">
                    <li>✓ Guia de Estilo Personalizado</li>
                    <li>✓ Cartela de Cores Exclusiva</li>
                    <li>✓ Dicas de Maquiagem</li>
                    <li>✓ Guia de Compras Inteligentes</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <BuyButton 
              onClick={() => window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank')}
              className="bg-white text-[#432818] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all transform hover:scale-105 mb-4"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Quero Meu Guia Personalizado
            </BuyButton>
            <SecurePurchaseElement />
          </div>
        </AnimatedWrapper>

        {/* Content Blocks */}
        <div className="space-y-8">
          <TransformationsBlock />
          <BonusSection />
          <TestimonialsBlock />
          <MotivationSection />
          <GuaranteeSection />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
