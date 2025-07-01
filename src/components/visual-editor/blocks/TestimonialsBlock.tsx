
import React from 'react';
import { Card } from '@/components/ui/card';
import { ResultPageBlock } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { Star, Quote } from 'lucide-react';
import { tokens } from '@/config/designTokens';

interface TestimonialsBlockProps {
  block: ResultPageBlock;
  primaryStyle: StyleResult;
  onClick?: () => void;
  isSelected?: boolean;
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  block,
  primaryStyle,
  onClick,
  isSelected
}) => {
  const { testimonials } = block.content;

  const defaultTestimonials = [
    {
      text: 'Transformou completamente minha forma de me vestir! Agora sei exatamente o que fica bem em mim.',
      author: 'Maria Silva',
      rating: 5,
      location: 'São Paulo, SP'
    },
    {
      text: 'Nunca mais errei nas compras. O guia é muito prático e fácil de seguir.',
      author: 'Ana Costa',
      rating: 5,
      location: 'Rio de Janeiro, RJ'
    },
    {
      text: 'Ganhei confiança para usar peças que nunca imaginei que ficariam bem em mim.',
      author: 'Carla Santos',
      rating: 5,
      location: 'Belo Horizonte, MG'
    }
  ];

  const testimonialsData = testimonials?.testimonials || defaultTestimonials;

  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
      }`}
      onClick={onClick}
      style={{ 
        backgroundColor: tokens.colors.backgroundAlt,
        borderColor: tokens.colors.border 
      }}
    >
      <div className="text-center mb-8">
        <h3 
          className="text-2xl font-playfair font-bold"
          style={{ color: tokens.colors.text }}
        >
          {testimonials?.title || 'O que nossas clientes estão dizendo'}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-6 relative"
            style={{ boxShadow: tokens.shadows.md }}
          >
            <div className="absolute -top-2 -left-2">
              <Quote 
                className="w-6 h-6" 
                style={{ color: tokens.colors.primary }} 
              />
            </div>
            
            <div className="mb-4">
              <div className="flex mb-2">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-current" 
                    style={{ color: '#FFC107' }}
                  />
                ))}
              </div>
            </div>

            <p 
              className="text-sm italic mb-4"
              style={{ color: tokens.colors.text }}
            >
              "{testimonial.text}"
            </p>

            <div className="border-t pt-4" style={{ borderColor: tokens.colors.borderLight }}>
              <p 
                className="font-semibold text-sm"
                style={{ color: tokens.colors.secondary }}
              >
                {testimonial.author}
              </p>
              {testimonial.location && (
                <p 
                  className="text-xs"
                  style={{ color: tokens.colors.textMuted }}
                >
                  {testimonial.location}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
