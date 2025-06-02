import React from 'react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';
import { Image, Star, Shield, Zap, Target } from 'lucide-react';

interface BlockRendererProps {
  block: Block;
  isSelected?: boolean;
  onClick?: () => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected = false,
  onClick
}) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case 'headline':
        return (
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#432818]">
              {block.content?.title || 'Título Principal'}
            </h1>
            <p className="text-lg text-[#8F7A6A]">
              {block.content?.subtitle || 'Subtítulo explicativo'}
            </p>
          </div>
        );

      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            <p className="text-[#432818] leading-relaxed">
              {block.content?.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </p>
          </div>
        );

      case 'image':
        return (
          <div className="text-center">
            {block.content?.imageUrl ? (
              <img 
                src={block.content.imageUrl} 
                alt={block.content.alt || 'Imagem'} 
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-[#FAF9F7] border-2 border-dashed border-[#B89B7A]/40 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Image className="h-12 w-12 mx-auto mb-2 text-[#B89B7A]/50" />
                  <p className="text-[#8F7A6A]">Clique para adicionar uma imagem</p>
                </div>
              </div>
            )}
            {block.content?.caption && (
              <p className="text-sm text-[#8F7A6A] mt-2">{block.content.caption}</p>
            )}
          </div>
        );

      case 'benefits':
        const benefits = block.content?.benefits || [
          'Benefício 1: Resultado garantido',
          'Benefício 2: Suporte especializado',
          'Benefício 3: Acesso vitalício'
        ];
        return (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#432818] mb-4">
              {block.content?.title || 'Principais Benefícios'}
            </h3>
            {benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <Star className="h-5 w-5 text-[#D4B996] mt-0.5 flex-shrink-0" />
                <p className="text-[#432818]">{benefit}</p>
              </div>
            ))}
          </div>
        );

      case 'pricing':
        return (
          <div className="text-center bg-[#FAF9F7] p-6 rounded-lg border border-[#B89B7A]/20">
            <h3 className="text-2xl font-bold text-[#432818] mb-2">
              {block.content?.title || 'Oferta Especial'}
            </h3>
            <div className="text-4xl font-bold text-[#D4B996] mb-2">
              {block.content?.price || 'R$ 297'}
            </div>
            {block.content?.originalPrice && (
              <div className="text-lg text-[#8F7A6A] line-through mb-4">
                {block.content.originalPrice}
              </div>
            )}
            <p className="text-[#8F7A6A] mb-4">
              {block.content?.description || 'Acesso completo ao produto'}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-[#D4B996]">
              <Target className="h-4 w-4" />
              <span>{block.content?.highlight || 'Melhor oferta'}</span>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="text-center">
            <button className="bg-[#D4B996] hover:bg-[#B89B7A] text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors w-full max-w-md">
              {block.content?.buttonText || 'Comprar Agora'}
            </button>
            {block.content?.subtext && (
              <p className="text-sm text-[#8F7A6A] mt-2">{block.content.subtext}</p>
            )}
          </div>
        );

      case 'guarantee':
        return (
          <div className="bg-[#FAF9F7] p-6 rounded-lg border border-[#B89B7A]/20 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-[#D4B996]" />
            <h3 className="text-xl font-semibold text-[#432818] mb-2">
              {block.content?.title || 'Garantia de Satisfação'}
            </h3>
            <p className="text-[#8F7A6A]">
              {block.content?.description || 'Garantia incondicional de 30 dias. Não gostou? Devolvemos seu dinheiro.'}
            </p>
            {block.content?.period && (
              <div className="mt-3 text-[#D4B996] font-semibold">
                {block.content.period} dias de garantia
              </div>
            )}
          </div>
        );

      case 'style-result':
        return (
          <div className="bg-gradient-to-r from-[#FAF9F7] to-[#F5F1EB] p-6 rounded-lg border border-[#B89B7A]/20 text-center">
            <h3 className="text-xl font-semibold text-[#432818] mb-4">
              Seu Resultado Personalizado
            </h3>
            <div className="bg-white p-4 rounded-lg border border-[#D4B996]/30">
              <div className="text-2xl font-bold text-[#D4B996] mb-2">
                {block.content?.category || 'Seu Estilo'}
              </div>
              <div className="text-[#8F7A6A]">
                Compatibilidade: {block.content?.percentage || 85}%
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-lg text-center">
            <p className="text-[#8F7A6A]">Componente {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      className={cn(
        "cursor-pointer transition-all duration-200",
        isSelected && "ring-2 ring-[#D4B996] ring-offset-2"
      )}
      onClick={onClick}
    >
      {renderBlockContent()}
    </div>
  );
};
