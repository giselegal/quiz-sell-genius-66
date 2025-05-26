"use client";
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';
import OptimizedImage from '@/components/ui/OptimizedImage';
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

const BeforeAfterTransformation3: React.FC<BeforeAfterTransformationProps> = ({ handleCTAClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const activeTransformation = transformations[activeIndex];

  useEffect(() => {
    preloadInitialTransformationImages(); 
    const fallbackLoadingTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 2500);

    return () => clearTimeout(fallbackLoadingTimer);
  }, []);

  if (isLoading) {
    return (
      <div className="my-6 sm:my-8 md:my-10">
        {/* Título acima das imagens */}
        <h3 className="text-xl md:text-2xl font-playfair text-[#aa6b5d] mb-4 text-center">Descubra o poder da imagem intencional</h3>
        <Card className="relative overflow-hidden p-6 max-w-3xl mx-auto flex flex-col gap-4 items-center">
          {/* Imagem placeholder */}
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full min-h-[220px] bg-[#f8f5f0] rounded-lg animate-pulse max-w-[320px] mx-auto">
              <span className="absolute top-2 left-2 z-20 bg-[#B89B7A] text-white text-xs font-semibold px-4 py-1 rounded-full shadow">Resultados Reais</span>
            </div>
          </div>
          {/* Coluna de texto e CTA */}
          <div className="flex flex-col justify-center w-full md:pl-6 max-w-xl mx-auto">
            <p className="text-gray-700 mb-4 text-base md:text-lg text-center">Seu estilo não é apenas sobre roupas — é sobre comunicar quem você é e onde quer chegar.</p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start gap-2 text-[#aa6b5d] text-base"><span className="mt-1"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#aa6b5d"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Looks com intenção e identidade</li>
              <li className="flex items-start gap-2 text-[#aa6b5d] text-base"><span className="mt-1"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#aa6b5d"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Cores, modelagens e tecidos a seu favor</li>
              <li className="flex items-start gap-2 text-[#aa6b5d] text-base"><span className="mt-1"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#aa6b5d"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Imagem alinhada aos seus objetivos</li>
              <li className="flex items-start gap-2 text-[#aa6b5d] text-base"><span className="mt-1"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#aa6b5d"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Guarda-roupa funcional, sem compras por impulso</li>
            </ul>
            <Button
              className="w-full md:w-auto py-4 px-8 rounded-md shadow-md transition-colors btn-cta-green font-semibold text-lg mb-2"
              style={{
                background: "linear-gradient(to right, #4CAF50, #45a049)",
                boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
              }}
              disabled
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5 transition-transform duration-300" />
                Quero Meu Guia de Estilo
              </span>
            </Button>
            <p className="text-xs text-[#aa6b5d] text-center mt-1">Oferta por tempo limitado</p>
          </div>
        </Card>
      </div>
    );
  }

  // Ajuste: prioriza o carregamento da imagem ativa
  return (
    <div className="my-6 sm:my-8 md:my-10">
      {/* Título acima das imagens */}
      <h3 className="text-xl md:text-2xl font-playfair text-[#aa6b5d] mb-4 text-center">Descubra o poder da imagem intencional</h3>
      <Card className="relative overflow-hidden p-6 max-w-3xl mx-auto flex flex-col gap-4 items-center">
        {/* 'Resultados Reais' acima do nome da pessoa */}
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full max-w-[320px] mx-auto">
            <OptimizedImage
              src={activeTransformation.image}
              alt={activeTransformation.name}
              width={activeTransformation.width}
              height={activeTransformation.height}
              className="w-full h-auto rounded-lg shadow-md"
              onLoad={() => setImageLoaded(true)}
              priority={true}
            />
            <span className="absolute top-2 right-2 z-10 text-xs text-gray-700 bg-white/80 px-2 py-0.5 rounded">{activeTransformation.name}</span>
            <span className="absolute top-2 left-2 z-20 bg-[#B89B7A] text-white text-xs font-semibold px-4 py-1 rounded-full shadow">Resultados Reais</span>
            {/* Navegação */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-[#B89B7A]/20 transition"
              onClick={() => setActiveIndex((activeIndex - 1 + transformations.length) % transformations.length)}
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-[#B89B7A]/20 transition"
              onClick={() => setActiveIndex((activeIndex + 1) % transformations.length)}
              aria-label="Próxima"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        {/* Coluna de texto e CTA */}
        <div className="flex flex-col justify-center w-full md:pl-6 max-w-xl mx-auto">
          <p className="text-gray-700 mb-4 text-base md:text-lg text-center">Seu estilo não é apenas sobre roupas — é sobre comunicar quem você é e onde quer chegar.</p>
          <ul className="mb-6 space-y-2">
            <li className="flex items-start gap-2 text-[#aa6b5d] text-base"><span className="mt-1"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#aa6b5d"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Looks com intenção e identidade</li>
            <li className="flex items-start gap-2 text-[#aa6b5d] text-base"><span className="mt-1"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#aa6b5d"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Cores, modelagens e tecidos a seu favor</li>
            <li className="flex items-start gap-2 text-[#aa6b5d] text-base"><span className="mt-1"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#aa6b5d"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Imagem alinhada aos seus objetivos</li>
            <li className="flex items-start gap-2 text-[#aa6b5d] text-base"><span className="mt-1"><svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#aa6b5d"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Guarda-roupa funcional, sem compras por impulso</li>
          </ul>
          <Button
            onClick={handleCTAClick}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="w-full md:w-auto py-4 px-8 rounded-md shadow-md transition-colors btn-cta-green font-semibold text-lg mb-2"
            style={{
              background: "linear-gradient(to right, #4CAF50, #45a049)",
              boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)",
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
              Quero Meu Guia de Estilo
            </span>
          </Button>
          <p className="text-xs text-[#aa6b5d] text-center mt-1">Oferta por tempo limitado</p>
        </div>
      </Card>
    </div>
  );
};

export default BeforeAfterTransformation3;
