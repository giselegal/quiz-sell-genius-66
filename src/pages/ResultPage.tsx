// ✅ VERSÃO FUNCIONAL BÁSICA - 23/05/2025
import React, { useEffect, useState, useCallback } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Shield, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackButtonClick } from '@/utils/analytics';
import { useAuth } from '@/context/AuthContext';

const ResultPage: React.FC = () => {
  console.log('ResultPage: Iniciando renderização');

  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  
  console.log('ResultPage: primaryStyle', primaryStyle);

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);

  const handleScroll = useCallback(() => {
    try {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollY + windowHeight >= documentHeight - 800;
      setShowBottomBar(scrolledToBottom);
    } catch (error) {
      console.error('Erro no handleScroll:', error);
    }
  }, []);

  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);
  }, [primaryStyle]);

  useEffect(() => {
    try {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } catch (error) {
      console.error('Erro no useEffect scroll:', error);
    }
  }, [handleScroll]);

  // EARLY RETURNS SIMPLIFICADOS
  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf7]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#432818] mb-4">Ops! Algo deu errado</h2>
          <p className="text-[#8F7A6A] mb-6">Não conseguimos carregar seu resultado.</p>
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  const { category } = primaryStyle;
  const styleData = styleConfig[category];
  
  if (!styleData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf7]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#432818] mb-4">Estilo não encontrado</h2>
          <p className="text-[#8F7A6A] mb-6">Não conseguimos encontrar informações sobre seu estilo.</p>
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }
  
  const { image, guideImage } = styleData;

  const handleCTAClick = useCallback((e: React.MouseEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      
      trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
      
      if (window.innerWidth >= 768) {
        window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
      } else {
        window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
      }
    } catch (error) {
      console.error('Erro no handleCTAClick:', error);
    }
  }, []);

  console.log('ResultPage: Renderizando página principal');

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles?.backgroundColor || '#fffaf7',
      color: globalStyles?.textColor || '#432818',
      fontFamily: globalStyles?.fontFamily || 'inherit'
    }}>
      
      {/* Header básico */}
      <header className="py-4 px-6 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl flex justify-center">
          {globalStyles?.logo ? (
            <img
              src={globalStyles.logo}
              alt={globalStyles.logoAlt || "Logo"}
              style={{ height: globalStyles.logoHeight || '60px' }}
              className="h-auto object-contain"
            />
          ) : (
            <div className="h-[60px] flex items-center text-[#432818] font-bold">
              Estilo & Imagem
            </div>
          )}
        </div>
      </header>

      {/* Sticky CTA */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-[#B89B7A]/20 py-3 px-4 z-40 transition-transform duration-500 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-[#432818]">Guia de Estilo e Imagem + Bônus</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="text-xs text-[#8F7A6A]">5x de</span>
              <span className="text-xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">R$ 8,83</span>
              <span className="text-xs text-[#8F7A6A]">ou R$ 39,90 à vista</span>
            </div>
          </div>
          <Button 
            onClick={handleCTAClick} 
            className="text-white py-3 px-6 rounded-md shadow-md transition-all duration-300 w-full sm:w-auto"
            style={{
              background: 'linear-gradient(to right, #B89B7A, #aa6b5d)',
              boxShadow: '0 4px 14px rgba(184, 155, 122, 0.4)',
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adquirir Agora
          </Button>
        </div>
      </div>

      {/* CONTAINER PRINCIPAL */}
      <div className="container mx-auto px-6 lg:px-8 py-8 max-w-4xl relative z-10">
        
        {/* Primary Style Card */}
        <section id="primary-style" className="scroll-mt-20">
          <Card className="p-6 lg:p-8 mb-12 bg-white border border-[#B89B7A]/20 rounded-xl">
            <div className="text-center mb-8">
              {user?.userName && (
                <span className="text-xl lg:text-2xl text-[#aa6b5d] font-bold mb-4 block">
                  Parabéns, {user.userName}!
                </span>
              )}
              
              <h1 className="text-xl lg:text-3xl font-playfair text-[#432818] mb-6 leading-tight">
                Descobrimos Seu Estilo Predominante:
                <br />
                <span className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
                  {category}
                </span>
              </h1>

              <div className="max-w-md mx-auto mb-6">
                <div className="flex items-center justify-end text-sm text-[#8F7A6A] mb-2">
                  <span className="font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress 
                  value={primaryStyle.percentage} 
                  className="h-2 bg-[#F5F2EC] rounded-full overflow-hidden" 
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="space-y-4">
                  <p className="text-[#432818] leading-relaxed text-base lg:text-lg font-medium">
                    <strong>Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                  </p>
                  
                  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-4 border border-[#B89B7A]/10">
                    <p className="text-[#432818] text-sm lg:text-base leading-relaxed">
                      <strong>Seu estilo {category}</strong> revela uma mulher única e especial.
                    </p>
                  </div>
                  
                  <p className="text-[#8F7A6A] text-sm lg:text-base">
                    <strong>Problema resolvido:</strong> Chega de ficar perdida no guarda-roupa!
                  </p>
                </div>

                {/* SECONDARY STYLES INLINE SIMPLES */}
                {secondaryStyles && secondaryStyles.length > 0 && (
                  <div className="bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef] rounded-lg p-5 border border-[#B89B7A]/10">
                    <h3 className="text-lg font-medium text-[#aa6b5d] mb-3">Estilos que Também Influenciam Você</h3>
                    <div className="space-y-2">
                      {secondaryStyles.map((style, index) => (
                        <div key={`${style.category}-${index}`} className="flex items-center justify-between p-2 bg-white rounded border border-[#B89B7A]/10">
                          <span className="text-sm font-medium text-[#432818]">{style.category}</span>
                          <span className="text-xs text-[#8F7A6A]">{style.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="order-1 lg:order-2">
                <div className="w-full max-w-xs lg:max-w-sm mx-auto relative"> 
                  {image ? (
                    <img 
                      src={image} 
                      alt={`Estilo ${category}`} 
                      className="w-full h-auto rounded-lg" 
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Imagem indisponível</span>
                    </div>
                  )}
                  
                  <div className="absolute -top-3 -left-3 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium transform -rotate-12">
                    {category}
                  </div>
                </div>
              </div>
            </div>
            
            {/* GUIA DE ESTILO */}
            {guideImage && (
              <div className="mt-12 max-w-2xl mx-auto relative">
                <h3 className="text-xl lg:text-2xl font-medium text-center text-[#aa6b5d] mb-6">
                  Seu Guia de Estilo Personalizado
                </h3>
                <img 
                  src={guideImage} 
                  alt={`Guia de Estilo ${category}`} 
                  className="w-full h-auto rounded-lg" 
                  loading="lazy"
                />
              </div>
            )}
          </Card>
        </section>

        {/* CTA FINAL */}
        <section id="cta" className="scroll-mt-20 mb-20 bg-white rounded-xl p-6 lg:p-12 border border-[#B89B7A]/20 text-center">
          <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-[#432818] mb-6">
            Transforme Seu Guarda-Roupa Hoje!
          </h2>
          
          <p className="text-xl text-[#8F7A6A] mb-8">
            Seu guia personalizado {category} + materiais exclusivos
          </p>

          <div className="mb-8">
            <span className="text-5xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent">
              R$ 39,90
            </span>
            <p className="text-sm text-[#8F7A6A] mt-2">ou 5x de R$ 8,83 sem juros</p>
          </div>

          <button
            onClick={handleCTAClick} 
            className="text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 mx-auto block"
            style={{
              background: 'linear-gradient(135deg, #B89B7A, #aa6b5d)',
              maxWidth: '420px'
            }}
          >
            <ShoppingCart className="w-5 h-5 inline mr-2" />
            Garantir Minha Transformação
          </button>

          <div className="flex items-center justify-center gap-6 text-sm text-[#8F7A6A] mt-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#B89B7A]" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B89B7A]" />
              <span>Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B89B7A]" />
              <span>Garantia 7 dias</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultPage;