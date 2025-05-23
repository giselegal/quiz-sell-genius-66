import React, { useEffect, useState } from 'react';
import { preloadCriticalImages } from '@/utils/images/preloading';
import FixedIntroImage from '@/components/ui/FixedIntroImage';
import { ChevronRight, Check, Clock, Star, ShoppingBag, Heart, Users, Award, Shield, ArrowRight, TrendingUp, BadgeCheck, Lock, Gift } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

// Constantes para otimização de imagens
const HERO_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"; // Logo da marca
const HERO_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"; // Mulher perdida com guarda-roupa bagunçado
const PROBLEM_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"; // Mulher perdida com guarda-roupa bagunçado
const SOLUTION_QUIZ_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp"; // Qual é o Seu Estilo FUNIL 2
const GUIDES_BENEFITS_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"; // Mockup tablet com guia
const GUIDES_BENEFITS_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp"; // Mockup 3 revistas guia de estilo
const BONUS_1_KEY_PIECES_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"; // Mockup revista peças-chave
const BONUS_1_KEY_PIECES_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515075/Espanhol_Portugu%C3%AAs_1_uru4r3.webp"; // Mockup de como é o guia por dentro
const BONUS_2_VISAGISM_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp"; // Mockup tablet visagismo
const BONUS_2_VISAGISM_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp"; // Visagismo
const MENTOR_GISELE_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp"; // Gisele Galvão
const MENTOR_GISELE_ALT_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"; // Gisele-Galvão-Espelho
const TESTIMONIALS_RESULTS_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp"; // Depoimentos
const TESTIMONIALS_RESULTS_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745521117/Captura_de_tela_2025-03-31_034324_qxvdho.webp"; // Antes e depois Mariangela e Adriana
const BEFORE_AFTER_IMAGE_1_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp";
const BEFORE_AFTER_IMAGE_2_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp";
const BEFORE_AFTER_IMAGE_3_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp";
const GUARANTEE_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"; // 7 dias de garantia
const GUARANTEE_COMPLEMENTARY_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"; // Mockup completo com bônus
const FAQ_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515862/Sem_nome_1000_x_1000_px_1280_x_720_px_vmqk3j.webp"; // Perguntas estratégicas

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

