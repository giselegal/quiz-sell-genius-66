
"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';

const tokens = {
  colors: {
    primary: '#B89B7A',
    primaryDark: '#A1835D',
    secondary: '#aa6b5d',
    background: '#fffaf7',
    backgroundCard: '#ffffff',
    text: '#432818',
    textSecondary: '#6B5B4E',
    textMuted: '#8F7A6A',
    border: '#E5D5C8',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #B89B7A 0%, #aa6b5d 100%)',
  },
  shadows: {
    md: '0 4px 8px rgba(184, 155, 122, 0.12)',
    lg: '0 8px 16px rgba(184, 155, 122, 0.16)',
  },
};

interface StyleResult {
  category: string;
  percentage: number;
}

interface ResultPageProps {
  primaryStyle?: StyleResult;
  secondaryStyles?: StyleResult[];
}

const ResultPage: React.FC<ResultPageProps> = ({ 
  primaryStyle = { category: 'Elegante', percentage: 85 },
  secondaryStyles = []
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    console.log('CTA clicked');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
          <p>Carregando seu resultado...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: tokens.colors.background,
      color: tokens.colors.text,
    }}>
      <div className="container mx-auto px-6 lg:px-8 py-8 max-w-4xl relative z-10">
        <Card className="p-6 lg:p-8 mb-12 rounded-xl overflow-hidden relative" 
              style={{ 
                backgroundColor: tokens.colors.backgroundCard,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: tokens.shadows.lg 
              }}>
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
            <div className="text-center mb-8">
              <h1 className="text-xl lg:text-3xl font-playfair mb-6 leading-tight" 
                  style={{ color: tokens.colors.text }}>
                Descobrimos Seu Estilo Predominante:
                <br />
                <span className="text-2xl lg:text-4xl font-bold" 
                      style={{ 
                        background: tokens.gradients.primary, 
                        backgroundClip: 'text', 
                        WebkitBackgroundClip: 'text', 
                        color: 'transparent' 
                      }}>
                  {primaryStyle.category}
                </span>
              </h1>
              
              <div className="max-w-md mx-auto mb-6">
                <div className="flex items-center justify-end text-sm mb-2">
                  <span className="font-medium" style={{ color: tokens.colors.textMuted }}>
                    {primaryStyle.percentage}%
                  </span>
                </div>
                <Progress 
                  value={primaryStyle.percentage} 
                  className="h-2 rounded-full overflow-hidden" 
                  style={{ backgroundColor: tokens.colors.border }}
                />
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="space-y-4">
                  <p className="leading-relaxed text-base lg:text-lg font-medium" 
                     style={{ color: tokens.colors.text }}>
                    <strong>Agora você tem clareza total</strong> sobre quem você é e como expressar sua personalidade através do seu estilo!
                  </p>
                  
                  <div className="rounded-lg p-4" 
                       style={{ 
                         backgroundColor: tokens.colors.background,
                         border: `1px solid ${tokens.colors.border}`,
                         boxShadow: tokens.shadows.md 
                       }}>
                    <p className="text-sm lg:text-base leading-relaxed" style={{ color: tokens.colors.text }}>
                      <strong>Seu estilo {primaryStyle.category}</strong> revela uma mulher que expressa elegância e sofisticação em cada detalhe.
                    </p>
                  </div>
                  
                  <p className="text-sm lg:text-base" style={{ color: tokens.colors.textSecondary }}>
                    <strong>Chega de ficar perdida no guarda-roupa ou comprar peças que não combinam com você!</strong>
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="w-full max-w-xs lg:max-w-sm mx-auto relative">
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Imagem do Estilo</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={handleCTAClick}
                className="px-8 py-3 text-lg rounded-md transition-all duration-300"
                style={{
                  background: tokens.gradients.primary,
                  color: '#ffffff'
                }}
              >
                Descobrir Meu Guia Completo
              </Button>
            </div>
          </AnimatedWrapper>
        </Card>
      </div>
    </div>
  );
};

export default ResultPage;
