
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BlockEditorProps } from './types';
export const HeroSectionBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${block.id}-heroImage`}>Imagem Principal</Label>
        <Input
          id={`${block.id}-heroImage`}
          value={block.content.heroImage || ''}
          onChange={(e) => onUpdate({ heroImage: e.target.value })}
          className="mt-1"
          placeholder="URL da imagem principal"
        />
      </div>
      
        <Label htmlFor={`${block.id}-heroImageAlt`}>Texto Alternativo da Imagem</Label>
          id={`${block.id}-heroImageAlt`}
          value={block.content.heroImageAlt || ''}
          onChange={(e) => onUpdate({ heroImageAlt: e.target.value })}
          placeholder="Descrição da imagem para acessibilidade"
        <Label htmlFor={`${block.id}-quote`}>Depoimento</Label>
        <Textarea
          id={`${block.id}-quote`}
          value={block.content.quote || ''}
          onChange={(e) => onUpdate({ quote: e.target.value })}
          placeholder="Digite o depoimento do cliente"
        <Label htmlFor={`${block.id}-quoteAuthor`}>Autor do Depoimento</Label>
          id={`${block.id}-quoteAuthor`}
          value={block.content.quoteAuthor || ''}
          onChange={(e) => onUpdate({ quoteAuthor: e.target.value })}
          placeholder="Nome e idade do cliente"
    </div>
  );
};
