
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { EditorElement } from '@/hooks/useModernEditor';

interface ModernPropertiesPanelProps {
  selectedElement: EditorElement | undefined;
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
      <div className="h-full bg-white border-l border-gray-200 p-4">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-center">
            Selecione um elemento<br />para editar suas propriedades
          </p>
        </div>
      </div>
    );
  }

  const handleContentUpdate = (key: string, value: any) => {
    onUpdate({
      content: {
        ...selectedElement.content,
        [key]: value
      }
    });
  };

  const renderProperties = () => {
    switch (selectedElement.type) {
      case 'quiz-hero-title':
      case 'question-title':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={selectedElement.content.title || ''}
                onChange={(e) => handleContentUpdate('title', e.target.value)}
                placeholder="Digite o título"
              />
            </div>
            {selectedElement.content.subtitle !== undefined && (
              <div>
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={selectedElement.content.subtitle || ''}
                  onChange={(e) => handleContentUpdate('subtitle', e.target.value)}
                  placeholder="Digite o subtítulo"
                />
              </div>
            )}
          </div>
        );
      
      case 'quiz-description':
      case 'result-subtitle':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Texto</Label>
              <Textarea
                id="text"
                value={selectedElement.content.text || ''}
                onChange={(e) => handleContentUpdate('text', e.target.value)}
                placeholder="Digite o texto"
                rows={4}
              />
            </div>
          </div>
        );
      
      case 'quiz-input':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Rótulo</Label>
              <Input
                id="label"
                value={selectedElement.content.label || ''}
                onChange={(e) => handleContentUpdate('label', e.target.value)}
                placeholder="Seu nome:"
              />
            </div>
            <div>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={selectedElement.content.placeholder || ''}
                onChange={(e) => handleContentUpdate('placeholder', e.target.value)}
                placeholder="Digite seu nome"
              />
            </div>
          </div>
        );
      
      case 'quiz-button':
      case 'transition-continue':
      case 'cta-button':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Texto do Botão</Label>
              <Input
                id="text"
                value={selectedElement.content.text || ''}
                onChange={(e) => handleContentUpdate('text', e.target.value)}
                placeholder="Continuar"
              />
            </div>
            <div>
              <Label htmlFor="variant">Estilo</Label>
              <select
                id="variant"
                value={selectedElement.content.variant || 'primary'}
                onChange={(e) => handleContentUpdate('variant', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="primary">Primário</option>
                <option value="secondary">Secundário</option>
              </select>
            </div>
          </div>
        );
      
      case 'quiz-hero-image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                value={selectedElement.content.imageUrl || ''}
                onChange={(e) => handleContentUpdate('imageUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="alt">Texto Alternativo</Label>
              <Input
                id="alt"
                value={selectedElement.content.alt || ''}
                onChange={(e) => handleContentUpdate('alt', e.target.value)}
                placeholder="Descrição da imagem"
              />
            </div>
          </div>
        );
      
      case 'brand-header':
      case 'question-header':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="logoUrl">URL do Logo</Label>
              <Input
                id="logoUrl"
                value={selectedElement.content.logoUrl || ''}
                onChange={(e) => handleContentUpdate('logoUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="logoAlt">Texto Alternativo do Logo</Label>
              <Input
                id="logoAlt"
                value={selectedElement.content.logoAlt || ''}
                onChange={(e) => handleContentUpdate('logoAlt', e.target.value)}
                placeholder="Logo da empresa"
              />
            </div>
          </div>
        );
      
      case 'progress-bar':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="current">Etapa Atual</Label>
              <Input
                id="current"
                type="number"
                value={selectedElement.content.current || 1}
                onChange={(e) => handleContentUpdate('current', parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="total">Total de Etapas</Label>
              <Input
                id="total"
                type="number"
                value={selectedElement.content.total || 10}
                onChange={(e) => handleContentUpdate('total', parseInt(e.target.value))}
                min="1"
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Propriedades específicas para o tipo "{selectedElement.type}" não estão disponíveis ainda.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Propriedades</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {selectedElement.type}
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {renderProperties()}
      </ScrollArea>
    </div>
  );
};
