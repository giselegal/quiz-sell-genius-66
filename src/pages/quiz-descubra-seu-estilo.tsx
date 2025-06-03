
import React, { useEffect, useState } from 'react';
import { preloadImagesByUrls } from '@/utils/images/preloading';
import FixedIntroImage from '@/components/ui/FixedIntroImage';
import { ChevronRight, Check, Clock, Star, ShoppingBag, Heart, Users, Award, Shield, ArrowRight, TrendingUp, BadgeCheck, Lock, Gift, ShoppingCart, CheckCircle, ArrowDown, Hourglass } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

// CSS optimizado e responsivo
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
  
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
    --shadow-sm: 0 2px 8px rgba(184, 155, 122, 0.08);
    --shadow-md: 0 4px 20px rgba(184, 155, 122, 0.12);
    --shadow-lg: 0 8px 32px rgba(184, 155, 122, 0.16);
  }
  
  .container-main { 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 0 1rem; 
  }
  
  .section-gap { 
    margin-bottom: 4rem; 
  }
  
  .card-clean { 
    background: white; 
    border-radius: 20px; 
    padding: 2.5rem; 
    box-shadow: var(--shadow-md);
    border: 1px solid rgba(184, 155, 122, 0.08);
    transition: all 0.3s ease;
  }
  
  .card-clean:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }
  
  .btn-primary-clean {
    background: linear-gradient(135deg, var(--success) 0%, #16a34a 100%);
    color: white;
    font-weight: 700;
    border-radius: 16px;
    padding: 1.25rem 2.5rem;
    border: none;
    font-size: 1.125rem;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 4px 16px rgba(34, 197, 94, 0.2);
    position: relative;
    overflow: hidden;
  }
  
  .btn-primary-clean::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  .btn-primary-clean:hover::before {
    left: 100%;
  }
  
  .btn-primary-clean:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
  }
  
  .text-hierarchy-1 { 
    font-size: clamp(2rem, 5vw, 4rem); 
    font-weight: 700; 
    line-height: 1.1; 
    margin-bottom: 1.5rem;
  }
  
  .text-hierarchy-2 { 
    font-size: clamp(1.5rem, 4vw, 2.5rem); 
    font-weight: 600; 
    line-height: 1.2; 
    margin-bottom: 1.25rem;
  }
  
  .text-hierarchy-3 { 
    font-size: clamp(1.25rem, 3vw, 1.75rem); 
    font-weight: 600; 
    line-height: 1.3; 
    margin-bottom: 1rem;
  }
  
  .text-body { 
    font-size: clamp(1rem, 2.5vw, 1.25rem); 
    line-height: 1.6; 
    margin-bottom: 1rem;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .animate-fade-in {
    animation: fadeInUp 0.6s ease-out forwards;
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
  
  .grid-responsive {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }
  
  @media (min-width: 640px) {
    .container-main { padding: 0 1.5rem; }
    .grid-responsive { grid-template-columns: repeat(2, 1fr); }
    .btn-primary-clean { font-size: 1.25rem; }
  }
  
  @media (min-width: 768px) {
    .container-main { padding: 0 2rem; }
    .section-gap { margin-bottom: 5rem; }
    .card-clean { padding: 3rem; }
    .grid-responsive { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
  }
  
  @media (min-width: 1024px) {
    .grid-responsive { grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
  }
  
  @media (max-width: 639px) {
    .btn-primary-clean { 
      width: 100%; 
      justify-content: center; 
      padding: 1.5rem; 
      font-size: 1.125rem;
    }
    .card-clean { padding: 1.5rem; }
    .section-gap { margin-bottom: 3rem; }
  }
`;

// URLs otimizadas das imagens
const HERO_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp";
const HERO_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp";
const PROBLEM_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp";
const SOLUTION_QUIZ_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp";
const GUIDES_BENEFITS_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp";
const BONUS_1_KEY_PIECES_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp";
const BONUS_2_VISAGISM_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp";
const GUARANTEE_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp";

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
                    return { hours: 1, minutes: 59, seconds: 59 };
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num) => num.toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center animate-fade-in">
            <p className="text-[#432818] font-semibold mb-3 flex items-center text-sm sm:text-base">
                <Clock size={18} className="mr-2 text-[#B89B7A]" />
                Esta oferta expira em:
            </p>
            <div className="flex items-center justify-center gap-2">
                <div className="bg-[#432818] text-white px-3 py-2 rounded-xl text-lg font-mono font-bold shadow-md">
                    {formatNumber(time.hours)}
                </div>
                <span className="text-[#B89B7A] font-bold text-xl">:</span>
                <div className="bg-[#432818] text-white px-3 py-2 rounded-xl text-lg font-mono font-bold shadow-md">
                    {formatNumber(time.minutes)}
                </div>
                <span className="text-[#B89B7A] font-bold text-xl">:</span>
                <div className="bg-[#432818] text-white px-3 py-2 rounded-xl text-lg font-mono font-bold shadow-md">
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
        <div className="w-full max-w-4xl mx-auto">
            <div className="space-y-3">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-[#432818] text-base sm:text-lg pr-4">{item.question}</span>
                            <ChevronRight
                                size={24}
                                className={`text-[#B89B7A] transition-transform duration-300 flex-shrink-0 ${openItem === index ? 'transform rotate-90' : ''}`}
                            />
                        </button>

                        {openItem === index && (
                            <div className="px-6 py-4 text-gray-700 bg-gray-50 border-t border-gray-100 text-sm sm:text-base leading-relaxed">
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
        const styleElement = document.createElement('style');
        styleElement.textContent = customStyles;
        document.head.appendChild(styleElement);
        
        preloadImagesByUrls([
            HERO_IMAGE_URL,
            HERO_COMPLEMENTARY_IMAGE_URL,
            PROBLEM_IMAGE_URL,
            SOLUTION_QUIZ_IMAGE_URL,
            GUIDES_BENEFITS_IMAGE_URL,
            BONUS_1_KEY_PIECES_IMAGE_URL,
            BONUS_2_VISAGISM_IMAGE_URL,
            GUARANTEE_IMAGE_URL
        ], { quality: 95 });

        if (typeof window !== 'undefined' && 'performance' in window) {
            window.performance.mark('offer-page-mounted');
        }
        
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    const handleCtaClick = (buttonId: string, action: string = 'Comprar Agora') => {
        trackButtonClick(buttonId, action, 'quiz_offer_page');
    };

    return (
        <div className="min-h-screen bg-[var(--background)]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Header otimizado */}
            <header className="py-4 px-4 sm:px-6 sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="container-main flex justify-center">
                    <FixedIntroImage
                        src={HERO_IMAGE_URL}
                        alt="Logo Gisele Galvão"
                        width={180}
                        height={80}
                        className="h-auto object-contain max-w-[150px] sm:max-w-[180px]"
                    />
                </div>
            </header>

            <main>
                {/* Hero Section melhorado */}
                <section className="section-gap pt-6 sm:pt-8">
                    <div className="container-main">
                        <div className="card-clean text-center animate-fade-in">
                            {/* Badge de credibilidade */}
                            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 mb-6 text-sm sm:text-base">
                                <Award size={18} className="text-green-600" />
                                <span className="font-semibold text-green-700">3000+ mulheres transformadas</span>
                            </div>

                            {/* Headline responsiva */}
                            <h1 className="text-hierarchy-1 text-[var(--text-dark)] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Descubra Seu <span className="gradient-text">Estilo Predominante</span>
                                <br />em 5 Minutos
                            </h1>
                            
                            {/* Subheadline */}
                            <p className="text-body text-[var(--text-medium)] mb-8 max-w-3xl mx-auto">
                                Tenha finalmente um guarda-roupa que <strong>funciona 100%</strong>, onde tudo combina e reflete sua personalidade
                            </p>

                            {/* Hero image responsiva */}
                            <div className="mb-8 max-w-sm sm:max-w-lg mx-auto">
                                <FixedIntroImage
                                    src={HERO_COMPLEMENTARY_IMAGE_URL}
                                    alt="Transformação de guarda-roupa"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto rounded-2xl shadow-lg"
                                />
                            </div>

                            {/* CTA principal */}
                            <button
                                onClick={() => {
                                    handleCtaClick('hero_cta', 'Descobrir Meu Estilo');
                                    window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
                                }}
                                className="btn-primary-clean mb-6"
                            >
                                <ArrowRight size={20} />
                                Descobrir Meu Estilo Agora
                            </button>
                            
                            {/* Trust elements */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-[var(--text-light)]">
                                <div className="flex items-center gap-2">
                                    <Lock size={16} className="text-green-600" />
                                    <span>100% Seguro</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shield size={16} className="text-green-600" />
                                    <span>7 Dias Garantia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Problema - Layout melhorado */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                                <div className="order-2 lg:order-1">
                                    <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        Você se identifica com isso?
                                    </h2>
                                    <div className="space-y-4 text-body text-[var(--text-medium)]">
                                        <p className="flex items-start gap-3">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span><strong>Guarda-roupa cheio</strong> mas nunca tem o que vestir?</span>
                                        </p>
                                        <p className="flex items-start gap-3">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span><strong>Compra peças</strong> que nunca combinam com nada?</span>
                                        </p>
                                        <p className="flex items-start gap-3">
                                            <span className="text-red-500 mt-1">✗</span>
                                            <span><strong>Sente que "nada fica bom"</strong> em você?</span>
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 sm:p-6 rounded-2xl border-l-4 border-orange-400 mt-6">
                                        <p className="text-[var(--text-dark)] font-semibold">
                                            Isso acontece porque você ainda não descobriu seu <strong>estilo predominante</strong>.
                                        </p>
                                    </div>
                                </div>
                                <div className="order-1 lg:order-2">
                                    <FixedIntroImage
                                        src={PROBLEM_IMAGE_URL}
                                        alt="Frustração com guarda-roupa"
                                        width={500}
                                        height={350}
                                        className="w-full h-auto rounded-2xl shadow-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solução - Design aprimorado */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean text-center">
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                                A Solução: <span className="gradient-text">Quiz de Estilo</span>
                            </h2>
                            
                            <div className="max-w-md mx-auto mb-8">
                                <FixedIntroImage
                                    src={SOLUTION_QUIZ_IMAGE_URL}
                                    alt="Quiz de Estilo"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto rounded-2xl shadow-md"
                                />
                            </div>

                            <p className="text-body text-[var(--text-medium)] mb-8 max-w-2xl mx-auto">
                                Método preciso para identificar seu estilo entre os <strong>7 estilos universais</strong> + guia personalizado completo.
                            </p>

                            <button
                                onClick={() => {
                                    handleCtaClick('solution_cta', 'Fazer Quiz');
                                    window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
                                }}
                                className="btn-primary-clean mb-8"
                            >
                                <ShoppingBag size={20} />
                                Fazer o Quiz Agora
                            </button>

                            <CountdownTimer />
                        </div>
                    </div>
                </section>

                {/* Valor - Grid responsivo */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <div className="text-center mb-8">
                                <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Transformação <span className="gradient-text">Completa</span>
                                </h2>
                                <p className="text-body text-[var(--text-medium)]">
                                    Tudo que você precisa para descobrir e aplicar seu estilo
                                </p>
                            </div>

                            {/* Grid responsivo de produtos */}
                            <div className="grid-responsive mb-8">
                                <div className="text-center group">
                                    <div className="aspect-[4/5] bg-white rounded-2xl mb-4 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
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
                                <div className="text-center group">
                                    <div className="aspect-[4/5] bg-white rounded-2xl mb-4 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
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
                                <div className="text-center group">
                                    <div className="aspect-[4/5] bg-white rounded-2xl mb-4 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
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

                            {/* Preço destacado */}
                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 sm:p-8 text-white text-center mb-8 shadow-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Gift size={20} />
                                    <p className="text-sm sm:text-base opacity-90">Oferta por tempo limitado</p>
                                </div>
                                <div className="mb-4">
                                    <span className="text-sm sm:text-base">5x de</span>
                                    <span className="text-3xl sm:text-4xl font-bold mx-2">R$ 8,83</span>
                                </div>
                                <p className="text-lg sm:text-xl">ou à vista <strong>R$ 39,90</strong></p>
                                <p className="text-sm mt-2 opacity-75">77% OFF - Economia de R$ 135,10</p>
                            </div>

                            {/* CTA Final */}
                            <div className="text-center">
                                <button
                                    onClick={() => {
                                        handleCtaClick('final_cta', 'Garantir Transformação');
                                        window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
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

                {/* Garantia - Simplificada */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean text-center">
                            <div className="max-w-sm mx-auto mb-6">
                                <FixedIntroImage
                                    src={GUARANTEE_IMAGE_URL}
                                    alt="Garantia 7 dias"
                                    width={200}
                                    height={200}
                                    className="w-full h-auto"
                                />
                            </div>
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                <span className="gradient-text">7 Dias</span> de Garantia
                            </h2>
                            <p className="text-body text-[var(--text-medium)] max-w-2xl mx-auto">
                                Se não ficar satisfeita, devolvemos <strong>100% do seu dinheiro</strong>. Sem perguntas.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ - Layout melhorado */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] text-center mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Perguntas <span className="gradient-text">Frequentes</span>
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
