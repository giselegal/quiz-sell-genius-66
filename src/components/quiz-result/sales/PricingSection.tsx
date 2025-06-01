import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
}

export const PricingSection = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCtaClick = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert('Redirecionando para a página de checkout...');
  };

  const tiers: PricingTier[] = [
    {
      name: 'Básico',
      price: 'R$29,90',
      description: 'Ideal para quem está começando',
      features: [
        'Acesso ao quiz',
        'Relatório de estilo pessoal',
        'Suporte por email'
      ],
      cta: 'Começar agora'
    },
    {
      name: 'Premium',
      price: 'R$49,90',
      description: 'Para quem quer se aprofundar',
      features: [
        'Tudo do Básico',
        'Consultoria individual',
        'Guia de estilo completo',
        'Acesso a comunidade VIP'
      ],
      cta: 'Upgrade para Premium'
    },
    {
      name: 'VIP',
      price: 'R$99,90',
      description: 'A experiência completa',
      features: [
        'Tudo do Premium',
        'Acompanhamento personalizado',
        'Análise de guarda-roupa',
        'Eventos exclusivos'
      ],
      cta: 'Se tornar VIP'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#FFFAF0] to-[#F5F2E8]">
      
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Oferta Especial
          </h2>
          <p className="text-gray-600 text-lg">
            Aproveite nossos planos exclusivos e eleve seu estilo a um novo patamar.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 text-lg mb-4">
                  {tier.price}
                </p>
                <p className="text-gray-500 mb-4">
                  {tier.description}
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {tier.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Button 
                  className="w-full"
                  onClick={handleCtaClick}
                  disabled={isProcessing}
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-2">
              <LoadingSpinner 
                size="sm"
                className={isProcessing ? '' : 'hidden'}
              />
              <span className="text-sm text-gray-500">
                {isProcessing ? 'Processando...' : 'Oferta por tempo limitado'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
