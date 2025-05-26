
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
interface HeroSectionBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}
const HeroSectionBlockEditor: React.FC<HeroSectionBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Textarea
          id="title"
          rows={2}
          value={content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="VOCÊ DESCOBRIU SEU ESTILO"
        />
      </div>
      
        <Label htmlFor="subtitle">Subtítulo</Label>
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => onUpdate({ subtitle: e.target.value })}
          placeholder="Agora é hora de aplicar com clareza — e se vestir de você"
        <Label htmlFor="heroImage">Imagem Principal (URL)</Label>
        <Input
          id="heroImage"
          value={content.heroImage || ''}
          onChange={(e) => onUpdate({ heroImage: e.target.value })}
          placeholder="URL da imagem principal"
        {content.heroImage && (
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <img 
              src={content.heroImage} 
              alt="Imagem principal" 
              className="h-20 object-contain mx-auto"
            />
          </div>
        )}
        <Label htmlFor="heroImage2">Imagem Secundária (URL)</Label>
          id="heroImage2"
          value={content.heroImage2 || ''}
          onChange={(e) => onUpdate({ heroImage2: e.target.value })}
          placeholder="URL da imagem secundária"
        {content.heroImage2 && (
              src={content.heroImage2} 
              alt="Imagem secundária" 
    </div>
  );
};
export default HeroSectionBlockEditor;