// Componente de indicador de usuários ativos (mantido)
const ActiveUsersIndicator = () => {
    const [activeCustomers, setActiveCustomers] = useState(312); // Número inicial de clientes satisfeitos

    useEffect(() => {
        const interval = setInterval(() => {
            const change = Math.floor(Math.random() * 5) - 2; // -2 a +2
            setActiveCustomers(prev => Math.max(300, Math.min(350, prev + change))); // Mantém entre 300 e 350
        }, 13000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 px-4 py-2 rounded-full text-sm text-purple-800 shadow-md">
            <Heart size={18} className="text-pink-500 mr-2 animate-pulse" />
            <span className="font-semibold">+{activeCustomers} Clientes Felizes</span>
            <span className="ml-1.5">Transformaram Seus Estilos!</span>
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

// Componente de notificação de vagas limitadas (mantido)
const LimitedSpotsNotification = () => {
    const [spotsFilled, setSpotsFilled] = useState(86);

    return (
        <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
                <TrendingUp size={20} className="text-[#F97316] mr-2" />
                <div>
                    <p className="font-medium text-[#7C2D12]">Vagas limitadas para hoje!</p>
                    <p className="text-sm text-[#9A3412]">Apenas 14 vagas restantes</p>
                </div>
            </div>
            <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#F97316] rounded-full"
                    style={{ width: `${spotsFilled}%` }}
                ></div>
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
    }, []);

    const handleCtaClick = (buttonId: string, action: string = 'Comprar Agora') => {
        trackButtonClick(
            buttonId,
            action,
            'quiz_offer_page'
        );
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fffaf7] to-[#fdf6f0] text-[#432818] font-sans">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#B89B7A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#aa6b5d]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-70"></div>

            {/* Header */}
            <header className="bg-white shadow-lg py-4 px-6 mb-8 sticky top-0 z-50">
                <div className="container mx-auto max-w-6xl flex justify-center">
                    <FixedIntroImage
                        src={HERO_IMAGE_URL}
                        alt="Logo Gisele Galvão"
                        width={200}
                        height={100}
                        className="h-auto"
                    />
                </div>
            </header>

            <main className="relative z-10">
                {/* 1. Headline e Subheadline */}
                <section className="container mx-auto px-4 py-8 max-w-5xl">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#B89B7A]/30 text-center animate-fade-in">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#432818] mb-6 font-playfair leading-tight drop-shadow-sm">
                            Descubra Seu Estilo Autêntico e Transforme Seu Guarda-Roupa em um Aliado da Sua Imagem Pessoal
                        </h1>
                        <p className="text-xl md:text-2xl text-[#6B4F43] max-w-4xl mx-auto mb-10 leading-relaxed">
                            Chega de um guarda-roupa lotado e da sensação de que nada combina com você. Descubra seu estilo predominante e aprenda a montar looks que realmente refletem sua essência, com **praticidade e confiança.**
                        </p>

                        <div className="mb-10 max-w-xl mx-auto relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 ease-in-out">
                            <FixedIntroImage
                                src={HERO_COMPLEMENTARY_IMAGE_URL}
                                alt="Mulher perdida com guarda-roupa bagunçado"
                                width={800}
                                height={533}
                                className="w-full h-auto object-cover"
                            />
                            {/* Decorative overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 border-[#B89B7A] rounded-tr-lg"></div>
                            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 border-[#B89B7A] rounded-bl-lg"></div>
                        </div>

                        <a
                            href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
                            onClick={() => handleCtaClick('headline_cta', 'Quero Descobrir Meu Estilo Agora!')}
                            className="inline-block text-white text-xl md:text-2xl py-4 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out btn-3d pulse-animation font-bold"
                            style={{
                                background: "linear-gradient(to right, #B89B7A, #aa6b5d)",
                                boxShadow: "0 8px 20px rgba(184, 155, 122, 0.5)"
                            }}
                        >
                            <span className="flex items-center justify-center gap-3">
                                <ArrowRight size={24} className="transform group-hover:translate-x-1 transition-transform" />
                                <span>Quero Descobrir Meu Estilo Agora!</span>
                            </span>
                        </a>

                        <p className="text-base text-[#6B4F43] flex items-center justify-center gap-2 mt-4">
                            <Lock size={16} className="text-[#B89B7A]" />
                            <span className="font-medium">Compra segura e acesso imediato.</span>
                        </p>
                        <div className="mt-6 flex justify-center">
                            <ActiveUsersIndicator />
                        </div>
                    </div>
                </section>

                ---

                {/* 2. Introdução ao Problema/Dor */}
                <section className="container mx-auto px-4 py-16 max-w-5xl">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#aa6b5d]/30">
                        <div className="text-center mb-12">
                            <FixedIntroImage
                                src={PROBLEM_IMAGE_URL}
                                alt="Mulher frustrada com guarda-roupa"
                                width={600}
                                height={400}
                                className="rounded-xl shadow-lg mx-auto mb-8 transform hover:scale-105 transition-transform duration-300"
                            />
                            <h2 className="text-4xl md:text-5xl font-bold text-[#432818] font-playfair leading-tight">
                                Você se identifica com isso?
                            </h2>
                        </div>
                        <div className="space-y-8 text-lg md:text-xl text-[#6B4F43] leading-relaxed">
                            <p>
                                Você já se sentiu **frustrada ao abrir seu guarda-roupa cheio de roupas e mesmo assim não ter o que vestir?** Ou já comprou peças que pareciam perfeitas na loja, mas que nunca combinaram com nada que você tem?
                            </p>
                            <p>
                                A verdade é que ter um armário lotado não significa ter um guarda-roupa funcional. Pelo contrário, muitas vezes isso só aumenta a ansiedade na hora de se vestir e o sentimento de que **"nada fica bom em mim"**.
                            </p>
                            <p>
                                Quantas vezes você já perdeu tempo precioso tentando montar um look que te fizesse sentir **confiante**? Ou gastou dinheiro em peças que raramente (ou nunca) usou? Talvez você sinta que sua imagem não comunica quem você realmente é, enquanto observa pessoas que parecem ter um estilo definido e autêntico.
                            </p>
                            <p className="font-semibold text-[#432818] bg-[#FFF7ED] p-4 rounded-lg border-l-4 border-[#B89B7A] shadow-inner">
                                Isso acontece porque você ainda não descobriu seu **estilo predominante** - aquele que está alinhado com sua personalidade, valores e essência. Sem esse conhecimento, você continua comprando peças aleatórias que não conversam entre si e não expressam quem você é.
                            </p>
                        </div>
                    </div>
                </section>

                ---

                {/* 3. Apresentação da Solução: Quiz de Estilo */}
                <section className="container mx-auto px-4 py-16 max-w-5xl">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#B89B7A]/30 text-center">
                        <div className="mb-12 max-w-xl mx-auto relative transform hover:scale-[1.02] transition-transform duration-500 ease-in-out">
                            <FixedIntroImage
                                src={SOLUTION_QUIZ_IMAGE_URL}
                                alt="Quiz de Estilo Gisele Galvão"
                                width={700}
                                height={525}
                                className="w-full h-auto rounded-xl shadow-2xl object-cover"
                            />
                            <div className="absolute -top-5 -right-5 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold transform rotate-6 ring-4 ring-white ring-opacity-50">
                                <Gift size={24} className="inline-block mr-2" /> Exclusivo!
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#432818] mb-8 font-playfair leading-tight">
                            A Solução Para Sua Transformação de Estilo Começa Aqui!
                        </h2>
                        <div className="space-y-8 text-lg md:text-xl text-[#6B4F43] leading-relaxed mb-10">
                            <p>
                                E se eu te dissesse que em apenas alguns minutos você pode descobrir seu estilo predominante e começar a transformar sua relação com a moda e sua imagem pessoal?
                            </p>
                            <p className="text-2xl text-[#432818] font-extrabold bg-[#e8dccb]/30 p-5 rounded-lg border-l-4 border-[#B89B7A] shadow-inner">
                                Apresento a você o **Quiz de Estilo Gisele Galvão** - uma ferramenta desenvolvida com base em anos de experiência em consultoria de imagem e estilo pessoal.
                            </p>
                            <p>
                                Este não é apenas mais um teste genérico da internet. É um **método preciso** que analisa suas preferências reais e identifica seu estilo predominante entre os **7 estilos universais:** Clássico, Natural, Romântico, Dramático, Criativo, Elegante e Contemporâneo.
                            </p>
                            <p>
                                Ao descobrir seu estilo predominante, você dá o primeiro passo para **criar um guarda-roupa que realmente funciona para você**, economizar tempo e dinheiro nas suas compras, expressar sua personalidade através da sua imagem e sentir-se **confiante e autêntica todos os dias.**
                            </p>
                            <p>
                                O quiz é **rápido, intuitivo** e foi criado especialmente para mulheres que desejam alinhar sua imagem à sua essência, sem precisar seguir tendências passageiras ou gastar fortunas com roupas que não combinam entre si.
                            </p>
                        </div>
                        <a
                            href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
                            onClick={() => handleCtaClick('solution_cta', 'Fazer o Quiz e Descobrir Meu Estilo')}
                            className="inline-block text-white text-xl md:text-2xl py-4 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out btn-3d pulse-animation font-bold"
                            style={{
                                background: "linear-gradient(to right, #B89B7A, #aa6b5d)",
                                boxShadow: "0 8px 20px rgba(184, 155, 122, 0.5)"
                            }}
                        >
                            <span className="flex items-center justify-center gap-3">
                                <ShoppingBag size={24} className="transform group-hover:translate-x-1 transition-transform" />
                                <span>Fazer o Quiz e Descobrir Meu Estilo</span>
                            </span>
                        </a>
                        <div className="mt-6 flex justify-center">
                            <CountdownTimer />
                        </div>
                    </div>
                </section>

                ---

                {/* 4. Benefícios dos Guias de Estilo e Imagem */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FFFBF7]">
                    <div className="container mx-auto max-w-5xl">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#B89B7A]/30">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#4A2E20] mb-12 text-center font-playfair leading-tight">
                                Muito Mais Que um Simples Quiz: Uma Jornada Completa de Autoconhecimento
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                                <div className="order-2 md:order-1">
                                    <p className="text-lg md:text-xl text-[#6B4F43] mb-6 leading-relaxed">
                                        Mas descobrir seu estilo é apenas o começo. Para realmente transformar sua imagem, você precisa de **orientação prática e estratégica.**
                                    </p>
                                    <p className="text-xl md:text-2xl text-[#4A2E20] font-extrabold mb-6 leading-relaxed bg-[#e8dccb]/30 p-4 rounded-lg border-l-4 border-[#aa6b5d] shadow-inner">
                                        Por isso, ao fazer o quiz, você terá acesso ao **Guia de Imagem e Estilo específico para o seu estilo predominante!**
                                    </p>
                                    <p className="text-lg md:text-xl text-[#6B4F43] mb-4 leading-relaxed font-semibold">
                                        Cada guia foi cuidadosamente desenvolvido para oferecer:
                                    </p>
                                    <ul className="list-none space-y-4 text-lg text-[#6B4F43] pl-0">
                                        <li className="flex items-start">
                                            <BadgeCheck size={24} className="text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-[#4A2E20]">Autoconhecimento profundo:</span> Entenda como sua personalidade, valores e essência se refletem no seu estilo. Como você viu no início do quiz, 55% da comunicação é visual, 38% é tom de voz e apenas 7% é verbal. Isso significa que sua imagem comunica muito antes de você falar qualquer coisa!
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <BadgeCheck size={24} className="text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-[#4A2E20]">Orientações práticas:</span> Descubra quais cores, tecidos, estampas e modelagens valorizam seu tipo físico e estilo. Aprenda a identificar peças que realmente combinam com você e que podem ser usadas de múltiplas formas.
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <BadgeCheck size={24} className="text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-[#4A2E20]">Estratégias de imagem:</span> Aprenda a comunicar visualmente quem você é antes mesmo de dizer uma palavra. Entenda como usar sua imagem para transmitir seus valores e personalidade em qualquer ambiente.
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <BadgeCheck size={24} className="text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="font-bold text-[#4A2E20]">Dicas de composição:</span> Saiba como montar looks versáteis e autênticos para diferentes ocasiões, desde o dia a dia até eventos especiais, sempre mantendo sua essência.
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
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mb-10">
                                <FixedIntroImage
                                    src={GUIDES_BENEFITS_COMPLEMENTARY_IMAGE_URL}
                                    alt="Mockup 3 revistas guia de estilo"
                                    width={700}
                                    height={450}
                                    className="rounded-xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                                />
                            </div>
                            <p className="text-lg md:text-xl text-[#6B4F43] text-center max-w-4xl mx-auto leading-relaxed mt-8">
                                Com o **Guia de Imagem e Estilo**, você terá todas as ferramentas para construir uma imagem que realmente reflete quem você é e potencializa sua comunicação pessoal e profissional. Não se trata apenas de estar na moda, mas de criar um **estilo atemporal que te representa em qualquer situação.**
                            </p>
                        </div>
                    </div>
                </section>

                ---

                {/* 5. Bônus Especial 1: Peças-Chave do Guarda-Roupa de Sucesso */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FDF6F0]">
                    <div className="container mx-auto max-w-5xl">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#aa6b5d]/30">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#4A2E20] mb-4 text-center font-playfair">
                                BÔNUS ESPECIAL <span className="text-[#B89B7A]">#1</span>
                            </h2>
                            <p className="text-2xl text-[#B89B7A] font-extrabold mb-10 text-center drop-shadow">
                                Guia das Peças-Chave do Guarda-Roupa de Sucesso
                            </p>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                                <div>
                                    <FixedIntroImage
                                        src={BONUS_1_KEY_PIECES_IMAGE_URL}
                                        alt="Guia Peças-Chave do Guarda-Roupa"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div>
                                    <p className="text-lg md:text-xl text-[#6B4F43] mb-6 leading-relaxed">
                                        Como bônus especial, você também receberá o **Guia das Peças-Chave do Guarda-Roupa de Sucesso** - um manual completo para construir um armário funcional, versátil e alinhado com sua identidade.
                                    </p>
                                    <p className="text-lg md:text-xl text-[#6B4F43] mb-4 leading-relaxed font-semibold">
                                        Neste guia exclusivo, você vai descobrir:
                                    </p>
                                    <ul className="list-none space-y-4 text-lg text-[#6B4F43] pl-0">
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                                            Quais são as **peças essenciais** que toda mulher deveria ter, independente do seu estilo.
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                                            Como adaptar essas peças-chave ao seu estilo predominante para criar **looks autênticos**.
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                                            Estratégias para maximizar combinações e **minimizar gastos**, economizando tempo e dinheiro.
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                                            Como montar um **guarda-roupa cápsula** que funciona para sua rotina e estilo de vida.
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                                            Dicas para **valorizar seu tipo físico** e criar uma imagem coerente e cheia de presença.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex justify-center mb-10">
                                <FixedIntroImage
                                    src={BONUS_1_KEY_PIECES_COMPLEMENTARY_IMAGE_URL}
                                    alt="Detalhes do Guia Peças-Chave"
                                    width={700}
                                    height={450}
                                    className="rounded-xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                                />
                            </div>
                            <p className="text-lg md:text-xl text-[#6B4F43] text-center max-w-4xl mx-auto leading-relaxed">
                                Imagine ter um guarda-roupa onde todas as peças combinam entre si, onde você consegue montar looks incríveis em minutos, e onde cada item reflete quem você é! Sem mais compras por impulso, sem mais peças esquecidas com etiqueta, sem mais frustração ao se vestir pela manhã.
                            </p>
                            <p className="text-xl md:text-2xl text-[#4A2E20] font-extrabold text-center max-w-4xl mx-auto mt-6 leading-relaxed bg-[#e8dccb]/30 p-4 rounded-lg border-l-4 border-[#B89B7A] shadow-inner">
                                Este bônus sozinho já vale o investimento no quiz e nos guias, pois vai te ajudar a **economizar tempo e dinheiro**, além de eliminar a frustração diária de não saber o que vestir. É como ter uma consultora de imagem pessoal te orientando em cada compra e na montagem dos seus looks.
                            </p>
                        </div>
                    </div>
                </section>

                ---

                {/* 6. Bônus Especial 2: Guia Visagismo Facial */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FFFBF7]">
                    <div className="container mx-auto max-w-5xl">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#B89B7A]/30">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#4A2E20] mb-4 text-center font-playfair">
                                BÔNUS ESPECIAL <span className="text-[#aa6b5d]">#2</span>
                            </h2>
                            <p className="text-2xl text-[#B89B7A] font-extrabold mb-10 text-center drop-shadow">
                                Guia de Visagismo Facial
                            </p>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                                <div className="order-2 md:order-1">
                                    <p className="text-lg md:text-xl text-[#6B4F43] mb-6 leading-relaxed">
                                        E tem mais! Você também receberá o **Guia de Visagismo Facial** - uma ferramenta poderosa para valorizar seus traços naturais e potencializar sua beleza única.
                                    </p>
                                    <p className="text-lg md:text-xl text-[#6B4F43] mb-4 leading-relaxed font-semibold">
                                        O visagismo é a arte de harmonizar sua imagem considerando a estrutura do seu rosto. Neste guia exclusivo, você vai aprender:
                                    </p>
                                    <ul className="list-none space-y-4 text-lg text-[#6B4F43] pl-0">
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#aa6b5d] mr-3 mt-1 flex-shrink-0" />
                                            Como identificar o **formato do seu rosto** (oval, redondo, quadrado, retangular, etc.).
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#aa6b5d] mr-3 mt-1 flex-shrink-0" />
                                            Quais **cortes de cabelo** valorizam seus traços naturais e equilibram as proporções do seu rosto.
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#aa6b5d] mr-3 mt-1 flex-shrink-0" />
                                            Como escolher **brincos, colares e óculos** que complementam seu formato facial e realçam sua beleza.
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#aa6b5d] mr-3 mt-1 flex-shrink-0" />
                                            Técnicas de **maquiagem** para realçar seus pontos fortes e criar harmonia visual.
                                        </li>
                                        <li className="flex items-start">
                                            <Check size={24} className="text-[#aa6b5d] mr-3 mt-1 flex-shrink-0" />
                                            Dicas personalizadas para cada tipo de rosto, considerando os terços faciais e as linhas predominantes.
                                        </li>
                                    </ul>
                                </div>
                                <div className="order-1 md:order-2">
                                    <FixedIntroImage
                                        src={BONUS_2_VISAGISM_IMAGE_URL}
                                        alt="Guia de Visagismo Facial"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mb-10">
                                <FixedIntroImage
                                    src={BONUS_2_VISAGISM_COMPLEMENTARY_IMAGE_URL}
                                    alt="Exemplo de Visagismo"
                                    width={700}
                                    height={450}
                                    className="rounded-xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                                />
                            </div>
                            <p className="text-lg md:text-xl text-[#6B4F43] text-center max-w-4xl mx-auto leading-relaxed">
                                Imagine saber exatamente quais acessórios escolher para valorizar seu rosto e complementar seu estilo! Este conhecimento vai **transformar a maneira como você se vê e como os outros te percebem.**
                            </p>
                            <p className="text-xl md:text-2xl text-[#4A2E20] font-extrabold text-center max-w-4xl mx-auto mt-6 leading-relaxed bg-[#e8dccb]/30 p-4 rounded-lg border-l-4 border-[#aa6b5d] shadow-inner">
                                Com o Guia de Visagismo Facial, você terá mais uma ferramenta poderosa para construir uma imagem autêntica, harmoniosa e impactante. Seus acessórios e corte de cabelo trabalharão a favor da sua beleza natural, criando uma imagem coesa e equilibrada.
                            </p>
                        </div>
                    </div>
                </section>

                ---

                {/* 7. Apresentação da Mentora: Gisele Galvão */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FDF6F0]">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-10 font-playfair text-[#4A2E20]">
                            Conheça Sua Mentora
                        </h2>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#B89B7A]/30 md:flex md:items-center md:gap-10">
                            <div className="md:w-1/3 mb-8 md:mb-0">
                                <FixedIntroImage
                                    src={MENTOR_GISELE_IMAGE_URL}
                                    alt="Gisele Galvão"
                                    width={300}
                                    height={300}
                                    className="rounded-full shadow-2xl mx-auto border-4 border-[#B89B7A]/50 transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="md:w-2/3 text-left">
                                <h3 className="text-3xl font-extrabold text-[#4A2E20] mb-3 font-playfair">Gisele Galvão</h3>
                                <p className="text-xl text-[#B89B7A] font-semibold mb-4 border-b-2 border-[#B89B7A]/50 pb-3">
                                    Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.
                                </p>
                                <p className="text-lg text-[#6B4F43] mb-3 leading-relaxed">
                                    Advogada de formação. Mãe da Victória, esposa do Fabrício. Apaixonada pela vida, pelos detalhes, viagens e tudo que me proporcione crescer como ser humano.
                                </p>
                                <p className="text-lg text-[#6B4F43] mb-3 leading-relaxed">
                                    Colérica, virginiana, paciente, pacificadora e muito empata. Amo receber, atos de serviços e tempo de qualidade são minha linguagem de amor. Amo vinho, chás e café. Meus maiores valores são minha família, justiça, honestidade, ética e liberdade.
                                </p>
                                <p className="text-lg text-[#6B4F43] leading-relaxed bg-[#e8dccb]/30 p-4 rounded-lg border-l-4 border-[#aa6b5d] shadow-inner">
                                    Há anos venho ajudando mulheres a descobrirem seu estilo autêntico e transformarem sua relação com a moda e a imagem pessoal. Minha missão é fazer com que você se vista de você mesma, comunicando sua essência através da sua imagem. Através da minha metodologia exclusiva, já transformei a vida de centenas de mulheres.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                ---

                {/* 8. Depoimentos e Resultados */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FFFBF7]">
                    <div className="container mx-auto max-w-5xl text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#4A2E20] mb-10 font-playfair">
                            Resultados Reais de Mulheres Reais
                        </h2>
                        <p className="text-lg md:text-xl text-[#6B4F43] max-w-4xl mx-auto mb-12 leading-relaxed">
                            Veja o que dizem as mulheres que já descobriram seu estilo e transformaram sua imagem com os guias:
                        </p>
                        <div className="mb-12">
                            <FixedIntroImage
                                src={TESTIMONIALS_RESULTS_IMAGE_URL}
                                alt="Depoimentos de clientes"
                                width={900}
                                height={560}
                                className="rounded-xl shadow-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-300"
                            />
                        </div>
                        <p className="text-xl text-[#6B4F43] mb-8 leading-relaxed font-semibold italic p-4 bg-[#e8dccb]/30 rounded-lg border-l-4 border-[#B89B7A] shadow-inner">
                            "Os guias da Gisele me deram a clareza que eu precisava para parar de me sentir perdida na frente do guarda-roupa. Agora sei o que me valoriza e me sinto muito mais confiante!" - Maria S.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <FixedIntroImage src={BEFORE_AFTER_IMAGE_1_URL} alt="Antes e Depois Cliente 1" width={350} height={350} className="rounded-xl shadow-lg mx-auto border-4 border-[#B89B7A]/30 transform hover:scale-105 transition-transform duration-300" />
                            <FixedIntroImage src={BEFORE_AFTER_IMAGE_2_URL} alt="Antes e Depois Cliente 2" width={350} height={350} className="rounded-xl shadow-lg mx-auto border-4 border-[#aa6b5d]/30 transform hover:scale-105 transition-transform duration-300" />
                            <FixedIntroImage src={BEFORE_AFTER_IMAGE_3_URL} alt="Antes e Depois Cliente 3" width={350} height={350} className="rounded-xl shadow-lg mx-auto border-4 border-[#B89B7A]/30 transform hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="mb-12">
                            <FixedIntroImage
                                src={TESTIMONIALS_RESULTS_COMPLEMENTARY_IMAGE_URL}
                                alt="Antes e depois Mariangela e Adriana"
                                width={800}
                                height={500}
                                className="rounded-xl shadow-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-300"
                            />
                        </div>
                        <p className="text-lg md:text-xl text-[#6B4F43] mb-6 leading-relaxed">
                            Estas são apenas algumas das centenas de mulheres que já transformaram sua relação com a moda e sua imagem pessoal através do Quiz de Estilo e dos Guias exclusivos.
                        </p>
                        <p className="text-xl md:text-2xl text-[#4A2E20] font-extrabold mb-10 leading-relaxed p-4 bg-[#fff7ed] rounded-lg border-l-4 border-[#B89B7A] shadow-inner">
                            Você também pode ter essa transformação! Imagine como seria se vestir todos os dias com **confiança**, sabendo que cada peça do seu guarda-roupa reflete quem você é e comunica sua essência. Imagine **economizar tempo e dinheiro**, tendo um guarda-roupa funcional onde tudo combina entre si. Imagine sentir que sua imagem externa finalmente está alinhada com quem você é por dentro.
                        </p>
                        <a
                            href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
                            onClick={() => handleCtaClick('testimonials_cta', 'Sim, Quero Essa Transformação!')}
                            className="group inline-block px-12 py-5 bg-[#B89B7A] hover:bg-[#A1835D] text-white font-bold rounded-full text-xl md:text-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-subtle"
                            style={{ boxShadow: "0 8px 20px rgba(184, 155, 122, 0.5)" }}
                        >
                            Sim, Quero Essa Transformação!
                            <Heart size={24} className="inline ml-3 group-hover:fill-white transition-colors animate-heart-beat" />
                        </a>
                        <div className="mt-6 flex justify-center">
                            <LimitedSpotsNotification />
                        </div>
                    </div>
                </section>

                ---

                {/* 9. Garantia e Chamada para Ação */}
                <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#4A2E20] text-white">
                    <div className="container mx-auto max-w-4xl text-center">
                        <div className="mb-10">
                            <FixedIntroImage
                                src={GUARANTEE_IMAGE_URL}
                                alt="Selo de Garantia 7 Dias"
                                width={280}
                                height={280}
                                className="mx-auto drop-shadow-lg animate-fade-in-up"
                            />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair leading-tight text-[#fdf6f0]">
                            Sua Satisfação Garantida ou Seu Dinheiro de Volta!
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                            Estou tão confiante de que estes materiais vão transformar sua relação com a moda e sua imagem pessoal que ofereço uma **garantia incondicional de 7 dias.** Se por qualquer motivo você não ficar satisfeita com o conteúdo, basta solicitar o reembolso dentro desse período e devolveremos **100% do seu investimento**, sem perguntas. Seu risco é zero!
                        </p>

                        <div className="bg-[#FDF6F0] text-[#4A2E20] p-8 rounded-2xl shadow-xl mb-12 border border-[#B89B7A]/40">
                            <h3 className="text-3xl font-extrabold mb-4 font-playfair text-[#4A2E20]">Investimento Único Para Uma Transformação Completa:</h3>
                            <div className="flex justify-center items-baseline mb-6">
                                <span className="text-3xl font-semibold mr-2">R$</span>
                                <span className="text-7xl font-extrabold text-[#B89B7A] drop-shadow-md"> [VALOR]</span> {/* MANTER PLACEHOLDER */}
                            </div>
                            <p className="text-xl mb-3 font-bold text-[#4A2E20]">Você terá acesso a:</p>
                            <ul className="list-none text-left space-y-3 max-w-md mx-auto text-lg mb-8 pl-0">
                                <li className="flex items-center text-[#6B4F43]"><Check size={22} className="text-green-600 mr-3" /> <span className="font-semibold">Quiz de Estilo</span> para descobrir seu estilo predominante</li>
                                <li className="flex items-center text-[#6B4F43]"><Check size={22} className="text-green-600 mr-3" /> <span className="font-semibold">Guia de Imagem e Estilo</span> específico para seu resultado</li>
                                <li className="flex items-center text-[#6B4F43]"><Check size={22} className="text-green-600 mr-3" /> <span className="font-extrabold">Bônus 1:</span> Guia das Peças-Chave do Guarda-Roupa de Sucesso</li>
                                <li className="flex items-center text-[#6B4F43]"><Check size={22} className="text-green-600 mr-3" /> <span className="font-extrabold">Bônus 2:</span> Guia de Visagismo Facial</li>
                            </ul>
                            <div className="my-8 flex justify-center">
                                <FixedIntroImage
                                    src={GUARANTEE_COMPLEMENTARY_IMAGE_URL}
                                    alt="Mockup completo com bônus"
                                    width={700}
                                    height={450}
                                    className="rounded-xl shadow-xl border border-[#B89B7A]/30 transform hover:scale-[1.02] transition-transform duration-300"
                                />
                            </div>
                            <p className="text-lg md:text-xl text-[#6B4F43] mb-4 leading-relaxed">
                                Pense bem: quanto você já gastou com roupas que nunca usou? Quanto vale para você economizar tempo todas as manhãs, sabendo exatamente o que vestir? Quanto vale se sentir confiante e autêntica em qualquer situação?
                            </p>
                            <p className="text-xl md:text-2xl text-[#4A2E20] font-extrabold leading-relaxed bg-[#FFF7ED] p-4 rounded-lg border-l-4 border-[#aa6b5d] shadow-inner">
                                Este investimento em autoconhecimento e imagem pessoal vai muito além de roupas - é um investimento em você mesma, na sua confiança e na forma como o mundo te percebe.
                            </p>
                        </div>

                        <a
                            href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
                            onClick={() => handleCtaClick('guarantee_cta', 'Quero Descobrir Meu Estilo Agora!')}
                            className="group inline-block px-12 py-5 bg-[#B89B7A] hover:bg-[#A1835D] text-white font-bold rounded-full text-xl md:text-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-light"
                            style={{ boxShadow: "0 8px 20px rgba(184, 155, 122, 0.5)" }}
                        >
                            Quero Descobrir Meu Estilo Agora!
                            <Shield size={24} className="inline ml-3 group-hover:scale-110 transition-transform" />
                        </a>
                        <p className="mt-4 text-base text-gray-300 flex items-center justify-center gap-2">
                            <Lock size={16} />Pagamento 100% seguro. Acesso imediato.
                        </p>
                    </div>
                </section>

                ---

                {/* 10. Perguntas Frequentes */}
                <section className="py-20 px-4 md:px-8 lg:px-16 bg-[#FDF6F0]">
                    <div className="container mx-auto max-w-4xl text-center">
                        <div className="mb-10 flex justify-center">
                            <FixedIntroImage
                                src={FAQ_IMAGE_URL}
                                alt="Perguntas estratégicas"
                                width={600}
                                height={380}
                                className="rounded-xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                            />
                        </div>
                        <FaqSectionNew />
                        <div className="mt-12">
                            <a
                                href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
                                onClick={() => handleCtaClick('faq_cta', 'Quero Transformar Minha Imagem Agora!')}
                                className="group inline-block px-10 py-4 bg-[#B89B7A] hover:bg-[#A1835D] text-white font-semibold rounded-full text-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                style={{ boxShadow: "0 6px 16px rgba(184, 155, 122, 0.4)" }}
                            >
                                Quero Transformar Minha Imagem Agora!
                                <ArrowRight size={22} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <p className="mt-4 text-sm text-gray-600 flex items-center justify-center gap-2">
                                <Users size={16} className="text-[#B89B7A]" />
                                Junte-se a centenas de mulheres que já redescobriram sua confiança!
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Custom Tailwind CSS classes for animations */}
            <style jsx>{`
                .font-playfair {
                    font-family: 'Playfair Display', serif; /* Certifique-se de importar essa fonte ou usar uma alternativa */
                }
                .btn-3d {
                    position: relative;
                    transform-style: preserve-3d;
                    transition: all 0.2s ease-out;
                    z-index: 1;
                }
                .btn-3d:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(to right, #A1835D, #935C4A); /* Darker shade for 3D effect */
                    border-radius: inherit;
                    transform: translateZ(-1px);
                    box-shadow: 0 6px 0px rgba(0,0,0,0.2);
                    transition: all 0.2s ease-out;
                    z-index: -1;
                }
                .btn-3d:hover {
                    transform: translateY(-2px) translateZ(0);
                }
                .btn-3d:hover:before {
                    transform: translateY(2px) translateZ(-1px);
                    box-shadow: 0 4px 0px rgba(0,0,0,0.2);
                }
                .btn-3d:active {
                    transform: translateY(2px) translateZ(0);
                }
                .btn-3d:active:before {
                    transform: translateY(0px) translateZ(-1px);
                    box-shadow: 0 2px 0px rgba(0,0,0,0.2);
                }

                @keyframes pulse-animation {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }
                .pulse-animation {
                    animation: pulse-animation 2s infinite ease-in-out;
                }

                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s infinite ease-in-out;
                }

                @keyframes heart-beat {
                    0%, 100% { transform: scale(1); }
                    15% { transform: scale(1.1); }
                    30% { transform: scale(1); }
                    45% { transform: scale(1.1); }
                }
                .animate-heart-beat {
                    animation: heart-beat 1.5s infinite;
                }

                @keyframes pulse-light {
                    0%, 100% { box-shadow: 0 8px 20px rgba(184, 155, 122, 0.5); }
                    50% { box-shadow: 0 12px 30px rgba(184, 155, 122, 0.7); }
                }
                .animate-pulse-light {
                    animation: pulse-light 2.5s infinite ease-in-out;
                }

                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default QuizOfferPage;