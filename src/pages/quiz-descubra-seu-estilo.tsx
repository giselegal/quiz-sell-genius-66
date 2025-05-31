"use client";
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { preloadCriticalImages } from '@/utils/images/preloading';
import FixedIntroImage from '@/components/ui/FixedIntroImage';
import {
  ChevronRight, Check, Clock, Star, ShoppingBag, Heart, Users, Award,
  Shield, ArrowRight, TrendingUp, BadgeCheck, Lock, Gift, ShoppingCart,
  CheckCircle, ArrowDown, Hourglass, Play, Zap, Target, BookOpen,
  Calendar, Phone, MessageCircle, Camera
} from 'lucide-react';
import { trackButtonClick, trackSaleConversion } from '@/utils/analytics';

// CSS Melhorado com identidade visual consistente
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap');

  :root {
    --primary: #B89B7A;
    --secondary: #432818;
    --accent: #aa6b5d;
    --background: #FFFBF7;
    --white: #ffffff;
    --text-dark: #432818;
    --text-medium: #6B4F43;
    --text-light: #8B7355;
    --success: #22c55e;
    --success-dark: #16a34a;
    --orange-light: #fff7ed;
    --orange-dark:rgb(207, 134, 82);
    --green-light: #d1fae5;
    --border-radius: 12px;
    --border-radius-lg: 16px;
    --box-shadow: 0 4px 20px rgba(184, 155, 122, 0.1);
    --transition: all 0.3s ease;
  }
  
  * { box-sizing: border-box; }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--background);
    color: var(--text-dark);
    line-height: 1.6;
  }
  
  .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
  
  .container-main { 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 0 1rem; 
  }
  
  .section-gap { 
    margin-bottom: 4rem; 
  }
  
  .card-clean { 
    background: var(--white); 
    border-radius: var(--border-radius-lg); 
    padding: 2rem; 
    box-shadow: var(--box-shadow);
    border: 1px solid rgba(184, 155, 122, 0.1);
  }
  
  .btn-primary-clean {
    background: linear-gradient(135deg, var(--success) 0%, var(--success-dark) 100%);
    color: white;
    font-weight: 700;
    border-radius: var(--border-radius);
    padding: 1rem 2rem;
    border: none;
    font-size: 1.125rem;
    transition: var(--transition);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    min-height: 56px;
    justify-content: center;
  }
  
  .btn-primary-clean:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
    background: linear-gradient(135deg, var(--success-dark) 0%, #15803d 100%);
  }
  
  .text-hierarchy-1 { 
    font-size: 3rem; 
    font-weight: 700; 
    line-height: 1.1; 
    margin-bottom: 1.5rem;
  }
  
  .text-hierarchy-2 { 
    font-size: 2rem; 
    font-weight: 600; 
    line-height: 1.2; 
    margin-bottom: 1rem;
  }
  
  .text-hierarchy-3 { 
    font-size: 1.5rem; 
    font-weight: 600; 
    line-height: 1.3; 
  }
  
  .text-body { 
    font-size: 1.125rem; 
    line-height: 1.6; 
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }
  
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
  
  .pulse {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  
  @media (max-width: 768px) {
    .container-main { padding: 0 1rem; }
    .section-gap { margin-bottom: 3rem; }
    .card-clean { padding: 1.5rem; }
    .text-hierarchy-1 { font-size: 2rem; }
    .text-hierarchy-2 { font-size: 1.5rem; }
    .btn-primary-clean { 
      width: 100%; 
      padding: 1.25rem; 
      font-size: 1rem;
    }
  }
`;

// Constantes para URLs das imagens otimizadas
const HERO_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp";
const HERO_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp";
const PROBLEM_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp";
const SOLUTION_QUIZ_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp";
const GUIDES_BENEFITS_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp";
const BONUS_1_KEY_PIECES_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp";
const BONUS_2_VISAGISM_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp";
const GUARANTEE_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp";

// Componente de estrelas para avaliações
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={`${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} mr-0.5`}
                />
            ))}
        </div>
    );
};

// Componente de contagem regressiva melhorado
const CountdownTimer: React.FC = () => {
    const [time, setTime] = useState({
        hours: 1,
        minutes: 59,
        seconds: 59
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime.seconds > 0) {
                    return { ...prevTime, seconds: prevTime.seconds - 1 };
                } else if (prevTime.minutes > 0) {
                    return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
                } else if (prevTime.hours > 0) {
                    return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    return { hours: 1, minutes: 59, seconds: 59 }; // Reinicia
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center">
            <p className="text-[var(--text-dark)] font-semibold mb-2 flex items-center">
                <Clock size={18} className="mr-1 text-[var(--primary)]" />
                Esta oferta expira em:
            </p>
            <div className="flex items-center justify-center gap-1">
                <div className="bg-[var(--text-dark)] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">
                    {formatNumber(time.hours)}
                </div>
                <span className="text-[var(--primary)] font-bold text-xl">:</span>
                <div className="bg-[var(--text-dark)] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">
                    {formatNumber(time.minutes)}
                </div>
                <span className="text-[var(--primary)] font-bold text-xl">:</span>
                <div className="bg-[var(--text-dark)] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">
                    {formatNumber(time.seconds)}
                </div>
            </div>
        </div>
    );
};

// Componente FAQ
const FaqSectionNew: React.FC = () => {
    const [openItem, setOpenItem] = useState<number | null>(null);

    const faqItems = [
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
    ];

    const toggleItem = (index: number) => {
        setOpenItem(openItem === index ? null : index);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[var(--primary)]"
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-[var(--text-dark)] text-lg">{item.question}</span>
                            <ChevronRight
                                size={24}
                                className={`text-[var(--primary)] transition-transform duration-300 ${openItem === index ? 'transform rotate-90' : ''}`}
                            />
                        </button>

                        {openItem === index && (
                            <div className="px-6 py-4 text-gray-700 bg-gray-50 border-t border-gray-100 text-base">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Componente de título padronizado
const SectionTitle: React.FC<{
  children: React.ReactNode;
  subtitle?: string;
  size?: 'lg' | 'xl';
  className?: string;
  variant?: 'primary' | 'secondary' | 'simple';
}> = ({ children, subtitle, size = 'xl', className = '', variant = 'simple' }) => (
  <div className={`text-center mb-16 animate-fade-in-up ${className}`}>
    {/* Decoração superior - APENAS para títulos principais */}
    {variant === 'primary' && (
      <div className="flex justify-center mb-4">
        <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full"></div>
      </div>
    )}
    
    {/* Título principal - estilos diferenciados */}
    <h2 className={`font-bold font-playfair leading-tight mb-6 ${
      variant === 'primary' 
        ? 'text-4xl md:text-5xl lg:text-6xl text-[var(--text-dark)]'
        : variant === 'secondary'
        ? 'text-3xl md:text-4xl lg:text-5xl text-[var(--text-dark)]'
        : 'text-3xl md:text-4xl font-bold text-[var(--text-dark)]'
    }`}>
      {children}
    </h2>
    
    {/* Subtítulo opcional */}
    {subtitle && (
      <p className="text-xl text-[var(--text-medium)] font-inter max-w-3xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

const QuizOfferPage: React.FC = () => {
    useEffect(() => {
        // Inject custom styles
        const styleElement = document.createElement('style');
        styleElement.textContent = customStyles;
        document.head.appendChild(styleElement);
        
        preloadCriticalImages(
            [
                HERO_IMAGE_URL,
                HERO_COMPLEMENTARY_IMAGE_URL,
                PROBLEM_IMAGE_URL,
                SOLUTION_QUIZ_IMAGE_URL,
                GUIDES_BENEFITS_IMAGE_URL,
                BONUS_1_KEY_PIECES_IMAGE_URL,
                BONUS_2_VISAGISM_IMAGE_URL,
                GUARANTEE_IMAGE_URL
            ],
            { quality: 95 }
        );

        if (typeof window !== 'undefined' && 'performance' in window) {
            window.performance.mark('offer-page-mounted');
        }
        
        return () => {
            // Cleanup
            document.head.removeChild(styleElement);
        };
    }, []);

    const handleCtaClick = (buttonId: string, action: string = 'Comprar Agora') => {
        trackButtonClick(
            buttonId,
            action,
            'quiz_offer_page'
        );
        
        // Track sale conversion
        trackSaleConversion('quiz_offer_click', {
            button_id: buttonId,
            action: action,
            source: 'quiz_offer_page',
            timestamp: new Date().toISOString()
        });
    };

    const openCheckout = () => {
        window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
    };

    return (
        <div className="min-h-screen bg-[var(--background)]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Header limpo */}
            <header className="py-4 px-6 sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
                <div className="container-main flex justify-center">
                    <FixedIntroImage
                        src={HERO_IMAGE_URL}
                        alt="Logo Gisele Galvão"
                        width={180}
                        height={80}
                        className="h-auto object-contain"
                    />
                </div>
            </header>

            <main>
                {/* 1. Hero Section - LIMPO E FOCADO */}
                <section className="section-gap pt-8">
                    <div className="container-main">
                        <div className="card-clean text-center">
                            {/* Badge credibilidade */}
                            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 mb-6">
                                <Award size={18} className="text-green-600" />
                                <span className="text-sm font-semibold text-green-700">3000+ mulheres transformadas</span>
                            </div>

                            {/* Headline simplificada */}
                            <h1 className="text-hierarchy-1 text-[var(--text-dark)] mb-6 font-playfair">
                                Descubra Seu <span className="text-[var(--primary)]">Estilo Predominante</span>
                                <br />em 5 Minutos
                            </h1>
                            
                            {/* Subheadline focada */}
                            <p className="text-body text-[var(--text-medium)] mb-8 max-w-2xl mx-auto">
                                Tenha finalmente um guarda-roupa que <strong>funciona 100%</strong>, onde tudo combina e reflete sua personalidade
                            </p>

                            {/* Hero image otimizada */}
                            <div className="mb-8 max-w-lg mx-auto">
                                <FixedIntroImage
                                    src={HERO_COMPLEMENTARY_IMAGE_URL}
                                    alt="Transformação de guarda-roupa"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto rounded-xl shadow-lg"
                                />
                            </div>

                            {/* CTA principal único */}
                            <button
                                onClick={() => {
                                    handleCtaClick('hero_cta', 'Descobrir Meu Estilo');
                                    openCheckout();
                                }}
                                className="btn-primary-clean mb-6"
                            >
                                <ArrowRight size={20} />
                                Descobrir Meu Estilo Agora
                            </button>
                            
                            {/* Trust elements simples */}
                            <div className="flex items-center justify-center gap-6 text-sm text-[var(--text-light)]">
                                <div className="flex items-center gap-1">
                                    <Lock size={16} className="text-green-600" />
                                    <span>100% Seguro</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Shield size={16} className="text-green-600" />
                                    <span>7 Dias Garantia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Problema - SIMPLIFICADO */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-6 font-playfair">
                                        Você se identifica com isso?
                                    </h2>
                                    <div className="space-y-4 text-body text-[var(--text-medium)]">
                                        <p>
                                            <strong>Guarda-roupa cheio</strong> mas nunca tem o que vestir?
                                        </p>
                                        <p>
                                            <strong>Compra peças</strong> que nunca combinam com nada?
                                        </p>
                                        <p>
                                            <strong>Sente que "nada fica bom"</strong> em você?
                                        </p>
                                    </div>
                                    <div className="bg-[var(--orange-light)] p-4 rounded-lg border-l-4 border-[var(--orange-dark)] mt-6">
                                        <p className="text-[var(--text-dark)] font-semibold">
                                            Isso acontece porque você ainda não descobriu seu <strong>estilo predominante</strong>.
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <FixedIntroImage
                                        src={PROBLEM_IMAGE_URL}
                                        alt="Frustração com guarda-roupa"
                                        width={500}
                                        height={350}
                                        className="w-full h-auto rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Solução - DIRETO AO PONTO */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean text-center">
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-6 font-playfair">
                                A Solução: Quiz de Estilo
                            </h2>
                            
                            <div className="max-w-md mx-auto mb-8">
                                <FixedIntroImage
                                    src={SOLUTION_QUIZ_IMAGE_URL}
                                    alt="Quiz de Estilo"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>

                            <p className="text-body text-[var(--text-medium)] mb-8 max-w-2xl mx-auto">
                                Método preciso para identificar seu estilo entre os <strong>7 estilos universais</strong> + guia personalizado completo.
                            </p>

                            <button
                                onClick={() => {
                                    handleCtaClick('solution_cta', 'Fazer Quiz');
                                    openCheckout();
                                }}
                                className="btn-primary-clean mb-6"
                            >
                                <ShoppingBag size={20} />
                                Fazer o Quiz Agora
                            </button>

                            <CountdownTimer />
                        </div>
                    </div>
                </section>

                {/* 4. Valor - PREÇO DESTACADO */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <div className="text-center mb-8">
                                <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-4 font-playfair">
                                    Transformação Completa
                                </h2>
                                <p className="text-body text-[var(--text-medium)]">
                                    Tudo que você precisa para descobrir e aplicar seu estilo
                                </p>
                            </div>

                            {/* Preview produtos */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="text-center">
                                    <div className="aspect-[4/5] bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
                                        <FixedIntroImage
                                            src={GUIDES_BENEFITS_IMAGE_URL}
                                            alt="Guia Personalizado"
                                            width={250}
                                            height={312}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="text-hierarchy-3 text-[var(--text-dark)] mb-2">Guia Personalizado</h3>
                                    <p className="text-sm text-[var(--text-medium)]">Para seu estilo específico</p>
                                </div>
                                <div className="text-center">
                                    <div className="aspect-[4/5] bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
                                        <FixedIntroImage
                                            src={BONUS_1_KEY_PIECES_IMAGE_URL}
                                            alt="Bônus Peças-Chave"
                                            width={250}
                                            height={312}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="text-hierarchy-3 text-[var(--text-dark)] mb-2">Bônus: Peças-Chave</h3>
                                    <p className="text-sm text-[var(--text-medium)]">Guarda-roupa funcional</p>
                                </div>
                                <div className="text-center">
                                    <div className="aspect-[4/5] bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100">
                                        <FixedIntroImage
                                            src={BONUS_2_VISAGISM_IMAGE_URL}
                                            alt="Bônus Visagismo"
                                            width={250}
                                            height={312}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="text-hierarchy-3 text-[var(--text-dark)] mb-2">Bônus: Visagismo</h3>
                                    <p className="text-sm text-[var(--text-medium)]">Valorize seus traços</p>
                                </div>
                            </div>

                            {/* Preço FOCADO */}
                            <div className="bg-gradient-to-r from-[var(--success)] to-[var(--success-dark)] rounded-xl p-8 text-white text-center mb-8">
                                <p className="text-sm opacity-90 mb-2">Oferta por tempo limitado</p>
                                <div className="mb-4">
                                    <span className="text-sm">5x de</span>
                                    <span className="text-4xl font-bold mx-2">R$ 8,83</span>
                                </div>
                                <p className="text-lg">ou à vista <strong>R$ 39,90</strong></p>
                                <p className="text-sm mt-2 opacity-75">77% OFF - Economia de R$ 135,10</p>
                            </div>

                            {/* CTA Final */}
                            <div className="text-center">
                                <button
                                    onClick={() => {
                                        handleCtaClick('final_cta', 'Garantir Transformação');
                                        openCheckout();
                                    }}
                                    className="btn-primary-clean"
                                >
                                    <ShoppingCart size={20} />
                                    Garantir Minha Transformação
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Garantia - SIMPLES */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean text-center">
                            <FixedIntroImage
                                src={GUARANTEE_IMAGE_URL}
                                alt="Garantia 7 dias"
                                width={200}
                                height={200}
                                className="mx-auto mb-6"
                            />
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-4 font-playfair">
                                7 Dias de Garantia
                            </h2>
                            <p className="text-body text-[var(--text-medium)] max-w-2xl mx-auto">
                                Se não ficar satisfeita, devolvemos <strong>100% do seu dinheiro</strong>. Sem perguntas.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 6. FAQ - COMPACTO */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] text-center mb-8 font-playfair">
                                Perguntas Frequentes
                            </h2>
                            <FaqSectionNew />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default QuizOfferPage;