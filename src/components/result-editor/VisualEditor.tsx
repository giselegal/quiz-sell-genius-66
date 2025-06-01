
import React from 'react';
import { Block } from '@/types/editor';
import { EditableComponentProps } from './EditableComponentProps';

const EditableComponent: React.FC<EditableComponentProps> = ({ content, onUpdate }) => {
  return (
    <div className="p-4 border border-dashed border-gray-300 rounded">
      <p>Componente editável</p>
      <button onClick={() => onUpdate({ ...content, updated: true })}>
        Atualizar
      </button>
    </div>
  );
};

interface VisualEditorProps {
  blocks: Block[];
  onUpdateBlock: (id: string, content: any) => void;
}

const VisualEditor: React.FC<VisualEditorProps> = ({ blocks, onUpdateBlock }) => {
  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <div key={block.id} className="border rounded p-4">
          <h3 className="font-medium mb-2">Bloco: {block.type}</h3>
          <EditableComponent
            content={block.content}
            onUpdate={(content) => onUpdateBlock(block.id, content)}
          />
        </div>
      ))}
    </div>
  );
};

export default VisualEditor;
