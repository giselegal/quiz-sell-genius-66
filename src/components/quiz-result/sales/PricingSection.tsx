
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

interface PricingSectionProps {
  tiers: PricingTier[];
  className?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  tiers,
  className = ""
}) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const defaultTiers: PricingTier[] = [
    {
      id: 'basic',
      name: 'Consultoria Básica',
      description: 'Perfeito para começar sua transformação',
      originalPrice: 497,
      discountedPrice: 297,
      features: [
        'Análise completa do seu estilo',
        'Guia personalizado de cores',
        'Dicas de combinações',
        'Suporte por email'
      ],
      ctaText: 'Escolher Básico',
      ctaUrl: '#basic'
    },
    {
      id: 'premium',
      name: 'Consultoria Premium',
      description: 'A escolha mais popular para resultados completos',
      originalPrice: 997,
      discountedPrice: 597,
      isPopular: true,
      features: [
        'Tudo do plano Básico',
        'Consultoria por videochamada (1h)',
        'Guia de compras personalizado',
        'Análise do seu guarda-roupa',
        'Suporte prioritário por 30 dias'
      ],
      ctaText: 'Escolher Premium',
      ctaUrl: '#premium'
    },
    {
      id: 'vip',
      name: 'Consultoria VIP',
      description: 'Transformação completa com acompanhamento exclusivo',
      originalPrice: 1997,
      discountedPrice: 997,
      features: [
        'Tudo do plano Premium',
        '3 consultorias por videochamada',
        'Personal shopper por 1 dia',
        'Montagem de looks completos',
        'Acompanhamento por 90 dias'
      ],
      ctaText: 'Escolher VIP',
      ctaUrl: '#vip'
    }
  ];

  const pricing = tiers.length > 0 ? tiers : defaultTiers;

  return (
    <div className={`py-16 px-4 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-4">
            Escolha seu Plano de Transformação
          </h2>
          <p className="text-xl text-[#8F7A6A] max-w-2xl mx-auto">
            Selecione o plano ideal para sua jornada de descoberta e transformação do seu estilo pessoal
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setSelectedTier(tier.id)}
              onHoverEnd={() => setSelectedTier(null)}
            >
              <Card className={`relative h-full ${tier.isPopular ? 'border-2 border-[#B89B7A] shadow-xl scale-105' : 'border border-gray-200'}`}>
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#B89B7A] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Mais Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-playfair text-[#432818]">
                    {tier.name}
                  </CardTitle>
                  <CardDescription>
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="text-center mb-6">
                    <div className="text-lg text-gray-500 line-through">
                      De R$ {tier.originalPrice.toFixed(2)}
                    </div>
                    <div className="text-3xl font-bold text-[#B89B7A]">
                      R$ {tier.discountedPrice.toFixed(2)}
                    </div>
                    <div className="text-sm text-[#8F7A6A]">
                      Economia de R$ {(tier.originalPrice - tier.discountedPrice).toFixed(2)}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-[#432818] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="p-6 pt-0">
                  <AnimatePresence>
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: selectedTier === tier.id ? 1.05 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button 
                        className={`w-full py-3 font-semibold ${
                          tier.isPopular 
                            ? 'bg-[#B89B7A] hover:bg-[#A38A69] text-white' 
                            : 'bg-white border-2 border-[#B89B7A] text-[#B89B7A] hover:bg-[#FAF9F7]'
                        }`}
                        onClick={() => window.open(tier.ctaUrl, '_blank')}
                      >
                        {tier.ctaText}
                      </Button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-[#8F7A6A] mb-4">
            🔒 Pagamento 100% seguro • ✅ Garantia de 7 dias • 💝 Bônus exclusivos inclusos
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingSection;
