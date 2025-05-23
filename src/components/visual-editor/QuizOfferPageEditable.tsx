import React, { useEffect } from 'react';
import FixedIntroImage from '@/components/ui/FixedIntroImage';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import { trackButtonClick } from '@/utils/analytics';
import { 
    BadgeCheck, 
    Check, 
    ChevronRight, 
    ShoppingBag, 
    ArrowRight, 
    Users, 
    Shield, 
    Lock, 
    TrendingUp 
} from 'lucide-react';

// Função para preload de imagens
const preloadCriticalImages = (imageUrls: string[], options?: { quality?: number }) => {
    imageUrls.forEach(url => {
        if (url) {
            const img = new Image();
            img.src = url;
        }
    });
};

// Interface para os dados editáveis
interface QuizOfferPageEditableProps {
  data: {
    // Textos editáveis - Hero
    heroTitle: string;
    heroSubtitle: string;
    heroCtaText: string;
    
    // Seção Problema
    problemTitle: string;
    problemDescription: string;
    problemParagraph1: string;
    problemParagraph2: string;
    problemParagraph3: string;
    problemConclusion: string;
    
    // Seção Solução (Quiz)
    solutionTitle: string;
    solutionDescription: string;
    solutionParagraph1: string;
    solutionParagraph2: string;
    solutionParagraph3: string;
    solutionParagraph4: string;
    solutionCtaText: string;
    
    // Seção Benefícios dos Guias
    benefitsTitle: string;
    benefitsDescription: string;
    benefitsMainDescription: string;
    benefitsSubtitle: string;
    benefitsConclusion: string;
    
    // Bônus 1 - Peças-Chave
    bonus1Title: string;
    bonus1Subtitle: string;
    bonus1Description: string;
    bonus1MainDescription: string;
    bonus1Conclusion: string;
    
    // Bônus 2 - Visagismo
    bonus2Title: string;
    bonus2Subtitle: string;
    bonus2Description: string;
    bonus2MainDescription: string;
    bonus2Conclusion: string;
    
    // Mentora
    mentorTitle: string;
    mentorName: string;
    mentorRole: string;
    mentorDescription1: string;
    mentorDescription2: string;
    mentorDescription3: string;
    
    // Depoimentos
    testimonialsTitle: string;
    testimonialsDescription: string;
    testimonialsQuote: string;
    testimonialsConclusion: string;
    testimonialsCtaText: string;
    
    // Garantia
    guaranteeTitle: string;
    guaranteeDescription: string;
    guaranteePrice: string;
    guaranteeConclusion: string;
    guaranteeCtaText: string;
    
    // FAQ
    faqTitle: string;
    faqCtaText: string;
    
    // URLs e links
    ctaUrl: string;
    
    // Imagens
    heroImage: string;
    heroComplementaryImage: string;
    problemImage: string;
    solutionImage: string;
    benefitsImage: string;
    benefitsComplementaryImage: string;
    bonus1Image: string;
    bonus1ComplementaryImage: string;
    bonus2Image: string;
    bonus2ComplementaryImage: string;
    mentorImage: string;
    testimonialsImage: string;
    testimonialsComplementaryImage: string;
    guaranteeImage: string;
    guaranteeComplementaryImage: string;
    faqImage: string;
    
    // Estilos
    backgroundColor: string;
    textColor: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontSize: number;
    spacing: number;
    borderRadius: number;
    shadowIntensity: number;
    
    // Layout
    containerMaxWidth: string;
    sectionPadding: string;
    imageSize: string;
    cardPadding: string;
    
    // Configurações
    showActiveUsers: boolean;
    showCountdown: boolean;
    showLimitedSpots: boolean;
    showTestimonials: boolean;
    showGuarantee: boolean;
    showFaq: boolean;
    showBeforeAfter: boolean;
    showBonuses: boolean;
    showMentor: boolean;
    
    // Customizações avançadas
    headerFixed: boolean;
    animationsEnabled: boolean;
    gradientBackground: boolean;
  };
}

