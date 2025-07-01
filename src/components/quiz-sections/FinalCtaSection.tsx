
import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  CheckCircle,
  ArrowDown,
  Clock,
  Shield,
  Award,
  Hourglass,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressiveImage from "@/components/ui/progressive-image";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { useIsLowPerformanceDevice } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { tokens } from "@/config/designTokens";

interface FinalCtaSectionProps {
  category: string;
  primaryStyle: any;
}

const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  category,
  primaryStyle,
}) => {
  const { user } = useAuth();
  const isLowPerformance = useIsLowPerformanceDevice();

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

  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    interface WindowWithCTAProcessing extends Window {
      ctaClickProcessing?: boolean;
    }

    const windowTyped = window as WindowWithCTAProcessing;

    if (windowTyped.ctaClickProcessing) return;
    windowTyped.ctaClickProcessing = true;

    if (user?.email) {
      console.log(
        "[Hotmart Integration] Dados do usuário armazenados para:",
        user.email
      );
    }

    console.log("Checkout button clicked - results page");

    const hotmartUrl =
      "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912&utm_source=quiz&utm_medium=abtest&utm_campaign=testeA";

    if (window.innerWidth >= 768) {
      window.open(hotmartUrl, "_blank");
    } else {
      window.location.href = hotmartUrl;
    }

    setTimeout(() => {
      windowTyped.ctaClickProcessing = false;
    }, 1000);
  };

  const getGuideImageSrc = (cat: string) => {
    const guideImages: { [key: string]: string } = {
      Natural: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071344/GUIA_NATURAL_fzp6fc.webp",
      Clássico: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp",
      Contemporâneo: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp",
      Elegante: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071342/GUIA_ELEGANTE_asez1q.webp",
      Romântico: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp",
      Sexy: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071349/GUIA_SEXY_t5x2ov.webp",
      Dramático: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp",
      Criativo: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1745071342/GUIA_CRIATIVO_ntbzph.webp",
    };
    return guideImages[cat] || guideImages["Natural"];
  };

  const products = [
    {
      src: getGuideImageSrc(category),
      title: `Manual de Estilo ${category}`,
      subtitle: "Descubra combinações infalíveis de cores, tecidos e acessórios que valorizam sua personalidade única.",
      badge: "GUIA PRINCIPAL",
      originalPrice: "R$ 77,00",
      priority: true,
      aspectRatio: "4.6/5"
    },
    {
      src: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911677/Cópia_de_MOCKUPS_15_-_Copia_grstwl.png",
      title: "Guia das Peças Estratégicas",
      subtitle: "Peças-chave que maximizam combinações e garantem versatilidade em qualquer situação.",
      badge: "BÔNUS EXCLUSIVO",
      originalPrice: "R$ 59,00",
      priority: false,
      aspectRatio: "6/3.5"
    },
    {
      src: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_700/v1744911666/Cópia_de_Template_Dossiê_Completo_2024_15_-_Copia_ssrhu3.png",
      title: "Manual de Visagismo",
      subtitle: "Descubra os cortes ideais para seu rosto e realce sua beleza natural.",
      badge: "BÔNUS PREMIUM",
      originalPrice: "R$ 39,00",
      priority: false,
      aspectRatio: "3/4.5"
    },
  ];

  return (
    <section id="cta" className="scroll-mt-24 mb-16 lg:mb-20">
      <div
        className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7f3] to-[#f9f4ef] rounded-3xl p-8 lg:p-12 border text-center"
        style={{ 
          borderColor: tokens.colors.border,
          boxShadow: tokens.shadows.xl 
        }}
      >
        {/* Background decorativo */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${tokens.colors.primary}05, transparent, ${tokens.colors.secondary}05)`
          }}
        ></div>

        <AnimatedWrapper
          animation={isLowPerformance ? "none" : "fade"}
          show={true}
          duration={600}
          delay={200}
        >
          <div className="relative z-10">
            {/* Header da CTA */}
            <div className="mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-4 mb-8">
                <div 
                  className="w-20 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${tokens.colors.primary}, transparent)`
                  }}
                ></div>
                <div 
                  className="w-6 h-6 rounded-full animate-pulse shadow-lg"
                  style={{
                    background: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary})`
                  }}
                ></div>
                <div 
                  className="w-20 h-px"
                  style={{
                    background: `linear-gradient(to right, transparent, ${tokens.colors.primary}, transparent)`
                  }}
                ></div>
              </div>

              <h2 
                className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold leading-tight mb-8"
                style={{ color: tokens.colors.text }}
              >
                <span 
                  className="block mb-4 bg-clip-text text-transparent"
                  style={{
                    background: `linear-gradient(to right, ${tokens.colors.text}, ${tokens.colors.secondary}, ${tokens.colors.text})`
                  }}
                >
                  Desperte Sua Confiança
                </span>
                <span style={{ color: tokens.colors.secondary }} className="block">
                  Com Seu Estilo Único!
                </span>
              </h2>

              <p 
                className="text-xl lg:text-2xl font-medium mb-6"
                style={{ color: tokens.colors.textSecondary }}
              >
                Guia {category} Personalizado + Bônus Exclusivos
              </p>

              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{
                  background: `linear-gradient(to right, ${tokens.colors.primary}10, ${tokens.colors.secondary}10)`,
                  borderColor: tokens.colors.border
                }}
              >
                <Clock className="w-4 h-4" style={{ color: tokens.colors.secondary }} />
                <span className="text-sm font-medium" style={{ color: tokens.colors.secondary }}>
                  Oferta por tempo limitado
                </span>
              </div>
            </div>

            {/* Grid de produtos */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className={`group bg-white rounded-2xl p-6 lg:p-8 border transition-all duration-500 hover:scale-105 hover:shadow-2xl relative ${
                      index === 2 ? "md:col-span-2 xl:col-span-1" : ""
                    }`}
                    style={{ 
                      borderColor: tokens.colors.border,
                      boxShadow: tokens.shadows.lg 
                    }}
                  >
                    {/* Badge premium */}
                    <div className="absolute -top-4 -right-4 z-10">
                      <span
                        className={`text-xs font-bold px-4 py-2 rounded-full text-white shadow-lg transform rotate-12 ${
                          index === 0
                            ? "bg-gradient-to-r"
                            : "bg-gradient-to-r"
                        }`}
                        style={{
                          background: index === 0 
                            ? `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary})`
                            : `linear-gradient(to right, ${tokens.colors.secondary}, ${tokens.colors.primary})`
                        }}
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
                      <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{
                          background: `linear-gradient(to top, ${tokens.colors.primary}10, transparent)`
                        }}
                      ></div>
                    </div>

                    {/* Conteúdo do produto */}
                    <div className="text-left space-y-4">
                      <h4 
                        className="font-bold text-lg lg:text-xl leading-tight"
                        style={{ color: tokens.colors.text }}
                      >
                        {product.title}
                      </h4>
                      <p 
                        className="text-sm lg:text-base leading-relaxed"
                        style={{ color: tokens.colors.textSecondary }}
                      >
                        {product.subtitle}
                      </p>

                      {/* Preço original */}
                      <div className="pt-4 border-t" style={{ borderColor: tokens.colors.borderLight }}>
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-sm font-medium"
                            style={{ color: tokens.colors.textMuted }}
                          >
                            Valor individual:
                          </span>
                          <span 
                            className="text-lg font-bold line-through"
                            style={{ color: tokens.colors.primary }}
                          >
                            {product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo de valor */}
            <div className="max-w-lg mx-auto mb-12">
              <div
                className="relative bg-white rounded-2xl p-8 lg:p-12 border-4 border-double overflow-hidden"
                style={{
                  borderColor: `${tokens.colors.primary}30`,
                  boxShadow: `0 20px 40px ${tokens.colors.primary}15, 0 0 0 1px rgba(255,255,255,0.8) inset`,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,244,239,0.95) 100%)`,
                }}
              >
                {/* Background decorativo */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full transform translate-x-16 -translate-y-16"
                  style={{
                    background: `linear-gradient(to bottom right, ${tokens.colors.primary}10, transparent)`
                  }}
                ></div>

                <div className="relative z-10 text-center space-y-6">
                  <p 
                    className="text-lg lg:text-xl font-semibold"
                    style={{ color: tokens.colors.textSecondary }}
                  >
                    De{" "}
                    <span 
                      className="font-bold text-xl lg:text-2xl line-through"
                      style={{ color: tokens.colors.primary }}
                    >
                      R$ 175,00
                    </span>{" "}
                    por apenas:
                  </p>

                  <div className="space-y-1">
                    <p 
                      className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent"
                      style={{
                        background: `linear-gradient(to right, ${tokens.colors.primary}, ${tokens.colors.secondary})`
                      }}
                    >
                      R$ 39,90
                    </p>
                    <p 
                      className="text-lg lg:text-xl font-bold"
                      style={{ color: tokens.colors.success }}
                    >
                      ou 5x de R$ 8,83
                    </p>
                  </div>

                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                    style={{
                      background: `linear-gradient(to right, ${tokens.colors.success}10, ${tokens.colors.successDark}10)`,
                      borderColor: `${tokens.colors.success}20`
                    }}
                  >
                    <TrendingUp className="w-4 h-4" style={{ color: tokens.colors.success }} />
                    <span className="text-sm font-bold" style={{ color: tokens.colors.success }}>
                      Economia de R$ 135,10 (77% OFF)
                    </span>
                  </div>

                  <div 
                    className="flex items-center justify-center gap-2 text-sm"
                    style={{ color: tokens.colors.textMuted }}
                  >
                    <Hourglass className="w-4 h-4 animate-pulse" />
                    <span>
                      Esta oferta expira quando você sair desta página
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button principal */}
            <div className="text-center">
              <Button
                onClick={handleCTAClick}
                className="group relative text-white font-bold py-6 px-8 sm:px-12 lg:px-16 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                style={{
                  background: `linear-gradient(135deg, ${tokens.colors.success} 0%, ${tokens.colors.successDark} 50%, #388e3c 100%)`,
                  boxShadow: tokens.shadows.cta,
                }}
                type="button"
              >
                <span
                  className="flex items-center justify-center gap-2 sm:gap-4"
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

              {/* Garantias de segurança */}
              <div 
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm"
                style={{ color: tokens.colors.textMuted }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: tokens.colors.primary }} />
                  <span>Pagamento 100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" style={{ color: tokens.colors.primary }} />
                  <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" style={{ color: tokens.colors.primary }} />
                  <span>Garantia de 7 Dias</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};

export default FinalCtaSection;
