
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye, EyeOff, Play, Upload, Undo, Redo } from 'lucide-react';

interface BuilderToolbarProps {
  activeView: 'editor' | 'preview';
  isPreviewing: boolean;
  onViewChange: (view: 'editor' | 'preview') => void;
  onPreviewToggle: () => void;
  onSave: () => void;
  onPreviewResultPage: () => void;
  onImportQuizTemplate: () => void;
}

const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  activeView,
  isPreviewing,
  onViewChange,
  onPreviewToggle,
  onSave,
  onPreviewResultPage,
  onImportQuizTemplate
}) => {
  return (
    <div className="bg-[#1A1F2C] border-b border-[#333333] px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white">Quiz Builder</h1>
        
        <Tabs value={activeView} onValueChange={(value) => onViewChange(value as 'editor' | 'preview')}>
          <TabsList className="bg-[#333333] border-[#444444]">
            <TabsTrigger value="editor" className="text-white data-[state=active]:bg-[#B89B7A]">
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-white data-[state=active]:bg-[#B89B7A]">
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onImportQuizTemplate}
          className="text-gray-400 hover:text-white hover:bg-[#333333]"
        >
          <Upload className="w-4 h-4 mr-2" />
          Importar Template
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onPreviewToggle}
          className="text-gray-400 hover:text-white hover:bg-[#333333]"
        >
          {isPreviewing ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Editar
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </>
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onPreviewResultPage}
          className="text-gray-400 hover:text-white hover:bg-[#333333]"
        >
          <Play className="w-4 h-4 mr-2" />
          Testar Resultado
        </Button>
        
        <Button
          onClick={onSave}
          className="bg-[#B89B7A] hover:bg-[#A38A69] text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default BuilderToolbar;
