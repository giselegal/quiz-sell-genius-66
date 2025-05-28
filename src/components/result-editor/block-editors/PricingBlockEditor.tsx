
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Block } from '@/types/editor';
interface PricingBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}
const PricingBlockEditor: React.FC<PricingBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="regularPrice">Preço Regular</Label>
        <Input
          id="regularPrice"
          value={content.regularPrice || ''}
          onChange={(e) => onUpdate({ regularPrice: e.target.value })}
          placeholder="175,00"
        />
      </div>
      
        <Label htmlFor="salePrice">Preço Promocional</Label>
          id="salePrice"
          value={content.salePrice || ''}
          onChange={(e) => onUpdate({ salePrice: e.target.value })}
          placeholder="39,00"
        <Label htmlFor="buttonText">Texto do Botão</Label>
          id="buttonText"
          value={content.buttonText || ''}
          onChange={(e) => onUpdate({ buttonText: e.target.value })}
          placeholder="Quero Transformar Meu Estilo"
        <Label htmlFor="ctaUrl">URL do Botão</Label>
          id="ctaUrl"
          value={content.ctaUrl || ''}
          onChange={(e) => onUpdate({ ctaUrl: e.target.value })}
          placeholder="https://pay.hotmart.com/..."
        <Label htmlFor="urgencyText">Texto de Urgência</Label>
          id="urgencyText"
          value={content.urgencyText || ''}
          onChange={(e) => onUpdate({ urgencyText: e.target.value })}
          placeholder="Oferta por tempo limitado!"
    </div>
  );
};
export default PricingBlockEditor;
