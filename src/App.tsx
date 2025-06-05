import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { QuizProvider } from "./context/QuizContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { captureUTMParameters } from "./utils/analytics";
import { loadFacebookPixelDynamic } from "./utils/facebookPixelDynamic";
import { OptimizedLoading } from "@/components/ui/OptimizedLoading";
import CriticalCSSLoader from "./components/CriticalCSSLoader";
import { initialCriticalCSS, heroCriticalCSS } from "./utils/critical-css";
import { AdminRoute } from "./components/admin/AdminRoute";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

// Lazy loading das páginas com preload inteligente
const LandingPage = lazy(() =>
  import("./pages/LandingPage").then((module) => {
    // Preload próximas páginas prováveis
    import("./components/QuizPage");
    return module;
  })
);

const QuizPage = lazy(() =>
  import("./components/QuizPage").then((module) => {
    // Preload página de resultado
    import("./pages/ResultPage");
    return module;
  })
);

const ResultPage = lazy(() => import("./pages/ResultPage"));

const QuizDescubraSeuEstilo = lazy(() => import("./pages/quiz-descubra-seu-estilo"));

// Admin pages com lazy loading mais conservador
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  const { settings, isLowPerformanceDevice } = usePerformanceOptimization();

  // Inicializar analytics na montagem do componente
  useEffect(() => {
    try {
      // Carregar analytics de forma assíncrona para não bloquear o rendering
      if (!isLowPerformanceDevice) {
        setTimeout(() => {
          loadFacebookPixelDynamic();
          captureUTMParameters();
        }, 1000);
      } else {
        // Para dispositivos de baixo desempenho, aguardar mais tempo
        setTimeout(() => {
          loadFacebookPixelDynamic();
          captureUTMParameters();
        }, 3000);
      }

      console.log("App initialized with performance optimizations");
    } catch (error) {
      console.error("Erro ao inicializar aplicativo:", error);
    }
  }, [isLowPerformanceDevice]);

  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          {/* Critical CSS Loading */}
          <CriticalCSSLoader
            cssContent={initialCriticalCSS}
            id="initial-critical"
            removeOnLoad={true}
            removeDelay={2000}
          />
          <CriticalCSSLoader
            cssContent={heroCriticalCSS}
            id="hero-critical"
            removeOnLoad={true}
            removeDelay={3000}
          />

          <Router>
            <Suspense fallback={<OptimizedLoading message="Carregando página..." size="md" />}>
              <Routes>
                {/* Rota principal */}
                <Route path="/" element={<LandingPage />} />

                {/* Quiz routes */}
                <Route path="/quiz" element={<QuizPage />} />
                <Route
                  path="/quiz-descubra-seu-estilo"
                  element={<QuizDescubraSeuEstilo />}
                />
                <Route
                  path="/descubra-seu-estilo"
                  element={<QuizDescubraSeuEstilo />}
                />

                {/* Resultado */}
                <Route path="/resultado" element={<ResultPage />} />

                {/* Admin routes com proteção */}
                <Route
                  path="/admin/*"
                  element={
                    <AdminAuthProvider>
                      <AdminRoute>
                        <Suspense
                          fallback={
                            <OptimizedLoading
                              message="Carregando admin..."
                              minimal={isLowPerformanceDevice}
                            />
                          }
                        >
                          <DashboardPage />
                        </Suspense>
                      </AdminRoute>
                    </AdminAuthProvider>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Router>

          <Toaster />
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
