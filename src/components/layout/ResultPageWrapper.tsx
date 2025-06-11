
import React, { useEffect, useState, useCallback } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { useGlobalStyles } from "@/hooks/useGlobalStyles";
import { useAuth } from "@/context/AuthContext";
import { useLoadingState } from "@/hooks/useLoadingState";
import { useIsLowPerformanceDevice } from "@/hooks/use-mobile";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { tokens } from "@/config/designTokens";
import { CustomStyles } from "@/components/result/CustomStyles";
import { NavigationDots } from "@/components/result/NavigationDots";

interface ResultPageWrapperProps {
  children: React.ReactNode;
}

export const ResultPageWrapper: React.FC<ResultPageWrapperProps> = ({
  children,
}) => {
  const { primaryStyle } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isScrolled, activeSection, scrollToSection } = useScrollTracking();
  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 100 : 300,
    disableTransitions: isLowPerformance,
  });

  const [imagesLoaded, setImagesLoaded] = useState({
    style: false,
    guide: false,
  });

  // Callback para quando as imagens carregam
  const handleImageLoad = useCallback((imageType: "style" | "guide") => {
    console.log(`[ResultPageWrapper] Imagem ${imageType} carregada`);
    setImagesLoaded(prev => ({ ...prev, [imageType]: true }));
  }, []);

  // Effect para controle de carregamento otimizado
  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);

    // Verificar se os resultados foram pré-carregados
    const hasPreloadedResults = localStorage.getItem("preloadedResults") === "true";
    
    if (hasPreloadedResults) {
      console.log('[ResultPageWrapper] Resultados pré-carregados detectados, acelerando carregamento');
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
      return;
    }

    // Timeout de segurança para dispositivos mais lentos
    const safetyTimeout = setTimeout(() => {
      console.log('[ResultPageWrapper] Safety timeout ativado, finalizando carregamento');
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
    }, isLowPerformance ? 1500 : 2500);

    // Simular carregamento de recursos críticos
    const criticalResourcesTimeout = setTimeout(() => {
      setImagesLoaded(prev => ({ ...prev, style: true }));
    }, 200);

    const secondaryResourcesTimeout = setTimeout(() => {
      setImagesLoaded(prev => ({ ...prev, guide: true }));
    }, 600);

    return () => {
      clearTimeout(safetyTimeout);
      clearTimeout(criticalResourcesTimeout);
      clearTimeout(secondaryResourcesTimeout);
    };
  }, [primaryStyle, globalStyles.logo, completeLoading, isLowPerformance]);

  // Effect para finalizar carregamento quando todas as imagens estão prontas
  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) {
      console.log('[ResultPageWrapper] Todas as imagens carregadas, finalizando loading');
      completeLoading();
    }
  }, [imagesLoaded, completeLoading]);

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando resultado...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.text,
        fontFamily: globalStyles.fontFamily || "Inter, system-ui, sans-serif",
      }}
    >
      <CustomStyles />

      {/* Background decorativo */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-1/2 h-1/2 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"
          style={{
            background: `linear-gradient(135deg, ${tokens.colors.primary}20, transparent)`
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-1/3 h-1/3 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"
          style={{
            background: `linear-gradient(45deg, ${tokens.colors.secondary}15, transparent)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/4 w-1/4 h-1/4 rounded-full blur-2xl"
          style={{
            background: `linear-gradient(90deg, ${tokens.colors.primary}10, transparent)`
          }}
        ></div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
        style={{
          borderBottom: isScrolled ? `1px solid ${tokens.colors.border}` : 'none'
        }}
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

      {/* Navigation dots */}
      <NavigationDots
        isVisible={isScrolled}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      <main className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-6xl relative z-10">
        {children}
      </main>

      {/* Rodapé */}
      <footer
        className="mt-28 border-t"
        style={{
          borderTopColor: tokens.colors.border,
          background: `linear-gradient(90deg, ${tokens.colors.backgroundAlt}, ${tokens.colors.background})`
        }}
      >
        <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16 max-w-6xl">
          <div className="text-center space-y-6">
            <div className="mb-8">
              <a
                href="/politica-privacidade"
                className="transition-colors duration-300 font-medium text-sm lg:text-base underline underline-offset-4"
                style={{
                  color: tokens.colors.textSecondary,
                  textDecorationColor: `${tokens.colors.primary}50`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = tokens.colors.primary;
                  e.currentTarget.style.textDecorationColor = tokens.colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = tokens.colors.textSecondary;
                  e.currentTarget.style.textDecorationColor = `${tokens.colors.primary}50`;
                }}
              >
                Política de Privacidade
              </a>
            </div>
            <div 
              className="w-32 h-px mx-auto mb-8"
              style={{
                background: `linear-gradient(90deg, transparent, ${tokens.colors.primary}, transparent)`
              }}
            ></div>
            <p 
              className="text-sm lg:text-base font-medium"
              style={{ color: tokens.colors.textMuted }}
            >
              © 2025 Gisele Galvão. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
