import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress'; // CORRECTED LINE HERE
import { Card } from '@/components/ui/card';
import { ShoppingCart, CheckCircle, ArrowDown, Lock } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import BeforeAfterTransformation from '@/components/result/BeforeAfterTransformation';
import BonusSection from '@/components/result/BonusSection';
import { Button } from '@/components/ui/button';
import { useLoadingState } from '@/hooks/useLoadingState';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import ResultSkeleton from '@/components/result/ResultSkeleton';
import { trackButtonClick } from '@/utils/analytics';
import BuildInfo from '@/components/BuildInfo';
import SecurePurchaseElement from '@/components/result/SecurePurchaseElement';
import { useAuth } from '@/context/AuthContext';
import PersonalizedHook from '@/components/result/PersonalizedHook';
import UrgencyCountdown from '@/components/result/UrgencyCountdown';
import StyleSpecificProof from '@/components/result/StyleSpecificProof';

const ResultPage: React.FC = () => {
  const {
    primaryStyle,
    secondaryStyles
  } = useQuiz();
  const {
    globalStyles
  } = useGlobalStyles();
  const {
    user
  } = useAuth(); // Get user from auth context
  const [imagesLoaded, setImagesLoaded] = useState({
    style: false,
    guide: false
  });
  const isLowPerformance = useIsLowPerformanceDevice();
  const {
    isLoading,
    completeLoading
  } = useLoadingState({
    minDuration: isLowPerformance ? 400 : 800,
    disableTransitions: isLowPerformance
  });

  // Button hover state
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);

    const criticalImages = [globalStyles.logo || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'];
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const {
      category
    } = primaryStyle;
    const {
      image,
      guideImage
    } = styleConfig[category];
    const styleImg = new Image();
    styleImg.src = `${image}?q=auto:best&f=auto&w=238`;
    styleImg.onload = () => setImagesLoaded(prev => ({
      ...prev,
      style: true
    }));
    const guideImg = new Image();
    guideImg.src = `${guideImage}?q=auto:best&f=auto&w=540`;
    guideImg.onload = () => setImagesLoaded(prev => ({
      ...prev,
      guide: true
    }));
  }, [primaryStyle, globalStyles.logo]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const {
    category
  } = primaryStyle;
  const {
    image,
    guideImage,
    description
  } = styleConfig[category];

  const handleCTAClick = () => {
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles.backgroundColor || '#fffaf7',
      color: globalStyles.textColor || '#432818',
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <Header primaryStyle={primaryStyle} logoHeight={globalStyles.logoHeight} logo={globalStyles.logo} logoAlt={globalStyles.logoAlt} userName={user?.userName} />

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* HOOK IMEDIATO: Personalized Hook with Primary CTA */}
        <AnimatedWrapper animation="fade" show={true} duration={600} delay={100}>
          <PersonalizedHook 
            styleCategory={category}
            userName={user?.userName}
            onCTAClick={handleCTAClick}
          />
        </AnimatedWrapper>

        {/* URGÊNCIA: Countdown Timer */}
        {/* Aumentando o mb para dar mais respiro após o countdown */}
        <AnimatedWrapper animation="fade" show={true} duration={400} delay={200} className="mb-8 md:mb-12">
          <UrgencyCountdown styleCategory={category} />
        </AnimatedWrapper>

        {/* PROVA SOCIAL: Style-Specific Social Proof */}
        {/* Aumentando o mb para dar mais respiro após o proof */}
        <AnimatedWrapper animation="fade" show={true} duration={400} delay={300} className="mb-8 md:mb-12">
          <StyleSpecificProof 
            styleCategory={category}
            userName={user?.userName}
          />
        </AnimatedWrapper>

        {/* ATTENTION: Primary Style Card */}
        {/* Este Card já tinha mb-10, vamos aumentar para mb-12 em mobile e md:mb-16 em desktop */}
        <Card className="p-6 mb-12 md:mb-16 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">
                    Seu estilo predominante
                  </span>
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress value={primaryStyle.percentage} className="h-2 bg-[#F3E8E6]" indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
                  <p className="text-[#432818] leading-relaxed">{description}</p>
                </AnimatedWrapper>
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10 glass-panel">
                    <h3 className="text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  </div>
                </AnimatedWrapper>
              </div>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={500}>
                <div className="max-w-[238px] mx-auto relative">
                  <img src={`${image}?q=auto:best&f=auto&w=238`} alt={`Estilo ${category}`} className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" loading="eager" fetchPriority="high" width="238" height="auto" />
                  {/* Elegant decorative corner */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
                </div>
              </AnimatedWrapper>
            </div>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800}>
              <div className="mt-8 max-w-[540px] mx-auto relative">
                <img src={`${guideImage}?q=auto:best&f=auto&w=540`} alt={`Guia de Estilo ${category}`} loading="lazy" className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" width="540" height="auto" />
                {/* Elegant badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12">
                  Exclusivo
                </div>
              </div>
            </AnimatedWrapper>
            
            {/* CTA Section after Style Guide */}
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={850}>
              <div className="mt-8 text-center">
                <h4 className="text-xl md:text-2xl font-semibold text-[#432818] mb-4 font-playfair">
                  Transforme Sua Imagem,{" "}
                  <span className="text-[#aa6b5d]">Revele Sua Essência</span>
                </h4>
                <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                  Seu estilo é uma ferramenta poderosa. Não se trata apenas de
                  roupas, mas de comunicar quem você é e aspira ser. Com a
                  orientação certa, você pode:
                </p>
                <ul className="space-y-3 text-gray-700 mb-8 max-w-xl mx-auto text-left">
                  {[
                    {
                      text: "Construir looks com intenção e identidade visual.",
                    },
                    {
                      text: "Utilizar cores, modelagens e tecidos a seu favor.",
                    },
                    {
                      text: "Alinhar sua imagem aos seus objetivos pessoais e profissionais.",
                    },
                    {
                      text: "Desenvolver um guarda-roupa funcional e inteligente.",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={handleCTAClick}
                  className="text-white py-3 px-8 rounded-lg transition-all duration-300 text-base font-medium"
                  style={{
                    background: "linear-gradient(to right, #aa6b5d, #B89B7A)",
                    boxShadow: "0 4px 14px rgba(184, 155, 122, 0.3)",
                  }}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isButtonHovered ? "scale-110" : ""
                      }`}
                    />
                    <span>Quero Transformar Minha Imagem</span>
                  </span>
                </Button>
              </div>
            </AnimatedWrapper>
          </AnimatedWrapper>
        </Card>

        {/* INTEREST: Before/After Transformation Section */}
        {/* Aumentando o mb para dar mais respiro */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={700} className="mb-8 md:mb-12">
          <BeforeAfterTransformation />
        </AnimatedWrapper>

        {/* INTEREST: Motivation Section */}
        {/* Aumentando o mb para dar mais respiro */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800} className="mb-8 md:mb-12">
          <MotivationSection />
        </AnimatedWrapper>

        {/* INTEREST: Bonus Section */}
        {/* Aumentando o mb para dar mais respiro */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={850} className="mb-8 md:mb-12">
          <BonusSection />
        </AnimatedWrapper>

        {/* DESIRE: Testimonials */}
        {/* Aumentando o mb para dar mais respiro */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={900} className="mb-8 md:mb-12">
          <Testimonials />
        </AnimatedWrapper>

        {/* DESIRE: Featured CTA (Green) */}
        {/* Aumentando o mb no container geral do CTA */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={950} className="mb-8 md:mb-12">
          <div className="text-center my-10"> {/* 'my-10' já dá margin top/bottom, mas podemos ajustar para ser mais consistente */}
            <div className="bg-[#f9f4ef] p-6 rounded-lg border border-[#B89B7A]/10 mb-6">
              <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">
                Descubra Como Aplicar Seu Estilo na Prática
              </h3>
              <div className="flex justify-center">
                <ArrowDown className="w-8 h-8 text-[#B89B7A] animate-bounce" />
              </div>
            </div>
            
            <Button onClick={handleCTAClick} className="text-white py-4 px-6 rounded-md btn-cta-green" onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)} style={{
              background: "linear-gradient(to right, #4CAF50, #45a049)",
              boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
            }}>
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                Quero meu Guia de Estilo Agora
              </span>
            </Button>
            
            <div className="mt-2 inline-block bg-[#aa6b5d]/10 px-3 py-1 rounded-full">
              <p className="text-sm text-[#aa6b5d] font-medium flex items-center justify-center gap-1">
                {/* Content was empty, removed extra spaces */}
              </p>
            </div>
            
            <SecurePurchaseElement />
          </div>
        </AnimatedWrapper>

        {/* DESIRE: Guarantee Section */}
        {/* Aumentando o mb para dar mais respiro */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1000} className="mb-8 md:mb-12">
          <GuaranteeSection />
        </AnimatedWrapper>

        {/* DESIRE: Mentor and Trust Elements */}
        {/* Aumentando o mb para dar mais respiro */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1050} className="mb-8 md:mb-12">
          <MentorSection />
        </AnimatedWrapper>

        {/* ACTION: Final Value Proposition and CTA */}
        {/* Container principal para o CTA final e preço. Ajustando o mt/mb */}
        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1100} className="mt-8 mb-12 md:mt-10 md:mb-16">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
              Vista-se de Você — na Prática
            </h2>
            <div className="elegant-divider"></div>
            <p className="text-[#432818] mb-6 max-w-xl mx-auto">
              Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção. 
              O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir 
              com autenticidade e transformar sua imagem em ferramenta de poder.
            </p>

            <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-6 rounded-lg mb-6 border border-[#B89B7A]/10 glass-panel">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">O Guia de Estilo e Imagem + Bônus Exclusivos</h3>
              <ul className="space-y-3 text-left max-w-xl mx-auto text-[#432818]">
                {["Looks com intenção e identidade", "Cores, modelagens e tecidos a seu favor", "Imagem alinhada aos seus objetivos", "Guarda-roupa funcional, sem compras por impulso"].map((item, index) => <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white mr-2 mt-0.5">
                      <CheckCircle className="h-3 w-3" />
                    </div>
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>

            {/* ANCORAGEM DE PREÇO: Strategic Price Anchoring */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#B89B7A]/20 card-elegant mb-8 max-w-md mx-auto">
              <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">O Que Você Recebe Hoje</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Guia Principal</span>
                  <span className="font-medium">R$ 79,00</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Bônus - Peças-chave</span>
                  <span className="font-medium">R$ 67,00</span>
                </div>
                <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                  <span>Bônus - Visagismo Facial</span>
                  <span className="font-medium">R$ 29,00</span>
                </div>
                <div className="flex justify-between items-center p-2 pt-3 font-bold">
                  <span>Valor Total</span>
                  <div className="relative">
                    <span>R$ 175,00</span>
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#ff5a5a] transform -translate-y-1/2 -rotate-3"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-r from-[#4CAF50]/10 to-[#45a049]/10 rounded-lg border border-[#4CAF50]/30">
                <p className="text-sm text-[#4CAF50] uppercase font-medium">Especial para {category}: -78% HOJE</p>
                <p className="text-4xl font-bold text-[#4CAF50]">R$ 39,00</p>
                <p className="text-xs text-[#3a3a3a]/60 mt-1">ou 5x de R$ 8,83</p>
                <div className="mt-2 bg-[#ff6b6b]/10 rounded-full px-3 py-1 inline-block">
                  <p className="text-xs text-[#ff6b6b] font-medium">💥 Preço volta para R$ 175 em breve</p>
                </div>
              </div>
            </div>

           <Button 
              onClick={handleCTAClick} 
              className="text-white py-6 px-3 sm:px-8 md:px-10 rounded-lg mb-4 w-full max-w-md mx-auto block
                         transition-all duration-300 transform-none hover:scale-105 active:scale-95
                         sm:transform hover:scale-105 sm:shadow-lg sm:hover:shadow-xl
                         min-w-0"
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
              }} 
              onMouseEnter={() => setIsButtonHovered(true)} 
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              {/* ATENÇÃO ÀS MUDANÇAS AQUI NO SPAN */}
              <span className="flex flex-wrap flex-col sm:flex-row items-center justify-center 
                                 gap-1 sm:gap-3 
                                 text-[0.65rem] xs:text-xs sm:text-base md:text-lg lg:text-xl 
                                 leading-tight sm:leading-normal font-semibold
                                 min-w-0 text-balance" /* Adicionado flex-wrap e text-balance */>
                <ShoppingCart className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-120' : ''}`} />
                <span>GARANTIR MEU GUIA {category.toUpperCase()} AGORA</span>
              </span>
            </Button>
            
            <div className="text-center mb-4">
              <div className="bg-[#ff6b6b]/10 rounded-full px-2 py-1 inline-block border border-[#ff6b6b]/20">
                <p className="text-[0.65rem] xs:text-xs sm:text-sm text-[#ff6b6b] font-medium animate-pulse leading-tight tracking-tight px-1 py-0.5">
                  ⚡ Esta oferta expira ao sair desta página
                </p>
              </div>
            </div>
            
            <SecurePurchaseElement />

            <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Oferta exclusiva - Apenas nesta página</span>
            </p>
          </div>
        </AnimatedWrapper>
      </div>

      <BuildInfo />
    </div>
  );
};
export default ResultPage;