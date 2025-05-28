
"use client";
import React, { useEffect } from 'react';
import FixedIntroImage from '@/components/ui/FixedIntroImage';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import { trackButtonClick } from '@/utils/analytics';
import { 
    BadgeCheck, 
    Check, 
    ChevronRight, 
    ShoppingBag, 
    ArrowRight, 
    Users, 
    Shield, 
    Lock, 
    TrendingUp 
} from 'lucide-react';

interface QuizOfferPageEditableProps {
  data: {
    heroTitle: string;
    heroSubtitle: string;
    heroCtaText: string;
    ctaUrl: string;
    heroImage: string;
    backgroundColor: string;
    textColor: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    containerMaxWidth: string;
    sectionPadding: string;
    showActiveUsers: boolean;
    showCountdown: boolean;
  };
}

const QuizOfferPageEditable: React.FC<QuizOfferPageEditableProps> = ({ data }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('offer-page-mounted');
    }
  }, [data]);

  const handleCtaClick = (buttonId: string, action: string = 'Comprar Agora') => {
    trackButtonClick(buttonId, action, 'quiz_offer_page');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden font-sans"
      style={{
        backgroundColor: data.backgroundColor,
        color: data.textColor,
      }}
    >
      <header className="bg-white shadow-lg py-4 px-6 mb-8 z-50">
        <div className={`container mx-auto ${data.containerMaxWidth} flex justify-center`}>
          <FixedIntroImage
            src={data.heroImage}
            alt="Logo"
            width={200}
            height={100}
            className="h-auto"
          />
        </div>
      </header>

      <main className="relative z-10 flex flex-col gap-y-8 md:gap-y-12">
        <section className={`container mx-auto px-4 sm:px-6 lg:px-8 ${data.sectionPadding} ${data.containerMaxWidth}`}>
          <div className="bg-white p-8 rounded-2xl shadow-xl border text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold text-center mb-8 font-playfair leading-tight"
              style={{ color: data.textColor }}
            >
              {data.heroTitle}
            </h1>
            
            <p 
              className="text-xl md:text-2xl mb-10 leading-relaxed max-w-4xl mx-auto"
              style={{ color: data.accentColor }}
            >
              {data.heroSubtitle}
            </p>

            {data.showCountdown && (
              <div className="mt-6 flex justify-center">
                <CountdownTimer />
              </div>
            )}

            <a
              href={data.ctaUrl}
              onClick={() => handleCtaClick('hero_cta', data.heroCtaText)}
              className="inline-block text-white text-xl md:text-2xl py-4 px-10 rounded-full shadow-lg transition-all duration-300 ease-in-out font-bold"
              style={{
                background: `linear-gradient(to right, ${data.primaryColor}, ${data.secondaryColor})`,
                boxShadow: `0 8px 20px ${data.primaryColor}80`
              }}
            >
              <span className="flex items-center justify-center gap-3">
                <ShoppingBag size={24} />
                <span>{data.heroCtaText}</span>
              </span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default QuizOfferPageEditable;
