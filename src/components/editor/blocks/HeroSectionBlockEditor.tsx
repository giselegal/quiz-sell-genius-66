
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
        <Label htmlFor={`${block.id}-heroImage`}>URL da Imagem Principal</Label>
        <Input
          id={`${block.id}-heroImage`}
          value={block.content.heroImage || ''}
          onChange={(e) => onUpdate({ heroImage: e.target.value })}
          className="mt-1"
          placeholder="URL da imagem principal"
        />
      </div>
      
      <div>
        <Label htmlFor={`${block.id}-heroImageAlt`}>Texto Alternativo da Imagem</Label>
        <Input
          id={`${block.id}-heroImageAlt`}
          value={block.content.heroImageAlt || ''}
          onChange={(e) => onUpdate({ heroImageAlt: e.target.value })}
          className="mt-1"
          placeholder="Descrição da imagem"
        />
      </div>
      
      <div>
        <Label htmlFor={`${block.id}-quote`}>Citação</Label>
        <Textarea
          id={`${block.id}-quote`}
          value={block.content.quote || ''}
          onChange={(e) => onUpdate({ quote: e.target.value })}
          className="mt-1"
          rows={3}
          placeholder="Uma citação inspiradora..."
        />
      </div>
      
      <div>
        <Label htmlFor={`${block.id}-quoteAuthor`}>Autor da Citação</Label>
        <Input
          id={`${block.id}-quoteAuthor`}
          value={block.content.quoteAuthor || ''}
          onChange={(e) => onUpdate({ quoteAuthor: e.target.value })}
          className="mt-1"
          placeholder="Nome do autor"
        />
      </div>
    </div>
  );
};
