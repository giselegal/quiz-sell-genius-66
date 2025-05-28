
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ShoppingCart, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

interface TransformationItem {
  beforeImage: string;
  afterImage: string;
  name: string;
}

// Imagens otimizadas com melhor qualidade
const transformations: TransformationItem[] = [
  {
    beforeImage: "https://res.cloudinary.com/dqljyf76t/image/upload/q_auto:best,f_auto,w_800/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    afterImage: "https://res.cloudinary.com/dqljyf76t/image/upload/q_auto:best,f_auto,w_800/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    name: "Adriana"
  }, 
  {
    beforeImage: "https://res.cloudinary.com/dqljyf76t/image/upload/q_auto:best,f_auto,w_800/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    afterImage: "https://res.cloudinary.com/dqljyf76t/image/upload/q_auto:best,f_auto,w_800/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    name: "Mariangela"
  }
];

const BeforeAfterTransformation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [imagesLoaded, setImagesLoaded] = useState<{
    before: boolean;
    after: boolean;
  }>({
    before: false,
    after: false
  });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const activeTransformation = transformations[activeIndex];

  // Preload images to ensure they display correctly
  useEffect(() => {
    // Precarregar todas as imagens para melhor experiência
    transformations.forEach((item) => {
      const beforeImg = new Image();
      const afterImg = new Image();
      beforeImg.src = item.beforeImage;
      afterImg.src = item.afterImage;
      
      if (item === activeTransformation) {
        beforeImg.onload = () => setImagesLoaded(prev => ({
          ...prev,
          before: true
        }));
        afterImg.onload = () => setImagesLoaded(prev => ({
          ...prev,
          after: true
        }));
      }
    });
    
    return () => {
      // Cleanup
    };
  }, [activeIndex, activeTransformation]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    // Reset images loaded state when changing transformation
    setImagesLoaded({
      before: false,
      after: false
    });
  };
  
  const handleCTAClick = () => {
    // Track checkout initiation
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'transformation_section');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  const areImagesReady = imagesLoaded.before && imagesLoaded.after;

  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] text-center mb-2">
        Transformações Reais
      </h2>
      <p className="text-center text-[#3a3a3a] mb-6 max-w-md mx-auto">
        Veja como o conhecimento do estilo pessoal transforma a imagem e a autoconfiança
      </p>
      <div className="elegant-divider w-32 mx-auto mt-0 mb-6"></div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6 card-elegant overflow-hidden">
          {!areImagesReady && (
            <div className="h-[400px] md:h-[500px] w-full flex items-center justify-center bg-[#f9f4ef]">
              <div className="w-12 h-12 border-4 border-[#aa6b5d] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className={`relative h-[400px] md:h-[500px] w-full mb-4 ${areImagesReady ? '' : 'hidden'}`}>
            {/* Full image without slider */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={activeTransformation.afterImage} 
                alt={`Transformação - ${activeTransformation.name}`} 
                className="w-full h-full object-cover" 
                loading="eager"
                fetchPriority="high"
              />
            </div>

            <div className="absolute bottom-4 left-0 right-0 mx-auto bg-white/80 backdrop-blur-sm py-2 px-4 text-center rounded-lg max-w-xs">
              <p className="font-medium">{activeTransformation.name}</p>
            </div>
          </div>

          {/* Dots navigation */}
          {transformations.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {transformations.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-[#aa6b5d]' : 'bg-[#aa6b5d]/30'}`} 
                  onClick={() => handleDotClick(index)} 
                  aria-label={`Transformação ${index + 1}`}
                />
              ))}
            </div>
          )}
        </Card>
        
        {/* CTA Button added directly below the transformation images */}
        <div className="mt-8 text-center">
          <Button 
            onClick={handleCTAClick} 
            className="text-white py-4 px-6 rounded-md transition-all duration-300"
            style={{
              background: "linear-gradient(to right, #aa6b5d, #B89B7A)",
              boxShadow: "0 4px 14px rgba(184, 155, 122, 0.4)"
            }}
            onMouseEnter={() => setIsButtonHovered(true)} 
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
              Quero Descobrir Meu Guia Completo
            </span>
          </Button>
          
          <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
            Oferta por tempo limitado - Acesso imediato
          </p>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterTransformation;

return (
  <div className="py-10">
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-left md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-2">
            Descubra o poder da imagem intencional
          </h2>
          <p className="text-[#3a3a3a] mb-4">
            Seu estilo não é apenas sobre roupas — é sobre comunicar quem você é e onde quer chegar.
          </p>
          <ul className="list-disc pl-5 text-[#3a3a3a] mb-6">
            <li>Looks com intenção e identidade</li>
            <li>Cores, modelagens e tecidos a seu favor</li>
            <li>Imagem alinhada aos seus objetivos</li>
            <li>Guarda-roupa funcional, sem compras por impulso</li>
          </ul>
          <Button 
            onClick={handleCTAClick} 
            className="text-white py-4 px-6 rounded-md transition-all duration-300 w-full md:w-auto"
            style={{
              background: "linear-gradient(to right, #aa6b5d, #B89B7A)",
              boxShadow: "0 4px 14px rgba(184, 155, 122, 0.4)"
            }}
            onMouseEnter={() => setIsButtonHovered(true)} 
            onMouseLeave={() => setIsButtonHovered(false)}
            aria-label="Quero Descobrir Meu Guia Completo"
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
              Quero Descobrir Meu Guia Completo
            </span>
          </Button>
          <p className="text-sm text-[#aa6b5d] mt-2 flex items-center gap-1">
            Oferta por tempo limitado - Acesso imediato
          </p>
        </div>
        <div className="md:w-1/2 w-full">
          <Card className="p-6 card-elegant overflow-hidden">
            {!areImagesReady && (
              <div className="h-[400px] md:h-[500px] w-full flex items-center justify-center bg-[#f9f4ef]">
                <div className="w-12 h-12 border-4 border-[#aa6b5d] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <div className={`relative h-[400px] md:h-[500px] w-full mb-4 ${areImagesReady ? '' : 'hidden'}`}>
              <img 
                src={activeTransformation.afterImage} 
                alt={`Transformação - ${activeTransformation.name}`} 
                className="w-full h-full object-cover rounded-lg shadow-md" 
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute bottom-4 left-0 right-0 mx-auto bg-white/80 backdrop-blur-sm py-2 px-4 text-center rounded-lg max-w-xs">
                <p className="font-medium">{activeTransformation.name}</p>
              </div>
            </div>
            {transformations.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {transformations.map((_, index) => (
                  <button 
                    key={index} 
                    className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-[#aa6b5d]' : 'bg-[#aa6b5d]/30'}`} 
                    onClick={() => handleDotClick(index)} 
                    aria-label={`Transformação ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  </div>
);
