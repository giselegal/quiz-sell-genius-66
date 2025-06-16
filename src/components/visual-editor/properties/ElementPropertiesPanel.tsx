
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import type { CanvasElement, ElementUpdate } from '@/types/visualEditor';

interface ElementPropertiesPanelProps {
  element: CanvasElement;
  onUpdate: (updates: ElementUpdate) => void;
  onClose: () => void;
}

export const ElementPropertiesPanel: React.FC<ElementPropertiesPanelProps> = ({
  element,
  onUpdate,
  onClose
}) => {
  const handleContentUpdate = (field: string, value: any) => {
    onUpdate({
      content: {
        ...element.content,
        [field]: value
      }
    });
  };

  const handleStyleUpdate = (field: string, value: any) => {
    onUpdate({
      style: {
        ...element.style,
        [field]: value
      }
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Propriedades</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        <Card className="p-4">
          <h4 className="font-medium mb-3">Conteúdo</h4>
          <div className="space-y-3">
            {element.type === 'text' || element.type === 'headline' ? (
              <div>
                <Label htmlFor="text">Texto</Label>
                <Input
                  id="text"
                  value={element.content?.text || ''}
                  onChange={(e) => handleContentUpdate('text', e.target.value)}
                  placeholder="Digite o texto"
                />
              </div>
            ) : null}

            {element.type === 'image' ? (
              <>
                <div>
                  <Label htmlFor="src">URL da Imagem</Label>
                  <Input
                    id="src"
                    value={element.content?.src || ''}
                    onChange={(e) => handleContentUpdate('src', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="alt">Texto Alternativo</Label>
                  <Input
                    id="alt"
                    value={element.content?.alt || ''}
                    onChange={(e) => handleContentUpdate('alt', e.target.value)}
                    placeholder="Descrição da imagem"
                  />
                </div>
              </>
            ) : null}

            {element.type === 'button' ? (
              <>
                <div>
                  <Label htmlFor="text">Texto do Botão</Label>
                  <Input
                    id="text"
                    value={element.content?.text || ''}
                    onChange={(e) => handleContentUpdate('text', e.target.value)}
                    placeholder="Clique aqui"
                  />
                </div>
                <div>
                  <Label htmlFor="href">Link</Label>
                  <Input
                    id="href"
                    value={element.content?.href || ''}
                    onChange={(e) => handleContentUpdate('href', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </>
            ) : null}
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-3">Estilo</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="backgroundColor">Cor de Fundo</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={element.style?.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="color">Cor do Texto</Label>
              <Input
                id="color"
                type="color"
                value={element.style?.color || '#000000'}
                onChange={(e) => handleStyleUpdate('color', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fontSize">Tamanho da Fonte</Label>
              <Input
                id="fontSize"
                value={element.style?.fontSize || '16px'}
                onChange={(e) => handleStyleUpdate('fontSize', e.target.value)}
                placeholder="16px"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