// Componente de usuários ativos
const ActiveUsersIndicator = ({ show }: { show: boolean }) => {
    if (!show) return null;
    
    return (
        <div className="bg-[#F3F0E7] text-[#432818] p-3 rounded-lg shadow-md flex items-center justify-between max-w-sm mx-auto mb-6 border border-[#B89B7A]/30">
            <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <div>
                    <p className="font-medium text-sm">247 pessoas online agora</p>
                    <p className="text-xs text-[#6B4F43]">Fazendo o quiz</p>
                </div>
            </div>
            <div className="text-2xl">👥</div>
        </div>
    );
};

// Componente de vagas limitadas
const LimitedSpotsIndicator = ({ show }: { show: boolean }) => {
    if (!show) return null;
    
    const spotsFilled = 86; // Porcentagem de vagas preenchidas
    
    return (
        <div className="bg-[#FEF3E2] text-[#7C2D12] p-4 rounded-lg shadow-md flex items-center justify-between max-w-md mx-auto mb-6 border border-[#F97316]/30">
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
const FaqSectionNew = ({ title, ctaText, ctaUrl }: { title: string; ctaText: string; ctaUrl: string }) => {
    const [openItem, setOpenItem] = React.useState(null);

    const faqItems = [
        {
            question: "Quanto tempo leva para fazer o quiz?",
            answer: "O quiz leva entre 5 a 10 minutos para ser concluído. São perguntas simples e intuitivas sobre suas preferências de estilo, personalidade e estilo de vida."
        },
        {
            question: "Posso refazer o quiz se não gostar do resultado?",
            answer: "Sim! Você pode refazer o quiz quantas vezes quiser. Às vezes, conforme evoluímos, nosso estilo também evolui."
        },
        {
            question: "Os guias são específicos para cada tipo físico?",
            answer: "Sim! Cada guia é desenvolvido considerando diferentes tipos físicos e como valorizar suas características únicas através do seu estilo predominante."
        },
        {
            question: "Como recebo os materiais após fazer o quiz?",
            answer: "Imediatamente após completar sua compra, você receberá um e-mail com acesso à plataforma onde estão todos os seus guias e materiais."
        },
        {
            question: "Existe garantia?",
            answer: "Sim! Oferecemos 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeita, devolvemos 100% do seu investimento."
        }
    ];

    const toggleItem = (index) => {
        setOpenItem(openItem === index ? null : index);
    };

    const handleCtaClick = (buttonId: string, action: string = 'Comprar Agora') => {
        trackButtonClick(
            buttonId,
            action,
            'quiz_offer_page'
        );
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-[#432818] mb-8 text-center font-playfair">
                {title}
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

const QuizOfferPageEditable: React.FC<QuizOfferPageEditableProps> = ({ data }) => {
    useEffect(() => {
        preloadCriticalImages(
            [
                data.heroImage,
                data.heroComplementaryImage,
                data.problemImage,
                data.solutionImage,
                data.benefitsImage,
                data.bonus1Image,
                data.bonus2Image,
                data.mentorImage,
                data.testimonialsImage,
                data.guaranteeImage,
                data.faqImage
            ],
            { quality: 95 }
        );

        if (typeof window !== 'undefined' && 'performance' in window) {
            window.performance.mark('offer-page-mounted');
        }
    }, [data]);

    const handleCtaClick = (buttonId: string, action: string = 'Comprar Agora') => {
        trackButtonClick(
            buttonId,
            action,
            'quiz_offer_page'
        );
    };

    const dynamicStyles = {
        '--primary-color': data.primaryColor,
        '--secondary-color': data.secondaryColor,
        '--accent-color': data.accentColor,
        '--border-radius': `${data.borderRadius}px`,
        '--spacing': `${data.spacing}px`,
        '--shadow-intensity': `${data.shadowIntensity}px`,
    } as React.CSSProperties;

    return (
        <div 
            className="min-h-screen relative overflow-hidden font-sans"
            style={{
                backgroundColor: data.backgroundColor,
                color: data.textColor,
                fontSize: `${data.fontSize}px`,
                ...dynamicStyles
            }}
        >
            {/* Decorative background elements */}
            {data.gradientBackground && (
                <>
                    <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-70" 
                         style={{ backgroundColor: `${data.primaryColor}10` }}></div>
                    <div className="absolute bottom-0 left-0 w-1/4 h-1/4 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-70"
                         style={{ backgroundColor: `${data.secondaryColor}10` }}></div>
                </>
            )}

            {/* Header */}
            <header className={`bg-white shadow-lg py-4 px-6 mb-8 z-50 ${data.headerFixed ? 'sticky top-0' : ''}`}>
                <div className={`container mx-auto ${data.containerMaxWidth} flex justify-center`}>
                    <FixedIntroImage
                        src={data.heroImage}
                        alt="Logo Gisele Galvão"
                        width={200}
                        height={100}
                        className="h-auto"
                    />
                </div>
            </header>

            <main className={`relative z-10 flex flex-col gap-y-8 md:gap-y-12`}>
                {/* 1. Headline e Subheadline */}
                <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
                    <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border text-center`} 
                         style={{ borderColor: `${data.primaryColor}30` }}>
                        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 font-playfair leading-tight"
                            style={{ color: data.textColor }}>
                            {data.heroTitle}
                        </h1>
                        
                        <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-4xl mx-auto"
                           style={{ color: data.accentColor }}>
                            {data.heroSubtitle}
                        </p>

                        {data.showActiveUsers && <ActiveUsersIndicator show={data.showActiveUsers} />}
                        {data.showLimitedSpots && <LimitedSpotsIndicator show={data.showLimitedSpots} />}

                        <div className={`mb-12 ${data.imageSize} mx-auto relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 ease-in-out`}>
                            <FixedIntroImage
                                src={data.heroComplementaryImage}
                                alt="Mulher perdida com guarda-roupa bagunçado"
                                width={800}
                                height={533}
                                className={`w-full h-auto object-cover ${data.imageSize} mx-auto`}
                            />
                            {/* Decorative overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 rounded-tr-lg"
                                 style={{ borderColor: data.primaryColor }}></div>
                            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 rounded-bl-lg"
                                 style={{ borderColor: data.primaryColor }}></div>
                        </div>

                        <a
                            href={data.ctaUrl}
                            onClick={() => handleCtaClick('hero_cta', data.heroCtaText)}
                            className="inline-block text-white text-xl md:text-2xl py-4 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out btn-3d pulse-animation font-bold"
                            style={{
                                background: `linear-gradient(to right, ${data.primaryColor}, ${data.secondaryColor})`,
                                boxShadow: `0 8px 20px ${data.primaryColor}80`
                            }}
                        >
                            <span className="flex items-center justify-center gap-3">
                                <ShoppingBag size={24} className="transform group-hover:translate-x-1 transition-transform" />
                                <span>{data.heroCtaText}</span>
                            </span>
                        </a>
                        {data.showCountdown && (
                            <div className="mt-6 flex justify-center">
                                <CountdownTimer />
                            </div>
                        )}
                    </div>
                </section>

                {/* 2. Identificação do Problema */}
                <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding}`} 
                         style={{ backgroundColor: data.backgroundColor }}>
                    <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border`}
                         style={{ borderColor: `${data.primaryColor}30` }}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair leading-tight"
                            style={{ color: data.textColor }}>
                            {data.problemTitle}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                            <div className="order-2 md:order-1">
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.problemDescription}
                                </p>
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.problemParagraph1}
                                </p>
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.problemParagraph2}
                                </p>
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.problemParagraph3}
                                </p>
                            </div>
                            <div className="order-1 md:order-2">
                                <FixedIntroImage
                                    src={data.problemImage}
                                    alt="Problema do guarda-roupa"
                                    width={600}
                                    height={480}
                                    className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl font-extrabold mb-10 leading-relaxed p-4 rounded-lg border-l-4 shadow-inner"
                           style={{ 
                               color: data.textColor, 
                               backgroundColor: `${data.primaryColor}20`,
                               borderColor: data.secondaryColor 
                           }}>
                            {data.problemConclusion}
                        </p>
                    </div>
                </section>

                {/* 3. Seção Solução (Quiz) */}
                <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
                    <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border text-center`}
                         style={{ borderColor: `${data.primaryColor}30` }}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair leading-tight"
                            style={{ color: data.textColor }}>
                            {data.solutionTitle}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                            <div>
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.solutionDescription}
                                </p>
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.solutionParagraph1}
                                </p>
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.solutionParagraph2}
                                </p>
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.solutionParagraph3}
                                </p>
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.solutionParagraph4}
                                </p>
                            </div>
                            <div>
                                <FixedIntroImage
                                    src={data.solutionImage}
                                    alt="Solução do quiz"
                                    width={600}
                                    height={480}
                                    className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                        <div className="mt-12">
                            <a
                                href={data.ctaUrl}
                                onClick={() => handleCtaClick('solution_cta', data.solutionCtaText)}
                                className="group inline-block px-12 py-5 text-white font-bold rounded-full text-xl md:text-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-light"
                                style={{
                                    backgroundColor: data.primaryColor,
                                    boxShadow: `0 8px 20px ${data.primaryColor}80`
                                }}
                            >
                                {data.solutionCtaText}
                                <ArrowRight size={24} className="inline ml-3 group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* 4. Seção Benefícios dos Guias */}
                {data.showBonuses && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
                        <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border`}
                             style={{ borderColor: `${data.primaryColor}30` }}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair leading-tight"
                                style={{ color: data.textColor }}>
                                {data.benefitsTitle}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                                <div>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.benefitsDescription}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.benefitsMainDescription}
                                    </p>
                                    <p className="text-xl md:text-2xl font-bold mb-6 leading-relaxed"
                                       style={{ color: data.primaryColor }}>
                                        {data.benefitsSubtitle}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.benefitsConclusion}
                                    </p>
                                </div>
                                <div>
                                    <FixedIntroImage
                                        src={data.benefitsImage}
                                        alt="Benefícios dos guias"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 mt-12">
                                <FixedIntroImage
                                    src={data.benefitsComplementaryImage}
                                    alt="Benefícios complementares"
                                    width={500}
                                    height={400}
                                    className="rounded-xl shadow-xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* 5. Bônus 1 - Peças-Chave */}
                {data.showBonuses && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
                        <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border`}
                             style={{ borderColor: `${data.primaryColor}30` }}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair leading-tight"
                                style={{ color: data.textColor }}>
                                {data.bonus1Title}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                                <div className="order-2 md:order-1">
                                    <p className="text-xl md:text-2xl font-bold mb-6 leading-relaxed"
                                       style={{ color: data.primaryColor }}>
                                        {data.bonus1Subtitle}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.bonus1Description}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.bonus1MainDescription}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.bonus1Conclusion}
                                    </p>
                                </div>
                                <div className="order-1 md:order-2">
                                    <FixedIntroImage
                                        src={data.bonus1Image}
                                        alt="Bônus 1 - Peças-chave"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 mt-12">
                                <FixedIntroImage
                                    src={data.bonus1ComplementaryImage}
                                    alt="Bônus 1 complementar"
                                    width={500}
                                    height={400}
                                    className="rounded-xl shadow-xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* 6. Bônus 2 - Visagismo */}
                {data.showBonuses && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
                        <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border`}
                             style={{ borderColor: `${data.primaryColor}30` }}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair leading-tight"
                                style={{ color: data.textColor }}>
                                {data.bonus2Title}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                                <div>
                                    <p className="text-xl md:text-2xl font-bold mb-6 leading-relaxed"
                                       style={{ color: data.primaryColor }}>
                                        {data.bonus2Subtitle}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.bonus2Description}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.bonus2MainDescription}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.bonus2Conclusion}
                                    </p>
                                </div>
                                <div>
                                    <FixedIntroImage
                                        src={data.bonus2Image}
                                        alt="Bônus 2 - Visagismo"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 mt-12">
                                <FixedIntroImage
                                    src={data.bonus2ComplementaryImage}
                                    alt="Bônus 2 complementar"
                                    width={500}
                                    height={400}
                                    className="rounded-xl shadow-xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* 7. Seção Mentora */}
                {data.showMentor && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
                        <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border`}
                             style={{ borderColor: `${data.primaryColor}30` }}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair leading-tight"
                                style={{ color: data.textColor }}>
                                {data.mentorTitle}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                                <div className="order-2 md:order-1">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4"
                                        style={{ color: data.primaryColor }}>
                                        {data.mentorName}
                                    </h3>
                                    <p className="text-xl font-semibold mb-6"
                                       style={{ color: data.secondaryColor }}>
                                        {data.mentorRole}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.mentorDescription1}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.mentorDescription2}
                                    </p>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.mentorDescription3}
                                    </p>
                                </div>
                                <div className="order-1 md:order-2">
                                    <FixedIntroImage
                                        src={data.mentorImage}
                                        alt={data.mentorName}
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 8. Seção Depoimentos */}
                {data.showTestimonials && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
                        <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border`}
                             style={{ borderColor: `${data.primaryColor}30` }}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair leading-tight"
                                style={{ color: data.textColor }}>
                                {data.testimonialsTitle}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                                <div>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.testimonialsDescription}
                                    </p>
                                    <blockquote className="text-xl md:text-2xl font-italic mb-6 p-6 rounded-lg border-l-4 shadow-inner"
                                                style={{ 
                                                    backgroundColor: `${data.primaryColor}20`,
                                                    borderColor: data.secondaryColor,
                                                    color: data.textColor
                                                }}>
                                        "{data.testimonialsQuote}"
                                    </blockquote>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.testimonialsConclusion}
                                    </p>
                                </div>
                                <div>
                                    <FixedIntroImage
                                        src={data.testimonialsImage}
                                        alt="Depoimentos"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 mt-12">
                                <FixedIntroImage
                                    src={data.testimonialsComplementaryImage}
                                    alt="Depoimentos complementares"
                                    width={500}
                                    height={400}
                                    className="rounded-xl shadow-xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="mt-12 text-center">
                                <a
                                    href={data.ctaUrl}
                                    onClick={() => handleCtaClick('testimonials_cta', data.testimonialsCtaText)}
                                    className="group inline-block px-12 py-5 text-white font-bold rounded-full text-xl md:text-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-light"
                                    style={{
                                        backgroundColor: data.primaryColor,
                                        boxShadow: `0 8px 20px ${data.primaryColor}80`
                                    }}
                                >
                                    {data.testimonialsCtaText}
                                    <ArrowRight size={24} className="inline ml-3 group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </section>
                )}

                {/* 9. Seção Garantia */}
                {data.showGuarantee && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
                        <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border`}
                             style={{ borderColor: `${data.primaryColor}30` }}>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair leading-tight"
                                style={{ color: data.textColor }}>
                                {data.guaranteeTitle}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                                <div className="order-2 md:order-1">
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.guaranteeDescription}
                                    </p>
                                    <div className="text-center mb-6">
                                        <span className="text-4xl md:text-6xl font-bold"
                                              style={{ color: data.primaryColor }}>
                                            {data.guaranteePrice}
                                        </span>
                                    </div>
                                    <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                       style={{ color: data.accentColor }}>
                                        {data.guaranteeConclusion}
                                    </p>
                                </div>
                                <div className="order-1 md:order-2">
                                    <FixedIntroImage
                                        src={data.guaranteeImage}
                                        alt="Garantia"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 mt-12">
                                <FixedIntroImage
                                    src={data.guaranteeComplementaryImage}
                                    alt="Garantia complementar"
                                    width={500}
                                    height={400}
                                    className="rounded-xl shadow-xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="mt-12 text-center">
                                <a
                                    href={data.ctaUrl}
                                    onClick={() => handleCtaClick('guarantee_cta', data.guaranteeCtaText)}
                                    className="group inline-block px-12 py-5 text-white font-bold rounded-full text-xl md:text-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-light"
                                    style={{
                                        backgroundColor: data.primaryColor,
                                        boxShadow: `0 8px 20px ${data.primaryColor}80`
                                    }}
                                >
                                    {data.guaranteeCtaText}
                                    <ArrowRight size={24} className="inline ml-3 group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </section>
                )}
                {/* Por brevidade, vou implementar apenas algumas seções principais */}

                {/* Seção Quiz/Solução */}
                <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
                    <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border text-center`}
                         style={{ borderColor: `${data.primaryColor}30` }}>
                        <div className={`mb-12 ${data.imageSize} mx-auto relative transform hover:scale-[1.02] transition-transform duration-500 ease-in-out`}>
                            <FixedIntroImage
                                src={data.solutionImage}
                                alt="Quiz de Estilo Gisele Galvão"
                                width={700}
                                height={525}
                                className="w-full h-auto rounded-xl shadow-2xl object-cover"
                            />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 font-playfair leading-tight"
                            style={{ color: data.textColor }}>
                            {data.solutionTitle}
                        </h2>
                        <p className="text-xl md:text-2xl mb-8 leading-relaxed"
                           style={{ color: data.accentColor }}>
                            {data.solutionDescription}
                        </p>
                        <a
                            href={data.ctaUrl}
                            onClick={() => handleCtaClick('solution_cta', data.solutionCtaText)}
                            className="inline-block text-white text-xl md:text-2xl py-4 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out btn-3d pulse-animation font-bold"
                            style={{
                                background: `linear-gradient(to right, ${data.primaryColor}, ${data.secondaryColor})`,
                                boxShadow: `0 8px 20px ${data.primaryColor}80`
                            }}
                        >
                            <span className="flex items-center justify-center gap-3">
                                <ShoppingBag size={24} className="transform group-hover:translate-x-1 transition-transform" />
                                <span>{data.solutionCtaText}</span>
                            </span>
                        </a>
                    </div>
                </section>

                {/* FAQ Section - se habilitada */}
                {data.showFaq && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding}`}
                             style={{ backgroundColor: `${data.primaryColor}10` }}>
                        <div className={`${data.containerMaxWidth} mx-auto text-center`}>
                            <div className="mb-10 flex justify-center">
                                <FixedIntroImage
                                    src={data.faqImage}
                                    alt="Perguntas estratégicas"
                                    width={600}
                                    height={380}
                                    className="rounded-xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
                                />
                            </div>
                            <FaqSectionNew 
                                title={data.faqTitle}
                                ctaText={data.faqCtaText}
                                ctaUrl={data.ctaUrl}
                            />
                            <div className="mt-12">
                                <a
                                    href={data.ctaUrl}
                                    onClick={() => handleCtaClick('faq_cta', data.faqCtaText)}
                                    className="group inline-block px-12 py-5 text-white font-bold rounded-full text-xl md:text-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse-light"
                                    style={{
                                        backgroundColor: data.primaryColor,
                                        boxShadow: `0 8px 20px ${data.primaryColor}80`
                                    }}
                                >
                                    {data.faqCtaText}
                                    <ArrowRight size={24} className="inline ml-3 group-hover:scale-110 transition-transform" />
                                </a>
                                <p className="mt-4 text-base flex items-center justify-center gap-2"
                                   style={{ color: data.accentColor }}>
                                    <Users size={16} />
                                    Junte-se a centenas de mulheres que já redescobriram sua confiança!
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default QuizOfferPageEditable;
