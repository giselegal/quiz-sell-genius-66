"use client";
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
    // Padding/Margem por seção (opcional)
    heroPadding?: string;
    problemPadding?: string;
    solutionPadding?: string;
    benefitsPadding?: string;
    bonus1Padding?: string;
    bonus2Padding?: string;
    mentorPadding?: string;
    testimonialsPadding?: string;
    guaranteePadding?: string;
    faqPadding?: string;
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
// Componente de vagas limitadas
const LimitedSpotsIndicator = ({ show }: { show: boolean }) => {
    const spotsFilled = 86; // Porcentagem de vagas preenchidas
        <div className="bg-[#FEF3E2] text-[#7C2D12] p-4 rounded-lg shadow-md flex items-center justify-between max-w-md mx-auto mb-6 border border-[#F97316]/30">
                <TrendingUp size={20} className="text-[#F97316] mr-2" />
                    <p className="font-medium text-[#7C2D12]">Vagas limitadas para hoje!</p>
                    <p className="text-sm text-[#9A3412]">Apenas 14 vagas restantes</p>
            <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#F97316] rounded-full"
                    style={{ width: `${spotsFilled}%` }}
                ></div>
// Componente FAQ (mantido)
const FaqSectionNew = ({ title, ctaText, ctaUrl }: { title: string; ctaText: string; ctaUrl: string }) => {
    const [openItem, setOpenItem] = React.useState(null);
    const faqItems = [
        {
            question: "Quanto tempo leva para fazer o quiz?",
            answer: "O quiz leva entre 5 a 10 minutos para ser concluído. São perguntas simples e intuitivas sobre suas preferências de estilo, personalidade e estilo de vida."
        },
            question: "Posso refazer o quiz se não gostar do resultado?",
            answer: "Sim! Você pode refazer o quiz quantas vezes quiser. Às vezes, conforme evoluímos, nosso estilo também evolui."
            question: "Os guias são específicos para cada tipo físico?",
            answer: "Sim! Cada guia é desenvolvido considerando diferentes tipos físicos e como valorizar suas características únicas através do seu estilo predominante."
            question: "Como recebo os materiais após fazer o quiz?",
            answer: "Imediatamente após completar sua compra, você receberá um e-mail com acesso à plataforma onde estão todos os seus guias e materiais."
            question: "Existe garantia?",
            answer: "Sim! Oferecemos 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeita, devolvemos 100% do seu investimento."
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
        if (typeof window !== 'undefined' && 'performance' in window) {
            window.performance.mark('offer-page-mounted');
    }, [data]);
    const dynamicStyles = {
        '--primary-color': data.primaryColor,
        '--secondary-color': data.secondaryColor,
        '--accent-color': data.accentColor,
        '--border-radius': `${data.borderRadius}px`,
        '--spacing': `${data.spacing}px`,
        '--shadow-intensity': `${data.shadowIntensity}px`,
    } as React.CSSProperties;
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
            </header>
            <main className={`relative z-10 flex flex-col gap-y-8 md:gap-y-12`}>
                {/* 1. Headline e Subheadline */}
                <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.heroPadding || data.sectionPadding} ${data.containerMaxWidth}`}>
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
                            {/* Decorative overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 rounded-tr-lg"
                                 style={{ borderColor: data.primaryColor }}></div>
                            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 rounded-bl-lg"
                        </div>
                        <a
                            href={data.ctaUrl}
                            onClick={() => handleCtaClick('hero_cta', data.heroCtaText)}
                            className="inline-block text-white text-xl md:text-2xl py-4 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out btn-3d pulse-animation font-bold"
                            style={{
                                background: `linear-gradient(to right, ${data.primaryColor}, ${data.secondaryColor})`,
                                boxShadow: `0 8px 20px ${data.primaryColor}80`
                            }}
                            <span className="flex items-center justify-center gap-3">
                                <ShoppingBag size={24} className="transform group-hover:translate-x-1 transition-transform" />
                                <span>{data.heroCtaText}</span>
                            </span>
                        </a>
                        {data.showCountdown && (
                            <div className="mt-6 flex justify-center">
                                <CountdownTimer />
                </section>
                {/* 2. Identificação do Problema */}
                <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.problemPadding || data.sectionPadding} ${data.containerMaxWidth}`} 
                         style={{ backgroundColor: data.backgroundColor }}>
                    <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border`}
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center font-playfair leading-tight"
                            {data.problemTitle}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                            <div className="order-2 md:order-1">
                                <p className="text-lg md:text-xl mb-6 leading-relaxed"
                                   style={{ color: data.accentColor }}>
                                    {data.problemDescription}
                                </p>
                                    {data.problemParagraph1}
                                    {data.problemParagraph2}
                                    {data.problemParagraph3}
                            <div className="order-1 md:order-2">
                                <FixedIntroImage
                                    src={data.problemImage}
                                    alt="Problema do guarda-roupa"
                                    width={600}
                                    height={480}
                                    className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                />
                        <p className="text-xl md:text-2xl font-extrabold mb-10 leading-relaxed p-4 rounded-lg border-l-4 shadow-inner"
                           style={{ 
                               color: data.textColor, 
                               backgroundColor: `${data.primaryColor}20`,
                               borderColor: data.secondaryColor 
                           }}>
                            {data.problemConclusion}
                {/* 3. Seção Solução (Quiz) */}
                <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.solutionPadding || data.sectionPadding} ${data.containerMaxWidth}`}>
                    <div className={`bg-white ${data.cardPadding} rounded-2xl shadow-xl border text-center`}
                            {data.solutionTitle}
                            <div>
                                    {data.solutionDescription}
                                    {data.solutionParagraph1}
                                    {data.solutionParagraph2}
                                    {data.solutionParagraph3}
                                    {data.solutionParagraph4}
                                    src={data.solutionImage}
                                    alt="Solução do quiz"
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
                {/* 4. Seção Benefícios dos Guias */}
                {data.showBonuses && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.benefitsPadding || data.sectionPadding} ${data.containerMaxWidth}`}>
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
                                        {data.benefitsMainDescription}
                                    <p className="text-xl md:text-2xl font-bold mb-6 leading-relaxed"
                                       style={{ color: data.primaryColor }}>
                                        {data.benefitsSubtitle}
                                        {data.benefitsConclusion}
                                </div>
                                    <FixedIntroImage
                                        src={data.benefitsImage}
                                        alt="Benefícios dos guias"
                                        width={600}
                                        height={480}
                                        className="rounded-xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
                                    />
                            <div className="grid md:grid-cols-2 gap-8 mt-12">
                                    src={data.benefitsComplementaryImage}
                                    alt="Benefícios complementares"
                                    width={500}
                                    height={400}
                                    className="rounded-xl shadow-xl mx-auto transform hover:scale-105 transition-transform duration-300"
                    </section>
                )}
                {/* 5. Bônus 1 - Peças-Chave */}
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.bonus1Padding || data.sectionPadding} ${data.containerMaxWidth}`}>
                                {data.bonus1Title}
                                <div className="order-2 md:order-1">
                                        {data.bonus1Subtitle}
                                        {data.bonus1Description}
                                        {data.bonus1MainDescription}
                                        {data.bonus1Conclusion}
                                <div className="order-1 md:order-2">
                                        src={data.bonus1Image}
                                        alt="Bônus 1 - Peças-chave"
                                    src={data.bonus1ComplementaryImage}
                                    alt="Bônus 1 complementar"
                {/* 6. Bônus 2 - Visagismo */}
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.bonus2Padding || data.sectionPadding} ${data.containerMaxWidth}`}>
                                {data.bonus2Title}
                                        {data.bonus2Subtitle}
                                        {data.bonus2Description}
                                        {data.bonus2MainDescription}
                                        {data.bonus2Conclusion}
                                        src={data.bonus2Image}
                                        alt="Bônus 2 - Visagismo"
                                    src={data.bonus2ComplementaryImage}
                                    alt="Bônus 2 complementar"
                {/* 7. Seção Mentora */}
                {data.showMentor && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.mentorPadding || data.sectionPadding} ${data.containerMaxWidth}`}>
                                {data.mentorTitle}
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4"
                                        style={{ color: data.primaryColor }}>
                                        {data.mentorName}
                                    </h3>
                                    <p className="text-xl font-semibold mb-6"
                                       style={{ color: data.secondaryColor }}>
                                        {data.mentorRole}
                                        {data.mentorDescription1}
                                        {data.mentorDescription2}
                                        {data.mentorDescription3}
                                        src={data.mentorImage}
                                        alt={data.mentorName}
                {/* 8. Seção Depoimentos */}
                {data.showTestimonials && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.testimonialsPadding || data.sectionPadding} ${data.containerMaxWidth}`}>
                                {data.testimonialsTitle}
                                        {data.testimonialsDescription}
                                    <blockquote className="text-xl md:text-2xl font-italic mb-6 p-6 rounded-lg border-l-4 shadow-inner"
                                                style={{ 
                                                    backgroundColor: `${data.primaryColor}20`,
                                                    borderColor: data.secondaryColor,
                                                    color: data.textColor
                                                }}>
                                        "{data.testimonialsQuote}"
                                    </blockquote>
                                        {data.testimonialsConclusion}
                                        src={data.testimonialsImage}
                                        alt="Depoimentos"
                                    src={data.testimonialsComplementaryImage}
                                    alt="Depoimentos complementares"
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
                {/* 9. Seção Garantia */}
                {data.showGuarantee && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.guaranteePadding || data.sectionPadding} ${data.containerMaxWidth}`}>
                                {data.guaranteeTitle}
                                        {data.guaranteeDescription}
                                    <div className="text-center mb-6">
                                        <span className="text-4xl md:text-6xl font-bold"
                                              style={{ color: data.primaryColor }}>
                                            {data.guaranteePrice}
                                        </span>
                                    </div>
                                        {data.guaranteeConclusion}
                                        src={data.guaranteeImage}
                                        alt="Garantia"
                                    src={data.guaranteeComplementaryImage}
                                    alt="Garantia complementar"
                                    onClick={() => handleCtaClick('guarantee_cta', data.guaranteeCtaText)}
                                    {data.guaranteeCtaText}
                {/* 10. FAQ */}
                {data.showFaq && (
                    <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.faqPadding || data.sectionPadding} ${data.containerMaxWidth}`}>
                            <FaqSectionNew 
                                title={data.faqTitle} 
                                ctaText={data.faqCtaText} 
                                ctaUrl={data.ctaUrl} 
            </main>
export default QuizOfferPageEditable;
