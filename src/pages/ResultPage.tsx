import React, { useEffect, useState, Suspense, lazy, useCallback } from "react";
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
  Clock,
  ChevronLeft,
  ChevronRight,
  Shield,
  Award,
  Hourglass,
  Star,
  Gift,
  Target,
  Zap,
  TrendingUp,
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
import GuaranteeSeal from "@/components/result/GuaranteeSeal";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ProgressiveImage from "@/components/ui/progressive-image";
import ResourcePreloader from "@/components/result/ResourcePreloader";
import PerformanceMonitor from "@/components/result/PerformanceMonitor";
import {
  hotmartWebhookManager,
  storeUserForHotmart,
} from "@/utils/hotmartWebhook";

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

// Design tokens - SISTEMA APRIMORADO
const tokens = {
  colors: {
    primary: "#B89B7A",
    primaryDark: "#A1835D",
    primaryLight: "#D4B79F",
    secondary: "#aa6b5d",
    secondaryDark: "#8F5A4D",
    secondaryLight: "#C28A7D",
    background: "#fffaf7",
    backgroundAlt: "#f9f4ef",
    backgroundCard: "#ffffff",
    text: "#2C1810", // Mais escuro para melhor contraste
    textSecondary: "#5D4A3A", // Melhor hierarquia
    textMuted: "#8F7A6A",
    textLight: "#B5A394",
    success: "#4CAF50",
    successDark: "#45a049",
    warning: "#FF6B35",
    border: "rgba(184, 155, 122, 0.15)",
    borderLight: "rgba(184, 155, 122, 0.08)",
    overlay: "rgba(44, 24, 16, 0.02)",
  },
  // SISTEMA DE SPACING REFINADO E PADRONIZADO
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.5rem", // 24px
    "2xl": "2rem", // 32px
    "3xl": "3rem", // 48px
    "4xl": "4rem", // 64px
    "5xl": "6rem", // 96px
    "6xl": "7rem", // 112px
  },
  // SHADOWS MAIS SUTIS E ELEGANTES
  shadows: {
    xs: "0 1px 2px rgba(184, 155, 122, 0.05)",
    sm: "0 2px 4px rgba(184, 155, 122, 0.08)",
    md: "0 4px 12px rgba(184, 155, 122, 0.12)",
    lg: "0 8px 24px rgba(184, 155, 122, 0.15)",
    xl: "0 16px 40px rgba(184, 155, 122, 0.18)",
    cta: "0 8px 32px rgba(76, 175, 80, 0.25)",
    inner: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  },
  // BORDER RADIUS HARMONIOSO
  radius: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    full: "9999px",
  },
  // TIPOGRAFIA MELHORADA
  typography: {
    fontSizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },
    lineHeights: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
  },
};

