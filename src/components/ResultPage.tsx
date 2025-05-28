'use client'; // Adicionado para indicar que é um Client Component

import Link from 'next/link'; // Alterado de react-router-dom para next/link
import { useEffect, useState, Suspense } from 'react'; // Adicionado Suspense
import dynamic from 'next/dynamic'; // Adicionado para importações dinâmicas

// Importações de componentes UI (suposições baseadas nos nomes e na busca de arquivos)
import { Button } from '@/components/ui/button'; // Suposição
import { Card } from '@/components/ui/card'; // Suposição
import { Progress } from '@/components/ui/progress'; // Suposição
// import ResourcePreloader from '@/components/ui/ResourcePreloader'; // Placeholder, verificar nome/local correto
// import PerformanceMonitor from '@/components/ui/PerformanceMonitor'; // Placeholder
import { ShoppingCart } from 'lucide-react'; // Suposição, verificar se é usado diretamente ou via componente wrapper

// Importações de componentes compartilhados/seções (suposições)
// import AnimatedWrapper from '@/components/shared/AnimatedWrapper'; // Placeholder
// import SectionTitle from '@/components/shared/SectionTitle'; // Placeholder
// import ProgressiveImage from '@/components/shared/ProgressiveImage'; // Placeholder
// import LoadingSpinner from '@/components/shared/LoadingSpinner'; // Placeholder

// Importações dinâmicas para componentes maiores/seções
const SecondaryStylesSection = dynamic(() => import('@/components/result/SecondaryStylesSection').catch(() => () => <div>Falha ao carregar SecondaryStylesSection</div>), { loading: () => <p>Carregando estilos secundários...</p>, ssr: false }); // Suposição de caminho
const BeforeAfterTransformation = dynamic(() => import('@/components/result/BeforeAfterTransformation').catch(() => () => <div>Falha ao carregar BeforeAfterTransformation</div>), { loading: () => <p>Carregando transformações...</p>, ssr: false }); // Suposição de caminho
const MotivationSection = dynamic(() => import('@/components/result/MotivationSection').catch(() => () => <div>Falha ao carregar MotivationSection</div>), { loading: () => <p>Carregando motivação...</p>, ssr: false }); // Suposição de caminho
const BonusSection = dynamic(() => import('@/components/result/BonusSection').catch(() => () => <div>Falha ao carregar BonusSection</div>), { loading: () => <p>Carregando bônus...</p>, ssr: false }); // Suposição de caminho
const TestimonialsSection = dynamic(() => import('@/components/result/TestimonialsSection').catch(() => () => <div>Falha ao carregar TestimonialsSection</div>), { loading: () => <p>Carregando depoimentos...</p>, ssr: false }); // Suposição de caminho
const GuaranteeSection = dynamic(() => import('@/components/result/GuaranteeSection').catch(() => () => <div>Falha ao carregar GuaranteeSection</div>), { loading: () => <p>Carregando garantia...</p>, ssr: false }); // Suposição de caminho
const MentorSection = dynamic(() => import('@/components/result/MentorSection').catch(() => () => <div>Falha ao carregar MentorSection</div>), { loading: () => <p>Carregando mentora...</p>, ssr: false }); // Suposição de caminho
const EnhancedPricingSection = dynamic(() => import('@/components/result/EnhancedPricingSection').catch(() => () => <div>Falha ao carregar EnhancedPricingSection</div>), { loading: () => <p>Carregando preços...</p>, ssr: false });

interface ResultPageContentProps {
  id?: string; 
  // TODO: Adicionar props para os dados do resultado do quiz
  // Ex: quizData: QuizResultData;
  // userName: string;
  // userCategory: string;
  // etc.
}

// TODO: Definir uma interface para os dados do resultado do quiz
// interface QuizResultData {
//   userName: string;
//   category: string;
//   primaryStyle: { percentage: number };
//   secondaryStyles: any[]; // Definir tipo específico
//   image: string;
//   guideImage: string;
//   // ... outros dados necessários
// }

