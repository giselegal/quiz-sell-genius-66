
import React from 'react';
import { TransitionBlockContent } from '@/types/resultPageBlocks';

interface TransitionSectionPreviewProps {
  content: TransitionBlockContent;
}

export const TransitionSectionPreview: React.FC<TransitionSectionPreviewProps> = ({
  content
}) => {
  return (
    <section 
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: content.backgroundColor || '#f8f9fa' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#B89B7A] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-[#8F7A6A] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-[#B89B7A] rounded-full blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-[#8F7A6A] rounded-full blur-sm"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative line */}
          {content.showDecorations && (
            <div className="flex items-center justify-center mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent w-24"></div>
              <div className="mx-4 w-3 h-3 bg-[#B89B7A] rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent w-24"></div>
            </div>
          )}

          {/* Main title */}
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-playfair font-bold mb-8 text-[#432818] leading-tight">
            {content.title || 'Chegou o Momento de Agir'}
          </h2>

          {/* Description */}
          <p className="text-xl lg:text-2xl font-medium text-[#8F7A6A] leading-relaxed mb-12 max-w-3xl mx-auto">
            {content.description || 'Não deixe para depois a transformação que você pode começar agora!'}
          </p>

          {/* Visual emphasis */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <div className="w-8 h-8 bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] rounded-full animate-pulse"></div>
            <div className="w-12 h-12 bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] rounded-full animate-pulse animation-delay-200"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] rounded-full animate-pulse animation-delay-400"></div>
          </div>

          {/* Bottom decorative line */}
          {content.showDecorations && (
            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent w-32"></div>
              <div className="mx-6 flex space-x-2">
                <div className="w-2 h-2 bg-[#B89B7A] rounded-full"></div>
                <div className="w-2 h-2 bg-[#8F7A6A] rounded-full"></div>
                <div className="w-2 h-2 bg-[#B89B7A] rounded-full"></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent w-32"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
