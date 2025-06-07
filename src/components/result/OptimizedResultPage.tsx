
import React, { useEffect, useState } from 'react';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { StyleResultSection } from '@/components/result/StyleResult';
import { styleConfig } from '@/data/styleConfig';
import { useAuth } from '@/hooks/useAuth';
import ResultLoading from './ResultLoading';
import { trackPageView } from '@/utils/quiz-intro';

const OptimizedResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles, isComplete, isLoading } = useQuizResults();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    if (primaryStyle && !isLoading) {
      window.scrollTo(0, 0);
      trackPageView('results');
      setPageReady(true);
    }
  }, [primaryStyle, isLoading]);

  // Show loading while data is being fetched
  if (isLoading || !pageReady) {
    return <ResultLoading />;
  }

  // Redirect to quiz if no results
  if (!primaryStyle || !isComplete) {
    window.location.href = '/';
    return <ResultLoading />;
  }

  const { category } = primaryStyle;
  const { image, description } = styleConfig[category] || {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80/v1744920983/romantico_image.webp',
    description: 'Seu estilo único combina várias características especiais.'
  };

  const getStyleOverrides = () => ({
    backgroundColor: globalStyles.backgroundColor || '#fffaf7',
    color: globalStyles.textColor || '#432818',
    fontFamily: globalStyles.fontFamily || 'inherit'
  });

  return (
    <div className="min-h-screen relative overflow-hidden" style={getStyleOverrides()}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>

      <Header 
        primaryStyle={primaryStyle} 
        logoHeight={globalStyles.logoHeight} 
        logo={globalStyles.logo} 
        logoAlt={globalStyles.logoAlt} 
        userName={user?.userName} 
      />

      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl relative z-10">
        <StyleResultSection 
          primaryStyle={primaryStyle}
          description={description}
          image={image}
          secondaryStyles={secondaryStyles}
        />

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-[#f9f6f3] p-8 rounded-2xl shadow-md border border-[#B89B7A]/20">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium text-[#aa6b5d] mb-6">
              Pronta para Descobrir Como Aplicar Seu Estilo?
            </h3>
            <p className="text-lg text-[#432818] mb-6 max-w-2xl mx-auto">
              Veja como usar esse conhecimento em suas roupas, maquiagem e acessórios para criar uma imagem autêntica.
            </p>
            <button 
              onClick={() => window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'}
              className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] text-white py-5 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{boxShadow: "0 6px 18px rgba(76, 175, 80, 0.35)", fontSize: "1.1rem"}}
            >
              Quero meu Guia de Estilo Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizedResultPage;