export default function ResultPageContent({ id }: ResultPageContentProps) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null); 

  const [user, setUser] = useState({ userName: 'Usuário' }); 
  const [category, setCategory] = useState<string>('Elegante'); // Especificar o tipo como string
  const [primaryStyle, setPrimaryStyle] = useState({ percentage: 85 }); 
  const [secondaryStyles, setSecondaryStyles] = useState<any[]>([]); // Especificar o tipo como array
  const [image, setImage] = useState('https://via.placeholder.com/400x500'); 
  const [guideImage, setGuideImage] = useState('https://via.placeholder.com/800x600'); 
  
  const [tokens, setTokens] = useState({ 
    colors: { 
      backgroundCard: '#ffffff', 
      border: '#e0e0e0', 
      borderLight: '#f0f0f0',
      borderAccent: '#aa6b5d',
      text: '#333333', 
      textMuted: '#777777',
      textSecondary: '#555555',
      primary: '#B89B7A', 
      secondary: '#aa6b5d', 
      backgroundAlt: '#f9f9f9' 
    }, 
    gradients: { 
      primary: 'linear-gradient(to right, #B89B7A, #aa6b5d)',
      background: 'linear-gradient(to bottom, #fdfbfb, #ebedee)'
    }, 
    shadows: { 
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      cta: '0 4px 14px 0 rgba(184, 155, 122, 0.39)'
    } 
  });
  const [globalStyles, setGlobalStyles] = useState({ logo: 'https://via.placeholder.com/150x60', logoAlt: 'Logo', logoHeight: '60px' }); 
  const [isLowPerformance, setIsLowPerformance] = useState(false); 

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({}); 

  const scrollToSection = (sectionId: string) => {
    console.log('Scroll to', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTAClick = () => {
    console.log('CTA Clicked');
    // TODO: Implementar lógica de analytics e redirecionamento/compra
    // if (typeof window !== 'undefined' && window.analytics) {
    //   window.analytics.track('CTA Clicked', { pageId: id, category });
    // }
  };
  
  useEffect(() => {
    // TODO: Substituir mock por carregamento real de dados do quiz
    const timer = setTimeout(() => {
      setResult({
        title: 'Seu Resultado Personalizado',
        description: 'Com base nas suas respostas, preparamos este resultado especial para você.',
      });
      // Exemplo de como os dados do quiz poderiam ser setados:
      // const quizResultData = JSON.parse(localStorage.getItem('quizResults') || '{}');
      // if (quizResultData && quizResultData.userName) {
      //   setUser({ userName: quizResultData.userName });
      //   setCategory(quizResultData.category || 'Elegante');
      //   setPrimaryStyle(quizResultData.primaryStyle || { percentage: 85 });
      //   setSecondaryStyles(quizResultData.secondaryStyles || []);
      //   setImage(quizResultData.image || 'https://via.placeholder.com/400x500');
      //   setGuideImage(quizResultData.guideImage || 'https://via.placeholder.com/800x600');
      // }
      setLoading(false);
    }, 1000);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBottomBar(window.scrollY < document.body.scrollHeight - window.innerHeight - 200);
      
      const sections = ['primary-style', 'transformations', 'motivation', 'bonuses', 'testimonials', 'guarantee', 'cta'];
      let currentSection = '';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && element.getBoundingClientRect().top < window.innerHeight / 2) {
          currentSection = sectionId;
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id]); 
  
  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Carregando seu resultado...</div>; // TODO: Usar LoadingSpinner
  }
  
  return (
    <>
      {/* <ResourcePreloader /> */} 
      {/* <PerformanceMonitor /> */} 
      
      <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" 
           style={{ background: 'radial-gradient(circle, rgba(184, 155, 122, 0.1) 0%, rgba(184, 155, 122, 0.05) 100%)' }}></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" 
           style={{ background: 'radial-gradient(circle, rgba(170, 107, 93, 0.1) 0%, rgba(170, 107, 93, 0.05) 100%)' }}></div>
      <div className="absolute top-1/3 left-0 w-1/5 h-1/5 rounded-full blur-3xl -translate-x-1/2" 
           style={{ background: tokens.gradients.background }}></div>
      
      <header className="py-4 px-6 sticky top-0 z-50" 
              style={{ backgroundColor: `${tokens.colors.backgroundCard}CC`, backdropFilter: 'blur(8px)' }}>
        <div className="container mx-auto max-w-4xl flex justify-center">
          <img
            src={globalStyles.logo}
            alt={globalStyles.logoAlt || "Logo"}
            style={{ height: globalStyles.logoHeight || '60px' }}
            className="h-auto object-contain"
          />
        </div>
      </header>

      <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-2">
          {[
            { id: 'primary-style', label: 'Seu Estilo' },
            { id: 'transformations', label: 'Transformações' },
            { id: 'motivation', label: 'Motivação' },
            { id: 'bonuses', label: 'Bônus' },
            { id: 'testimonials', label: 'Depoimentos' },
            { id: 'guarantee', label: 'Garantia' },
            { id: 'cta', label: 'Adquirir' }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="w-2 h-2 rounded-full transition-all duration-300 shadow-sm"
              style={{
                background: activeSection === section.id ? tokens.gradients.primary : tokens.colors.borderLight,
                transform: activeSection === section.id ? 'scale(1.25)' : 'scale(1)'
              }}
              aria-label={`Ir para seção ${section.label}`}
              title={section.label}
            />
          ))}
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 py-3 px-4 z-40 transition-transform duration-500 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}
           style={{ 
             backgroundColor: tokens.colors.backgroundCard, 
             boxShadow: tokens.shadows.lg,
             borderTop: `1px solid ${tokens.colors.border}`
           }}>
        <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium" style={{ color: tokens.colors.text }}>
              Guia de Estilo e Imagem + Bônus
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="text-2xl font-bold whitespace-nowrap" 
                    style={{ 
                      background: tokens.gradients.primary, 
                      backgroundClip: 'text', 
                      WebkitBackgroundClip: 'text', 
                      color: 'transparent' 
                    }}>
                5x R$ 8,83
              </span>
              <span className="text-xs whitespace-nowrap" style={{ color: tokens.colors.textMuted }}>sem juros</span>
              <span className="text-xs font-normal whitespace-nowrap" style={{ color: tokens.colors.textMuted }}>ou R$ 39,90 à vista</span>
            </div>
          </div>
          <Button 
            onClick={handleCTAClick} 
            className="text-sm sm:text-base leading-none py-3 px-6 rounded-md transition-all duration-300 w-full sm:w-auto cursor-pointer border-0"
            style={{
              background: tokens.gradients.primary,
              boxShadow: tokens.shadows.cta,
              transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
              color: '#ffffff' 
            }}
            onMouseEnter={() => setIsButtonHovered(true)} 
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className="h-4 w-4" /> 
              Adquirir Agora
            </span>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-8 max-w-4xl relative z-10">
        <section id="primary-style" className="scroll-mt-20">
          <Card className="p-6 lg:p-8 mb-12 rounded-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-12 lg:w-16 h-12 lg:h-16 rounded-tl-xl"
                 style={{ 
                   borderTop: `2px solid ${tokens.colors.borderAccent}`,
                   borderLeft: `2px solid ${tokens.colors.borderAccent}`
                 }}></div>
            <div className="absolute bottom-0 right-0 w-12 lg:w-16 h-12 lg:h-16 rounded-br-xl"
                 style={{ 
                   borderBottom: `2px solid ${tokens.colors.borderAccent}`,
                   borderRight: `2px solid ${tokens.colors.borderAccent}`
                 }}></div>
            
            {/* <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}> */} 
            <div>
              <div className="text-center mb-8">
                {user?.userName && (
                  // <AnimatedWrapper className="mb-6" animation="scale" show={true} duration={500} delay={200}>
                  <div className="mb-6">
                    <span className="text-xl lg:text-2xl font-bold"
                          style={{ 
                            background: tokens.gradients.primary, 
                            backgroundClip: 'text', 
                            WebkitBackgroundClip: 'text', 
                            color: 'transparent' 
                          }}>
                      Parabéns, {user.userName}!
                    </span>
                    <div className="w-12 h-px mx-auto mt-2" style={{ background: tokens.gradients.primary }}></div>
                  </div>
                  // </AnimatedWrapper>
                )}
                
                <h1 className="text-xl lg:text-3xl font-playfair mb-6 leading-tight" 
                    style={{ color: tokens.colors.text }}>
                  Descobrimos Seu Estilo Predominante:
                  <br />
                  <span className="text-2xl lg:text-4xl font-bold" 
                        style={{ 
                          background: tokens.gradients.primary, 
                          backgroundClip: 'text', 
                          WebkitBackgroundClip: 'text', 
                          color: 'transparent' 
                        }}>
                    {category}
                  </span>
                </h1>
                
                <div className="max-w-md mx-auto mb-6">
                  <div className="flex items-center justify-end text-sm mb-2">
                    <span className="font-medium" style={{ color: tokens.colors.textMuted }}>
                      {primaryStyle.percentage}%
                    </span>
                  </div>
                  <Progress value={primaryStyle.percentage} className="h-2" /> 
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6 order-2 lg:order-1">
                  {/* <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}> */}
                  <div>
                    <div className="space-y-4">
                      <p className="leading-relaxed text-base lg:text-lg font-medium" 
                         style={{ color: tokens.colors.text }}>
                        <strong>Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                      </p>
                      
                      <div className="rounded-lg p-4" 
                           style={{ 
                             background: tokens.gradients.background,
                             border: `1px solid ${tokens.colors.borderLight}`,
                             boxShadow: tokens.shadows.sm 
                           }}>
                        <p className="text-sm lg:text-base leading-relaxed" style={{ color: tokens.colors.text }}>
                          <strong>Seu estilo {category}</strong> revela uma mulher que {
                            category === 'Natural' ? 'valoriza autenticidade e conforto, sem abrir mão da elegância natural' :
                            category === 'Clássico' ? 'aprecia sofisticação atemporal e peças que nunca saem de moda' :
                            category === 'Contemporâneo' ? 'está sempre em sintonia com as tendências, mas de forma equilibrada' :
                            category === 'Elegante' ? 'irradia refinamento e classe em cada detalhe do seu visual' :
                            category === 'Romântico' ? 'expressa delicadeza e feminilidade através de looks encantadores' :
                            category === 'Sexy' ? 'tem confiança para valorizar sua sensualidade de forma elegante' :
                            category === 'Dramático' ? 'não tem medo de fazer declarações ousadas com seu estilo' :
                            'expressa criatividade e originalidade em cada combinação de roupas'
                          }.
                        </p>
                      </div>
                      
                      <p className="text-sm lg:text-base" style={{ color: tokens.colors.textSecondary }}>
                        <strong>Chega de ficar perdida no guarda-roupa ou comprar peças que não combinam com você!</strong>
                      </p>
                    </div>
                  </div>
                  {/* </AnimatedWrapper> */}

                  {/* <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}> */}
                  <div>
                    <div className="rounded-lg p-5" 
                         style={{ 
                           background: tokens.gradients.background,
                           border: `1px solid ${tokens.colors.borderLight}`,
                           boxShadow: tokens.shadows.sm 
                         }}>
                      <h3 className="text-lg font-medium mb-3" style={{ color: tokens.colors.secondary }}>
                        Estilos que Também Influenciam Você
                      </h3>
                      <Suspense fallback={<p>Carregando estilos secundários...</p>}>
                        <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                      </Suspense>
                    </div>
                  </div>
                  {/* </AnimatedWrapper> */}
                </div>

                {/* <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={500} className="order-1 lg:order-2"> */}
                <div className="order-1 lg:order-2">
                  <div className="w-full max-w-xs lg:max-w-sm mx-auto relative"> 
                    {/* <ProgressiveImage src={image} placeholderSrc={`${image}?q=10&f=auto&w=50`} alt={`Estilo ${category}`} width={400} height={500} ... /> */}
                    <img 
                      src={`${image}?q=85&f=auto&w=400`} 
                      alt={`Estilo ${category}`} 
                      width={400} 
                      height={500} 
                      className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-105" 
                      style={{ boxShadow: tokens.shadows.md }}
                      onLoad={() => setImagesLoaded((prev: any) => ({ ...prev, style: true }))}
                    />
                    
                    <div className="absolute -top-2 -right-2 w-8 lg:w-10 h-8 lg:h-10 rounded-tr-lg"
                         style={{ 
                           borderTop: `2px solid ${tokens.colors.primary}`,
                           borderRight: `2px solid ${tokens.colors.primary}`
                         }}></div>
                    <div className="absolute -bottom-2 -left-2 w-8 lg:w-10 h-8 lg:h-10 rounded-bl-lg"
                         style={{ 
                           borderBottom: `2px solid ${tokens.colors.primary}`,
                           borderLeft: `2px solid ${tokens.colors.primary}`
                         }}></div>
                    
                    <div className="absolute -top-3 -left-3 px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium transform -rotate-12"
                         style={{ 
                           background: tokens.gradients.primary,
                           boxShadow: tokens.shadows.sm,
                           color: '#ffffff'
                         }}>
                      {category}
                    </div>
                  </div>
                </div>
                {/* </AnimatedWrapper> */}
              </div>
              
              {/* <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800}> */}
              <div>
                <div className="mt-12 max-w-2xl mx-auto relative">
                  <h3 className="text-xl lg:text-2xl font-medium text-center mb-6" 
                      style={{ color: tokens.colors.secondary }}>
                    Seu Guia de Estilo Personalizado
                  </h3>
                  {/* <ProgressiveImage src={guideImage} placeholderSrc={`${guideImage}?q=10&f=auto&w=100`} alt={`Guia de Estilo ${category}`} ... /> */}
                  <img 
                    src={`${guideImage}?q=85&f=auto&w=800`} 
                    alt={`Guia de Estilo ${category}`} 
                    className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-102" 
                    style={{ boxShadow: tokens.shadows.lg }}
                    onLoad={() => setImagesLoaded((prev: any) => ({ ...prev, guide: true }))} 
                  />
                  
                  <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-medium transform rotate-12"
                       style={{ 
                         background: tokens.gradients.primary,
                         boxShadow: tokens.shadows.sm,
                         color: '#ffffff'
                       }}>
                    Exclusivo
                  </div>
                </div>
              </div>
              {/* </AnimatedWrapper> */}
            </div>
            {/* </AnimatedWrapper> */} 
          </Card>
        </section>

        <section id="transformations" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          {/* <SectionTitle title="Resultados que Falam por Si" subtitle="Veja como mulheres descobriram sua melhor versão..." /> */}
          <h2 className="text-center text-2xl font-bold mb-2" style={{color: tokens.colors.text}}>Resultados que Falam por Si</h2>
          <p className="text-center text-muted-foreground mb-8" style={{color: tokens.colors.textMuted}}>Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber</p>
          <Suspense fallback={<p>Carregando transformações...</p>}> 
            {/* <AnimatedWrapper ...> */}
              <BeforeAfterTransformation />
            {/* </AnimatedWrapper> */}
          </Suspense>
        </section>

        <section id="motivation" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          {/* <SectionTitle title="A Ciência Por Trás do Seu Estilo" subtitle={`Por que mulheres com seu perfil ${category} conquistam...`} /> */}
          <h2 className="text-center text-2xl font-bold mb-2" style={{color: tokens.colors.text}}>A Ciência Por Trás do Seu Estilo</h2>
          <p className="text-center text-muted-foreground mb-8" style={{color: tokens.colors.textMuted}}>{`Por que mulheres com seu perfil ${category} conquistam mais confiança e oportunidades`}</p>
          <Suspense fallback={<p>Carregando motivação...</p>}>
            {/* <AnimatedWrapper ...> */}
              <MotivationSection />
            {/* </AnimatedWrapper> */}
          </Suspense>
        </section>
        
        <section id="bonuses" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          {/* <SectionTitle title="Bônus Exclusivos" subtitle={`Ferramentas extras para potencializar uma Imagem de Sucesso ${category}`} /> */}
          <h2 className="text-center text-2xl font-bold mb-2" style={{color: tokens.colors.text}}>Bônus Exclusivos</h2>
          <p className="text-center text-muted-foreground mb-8" style={{color: tokens.colors.textMuted}}>{`Ferramentas extras para potencializar uma Imagem de Sucesso ${category}`}</p>
          <Suspense fallback={<p>Carregando bônus...</p>}>
            {/* <AnimatedWrapper ...> */}
              <BonusSection />
            {/* </AnimatedWrapper> */}
          </Suspense>
        </section>
        
        <section id="testimonials" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          {/* <SectionTitle title="Resultados Reais" subtitle={`O que mulheres ${category} estão dizendo sobre sua transformação`} /> */}
          <h2 className="text-center text-2xl font-bold mb-2" style={{color: tokens.colors.text}}>Resultados Reais</h2>
          <p className="text-center text-muted-foreground mb-8" style={{color: tokens.colors.textMuted}}>{`O que mulheres ${category} estão dizendo sobre sua transformação`}</p>
          <Suspense fallback={<p>Carregando depoimentos...</p>}>
            <TestimonialsSection />
          </Suspense>
        </section>
        
        <section id="guarantee" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          {/* <SectionTitle title="Garantia Total" /> */}
          <h2 className="text-center text-2xl font-bold mb-8" style={{color: tokens.colors.text}}>Garantia Total</h2>
          <Suspense fallback={<p>Carregando garantia...</p>}>
            {/* <AnimatedWrapper ...> */}
              <GuaranteeSection />
            {/* </AnimatedWrapper> */}
          </Suspense>
        </section>
        
        <section id="mentor" className="scroll-mt-20 mb-12 md:mb-16 lg:mb-20">
          {/* <SectionTitle title="Conheça Sua Mentora" subtitle="Especialista que já guiou mais de 10.000 mulheres..." /> */}
          <h2 className="text-center text-2xl font-bold mb-2" style={{color: tokens.colors.text}}>Conheça Sua Mentora</h2>
          <p className="text-center text-muted-foreground mb-8" style={{color: tokens.colors.textMuted}}>Especialista que já guiou mais de 10.000 mulheres na descoberta do seu estilo autêntico</p>
          <Suspense fallback={<p>Carregando informações da mentora...</p>}>
            {/* <AnimatedWrapper ...> */}
              <MentorSection />
            {/* </AnimatedWrapper> */}
          </Suspense>
        </section>

        <Suspense fallback={<p>Carregando preços...</p>}>
          <EnhancedPricingSection />
        </Suspense>

        <div className="mb-16 md:mb-24"></div>
      </div>
    </>
  );
}
