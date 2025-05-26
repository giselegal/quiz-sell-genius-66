
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { OfferContent } from '@/types/resultPageConfig';
interface OfferEditorProps {
  content: OfferContent;
  onUpdate: (content: OfferContent) => void;
}
const OfferEditor: React.FC<OfferEditorProps> = ({ content, onUpdate }) => {
  const handleChange = (key: string, value: any) => {
    onUpdate({
      ...content,
      [key]: value
    });
  };
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título Principal</Label>
        <Textarea
          id="title"
          value={content.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="VOCÊ DESCOBRIU SEU ESTILO"
          rows={2}
        />
      </div>
        <Label htmlFor="subtitle">Subtítulo</Label>
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => handleChange('subtitle', e.target.value)}
          placeholder="Agora é hora de aplicar com clareza — e se vestir de você"
        <Label htmlFor="price">Preço</Label>
        <Input
          id="price"
          value={content.price || ''}
          onChange={(e) => handleChange('price', e.target.value)}
          placeholder="39,00"
        <Label htmlFor="regularPrice">Preço Regular</Label>
          id="regularPrice"
          value={content.regularPrice || ''}
          onChange={(e) => handleChange('regularPrice', e.target.value)}
          placeholder="175,00"
        <Label htmlFor="ctaText">Texto do Botão</Label>
          id="ctaText"
          value={content.ctaText || ''}
          onChange={(e) => handleChange('ctaText', e.target.value)}
          placeholder="Quero meu Guia + Bônus"
        <Label htmlFor="ctaUrl">Link do Botão</Label>
          id="ctaUrl"
          value={content.ctaUrl || ''}
          onChange={(e) => handleChange('ctaUrl', e.target.value)}
          placeholder="https://pay.hotmart.com/..."
        <Label htmlFor="heroImage">URL Imagem Principal</Label>
          id="heroImage"
          value={content.heroImage || ''}
          onChange={(e) => handleChange('heroImage', e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        <Label htmlFor="heroImage2">URL Imagem Secundária</Label>
          id="heroImage2"
          value={content.heroImage2 || ''}
          onChange={(e) => handleChange('heroImage2', e.target.value)}
          placeholder="https://exemplo.com/imagem2.jpg"
    </div>
  );
};
export default OfferEditor;
