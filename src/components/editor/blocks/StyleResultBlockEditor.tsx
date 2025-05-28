
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlockEditorProps } from './types';

export const StyleResultBlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${block.id}-title`}>Título do Resultado Principal</Label>
        <Input
          id={`${block.id}-title`}
          value={block.content.title || ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          className="mt-1"
          placeholder="Seu Estilo Principal"
        />
      </div>
      
      <div>
        <Label htmlFor={`${block.id}-description`}>Descrição do Estilo Principal</Label>
        <Input
          id={`${block.id}-description`}
          value={block.content.text || ''}
          onChange={(e) => onUpdate({ text: e.target.value })}
          className="mt-1"
          placeholder="Descrição do estilo principal"
        />
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-[#8F7A6A]">
          <strong>Nota:</strong> Este componente exibirá automaticamente o estilo principal do usuário.
          Você pode personalizar o título e descrição aqui.
        </p>
      </div>
    </div>
  );
};
