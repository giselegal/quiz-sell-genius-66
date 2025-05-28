
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface StyleResultPreviewProps {
  primaryStyle: StyleResult;
  content?: {
    title?: string;
    text?: string;
  };
}

export const StyleResultPreview: React.FC<StyleResultPreviewProps> = ({ 
  primaryStyle, 
  content 
}) => {
  const getStyleColors = (category: string) => {
    switch (category) {
      case 'Natural':
        return {
          primary: '#8B4513',
          secondary: '#D2B48C',
          accent: '#F4A460'
        };
      case 'Clássico':
        return {
          primary: '#2F4F4F',
          secondary: '#696969',
          accent: '#A9A9A9'
        };
      case 'Romântico':
        return {
          primary: '#8B4B8B',
          secondary: '#DDA0DD',
          accent: '#FFC0CB'
        };
      default:
        return {
          primary: '#B89B7A',
          secondary: '#D4C2A4',
          accent: '#E8DCC0'
        };
    }
  };

  const colors = getStyleColors(primaryStyle.category);

  return (
    <div className="text-center p-6 bg-white rounded-lg border">
      <h2 className="text-2xl font-playfair mb-4" style={{ color: colors.primary }}>
        {content?.title || 'Seu Estilo Principal'}
      </h2>
      
      <div 
        className="w-32 h-32 mx-auto rounded-full mb-4 flex items-center justify-center text-white text-xl font-bold"
        style={{ backgroundColor: colors.primary }}
      >
        {primaryStyle.category}
      </div>
      
      <p className="text-lg font-medium mb-2" style={{ color: colors.primary }}>
        {primaryStyle.category}
      </p>
      
      <p className="text-sm mb-4" style={{ color: colors.secondary }}>
        {content?.text || `Você tem ${primaryStyle.percentage}% de afinidade com o estilo ${primaryStyle.category}`}
      </p>
      
      <div className="flex justify-center space-x-2">
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: colors.primary }}
        />
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: colors.secondary }}
        />
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: colors.accent }}
        />
      </div>
    </div>
  );
};
