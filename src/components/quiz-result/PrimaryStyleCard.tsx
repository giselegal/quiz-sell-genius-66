
import React from 'react';
import { Card } from '../ui/card';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';

interface PrimaryStyleCardProps {
  primaryStyle: StyleResult;
  customDescription?: string;
  customImage?: string;
}

const PrimaryStyleCard: React.FC<PrimaryStyleCardProps> = ({
  primaryStyle,
  customDescription,
  customImage
}) => {
  const imageUrl = customImage || (styleConfig[primaryStyle.category]?.image || '');
  const description = customDescription || (styleConfig[primaryStyle.category]?.description || 'Descrição do estilo não disponível');
  
  return (
    <Card className="p-6 bg-white mb-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair text-[#432818] font-semibold">
            Seu estilo predominante é {primaryStyle.category}
          </h2>
          <p className="text-[#432818] leading-relaxed">
            {description}
          </p>
        </div>
        <div className="order-first md:order-last flex justify-center">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={`Estilo ${primaryStyle.category}`} 
              className="w-full h-auto rounded-lg max-h-80 object-contain"
            />
          ) : (
            <div className="bg-gray-100 rounded-lg w-full h-64 flex items-center justify-center">
              <p className="text-gray-400">Imagem não disponível</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PrimaryStyleCard;
