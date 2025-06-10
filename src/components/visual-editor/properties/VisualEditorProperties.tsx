
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { VisualElement } from '@/types/visualEditor';

interface PropertiesPanelProps {
  elementId: string;
  element?: VisualElement;
  onUpdate: (updates: Partial<VisualElement>) => void;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  elementId,
  element,
  onUpdate,
  onClose
}) => {
  if (!element) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="text-center text-gray-500 mt-8">
          Selecione um elemento para editar suas propriedades
        </div>
      </div>
    );
  }

  const updateContent = (key: string, value: any) => {
    onUpdate({
      content: { ...element.content, [key]: value }
    });
  };

  const updateStyle = (key: string, value: any) => {
    onUpdate({
      style: { ...element.style, [key]: value }
    });
  };

  const renderContentFields = () => {
    switch (element.type) {
      case 'title':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="text">Texto do Título</Label>
              <Input
                id="text"
                value={element.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Digite o título"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Nível do Título</Label>
              <Select
                value={element.content.level || 'h2'}
                onValueChange={(value) => updateContent('level', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1 - Título Principal</SelectItem>
                  <SelectItem value="h2">H2 - Subtítulo</SelectItem>
                  <SelectItem value="h3">H3 - Título Seção</SelectItem>
                  <SelectItem value="h4">H4 - Subtítulo Seção</SelectItem>
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
              value={element.content.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              placeholder="Digite o texto"
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
                value={element.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Clique Aqui"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="href">Link (URL)</Label>
              <Input
                id="href"
                value={element.content.href || ''}
                onChange={(e) => updateContent('href', e.target.value)}
                placeholder="https://..."
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
                value={element.content.src || ''}
                onChange={(e) => updateContent('src', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Texto Alternativo</Label>
              <Input
                id="alt"
                value={element.content.alt || ''}
                onChange={(e) => updateContent('alt', e.target.value)}
                placeholder="Descrição da imagem"
              />
            </div>
          </>
        );

      case 'input':
      case 'email':
      case 'phone':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={element.content.placeholder || ''}
                onChange={(e) => updateContent('placeholder', e.target.value)}
                placeholder="Digite aqui..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="required">Campo Obrigatório</Label>
              <Switch
                id="required"
                checked={element.content.required || false}
                onCheckedChange={(checked) => updateContent('required', checked)}
              />
            </div>
          </>
        );

      case 'spacer':
        return (
          <div className="space-y-2">
            <Label htmlFor="height">Altura</Label>
            <Select
              value={element.style.height || '2rem'}
              onValueChange={(value) => updateStyle('height', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1rem">Pequeno (1rem)</SelectItem>
                <SelectItem value="2rem">Médio (2rem)</SelectItem>
                <SelectItem value="4rem">Grande (4rem)</SelectItem>
                <SelectItem value="6rem">Extra Grande (6rem)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Propriedades</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-auto">
        {/* Element Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Elemento</h3>
          <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
            Tipo: {element.type}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Conteúdo</h3>
          {renderContentFields()}
        </div>

        {/* Style */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Estilo</h3>
          
          <div className="space-y-2">
            <Label htmlFor="textAlign">Alinhamento</Label>
            <Select
              value={element.style.textAlign || 'left'}
              onValueChange={(value) => updateStyle('textAlign', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {element.type !== 'spacer' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="fontSize">Tamanho da Fonte</Label>
                <Input
                  id="fontSize"
                  value={element.style.fontSize || ''}
                  onChange={(e) => updateStyle('fontSize', e.target.value)}
                  placeholder="1rem, 16px, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Cor do Texto</Label>
                <Input
                  id="color"
                  type="color"
                  value={element.style.color || '#000000'}
                  onChange={(e) => updateStyle('color', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={element.style.backgroundColor || '#ffffff'}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {/* Visibility */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Visibilidade</h3>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="visible"
              checked={element.visible}
              onCheckedChange={(checked) => onUpdate({ visible: checked })}
            />
            <Label htmlFor="visible">Elemento visível</Label>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => {
            // This would be handled by the parent component
            onClose();
          }}
        >
          Excluir Elemento
        </Button>
      </div>
    </div>
  );
};
