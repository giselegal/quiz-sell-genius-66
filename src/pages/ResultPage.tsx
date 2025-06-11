
import React, { Suspense, lazy } from "react";
import { useQuiz } from "@/hooks/useQuiz";
import { useAuth } from "@/context/AuthContext";
import { useIsLowPerformanceDevice } from "@/hooks/use-mobile";
import { ResultPageWrapper } from "@/components/layout/ResultPageWrapper";
import SectionTitle from "@/components/common/SectionTitle";
import ResultHeaderSection from "@/components/quiz-sections/ResultHeaderSection";
import { TransitionSection } from "@/components/quiz-sections/TransitionSection";
import { FinalCtaSection } from "@/components/quiz-sections/FinalCtaSection";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";

// Lazy-loaded sections for better performance
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

// Loading fallback component
const SectionLoading: React.FC<{ message: string }> = ({ message }) => (
  <div className="py-16 flex flex-col items-center justify-center bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-2xl">
    <div className="w-8 h-8 border-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-[#8F7A6A] font-medium">{message}</p>
  </div>
);

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { user } = useAuth();
  const isLowPerformance = useIsLowPerformanceDevice();

  // Function to handle image loading (passed to ResultHeaderSection)
  const handleImageLoad = (imageType: "style" | "guide") => {
    console.log(`Image ${imageType} loaded.`);
  };

  // Sections order configuration - can be easily modified for different layouts
  const sectionsOrder = [
    "primary-style",
    "transformations",
    "motivation",
    "bonuses",
    "testimonials",
    "guarantee",
    "mentor",
    "transition-cta",
    "cta",
  ];

  if (!primaryStyle) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ResultPageWrapper>
      {sectionsOrder.map((sectionId) => {
        switch (sectionId) {
          case "primary-style":
            return (
              <ResultHeaderSection
                key={sectionId}
                primaryStyle={primaryStyle}
                secondaryStyles={secondaryStyles || []}
                user={user}
                isLowPerformance={isLowPerformance}
                onImageLoad={handleImageLoad}
              />
            );

          case "transformations":
            return (
              <section
                key={sectionId}
                id="transformations"
                className="scroll-mt-24 mb-24 lg:mb-28"
              >
                <SectionTitle
                  variant="primary"
                  size="xl"
                  subtitle="Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber"
                >
                  Resultados que Falam por Si
                </SectionTitle>
                <Suspense fallback={<SectionLoading message="Carregando transformações..." />}>
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                  >
                    <BeforeAfterTransformation />
                  </AnimatedWrapper>
                </Suspense>
              </section>
            );

          case "motivation":
            return (
              <section
                key={sectionId}
                id="motivation"
                className="scroll-mt-24 mb-24 lg:mb-28"
              >
                <SectionTitle
                  variant="secondary"
                  size="xl"
                  subtitle="Conhecer seu estilo pessoal é muito mais do que seguir tendências passageiras — é uma ferramenta poderosa de comunicação não-verbal e autoconfiança."
                >
                  Por que Aplicar seu Estilo é tão Importante?
                </SectionTitle>
                <Suspense fallback={<SectionLoading message="Carregando conteúdo..." />}>
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                  >
                    <MotivationSection />
                  </AnimatedWrapper>
                </Suspense>
              </section>
            );

          case "bonuses":
            return (
              <section
                key={sectionId}
                id="bonuses"
                className="scroll-mt-24 mb-24 lg:mb-28"
              >
                <Suspense fallback={<SectionLoading message="Carregando bônus..." />}>
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                  >
                    <BonusSection />
                  </AnimatedWrapper>
                </Suspense>
              </section>
            );

          case "testimonials":
            return (
              <section
                key={sectionId}
                id="testimonials"
                className="scroll-mt-24 mb-24 lg:mb-28"
              >
                <Suspense fallback={<SectionLoading message="Carregando depoimentos..." />}>
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                  >
                    <Testimonials />
                  </AnimatedWrapper>
                </Suspense>
              </section>
            );

          case "guarantee":
            return (
              <section
                key={sectionId}
                id="guarantee"
                className="scroll-mt-24 mb-24 lg:mb-28"
              >
                <Suspense fallback={<SectionLoading message="Carregando garantia..." />}>
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                  >
                    <GuaranteeSection />
                  </AnimatedWrapper>
                </Suspense>
              </section>
            );

          case "mentor":
            return (
              <section
                key={sectionId}
                id="mentor"
                className="scroll-mt-24 mb-24 lg:mb-28"
              >
                <SectionTitle
                  variant="simple"
                  size="xl"
                  subtitle="Especialista que já guiou mais de 3.000 mulheres na descoberta do seu estilo autêntico"
                >
                  Conheça Sua Mentora
                </SectionTitle>
                <Suspense fallback={<SectionLoading message="Carregando informações da mentora..." />}>
                  <AnimatedWrapper
                    animation={isLowPerformance ? "none" : "fade"}
                    show={true}
                    duration={400}
                  >
                    <MentorSection />
                  </AnimatedWrapper>
                </Suspense>
              </section>
            );

          case "transition-cta":
            return (
              <TransitionSection key={sectionId} isLowPerformance={isLowPerformance} />
            );

          case "cta":
            return (
              <FinalCtaSection
                key={sectionId}
                category={primaryStyle.category}
                primaryStyle={primaryStyle}
              />
            );

          default:
            return null;
        }
      })}
    </ResultPageWrapper>
  );
};

export default ResultPage;
