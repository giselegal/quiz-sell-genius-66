
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PropertiesPanelProps {
  selectedComponentId: string | null;
  onClose: () => void;
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedComponentId,
  onClose,
  onUpdate,
  onDelete
}) => {
  if (!selectedComponentId) {
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

      <div className="flex-1 p-4">
        <div className="text-center text-[#8F7A6A]">
          <p>Painel de propriedades em desenvolvimento</p>
        </div>
      </div>
    </div>
  );
};