// Componente de título melhorado - ESPAÇAMENTO PADRONIZADO
const SectionTitle = React.memo<{
  children: React.ReactNode;
  subtitle?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
  variant?: "primary" | "secondary" | "simple";
  centered?: boolean;
}>(
  ({
    children,
    subtitle,
    size = "xl",
    className = "",
    variant = "simple",
    centered = true,
  }) => (
    <AnimatedWrapper
      className={`${centered ? "text-center" : ""} mb-12 lg:mb-16 ${className}`}
      animation="fade"
      show={true}
      duration={600}
    >
      {/* Decoração superior refinada */}
      {variant === "primary" && (
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
        </div>
      )}

      {/* Título com melhor hierarquia */}
      <h2
        className={`font-playfair font-bold leading-tight tracking-tight ${
          variant === "primary"
            ? "bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent mb-8"
            : "text-[#2C1810] mb-6"
        } ${
          size === "xl"
            ? "text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
            : size === "lg"
            ? "text-xl md:text-2xl lg:text-3xl xl:text-4xl"
            : "text-lg md:text-xl lg:text-2xl xl:text-3xl"
        }`}
      >
        {children}
      </h2>

      {/* Subtítulo melhorado */}
      {subtitle && (
        <div className="max-w-4xl mx-auto">
          <p className="text-base md:text-lg lg:text-xl text-[#5D4A3A] leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>
      )}

      {/* Linha decorativa */}
      {variant === "primary" && (
        <div className="w-24 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto mt-8 shadow-sm"></div>
      )}
    </AnimatedWrapper>
  )
);

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  const [imagesLoaded, setImagesLoaded] = useState({
    style: false,
    guide: false,
  });
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 100 : 300,
    disableTransitions: isLowPerformance,
  });

  // Estados de interação melhorados
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("primary-style");

  // Timer otimizado
  const [timer, setTimer] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer.seconds > 0) {
          return { ...prevTimer, seconds: prevTimer.seconds - 1 };
        } else if (prevTimer.minutes > 0) {
          return { ...prevTimer, minutes: prevTimer.minutes - 1, seconds: 59 };
        } else if (prevTimer.hours > 0) {
          return { hours: prevTimer.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);

    const hasPreloadedResults =
      localStorage.getItem("preloadedResults") === "true";

    if (hasPreloadedResults) {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
      return;
    }

    const safetyTimeout = setTimeout(() => {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
    }, 2500);

    return () => clearTimeout(safetyTimeout);
  }, [primaryStyle, globalStyles.logo, completeLoading]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);

  // Scroll tracking melhorado
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);

      // Tracking de seção ativa
      const sections = [
        "primary-style",
        "transformations",
        "motivation",
        "bonuses",
        "testimonials",
        "guarantee",
        "mentor",
        "cta",
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element?.getBoundingClientRect().top <= 250) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    interface WindowWithCTAProcessing extends Window {
      ctaClickProcessing?: boolean;
    }

    const windowTyped = window as WindowWithCTAProcessing;

    if (windowTyped.ctaClickProcessing) return;
    windowTyped.ctaClickProcessing = true;

    // Capturar dados do usuário para correlação futura com vendas Hotmart
    if (user?.email) {
      // Armazenar dados do usuário com UTMs para correlação futura
      storeUserForHotmart(user.email, {
        quiz_results: primaryStyle,
        funnel_step: "checkout_initiation",
        page_url: window.location.href,
      });

      console.log(
        "[Hotmart Integration] Dados do usuário armazenados para:",
        user.email
      );
    }

    trackButtonClick("checkout_button", "Iniciar Checkout", "results_page");

    if (window.innerWidth >= 768) {
      window.open(
        "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912&utm_source=quiz&utm_medium=abtest&utm_campaign=testeA",
        "_blank"
      );
    } else {
      window.location.href =
        "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912&utm_source=quiz&utm_medium=abtest&utm_campaign=testeA";
    }

    setTimeout(() => {
      windowTyped.ctaClickProcessing = false;
    }, 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.text,
        fontFamily: globalStyles.fontFamily || "Inter, system-ui, sans-serif",
      }}
    >
      {/* Scrollbar personalizada */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(184, 155, 122, 0.1);
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #B89B7A, #aa6b5d);
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #aa6b5d, #B89B7A);
          }

          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Focus states melhorados */
          button:focus-visible,
          a:focus-visible {
            outline: 2px solid #B89B7A;
            outline-offset: 2px;
          }
        `,
        }}
      />

      {/* Preloaders */}
      <ResourcePreloader />
      <PerformanceMonitor />

      {/* Background decorativo refinado */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#B89B7A]/8 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#aa6b5d]/6 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-gradient-to-r from-[#B89B7A]/4 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Header minimalista e elegante */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#B89B7A]/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto max-w-6xl px-4 py-4 lg:py-6">
          <div className="flex justify-center">
            <img
              src={globalStyles.logo}
              alt={globalStyles.logoAlt || "Logo"}
              style={{ height: globalStyles.logoHeight || "50px" }}
              className="h-auto object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </header>

      {/* Navigation dots refinada */}
      <div
        className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-500 ${
          isScrolled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
      >
        <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-[#B89B7A]/20">
          {[
            { id: "primary-style", label: "Seu Estilo" },
            { id: "transformations", label: "Transformações" },
            { id: "motivation", label: "Motivação" },
            { id: "bonuses", label: "Bônus" },
            { id: "testimonials", label: "Depoimentos" },
            { id: "guarantee", label: "Garantia" },
            { id: "cta", label: "Adquirir" },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`group relative w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] scale-125 shadow-md"
                  : "bg-[#B5A394] hover:bg-[#B89B7A] hover:scale-110"
              }`}
              aria-label={`Ir para seção ${section.label}`}
            >
              {/* Tooltip */}
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-[#2C1810] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {section.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CONTAINER PRINCIPAL - ESPAÇAMENTO PADRONIZADO */}
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-6xl relative z-10">
        {/* Primary Style Card - ESPAÇAMENTO OTIMIZADO */}
        <section id="primary-style" className="scroll-mt-24 mb-24 lg:mb-28">
          <Card
            className="relative overflow-hidden bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15 rounded-2xl p-6 lg:p-10"
            style={{ boxShadow: tokens.shadows.xl }}
          >
            {/* Decoração de cantos elegante */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#B89B7A]/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#B89B7A]/20 rounded-br-2xl"></div>

            <AnimatedWrapper
              animation="fade"
              show={true}
              duration={600}
              delay={200}
            >
              {/* Header personalizado - ESPAÇAMENTO PADRONIZADO */}
              <div className="text-center mb-12 lg:mb-16">
                {user?.userName && (
                  <AnimatedWrapper
                    className="mb-8"
                    animation="scale"
                    show={true}
                    duration={500}
                    delay={100}
                  >
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] px-6 py-3 rounded-full border border-[#B89B7A]/20">
                      <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                        Parabéns, {user.userName}!
                      </span>
                    </div>
                  </AnimatedWrapper>
                )}

                {/* Título principal melhorado */}
                <h1 className="text-2xl lg:text-4xl xl:text-5xl font-playfair text-[#2C1810] mb-8 leading-tight">
                  Descobrimos Seu Estilo Predominante:
                  <br />
                  <span className="text-3xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] bg-clip-text text-transparent mt-2 block">
                    {category}
                  </span>
                </h1>

                {/* Progress bar elegante - ESPAÇAMENTO PADRONIZADO */}
                <div className="max-w-lg mx-auto mb-8">
                  <div className="flex items-center justify-between text-sm font-medium text-[#5D4A3A] mb-3">
                    <span>Compatibilidade</span>
                    <span className="text-lg font-bold text-[#B89B7A]">
                      {primaryStyle.percentage}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={primaryStyle.percentage}
                      className="h-3 bg-gradient-to-r from-[#f5f2ec] to-[#f0ebe3] rounded-full overflow-hidden border border-[#B89B7A]/10"
                      indicatorClassName="bg-gradient-to-r from-[#B89B7A] via-[#D4B79F] to-[#aa6b5d] transition-all duration-1000 ease-out rounded-full"
                      style={{ boxShadow: tokens.shadows.inner }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Grid principal otimizado - ESPAÇAMENTO PADRONIZADO */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Conteúdo textual */}
                <div className="space-y-8 order-2 lg:order-1">
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                    delay={300}
                  >
                    <div className="space-y-6">
                      {/* Mensagem principal */}
                      <div
                        className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-xl p-6 border border-[#B89B7A]/10"
                        style={{ boxShadow: tokens.shadows.sm }}
                      >
                        <p className="text-[#2C1810] leading-relaxed text-lg font-medium mb-6">
                          <strong className="text-[#aa6b5d]">
                            Agora você tem clareza total
                          </strong>{" "}
                          sobre quem você é e como expressar sua personalidade
                          através do seu estilo!
                        </p>

                        {/* Descrição do estilo */}
                        <div className="bg-white/60 rounded-lg p-4 border border-[#B89B7A]/5">
                          <p className="text-[#2C1810] text-base leading-relaxed">
                            <strong className="text-[#aa6b5d]">
                              Seu estilo {category}
                            </strong>{" "}
                            revela uma mulher que{" "}
                            {category === "Natural"
                              ? "valoriza autenticidade e conforto, sem abrir mão da elegância natural"
                              : category === "Clássico"
                              ? "aprecia sofisticação atemporal e peças que nunca saem de moda"
                              : category === "Contemporâneo"
                              ? "está sempre em sintonia com as tendências, mas de forma equilibrada"
                              : category === "Elegante"
                              ? "irradia refinamento e classe em cada detalhe do seu visual"
                              : category === "Romântico"
                              ? "expressa delicadeza e feminilidade através de looks encantadores"
                              : category === "Sexy"
                              ? "tem confiança para valorizar sua sensualidade de forma elegante"
                              : category === "Dramático"
                              ? "não tem medo de fazer declarações ousadas com seu estilo"
                              : "expressa criatividade e originalidade em cada combinação de roupas"}
                            .
                          </p>
                        </div>
                      </div>

                      {/* Call to action sutil */}
                      <div className="text-center p-4 bg-gradient-to-r from-[#B89B7A]/5 to-[#aa6b5d]/5 rounded-lg border border-[#B89B7A]/10">
                        <p className="text-base font-semibold text-[#2C1810] mb-2">
                          <strong>
                            Chega de ficar perdida no guarda-roupa!
                          </strong>
                        </p>
                        <p className="text-sm text-[#5D4A3A]">
                          Descubra como aplicar seu estilo no dia a dia
                        </p>
                      </div>
                    </div>
                  </AnimatedWrapper>

                  {/* Estilos secundários melhorados */}
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                    delay={500}
                  >
                    <div
                      className="bg-gradient-to-br from-white to-[#fff7f3] rounded-xl p-6 border border-[#B89B7A]/15"
                      style={{ boxShadow: tokens.shadows.md }}
                    >
                      <h3 className="text-xl font-semibold text-[#aa6b5d] mb-6 flex items-center gap-2">
                        Estilos que Também Influenciam Você
                      </h3>
                      <SecondaryStylesSection
                        secondaryStyles={secondaryStyles}
                      />
                    </div>
                  </AnimatedWrapper>
                </div>

                {/* Imagem principal */}
                <AnimatedWrapper
                  animation={isLowPerformance ? "none" : "scale"}
                  show={true}
                  duration={500}
                  delay={400}
                  className="order-1 lg:order-2"
                >
                  <div className="relative max-w-md mx-auto">
                    <div
                      className="relative overflow-hidden rounded-2xl"
                      style={{ boxShadow: tokens.shadows.lg }}
                    >
                      <ProgressiveImage
                        src={`${image}?q=90&f=auto&w=500`}
                        alt={`Estilo ${category}`}
                        width={500}
                        height={600}
                        className="w-full h-auto transition-all duration-500 hover:scale-105"
                        loading="eager"
                        fetchPriority="high"
                        onLoad={() =>
                          setImagesLoaded((prev) => ({ ...prev, style: true }))
                        }
                      />

                      {/* Overlay gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    {/* Badge flutuante */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                      <span>{category}</span>
                    </div>

                    {/* Decoração de cantos */}
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-3 border-l-3 border-[#B89B7A] rounded-bl-xl opacity-60"></div>
                  </div>
                </AnimatedWrapper>
              </div>

              {/* Guia do estilo - ESPAÇAMENTO PADRONIZADO */}
              <AnimatedWrapper
                animation={isLowPerformance ? "none" : "fade"}
                show={true}
                duration={400}
                delay={700}
              >
                <div className="mt-16 text-center">
                  <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-[#aa6b5d] mb-8">
                    Seu Guia de Estilo Personalizado
                  </h3>
                  <div className="relative max-w-3xl mx-auto">
                    <ProgressiveImage
                      src={`${guideImage}?q=90&f=auto&w=900`}
                      alt={`Guia de Estilo ${category}`}
                      loading="lazy"
                      className="w-full h-auto rounded-xl transition-all duration-500 hover:scale-102"
                      style={{ boxShadow: tokens.shadows.xl }}
                      onLoad={() =>
                        setImagesLoaded((prev) => ({ ...prev, guide: true }))
                      }
                    />

                    {/* Badge exclusivo */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1.5 rounded-full text-xs font-bold transform rotate-12 shadow-md">
                      EXCLUSIVO
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
            </AnimatedWrapper>
          </Card>
        </section>

        {/* Seções lazy-loaded com ESPAÇAMENTO PADRONIZADO */}
        <section id="transformations" className="scroll-mt-24 mb-24 lg:mb-28">
          <SectionTitle
            variant="primary"
            size="xl"
            subtitle="Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber"
          >
            Resultados que Falam por Si
          </SectionTitle>
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando transformações...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <BeforeAfterTransformation />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="motivation" className="scroll-mt-24 mb-24 lg:mb-28">
          <SectionTitle
            variant="secondary"
            size="xl"
            subtitle="Conhecer seu estilo pessoal é muito mais do que seguir tendências passageiras — é uma ferramenta poderosa de comunicação não-verbal e autoconfiança."
          >
            Por que Aplicar seu Estilo é tão Importante?
          </SectionTitle>
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando conteúdo...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <MotivationSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="bonuses" className="scroll-mt-24 mb-24 lg:mb-28">
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando bônus...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <BonusSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="testimonials" className="scroll-mt-24 mb-24 lg:mb-28">
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando depoimentos...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <Testimonials />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="guarantee" className="scroll-mt-24 mb-24 lg:mb-28">
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando garantia...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <GuaranteeSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="mentor" className="scroll-mt-24 mb-24 lg:mb-28">
          <SectionTitle
            variant="simple"
            size="xl"
            subtitle="Especialista que já guiou mais de 3.000 mulheres na descoberta do seu estilo autêntico"
          >
            Conheça Sua Mentora
          </SectionTitle>
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando informações da mentora...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <MentorSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        {/* Seção de transição elegante - ESPAÇAMENTO PADRONIZADO */}
        <div className="mb-24 lg:mb-28">
          <div className="relative text-center py-16 lg:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff7f3]/60 via-[#f9f4ef]/40 to-[#fff7f3]/60 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mb-8"></div>
              <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-[#2C1810] mb-6">
                Chegou o Momento de Agir
              </h3>
              <p className="text-xl font-medium max-w-2xl mx-auto text-[#5D4A3A] leading-relaxed">
                Não deixe para depois a transformação que você pode começar
                agora!
              </p>
              <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mt-8"></div>
            </div>
          </div>
        </div>

        {/* CTA Final completamente redesenhada - ESPAÇAMENTO PADRONIZADO */}
        <section id="cta" className="scroll-mt-24 mb-24 lg:mb-28">
          <div
            className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] rounded-3xl p-8 lg:p-16 border border-[#B89B7A]/20 text-center"
            style={{ boxShadow: tokens.shadows.xl }}
          >
            {/* Background decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B89B7A]/5 via-transparent to-[#aa6b5d]/5 pointer-events-none"></div>

            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={600}
              delay={200}
            >
              <div className="relative z-10">
                {/* Header da CTA - ESPAÇAMENTO PADRONIZADO */}
                <div className="mb-16 lg:mb-20">
                  <div className="inline-flex items-center gap-4 mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                    <div className="w-6 h-6 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full animate-pulse shadow-lg"></div>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                  </div>

                  <h2 className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold leading-tight mb-8">
                    <span className="bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent block mb-4">
                      Desperte Sua Confiança
                    </span>
                    <span className="text-[#aa6b5d] block">
                      Com Seu Estilo Único!
                    </span>
                  </h2>

                  <p className="text-xl lg:text-2xl text-[#5D4A3A] font-medium mb-6">
                    Guia {category} Personalizado + Bônus Exclusivos
                  </p>

                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 px-4 py-2 rounded-full border border-[#B89B7A]/20">
                    <Clock className="w-4 h-4 text-[#aa6b5d]" />
                    <span className="text-sm font-medium text-[#aa6b5d]">
                      Oferta por tempo limitado
                    </span>
                  </div>
                </div>

                {/* Grid de produtos otimizado - ESPAÇAMENTO PADRONIZADO */}
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                    {[
                      {
                        src: (() => {
                          const guideImages = {
                            Natural:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071344/GUIA_NATURAL_fzp6fc.webp",
                            Clássico:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp",
                            Contemporâneo:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp",
                            Elegante:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071342/GUIA_ELEGANTE_asez1q.webp",
                            Romântico:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp",
                            Sexy: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071349/GUIA_SEXY_t5x2ov.webp",
                            Dramático:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp",
                            Criativo:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071342/GUIA_CRIATIVO_ntbzph.webp",
                          };
                          return (
                            guideImages[category] || guideImages["Natural"]
                          );
                        })(),
                        title: `Manual de Estilo ${category}`,
                        subtitle:
                          "Descubra combinações infalíveis de cores, tecidos e acessórios que valorizam sua personalidade única.",
                        badge: "GUIA PRINCIPAL",
                        originalPrice: "R$ 77,00",
                        priority: true,
                      },
                      {
                        src: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911677/Cópia_de_MOCKUPS_15_-_Copia_grstwl.png",
                        title: "Guia das Peças Estratégicas",
                        subtitle:
                          "Peças-chave que maximizam combinações e garantem versatilidade em qualquer situação.",
                        badge: "BÔNUS EXCLUSIVO",
                        originalPrice: "R$ 59,00",
                        priority: false,
                      },
                      {
                        src: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911666/Cópia_de_Template_Dossiê_Completo_2024_15_-_Copia_ssrhu3.png",
                        title: "Manual de Visagismo",
                        subtitle:
                          "Descubra os cortes ideais para seu rosto e realce sua beleza natural.",
                        badge: "BÔNUS PREMIUM",
                        originalPrice: "R$ 39,00",
                        priority: false,
                      },
                    ].map((product, index) => (
                      <div
                        key={index}
                        className={`group bg-white rounded-2xl p-6 lg:p-8 border border-[#B89B7A]/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative ${
                          index === 2 ? "md:col-span-2 xl:col-span-1" : ""
                        }`}
                        style={{ boxShadow: tokens.shadows.lg }}
                      >
                        {/* Badge premium */}
                        <div className="absolute -top-4 -right-4 z-10">
                          <span
                            className={`text-xs font-bold px-4 py-2 rounded-full text-white shadow-lg transform rotate-12 ${
                              index === 0
                                ? "bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]"
                                : "bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]"
                            }`}
                          >
                            {product.badge}
                          </span>
                        </div>

                        {/* Imagem do produto */}
                        <div
                          className="relative mb-6 bg-gradient-to-br from-[#f9f4ef] to-[#fff7f3] rounded-xl p-4 overflow-hidden"
                          style={{
                            boxShadow: tokens.shadows.sm,
                            aspectRatio:
                              index === 0
                                ? "4.6/5"
                                : index === 1
                                ? "6/3.5"
                                : "3/4.5",
                          }}
                        >
                          <ProgressiveImage
                            src={product.src}
                            alt={product.title}
                            className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                            loading={product.priority ? "eager" : "lazy"}
                            fetchPriority={product.priority ? "high" : "low"}
                          />

                          {/* Overlay de hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#B89B7A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                        </div>

                        {/* Conteúdo do produto - ESPAÇAMENTO PADRONIZADO */}
                        <div className="text-left space-y-4">
                          <h4 className="font-bold text-[#2C1810] text-lg lg:text-xl leading-tight">
                            {product.title}
                          </h4>
                          <p className="text-sm lg:text-base text-[#5D4A3A] leading-relaxed">
                            {product.subtitle}
                          </p>

                          {/* Preço original */}
                          <div className="pt-4 border-t border-[#B89B7A]/10">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-[#8F7A6A]">
                                Valor individual:
                              </span>
                              <span className="text-lg font-bold text-[#B89B7A] line-through">
                                {product.originalPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resumo de valor redesenhado - ESPAÇAMENTO PADRONIZADO */}
                <div className="max-w-lg mx-auto mb-12">
                  <div
                    className="relative bg-white rounded-2xl p-8 lg:p-10 border-4 border-double border-[#B89B7A]/30 overflow-hidden"
                    style={{
                      boxShadow:
                        "0 20px 40px rgba(184,155,122,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,244,239,0.95) 100%)",
                    }}
                  >
                    {/* Background decorativo */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B89B7A]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10 text-center space-y-6">
                      <p className="text-lg lg:text-xl font-semibold text-[#5D4A3A]">
                        De{" "}
                        <span className="font-bold text-[#B89B7A] text-xl lg:text-2xl line-through">
                          R$ 175,00
                        </span>{" "}
                        por apenas:
                      </p>

                      <div className="space-y-2">
                        <p className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                          R$ 39,90
                        </p>
                        <p className="text-lg lg:text-xl font-bold text-[#4CAF50]">
                          ou 5x de R$ 8,83
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4CAF50]/10 to-[#43a047]/10 px-4 py-2 rounded-full border border-[#4CAF50]/20">
                        <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                        <span className="text-sm font-bold text-[#4CAF50]">
                          Economia de R$ 135,10 (77% OFF)
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-[#8F7A6A] text-sm">
                        <Hourglass className="w-4 h-4 animate-pulse" />
                        <span>
                          Esta oferta expira quando você sair desta página
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button principal com texto responsivo */}
                <div className="text-center">
                  <Button
                    onClick={handleCTAClick}
                    className="group relative text-white font-bold py-6 px-8 sm:px-12 lg:px-16 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #4CAF50 0%, #43a047 50%, #388e3c 100%)",
                      boxShadow:
                        "0 20px 40px rgba(76, 175, 80, 0.3), 0 0 0 1px rgba(255,255,255,0.2) inset",
                    }}
                    type="button"
                  >
                    <span
                      className="flex items-center justify-center gap-2 sm:gap-3"
                      style={{
                        fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)", // Ajuste responsivo: 14px min, 20px max
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                      <span className="leading-tight">
                        Quero Transformar Meu Estilo Agora
                      </span>
                      <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce flex-shrink-0" />
                    </span>

                    {/* Efeito de brilho */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                  </Button>

                  {/* Garantias de segurança - ESPAÇAMENTO PADRONIZADO */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#8F7A6A]">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#B89B7A]" />
                      <span>Pagamento 100% Seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#B89B7A]" />
                      <span>Acesso Imediato</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#B89B7A]" />
                      <span>Garantia de 7 Dias</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </section>
      </main>

      {/* Rodapé simples e elegante - ESPAÇAMENTO PADRONIZADO */}
      <footer className="mt-28 border-t border-[#B89B7A]/15 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef]">
        <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16 max-w-6xl">
          <div className="text-center space-y-6">
            {/* Links de política */}
            <div className="mb-8">
              <a
                href="/politica-privacidade"
                className="text-[#5D4A3A] hover:text-[#B89B7A] transition-colors duration-300 font-medium text-sm lg:text-base underline decoration-[#B89B7A]/30 hover:decoration-[#B89B7A] underline-offset-4"
              >
                Política de Privacidade
              </a>
            </div>

            {/* Linha decorativa */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mb-8"></div>

            {/* Copyright */}
            <p className="text-[#8F7A6A] text-sm lg:text-base font-medium">
              © 2025 Gisele Galvão. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Build info oculto */}
      <div className="hidden">
        <BuildInfo />
      </div>
    </div>
  );
};

export default ResultPage;

Exemplo do modelo que quero que vc adapte para o código
import React, { useEffect, useState, Suspense, lazy, useCallback, createContext, useContext } from "react";

// --- AuthContext and useAuth ---
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    userName: "Usuária Teste",
    email: "teste@example.com",
    uid: "mock-user-id-123",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Auth state ready.");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const value = { user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    console.error("useAuth must be used within an AuthProvider.");
    return { user: null };
  }
  return context;
};

// --- useQuiz ---
const useQuiz = () => {
  const [primaryStyle, setPrimaryStyle] = useState(null);
  const [secondaryStyles, setSecondaryStyles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrimaryStyle({
        category: "Clássico", // Example category
        percentage: 92,
      });
      setSecondaryStyles([
        { category: "Elegante", percentage: 78 },
        { category: "Romântico", percentage: 65 },
      ]);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return { primaryStyle, secondaryStyles };
};

// --- useGlobalStyles ---
const useGlobalStyles = () => {
  const globalStyles = {
    logo: "https://placehold.co/150x50/B89B7A/ffffff?text=Logo",
    logoAlt: "Minha Marca",
    logoHeight: "50px",
    fontFamily: "Inter, system-ui, sans-serif",
  };
  return { globalStyles };
};

// --- useLoadingState ---
const useLoadingState = ({ minDuration, disableTransitions }) => {
  const [isLoading, setIsLoading] = useState(true);
  const completeLoading = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, minDuration);
  }, [minDuration]);
  return { isLoading, completeLoading };
};

// --- useIsLowPerformanceDevice ---
const useIsLowPerformanceDevice = () => {
  return false;
};

// --- Utility Functions ---
const trackButtonClick = (eventName, eventAction, eventCategory) => {
  console.log(`Analytics: ${eventName} - ${eventAction} - ${eventCategory}`);
};

const hotmartWebhookManager = {
  // Placeholder for Hotmart webhook manager
};
const storeUserForHotmart = (email, data) => {
  console.log(`Hotmart: Storing user ${email} with data:`, data);
};

// --- UI Components ---
const Header = ({ globalStyles }) => (
  <header
    className={`sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#B89B7A]/10`}
  >
    <div className="container mx-auto max-w-6xl px-4 py-4 lg:py-6">
      <div className="flex justify-center">
        <img
          src={globalStyles.logo}
          alt={globalStyles.logoAlt || "Logo"}
          style={{ height: globalStyles.logoHeight || "50px" }}
          className="h-auto object-contain transition-all duration-300 hover:scale-105"
        />
      </div>
    </div>
  </header>
);

