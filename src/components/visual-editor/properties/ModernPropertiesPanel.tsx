
import React from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Trash2, Copy, Move } from 'lucide-react';

interface ModernPropertiesPanelProps {
  selectedElement: EditorElement | undefined;
  onUpdateElement: (id: string, updates: Partial<EditorElement>) => void;
  onDeleteElement: (id: string) => void;
  onDuplicateElement: () => void;
}

export const ModernPropertiesPanel: React.FC<ModernPropertiesPanelProps> = ({
  selectedElement,
  onUpdateElement,
  onDeleteElement,
  onDuplicateElement
}) => {
  if (!selectedElement) {
    return (
      <div className="h-full bg-white border-l border-gray-200 p-4 flex flex-col items-center justify-center text-center">
        <div className="text-4xl mb-4">🎯</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Propriedades
        </h3>
        <p className="text-sm text-gray-500">
          Selecione um elemento no canvas para editar suas propriedades
        </p>
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

  const addOption = () => {
    const currentOptions = selectedElement.content.options || [];
    const nextLetter = String.fromCharCode(65 + currentOptions.length); // A, B, C, D...
    const newOption = {
      id: nextLetter,
      text: `Opção ${nextLetter}`,
      styleCategory: 'Natural'
    };
    updateContent('options', [...currentOptions, newOption]);
  };

  const removeOption = (index: number) => {
    const currentOptions = selectedElement.content.options || [];
    const newOptions = currentOptions.filter((_: any, i: number) => i !== index);
    updateContent('options', newOptions);
  };

  const updateOption = (index: number, field: string, value: string) => {
    const currentOptions = [...(selectedElement.content.options || [])];
    currentOptions[index] = { ...currentOptions[index], [field]: value };
    updateContent('options', currentOptions);
  };

  const renderContentControls = () => {
    switch (selectedElement.type) {
      case 'quiz-header':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Título do Quiz</Label>
              <Input
                id="title"
                value={selectedElement.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Nome do seu quiz"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">URL do Logo</Label>
              <Input
                id="logo"
                value={selectedElement.content.logo || ''}
                onChange={(e) => updateContent('logo', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="progress">Progresso (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={selectedElement.content.progress || 0}
                onChange={(e) => updateContent('progress', Number(e.target.value))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showProgress"
                checked={selectedElement.content.showProgress || false}
                onChange={(e) => updateContent('showProgress', e.target.checked)}
              />
              <Label htmlFor="showProgress">Mostrar barra de progresso</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showBackButton"
                checked={selectedElement.content.showBackButton || false}
                onChange={(e) => updateContent('showBackButton', e.target.checked)}
              />
              <Label htmlFor="showBackButton">Mostrar botão voltar</Label>
            </div>
          </>
        );

      case 'quiz-question':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="question">Pergunta</Label>
              <Textarea
                id="question"
                value={selectedElement.content.question || ''}
                onChange={(e) => updateContent('question', e.target.value)}
                placeholder="Digite sua pergunta"
                rows={2}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Opções de Resposta</Label>
                <Button
                  size="sm"
                  onClick={addOption}
                  className="text-xs"
                >
                  + Adicionar
                </Button>
              </div>
              
              {(selectedElement.content.options || []).map((option: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Opção {option.id}</span>
                    {(selectedElement.content.options || []).length > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={option.text || ''}
                    onChange={(e) => updateOption(index, 'text', e.target.value)}
                    placeholder={`Texto da opção ${option.id}`}
                    rows={2}
                  />
                  <Select
                    value={option.styleCategory || 'Natural'}
                    onValueChange={(value) => updateOption(index, 'styleCategory', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Natural">Natural</SelectItem>
                      <SelectItem value="Clássico">Clássico</SelectItem>
                      <SelectItem value="Contemporâneo">Contemporâneo</SelectItem>
                      <SelectItem value="Elegante">Elegante</SelectItem>
                      <SelectItem value="Romântico">Romântico</SelectItem>
                      <SelectItem value="Sexy">Sexy</SelectItem>
                      <SelectItem value="Dramático">Dramático</SelectItem>
                      <SelectItem value="Criativo">Criativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="multiSelect"
                checked={selectedElement.content.multiSelect || false}
                onChange={(e) => updateContent('multiSelect', e.target.checked)}
              />
              <Label htmlFor="multiSelect">Permitir múltiplas seleções</Label>
            </div>
          </>
        );

      case 'heading':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="text">Texto</Label>
              <Input
                id="text"
                value={selectedElement.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Digite o título"
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
                value={selectedElement.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Texto do botão"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={selectedElement.content.url || ''}
                onChange={(e) => updateContent('url', e.target.value)}
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
                value={selectedElement.content.src || ''}
                onChange={(e) => updateContent('src', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Texto Alternativo</Label>
              <Input
                id="alt"
                value={selectedElement.content.alt || ''}
                onChange={(e) => updateContent('alt', e.target.value)}
                placeholder="Descrição da imagem"
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
              onChange={(e) => updateContent('height', Number(e.target.value))}
              min="10"
              max="200"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Propriedades</h3>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={onDuplicateElement}
              title="Duplicar"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDeleteElement(selectedElement.id)}
              className="text-red-500 hover:text-red-700"
              title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Element Info */}
        <div className="space-y-2">
          <Label>Tipo de Elemento</Label>
          <div className="px-3 py-2 bg-gray-100 rounded text-sm font-medium capitalize">
            {selectedElement.type.replace('-', ' ')}
          </div>
        </div>

        <Separator />

        {/* Content Controls */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Conteúdo</h4>
          {renderContentControls()}
        </div>

        <Separator />

        {/* Position & Size */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Posição e Tamanho</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">X</Label>
              <Input
                type="number"
                value={selectedElement.position.x}
                onChange={(e) => updatePosition('x', Number(e.target.value))}
                size="sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Y</Label>
              <Input
                type="number"
                value={selectedElement.position.y}
                onChange={(e) => updatePosition('y', Number(e.target.value))}
                size="sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Largura</Label>
              <Input
                type="number"
                value={selectedElement.size.width}
                onChange={(e) => updateSize('width', Number(e.target.value))}
                size="sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Altura</Label>
              <Input
                type="number"
                value={selectedElement.size.height}
                onChange={(e) => updateSize('height', Number(e.target.value))}
                size="sm"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Style Controls */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Estilo</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Cor de Fundo</Label>
              <Input
                type="color"
                value={selectedElement.style.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                size="sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Cor do Texto</Label>
              <Input
                type="color"
                value={selectedElement.style.color || '#000000'}
                onChange={(e) => updateStyle('color', e.target.value)}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
