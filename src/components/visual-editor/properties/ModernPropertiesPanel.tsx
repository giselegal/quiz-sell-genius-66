
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Settings } from 'lucide-react';
import { EditorElement } from '@/hooks/useModernEditor';

interface ModernPropertiesPanelProps {
  selectedElement: EditorElement | undefined;
  onUpdateElement: (id: string, updates: Partial<EditorElement>) => void;
  onDeleteElement: (id: string) => void;
}

export const ModernPropertiesPanel: React.FC<ModernPropertiesPanelProps> = ({
  selectedElement,
  onUpdateElement,
  onDeleteElement
}) => {
  if (!selectedElement) {
    return (
      <div className="h-full bg-white border-l border-gray-200 p-4">
        <div className="text-center text-gray-500 mt-8">
          <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="font-medium mb-2">Nenhum elemento selecionado</h3>
          <p className="text-sm">
            Selecione um elemento no canvas para editar suas propriedades.
          </p>
        </div>
      </div>
    );
  }

  const updateContent = (key: string, value: any) => {
    onUpdateElement(selectedElement.id, {
      content: { ...selectedElement.content, [key]: value }
    });
  };

  const updateStyle = (key: string, value: any) => {
    onUpdateElement(selectedElement.id, {
      style: { ...selectedElement.style, [key]: value }
    });
  };

  const updatePosition = (key: 'x' | 'y', value: number) => {
    onUpdateElement(selectedElement.id, {
      position: { ...selectedElement.position, [key]: value }
    });
  };

  const updateSize = (key: 'width' | 'height', value: number) => {
    onUpdateElement(selectedElement.id, {
      size: { ...selectedElement.size, [key]: value }
    });
  };

  const renderContentControls = () => {
    switch (selectedElement.type) {
      case 'heading':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="text">Texto</Label>
              <Textarea
                id="text"
                value={selectedElement.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Nível</Label>
              <Select
                value={selectedElement.content.level || 'h2'}
                onValueChange={(value) => updateContent('level', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h2">H2</SelectItem>
                  <SelectItem value="h3">H3</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                  <SelectItem value="h5">H5</SelectItem>
                  <SelectItem value="h6">H6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case 'text':
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Texto</Label>
            <Textarea
              id="text"
              value={selectedElement.content.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              rows={4}
            />
          </div>
        );

      case 'button':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="text">Texto do Botão</Label>
              <Input
                id="text"
                value={selectedElement.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={selectedElement.content.url || ''}
                onChange={(e) => updateContent('url', e.target.value)}
                placeholder="https://"
              />
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="src">URL da Imagem</Label>
              <Input
                id="src"
                value={selectedElement.content.src || ''}
                onChange={(e) => updateContent('src', e.target.value)}
                placeholder="https://"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Texto Alternativo</Label>
              <Input
                id="alt"
                value={selectedElement.content.alt || ''}
                onChange={(e) => updateContent('alt', e.target.value)}
              />
            </div>
          </>
        );

      case 'spacer':
        return (
          <div className="space-y-2">
            <Label htmlFor="height">Altura (px)</Label>
            <Input
              id="height"
              type="number"
              value={selectedElement.content.height || 40}
              onChange={(e) => updateContent('height', parseInt(e.target.value))}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-900">Propriedades</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteElement(selectedElement.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Element Info */}
        <Card className="p-3 mb-6">
          <div className="text-sm">
            <span className="font-medium">Tipo: </span>
            <span className="capitalize">{selectedElement.type}</span>
          </div>
          <div className="text-sm text-gray-500">
            ID: {selectedElement.id.slice(0, 8)}...
          </div>
        </Card>

        {/* Content Controls */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Conteúdo</h3>
            <div className="space-y-4">
              {renderContentControls()}
            </div>
          </div>

          {/* Position & Size */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Posição & Tamanho</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="x">X</Label>
                <Input
                  id="x"
                  type="number"
                  value={selectedElement.position.x}
                  onChange={(e) => updatePosition('x', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="y">Y</Label>
                <Input
                  id="y"
                  type="number"
                  value={selectedElement.position.y}
                  onChange={(e) => updatePosition('y', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Largura</Label>
                <Input
                  id="width"
                  type="number"
                  value={selectedElement.size.width}
                  onChange={(e) => updateSize('width', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura</Label>
                <Input
                  id="height"
                  type="number"
                  value={selectedElement.size.height}
                  onChange={(e) => updateSize('height', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Style Controls */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Estilo</h3>
            <div className="space-y-4">
              {selectedElement.type !== 'spacer' && selectedElement.type !== 'divider' && (
                <div className="space-y-2">
                  <Label htmlFor="color">Cor do Texto</Label>
                  <Input
                    id="color"
                    type="color"
                    value={selectedElement.style.color || '#000000'}
                    onChange={(e) => updateStyle('color', e.target.value)}
                  />
                </div>
              )}
              
              {selectedElement.type === 'button' && (
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={selectedElement.style.backgroundColor || '#3b82f6'}
                    onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