const Progress = ({ value, className, indicatorClassName }) => (
  <div className={`w-full h-2 bg-gray-200 rounded-full ${className}`}>
    <div
      className={`h-full rounded-full ${indicatorClassName}`}
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const Card = ({ children, className, style }) => (
  <div className={`bg-white rounded-lg p-4 shadow-md ${className}`} style={style}>
    {children}
  </div>
);

const AnimatedWrapper = ({ children, animation, show, duration, delay, className }) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShouldShow(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, [show, delay]);

  const transitionStyle = {
    transition: `opacity ${duration / 1000}s ease ${delay / 1000}s, transform ${duration / 1000}s ease ${delay / 1000}s`,
    opacity: shouldShow ? 1 : 0,
    transform: shouldShow ? 'translateY(0)' : 'translateY(20px)',
  };

  if (animation === "scale") {
    transitionStyle.transform = shouldShow ? 'scale(1)' : 'scale(0.95)';
  } else if (animation === "none") {
    transitionStyle.transition = 'none';
    transitionStyle.opacity = 1;
    transitionStyle.transform = 'none';
  }

  return (
    <div className={className} style={transitionStyle}>
      {children}
    </div>
  );
};

const SecondaryStylesSection = ({ secondaryStyles }) => (
  <div className="flex flex-wrap gap-4 justify-center">
    {secondaryStyles.map((style, index) => (
      <div key={index} className="bg-[#f0ebe3] text-[#2C1810] px-4 py-2 rounded-full text-sm font-medium shadow-sm">
        {style.category} ({style.percentage}%)
      </div>
    ))}
  </div>
);

