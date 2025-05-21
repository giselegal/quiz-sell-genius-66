
import React, { useEffect } from 'react';
import { preloadCriticalImages } from '@/utils/images/preloading';
import FixedIntroImage from '@/components/ui/FixedIntroImage';

// Constantes para otimização de imagens
const HERO_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up";

const QuizOfferPage: React.FC = () => {
  // Pré-carregar imagens críticas assim que o componente for montado
  useEffect(() => {
    // Carregar a imagem principal e outras imagens críticas
    preloadCriticalImages(
      [HERO_IMAGE_URL],
      { quality: 95, format: 'auto', onComplete: () => console.log('Imagens críticas carregadas') }
    );
    
    // Reportar métricas de performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('offer-page-mounted');
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section com imagem otimizada */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#432818] mb-6 font-playfair">
            Descubra seu Estilo Único e Transforme seu Guarda-Roupa
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Em apenas alguns minutos, nosso quiz revelará seu estilo predominante e como criar looks que combinam perfeitamente com sua essência.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg">
          <FixedIntroImage 
            src={HERO_IMAGE_URL}
            alt="Descubra seu estilo e transforme seu guarda-roupa" 
            width={600}
            height={400}
            priority={true}
          />
        </div>
        
        <div className="mt-10 flex flex-col items-center">
          <a 
            href="/quiz" 
            className="px-8 py-3 bg-[#B89B7A] hover:bg-[#A1835D] text-white font-medium rounded-md text-lg transition-colors shadow-md"
          >
            Começar Quiz Agora
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Leva apenas 3 minutos para descobrir seu estilo único
          </p>
        </div>
      </section>
      
      {/* Restante do conteúdo com carregamento otimizado */}
      <section className="py-16 px-4 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 font-playfair text-[#432818]">
            Como o Quiz Vai Transformar Sua Relação com a Moda
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 3 cards com benefits */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-3 text-[#432818]">Autoconhecimento</h3>
              <p className="text-gray-700">Descubra seu estilo predominante e entenda quais roupas realmente combinam com sua personalidade.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-3 text-[#432818]">Economia</h3>
              <p className="text-gray-700">Pare de gastar com peças que ficarão esquecidas. Invista apenas no que realmente combina com você.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-3 text-[#432818]">Confiança</h3>
              <p className="text-gray-700">Sinta-se confiante e autêntica em cada look, sabendo que ele reflete quem você realmente é.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA final */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-playfair text-[#432818]">
            Pronta para transformar seu guarda-roupa?
          </h2>
          <a 
            href="/quiz" 
            className="inline-block px-8 py-3 bg-[#B89B7A] hover:bg-[#A1835D] text-white font-medium rounded-md text-lg transition-colors shadow-md"
          >
            Fazer o Quiz Agora
          </a>
        </div>
      </section>
    </div>
  );
};

export default QuizOfferPage;
