import React, { useEffect, useState } from 'react';
import { preloadCriticalImages } from '@/utils/images/preloading';
import FixedIntroImage from '@/components/ui/FixedIntroImage';
import { ChevronRight, Check, Clock, Star, ShoppingBag, Heart, Users, Award, Shield, ArrowRight, TrendingUp, BadgeCheck, Lock, Gift } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

// CSS personalizado para fontes e estilos do template
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
  
  :root {
    --color-primary: #B89B7A;
    --color-primary-dark: #A1835D;
    --color-secondary: #432818;
    --color-secondary-light: #6B4F43;
    --color-accent: #aa6b5d;
    --color-background: #FFFBF7;
    --color-background-soft: #FDF6F0;
    --color-background-light: #FFFAF7;
    --color-white: #ffffff;
    --color-text-dark: #432818;
    --color-text-medium: #6B4F43;
    --color-text-light: #8B7355;
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-heading: 'Playfair Display', Georgia, serif;
    --shadow-soft: 0 4px 16px rgba(184, 155, 122, 0.15);
    --shadow-medium: 0 8px 24px rgba(184, 155, 122, 0.2);
    --shadow-strong: 0 16px 32px rgba(184, 155, 122, 0.25);
    --border-radius: 12px;
    --border-radius-lg: 20px;
    --border-radius-xl: 24px;
  }
  
  .font-inter { font-family: var(--font-primary); }
  .font-playfair { font-family: var(--font-heading); }
  
  .btn-primary {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
    color: white;
    font-weight: 700;
    border-radius: 50px;
    padding: 16px 32px;
    box-shadow: var(--shadow-medium);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    position: relative;
    overflow: hidden;
    font-family: var(--font-primary);
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-strong);
    background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-accent) 100%);
  }
  
  .btn-primary:active {
    transform: translateY(0);
  }
  
  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  .btn-primary:hover::before {
    left: 100%;
  }
  
  .card-modern {
    background: var(--color-white);
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-soft);
    border: 1px solid rgba(184, 155, 122, 0.1);
    transition: all 0.3s ease;
  }
  
  .card-modern:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-medium);
  }
  
  .text-brand-primary { color: var(--color-primary); }
  .text-brand-secondary { color: var(--color-secondary); }
  .text-brand-accent { color: var(--color-accent); }
  .text-brand-dark { color: var(--color-text-dark); }
  .text-brand-medium { color: var(--color-text-medium); }
  .text-brand-light { color: var(--color-text-light); }
  
  .bg-brand-background { background-color: var(--color-background); }
  .bg-brand-soft { background-color: var(--color-background-soft); }
  .bg-brand-light { background-color: var(--color-background-light); }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out;
  }
  
  .animate-pulse-gentle {
    animation: pulseGentle 2s infinite;
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulseGentle {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .section-spacing { padding: 5rem 0; }
  .section-spacing-sm { padding: 3rem 0; }
  
  @media (max-width: 768px) {
    .section-spacing { padding: 2rem 0; }
    .section-spacing-sm { padding: 1.5rem 0; }
    .btn-primary { 
      padding: 16px 24px; 
      font-size: 18px; 
      width: 100%;
      margin: 0 auto 1rem auto;
    }
    .card-modern { 
      padding: 1.5rem; 
      margin: 0 1rem;
    }
    h1 { font-size: 2.5rem !important; line-height: 1.2; }
    h2 { font-size: 2rem !important; }
    .text-xl { font-size: 1.125rem; }
  }
`;

// Constantes para otimização de imagens - URLs atualizadas
const HERO_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp";
const HERO_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp";
const PROBLEM_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp";
const SOLUTION_QUIZ_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp";
const GUIDES_BENEFITS_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp";
const GUIDES_BENEFITS_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp";
const BONUS_1_KEY_PIECES_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp";
const BONUS_1_KEY_PIECES_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515075/Espanhol_Portugu%C3%AAs_1_uru4r3.webp";
const BONUS_2_VISAGISM_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp";
const BONUS_2_VISAGISM_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp";
const MENTOR_GISELE_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp";
const TESTIMONIALS_RESULTS_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp";
// Imagens de transformação reais da ResultPage
const TRANSFORMATION_REAL_IMAGE_1_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp";
const TRANSFORMATION_REAL_IMAGE_2_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp";
const TRANSFORMATION_REAL_IMAGE_3_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp";
const GUARANTEE_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp";
const GUARANTEE_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp";
const FAQ_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515862/Sem_nome_1000_x_1000_px_1280_x_720_px_vmqk3j.webp";

// Componente de estrelas para avaliações (mantido)
const RatingStars = ({ rating }) => {
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

// Componente de contagem regressiva melhorado (mantido)
const CountdownTimer = () => {
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

    const formatNumber = (num) => num.toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center">
            <p className="text-[#432818] font-semibold mb-2 flex items-center">
                <Clock size={18} className="mr-1 text-[#B89B7A]" />
                Esta oferta expira em:
            </p>
            <div className="flex items-center justify-center gap-1">
                <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">
                    {formatNumber(time.hours)}
                </div>
                <span className="text-[#B89B7A] font-bold text-xl">:</span>
                <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">
                    {formatNumber(time.minutes)}
                </div>
                <span className="text-[#B89B7A] font-bold text-xl">:</span>
                <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">
                    {formatNumber(time.seconds)}
                </div>
            </div>
        </div>
    );
};

// Componente FAQ (mantido)
const FaqSectionNew = () => {
    const [openItem, setOpenItem] = useState(null);

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

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-[#432818] mb-8 text-center font-playfair">
                Perguntas Frequentes
            </h3>

            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#B89B7A]"
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-[#432818] text-lg">{item.question}</span>
                            <ChevronRight
                                size={24}
                                className={`text-[#B89B7A] transition-transform duration-300 ${openItem === index ? 'transform rotate-90' : ''}`}
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
                MENTOR_GISELE_IMAGE_URL,
                TESTIMONIALS_RESULTS_IMAGE_URL,
                GUARANTEE_IMAGE_URL,
                FAQ_IMAGE_URL
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
    };

    return (
        <div className="min-h-screen bg-brand-background font-inter text-brand-dark">
            {/* Decorative background elements */}
            <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-full blur-3xl opacity-60"></div>
            <div className="fixed bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[var(--color-accent)]/10 to-transparent rounded-full blur-3xl opacity-60"></div>

            {/* Header - Simplificado */}
            <header className="py-4 px-6 sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-[var(--color-primary)]/10">
                <div className="container mx-auto max-w-6xl flex justify-center">
                    <FixedIntroImage
                        src={HERO_IMAGE_URL}
                        alt="Logo Gisele Galvão"
                        width={200}
                        height={100}
                        className="h-auto object-contain"
                    />
                </div>
            </header>

            <main className="relative z-10">
                {/* 1. Headline e Subheadline - OTIMIZADO */}
                <section className="section-spacing">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="card-modern p-6 md:p-8 lg:p-12 text-center animate-fade-in-up">
                            {/* Badge de credibilidade */}
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 px-4 py-2 rounded-full border border-[var(--color-primary)]/20 mb-6">
                                <Award size={20} className="text-[var(--color-primary)]" />
                                <span className="text-sm font-semibold text-brand-dark">Método validado por 3000+ mulheres</span>
                            </div>

                            {/* Headline otimizada */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-brand-dark mb-6 font-playfair leading-tight">
                                Descubra Seu <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">Estilo Predominante</span> em 5 Minutos
                            </h1>
                            
                            {/* Sub-headline focada no benefício */}
                            <p className="text-xl md:text-2xl lg:text-3xl text-brand-medium max-w-4xl mx-auto mb-8 leading-relaxed font-inter font-medium">
                                E tenha finalmente um guarda-roupa que <strong>funciona 100%</strong>, onde tudo combina e reflete sua verdadeira personalidade
                            </p>

                            {/* Hero image MAIOR e com destaque */}
                            <div className="mb-10 max-w-2xl mx-auto relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 rounded-2xl blur-3xl scale-110"></div>
                                <FixedIntroImage
                                    src={HERO_COMPLEMENTARY_IMAGE_URL}
                                    alt="Transformação de guarda-roupa"
                                    width={800}
                                    height={500}
                                    className="w-full h-auto object-cover rounded-2xl shadow-2xl relative z-10 transform hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>

                            {/* CTA principal DESTACADO */}
                            <div className="bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 rounded-2xl p-8 mb-8 border border-[var(--color-primary)]/20">
                                <button
                                    onClick={() => {
                                        handleCtaClick('headline_cta', 'Descobrir Meu Estilo Agora - GRÁTIS');
                                        window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
                                    }}
                                    className="btn-primary text-xl md:text-2xl lg:text-3xl px-8 md:px-12 py-4 md:py-6 animate-pulse-gentle mb-4 w-full sm:w-auto transform hover:scale-105 transition-all duration-300"
                                >
                                    <ArrowRight size={24} className="mr-3" />
                                    Descobrir Meu Estilo Agora
                                </button>
                                
                                {/* Proof elements */}
                                <div className="flex items-center justify-center gap-6 text-sm text-brand-medium">
                                    <div className="flex items-center gap-1">
                                        <Lock size={16} className="text-brand-primary" />
                                        <span>100% Seguro</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Shield size={16} className="text-brand-primary" />
                                        <span>7 Dias de Garantia</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users size={16} className="text-brand-primary" />
                                        <span>3000+ Aprovações</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Introdução ao Problema/Dor */}
                <section className="section-spacing bg-brand-soft">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="card-modern p-6 md:p-8 lg:p-12">
                            <div className="text-center mb-12">
                                <FixedIntroImage
                                    src={PROBLEM_IMAGE_URL}
                                    alt="Mulher frustrada com guarda-roupa"
                                    width={600}
                                    height={400}
                                    className="rounded-xl shadow-lg mx-auto mb-8 transform hover:scale-105 transition-transform duration-300"
                                />
                                <h2 className="text-4xl md:text-5xl font-bold text-brand-dark font-playfair">
                                    Você se identifica com isso?
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg md:text-xl text-brand-medium leading-relaxed font-inter">
                                <p>
                                    Você já se sentiu <strong>frustrada ao abrir seu guarda-roupa cheio de roupas</strong> e mesmo assim não ter o que vestir? Ou já comprou peças que pareciam perfeitas na loja, mas que nunca combinaram com nada?
                                </p>
                                <p>
                                    A verdade é que ter um armário lotado não significa ter um guarda-roupa funcional. Pelo contrário, isso aumenta a ansiedade e o sentimento de que <strong>"nada fica bom em mim"</strong>.
                                </p>
                                <div className="bg-gradient-to-r from-[var(--color-background-light)] to-[var(--color-background-soft)] p-6 rounded-xl border-l-4 border-[var(--color-primary)]">
                                    <p className="font-semibold text-brand-dark">
                                        Isso acontece porque você ainda não descobriu seu <strong>estilo predominante</strong> - aquele alinhado com sua personalidade e essência.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Apresentação da Solução: Quiz de Estilo */}
                <section className="section-spacing">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="card-modern p-6 md:p-8 lg:p-12 text-center">
                            <div className="mb-12 max-w-xl mx-auto relative transform hover:scale-[1.02] transition-transform duration-500">
                                <FixedIntroImage
                                    src={SOLUTION_QUIZ_IMAGE_URL}
                                    alt="Quiz de Estilo Gisele Galvão"
                                    width={600}
                                    height={450}
                                    className="w-full h-auto rounded-xl shadow-lg object-contain"
                                />
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold transform rotate-6">
                                    <Gift size={20} className="inline mr-1" /> Exclusivo!
                                </div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-8 font-playfair">
                                A Solução Para Sua Transformação
                            </h2>
                            <div className="space-y-6 text-lg md:text-xl text-brand-medium leading-relaxed mb-10 font-inter">
                                <p>
                                    E se eu te dissesse que em apenas alguns minutos você pode descobrir seu estilo predominante e transformar sua relação com a moda?
                                </p>
                                <div className="bg-gradient-to-r from-[var(--color-background-light)] to-[var(--color-background-soft)] p-6 rounded-xl border-l-4 border-[var(--color-primary)]">
                                    <p className="text-xl text-brand-dark font-bold">
                                        Apresento o <strong>Quiz de Estilo Gisele Galvão</strong> - método preciso para identificar seu estilo entre os 7 estilos universais.
                                    </p>
                                </div>
                                <p>
                                    Este não é apenas mais um teste genérico. É uma ferramenta desenvolvida com anos de experiência em consultoria de imagem.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    handleCtaClick('solution_cta', 'Fazer o Quiz e Descobrir Meu Estilo');
                                    window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
                                }}
                                className="btn-primary text-base md:text-lg lg:text-xl px-6 md:px-8 py-3 md:py-4 animate-pulse-gentle mb-6 w-full sm:w-auto"
                            >
                                <ShoppingBag size={20} className="mr-2" />
                                Fazer o Quiz e Descobrir Meu Estilo
                            </button>
                            <div className="mt-6 flex justify-center">
                                <CountdownTimer />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Benefícios dos Guias de Estilo e Imagem */}
                <section className="section-spacing bg-brand-soft">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <div className="card-modern p-6 md:p-8 lg:p-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-12 text-center font-playfair">
                                Muito Mais Que um Quiz: Uma Jornada Completa
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                                <div className="order-2 md:order-1 space-y-6">
                                    <p className="text-lg md:text-xl text-brand-medium leading-relaxed font-inter">
                                        Descobrir seu estilo é apenas o começo. Para transformar sua imagem, você precisa de <strong>orientação prática e estratégica.</strong>
                                    </p>
                                    <div className="bg-gradient-to-r from-[var(--color-background-light)] to-[var(--color-background-soft)] p-6 rounded-xl border-l-4 border-[var(--color-accent)]">
                                        <p className="text-xl text-brand-dark font-bold">
                                            Por isso, você terá acesso ao <strong>Guia de Imagem e Estilo específico</strong> para seu resultado!
                                        </p>
                                    </div>
                                    <p className="text-lg font-semibold text-brand-medium font-inter">
                                        Cada guia foi desenvolvido para oferecer:
                                    </p>
                                    <ul className="space-y-4 text-base md:text-lg text-brand-medium">
                                        <li className="flex items-start">
                                            <BadgeCheck size={24} className="text-brand-primary mr-3 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-brand-dark">Autoconhecimento profundo:</span> Entenda como sua personalidade se reflete no seu estilo. 55% da comunicação é visual!
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <BadgeCheck size={24} className="text-brand-primary mr-3 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-brand-dark">Orientações práticas:</span> Cores, tecidos, estampas e modelagens que valorizam você.
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <BadgeCheck size={24} className="text-brand-primary mr-3 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-brand-dark">Estratégias de imagem:</span> Comunique visualmente quem você é.
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="order-1 md:order-2">
                                    <FixedIntroImage
                                        src={GUIDES_BENEFITS_IMAGE_URL}
                                        alt="Guia de Imagem e Estilo em tablet"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-lg mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mb-10">
                                <FixedIntroImage
                                    src={GUIDES_BENEFITS_COMPLEMENTARY_IMAGE_URL}
                                    alt="Mockup 3 revistas guia de estilo"
                                    width={700}
                                    height={450}
                                    className="rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
                                />
                            </div>
                            <p className="text-lg md:text-xl text-brand-medium text-center max-w-4xl mx-auto leading-relaxed font-inter">
                                Com o <strong>Guia de Imagem e Estilo</strong>, você terá ferramentas para construir uma imagem autêntica e criar um estilo atemporal.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5. Bônus Especiais */}
                <section className="section-spacing">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 font-playfair">
                                Bônus <span className="text-brand-primary">Especiais</span>
                            </h2>
                            <p className="text-xl text-brand-medium font-inter">
                                Receba materiais exclusivos para acelerar sua transformação
                            </p>
                        </div>
                        
                        {/* Bônus 1 */}
                        <div className="card-modern p-8 md:p-12 mb-12">
                            <div className="flex items-center justify-center mb-6">
                                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-6 py-2 rounded-full text-lg font-bold">
                                    BÔNUS #1
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 text-center font-playfair">
                                Guia das Peças-Chave do Guarda-Roupa
                            </h3>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <FixedIntroImage
                                        src={BONUS_1_KEY_PIECES_IMAGE_URL}
                                        alt="Guia Peças-Chave do Guarda-Roupa"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-lg mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-lg text-brand-medium leading-relaxed font-inter">
                                        Manual completo para construir um armário funcional e versátil alinhado com sua identidade.
                                    </p>
                                    <ul className="space-y-3 text-base text-brand-medium">
                                        <li className="flex items-start">
                                            <Check size={20} className="text-brand-primary mr-3 mt-1 flex-shrink-0" />
                                            Peças essenciais que toda mulher deveria ter
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={20} className="text-brand-primary mr-3 mt-1 flex-shrink-0" />
                                            Como adaptar ao seu estilo predominante
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={20} className="text-brand-primary mr-3 mt-1 flex-shrink-0" />
                                            Estratégias para maximizar combinações
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={20} className="text-brand-primary mr-3 mt-1 flex-shrink-0" />
                                            Como montar um guarda-roupa cápsula
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Bônus 2 */}
                        <div className="card-modern p-8 md:p-12">
                            <div className="flex items-center justify-center mb-6">
                                <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white px-6 py-2 rounded-full text-lg font-bold">
                                    BÔNUS #2
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 text-center font-playfair">
                                Guia de Visagismo Facial
                            </h3>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="order-2 md:order-1 space-y-4">
                                    <p className="text-lg text-brand-medium leading-relaxed font-inter">
                                        Ferramenta poderosa para valorizar seus traços naturais e potencializar sua beleza única.
                                    </p>
                                    <ul className="space-y-3 text-base text-brand-medium">
                                        <li className="flex items-start">
                                            <Check size={20} className="text-brand-accent mr-3 mt-1 flex-shrink-0" />
                                            Identificar o formato do seu rosto
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={20} className="text-brand-accent mr-3 mt-1 flex-shrink-0" />
                                            Cortes de cabelo que valorizam você
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={20} className="text-brand-accent mr-3 mt-1 flex-shrink-0" />
                                            Escolher acessórios ideais
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={20} className="text-brand-accent mr-3 mt-1 flex-shrink-0" />
                                            Técnicas de maquiagem personalizadas
                                        </li>
                                    </ul>
                                </div>
                                <div className="order-1 md:order-2">
                                    <FixedIntroImage
                                        src={BONUS_2_VISAGISM_IMAGE_URL}
                                        alt="Guia de Visagismo Facial"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-lg mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Apresentação da Mentora: Gisele Galvão */}
                <section className="section-spacing bg-brand-soft relative overflow-hidden">
                    {/* Elementos decorativos */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[var(--color-accent)]/5 to-transparent rounded-full translate-x-48 translate-y-48"></div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="max-w-6xl mx-auto">
                            {/* Header da seção */}
                            <div className="text-center mb-16 animate-fade-in-up">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-dark font-playfair leading-tight">
                                    Conheça Sua 
                                    <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent"> Mentora</span>
                                </h2>
                                <p className="text-xl text-brand-medium font-inter max-w-3xl mx-auto">
                                    A especialista que vai guiar sua transformação de imagem
                                </p>
                            </div>

                            {/* Card principal da mentora */}
                            <div className="card-modern p-8 md:p-12 lg:p-16">
                                <div className="grid lg:grid-cols-2 gap-12 items-center">
                                    {/* Foto da mentora */}
                                    <div className="order-2 lg:order-1">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full blur-2xl opacity-20 scale-110"></div>
                                            <FixedIntroImage
                                                src={MENTOR_GISELE_IMAGE_URL}
                                                alt="Gisele Galvão"
                                                width={400}
                                                height={400}
                                                className="rounded-full shadow-2xl mx-auto relative z-10 transform hover:scale-105 transition-all duration-500 border-4 border-white object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Informações da mentora */}
                                    <div className="order-1 lg:order-2 space-y-6">
                                        <div>
                                            <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 font-playfair">
                                                Gisele Galvão
                                            </h3>
                                            <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full mb-6"></div>
                                        </div>

                                        <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 p-6 rounded-xl border-l-4 border-[var(--color-primary)]">
                                            <p className="text-lg text-brand-dark font-semibold font-inter leading-relaxed">
                                                Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.
                                            </p>
                                        </div>

                                        <div className="space-y-4 text-brand-medium font-inter">
                                            <p className="text-lg leading-relaxed">
                                                Advogada de formação. Mãe da Victória, esposa do Fabrício. Apaixonada pela vida, pelos detalhes, viagens e tudo que me proporcione crescer como ser humano.
                                            </p>
                                            <p className="text-lg leading-relaxed">
                                                Colérica, virginiana, paciente, pacificadora e muito empata. Amo receber, atos de serviços e tempo de qualidade são minha linguagem de amor. Amo vinho, chás e café. Meus maiores valores são minha família, justiça, honestidade, ética e liberdade.
                                            </p>
                                        </div>

                                        <div className="bg-brand-cream p-6 rounded-xl border-l-4 border-[var(--color-accent)]">
                                            <p className="text-lg text-brand-dark leading-relaxed font-inter italic">
                                                "Há anos venho ajudando mulheres a descobrirem seu estilo autêntico e transformarem sua relação com a moda e a imagem pessoal. Minha missão é fazer com que você se vista de você mesma, comunicando sua essência através da sua imagem. Através da minha metodologia exclusiva, já transformei a vida de centenas de mulheres."
                                            </p>
                                        </div>

                                        {/* Credenciais atualizadas */}
                                        <div className="grid grid-cols-1 gap-4 pt-6">
                                            <div className="text-center p-4 bg-white rounded-lg shadow-md">
                                                <div className="text-3xl font-bold text-brand-primary font-playfair">3000+</div>
                                                <div className="text-sm text-brand-medium font-inter">Mulheres Transformadas com seus Estilos de Ser Revelados</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Depoimentos e Resultados - Seção atualizada */}
                <section className="section-spacing bg-white relative overflow-hidden">
                    {/* Elementos decorativos */}
                    <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-full -translate-x-36"></div>
                    <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-tl from-[var(--color-accent)]/10 to-transparent rounded-full translate-x-40 translate-y-40"></div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="max-w-7xl mx-auto">
                            {/* Header da seção - texto corrigido */}
                            <div className="text-center mb-16 animate-fade-in-up">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-dark font-playfair leading-tight">
                                    Resultados Reais de 
                                    <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent"> Mulheres Reais</span>
                                </h2>
                                <p className="text-xl text-brand-medium max-w-4xl mx-auto font-inter leading-relaxed">
                                    Veja o que dizem as mulheres que já descobriram seu estilo e transformaram sua imagem com os guias
                                </p>
                            </div>

                            {/* Imagem principal de depoimentos */}
                            <div className="mb-16 animate-fade-in-up">
                                <div className="card-modern p-8">
                                    <FixedIntroImage
                                        src={TESTIMONIALS_RESULTS_IMAGE_URL}
                                        alt="Depoimentos de clientes"
                                        width={1000}
                                        height={600}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-500 object-contain w-full h-auto"
                                    />
                                </div>
                            </div>

                            {/* Depoimentos reais da transformação */}
                            <div className="mb-16">
                                <div className="card-modern p-8 md:p-12 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 border-l-4 border-[var(--color-primary)]">
                                    <div className="text-center">
                                        <div className="text-6xl text-[var(--color-primary)] opacity-30 mb-4">"</div>
                                        <p className="text-xl md:text-2xl text-brand-dark leading-relaxed font-inter italic mb-6">
                                            Descobrir meu estilo predominante foi libertador! Agora sei exatamente o que me valoriza e como expressar minha personalidade através das roupas. Minha autoestima mudou completamente!
                                        </p>
                                        <div className="flex items-center justify-center">
                                            <div className="h-px w-12 bg-[var(--color-primary)] mr-4"></div>
                                            <p className="text-lg font-semibold text-brand-primary">Mariana R.</p>
                                            <div className="h-px w-12 bg-[var(--color-primary)] ml-4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Grid de transformações reais */}
                            <div className="mb-16">
                                <h3 className="text-3xl md:text-4xl font-bold text-brand-dark text-center mb-12 font-playfair">
                                    Transformações Incríveis
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="card-modern p-6 text-center group">
                                        <FixedIntroImage 
                                            src={TRANSFORMATION_REAL_IMAGE_1_URL} 
                                            alt="Transformação estilo clássico" 
                                            width={350} 
                                            height={350} 
                                            className="rounded-xl shadow-lg mx-auto mb-4 transform group-hover:scale-105 transition-transform duration-300 object-cover w-full h-auto" 
                                        />
                                        <p className="text-sm text-brand-medium font-inter">Estilo Clássico Revelado</p>
                                    </div>
                                    <div className="card-modern p-6 text-center group">
                                        <FixedIntroImage 
                                            src={TRANSFORMATION_REAL_IMAGE_2_URL} 
                                            alt="Transformação estilo romântico" 
                                            width={350} 
                                            height={350} 
                                            className="rounded-xl shadow-lg mx-auto mb-4 transform group-hover:scale-105 transition-transform duration-300 object-cover w-full h-auto" 
                                        />
                                        <p className="text-sm text-brand-medium font-inter">Estilo Romântico Descoberto</p>
                                    </div>
                                    <div className="card-modern p-6 text-center group">
                                        <FixedIntroImage 
                                            src={TRANSFORMATION_REAL_IMAGE_3_URL} 
                                            alt="Transformação estilo criativo" 
                                            width={350} 
                                            height={350} 
                                            className="rounded-xl shadow-lg mx-auto mb-4 transform group-hover:scale-105 transition-transform duration-300 object-cover w-full h-auto" 
                                        />
                                        <p className="text-sm text-brand-medium font-inter">Estilo Criativo Autêntico</p>
                                    </div>
                                </div>
                            </div>

                            {/* Texto de conclusão */}
                            <div className="text-center mb-12">
                                <p className="text-lg md:text-xl text-brand-medium mb-8 leading-relaxed font-inter max-w-4xl mx-auto">
                                    Estas são apenas algumas das milhares de mulheres que já transformaram sua relação com a moda e sua imagem pessoal através do Quiz de Estilo e dos Guias exclusivos.
                                </p>
                                
                                <div className="card-modern p-8 md:p-12 bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 mb-12">
                                    <p className="text-xl md:text-2xl text-brand-dark font-bold leading-relaxed font-inter">
                                        Você também pode ter essa transformação! Imagine como seria se vestir todos os dias com <span className="text-brand-primary">confiança</span>, sabendo que cada peça do seu guarda-roupa reflete quem você é e comunica sua essência. Imagine <span className="text-brand-accent">economizar tempo e dinheiro</span>, tendo um guarda-roupa funcional onde tudo combina entre si.
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleCtaClick('testimonials_cta', 'Sim, Quero Essa Transformação!')}
                                    className="btn-primary text-lg md:text-xl lg:text-2xl px-8 md:px-12 py-4 md:py-5 animate-pulse-gentle w-full sm:w-auto"
                                >
                                    Sim, Quero Essa Transformação!
                                    <Heart size={20} className="inline ml-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Garantia e Chamada para Ação */}
                <section className="section-spacing bg-brand-dark text-white relative overflow-hidden">
                    {/* Elementos decorativos */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[var(--color-accent)]/20 to-transparent rounded-full translate-x-40 translate-y-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-50 bg-repeat bg-[length:60px_60px]" 
                         style={{
                             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                         }}></div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="max-w-6xl mx-auto">
                            {/* Selo de garantia */}
                            <div className="text-center mb-12 animate-fade-in-up">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full blur-2xl opacity-30 scale-110"></div>
                                    <FixedIntroImage
                                        src={GUARANTEE_IMAGE_URL}
                                        alt="Selo de Garantia 7 Dias"
                                        width={320}
                                        height={320}
                                        className="mx-auto relative z-10 animate-pulse-gentle object-contain"
                                    />
                                </div>
                            </div>

                            {/* Header da seção */}
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair leading-tight">
                                    Sua Satisfação 
                                    <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] bg-clip-text text-transparent"> Garantida</span>
                                    <br />ou Seu Dinheiro de Volta!
                                </h2>
                                <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto font-inter">
                                    Estou tão confiante de que estes materiais vão transformar sua relação com a moda e sua imagem pessoal que ofereço uma <span className="text-[var(--color-accent)] font-bold">garantia incondicional de 7 dias.</span> Se por qualquer motivo você não ficar satisfeita com o conteúdo, basta solicitar o reembolso dentro desse período e devolveremos <span className="text-[var(--color-primary)] font-bold">100% do seu investimento</span>, sem perguntas. Seu risco é zero!
                                </p>
                            </div>

                            {/* Card de investimento - OTIMIZADO */}
                            <div className="card-modern bg-brand-cream text-brand-dark p-8 md:p-12 lg:p-16 mb-12">
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-8 font-playfair">
                                        Investimento Único Para Uma Transformação Completa
                                    </h3>
                                    
                                    {/* Value anchoring - CORRIGIDO */}
                                    <div className="bg-white rounded-xl p-6 border border-[var(--color-primary)]/20 shadow-lg mb-6">
                                        <h4 className="text-xl font-bold text-brand-dark mb-4 text-center">Valor Individual dos Materiais:</h4>
                                        <div className="space-y-2 text-brand-medium">
                                            <div className="flex justify-between">
                                                <span>• Quiz + Guia de Estilo Personalizado</span>
                                                <span className="font-semibold">R$ 197</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>• Guia Peças-Chave do Guarda-Roupa</span>
                                                <span className="font-semibold">R$ 97</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>• Guia de Visagismo Facial</span>
                                                <span className="font-semibold">R$ 67</span>
                                            </div>
                                            <div className="border-t pt-2 mt-4">
                                                <div className="flex justify-between text-lg font-bold">
                                                    <span>Valor Total:</span>
                                                    <span className="line-through text-red-500">R$ 361</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preço promocional DESTACADO - CORRIGIDO */}
                                    <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden mb-8">
                                        {/* Badge de oferta */}
                                        <div className="absolute -top-4 -right-4 bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                                            🔥 89% OFF
                                        </div>
                                        
                                        <div className="text-center">
                                            <p className="text-xl mb-2 opacity-90">Oferta Exclusiva por Tempo Limitado</p>
                                            <p className="text-lg mb-6 opacity-75">Apenas hoje por:</p>
                                            
                                            {/* Preço principal */}
                                            <div className="mb-6">
                                                <div className="flex items-baseline justify-center gap-4 mb-4">
                                                    <span className="text-3xl font-semibold">5x de</span>
                                                    <div className="relative">
                                                        <span className="text-7xl font-bold font-playfair">R$ 8,83</span>
                                                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
                                                    <span className="text-2xl font-bold">ou à vista R$ 39,90</span>
                                                </div>
                                            </div>
                                            
                                            {/* Countdown mais visível */}
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                                <CountdownTimer />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Lista de benefícios - MELHORADA */}
                                <div className="mb-12">
                                    <p className="text-xl md:text-2xl mb-8 font-bold text-brand-dark text-center">Você terá acesso a:</p>
                                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                        <div className="flex items-start bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                                            <Check size={24} className="text-green-600 mr-4 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-lg text-brand-dark">Quiz de Estilo</span>
                                                <p className="text-brand-medium">Descubra seu estilo predominante em 5 minutos</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start bg-white p-6 rounded-xl shadow-md border-l-4 border-[var(--color-primary)]">
                                            <Check size={24} className="text-green-600 mr-4 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-lg text-brand-dark">Guia de Imagem e Estilo</span>
                                                <p className="text-brand-medium">Personalizado para seu resultado específico</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start bg-white p-6 rounded-xl shadow-md border-l-4 border-[var(--color-accent)]">
                                            <Check size={24} className="text-green-600 mr-4 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-lg text-brand-dark">Bônus 1: Peças-Chave</span>
                                                <p className="text-brand-medium">Monte um guarda-roupa funcional</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                                            <Check size={24} className="text-green-600 mr-4 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-lg text-brand-dark">Bônus 2: Visagismo</span>
                                                <p className="text-brand-medium">Valorize seus traços naturais</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Mockup do produto */}
                                <div className="mb-12">
                                    <FixedIntroImage
                                        src={GUARANTEE_COMPLEMENTARY_IMAGE_URL}
                                        alt="Mockup completo com bônus"
                                        width={800}
                                        height={500}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-500 object-contain w-full h-auto"
                                    />
                                </div>

                                {/* Textos de valor - MELHORADOS */}
                                <div className="space-y-6 mb-12">
                                    <div className="bg-gradient-to-r from-[var(--color-background-light)] to-[var(--color-background-soft)] p-6 rounded-xl border-l-4 border-[var(--color-primary)]">
                                        <p className="text-lg md:text-xl text-brand-dark font-semibold leading-relaxed text-center font-inter">
                                            💭 Pense bem: quanto você já gastou com roupas que nunca usou? Quanto vale economizar tempo todas as manhãs sabendo exatamente o que vestir?
                                        </p>
                                    </div>
                                    
                                    <div className="bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-primary)]/10 p-8 rounded-xl border border-[var(--color-primary)]/20">
                                        <p className="text-xl md:text-2xl text-brand-dark font-bold leading-relaxed text-center font-inter">
                                            ✨ Este investimento em autoconhecimento vai muito além de roupas - é um investimento em você mesma, na sua <span className="text-[var(--color-primary)]">confiança</span> e na forma como o mundo te percebe.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Principal - OTIMIZADO */}
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-6 shadow-2xl">
                                    <button
                                        onClick={() => {
                                            handleCtaClick('guarantee_cta', 'Quero Descobrir Meu Estilo Agora!');
                                            window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
                                        }}
                                        className="bg-white text-green-600 font-bold text-xl md:text-2xl lg:text-3xl px-8 md:px-12 py-4 md:py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto group"
                                    >
                                        🚀 QUERO DESCOBRIR MEU ESTILO AGORA!
                                        <Shield size={24} className="inline ml-3 group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                                
                                {/* Trust signals melhorados */}
                                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Lock size={16} className="text-green-400" />
                                        <span>Pagamento 100% Seguro</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield size={16} className="text-blue-400" />
                                        <span>Garantia 7 Dias</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-yellow-400" />
                                        <span>3000+ Aprovações</span>
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-400 font-inter">
                                    ⚡ Acesso imediato após confirmação do pagamento
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9. Perguntas Frequentes */}
                <section className="section-spacing bg-brand-soft relative overflow-hidden">
                    {/* Elementos decorativos */}
                    <div className="absolute top-1/3 left-0 w-64 h-64 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-full -translate-x-32"></div>
                    <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-gradient-to-tl from-[var(--color-accent)]/10 to-transparent rounded-full translate-x-36"></div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="max-w-6xl mx-auto">
                            {/* Header da seção */}
                            <div className="text-center mb-16 animate-fade-in-up">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-brand-dark font-playfair leading-tight">
                                    Perguntas 
                                    <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">Frequentes</span>
                                </h2>
                                {/* Elementos decorativos */}
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full"></div>
                                </div>
                                <p className="text-xl text-brand-medium font-inter max-w-3xl mx-auto">
                                    Tire suas dúvidas e descubra como transformar sua imagem
                                </p>
                            </div>

                            {/* Imagem ilustrativa */}
                            <div className="mb-16 flex justify-center">
                                <FixedIntroImage
                                    src={FAQ_IMAGE_URL}
                                    alt="Perguntas estratégicas"
                                    width={700}
                                    height={420}
                                    className="rounded-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 object-contain w-full h-auto"
                                />
                            </div>

                            {/* FAQ Component */}
                            <div className="mb-16">
                                <FaqSectionNew />
                            </div>

                            {/* CTA Final */}
                            <div className="text-center">
                                <div className="card-modern p-8 md:p-12 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 border border-[var(--color-primary)]/20 mb-12">
                                    <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 font-playfair">
                                        Ainda tem dúvidas?
                                    </h3>
                                    <p className="text-lg md:text-xl text-brand-medium mb-8 font-inter leading-relaxed max-w-3xl mx-auto">
                                        Não deixe a insegurança te impedir de descobrir seu verdadeiro estilo. Com nossa garantia de 7 dias, você pode testar sem riscos!
                                    </p>
                                    
                                    <button
                                        onClick={() => handleCtaClick('faq_cta', 'Quero Transformar Minha Imagem Agora!')}
                                        className="btn-primary text-lg md:text-xl lg:text-2xl px-8 md:px-12 py-4 md:py-5 mb-6 animate-pulse-gentle group w-full sm:w-auto"
                                    >
                                        Quero Transformar Minha Imagem Agora!
                                        <ArrowRight size={20} className="inline ml-3 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    
                                    <p className="text-sm text-brand-medium flex items-center justify-center gap-2 font-inter">
                                        <Users size={16} className="text-brand-primary" />
                                        Junte-se a milhares de mulheres que já redescobriram sua confiança!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default QuizOfferPage;