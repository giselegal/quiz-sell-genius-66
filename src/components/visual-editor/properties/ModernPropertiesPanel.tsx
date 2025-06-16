
import React from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, Copy, Settings } from 'lucide-react';

interface ModernPropertiesPanelProps {
  selectedElement?: EditorElement;
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
      <div className="h-full bg-white border-l border-gray-200 p-4">
        <div className="flex flex-col items-center justify-center h-32 text-center">
          <Settings className="w-8 h-8 text-gray-400 mb-2" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            Nenhum elemento selecionado
          </h3>
          <p className="text-xs text-gray-500">
            Selecione um elemento para editar suas propriedades
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

  const updatePosition = (key: 'x' | 'y', value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdateElement(selectedElement.id, {
      position: { ...selectedElement.position, [key]: numValue }
    });
  };

  const updateSize = (key: 'width' | 'height', value: string) => {
    const numValue = parseFloat(value) || 0;
    onUpdateElement(selectedElement.id, {
      size: { ...selectedElement.size, [key]: numValue }
    });
  };

  const renderContentFields = () => {
    switch (selectedElement.type) {
      case 'quiz-header':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                value={selectedElement.content.logo || ''}
                onChange={(e) => updateContent('logo', e.target.value)}
                placeholder="https://exemplo.com/logo.png"
              />
            </div>
            
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={selectedElement.content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Título do Quiz"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showProgress"
                checked={selectedElement.content.showProgress || false}
                onChange={(e) => updateContent('showProgress', e.target.checked)}
              />
              <Label htmlFor="showProgress">Mostrar Progresso</Label>
            </div>

            {selectedElement.content.showProgress && (
              <div>
                <Label htmlFor="progress">Progresso (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={selectedElement.content.progress || 0}
                  onChange={(e) => updateContent('progress', parseInt(e.target.value))}
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showBackButton"
                checked={selectedElement.content.showBackButton || false}
                onChange={(e) => updateContent('showBackButton', e.target.checked)}
              />
              <Label htmlFor="showBackButton">Mostrar Botão Voltar</Label>
            </div>
          </div>
        );

      case 'quiz-question':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Pergunta</Label>
              <Textarea
                id="question"
                value={selectedElement.content.question || ''}
                onChange={(e) => updateContent('question', e.target.value)}
                placeholder="Digite sua pergunta aqui..."
                rows={3}
              />
            </div>

            <div>
              <Label>Opções de Resposta</Label>
              <div className="space-y-2 mt-2">
                {(selectedElement.content.options || []).map((option: any, index: number) => (
                  <div key={index} className="space-y-2 p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{option.id})</span>
                      <Input
                        value={option.text || ''}
                        onChange={(e) => {
                          const newOptions = [...(selectedElement.content.options || [])];
                          newOptions[index] = { ...option, text: e.target.value };
                          updateContent('options', newOptions);
                        }}
                        placeholder={`Opção ${option.id}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`style-${index}`}>Categoria de Estilo</Label>
                      <Input
                        id={`style-${index}`}
                        value={option.styleCategory || ''}
                        onChange={(e) => {
                          const newOptions = [...(selectedElement.content.options || [])];
                          newOptions[index] = { ...option, styleCategory: e.target.value };
                          updateContent('options', newOptions);
                        }}
                        placeholder="Ex: Natural, Clássico, etc."
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={() => {
                  const currentOptions = selectedElement.content.options || [];
                  const nextLetter = String.fromCharCode(65 + currentOptions.length);
                  const newOption = {
                    id: nextLetter,
                    text: `Nova opção ${nextLetter}`,
                    styleCategory: ''
                  };
                  updateContent('options', [...currentOptions, newOption]);
                }}
                className="w-full mt-2"
                variant="outline"
              >
                Adicionar Opção
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="multiSelect"
                checked={selectedElement.content.multiSelect || false}
                onChange={(e) => updateContent('multiSelect', e.target.checked)}
              />
              <Label htmlFor="multiSelect">Múltipla Escolha</Label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="required"
                checked={selectedElement.content.required || false}
                onChange={(e) => updateContent('required', e.target.checked)}
              />
              <Label htmlFor="required">Campo Obrigatório</Label>
            </div>
          </div>
        );

      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Texto</Label>
              <Input
                id="text"
                value={selectedElement.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Digite o título..."
              />
            </div>
            <div>
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
          </div>
        );

      case 'text':
        return (
          <div>
            <Label htmlFor="text">Texto</Label>
            <Textarea
              id="text"
              value={selectedElement.content.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              placeholder="Digite seu texto..."
              rows={4}
            />
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Texto do Botão</Label>
              <Input
                id="text"
                value={selectedElement.content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Clique aqui"
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={selectedElement.content.url || ''}
                onChange={(e) => updateContent('url', e.target.value)}
                placeholder="https://exemplo.com"
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="src">URL da Imagem</Label>
              <Input
                id="src"
                value={selectedElement.content.src || ''}
                onChange={(e) => updateContent('src', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            <div>
              <Label htmlFor="alt">Texto Alternativo</Label>
              <Input
                id="alt"
                value={selectedElement.content.alt || ''}
                onChange={(e) => updateContent('alt', e.target.value)}
                placeholder="Descrição da imagem"
              />
            </div>
          </div>
        );

      case 'spacer':
        return (
          <div>
            <Label htmlFor="height">Altura (px)</Label>
            <Input
              id="height"
              type="number"
              value={selectedElement.content.height || 40}
              onChange={(e) => updateContent('height', parseInt(e.target.value))}
              min="10"
              max="500"
            />
          </div>
        );

      default:
        return (
          <div>
            <p className="text-sm text-gray-500">
              Propriedades específicas não disponíveis para este tipo de elemento.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Propriedades
          </h2>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={onDuplicateElement}
              title="Duplicar"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDeleteElement(selectedElement.id)}
              title="Excluir"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>

        {/* Element Type */}
        <div className="mb-4">
          <div className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {selectedElement.type}
          </div>
        </div>

        <div className="space-y-6">
          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Conteúdo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderContentFields()}
            </CardContent>
          </Card>

          {/* Position & Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Posição e Tamanho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="x">X</Label>
                  <Input
                    id="x"
                    type="number"
                    value={selectedElement.position.x}
                    onChange={(e) => updatePosition('x', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="y">Y</Label>
                  <Input
                    id="y"
                    type="number"
                    value={selectedElement.position.y}
                    onChange={(e) => updatePosition('y', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="width">Largura</Label>
                  <Input
                    id="width"
                    type="number"
                    value={selectedElement.size.width}
                    onChange={(e) => updateSize('width', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Altura</Label>
                  <Input
                    id="height"
                    type="number"
                    value={selectedElement.size.height}
                    onChange={(e) => updateSize('height', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Style */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Estilo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={selectedElement.style.backgroundColor || '#ffffff'}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="color">Cor do Texto</Label>
                <Input
                  id="color"
                  type="color"
                  value={selectedElement.style.color || '#000000'}
                  onChange={(e) => updateStyle('color', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="padding">Padding</Label>
                <Input
                  id="padding"
                  value={selectedElement.style.padding || '0px'}
                  onChange={(e) => updateStyle('padding', e.target.value)}
                  placeholder="Ex: 20px ou 10px 20px"
                />
              </div>
              
              <div>
                <Label htmlFor="borderRadius">Border Radius</Label>
                <Input
                  id="borderRadius"
                  value={selectedElement.style.borderRadius || '0px'}
                  onChange={(e) => updateStyle('borderRadius', e.target.value)}
                  placeholder="Ex: 8px"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
