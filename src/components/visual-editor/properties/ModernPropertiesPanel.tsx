
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { X, Settings } from 'lucide-react';
import { EditorElement } from '@/hooks/useModernEditor';

interface ModernPropertiesPanelProps {
  selectedElement?: EditorElement;
  onUpdate: (updates: Partial<EditorElement>) => void;
  onClose: () => void;
}

export const ModernPropertiesPanel: React.FC<ModernPropertiesPanelProps> = ({
  selectedElement,
  onUpdate,
  onClose
}) => {
  if (!selectedElement) {
    return (
      <div className="h-full border-l border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Propriedades
          </h2>
        </div>
        <div className="p-4 flex items-center justify-center h-32 text-gray-500">
          <p className="text-sm">Selecione um elemento para editar suas propriedades</p>
        </div>
      </div>
    );
  }

  const handleContentUpdate = (field: string, value: any) => {
    onUpdate({
      content: {
        ...selectedElement.content,
        [field]: value
      }
    });
  };

  const handleStyleUpdate = (field: string, value: any) => {
    onUpdate({
      style: {
        ...selectedElement.style,
        [field]: value
      }
    });
  };

  return (
    <div className="h-full border-l border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Propriedades
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1 capitalize">
          {selectedElement.type.replace('-', ' ')}
        </p>
      </div>
      
      <ScrollArea className="h-[calc(100%-80px)]">
        <div className="p-4 space-y-6">
          {/* Conteúdo */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Conteúdo</h3>
            
            {selectedElement.type === 'text' && (
              <div className="space-y-2">
                <Label htmlFor="text-content">Texto</Label>
                <Textarea
                  id="text-content"
                  value={selectedElement.content.text || ''}
                  onChange={(e) => handleContentUpdate('text', e.target.value)}
                  placeholder="Digite o texto..."
                  rows={3}
                />
              </div>
            )}

            {selectedElement.type === 'heading' && (
              <div className="space-y-2">
                <Label htmlFor="heading-text">Título</Label>
                <Input
                  id="heading-text"
                  value={selectedElement.content.text || ''}
                  onChange={(e) => handleContentUpdate('text', e.target.value)}
                  placeholder="Digite o título..."
                />
              </div>
            )}

            {selectedElement.type === 'image' && (
              <div className="space-y-2">
                <Label htmlFor="image-src">URL da Imagem</Label>
                <Input
                  id="image-src"
                  value={selectedElement.content.src || ''}
                  onChange={(e) => handleContentUpdate('src', e.target.value)}
                  placeholder="https://..."
                />
                <Label htmlFor="image-alt">Texto Alternativo</Label>
                <Input
                  id="image-alt"
                  value={selectedElement.content.alt || ''}
                  onChange={(e) => handleContentUpdate('alt', e.target.value)}
                  placeholder="Descrição da imagem..."
                />
              </div>
            )}

            {selectedElement.type === 'button' && (
              <div className="space-y-2">
                <Label htmlFor="button-text">Texto do Botão</Label>
                <Input
                  id="button-text"
                  value={selectedElement.content.text || ''}
                  onChange={(e) => handleContentUpdate('text', e.target.value)}
                  placeholder="Clique aqui"
                />
                <Label htmlFor="button-link">Link</Label>
                <Input
                  id="button-link"
                  value={selectedElement.content.href || ''}
                  onChange={(e) => handleContentUpdate('href', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Estilo */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Estilo</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="bg-color">Cor de Fundo</Label>
                <Input
                  id="bg-color"
                  type="color"
                  value={selectedElement.style?.backgroundColor || '#ffffff'}
                  onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="text-color">Cor do Texto</Label>
                <Input
                  id="text-color"
                  type="color"
                  value={selectedElement.style?.color || '#000000'}
                  onChange={(e) => handleStyleUpdate('color', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="padding">Espaçamento Interno</Label>
              <Input
                id="padding"
                value={selectedElement.style?.padding || '16px'}
                onChange={(e) => handleStyleUpdate('padding', e.target.value)}
                placeholder="16px"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="margin">Margem</Label>
              <Input
                id="margin"
                value={selectedElement.style?.margin || '0px'}
                onChange={(e) => handleStyleUpdate('margin', e.target.value)}
                placeholder="0px"
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
