
import React from 'react';
import { StyleResult } from '@/types/quiz';
interface HeroSectionProps {
  primaryStyle: StyleResult;
  title: any;
  subtitle: any;
  imageUrl?: any;
  ctaText?: any;
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
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#aa6b5d]">
          {title || `Seu Estilo é ${primaryStyle.category}!`}
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          {subtitle || `Descubra como aplicar seu estilo ${primaryStyle.category} no dia a dia.`}
        </p>
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Hero" 
            className="mx-auto mb-8 rounded-lg shadow-lg max-w-full h-auto"
          />
        )}
        {ctaText && onCtaClick && (
          <button 
            onClick={onCtaClick}
            className="bg-[#aa6b5d] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#8a5a4d] transition-colors"
          >
            {ctaText}
          </button>
      </div>
    </section>
  );
};
export default HeroSection;
