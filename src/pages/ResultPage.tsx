
import React, { useEffect, useState } from 'react';
import { useQuizResults } from '../hooks/useQuizResults';
import { useAuth } from '../context/AuthContext';
import { ResultSkeleton } from '../components/ResultSkeleton';
import { ResultHeader } from '../components/ResultHeader';
import { styleConfig } from '../data/styleConfig';
import { Progress } from '../components/ui/progress';
import { Card } from '../components/ui/card';
import { AnimatedWrapper } from '../components/ui/animated-wrapper';
import { OptimizedImage } from '../components/ui/optimized-image';
import { BonusSection, MethodsSection, GuaranteeSection, OfferSection, TransformationsBlock } from '../components/result/blocks';
import Testimonials from '../components/Testimonials';
import { trackPageView, trackButtonClick } from '../utils/analytics';
import { useLoadingState } from '../hooks/useLoadingState';
import { useMobile } from '../hooks/use-mobile';
import { SecondaryStyles } from '../components/SecondaryStyles';
import { Button } from '../components/ui/button';
import { SecurePurchaseElement, BuyButton } from '../components/SecurePurchaseElement';
import { useAuthStore } from '../store/authStore';
import { useABTest } from '../hooks/useABTest';
import { SquarePen } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { ArrowLeft, Lock } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResultPage = () => {
  const { primaryStyle, secondaryStyles } = useQuizResults();
  const { user } = useAuthStore();
  const { currentVariation, registerConversion, isLoading: abTestLoading } = useABTest('result');
  const isMobile = useMobile();
  const { isLoading, completeLoading } = useLoadingState({ 
    minDuration: 50,
    disableTransitions: isMobile
  });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (primaryStyle) {
      window.scrollTo(0, 0);
      trackPageView('results');
      completeLoading();
    }
  }, [primaryStyle, completeLoading]);

  if (!primaryStyle) {
    return <ResultSkeleton />;
  }

  if (isLoading || abTestLoading) {
    return <ResultSkeleton primaryStyle={primaryStyle} />;
  }

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  const handleCheckout = () => {
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    
    if (currentVariation) {
      registerConversion();
    }

    let checkoutUrl = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
    if (currentVariation?.content?.checkoutUrl) {
      checkoutUrl = currentVariation.content.checkoutUrl;
    }

    window.location.href = checkoutUrl;
  };

  const pricing = (() => {
    const defaultPricing = {
      regularPrice: 'R$ 175,00',
      currentPrice: 'R$ 39,00',
      installments: '4X de R$ 10,86'
    };

    if (currentVariation?.content?.pricing) {
      return { ...defaultPricing, ...currentVariation.content.pricing };
    }

    return defaultPricing;
  })();

  const isAdmin = user && typeof user === 'object' && 'role' in user && user.role === 'admin';

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: '#fffaf7',
        color: '#432818'
      }}
    >
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
      <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-[#B89B7A]/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <ResultHeader primaryStyle={primaryStyle} userName={user?.userName} />

      {/* Admin Edit Button */}
      {isAdmin && (
        <div className="container mx-auto px-4 py-2 max-w-5xl">
          <Link 
            to="/resultado/editor"
            className="inline-flex items-center gap-1.5 text-sm py-1.5 px-3 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <SquarePen className="h-3.5 w-3.5" />
            <span>Editar Página</span>
          </Link>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl relative z-10">
        {/* Main Result Card */}
        <Card className="p-6 sm:p-8 md:p-10 mb-12 bg-white/95 backdrop-blur-sm shadow-lg border border-[#B89B7A]/30 rounded-xl">
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={100}>
            {/* Title Section */}
            <div className="text-center mb-10">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-playfair text-[#432818] mb-6">
                Seu Estilo Predominante
              </h1>
              
              {/* Progress Bar */}
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm md:text-base font-medium text-[#8F7A6A]">{primaryStyle.category}</span>
                  <span className="text-[#aa6b5d] font-semibold text-lg">{primaryStyle.percentage}%</span>
                </div>
                <Progress 
                  value={primaryStyle.percentage} 
                  className="h-3 bg-[#F3E8E6]"
                  indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]"
                />
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-6 order-2 md:order-1">
                <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={150}>
                  <p className="text-[#432818] leading-relaxed text-base md:text-lg">
                    {description}
                  </p>
                </AnimatedWrapper>

                <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={200}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#B89B7A]/20">
                    <h3 className="text-lg font-medium text-[#432818] mb-4">
                      Estilos que Também Influenciam Você
                    </h3>
                    <SecondaryStyles secondaryStyles={secondaryStyles} />
                  </div>
                </AnimatedWrapper>
              </div>

              {/* Right Column - Style Image */}
              <AnimatedWrapper 
                animation={isMobile ? "none" : "scale"} 
                show={true} 
                duration={500} 
                delay={100}
                className="order-1 md:order-2"
              >
                <div className="max-w-[220px] md:max-w-[300px] mx-auto relative">
                  <img
                    src={image}
                    alt={`Estilo ${category}`}
                    width={300}
                    height={Math.round(390)}
                    className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                  <div className="absolute -top-3 -right-3 w-14 h-14 border-t-2 border-r-2 border-[#B89B7A] dark:border-[#E0C9B1]" />
                  <div className="absolute -bottom-3 -left-3 w-14 h-14 border-b-2 border-l-2 border-[#B89B7A] dark:border-[#E0C9B1]" />
                </div>
              </AnimatedWrapper>
            </div>

            {/* Style Guide Section */}
            <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={50}>
              <div className="mt-12 md:mt-16 max-w-[680px] mx-auto relative p-5 bg-gradient-to-br from-[#fdfbf9] to-[#faf5f0] dark:from-[#3a2e26] dark:to-[#332820] rounded-xl shadow-lg border border-[#B89B7A]/30">
                <img
                  src={guideImage}
                  alt={`Guia de Estilo ${category}`}
                  width={680}
                  height={450}
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  loading="eager"
                  style={{objectFit: 'contain'}}
                />
                <div className="absolute -top-5 -right-5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] dark:from-[#D4B79F] dark:to-[#C8A88A] text-white px-5 py-2 rounded-full shadow-lg text-base font-medium transform rotate-6">
                  Seu Guia Detalhado
                </div>
              </div>
            </AnimatedWrapper>
          </AnimatedWrapper>
        </Card>

        {/* Bonus Section */}
        <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={700}>
          <BonusSection />
        </AnimatedWrapper>

        {/* First Offer Section */}
        <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={750}>
          <div className="my-14 text-center max-w-3xl mx-auto bg-[#f9f6f3] p-8 rounded-2xl shadow-md border border-[#B89B7A]/20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#aa6b5d] mb-6">
              Está Gostando de Descobrir Seu Estilo?
            </h3>
            <p className="text-lg text-[#432818] mb-6 max-w-2xl mx-auto">
              Veja como aplicar esse conhecimento em suas roupas, maquiagem e acessórios para criar uma imagem autêntica e impactante.
            </p>
            <Button
              onClick={handleCheckout}
              className="text-white py-5 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 mb-3"
              style={{
                background: 'linear-gradient(to right, #4CAF50, #45a049)',
                boxShadow: '0 6px 18px rgba(76, 175, 80, 0.35)',
                fontSize: '1.1rem'
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="flex items-center justify-center gap-3">
                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${hovered ? 'scale-125' : ''}`} />
                Quero meu Guia de Estilo Agora
              </span>
            </Button>
          </div>
        </AnimatedWrapper>

        {/* Methods and Guarantee Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={800} className="flex flex-col">
            <MethodsSection />
          </AnimatedWrapper>
          <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={850} className="flex flex-col">
            <GuaranteeSection />
          </AnimatedWrapper>
        </div>

        {/* Offer Section */}
        <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={850}>
          <OfferSection />
        </AnimatedWrapper>

        {/* Testimonials */}
        <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={900}>
          <Testimonials />
        </AnimatedWrapper>

        {/* Main Call to Action Section */}
        <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={950}>
          <div className="text-center my-14">
            <div className="bg-[#f9f6f2] p-8 rounded-xl border border-[#B89B7A]/20 shadow-md mb-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-center text-[#aa6b5d] mb-5">
                Descubra Como Aplicar Seu Estilo na Prática
              </h3>
              <div className="flex justify-center">
                <ArrowLeft className="w-10 h-10 text-[#B89B7A] animate-bounce" />
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="text-white py-5 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 mb-3"
              style={{
                background: 'linear-gradient(to right, #4CAF50, #45a049)',
                boxShadow: '0 6px 18px rgba(76, 175, 80, 0.35)',
                fontSize: '1.2rem'
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="flex items-center justify-center gap-3">
                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${hovered ? 'scale-125' : ''}`} />
                Quero meu Guia de Estilo Agora
              </span>
            </Button>

            <div className="mt-3 inline-block bg-[#aa6b5d]/10 px-6 py-2 rounded-full">
              <p className="text-sm font-medium text-[#aa6b5d] flex items-center justify-center gap-1.5">
                {pricing.installments}
              </p>
            </div>

            <SecurePurchaseElement />
          </div>
        </AnimatedWrapper>

        {/* Transformations Block */}
        <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={1050}>
          <TransformationsBlock />
        </AnimatedWrapper>

        {/* Final Detailed Offer Section */}
        <AnimatedWrapper animation={isMobile ? "none" : "fade"} show={true} duration={400} delay={1100}>
          <div className="text-center mt-14 mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair text-[#aa6b5d] mb-4">
              Vista-se de Você — na Prática
            </h2>
            <div className="mx-auto w-24 h-1 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full mb-6" />
            
            <p className="text-[#432818] mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção. O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir com autenticidade e transformar sua imagem em ferramenta de poder.
            </p>

            {/* Features and Pricing Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Features Column */}
              <div className="bg-gradient-to-r from-[#fff8f4] to-[#faf5f0] p-7 rounded-xl border border-[#B89B7A]/20 shadow-md">
                <h3 className="text-xl md:text-2xl font-medium text-[#aa6b5d] mb-5">
                  O Guia de Estilo e Imagem + Bônus Exclusivos
                </h3>
                <ul className="space-y-4 text-left text-[#432818]">
                  {[
                    'Looks com intenção e identidade',
                    'Cores, modelagens e tecidos a seu favor',
                    'Imagem alinhada aos seus objetivos',
                    'Guarda-roupa funcional, sem compras por impulso'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white mr-3 mt-0.5">
                        <CircleCheckBig className="h-4 w-4" />
                      </div>
                      <span className="text-base md:text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing Column */}
              <div className="bg-white p-7 rounded-xl shadow-xl border border-[#B89B7A]/20 max-w-md mx-auto transform hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-xl md:text-2xl font-medium text-center text-[#aa6b5d] mb-5">
                  O Que Você Recebe Hoje
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 border-b border-[#B89B7A]/10">
                    <span className="font-medium">Guia Principal</span>
                    <span className="font-semibold">R$ 67,00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b border-[#B89B7A]/10">
                    <span className="font-medium">Bônus - Peças-chave</span>
                    <span className="font-semibold">R$ 79,00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b border-[#B89B7A]/10">
                    <span className="font-medium">Bônus - Visagismo Facial</span>
                    <span className="font-semibold">R$ 29,00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 pt-4 font-bold">
                    <span className="text-lg">Valor Total</span>
                    <div className="relative">
                      <span className="text-lg">{pricing.regularPrice}</span>
                      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#ff5a5a] transform -translate-y-1/2 -rotate-3" />
                    </div>
                  </div>
                </div>

                <div className="text-center p-5 bg-[#f9f5f0] rounded-lg border border-[#B89B7A]/10">
                  <p className="text-sm text-[#aa6b5d] uppercase font-medium">Hoje por apenas</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                    {pricing.currentPrice}
                  </p>
                  <p className="text-xs text-[#3a3a3a]/60 mt-1">
                    Pagamento único ou em {pricing.installments}
                  </p>
                </div>

                <div className="mt-5">
                  <img 
                    src="https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                    alt="Métodos de pagamento"
                    className="w-full rounded-lg"
                    loading="lazy"
                    width="400"
                    height="100"
                  />
                </div>
              </div>
            </div>

            {/* Final CTA Button */}
            <Button
              onClick={handleCheckout}
              className="text-white py-6 px-10 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 mb-5"
              style={{
                background: 'linear-gradient(to right, #4CAF50, #45a049)',
                boxShadow: '0 6px 18px rgba(76, 175, 80, 0.35)',
                fontSize: '1.25rem'
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="flex items-center justify-center gap-3">
                <ShoppingCart className={`w-6 h-6 transition-transform duration-300 ${hovered ? 'scale-125' : ''}`} />
                <span>Garantir Meu Guia + Bônus Especiais</span>
              </span>
            </Button>

            <SecurePurchaseElement />

            <p className="text-sm text-[#aa6b5d] mt-3 flex items-center justify-center gap-1.5">
              <Lock className="w-4 h-4" />
              <span>Oferta exclusiva nesta página</span>
            </p>
          </div>
        </AnimatedWrapper>
      </div>

      <BuyButton />
    </div>
  );
};

export default ResultPage;
