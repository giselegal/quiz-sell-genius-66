import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Copy, Trash2, Palette } from 'lucide-react';

interface PropertiesPanelProps {
  selectedItem: any;
  step: any;
  onUpdateItem: (itemId: string, props: Record<string, any>) => void;
  onUpdateStep: (updates: any) => void;
  onDeleteItem: (itemId: string) => void;
  onDuplicateItem: (itemId: string) => void;
  collapsed: boolean;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedItem,
  step,
  onUpdateItem,
  onUpdateStep,
  onDeleteItem,
  onDuplicateItem,
  collapsed
}) => {
  if (collapsed) {
    return (
      <div className="p-4 text-center">
        <Settings className="w-6 h-6 mx-auto text-gray-400" />
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          <Settings className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="font-medium mb-2">Nenhum item selecionado</h3>
          <p className="text-sm">Clique em um componente para editar suas propriedades</p>
        </div>
        
        {step && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Configurações da Etapa</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="showLogo">Mostrar Logo</Label>
                <Switch
                  id="showLogo"
                  checked={step.settings.showLogo}
                  onCheckedChange={(checked) => 
                    onUpdateStep({ settings: { ...step.settings, showLogo: checked } })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showProgress">Mostrar Progresso</Label>
                <Switch
                  id="showProgress"
                  checked={step.settings.showProgress}
                  onCheckedChange={(checked) => 
                    onUpdateStep({ settings: { ...step.settings, showProgress: checked } })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="allowReturn">Permitir Voltar</Label>
                <Switch
                  id="allowReturn"
                  checked={step.settings.allowReturn}
                  onCheckedChange={(checked) => 
                    onUpdateStep({ settings: { ...step.settings, allowReturn: checked } })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const updateProp = (key: string, value: any) => {
    onUpdateItem(selectedItem.id, { [key]: value });
  };

  const renderPropertyControls = () => {
    switch (selectedItem.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label>Conteúdo</Label>
              <Textarea
                value={selectedItem.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <Label>Tamanho da Fonte</Label>
              <div className="mt-2">
                <Slider
                  value={[selectedItem.props.fontSize || 16]}
                  onValueChange={([value]) => updateProp('fontSize', value)}
                  min={12}
                  max={72}
                  step={1}
                />
                <span className="text-xs text-gray-500">{selectedItem.props.fontSize || 16}px</span>
              </div>
            </div>
            
            <div>
              <Label>Cor</Label>
              <Input
                type="color"
                value={selectedItem.props.color || '#432818'}
                onChange={(e) => updateProp('color', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Alinhamento</Label>
              <Select
                value={selectedItem.props.textAlign || 'left'}
                onValueChange={(value) => updateProp('textAlign', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Esquerda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Direita</SelectItem>
                  <SelectItem value="justify">Justificado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <Label>Conteúdo</Label>
              <Input
                value={selectedItem.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Nível</Label>
              <Select
                value={selectedItem.props.level?.toString() || '1'}
                onValueChange={(value) => updateProp('level', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1</SelectItem>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                  <SelectItem value="4">H4</SelectItem>
                  <SelectItem value="5">H5</SelectItem>
                  <SelectItem value="6">H6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Tamanho da Fonte</Label>
              <div className="mt-2">
                <Slider
                  value={[selectedItem.props.fontSize || 32]}
                  onValueChange={([value]) => updateProp('fontSize', value)}
                  min={16}
                  max={72}
                  step={1}
                />
                <span className="text-xs text-gray-500">{selectedItem.props.fontSize || 32}px</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="gradient">Gradiente</Label>
              <Switch
                id="gradient"
                checked={selectedItem.props.gradient || false}
                onCheckedChange={(checked) => updateProp('gradient', checked)}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <Label>URL da Imagem</Label>
              <Input
                value={selectedItem.props.src || ''}
                onChange={(e) => updateProp('src', e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            
            <div>
              <Label>Texto Alternativo</Label>
              <Input
                value={selectedItem.props.alt || ''}
                onChange={(e) => updateProp('alt', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Largura</Label>
              <div className="mt-2">
                <Slider
                  value={[selectedItem.props.width || 400]}
                  onValueChange={([value]) => updateProp('width', value)}
                  min={100}
                  max={800}
                  step={10}
                />
                <span className="text-xs text-gray-500">{selectedItem.props.width || 400}px</span>
              </div>
            </div>
            
            <div>
              <Label>Altura</Label>
              <div className="mt-2">
                <Slider
                  value={[selectedItem.props.height || 300]}
                  onValueChange={([value]) => updateProp('height', value)}
                  min={100}
                  max={600}
                  step={10}
                />
                <span className="text-xs text-gray-500">{selectedItem.props.height || 300}px</span>
              </div>
            </div>
            
            <div>
              <Label>Legenda</Label>
              <Input
                value={selectedItem.props.caption || ''}
                onChange={(e) => updateProp('caption', e.target.value)}
              />
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <Label>Texto do Botão</Label>
              <Input
                value={selectedItem.props.text || ''}
                onChange={(e) => updateProp('text', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Cor de Fundo</Label>
              <Input
                type="color"
                value={selectedItem.props.backgroundColor || '#B89B7A'}
                onChange={(e) => updateProp('backgroundColor', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Cor do Texto</Label>
              <Input
                type="color"
                value={selectedItem.props.textColor || '#ffffff'}
                onChange={(e) => updateProp('textColor', e.target.value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="fullWidth">Largura Completa</Label>
              <Switch
                id="fullWidth"
                checked={selectedItem.props.fullWidth || false}
                onCheckedChange={(checked) => updateProp('fullWidth', checked)}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <Palette className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Propriedades não disponíveis para este componente</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">{selectedItem.type}</h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDuplicateItem(selectedItem.id)}
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteItem(selectedItem.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500">ID: {selectedItem.id}</p>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="style" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="style">Estilo</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="style" className="space-y-4 mt-4">
            {renderPropertyControls()}
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 mt-4">
            <div>
              <Label>Configurações Avançadas</Label>
              <p className="text-xs text-gray-500 mt-1">
                Configurações específicas do componente
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
