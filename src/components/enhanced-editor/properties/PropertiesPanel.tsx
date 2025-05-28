
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Block } from '@/types/editor';
import { ContentPropertiesEditor } from './editors/ContentPropertiesEditor';
import { StylePropertiesEditor } from './editors/StylePropertiesEditor';
import { ResponsivePropertiesEditor } from './editors/ResponsivePropertiesEditor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (id: string, content: any) => void;
  onDelete: (id: string) => void;
  isMobile?: boolean;
}

export function PropertiesPanel({
  selectedBlockId,
  blocks,
  onClose,
  onUpdate,
  onDelete,
  isMobile = false
}: PropertiesPanelProps) {
  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  if (!selectedBlockId || !selectedBlock) {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="p-4 border-b border-[#B89B7A]/20 flex justify-between items-center">
          <h2 className="font-medium text-[#432818]">Propriedades</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <p className="text-[#8F7A6A]">
            Selecione um elemento para editar suas propriedades
          </p>
        </div>
      </div>
    );
  }

  const handleUpdate = (partialContent: any) => {
    onUpdate(selectedBlockId, {
      ...selectedBlock.content,
      ...partialContent
    });
  };

  const handleStyleUpdate = (styleUpdates: any) => {
    onUpdate(selectedBlockId, {
      ...selectedBlock.content,
      style: {
        ...(selectedBlock.content.style || {}),
        ...styleUpdates
      }
    });
  };

  const getBlockTitle = () => {
    switch (selectedBlock.type) {
      case 'headline': return 'Título';
      case 'text': return 'Texto';
      case 'image': return 'Imagem';
      case 'benefits': return 'Benefícios';
      case 'testimonials': return 'Depoimentos';
      default: return selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-4 border-b border-[#B89B7A]/20 flex justify-between items-center">
        <h2 className="font-medium text-[#432818]">
          {getBlockTitle()}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4 text-[#8F7A6A]" />
        </Button>
      </div>

      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="style">Estilo</TabsTrigger>
            <TabsTrigger value="responsive">Responsivo</TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1">
          <TabsContent value="content" className="p-4">
            <ContentPropertiesEditor 
              block={selectedBlock} 
              onUpdate={handleUpdate} 
            />
          </TabsContent>
          
          <TabsContent value="style" className="p-4">
            <StylePropertiesEditor 
              style={selectedBlock.content.style || {}} 
              onUpdate={handleStyleUpdate} 
            />
          </TabsContent>
          
          <TabsContent value="responsive" className="p-4">
            <ResponsivePropertiesEditor 
              block={selectedBlock} 
              onUpdate={handleUpdate} 
              isMobile={isMobile}
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>
      
      <div className="p-4 border-t border-[#B89B7A]/20">
        <Button 
          variant="destructive" 
          onClick={() => onDelete(selectedBlockId)} 
          className="w-full"
        >
          Excluir Componente
        </Button>
      </div>
    </div>
  );
}
