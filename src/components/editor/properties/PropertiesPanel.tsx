
import React from 'react';
import { EditorBlock } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { X, Trash2 } from 'lucide-react';
import { EditBlockContent } from '../EditBlockContent';

interface PropertiesPanelProps {
  selectedComponentId: string | null;
  onClose: () => void;
  blocks: EditorBlock[];
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedComponentId,
  onClose,
  blocks,
  onUpdate,
  onDelete
}) => {
  const selectedBlock = blocks.find(block => block.id === selectedComponentId);

  if (!selectedBlock) {
    return (
      <div className="h-full bg-white border-l border-[#B89B7A]/20 p-4">
        <div className="text-center text-[#8F7A6A]">
          <p>Selecione um componente para editar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white border-l border-[#B89B7A]/20 flex flex-col">
      <div className="border-b border-[#B89B7A]/20 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-[#432818]">Propriedades</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#8F7A6A]">Tipo de Bloco</label>
            <p className="font-medium text-[#432818] capitalize">{selectedBlock.type}</p>
          </div>

          <EditBlockContent
            block={selectedBlock}
            onUpdate={onUpdate}
          />
        </div>
      </div>

      <div className="border-t border-[#B89B7A]/20 p-4">
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="w-full"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir Bloco
        </Button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
