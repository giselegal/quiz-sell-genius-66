import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';
import OptimizedImage from '@/components/ui/optimized-image';
import { preloadImagesByUrls } from '@/utils/imageManager';

interface BeforeAfterTransformationProps {
  handleCTAClick?: () => void;
}

interface TransformationItem {
  image: string; 
  name: string;
  id: string; 
  width?: number;
  height?: number;
}

const transformations: TransformationItem[] = [
  {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80,w_800/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    name: "Adriana",
    id: "transformation-adriana",
    width: 800,
    height: 1000
  }, 
  {
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80,w_800/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    name: "Mariangela",
    id: "transformation-mariangela",
    width: 800,
    height: 1000
  }
];

const preloadInitialTransformationImages = () => {
  const imageUrls: string[] = [];
  transformations.slice(0, 1).forEach(item => { 
    imageUrls.push(item.image);
  });
  
  if (imageUrls.length > 0) {
    preloadImagesByUrls(imageUrls, {
      quality: 90, 
      batchSize: 1,
    });
  }
};

const BeforeAfterTransformation: React.FC<BeforeAfterTransformationProps> = ({ handleCTAClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const activeTransformation = transformations[activeIndex];
  const autoSlideInterval = 5000; // 5 segundos

  useEffect(() => {
    preloadInitialTransformationImages(); 
    const fallbackLoadingTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 2500);

    return () => clearTimeout(fallbackLoadingTimer);
  }, []);

  // Removido efeito de slide automático para melhorar desempenho
  /*
  useEffect(() => {
    const slideTimer = setTimeout(() => {
      const next = (activeIndex + 1) % transformations.length;
      setActiveIndex(next);
    }, autoSlideInterval);
    return () => clearTimeout(slideTimer);
  }, [activeIndex]);
  */

  const handleNext = () => {
    if (isLoading) return;
    setActiveIndex((prev) => (prev + 1) % transformations.length);
  };

  const handlePrev = () => {
    if (isLoading) return;
    setActiveIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  if (isLoading) {
    return (
      <div className="my-6 sm:my-8 md:my-10">
        {/* Título com decoração removido */}
        {/* <h3 className="text-xl md:text-2xl font-playfair text-[#aa6b5d] mb-2 text-center relative inline-block mx-auto w-full">
          Transformações Que Inspiram
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-[#B89B7A]/30"></span>
        </h3>
        <p className="text-base md:text-lg text-[#8F7A6A] text-center mb-6">
          Mulheres que aprenderam e praticam no dia a dia seu estilo de ser
        </p> */}
        {/* Card principal com skeleton */}
        <Card className="overflow-hidden border border-[#B89B7A]/20 shadow-md hover:shadow-lg transition-all duration-300 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 md:p-6">
            {/* Coluna da imagem com skeleton */}
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="w-full aspect-[4/5] bg-[#f8f5f0] rounded-lg animate-pulse"></div>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#B89B7A] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                  Resultados Reais
                </span>
              </div>
              
              {/* Indicadores de slides */}
              <div className="flex justify-center space-x-3 mt-4">
                {transformations.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-[#B89B7A]' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Coluna de conteúdo com skeletons */}
            <div className="flex flex-col justify-center">
              <div className="h-7 bg-[#f8f5f0] rounded animate-pulse mb-4 w-3/4 mx-auto md:mx-0"></div>
              
              <div className="h-16 bg-[#f8f5f0] rounded animate-pulse mb-5"></div>
              
              {/* Lista de benefícios com skeletons */}
              <div className="bg-[#f9f4ef]/70 backdrop-blur-sm rounded-lg p-5 mb-6 border border-[#B89B7A]/10">
                <ul className="space-y-3.5">
                  {Array(4).fill(0).map((_, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 justify-center md:justify-start">
                      <div className="min-w-[22px] h-[22px] bg-[#f8f5f0] rounded-full animate-pulse"></div>
                      <div className="h-5 bg-[#f8f5f0] rounded animate-pulse w-3/4"></div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA skeleton */}
              <div className="flex flex-col items-center md:items-start">
                <div className="w-full max-w-[280px] h-12 bg-[#f8f5f0] rounded animate-pulse mb-2"></div>
                <div className="h-3 w-32 bg-[#f8f5f0] rounded animate-pulse mb-4"></div>
                <div className="w-full max-w-[280px] h-[60px] bg-[#f8f5f0] rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Ajuste: prioriza o carregamento da imagem ativa
  return (
    <div className="my-6 sm:my-8 md:my-10">
      {/* Título com decoração removido */}
      {/* <h3 className="text-xl md:text-2xl font-playfair text-[#aa6b5d] mb-2 text-center relative inline-block mx-auto w-full">
        Transformações Que Inspiram
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-[#B89B7A]/30"></span>
      </h3>
      <p className="text-base md:text-lg text-[#8F7A6A] text-center mb-6">
        Mulheres que aprenderam e praticam no dia a dia seu estilo de ser
      </p> */}
      {/* Card principal com grid responsivo */}
      <Card className="overflow-hidden border border-[#B89B7A]/20 shadow-md hover:shadow-lg transition-all duration-300 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 md:p-6">
          {/* Coluna da imagem */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm mx-auto">
              <OptimizedImage
                src={activeTransformation.image}
                alt={`Transformação de ${activeTransformation.name}`}
                width={activeTransformation.width}
                height={activeTransformation.height}
                className="w-full h-auto rounded-lg shadow-md"
                onLoad={() => setImageLoaded(true)}
                priority={true}
              />
              
              {/* Nome da pessoa */}
              <span className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-[#432818] text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                {activeTransformation.name}
              </span>
              
              {/* Selo 'Resultados Reais' */}
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#B89B7A] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                Resultados Reais
              </span>
              
              {/* Navegação */}
              {transformations.length > 1 && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 pointer-events-none">
                  <button
                    className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md hover:bg-[#B89B7A]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2"
                    onClick={handlePrev}
                    aria-label="Anterior"
                  >
                    <ChevronLeft
                      className="text-[#432818] w-5 h-5 md:w-[22px] md:h-[22px]"
                    />
                  </button>
                  <button
                    className="pointer-events-auto bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md hover:bg-[#B89B7A]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2"
                    onClick={handleNext}
                    aria-label="Próxima"
                  >
                    <ChevronRight
                      className="text-[#432818] w-5 h-5 md:w-[22px] md:h-[22px]"
                    />
                  </button>
                </div>
              )}
            </div>
            
            {/* Indicadores de slides */}
            {transformations.length > 1 && (
              <div className="flex justify-center space-x-3 mt-4">
                {transformations.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex 
                        ? 'bg-[#B89B7A] scale-110' 
                        : 'bg-gray-300 hover:bg-[#B89B7A]/50'
                    }`}
                    aria-label={`Ver transformação ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Coluna de conteúdo */}
          <div className="flex flex-col justify-center">
            {/* Frase de incentivo acima do botão */}
            <div className="mb-3 flex justify-center md:justify-start">
              <span className="text-[#aa6b5d] text-sm md:text-base font-medium">
              </span>
            </div>
            <h4 className="text-lg md:text-xl font-medium text-[#432818] text-center md:text-left mb-4 flex justify-center md:justify-start">
              Dê o próximo passo na sua transformação!
            </h4>
            <p className="text-gray-700 text-base md:text-lg text-center md:text-left mb-5 flex justify-center md:justify-start">
              Seu Estilo não é apenas sobre Roupas — é sobre comunicar quem você é e onde quer chegar.
            </p>
            {/* Lista de benefícios */}
            <div className="bg-[#f9f4ef]/70 backdrop-blur-sm rounded-lg p-5 mb-6 border border-[#B89B7A]/10 hover:border-[#B89B7A]/20 transition-all duration-300 hover:shadow-sm">
              <ul className="space-y-3.5 text-center md:text-left">
                <li className="flex items-start gap-2.5 text-[#aa6b5d] text-base justify-center md:justify-start group transition-all duration-300 hover:translate-x-1">
                  <span className="min-w-[22px] mt-0.5 flex-shrink-0 transform transition-transform group-hover:scale-110">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#aa6b5d"/>
                      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="group-hover:text-[#432818] transition-colors">Looks com intenção e identidade</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#aa6b5d] text-base justify-center md:justify-start group transition-all duration-300 hover:translate-x-1">
                  <span className="min-w-[22px] mt-0.5 flex-shrink-0 transform transition-transform group-hover:scale-110">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#aa6b5d"/>
                      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="group-hover:text-[#432818] transition-colors">Cores, modelagens e tecidos a seu favor</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#aa6b5d] text-base justify-center md:justify-start group transition-all duration-300 hover:translate-x-1">
                  <span className="min-w-[22px] mt-0.5 flex-shrink-0 transform transition-transform group-hover:scale-110">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#aa6b5d"/>
                      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="group-hover:text-[#432818] transition-colors">Imagem alinhada aos seus objetivos</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#aa6b5d] text-base justify-center md:justify-start group transition-all duration-300 hover:translate-x-1">
                  <span className="min-w-[22px] mt-0.5 flex-shrink-0 transform transition-transform group-hover:scale-110">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#aa6b5d"/>
                      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="group-hover:text-[#432818] transition-colors">Guarda-roupa funcional, sem compras por impulso</span>
                </li>
              </ul>
            </div>
            
            {/* CTA e informações */}
            <div className="flex flex-col items-center md:items-start">
              <Button
                onClick={e => {
                  e.preventDefault();
                  // Remover pointerEvents do span para garantir clique em todo o botão
                  const btn = e.currentTarget;
                  btn.classList.add('scale-95');
                  setTimeout(() => {
                    btn.classList.remove('scale-95');
                    trackButtonClick('checkout_button', 'Iniciar Checkout', 'transformation_section');
                    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
                  }, 120);
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                className={`w-full md:w-auto py-3 px-4 rounded-md shadow-md font-semibold text-base mb-2 focus:outline-none focus:ring-2 focus:ring-[#B89B7A] focus:ring-offset-2 transition-all duration-200 active:scale-95 ${
                  isButtonHovered ? 'brightness-105' : ''
                } leading-none animate-gradient-x select-none flex items-center justify-center`}
                style={{
                  background: "linear-gradient(90deg, #B89B7A 0%, #aa6b5d 100%)",
                  boxShadow: "0 4px 14px rgba(184, 155, 122, 0.4)",
                  color: "#fff",
                  border: "none",
                  backgroundSize: "200% 200%",
                  backgroundPosition: isButtonHovered ? "right center" : "left center",
                  transition: "background-position 0.5s cubic-bezier(0.4,0,0.2,1)"
                }}
                type="button"
              >
                <span className="flex items-center justify-center gap-2 w-full pointer-events-none">
                  <ShoppingCart className={`w-5 h-5 transition-transform duration-200 ${isButtonHovered ? 'scale-110' : ''}`} />
                  Quero Minha Transformação Agora
                </span>
              </Button>
              
              <p className="text-xs text-[#aa6b5d] font-medium text-center md:text-left mb-4 whitespace-nowrap">
                Oferta por tempo limitado
              </p>
            
              {/* Métodos de pagamento */}
              <div className="w-full max-w-[280px] mx-auto md:mx-0 transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                  alt="Métodos de pagamento"
                  className="w-full rounded-lg shadow-sm"
                  loading="lazy"
                  width="400"
                  height="100"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BeforeAfterTransformation;

// Não existe nenhum HTML estático (fora do JSX/React) neste arquivo.
// Todo o conteúdo é JSX/React.
