
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface HeroSectionProps {
  primaryStyle: StyleResult;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  primaryStyle,
  title,
  subtitle,
  imageUrl,
  ctaText,
  onCtaClick
}) => {
  return (
    <div className="text-center py-8">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Hero" 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <h2 className="text-2xl font-bold text-[#432818] mb-4">
        {title || `Transforme Seu Estilo ${primaryStyle.category}`}
      </h2>
      
      {subtitle && (
        <p className="text-lg text-[#8F7A6A] mb-6">
          {subtitle}
        </p>
      )}
      
      {ctaText && (
        <button
          onClick={onCtaClick}
          className="bg-[#B89B7A] hover:bg-[#A38A69] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};

export default HeroSection;
