"use client";
import React, { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import { lazy } from 'react';

// Use the existing CountdownTimer component from the codebase
import CountdownTimer from '@/components/ui/countdown-timer';

// Mock for FixedIntroImage to allow visualization
const FixedIntroImage = ({ src, alt, width, height, className }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      // Add a fallback for broken images
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevents infinite loop
        target.src = `https://placehold.co/${width}x${height}/E0E0E0/888888?text=Imagem+N%C3%A3o+Dispon%C3%ADvel`;
      }}
    />
  );
};

// Mock for preloadCriticalImages
const preloadCriticalImages = (urls: string[], options?: any) => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
    // console.log(`Preloading image: ${url}`);
  });
};

// Mock for trackButtonClick
const trackButtonClick = (buttonId: string, action: string, page: string) => {
  console.log(`Analytics: Button Clicked - ID: ${buttonId}, Action: ${action}, Page: ${page}`);
};

import {
  ChevronRight, Check, Clock, Star, ShoppingBag, Heart, Users, Award,
  Shield, ArrowRight, TrendingUp, BadgeCheck, Lock, Gift, ShoppingCart,
  CheckCircle, ArrowDown, Hourglass
} from 'lucide-react';

// --- Constantes para Otimização de Imagens (Mantido, mas URLs devem ser validadas) ---
// Ensure these URLs are correct and accessible. Consider using dynamic image sizing if possible.
const IMAGE_ASSETS = {
  HERO_LOGO: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  HERO_COMPLEMENTARY: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp",
  PROBLEM_ILLUSTRATION: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp",
  SOLUTION_QUIZ: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp",
  GUIDES_BENEFITS: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp",
  GUIDES_COMPLEMENTARY: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp",
  BONUS_KEY_PIECES: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp",
  BONUS_KEY_PIECES_COMPLEMENTARY: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515075/Espanhol_Portugu%C3%A1s_1_uru4r3.webp",
  BONUS_VISAGISM: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp",
  BONUS_VISAGISM_COMPLEMENTARY: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
  MENTOR_GISELE: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp",
  TESTIMONIALS_RESULTS: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp",
  TRANSFORMATION_REAL_1: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp",
  TRANSFORMATION_REAL_2: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp",
  TRANSFORMATION_REAL_3: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp",
  GUARANTEE_BADGE: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp",
  GUARANTEE_COMPLEMENTARY: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%A1s_8_cgrhuw.webp",
  FAQ_ILLUSTRATION: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515862/Sem_nome_1000_x_1000_px_1280_x_720_px_vmqk3j.webp",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');

  :root {
    --color-primary: #B89B7A;
    --color-secondary: #432818;
    --color-accent: #aa6b5d;
    --color-background: #FFFBF7;
    --color-white: #ffffff;
    --color-text-dark: #432818;
    --color-text-medium: #6B4F43;
    --color-text-light: #8B7355;
    --color-success: #22c55e;
    --color-green-light: #d1fae5;
    --color-green-dark: #16a34a;
    --color-orange-light: #fff7ed;
    --color-orange-dark: #f97316;
    --spacing-unit: 1rem;
    --border-radius-base: 12px;
    --border-radius-lg: 16px;
    --box-shadow-subtle: 0 4px 20px rgba(184, 155, 122, 0.1);
    --box-shadow-elevated: 0 8px 32px rgba(184, 155, 122, 0.15);
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--color-background);
    color: var(--color-text-dark);
    line-height: 1.6;
    margin: 0;
    scroll-behavior: smooth;
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  }

  .container-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 calc(var(--spacing-unit) * 1.5);
  }

  .section-gap {
    padding: calc(var(--spacing-unit) * 5) 0;
  }

  .card-clean {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    padding: calc(var(--spacing-unit) * 2.5);
    box-shadow: var(--box-shadow-subtle);
    border: 1px solid rgba(184, 155, 122, 0.1);
    transition: var(--transition-smooth);
  }

  .card-clean:hover {
    box-shadow: var(--box-shadow-elevated);
    transform: translateY(-2px);
  }

  .btn-primary-clean {
    background: linear-gradient(135deg, var(--color-success) 0%, var(--color-green-dark) 100%);
    color: var(--color-white);
    font-weight: 600;
    border-radius: var(--border-radius-base);
    padding: calc(var(--spacing-unit) * 1.25) calc(var(--spacing-unit) * 2.5);
    border: none;
    font-size: 1.125rem;
    transition: var(--transition-smooth);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    min-height: 56px;
  }

  .btn-primary-clean::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .btn-primary-clean:hover::before {
    left: 100%;
  }

  .btn-primary-clean:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(34, 197, 94, 0.4);
  }

  .btn-primary-clean:active {
    transform: translateY(-1px);
  }

  /* Typography melhorada */
  .text-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.025em;
  }

  .text-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.75rem);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .text-h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 600;
    line-height: 1.3;
  }

  .text-body-lg {
    font-size: 1.125rem;
    line-height: 1.7;
    font-weight: 400;
  }

  .text-body-base {
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 400;
  }

  .text-small {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  /* Utility classes melhoradas */
  .text-brand-primary { color: var(--color-primary); }
  .text-brand-secondary { color: var(--color-secondary); }
  .text-brand-accent { color: var(--color-accent); }
  .text-brand-dark { color: var(--color-text-dark); }
  .text-brand-medium { color: var(--color-text-medium); }
  .text-brand-light { color: var(--color-text-light); }
  .text-green-success { color: var(--color-success); }
  .bg-green-light { background-color: var(--color-green-light); }
  .border-green-subtle { border-color: var(--color-success); }
  .bg-orange-light { background-color: var(--color-orange-light); }
  .border-orange-strong { border-color: var(--color-orange-dark); }

  /* Animações melhoradas */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.8s ease-out forwards;
  }

  /* Pulse melhorado */
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
    }
    50% {
      box-shadow: 0 0 0 20px rgba(34, 197, 94, 0);
    }
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s infinite;
  }

  /* Grid system responsivo */
  .grid-responsive {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  /* Responsive melhorado */
  @media (max-width: 768px) {
    .container-main {
      padding: 0 var(--spacing-unit);
    }
    .section-gap {
      padding: calc(var(--spacing-unit) * 3) 0;
    }
    .card-clean {
      padding: calc(var(--spacing-unit) * 1.5);
    }
    .btn-primary-clean {
      width: 100%;
      justify-content: center;
      padding: calc(var(--spacing-unit) * 1.5);
      font-size: 1rem;
    }
  }

  /* Loading states */
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Focus states melhorados */
  .btn-primary-clean:focus-visible {
    outline: 2px solid var(--color-success);
    outline-offset: 2px;
  }

  /* Scroll suave */
  html {
    scroll-behavior: smooth;
  }
`;

// --- Componente de Estrelas para Avaliações (Mantido, com pequenas melhorias) ---
type RatingStarsProps = { rating: number; totalStars?: number; starSize?: number };
const RatingStars: React.FC<RatingStarsProps> = ({ rating, totalStars = 5, starSize = 16 }) => {
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          size={starSize}
          className={`${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} mr-0.5`}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Avaliação: {rating} de {totalStars} estrelas</span>
    </div>
  );
};

// --- Componente FAQ (Otimizado) ---
type FaqItemType = { question: string; answer: string };

const FaqSection: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems: FaqItemType[] = useMemo(() => [
    {
      question: "Quanto tempo leva para fazer o quiz?",
      answer: "O quiz leva apenas alguns minutos para ser completado. São perguntas simples e objetivas sobre suas preferências e estilo de vida."
    },
    {
      question: "Como recebo os materiais após a compra?",
      answer: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com as instruções de acesso a todos os materiais."
    },
    {
      question: "Os guias servem para qualquer tipo físico?",
      answer: "Sim! Os guias foram desenvolvidos considerando a diversidade de tipos físicos. O mais importante é o seu estilo predominante, e as orientações são adaptáveis para valorizar seu corpo único."
    },
    {
      question: "Preciso ter conhecimento prévio sobre moda?",
      answer: "Não! Os guias foram criados justamente para quem quer aprender do zero ou aprimorar seus conhecimentos sobre estilo pessoal. Tudo é explicado de forma clara e didática."
    },
    {
      question: "Posso acessar os materiais pelo celular?",
      answer: "Sim! Todos os materiais são digitais e podem ser acessados por qualquer dispositivo: computador, tablet ou smartphone."
    },
    {
      question: "E se eu não gostar do conteúdo?",
      answer: "Você tem 7 dias de garantia incondicional. Se não ficar satisfeita, basta solicitar o reembolso e devolveremos 100% do seu investimento."
    },
    {
      question: "Quanto tempo terei acesso aos materiais?",
      answer: "O acesso é vitalício! Você poderá consultar os guias sempre que precisar, sem prazo de expiração."
    },
    {
      question: "Os guias funcionam para qualquer idade?",
      answer: "Absolutamente! Os princípios de estilo pessoal são atemporais e adaptáveis para mulheres de todas as idades. O importante é expressar sua essência, independente da sua fase de vida."
    }
  ], []);

  const toggleItem = useCallback((index: number) => {
    setOpenItem(prevOpenItem => (prevOpenItem === index ? null : index));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <SectionTitle variant="secondary" subtitle="Respostas para suas dúvidas mais comuns">
        Perguntas Frequentes
      </SectionTitle>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-brand-primary"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              aria-expanded={openItem === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium text-brand-dark text-lg">{item.question}</span>
              <ChevronRight
                size={24}
                className={`text-brand-primary transition-transform duration-300 ${openItem === index ? 'transform rotate-90' : ''}`}
              />
            </button>
            {openItem === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-6 py-4 text-brand-medium bg-gray-50 border-t border-gray-100 text-base"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Componente de Título Padronizado (Refatorado) ---
type SectionTitleProps = {
  children: React.ReactNode;
  subtitle?: string;
  variant?: 'primary' | 'secondary' | 'simple';
  className?: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ children, subtitle, variant = 'simple', className = '' }) => (
  <div className={`text-center mb-16 animate-fade-in-up ${className}`}>
    {variant === 'primary' && (
      <div className="flex justify-center mb-4">
        <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"></div>
      </div>
    )}

    <h2 className={`font-bold leading-tight mb-4 text-brand-dark ${
      variant === 'primary'
        ? 'text-h1'
        : variant === 'secondary'
        ? 'text-h2'
        : 'text-h2'
    }`}>
      {children}
    </h2>

    {subtitle && (
      <p className="text-body-lg text-brand-medium max-w-3xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

// --- Componente Principal: QuizOfferPage ---
const QuizOfferPage: React.FC = () => {
  const styleRef = React.useRef<HTMLStyleElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer para animações
  const observerRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!styleRef.current) {
      const styleElement = document.createElement('style');
      styleElement.textContent = globalStyles;
      document.head.appendChild(styleElement);
      styleRef.current = styleElement;
    }

    // Preload crítico melhorado
    const criticalImages = [
      IMAGE_ASSETS.HERO_COMPLEMENTARY,
      IMAGE_ASSETS.SOLUTION_QUIZ,
      IMAGE_ASSETS.GUIDES_BENEFITS
    ];
    
    preloadCriticalImages(criticalImages, { quality: 95, priority: true });

    // Performance marking
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('offer-page-mounted');
    }

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  const handleCtaClick = useCallback((buttonId: string, action: string = 'Comprar Agora') => {
    trackButtonClick(buttonId, action, 'quiz_offer_page');
    
    // Analytics melhorado
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase_intent', {
        event_category: 'conversion',
        event_label: buttonId,
        value: 67
      });
    }
    
    window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
  }, []);

  return (
    <div className="min-h-screen bg-color-background antialiased">
      {/* Header melhorado */}
      <header className="py-4 px-6 sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-main flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-success">Oferta Ativa</span>
          </div>
          <div className="text-sm text-brand-medium">
            ⭐ 4.9/5 - Mais de 1.200 avaliações
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section Melhorado */}
        <section className="section-gap pt-8" ref={observerRef}>
          <div className="container-main">
            <div className="card-clean text-center animate-fade-in-up">
              {/* Social proof badge melhorado */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-light to-green-100 px-6 py-3 rounded-full border-2 border-green-subtle/30 mb-8 animate-pulse-glow">
                <Award size={20} className="text-green-success" />
                <span className="text-sm font-semibold text-green-success">✨ Método aprovado por 3.000+ mulheres</span>
                <RatingStars rating={5} starSize={14} />
              </div>

              <h1 className="text-h1 text-brand-dark mb-6">
                Descubra Seu <span className="text-brand-primary bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">Estilo Predominante</span>
                <br />em Apenas 5 Minutos
              </h1>
              
              <p className="text-body-lg text-brand-medium mb-8 max-w-2xl mx-auto">
                Transforme seu guarda-roupa em uma ferramenta de <strong>autoestima e confiança</strong>. 
                Nunca mais compre peças que não combinam com você!
              </p>

              {/* Benefícios em destaque */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                {[
                  { icon: CheckCircle, text: "Guia 100% Personalizado" },
                  { icon: Clock, text: "Resultados em 5 Minutos" },
                  { icon: Shield, text: "7 Dias de Garantia" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center justify-center gap-2 bg-white/50 rounded-lg p-3">
                    <benefit.icon size={18} className="text-green-success" />
                    <span className="text-sm font-medium text-brand-dark">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8 max-w-lg mx-auto">
                <FixedIntroImage
                  src={IMAGE_ASSETS.HERO_COMPLEMENTARY}
                  alt="Transformação de guarda-roupa - antes e depois"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>

              <button
                onClick={() => handleCtaClick('hero_cta', 'Descobrir Meu Estilo')}
                className="btn-primary-clean mb-6 animate-pulse-glow"
                aria-label="Descobrir Meu Estilo Agora"
              >
                <ArrowRight size={24} />
                🎯 Descobrir Meu Estilo Agora
              </button>

              {/* Trust indicators melhorados */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-brand-light">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-green-success" />
                  <span>Pagamento 100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-green-success" />
                  <span>Garantia Incondicional</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-green-success" />
                  <span>+3.000 Clientes Satisfeitas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="section-gap">
          <div className="container-main">
            <div className="max-w-2xl mx-auto">
              <CountdownTimer />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-gap">
          <div className="container-main">
            <FaqSection />
          </div>
        </section>

        {/* Floating CTA for mobile */}
        <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
          <button
            onClick={() => handleCtaClick('floating_cta', 'Comprar Mobile')}
            className="btn-primary-clean w-full shadow-2xl"
          >
            <ShoppingCart size={20} />
            R$ 67,00 - Comprar Agora
          </button>
        </div>
      </main>

      {/* Footer melhorado */}
      <footer className="bg-brand-secondary text-white py-12">
        <div className="container-main">
          <div className="text-center mb-8">
            <FixedIntroImage
              src={IMAGE_ASSETS.HERO_LOGO}
              alt="Logo Gisele Galvão"
              width={150}
              height={60}
              className="h-auto object-contain mx-auto mb-4 opacity-90"
            />
            <div className="flex justify-center items-center gap-4 mb-4">
              <RatingStars rating={5} />
              <span className="text-sm opacity-80">4.9/5 baseado em 1.200+ avaliações</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <h4 className="font-semibold mb-2">🏆 Garantia</h4>
              <p className="text-sm opacity-80">7 dias de garantia incondicional</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">⚡ Entrega</h4>
              <p className="text-sm opacity-80">Acesso imediato por email</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">💳 Pagamento</h4>
              <p className="text-sm opacity-80">100% seguro via Hotmart</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-sm mb-4 opacity-70">
              © {new Date().getFullYear()} Gisele Galvão. Todos os direitos reservados.
            </p>
            <div className="flex justify-center gap-6 text-sm opacity-70">
              <a href="/politica-de-privacidade" className="hover:underline transition-colors">
                Política de Privacidade
              </a>
              <span>|</span>
              <a href="/termos-de-uso" className="hover:underline transition-colors">
                Termos de Uso
              </a>
              <span>|</span>
              <a href="/contato" className="hover:underline transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuizOfferPage;
