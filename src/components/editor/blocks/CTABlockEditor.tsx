
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockEditorProps } from './types';
export const CTABlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${block.id}-title`}>Título do CTA</Label>
        <Input
          id={`${block.id}-title`}
          value={block.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1"
          placeholder="Comece Agora"
        />
      </div>
      
        <Label htmlFor={`${block.id}-buttonText`}>Texto do Botão</Label>
          id={`${block.id}-buttonText`}
          value={block.content.buttonText || ''}
          onChange={(e) => onUpdate({ buttonText: e.target.value })}
          placeholder="Clique aqui"
        <Label htmlFor={`${block.id}-url`}>URL do Botão</Label>
          id={`${block.id}-url`}
          value={block.content.url || ''}
          onChange={(e) => onUpdate({ url: e.target.value })}
          placeholder="https://..."
    </div>
  );
};
