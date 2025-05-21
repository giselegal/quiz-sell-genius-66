
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  primaryStyle: StyleResult;
  title?: string;
  subtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  primaryStyle,
  title,
  subtitle
}) => {
  return (
    <div className="relative space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-playfair text-[#aa6b5d] mb-3">
          {title || "VOCÊ DESCOBRIU SEU ESTILO"}
        </h1>
        <p className="text-xl md:text-2xl font-playfair text-[#3a3a3a] mb-6">
          {subtitle || "Agora é hora de aplicar com clareza — e se vestir de você"}
        </p>
        
        <Card className="p-4 bg-[#ffefec] border-[#aa6b5d]/20 inline-block mx-auto">
          <div className="flex items-center gap-2 text-[#aa6b5d]">
            <span>Seu estilo predominante é</span>
            <span className="font-semibold">{primaryStyle.category}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
          alt="Guia Completo de Estilo"
          className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        />
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"
          alt="Gisele Galvão"
          className="w-full rounded-lg shadow-lg object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default HeroSection;
