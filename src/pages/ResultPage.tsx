
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { StyleResult } from "../types/quiz";
import { useAuth } from "../context/AuthContext";
import { ContentContainer } from "../components/shared/ContentContainer";
import { GridLayout } from "../components/shared/GridLayout";
import ResultHeader from "../components/quiz-result/ResultHeader";
import PrimaryStyleCard from "../components/quiz-result/PrimaryStyleCard";
import SecondaryStylesSection from "../components/quiz-result/SecondaryStylesSection";
import OfferCard from "../components/quiz-result/OfferCard";
import BeforeAfterTransformation from "../components/result/BeforeAfterTransformation";
import { CheckCircle } from "lucide-react";
import { sharedStyles } from "@/styles/sharedStyles";
import { ResultPageConfig } from "@/types/resultPageConfig";
import { cn } from "@/lib/utils";
import GuaranteeSection from "../components/result/GuaranteeSection";
import {
  trackEvent,
  trackPageView,
  trackSaleConversion,
  captureUTMParameters,
} from "@/utils/analytics";
import {
  hotmartWebhookManager,
} from "@/utils/hotmartWebhook";

// Seções carregadas via lazy
const LazyBonusSection = React.lazy(
  () => import("../components/result/BonusSection")
);
const LazyFinalCTA = React.lazy(
  () => import("../components/result/FinalCTA")
);
const LazyTestimonials = React.lazy(
  () => import("../components/result/Testimonials")
);

interface ResultPageProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  config?: ResultPageConfig;
  previewMode?: boolean;
  onReset?: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({
  primaryStyle,
  secondaryStyles,
  config: externalConfig,
  previewMode = false,
  onReset,
}) => {
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>("Visitante");
  const [config, setConfig] = useState<ResultPageConfig | null>(null);

  // Analytics e tracking
  useEffect(() => {
    trackPageView("/resultado");
    trackEvent("result_page_viewed", "Quiz");
  }, []);

  useEffect(() => {
    if (user && user.userName) {
      setUserName(user.userName);
    } else {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, [user]);

  useEffect(() => {
    try {
      if (externalConfig) {
        setConfig(externalConfig);
      } else {
        const configKey = `quiz_result_config_${primaryStyle.category}`;
        const savedConfig = localStorage.getItem(configKey);

        if (savedConfig) {
          setConfig(JSON.parse(savedConfig));
          console.log("Loaded config from localStorage:", configKey);
        } else {
          console.log("No saved config found for:", primaryStyle.category);
          setConfig(null);
        }
      }
    } catch (error) {
      console.error("Error loading custom settings:", error);
      setConfig(null);
    }
  }, [primaryStyle.category, externalConfig]);

  if (!primaryStyle || !secondaryStyles) {
    console.error("Missing required props:", { primaryStyle, secondaryStyles });
    return <div>Erro ao carregar os resultados. Por favor, refaça o quiz.</div>;
  }

  // Build custom title with user name
  const customTitle = `Olá, ${userName}, seu Estilo Predominante é:`;

  // Store user data for Hotmart correlation
  useEffect(() => {
    if (typeof window !== "undefined" && user?.email) {
      // Track quiz completion
      trackEvent("quiz_completed", "Quiz");

      // Store data for Hotmart webhook correlation
      hotmartWebhookManager.storeQuizCompletionData(user.email, {
        primaryStyle: {
          category: primaryStyle.category,
          score: primaryStyle.score,
          percentage: primaryStyle.percentage
        } as Record<string, unknown>,
        secondaryStyles: secondaryStyles.map(style => ({
          category: style.category,
          score: style.score,
          percentage: style.percentage
        })) as Record<string, unknown>[],
        completedAt: new Date().toISOString()
      } as Record<string, unknown>);

      console.log(
        "[Hotmart Integration] Dados do usuário armazenados para:",
        user.email
      );
    }
  }, [primaryStyle, secondaryStyles, user, userName]);

  return (
    <div
      className={cn(
        "min-h-screen",
        previewMode ? "max-h-screen overflow-auto" : ""
      )}
      style={{
        backgroundColor:
          config?.globalStyles?.backgroundColor ||
          sharedStyles.colors.background,
        color:
          config?.globalStyles?.textColor || sharedStyles.colors.textPrimary,
      }}
    >
      <ContentContainer size="md">
        <ResultHeader userName={userName} customTitle={customTitle} />

        <div className="space-y-8">
          <PrimaryStyleCard primaryStyle={primaryStyle} />
          <SecondaryStylesSection secondaryStyles={secondaryStyles} />
          <OfferCard
            primaryStyle={primaryStyle}
            config={config?.offer?.hero?.content || {}}
          />

          {/* Bloco de transformação Antes e Depois */}
          <BeforeAfterTransformation />

          {/* Seções lazy-loaded */}
          <React.Suspense
            fallback={
              <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
            }
          >
            <LazyBonusSection />
          </React.Suspense>

          <React.Suspense
            fallback={
              <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
            }
          >
            <LazyTestimonials />
          </React.Suspense>

          {/* Garantia section */}
          <div className="mt-12 mb-8">
            <GuaranteeSection />
          </div>

          {/* Final CTA */}
          <React.Suspense
            fallback={
              <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
            }
          >
            <LazyFinalCTA />
          </React.Suspense>
        </div>
      </ContentContainer>
    </div>
  );
};

export default ResultPage;
