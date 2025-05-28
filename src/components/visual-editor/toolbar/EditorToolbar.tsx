
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Save, Download } from 'lucide-react';
import { exportProjectAsJson } from '@/utils/exportUtils';

interface EditorToolbarProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSave: () => void;
  config?: any;
}

export function EditorToolbar({
  isPreviewing,
  onPreviewToggle,
  onSave,
  config
}: EditorToolbarProps) {
  const handleExport = () => {
    if (config) {
      exportProjectAsJson(config);
    }
  };

  return (
    <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
      <h1 className="text-xl font-semibold text-[#432818]">Editor de Página</h1>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPreviewToggle}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? "Editar" : "Visualizar"}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar JSON
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
}
