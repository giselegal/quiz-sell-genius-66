import React, { useEffect, useState, Suspense, lazy } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { useGlobalStyles } from "@/hooks/useGlobalStyles";
import { Header } from "@/components/result/Header";
import { styleConfig } from "@/config/styleConfig";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  CheckCircle,
  ArrowDown,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import SecondaryStylesSection from "@/components/quiz-result/SecondaryStylesSection";
import ErrorState from "@/components/result/ErrorState";
import { Button } from "@/components/ui/button";
import { useLoadingState } from "@/hooks/useLoadingState";
import { useIsLowPerformanceDevice } from "@/hooks/use-mobile";
import ResultSkeleton from "@/components/result/ResultSkeleton";
import { trackButtonClick } from "@/utils/analytics";
import BuildInfo from "@/components/BuildInfo";
import SecurePurchaseElement from "@/components/result/SecurePurchaseElement";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ProgressiveImage from "@/components/ui/progressive-image";
import ResourcePreloader from "@/components/result/ResourcePreloader";
import PerformanceMonitor from "@/components/result/PerformanceMonitor";

// Seções carregadas via lazy
const BeforeAfterTransformation = lazy(
  () => import("@/components/result/BeforeAfterTransformation")
);
const MotivationSection = lazy(
  () => import("@/components/result/MotivationSection")
);
const BonusSection = lazy(() => import("@/components/result/BonusSection"));
const Testimonials = lazy(
  () => import("@/components/quiz-result/sales/Testimonials")
);
const GuaranteeSection = lazy(
  () => import("@/components/result/GuaranteeSection")
);
const MentorSection = lazy(() => import("@/components/result/MentorSection"));

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth(); // Get user from auth context
  const [imagesLoaded, setImagesLoaded] = useState({
    style: false,
    guide: false,
  });
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isLoading, completeLoading } = useLoadingState({
    // Para evitar a exibição sequencial de duas barras de progresso,
    // reduzimos drasticamente o tempo de carregamento quando os resultados
    // já foram pré-carregados durante o quiz
    minDuration: isLowPerformance ? 100 : 300,
    disableTransitions: isLowPerformance,
  });

  // Button hover state
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);

    // Verificar se os resultados já foram pré-carregados
    const hasPreloadedResults =
      localStorage.getItem("preloadedResults") === "true";

    // Se os resultados já foram pré-carregados durante o quiz, pulamos o skeleton quase que imediatamente
    if (hasPreloadedResults) {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
      return; // Retornamos cedo sem criar o timeout
    }

    // Definir timeout de segurança apenas se não tiver pré-carregado
    const safetyTimeout = setTimeout(() => {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
    }, 2500);

    return () => clearTimeout(safetyTimeout);
  }, [primaryStyle, globalStyles.logo, completeLoading]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  const handleCTAClick = () => {
    // Track checkout initiation
    trackButtonClick("checkout_button", "Iniciar Checkout", "results_page");
    window.location.href =
      "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912";
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: globalStyles.backgroundColor || "#fffaf7",
        color: globalStyles.textColor || "#432818",
        fontFamily: globalStyles.fontFamily || "inherit",
      }}
    >
      {/* Componente de pré-carregamento de recursos */}
      <ResourcePreloader />

      {/* Monitor de desempenho (componente invisível) */}
      <PerformanceMonitor />

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
        userName={user?.userName}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* ATTENTION: Primary Style Card */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant">
          <AnimatedWrapper
            animation="fade"
            show={true}
            duration={600}
            delay={300}
          >
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="text-sm text-[#8F7A6A] text-center mb-2">
                  Seu estilo predominante
                </div>
                <Progress
                  value={primaryStyle.percentage}
                  className="h-3 bg-[#F3E8E6] rounded-full overflow-hidden"
                  indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] transition-all duration-500 ease-in-out"
                />
                <div className="text-right text-sm text-[#8F7A6A] mt-1">
                  {primaryStyle.percentage}%
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <AnimatedWrapper
                  animation={isLowPerformance ? "none" : "fade"}
                  show={true}
                  duration={400}
                  delay={400}
                >
                  <p className="text-[#432818] leading-relaxed">
                    {description}
                  </p>
                </AnimatedWrapper>
                <AnimatedWrapper
                  animation={isLowPerformance ? "none" : "fade"}
                  show={true}
                  duration={400}
                  delay={600}
                >
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10 glass-panel">
                    <h3 className="text-lg font-medium text-[#432818] mb-2">
                      Estilos que Também Influenciam Você
                    </h3>
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  </div>
                </AnimatedWrapper>
              </div>
              <AnimatedWrapper
                animation={isLowPerformance ? "none" : "scale"}
                show={true}
                duration={500}
                delay={500}
              >
                <div className="max-w-[238px] mx-auto relative">
                  {" "}
                  {/* Reduzido de 340px para 238px (30% menor) */}
                  <ProgressiveImage
                    src={`${image}?q=85&f=auto&w=238`}
                    alt={`Estilo ${category}`}
                    width={238}
                    height={298}
                    className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                    loading="eager"
                    fetchPriority="high"
                    onLoad={() =>
                      setImagesLoaded((prev) => ({ ...prev, style: true }))
                    }
                  />
                  {/* Elegant decorative corner */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
                </div>
              </AnimatedWrapper>
            </div>
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
              delay={800}
            >
              <div className="mt-8 max-w-[540px] mx-auto relative">
                <ProgressiveImage
                  src={`${guideImage}?q=85&f=auto&w=540`}
                  alt={`Guia de Estilo ${category}`}
                  loading="lazy"
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  onLoad={() =>
                    setImagesLoaded((prev) => ({ ...prev, guide: true }))
                  }
                />
                {/* Elegant badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium transform rotate-12">
                  Exclusivo
                </div>
              </div>
            </AnimatedWrapper>
          </AnimatedWrapper>
        </Card>

        {/* INTEREST: Before/After Transformation Section */}
        <Suspense
          fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}
        >
          <AnimatedWrapper
            animation={isLowPerformance ? "none" : "fade"}
            show
            duration={400}
            delay={700}
          >
            <BeforeAfterTransformation handleCTAClick={handleCTAClick} />
          </AnimatedWrapper>
        </Suspense>

        {/* INTEREST: Motivation Section */}
        <Suspense
          fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}
        >
          <AnimatedWrapper
            animation={isLowPerformance ? "none" : "fade"}
            show
            duration={400}
            delay={800}
          >
            <MotivationSection />
          </AnimatedWrapper>
        </Suspense>

        {/* INTEREST: Bonus Section */}
        <Suspense
          fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}
        >
          <AnimatedWrapper
            animation={isLowPerformance ? "none" : "fade"}
            show
            duration={400}
            delay={850}
          >
            <BonusSection />
          </AnimatedWrapper>
        </Suspense>

        {/* DESIRE: Testimonials */}
        <Suspense
          fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}
        >
          <AnimatedWrapper
            animation={isLowPerformance ? "none" : "fade"}
            show
            duration={400}
            delay={900}
          >
            <Testimonials />
          </AnimatedWrapper>
        </Suspense>

        {/* DESIRE: Guarantee Section */}
        <Suspense
          fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}
        >
          <AnimatedWrapper
            animation={isLowPerformance ? "none" : "fade"}
            show
            duration={400}
            delay={1000}
          >
            <GuaranteeSection />
          </AnimatedWrapper>
        </Suspense>

        {/* DESIRE: Mentor and Trust Elements */}
        <Suspense
          fallback={<LoadingSpinner size="lg" className="mx-auto py-8" />}
        >
          <AnimatedWrapper
            animation={isLowPerformance ? "none" : "fade"}
            show
            duration={400}
            delay={1050}
          >
            <MentorSection />
          </AnimatedWrapper>
        </Suspense>

        {/* ACTION: Final Value Proposition and CTA */}
        <AnimatedWrapper
          animation={isLowPerformance ? "none" : "fade"}
          show
          duration={400}
          delay={1100}
        >
          <div className="text-center mt-10">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
              Vista-se de Você — na Prática
            </h2>
            <div className="elegant-divider"></div>
            <p className="text-[#432818] mb-6 max-w-xl mx-auto">
              Agora que você conhece seu estilo, é hora de aplicá-lo com clareza
              e intenção. O Guia da Gisele Galvão foi criado para mulheres como
              você — que querem se vestir com autenticidade e transformar sua
              imagem em ferramenta de poder.
            </p>

            <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-6 rounded-lg mb-6 border border-[#B89B7A]/10 glass-panel">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">
                O Guia de Estilo e Imagem + Bônus Exclusivos
              </h3>
              <ul className="space-y-3 text-left max-w-xl mx-auto text-[#432818]">
                {[
                  "Looks com intenção e identidade",
                  "Cores, modelagens e tecidos a seu favor",
                  "Imagem alinhada aos seus objetivos",
                  "Guarda-roupa funcional, sem compras por impulso",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white mr-2 mt-0.5">
                      <CheckCircle className="h-3 w-3" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#fffaf7] px-4 py-8 rounded-lg text-center mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
                  Guia de Estilo e Imagem + Bônus Exclusivos
                </h2>
                <p className="text-[#3a3a3a]">
                  Descubra seu estilo verdadeiro e aprenda a aplicá-lo
                </p>
              </div>

              <div className="bg-white text-left p-6 rounded-lg shadow-md border border-[#B89B7A]/20 card-elegant mb-8 max-w-md mx-auto">
                <h3 className="text-xl font-medium text-center text-[#aa6b5d] mb-4">
                  O Que Você Recebe Hoje
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                    <span>Guia Principal</span>
                    <span className="font-medium">R$ 67,00</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border-b border-[#B89B7A]/10">
                    <span>Bônus - Peças-chave</span>
                    <span className="font-medium">R$ 79,00</span>
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
                <div className="bg-[#f9f4ef] p-6 rounded-lg space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
                  <div className="text-center md:text-left space-y-1">
                    <p className="text-sm text-[#aa6b5d] uppercase font-medium">
                      Hoje por Apenas
                    </p>
                    <p className="text-4xl font-bold text-[#aa6b5d]">
                      5x de R$ 8,83
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-sm text-[#432818]">
                      Ou R$ 39,90 à vista
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleCTAClick}
              className="text-white text-sm leading-none py-3 px-6 md:py-5 md:px-8 rounded-md shadow-md transition-colors btn-3d w-full md:w-auto mb-2"
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
              }}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isButtonHovered ? "scale-110" : ""
                  }`}
                />
                <span>Garantir Meu Guia + Bônus Especiais</span>
              </span>
            </Button>

            <SecurePurchaseElement />

            <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Oferta exclusiva nesta página</span>
            </p>
          </div>
        </AnimatedWrapper>
      </div>

      <BuildInfo />
    </div>
  );
};

export default ResultPage;
