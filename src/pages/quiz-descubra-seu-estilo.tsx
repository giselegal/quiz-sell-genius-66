
import React, { useEffect, useState } from 'react';
import { preloadImagesByUrls } from '@/utils/images/preloading';
import FixedIntroImage from '@/components/ui/FixedIntroImage';
import { ChevronRight, Check, Clock, Star, ShoppingBag, Heart, Users, Award, Shield, ArrowRight, TrendingUp, BadgeCheck, Lock, Gift, ShoppingCart, CheckCircle, ArrowDown, Hourglass } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

// CSS otimizado e responsivo
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
    margin-bottom: 3rem; 
  }
  
  .card-clean { 
    background: white; 
    border-radius: 20px; 
    padding: 2rem; 
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
    padding: 1.5rem 3rem;
    border: none;
    font-size: 1.25rem;
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
    box-shadow: 0 10px 40px rgba(34, 197, 94, 0.4);
  }
  
  .text-hierarchy-1 { 
    font-size: clamp(2.5rem, 6vw, 4.5rem); 
    font-weight: 700; 
    line-height: 1.1; 
    margin-bottom: 1.5rem;
  }
  
  .text-hierarchy-2 { 
    font-size: clamp(1.75rem, 4vw, 2.75rem); 
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
    font-size: clamp(1.125rem, 2.5vw, 1.375rem); 
    line-height: 1.6; 
    margin-bottom: 1rem;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .testimonial-card {
    background: linear-gradient(135deg, #f8f6f3 0%, #ffffff 100%);
    border-radius: 16px;
    padding: 1.5rem;
    border: 1px solid rgba(184, 155, 122, 0.2);
    text-align: center;
  }
  
  .pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite alternate;
  }
  
  @keyframes pulse-glow {
    from {
      box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
    }
    to {
      box-shadow: 0 10px 40px rgba(34, 197, 94, 0.5);
    }
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
  }
  
  @media (min-width: 768px) {
    .container-main { padding: 0 2rem; }
    .section-gap { margin-bottom: 4rem; }
    .card-clean { padding: 2.5rem; }
    .grid-responsive { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
  }
  
  @media (min-width: 1024px) {
    .grid-responsive { grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
  }
  
  @media (max-width: 639px) {
    .btn-primary-clean { 
      width: 100%; 
      justify-content: center; 
      padding: 1.25rem 2rem; 
      font-size: 1.125rem;
    }
    .card-clean { padding: 1.5rem; }
    .section-gap { margin-bottom: 2.5rem; }
  }
`;

// URLs otimizadas das imagens
const imageUrls = [
  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
  "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp",
  "https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp",
  "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp",
  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp",
  "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp",
  "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
];

// Componente de estrelas para avaliações
const RatingStars = ({ rating }: { rating: number }) => {
    return (
        <div className="flex justify-center mb-2">
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

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center animate-fade-in">
            <p className="text-[#432818] font-semibold mb-3 flex items-center text-sm sm:text-base">
                <Clock size={18} className="mr-2 text-[#B89B7A]" />
                Oferta expira em:
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

// Depoimentos otimizados
const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Marina Santos",
            text: "Descobri que sou Natural e agora entendo por que certas roupas ficam perfeitas em mim!",
            rating: 5,
            result: "Economizou R$ 2.500 em compras desnecessárias"
        },
        {
            name: "Carla Oliveira",
            text: "Finalmente tenho um guarda-roupa que funciona. Cada peça combina com outras!",
            rating: 5,
            result: "Criou 50+ looks com apenas 20 peças"
        },
        {
            name: "Ana Paula",
            text: "O quiz mudou completamente como eu me visto. Me sinto muito mais confiante!",
            rating: 5,
            result: "Aumentou autoestima em 6 semanas"
        }
    ];

    return (
        <div className="grid-responsive">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                    <RatingStars rating={testimonial.rating} />
                    <p className="text-[#432818] mb-3 italic">"{testimonial.text}"</p>
                    <p className="font-semibold text-[#B89B7A] mb-2">{testimonial.name}</p>
                    <p className="text-sm text-green-600 font-medium">{testimonial.result}</p>
                </div>
            ))}
        </div>
    );
};

// FAQ condensada
const FaqSectionNew = () => {
    const [openItem, setOpenItem] = useState<number | null>(null);

    const faqItems = [
        {
            question: "Quanto tempo leva o quiz?",
            answer: "Apenas 5 minutos! São perguntas rápidas sobre suas preferências."
        },
        {
            question: "Como recebo meu resultado?",
            answer: "Imediatamente após o pagamento por email, com acesso vitalício."
        },
        {
            question: "Funciona para qualquer idade?",
            answer: "Sim! Os estilos são atemporais e se adaptam a todas as idades."
        },
        {
            question: "E se eu não gostar?",
            answer: "Garantia de 7 dias. Não gostou? Devolvemos 100% do dinheiro."
        },
        {
            question: "Preciso saber sobre moda?",
            answer: "Não! É para iniciantes. Tudo explicado de forma simples e prática."
        }
    ];

    const toggleItem = (index: number) => {
        setOpenItem(openItem === index ? null : index);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="space-y-3">
                {faqItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-[#432818] text-base sm:text-lg pr-4">{item.question}</span>
                            <ChevronRight
                                size={20}
                                className={`text-[#B89B7A] transition-transform duration-300 flex-shrink-0 ${openItem === index ? 'transform rotate-90' : ''}`}
                            />
                        </button>

                        {openItem === index && (
                            <div className="px-6 py-3 text-gray-700 bg-gray-50 border-t border-gray-100 text-sm sm:text-base">
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
        
        preloadImagesByUrls(imageUrls, { quality: 95 });

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
            {/* Header simplificado */}
            <header className="py-4 px-4 sm:px-6 sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
                <div className="container-main flex justify-center">
                    <FixedIntroImage
                        src={imageUrls[0]}
                        alt="Logo Gisele Galvão"
                        width={180}
                        height={80}
                        className="h-auto object-contain max-w-[150px] sm:max-w-[180px]"
                    />
                </div>
            </header>

            <main>
                {/* Hero Section reformulado */}
                <section className="section-gap pt-8">
                    <div className="container-main">
                        <div className="card-clean text-center animate-fade-in">
                            {/* Badge social proof */}
                            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 mb-6 text-sm sm:text-base">
                                <Users size={18} className="text-green-600" />
                                <span className="font-semibold text-green-700">3.000+ mulheres já descobriram</span>
                            </div>

                            {/* Headline mais direta */}
                            <h1 className="text-hierarchy-1 text-[var(--text-dark)] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Qual é o Seu <span className="gradient-text">Estilo Verdadeiro</span>?
                            </h1>
                            
                            {/* Subheadline focada no benefício */}
                            <p className="text-body text-[var(--text-medium)] mb-6 max-w-2xl mx-auto">
                                <strong>Pare de desperdiçar dinheiro</strong> com roupas que não combinam. 
                                Descubra em 5 minutos seu estilo entre os 7 universais.
                            </p>

                            {/* Hero image menor e mais focada */}
                            <div className="mb-6 max-w-sm mx-auto">
                                <FixedIntroImage
                                    src={imageUrls[1]}
                                    alt="Quiz de Estilo"
                                    width={400}
                                    height={300}
                                    className="w-full h-auto rounded-2xl shadow-lg"
                                />
                            </div>

                            {/* CTA principal mais destacado */}
                            <button
                                onClick={() => {
                                    handleCtaClick('hero_cta', 'Descobrir Meu Estilo');
                                    window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
                                }}
                                className="btn-primary-clean pulse-glow mb-4"
                            >
                                <ShoppingCart size={22} />
                                Descobrir Meu Estilo AGORA
                            </button>
                            
                            <p className="text-sm text-green-600 font-semibold mb-4">✅ 7 dias de garantia • ✅ Acesso imediato</p>
                            
                            {/* Preço destacado */}
                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white inline-block">
                                <div className="text-sm opacity-90">5x de</div>
                                <div className="text-2xl font-bold">R$ 8,83</div>
                                <div className="text-sm opacity-90">ou R$ 39,90 à vista</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Problema reformulado */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] text-center mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Você tem esses <span className="gradient-text">problemas</span>?
                            </h2>
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="space-y-4 text-body text-[var(--text-medium)]">
                                        <p className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                                            <span className="text-red-500 mt-1 text-xl">✗</span>
                                            <span><strong>Guarda-roupa cheio</strong> mas "não tem nada pra vestir"</span>
                                        </p>
                                        <p className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                                            <span className="text-red-500 mt-1 text-xl">✗</span>
                                            <span><strong>Compra peças</strong> que nunca combina com nada</span>
                                        </p>
                                        <p className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                                            <span className="text-red-500 mt-1 text-xl">✗</span>
                                            <span><strong>Gasta muito dinheiro</strong> em roupas erradas</span>
                                        </p>
                                        <p className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                                            <span className="text-red-500 mt-1 text-xl">✗</span>
                                            <span><strong>Se sente perdida</strong> na hora de se vestir</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border-l-4 border-orange-400">
                                        <h3 className="text-xl font-bold text-[var(--text-dark)] mb-3">
                                            🎯 A solução está aqui!
                                        </h3>
                                        <p className="text-[var(--text-dark)] font-medium">
                                            Descubra seu <strong>estilo predominante</strong> entre os 7 universais e tenha finalmente um guarda-roupa que funciona 100%.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Método em 3 passos */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean text-center">
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Como Funciona em <span className="gradient-text">3 Passos</span>
                            </h2>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                        1
                                    </div>
                                    <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">Responda o Quiz</h3>
                                    <p className="text-[var(--text-medium)]">5 minutos, perguntas simples sobre suas preferências</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                        2
                                    </div>
                                    <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">Receba Seu Resultado</h3>
                                    <p className="text-[var(--text-medium)]">Descubra seu estilo + guia personalizado completo</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                        3
                                    </div>
                                    <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">Transforme Seu Guarda-Roupa</h3>
                                    <p className="text-[var(--text-medium)]">Aplique as dicas e tenha looks perfeitos sempre</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={() => {
                                        handleCtaClick('method_cta', 'Fazer Quiz');
                                        window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
                                    }}
                                    className="btn-primary-clean"
                                >
                                    <ShoppingCart size={20} />
                                    Fazer o Quiz Agora
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Prova social com depoimentos */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] text-center mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Veja os <span className="gradient-text">Resultados Reais</span>
                            </h2>
                            <TestimonialsSection />
                        </div>
                    </div>
                </section>

                {/* Valor condensado */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <div className="text-center mb-8">
                                <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Tudo que Você Vai Receber
                                </h2>
                            </div>

                            {/* 4 benefícios principais */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                                    <div className="bg-green-500 text-white rounded-full p-2">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-dark)] mb-1">Quiz Personalizado</h3>
                                        <p className="text-[var(--text-medium)] text-sm">Descubra seu estilo entre os 7 universais</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                                    <div className="bg-green-500 text-white rounded-full p-2">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-dark)] mb-1">Guia Completo</h3>
                                        <p className="text-[var(--text-medium)] text-sm">Para seu estilo específico + dicas práticas</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                                    <div className="bg-green-500 text-white rounded-full p-2">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-dark)] mb-1">Bônus: Peças-Chave</h3>
                                        <p className="text-[var(--text-medium)] text-sm">Lista essencial para seu guarda-roupa</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                                    <div className="bg-green-500 text-white rounded-full p-2">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-dark)] mb-1">Bônus: Visagismo</h3>
                                        <p className="text-[var(--text-medium)] text-sm">Cortes e cores que valorizam você</p>
                                    </div>
                                </div>
                            </div>

                            {/* Preço com urgência */}
                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white text-center mb-6 shadow-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Gift size={20} />
                                    <p className="text-base opacity-90">Oferta Especial - Apenas Hoje</p>
                                </div>
                                <div className="mb-3">
                                    <span className="text-base">5x de</span>
                                    <span className="text-3xl sm:text-4xl font-bold mx-2">R$ 8,83</span>
                                </div>
                                <p className="text-lg">ou à vista <strong>R$ 39,90</strong></p>
                                <p className="text-sm mt-2 opacity-75">🔥 77% OFF - Economia de R$ 135,10</p>
                            </div>

                            {/* Timer de urgência */}
                            <div className="mb-6">
                                <CountdownTimer />
                            </div>

                            {/* CTA Final */}
                            <div className="text-center">
                                <button
                                    onClick={() => {
                                        handleCtaClick('final_cta', 'Garantir Transformação');
                                        window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
                                    }}
                                    className="btn-primary-clean pulse-glow"
                                >
                                    <ShoppingCart size={22} />
                                    SIM! Quero Descobrir Meu Estilo
                                </button>
                                <p className="text-sm text-green-600 font-semibold mt-2">
                                    ✅ Garantia de 7 dias • ✅ Pagamento 100% seguro
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Garantia simplificada */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean text-center">
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                                <span className="gradient-text">100% Sem Risco</span>
                            </h2>
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <Shield size={32} className="text-green-600" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-semibold text-[var(--text-dark)]">7 Dias de Garantia</h3>
                                    <p className="text-[var(--text-medium)]">Não gostou? Devolvemos 100% do dinheiro</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ condensada */}
                <section className="section-gap">
                    <div className="container-main">
                        <div className="card-clean">
                            <h2 className="text-hierarchy-2 text-[var(--text-dark)] text-center mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Dúvidas <span className="gradient-text">Frequentes</span>
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
