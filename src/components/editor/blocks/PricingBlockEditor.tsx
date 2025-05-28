
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockEditorProps } from './types';
export const PricingBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${block.id}-regularPrice`}>Preço Original</Label>
        <Input
          id={`${block.id}-regularPrice`}
          value={block.content.regularPrice || ''}
          onChange={(e) => onUpdate({ regularPrice: e.target.value })}
          className="mt-1"
          placeholder="175,00"
        />
      </div>
      
        <Label htmlFor={`${block.id}-salePrice`}>Preço Promocional</Label>
          id={`${block.id}-salePrice`}
          value={block.content.salePrice || ''}
          onChange={(e) => onUpdate({ salePrice: e.target.value })}
          placeholder="39,00"
        <Label htmlFor={`${block.id}-buttonText`}>Texto do Botão</Label>
          id={`${block.id}-buttonText`}
          value={block.content.buttonText || ''}
          onChange={(e) => onUpdate({ buttonText: e.target.value })}
          placeholder="Quero Comprar Agora"
        <Label htmlFor={`${block.id}-ctaUrl`}>URL do Checkout</Label>
          id={`${block.id}-ctaUrl`}
          value={block.content.ctaUrl || ''}
          onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
          placeholder="https://pay.hotmart.com/..."
    </div>
  );
};