const ErrorState = () => (
  <div className="text-center py-20 text-red-500 font-bold">Ocorreu um erro ao carregar os resultados. Por favor, tente novamente.</div>
);

const Button = ({ children, onClick, className, style, type }) => (
  <button onClick={onClick} className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-in-out ${className}`} style={style} type={type}>
    {children}
  </button>
);

const ResultSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#fffaf7] text-[#8F7A6A] p-8">
    <LoadingSpinner size="lg" className="mb-4" />
    <p className="text-lg">Carregando seus resultados personalizados...</p>
    <div className="w-full max-w-md bg-gray-200 h-4 rounded-full mt-8 animate-pulse"></div>
    <div className="w-3/4 max-w-sm bg-gray-200 h-3 rounded-full mt-4 animate-pulse"></div>
  </div>
);

const BuildInfo = () => (
  <div className="text-xs text-gray-400 mt-4 text-center">
    Build Info: v1.0.0
  </div>
);

const SecurePurchaseElement = () => (
  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
    <Shield className="w-4 h-4 text-green-500" />
    <span>Pagamento 100% Seguro</span>
  </div>
);

const GuaranteeSeal = () => (
  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
    <Award className="w-4 h-4 text-yellow-500" />
    <span>Garantia de Satisfação (7 Dias)</span>
  </div>
);

const LoadingSpinner = ({ size, className }) => (
  <div className={`animate-spin rounded-full border-4 border-t-4 border-[#B89B7A] border-opacity-25 ${size === 'lg' ? 'h-12 w-12' : 'h-8 w-8'} ${className}`}></div>
);

const ProgressiveImage = ({ src, alt, width, height, className, loading, fetchPriority, onLoad, style }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
    loading={loading}
    fetchPriority={fetchPriority}
    onLoad={onLoad}
    onError={(e) => { e.target.src = `https://placehold.co/${width}x${height}/ccc/000?text=Image+Error`; }}
    style={style}
  />
);

const ResourcePreloader = () => (
  <div className="text-xs text-gray-400 text-center">
    Recursos pré-carregados
  </div>
);

const PerformanceMonitor = () => (
  <div className="text-xs text-gray-400 text-center">
    Monitor de Performance
  </div>
);

// --- Lucide Icons (Inline SVG for Canvas compatibility) ---
const ShoppingCart = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const CheckCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.1"></path><path d="M22 4L12 14.01l-3-3"></path></svg>;
const ArrowDown = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;
const Clock = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const ChevronLeft = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRight = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;
const Shield = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const Award = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 22 12 18 17 22 15.79 13.88"></polyline></svg>;
const Hourglass = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-4"></path><path d="M12 14V2"></path><path d="M5 17H19"></path><path d="M5 7H19"></path><path d="M12 12l-6 6v-6l6-6 6 6v6z"></path></svg>;
const Star = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const Gift = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 12 12 12 20"></polyline><path d="M20 12v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2"></path><path d="M20 12h-8"></path><path d="M12 20v-8"></path><path d="M12 20H4a2 2 0 0 1-2-2v-2"></path><path d="M12 12V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v8"></path><path d="M12 12H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8"></path></svg>;
const Target = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>;
const Zap = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const TrendingUp = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>;


// --- Lazy Loaded Sections (Simplified for demonstration) ---
const BeforeAfterTransformation = React.memo(() => (
  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-8 rounded-2xl text-center border border-[#B89B7A]/15">
    <h3 className="text-2xl font-bold text-[#2C1810] mb-4">Transformações Incríveis</h3>
    <p className="text-[#5D4A3A]">Veja o antes e depois de nossas clientes!</p>
    <div className="flex justify-center gap-4 mt-6">
      <img src="https://placehold.co/200x250/D4B79F/2C1810?text=Antes" alt="Antes" className="rounded-lg shadow-md" />
      <img src="https://placehold.co/200x250/B89B7A/ffffff?text=Depois" alt="Depois" className="rounded-lg shadow-md" />
    </div>
  </div>
));
const MotivationSection = React.memo(() => (
  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-8 rounded-2xl text-center border border-[#B89B7A]/15">
    <h3 className="text-2xl font-bold text-[#2C1810] mb-4">A Importância do Estilo Pessoal</h3>
    <p className="text-[#5D4A3A]">Entenda como seu estilo impacta sua confiança e comunicação.</p>
    <ul className="list-disc list-inside text-left mx-auto max-w-md mt-6 space-y-2 text-[#5D4A3A]">
      <li>Autoconfiança Elevada</li>
      <li>Comunicação Não-Verbal Eficaz</li>
      <li>Expressão Autêntica</li>
    </ul>
  </div>
));
const BonusSection = React.memo(() => (
  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-8 rounded-2xl text-center border border-[#B89B7A]/15">
    <h3 className="text-2xl font-bold text-[#2C1810] mb-4">Bônus Exclusivos Para Você!</h3>
    <p className="text-[#5D4A3A]">Aproveite estes presentes especiais:</p>
    <ul className="list-disc list-inside text-left mx-auto max-w-md mt-6 space-y-2 text-[#5D4A3A]">
      <li>Guia de Peças Estratégicas</li>
      <li>Manual de Visagismo</li>
      <li>Comunidade Exclusiva</li>
    </ul>
  </div>
));
const Testimonials = React.memo(() => (
  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-8 rounded-2xl text-center border border-[#B89B7A]/15">
    <h3 className="text-2xl font-bold text-[#2C1810] mb-4">O Que Nossas Clientes Dizem</h3>
    <p className="text-[#5D4A3A] italic">"Minha vida mudou depois de descobrir meu estilo!" - Ana S.</p>
    <p className="text-[#5D4A3A] italic mt-2">"Recomendo a todas as mulheres!" - Clara M.</p>
  </div>
));
const GuaranteeSection = React.memo(() => (
  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-8 rounded-2xl text-center border border-[#B89B7A]/15">
    <h3 className="text-2xl font-bold text-[#2C1810] mb-4">Nossa Garantia de Satisfação</h3>
    <p className="text-[#5D4A3A]">Você tem 7 dias para experimentar e amar, ou seu dinheiro de volta!</p>
    <Shield className="w-16 h-16 mx-auto mt-6 text-[#B89B7A]" />
  </div>
));
const MentorSection = React.memo(() => (
  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] p-8 rounded-2xl text-center border border-[#B89B7A]/15">
    <h3 className="text-2xl font-bold text-[#2C1810] mb-4">Conheça Gisele Galvão</h3>
    <img src="https://placehold.co/150x150/B89B7A/ffffff?text=Mentor" alt="Gisele Galvão" className="rounded-full mx-auto mt-6 mb-4" />
    <p className="text-[#5D4A3A]">Especialista em estilo e imagem pessoal, com anos de experiência transformando vidas.</p>
  </div>
));

// Design tokens - SISTEMA APRIMORADO
const tokens = {
  colors: {
    primary: "#B89B7A",
    primaryDark: "#A1835D",
    primaryLight: "#D4B79F",
    secondary: "#aa6b5d",
    secondaryDark: "#8F5A4D",
    secondaryLight: "#C28A7D",
    background: "#fffaf7",
    backgroundAlt: "#f9f4ef",
    backgroundCard: "#ffffff",
    text: "#2C1810",
    textSecondary: "#5D4A3A",
    textMuted: "#8F7A6A",
    textLight: "#B5A394",
    success: "#4CAF50",
    successDark: "#45a049",
    warning: "#FF6B35",
    border: "rgba(184, 155, 122, 0.15)",
    borderLight: "rgba(184, 155, 122, 0.08)",
    overlay: "rgba(44, 24, 16, 0.02)",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
    "4xl": "4rem",
    "5xl": "6rem",
    "6xl": "7rem",
  },
  shadows: {
    xs: "0 1px 2px rgba(184, 155, 122, 0.05)",
    sm: "0 2px 4px rgba(184, 155, 122, 0.08)",
    md: "0 4px 12px rgba(184, 155, 122, 0.12)",
    lg: "0 8px 24px rgba(184, 155, 122, 0.15)",
    xl: "0 16px 40px rgba(184, 155, 122, 0.18)",
    cta: "0 8px 32px rgba(76, 175, 80, 0.25)",
    inner: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  },
  radius: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  typography: {
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    lineHeights: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
  },
};

// styleConfig for image paths
const styleConfig = {
  Natural: {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071344/GUIA_NATURAL_fzp6fc.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071344/GUIA_NATURAL_fzp6fc.webp",
    description: "valoriza autenticidade e conforto, sem abrir mão da elegância natural"
  },
  Clássico: {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp",
    description: "aprecia sofisticação atemporal e peças que nunca saem de moda"
  },
  Contemporâneo: {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp",
    description: "está sempre em sintonia com as tendências, mas de forma equilibrada"
  },
  Elegante: {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071342/GUIA_ELEGANTE_asez1q.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071342/GUIA_ELEGANTE_asez1q.webp",
    description: "irradia refinamento e classe em cada detalhe do seu visual"
  },
  Romântico: {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp",
    description: "expressa delicadeza e feminilidade através de looks encantadores"
  },
  Sexy: {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071349/GUIA_SEXY_t5x2ov.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071349/GUIA_SEXY_t5x2ov.webp",
    description: "tem confiança para valorizar sua sensualidade de forma elegante"
  },
  Dramático: {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp",
    description: "não tem medo de fazer declarações ousadas com seu estilo"
  },
  Criativo: {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1745071342/GUIA_CRIATIVO_ntbzph.webp",
    guideImage: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_900/v1745071342/GUIA_CRIATIVO_ntbzph.webp",
    description: "expressa criatividade e originalidade em cada combinação de roupas"
  },
};


// Componente de título melhorado - ESPAÇAMENTO PADRONIZADO
const SectionTitle = React.memo<{
  children: React.ReactNode;
  subtitle?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
  variant?: "primary" | "secondary" | "simple";
  centered?: boolean;
}>(
  ({
    children,
    subtitle,
    size = "xl",
    className = "",
    variant = "simple",
    centered = true,
  }) => (
    <AnimatedWrapper
      className={`${centered ? "text-center" : ""} mb-12 lg:mb-16 ${className}`}
      animation="fade"
      show={true}
      duration={600}
    >
      {/* Decoração superior refinada */}
      {variant === "primary" && (
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
        </div>
      )}

      {/* Título com melhor hierarquia */}
      <h2
        className={`font-playfair font-bold leading-tight tracking-tight ${
          variant === "primary"
            ? "bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent mb-8"
            : "text-[#2C1810] mb-6"
        } ${
          size === "xl"
            ? "text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
            : size === "lg"
            ? "text-xl md:text-2xl lg:text-3xl xl:text-4xl"
            : "text-lg md:text-xl lg:text-2xl xl:text-3xl"
        }`}
      >
        {children}
      </h2>

      {/* Subtítulo melhorado */}
      {subtitle && (
        <div className="max-w-4xl mx-auto">
          <p className="text-base md:text-lg lg:text-xl text-[#5D4A3A] leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>
      )}

      {/* Linha decorativa */}
      {variant === "primary" && (
        <div className="w-24 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto mt-8 shadow-sm"></div>
      )}
    </AnimatedWrapper>
  )
);

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  const [imagesLoaded, setImagesLoaded] = useState({
    style: false,
    guide: false,
  });
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 100 : 300,
    disableTransitions: isLowPerformance,
  });

  // Estados de interação melhorados
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("primary-style");

  // Timer otimizado
  const [timer, setTimer] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer.seconds > 0) {
          return { ...prevTimer, seconds: prevTimer.seconds - 1 };
        } else if (prevTimer.minutes > 0) {
          return { ...prevTimer, minutes: prevTimer.minutes - 1, seconds: 59 };
        } else if (prevTimer.hours > 0) {
          return { hours: prevTimer.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);

    const hasPreloadedResults =
      localStorage.getItem("preloadedResults") === "true";

    if (hasPreloadedResults) {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
      return;
    }

    const safetyTimeout = setTimeout(() => {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
    }, 2500);

    return () => clearTimeout(safetyTimeout);
  }, [primaryStyle, globalStyles.logo, completeLoading]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);

  // Scroll tracking melhorado
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);

      // Tracking de seção ativa
      const sections = [
        "primary-style",
        "transformations",
        "motivation",
        "bonuses",
        "testimonials",
        "guarantee",
        "mentor",
        "cta",
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element?.getBoundingClientRect().top <= 250) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    interface WindowWithCTAProcessing extends Window {
      ctaClickProcessing?: boolean;
    }

    const windowTyped = window as WindowWithCTAProcessing;

    if (windowTyped.ctaClickProcessing) return;
    windowTyped.ctaClickProcessing = true;

    // Capturar dados do usuário para correlação futura com vendas Hotmart
    if (user?.email) {
      // Armazenar dados do usuário com UTMs para correlação futura
      storeUserForHotmart(user.email, {
        quiz_results: primaryStyle,
        funnel_step: "checkout_initiation",
        page_url: window.location.href,
      });

      console.log(
        "[Hotmart Integration] Dados do usuário armazenados para:",
        user.email
      );
    }

    trackButtonClick("checkout_button", "Iniciar Checkout", "results_page");

    if (window.innerWidth >= 768) {
      window.open(
        "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912&utm_source=quiz&utm_medium=abtest&utm_campaign=testeA",
        "_blank"
      );
    } else {
      window.location.href =
        "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912&utm_source=quiz&utm_medium=abtest&utm_campaign=testeA";
    }

    setTimeout(() => {
      windowTyped.ctaClickProcessing = false;
    }, 1000);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.text,
        fontFamily: globalStyles.fontFamily || "Inter, system-ui, sans-serif",
      }}
    >
      {/* Scrollbar personalizada */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(184, 155, 122, 0.1);
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #B89B7A, #aa6b5d);
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #aa6b5d, #B89B7A);
          }

          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Focus states melhorados */
          button:focus-visible,
          a:focus-visible {
            outline: 2px solid #B89B7A;
            outline-offset: 2px;
          }
        `,
        }}
      />

      {/* Preloaders */}
      <ResourcePreloader />
      <PerformanceMonitor />

      {/* Background decorativo refinado */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#B89B7A]/8 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#aa6b5d]/6 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-1/4 bg-gradient-to-r from-[#B89B7A]/4 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Header minimalista e elegante */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#B89B7A]/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto max-w-6xl px-4 py-4 lg:py-6">
          <div className="flex justify-center">
            <img
              src={globalStyles.logo}
              alt={globalStyles.logoAlt || "Logo"}
              style={{ height: globalStyles.logoHeight || "50px" }}
              className="h-auto object-contain transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </header>

      {/* Navigation dots refinada */}
      <div
        className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-500 ${
          isScrolled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
      >
        <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-[#B89B7A]/20">
          {[
            { id: "primary-style", label: "Seu Estilo" },
            { id: "transformations", label: "Transformações" },
            { id: "motivation", label: "Motivação" },
            { id: "bonuses", label: "Bônus" },
            { id: "testimonials", label: "Depoimentos" },
            { id: "guarantee", label: "Garantia" },
            { id: "cta", label: "Adquirir" },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`group relative w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] scale-125 shadow-md"
                  : "bg-[#B5A394] hover:bg-[#B89B7A] hover:scale-110"
              }`}
              aria-label={`Ir para seção ${section.label}`}
            >
              {/* Tooltip */}
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-[#2C1810] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {section.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CONTAINER PRINCIPAL - ESPAÇAMENTO PADRONIZADO */}
      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-6xl relative z-10">
        {/* Primary Style Card - ESPAÇAMENTO OTIMIZADO */}
        <section id="primary-style" className="scroll-mt-24 mb-24 lg:mb-28">
          <Card
            className="relative overflow-hidden bg-gradient-to-br from-white to-[#fff7f3] border border-[#B89B7A]/15 rounded-2xl p-6 lg:p-10"
            style={{ boxShadow: tokens.shadows.xl }}
          >
            {/* Decoração de cantos elegante */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#B89B7A]/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#B89B7A]/20 rounded-br-2xl"></div>

            <AnimatedWrapper
              animation="fade"
              show={true}
              duration={600}
              delay={200}
            >
              {/* Header personalizado - ESPAÇAMENTO PADRONIZADO */}
              <div className="text-center mb-12 lg:mb-16">
                {user?.userName && (
                  <AnimatedWrapper
                    className="mb-8"
                    animation="scale"
                    show={true}
                    duration={500}
                    delay={100}
                  >
                    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] px-6 py-3 rounded-full border border-[#B89B7A]/20">
                      <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                        Parabéns, {user.userName}!
                      </span>
                    </div>
                  </AnimatedWrapper>
                )}

                {/* Título principal melhorado */}
                <h1 className="text-2xl lg:text-4xl xl:text-5xl font-playfair text-[#2C1810] mb-8 leading-tight">
                  Descobrimos Seu Estilo Predominante:
                  <br />
                  <span className="text-3xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] bg-clip-text text-transparent mt-2 block">
                    {category}
                  </span>
                </h1>

                {/* Progress bar elegante - ESPAÇAMENTO PADRONIZADO */}
                <div className="max-w-lg mx-auto mb-8">
                  <div className="flex items-center justify-between text-sm font-medium text-[#5D4A3A] mb-3">
                    <span>Compatibilidade</span>
                    <span className="text-lg font-bold text-[#B89B7A]">
                      {primaryStyle.percentage}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress
                      value={primaryStyle.percentage}
                      className="h-3 bg-gradient-to-r from-[#f5f2ec] to-[#f0ebe3] rounded-full overflow-hidden border border-[#B89B7A]/10"
                      indicatorClassName="bg-gradient-to-r from-[#B89B7A] via-[#D4B79F] to-[#aa6b5d] transition-all duration-1000 ease-out rounded-full"
                      style={{ boxShadow: tokens.shadows.inner }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Grid principal otimizado - ESPAÇAMENTO PADRONIZADO */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Conteúdo textual */}
                <div className="space-y-8 order-2 lg:order-1">
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                    delay={300}
                  >
                    <div className="space-y-6">
                      {/* Mensagem principal */}
                      <div
                        className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-xl p-6 border border-[#B89B7A]/10"
                        style={{ boxShadow: tokens.shadows.sm }}
                      >
                        <p className="text-[#2C1810] leading-relaxed text-lg font-medium mb-6">
                          <strong className="text-[#aa6b5d]">
                            Agora você tem clareza total
                          </strong>{" "}
                          sobre quem você é e como expressar sua personalidade
                          através do seu estilo!
                        </p>

                        {/* Descrição do estilo */}
                        <div className="bg-white/60 rounded-lg p-4 border border-[#B89B7A]/5">
                          <p className="text-[#2C1810] text-base leading-relaxed">
                            <strong className="text-[#aa6b5d]">
                              Seu estilo {category}
                            </strong>{" "}
                            revela uma mulher que{" "}
                            {category === "Natural"
                              ? "valoriza autenticidade e conforto, sem abrir mão da elegância natural"
                              : category === "Clássico"
                              ? "aprecia sofisticação atemporal e peças que nunca saem de moda"
                              : category === "Contemporâneo"
                              ? "está sempre em sintonia com as tendências, mas de forma equilibrada"
                              : category === "Elegante"
                              ? "irradia refinamento e classe em cada detalhe do seu visual"
                              : category === "Romântico"
                              ? "expressa delicadeza e feminilidade através de looks encantadores"
                              : category === "Sexy"
                              ? "tem confiança para valorizar sua sensualidade de forma elegante"
                              : category === "Dramático"
                              ? "não tem medo de fazer declarações ousadas com seu estilo"
                              : "expressa criatividade e originalidade em cada combinação de roupas"}
                            .
                          </p>
                        </div>
                      </div>

                      {/* Call to action sutil */}
                      <div className="text-center p-4 bg-gradient-to-r from-[#B89B7A]/5 to-[#aa6b5d]/5 rounded-lg border border-[#B89B7A]/10">
                        <p className="text-base font-semibold text-[#2C1810] mb-2">
                          <strong>
                            Chega de ficar perdida no guarda-roupa!
                          </strong>
                        </p>
                        <p className="text-sm text-[#5D4A3A]">
                          Descubra como aplicar seu estilo no dia a dia
                        </p>
                      </div>
                    </div>
                  </AnimatedWrapper>

                  {/* Estilos secundários melhorados */}
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                    delay={500}
                  >
                    <div
                      className="bg-gradient-to-br from-white to-[#fff7f3] rounded-xl p-6 border border-[#B89B7A]/15"
                      style={{ boxShadow: tokens.shadows.md }}
                    >
                      <h3 className="text-xl font-semibold text-[#aa6b5d] mb-6 flex items-center gap-2">
                        Estilos que Também Influenciam Você
                      </h3>
                      <SecondaryStylesSection
                        secondaryStyles={secondaryStyles}
                      />
                    </div>
                  </AnimatedWrapper>
                </div>

                {/* Imagem principal */}
                <AnimatedWrapper
                  animation={isLowPerformance ? "none" : "scale"}
                  show={true}
                  duration={500}
                  delay={400}
                  className="order-1 lg:order-2"
                >
                  <div className="relative max-w-md mx-auto">
                    <div
                      className="relative overflow-hidden rounded-2xl"
                      style={{ boxShadow: tokens.shadows.lg }}
                    >
                      <ProgressiveImage
                        src={`${image}?q=90&f=auto&w=500`}
                        alt={`Estilo ${category}`}
                        width={500}
                        height={600}
                        className="w-full h-auto transition-all duration-500 hover:scale-105"
                        loading="eager"
                        fetchPriority="high"
                        onLoad={() =>
                          setImagesLoaded((prev) => ({ ...prev, style: true }))
                        }
                      />

                      {/* Overlay gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    {/* Badge flutuante */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                      <span>{category}</span>
                    </div>

                    {/* Decoração de cantos */}
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-3 border-l-3 border-[#B89B7A] rounded-bl-xl opacity-60"></div>
                  </div>
                </AnimatedWrapper>
              </div>

              {/* Guia do estilo - ESPAÇAMENTO PADRONIZADO */}
              <AnimatedWrapper
                animation={isLowPerformance ? "none" : "fade"}
                show={true}
                duration={400}
                delay={700}
              >
                <div className="mt-16 text-center">
                  <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-[#aa6b5d] mb-8">
                    Seu Guia de Estilo Personalizado
                  </h3>
                  <div className="relative max-w-3xl mx-auto">
                    <ProgressiveImage
                      src={`${guideImage}?q=90&f=auto&w=900`}
                      alt={`Guia de Estilo ${category}`}
                      loading="lazy"
                      className="w-full h-auto rounded-xl transition-all duration-500 hover:scale-102"
                      style={{ boxShadow: tokens.shadows.xl }}
                      onLoad={() =>
                        setImagesLoaded((prev) => ({ ...prev, guide: true }))
                      }
                    />

                    {/* Badge exclusivo */}
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1.5 rounded-full text-xs font-bold transform rotate-12 shadow-md">
                      EXCLUSIVO
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>

              {/* Primeira CTA com a oferta (Offer Card) */}
              <AnimatedWrapper
                animation={isLowPerformance ? "none" : "fade"}
                show={true}
                duration={600}
                delay={900}
              >
                <Card className="p-6 md:p-8 border-[#aa6b5d]/20 mt-20 mb-16" style={{ boxShadow: tokens.shadows.xl }}>
                  <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-6 text-center">
                    Guia de Estilo Personalizado + Bônus Exclusivos
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <ProgressiveImage
                        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
                        alt="Mockup do Guia de Estilo"
                        className="rounded-lg shadow-md w-full"
                        loading="lazy"
                        width={600}
                        height={400}
                        style={{ aspectRatio: "3/2" }}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">
                        O que você vai receber:
                      </h3>
                      <ul className="space-y-3 mb-6">
                        {[
                          "Guia completo do seu estilo predominante",
                          "Paleta de cores personalizada",
                          "Lista de peças essenciais para seu guarda-roupa",
                          "Guia de combinações e dicas de styling",
                          "Acesso vitalício a atualizações"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start text-[#2C1810]">
                            <CheckCircle className="w-5 h-5 text-[#aa6b5d] mr-2 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="text-center">
                          <p className="text-sm text-[#8F7A6A] mb-1">Valor original</p>
                          <p className="text-lg line-through text-[#5D4A3A]">
                            R$ 175,00
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-[#aa6b5d] mb-1">Por apenas</p>
                          <p className="text-3xl font-bold text-[#aa6b5d]">
                            R$ 39,00
                          </p>
                        </div>
                      </div>
                      <div className="text-center md:text-right mb-4">
                        <p className="text-sm text-[#2C1810]">Parcelamento: 5x de R$ 8,83*</p>
                        <p className="text-sm text-[#2C1810]">ou R$ 39,90 à vista</p>
                      </div>
                      <Button
                        onClick={handleCTAClick}
                        className="mt-6 w-full group relative text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                        style={{
                          background: "linear-gradient(135deg, #4CAF50 0%, #43a047 100%)",
                          boxShadow: "0 10px 20px rgba(76, 175, 80, 0.2)",
                        }}
                        type="button"
                      >
                        <span className="flex items-center justify-center gap-2 text-lg">
                          <ShoppingCart className="w-5 h-5" />
                          Quero Meu Guia e Bônus Agora!
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl"></div>
                      </Button>
                    </div>
                  </div>
                </Card>
              </AnimatedWrapper>
            </AnimatedWrapper>
          </Card>
        </section>

        {/* Seções lazy-loaded com ESPAÇAMENTO PADRONIZADO */}
        <section id="transformations" className="scroll-mt-24 mb-24 lg:mb-28">
          <SectionTitle
            variant="primary"
            size="xl"
            subtitle="Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber"
          >
            Resultados que Falam por Si
          </SectionTitle>
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando transformações...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <BeforeAfterTransformation />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="motivation" className="scroll-mt-24 mb-24 lg:mb-28">
          <SectionTitle
            variant="secondary"
            size="xl"
            subtitle="Conhecer seu estilo pessoal é muito mais do que seguir tendências passageiras — é uma ferramenta poderosa de comunicação não-verbal e autoconfiança."
          >
            Por que Aplicar seu Estilo é tão Importante?
          </SectionTitle>
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando conteúdo...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <MotivationSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="bonuses" className="scroll-mt-24 mb-24 lg:mb-28">
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando bônus...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <BonusSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="testimonials" className="scroll-mt-24 mb-24 lg:mb-28">
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando depoimentos...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <Testimonials />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="guarantee" className="scroll-mt-24 mb-24 lg:mb-28">
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando garantia...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <GuaranteeSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        <section id="mentor" className="scroll-mt-24 mb-24 lg:mb-28">
          <SectionTitle
            variant="simple"
            size="xl"
            subtitle="Especialista que já guiou mais de 3.000 mulheres na descoberta do seu estilo autêntico"
          >
            Conheça Sua Mentora
          </SectionTitle>
          <Suspense
            fallback={
              <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-[#8F7A6A] font-medium">
                  Carregando informações da mentora...
                </p>
              </div>
            }
          >
            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={400}
            >
              <MentorSection />
            </AnimatedWrapper>
          </Suspense>
        </section>

        {/* Seção de transição elegante - ESPAÇAMENTO PADRONIZADO */}
        <div className="mb-24 lg:mb-28">
          <div className="relative text-center py-16 lg:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff7f3]/60 via-[#f9f4ef]/40 to-[#fff7f3]/60 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mb-8"></div>
              <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-[#2C1810] mb-6">
                Chegou o Momento de Agir
              </h3>
              <p className="text-xl font-medium max-w-2xl mx-auto text-[#5D4A3A] leading-relaxed">
                Não deixe para depois a transformação que você pode começar
                agora!
              </p>
              <div className="w-40 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mt-8"></div>
            </div>
          </div>
        </div>

        {/* CTA Final completamente redesenhada - ESPAÇAMENTO PADRONIZADO */}
        <section id="cta" className="scroll-mt-24 mb-24 lg:mb-28">
          <div
            className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] rounded-3xl p-8 lg:p-16 border border-[#B89B7A]/20 text-center"
            style={{ boxShadow: tokens.shadows.xl }}
          >
            {/* Background decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B89B7A]/5 via-transparent to-[#aa6b5d]/5 pointer-events-none"></div>

            <AnimatedWrapper
              animation={isLowPerformance ? "none" : "fade"}
              show={true}
              duration={600}
              delay={200}
            >
              <div className="relative z-10">
                {/* Header da CTA - ESPAÇAMENTO PADRONIZADO */}
                <div className="mb-16 lg:mb-20">
                  <div className="inline-flex items-center gap-4 mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                    <div className="w-6 h-6 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full animate-pulse shadow-lg"></div>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent"></div>
                  </div>

                  <h2 className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold leading-tight mb-8">
                    <span className="bg-gradient-to-r from-[#2C1810] via-[#aa6b5d] to-[#2C1810] bg-clip-text text-transparent block mb-4">
                      Desperte Sua Confiança
                    </span>
                    <span className="text-[#aa6b5d] block">
                      Com Seu Estilo Único!
                    </span>
                  </h2>

                  <p className="text-xl lg:text-2xl text-[#5D4A3A] font-medium mb-6">
                    Guia {category} Personalizado + Bônus Exclusivos
                  </p>

                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B89B7A]/10 to-[#aa6b5d]/10 px-4 py-2 rounded-full border border-[#B89B7A]/20">
                    <Clock className="w-4 h-4 text-[#aa6b5d]" />
                    <span className="text-sm font-medium text-[#aa6b5d]">
                      Oferta por tempo limitado
                    </span>
                  </div>
                </div>

                {/* Grid de produtos otimizado - ESPAÇAMENTO PADRONIZADO */}
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                    {[
                      {
                        src: (() => {
                          const guideImages = {
                            Natural:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071344/GUIA_NATURAL_fzp6fc.webp",
                            Clássico:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp",
                            Contemporâneo:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp",
                            Elegante:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071342/GUIA_ELEGANTE_asez1q.webp",
                            Romântico:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp",
                            Sexy: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071349/GUIA_SEXY_t5x2ov.webp",
                            Dramático:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp",
                            Criativo:
                              "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071342/GUIA_CRIATIVO_ntbzph.webp",
                          };
                          return (
                            guideImages[category] || guideImages["Natural"]
                          );
                        })(),
                        title: `Manual de Estilo ${category}`,
                        subtitle:
                          "Descubra combinações infalíveis de cores, tecidos e acessórios que valorizam sua personalidade única.",
                        badge: "GUIA PRINCIPAL",
                        originalPrice: "R$ 77,00",
                        priority: true,
                        aspectRatio: "4.6/5",
                      },
                      {
                        src: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911666/Cópia_de_Template_Dossiê_Completo_2024_15_-_Copia_ssrhu3.png", // Manual de Visagismo
                        title: "Manual de Visagismo",
                        subtitle:
                          "Descubra os cortes ideais para seu rosto e realce sua beleza natural.",
                        badge: "BÔNUS PREMIUM",
                        originalPrice: "R$ 39,00",
                        priority: true,
                        aspectRatio: "4.6/5",
                      },
                      {
                        src: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911677/Cópia_de_MOCKUPS_15_-_Copia_grstwl.png", // Guia das Peças Estratégicas
                        title: "Guia das Peças Estratégicas",
                        subtitle:
                          "Peças-chave que maximizam combinações e garantem versatilidade em qualquer situação.",
                        badge: "BÔNUS EXCLUSIVO",
                        originalPrice: "R$ 59,00",
                        priority: false,
                        aspectRatio: "3/4.5",
                      },
                    ].map((product, index) => (
                      <div
                        key={index}
                        className={`group bg-white rounded-2xl p-6 lg:p-8 border border-[#B89B7A]/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative ${
                          index === 2 ? "md:col-span-2 xl:col-span-1" : ""
                        }`}
                        style={{ boxShadow: tokens.shadows.lg }}
                      >
                        {/* Badge premium */}
                        <div className="absolute -top-4 -right-4 z-10">
                          <span
                            className={`text-xs font-bold px-4 py-2 rounded-full text-white shadow-lg transform rotate-12 ${
                              product.priority
                                ? "bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]"
                                : "bg-gradient-to-r from-[#aa6b5d] to-[#B89B7A]"
                            }`}
                          >
                            {product.badge}
                          </span>
                        </div>

                        {/* Imagem do produto */}
                        <div
                          className="relative mb-6 bg-gradient-to-br from-[#f9f4ef] to-[#fff7f3] rounded-xl p-4 overflow-hidden"
                          style={{
                            boxShadow: tokens.shadows.sm,
                            aspectRatio: product.aspectRatio,
                          }}
                        >
                          <ProgressiveImage
                            src={product.src}
                            alt={product.title}
                            className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                            loading={product.priority ? "eager" : "lazy"}
                            fetchPriority={product.priority ? "high" : "low"}
                          />

                          {/* Overlay de hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#B89B7A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                        </div>

                        {/* Conteúdo do produto - ESPAÇAMENTO PADRONIZADO */}
                        <div className="text-left space-y-4">
                          <h4 className="font-bold text-[#2C1810] text-lg lg:text-xl leading-tight">
                            {product.title}
                          </h4>
                          <p className="text-sm lg:text-base text-[#5D4A3A] leading-relaxed">
                            {product.subtitle}
                          </p>

                          {/* Preço original */}
                          <div className="pt-4 border-t border-[#B89B7A]/10">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-[#8F7A6A]">
                                Valor individual:
                              </span>
                              <span className="text-lg font-bold text-[#B89B7A] line-through">
                                {product.originalPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resumo de valor redesenhado - ESPAÇAMENTO PADRONIZADO */}
                <div className="max-w-lg mx-auto mb-12">
                  <div
                    className="relative bg-white rounded-2xl p-8 lg:p-10 border-4 border-double border-[#B89B7A]/30 overflow-hidden"
                    style={{
                      boxShadow:
                        "0 20px 40px rgba(184,155,122,0.15), 0 0 0 1px rgba(255,255,255,0.8) inset",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,244,239,0.95) 100%)",
                    }}
                  >
                    {/* Background decorativo */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B89B7A]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>

                    <div className="relative z-10 text-center space-y-6">
                      <p className="text-lg lg:text-xl font-semibold text-[#5D4A3A]">
                        De{" "}
                        <span className="font-bold text-[#B89B7A] text-xl lg:text-2xl line-through">
                          R$ 175,00
                        </span>{" "}
                        por apenas:
                      </p>

                      <div className="space-y-2">
                        <p className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                          R$ 39,90
                        </p>
                        <p className="text-lg lg:text-xl font-bold text-[#4CAF50]">
                          ou 5x de R$ 8,83
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4CAF50]/10 to-[#43a047]/10 px-4 py-2 rounded-full border border-[#4CAF50]/20">
                        <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                        <span className="text-sm font-bold text-[#4CAF50]">
                          Economia de R$ 135,10 (77% OFF)
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-[#8F7A6A] text-sm">
                        <Hourglass className="w-4 h-4 animate-pulse" />
                        <span>
                          Esta oferta expira quando você sair desta página
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button principal com texto responsivo */}
                <div className="text-center">
                  <Button
                    onClick={handleCTAClick}
                    className="group relative text-white font-bold py-6 px-8 sm:px-12 lg:px-16 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #4CAF50 0%, #43a047 50%, #388e3c 100%)",
                      boxShadow:
                        "0 20px 40px rgba(76, 175, 80, 0.3), 0 0 0 1px rgba(255,255,255,0.2) inset",
                    }}
                    type="button"
                  >
                    <span
                      className="flex items-center justify-center gap-2 sm:gap-3"
                      style={{
                        fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)",
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                      <span className="leading-tight">
                        Quero Transformar Meu Estilo Agora
                      </span>
                      <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce flex-shrink-0" />
                    </span>

                    {/* Efeito de brilho */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                  </Button>

                  {/* Garantias de segurança - ESPAÇAMENTO PADRONIZADO */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#8F7A6A]">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#B89B7A]" />
                      <span>Pagamento 100% Seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#B89B7A]" />
                      <span>Acesso Imediato</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#B89B7A]" />
                      <span>Garantia de 7 Dias</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </section>
      </main>

      {/* Rodapé simples e elegante - ESPAÇAMENTO PADRONIZADO */}
      <footer className="mt-28 border-t border-[#B89B7A]/15 bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef]">
        <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16 max-w-6xl">
          <div className="text-center space-y-6">
            {/* Links de política */}
            <div className="mb-8">
              <a
                href="/politica-privacidade"
                className="text-[#5D4A3A] hover:text-[#B89B7A] transition-colors duration-300 font-medium text-sm lg:text-base underline decoration-[#B89B7A]/30 hover:decoration-[#B89B7A] underline-offset-4"
              >
                Política de Privacidade
              </a>
            </div>

            {/* Linha decorativa */}
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent mx-auto mb-8"></div>

            {/* Copyright */}
            <p className="text-[#8F7A6A] text-sm lg:text-base font-medium">
              © 2025 Gisele Galvão. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Build info */}
      <div className="text-xs text-gray-400 mt-4 text-center">
        <BuildInfo />
      </div>
    </div>
  );
};

// Main App component to include Tailwind CSS and the ResultPage
const App = () => {
  useEffect(() => {
    // Dynamically load Tailwind CSS CDN
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    tailwindScript.id = "tailwind-cdn-script";
    document.head.appendChild(tailwindScript);

    // Dynamically load Google Fonts
    const googleFontLink = document.createElement('link');
    googleFontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap";
    googleFontLink.rel = "stylesheet";
    googleFontLink.id = "google-fonts-link";
    document.head.appendChild(googleFontLink);

    // Optional: Clean up on component unmount to prevent multiple loads if App re-renders
    return () => {
      const existingTailwindScript = document.getElementById('tailwind-cdn-script');
      if (existingTailwindScript) {
        document.head.removeChild(existingTailwindScript);
      }
      const existingGoogleFontLink = document.getElementById('google-fonts-link');
      if (existingGoogleFontLink) {
        document.head.removeChild(existingGoogleFontLink);
      }
    };
  }, []);

  return (
    <AuthProvider>
      <ResultPage />
    </AuthProvider>
  );
};

export default App;

