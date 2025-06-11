
import React from 'react';
import { tokens } from '@/config/designTokens';

interface TransitionSectionProps {
  isLowPerformance: boolean;
}

export const TransitionSection: React.FC<TransitionSectionProps> = ({
  isLowPerformance,
}) => (
  <div className="mb-24 lg:mb-28">
    <div className="relative text-center py-16 lg:py-20">
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${tokens.colors.backgroundAlt}/60, ${tokens.colors.background}/40, ${tokens.colors.backgroundAlt}/60)`
        }}
      ></div>
      <div className="relative z-10">
        <div 
          className="w-40 h-px mx-auto mb-8"
          style={{
            background: `linear-gradient(90deg, transparent, ${tokens.colors.primary}, transparent)`
          }}
        ></div>
        <h3 
          className="text-3xl lg:text-4xl font-playfair font-bold mb-6"
          style={{ color: tokens.colors.text }}
        >
          Chegou o Momento de Agir
        </h3>
        <p 
          className="text-xl font-medium max-w-2xl mx-auto leading-relaxed"
          style={{ color: tokens.colors.textSecondary }}
        >
          Não deixe para depois a transformação que você pode começar agora!
        </p>
        <div 
          className="w-40 h-px mx-auto mt-8"
          style={{
            background: `linear-gradient(90deg, transparent, ${tokens.colors.primary}, transparent)`
          }}
        ></div>
      </div>
    </div>
  </div>
);
