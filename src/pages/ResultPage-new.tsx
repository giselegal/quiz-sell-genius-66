// filepath: /workspaces/quiz-sell-genius-66/src/pages/ResultPage.tsx
import React, {
  useEffect,
  useState,
  Suspense,
  lazy,
  useCallback,
  useMemo,
} from "react";
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
  Heart,
  Users,
  Sparkles,
  Trophy,
  Fire,
  Crown,
  Gem,
  Palette,
  Scissors,
} from "lucide-react";
import { AnimatedWrapper } from "@/components/animated-wrapper";
import SecondaryStylesSection from "@/components/quiz-result/SecondaryStylesSection";
import ErrorState from "@/components/result/ErrorState";
import { Button } from "@/components/ui/button";
import { useLoadingState } from "@/hooks/useLoadingState";
import { useIsMobile } from "@/hooks/use-mobile";
import ResultSkeleton from "@/components/result/ResultSkeleton";
import { trackButtonClick } from "@/utils/analytics";
import BuildInfo from "@/components/BuildInfo";
import SecurePurchaseElement from "@/components/result/SecurePurchaseElement";
import { useAuth } from "@/context/AuthContext";
import { ProgressiveImage } from "@/components/ui/progressive-image";
import { ResourcePreloader } from "@/components/ui/resource-preloader";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy loaded components
const BeforeAfterTransformation = lazy(
  () => import("@/components/result/BeforeAfterTransformation")
);
const MotivationSection = lazy(
  () => import("@/components/result/MotivationSection")
);
const BonusSection = lazy(() => import("@/components/BonusSection"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const GuaranteeSection = lazy(
  () => import("@/components/result/GuaranteeSection")
);
const MentorSection = lazy(() => import("@/components/result/MentorSection"));

// Design tokens - SISTEMA COMPLETO E MODULAR
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
    accent: "#E8D5B7",
    accentDark: "#CDB891",
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
    "7xl": "8rem", // 128px
    "8xl": "12rem", // 192px
  },
  // SISTEMA DE SOMBRAS REFINADO
  shadows: {
    xs: "0 1px 2px 0 rgba(44, 24, 16, 0.02)",
    sm: "0 1px 3px 0 rgba(44, 24, 16, 0.05), 0 1px 2px 0 rgba(44, 24, 16, 0.02)",
    md: "0 4px 6px -1px rgba(44, 24, 16, 0.05), 0 2px 4px -1px rgba(44, 24, 16, 0.03)",
    lg: "0 10px 15px -3px rgba(44, 24, 16, 0.05), 0 4px 6px -2px rgba(44, 24, 16, 0.03)",
    xl: "0 20px 25px -5px rgba(44, 24, 16, 0.05), 0 10px 10px -5px rgba(44, 24, 16, 0.02)",
    "2xl": "0 25px 50px -12px rgba(44, 24, 16, 0.15)",
    soft: "0 8px 32px rgba(184, 155, 122, 0.08)",
    glow: "0 0 20px rgba(184, 155, 122, 0.25)",
  },
  // SISTEMA DE TIPOGRAFIA APRIMORADO
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      serif: ["Playfair Display", "Georgia", "serif"],
      mono: ["JetBrains Mono", "Consolas", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    lineHeight: {
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
    letterSpacing: {
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },
  // SISTEMA DE BORDAS REFINADO
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  // SISTEMA DE TRANSIÇÕES REFINADO
  transitions: {
    duration: {
      fast: "150ms",
      normal: "250ms",
      slow: "400ms",
      slower: "600ms",
    },
    timing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  // SISTEMA DE BREAKPOINTS RESPONSIVOS
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  // SISTEMA DE Z-INDEX ORGANIZADO
  zIndex: {
    dropdown: 10,
    modal: 20,
    tooltip: 30,
    notification: 40,
    overlay: 50,
  },
};

// Componente SectionTitle com variantes
const SectionTitle: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}> = ({ children, variant = "primary", className = "" }) => (
  <div className={`text-center mb-${tokens.spacing["2xl"]} ${className}`}>
    <h2
      className={`
        font-serif text-3xl lg:text-4xl font-bold tracking-wide
        ${
          variant === "primary"
            ? "text-[#2C1810] bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent"
            : "text-[#5D4A3A]"
        }
        leading-tight mb-4
      `}
    >
      {children}
    </h2>
    {variant === "primary" && (
      <div className="w-24 h-1 bg-gradient-to-r from-[#B89B7A] via-[#aa6b5d] to-[#B89B7A] rounded-full mx-auto mt-8 shadow-sm"></div>
    )}
  </div>
);

// Componente ProgressiveImage com carregamento otimizado
const ImageWithFallback: React.FC<{
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}> = ({ src, alt, className = "", onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
      <ProgressiveImage
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
      />
    </div>
  );
};

// Performance check para otimizações dinâmicas
const isLowPerformance =
  typeof navigator !== "undefined" &&
  (navigator.hardwareConcurrency <= 2 || (navigator as any).deviceMemory <= 2);

// Hotmart webhook integration
const hotmartWebhookData = {
  product_id: "23456789",
  offer_code: "ESTILO2024",
  tracking_source: "quiz_result",
  custom_fields: {
    quiz_result: "style_discovery",
    user_segment: "premium_beauty",
  },
};

const trackHotmartConversion = (eventType: string, additionalData = {}) => {
  if (typeof window !== "undefined" && (window as any).hotmart) {
    (window as any).hotmart.track(eventType, {
      ...hotmartWebhookData,
      ...additionalData,
      timestamp: new Date().toISOString(),
    });
  }
};

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  const [imagesLoaded, setImagesLoaded] = useState({
    primary: false,
    secondary: false,
    product: false,
  });

  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 100 : 300,
    disableTransitions: isLowPerformance,
  });

  // Estados de interação melhorados
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("primary-style");
  const [timer, setTimer] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59,
  });

  const isMobile = useIsMobile();

  // Dados computados otimizados
  const styleData = useMemo(() => {
    if (!primaryStyle || !styleConfig[primaryStyle]) {
      return null;
    }
    return {
      ...styleConfig[primaryStyle],
      category: primaryStyle,
    };
  }, [primaryStyle]);

  const secondaryStylesData = useMemo(() => {
    if (!secondaryStyles || secondaryStyles.length === 0) return [];
    return secondaryStyles
      .filter((style) => styleConfig[style])
      .map((style) => ({
        ...styleConfig[style],
        category: style,
      }));
  }, [secondaryStyles]);

  // Timer de urgência
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Scroll tracking aprimorado
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);

      // Tracking de seções
      const sections = ["primary-style", "secondary-styles", "cta-section"];
      const sectionElements = sections.map((id) => document.getElementById(id));

      const currentSection = sectionElements.find((element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tracking de carregamento de imagens
  const handleImageLoad = useCallback((type: keyof typeof imagesLoaded) => {
    setImagesLoaded((prev) => ({ ...prev, [type]: true }));
  }, []);

  // Complete loading quando todas as imagens carregarem
  useEffect(() => {
    const allImagesLoaded = Object.values(imagesLoaded).every(Boolean);
    if (allImagesLoaded && !isLoading) {
      completeLoading();
    }
  }, [imagesLoaded, isLoading, completeLoading]);

  // Handlers otimizados
  const handleCTAClick = useCallback(() => {
    trackButtonClick("cta_purchase", {
      style: primaryStyle,
      section: "main_cta",
      user_id: user?.id,
    });

    trackHotmartConversion("purchase_intent", {
      primary_style: primaryStyle,
      secondary_styles: secondaryStyles,
      user_id: user?.id,
    });

    // Redirect para checkout
    window.open("https://pay.hotmart.com/V87924838J?checkoutMode=10", "_blank");
  }, [primaryStyle, secondaryStyles, user?.id]);

  const handleSecondaryPurchase = useCallback(
    (category: string) => {
      trackButtonClick("secondary_style_purchase", {
        style: category,
        primary_style: primaryStyle,
        user_id: user?.id,
      });

      trackHotmartConversion("secondary_purchase", {
        selected_style: category,
        primary_style: primaryStyle,
      });
    },
    [primaryStyle, user?.id]
  );

  // Early returns para estados de error/loading
  if (!primaryStyle) {
    return <ErrorState />;
  }

  if (isLoading) {
    return <ResultSkeleton />;
  }

  if (!styleData) {
    return <ErrorState message="Dados do estilo não encontrados" />;
  }

  // Grid de produtos com imagens dinâmicas por categoria
  const getProductImage = (category: string) => {
    const images = {
      Clássico: "/images/products/classico-premium.jpg",
      Contemporâneo: "/images/products/contemporaneo-premium.jpg",
      Dramático: "/images/products/dramatico-premium.jpg",
      Criativo: "/images/products/criativo-premium.jpg",
    };
    return images[category] || "/images/products/default-premium.jpg";
  };

  return (
    <div
      className={`min-h-screen ${globalStyles}`}
      style={{ background: tokens.colors.background }}
    >
      <ResourcePreloader />
      <PerformanceMonitor />

      {/* Header fixo melhorado */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#B89B7A]/10"
              : "bg-transparent"
          }
        `}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Crown className="w-6 h-6 text-[#B89B7A]" />
            <span className="font-serif text-lg font-semibold text-[#2C1810]">
              Seu Estilo Descoberto
            </span>
          </div>

          {/* Timer de urgência no header */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8A5B] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            <Clock className="w-4 h-4" />
            <span>
              {String(timer.hours).padStart(2, "0")}:
              {String(timer.minutes).padStart(2, "0")}:
              {String(timer.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </header>

      {/* Spacer para header fixo */}
      <div className="h-20"></div>

      <AnimatedWrapper>
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
          {/* Seção Principal do Estilo - ID para tracking */}
          <section id="primary-style" className="mb-16 lg:mb-24">
            <SectionTitle variant="primary">
              🎉 Descobrimos o Seu Estilo Único!
            </SectionTitle>

            <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white to-[#fffaf7]">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12">
                {/* Coluna da Imagem com Progressive Loading */}
                <div className="space-y-6">
                  <div className="relative">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
                      <ImageWithFallback
                        src={styleData.image}
                        alt={`Estilo ${styleData.name}`}
                        onLoad={() => handleImageLoad("primary")}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay decorativo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>

                    {/* Badge de categoria */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <span className="text-[#2C1810] font-medium text-sm">
                        Estilo {styleData.name}
                      </span>
                    </div>
                  </div>

                  {/* Elementos decorativos */}
                  <div className="flex justify-center space-x-4">
                    {[Crown, Gem, Sparkles].map((Icon, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 bg-gradient-to-br from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coluna do Conteúdo */}
                <div className="space-y-8 flex flex-col justify-center">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#2C1810] leading-tight">
                        {styleData.name}
                      </h1>
                    </div>

                    <p className="text-[#5D4A3A] text-lg lg:text-xl leading-relaxed font-light">
                      {styleData.description}
                    </p>
                  </div>

                  {/* Características principais */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl font-semibold text-[#2C1810] mb-4">
                      ✨ Características do Seu Estilo:
                    </h3>
                    <div className="grid gap-3">
                      {styleData.characteristics?.map((char, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex-shrink-0"></div>
                          <span className="text-[#5D4A3A] leading-relaxed">
                            {char}
                          </span>
                        </div>
                      )) || (
                        <p className="text-[#8F7A6A] italic">
                          Características detalhadas serão personalizadas no
                          curso completo.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* CTA Primário aprimorado */}
                  <div className="pt-6">
                    <Button
                      onClick={handleCTAClick}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      className={`
                        w-full h-16 text-lg font-semibold rounded-xl
                        bg-gradient-to-r from-[#4CAF50] to-[#45a049]
                        hover:from-[#45a049] hover:to-[#4CAF50]
                        text-white shadow-xl hover:shadow-2xl
                        transform transition-all duration-300
                        ${
                          isButtonHovered
                            ? "scale-105 -translate-y-1"
                            : "scale-100"
                        }
                        border-0 relative overflow-hidden
                      `}
                    >
                      {/* Shimmer effect */}
                      <div
                        className={`
                        absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                        transform transition-transform duration-1000
                        ${
                          isButtonHovered
                            ? "translate-x-full"
                            : "-translate-x-full"
                        }
                      `}
                      ></div>

                      <div className="flex items-center justify-center space-x-3 relative z-10">
                        <ShoppingCart className="w-6 h-6" />
                        <span>Descobrir Meu Estilo Completo</span>
                        <ArrowDown className="w-5 h-5" />
                      </div>
                    </Button>

                    {/* Indicadores de confiança */}
                    <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-[#8F7A6A]">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-[#4CAF50]" />
                        <span>Compra Segura</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-[#B89B7A]" />
                        <span>Garantia 30 dias</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Seção de Estilos Secundários aprimorada */}
          {secondaryStylesData.length > 0 && (
            <section id="secondary-styles" className="mb-16 lg:mb-24">
              <SectionTitle variant="secondary">
                🌟 Seus Estilos Complementares
              </SectionTitle>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {secondaryStylesData.map((style, index) => (
                  <Card
                    key={style.category}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <ImageWithFallback
                        src={style.image}
                        alt={`Estilo ${style.name}`}
                        onLoad={() => handleImageLoad("secondary")}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Badge com posição dinâmica */}
                      <div
                        className={`absolute top-4 right-4 bg-gradient-to-r ${
                          index === 0
                            ? "from-[#B89B7A] to-[#aa6b5d]"
                            : "from-[#aa6b5d] to-[#8F5A4D]"
                        } text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}
                      >
                        #{index + 2}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="font-serif text-xl font-semibold text-[#2C1810]">
                        {style.name}
                      </h3>
                      <p className="text-[#5D4A3A] text-sm leading-relaxed line-clamp-3">
                        {style.description}
                      </p>

                      <Button
                        onClick={() => handleSecondaryPurchase(style.category)}
                        variant="outline"
                        className="w-full border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white transition-all duration-300"
                      >
                        <Palette className="w-4 h-4 mr-2" />
                        Explorar Este Estilo
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Seção CTA Principal com Grid de Produtos - ID para tracking */}
          <section id="cta-section" className="mb-16 lg:mb-24">
            <div className="bg-gradient-to-br from-[#fffaf7] to-[#f9f4ef] rounded-3xl p-8 lg:p-12 shadow-2xl border border-[#B89B7A]/10">
              <SectionTitle variant="primary">
                🎯 Transforme Seu Estilo Completamente
              </SectionTitle>

              {/* Grid de produtos premium */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {Object.entries(styleConfig).map(([category, config]) => (
                  <Card
                    key={category}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <ImageWithFallback
                        src={getProductImage(category)}
                        alt={`Curso ${config.name}`}
                        onLoad={() => handleImageLoad("product")}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                      {/* Badge premium */}
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                        <Crown className="w-3 h-3" />
                        <span>PREMIUM</span>
                      </div>

                      {/* Overlay com informações */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h4 className="font-serif text-lg font-semibold mb-1">
                          {config.name}
                        </h4>
                        <p className="text-sm text-white/90 line-clamp-2">
                          {config.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Proposta de valor aprimorada */}
              <div className="text-center mb-12">
                <div className="max-w-4xl mx-auto">
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#2C1810] mb-6">
                    O Que Você Receberá no Curso Completo:
                  </h3>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Target,
                        title: "Análise Personalizada",
                        desc: "Avaliação completa do seu estilo único",
                      },
                      {
                        icon: Palette,
                        title: "Guia de Cores",
                        desc: "Paleta personalizada para seu tom de pele",
                      },
                      {
                        icon: Scissors,
                        title: "Cortes Ideais",
                        desc: "Sugestões de cortes para seu rosto",
                      },
                      {
                        icon: Sparkles,
                        title: "Styling Tips",
                        desc: "Técnicas exclusivas de styling",
                      },
                      {
                        icon: Crown,
                        title: "Consultoria VIP",
                        desc: "Acesso a sessões de mentoria",
                      },
                      {
                        icon: Gift,
                        title: "Bônus Exclusivos",
                        desc: "Materiais extras e atualizações",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-lg border border-[#B89B7A]/10"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center mx-auto mb-4">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-[#2C1810] mb-2">
                          {item.title}
                        </h4>
                        <p className="text-[#5D4A3A] text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing e CTA Principal */}
              <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-xl border-2 border-[#B89B7A]/20">
                <div className="text-center mb-6">
                  <div className="text-[#8F7A6A] text-lg line-through mb-2">
                    De R$ 497
                  </div>
                  <div className="text-4xl font-bold text-[#2C1810] mb-2">
                    R$ 197
                    <span className="text-lg font-normal text-[#5D4A3A]">
                      /único
                    </span>
                  </div>
                  <div className="text-[#4CAF50] font-semibold">
                    60% de desconto
                  </div>
                </div>

                {/* Timer de urgência */}
                <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8A5B] text-white p-4 rounded-xl mb-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Hourglass className="w-5 h-5" />
                    <span className="font-semibold">
                      Oferta por tempo limitado!
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    {String(timer.hours).padStart(2, "0")}:
                    {String(timer.minutes).padStart(2, "0")}:
                    {String(timer.seconds).padStart(2, "0")}
                  </div>
                </div>

                <Button
                  onClick={handleCTAClick}
                  className="w-full h-16 text-xl font-bold rounded-xl bg-gradient-to-r from-[#4CAF50] to-[#45a049] hover:from-[#45a049] hover:to-[#4CAF50] text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <ShoppingCart className="w-6 h-6" />
                    <span>GARANTIR MINHA TRANSFORMAÇÃO</span>
                    <Fire className="w-6 h-6" />
                  </div>
                </Button>

                {/* Garantias */}
                <div className="mt-6 space-y-3">
                  {[
                    { icon: Shield, text: "Garantia de 30 dias" },
                    { icon: Award, text: "Certificado de conclusão" },
                    { icon: Users, text: "Comunidade exclusiva" },
                    { icon: Heart, text: "Suporte especializado" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 text-[#5D4A3A]"
                    >
                      <item.icon className="w-5 h-5 text-[#4CAF50]" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Seções adicionais com lazy loading */}
          <Suspense fallback={<LoadingSpinner />}>
            <BeforeAfterTransformation />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <MotivationSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <BonusSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <GuaranteeSection />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <MentorSection />
          </Suspense>

          {/* Elementos de segurança */}
          <SecurePurchaseElement />

          {/* Build info */}
          <BuildInfo />
        </div>
      </AnimatedWrapper>

      {/* Botão CTA flutuante otimizado */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <Button
          onClick={handleCTAClick}
          className={`
            px-8 py-4 rounded-full bg-gradient-to-r from-[#4CAF50] to-[#45a049]
            text-white font-semibold shadow-2xl
            transition-all duration-300 transform
            ${
              isScrolled
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }
            hover:scale-110 hover:shadow-3xl
            border-2 border-white/20
          `}
        >
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Garantir Agora</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
