
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
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Copy, 
  Trash2, 
  Palette, 
  Type, 
  Image as ImageIcon,
  MousePointer,
  Layout,
  Link,
  Eye,
  EyeOff
} from 'lucide-react';

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
          <Card className="mt-8 p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Configurações da Etapa
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="showLogo" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Mostrar Logo
                </Label>
                <Switch
                  id="showLogo"
                  checked={step.settings?.showLogo || false}
                  onCheckedChange={(checked) => 
                    onUpdateStep({ settings: { ...step.settings, showLogo: checked } })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showProgress" className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                  Mostrar Progresso
                </Label>
                <Switch
                  id="showProgress"
                  checked={step.settings?.showProgress || false}
                  onCheckedChange={(checked) =>
                    onUpdateStep({ settings: { ...step.settings, showProgress: checked } })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="allowReturn" className="flex items-center gap-2">
                  <MousePointer className="w-4 h-4" />
                  Permitir Voltar
                </Label>
                <Switch
                  id="allowReturn"
                  checked={step.settings?.allowReturn || false}
                  onCheckedChange={(checked) =>
                    onUpdateStep({ settings: { ...step.settings, allowReturn: checked } })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isVisible" className="flex items-center gap-2">
                  {step.settings?.isVisible ? 
                    <Eye className="w-4 h-4 text-green-500" /> : 
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  }
                  Visível
                </Label>
                <Switch
                  id="isVisible"
                  checked={step.settings?.isVisible || false}
                  onCheckedChange={(checked) =>
                    onUpdateStep({ settings: { ...step.settings, isVisible: checked } })
                  }
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  const updateProp = (key: string, value: any) => {
    onUpdateItem(selectedItem.id, { [key]: value });
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header com informações do componente */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              {selectedItem.type === 'text' && <Type className="w-4 h-4 text-blue-600" />}
              {selectedItem.type === 'heading' && <Type className="w-4 h-4 text-blue-600" />}
              {selectedItem.type === 'button' && <MousePointer className="w-4 h-4 text-blue-600" />}
              {selectedItem.type === 'image' && <ImageIcon className="w-4 h-4 text-blue-600" />}
            </div>
            <div>
              <h3 className="font-semibold capitalize">{selectedItem.type}</h3>
              <p className="text-xs text-gray-500">ID: {selectedItem.id.split('-')[0]}...</p>
            </div>
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDuplicateItem(selectedItem.id)}
              className="h-8 w-8 p-0"
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteItem(selectedItem.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <Badge variant="secondary" className="text-xs">
          Posição: {selectedItem.position + 1}
        </Badge>
      </div>

      {/* Properties com tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 m-2">
            <TabsTrigger value="content" className="text-xs">📝 Conteúdo</TabsTrigger>
            <TabsTrigger value="style" className="text-xs">🎨 Estilo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="p-4 space-y-4">
            {selectedItem.type === 'text' && (
              <div className="space-y-4">
                <div>
                  <Label>Conteúdo</Label>
                  <Textarea
                    value={selectedItem.props?.content || ''}
                    onChange={(e) => updateProp('content', e.target.value)}
                    rows={4}
                    placeholder="Digite seu texto aqui..."
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {selectedItem.type === 'heading' && (
              <div className="space-y-4">
                <div>
                  <Label>Título</Label>
                  <Input
                    value={selectedItem.props?.text || ''}
                    onChange={(e) => updateProp('text', e.target.value)}
                    placeholder="Digite o título..."
                  />
                </div>
                
                <div>
                  <Label>Nível</Label>
                  <Select
                    value={selectedItem.props?.level?.toString() || '1'}
                    onValueChange={(value) => updateProp('level', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">H1 - Principal</SelectItem>
                      <SelectItem value="2">H2 - Seção</SelectItem>
                      <SelectItem value="3">H3 - Subseção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {selectedItem.type === 'button' && (
              <div className="space-y-4">
                <div>
                  <Label>Texto do Botão</Label>
                  <Input
                    value={selectedItem.props?.text || ''}
                    onChange={(e) => updateProp('text', e.target.value)}
                    placeholder="Clique aqui"
                  />
                </div>
                
                <div>
                  <Label>Link/Ação</Label>
                  <Input
                    value={selectedItem.props?.href || ''}
                    onChange={(e) => updateProp('href', e.target.value)}
                    placeholder="https://exemplo.com"
                  />
                </div>
              </div>
            )}

            {selectedItem.type === 'image' && (
              <div className="space-y-4">
                <div>
                  <Label>URL da Imagem</Label>
                  <Input
                    value={selectedItem.props?.src || ''}
                    onChange={(e) => updateProp('src', e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                
                <div>
                  <Label>Texto Alternativo</Label>
                  <Input
                    value={selectedItem.props?.alt || ''}
                    onChange={(e) => updateProp('alt', e.target.value)}
                    placeholder="Descrição da imagem"
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="style" className="p-4 space-y-4">
            <div>
              <Label>Cor do Texto</Label>
              <div className="flex gap-2 mt-1">
                <input
                  type="color"
                  value={selectedItem.props?.color || '#432818'}
                  onChange={(e) => updateProp('color', e.target.value)}
                  className="w-16 h-8 p-1"
                />
                <Input
                  value={selectedItem.props?.color || '#432818'}
                  onChange={(e) => updateProp('color', e.target.value)}
                  placeholder="#432818"
                  className="flex-1 h-8"
                />
              </div>
            </div>

            <div>
              <Label>Tamanho da Fonte</Label>
              <div className="mt-1">
                <Slider
                  value={[selectedItem.props?.fontSize || 16]}
                  onValueChange={([value]) => updateProp('fontSize', value)}
                  min={8}
                  max={72}
                  step={1}
                />
                <span className="text-xs text-gray-500 mt-1 block">
                  {selectedItem.props?.fontSize || 16}px
                </span>
              </div>
            </div>

            <div>
              <Label>Visibilidade</Label>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="visible" className="text-sm">👁️ Visível</Label>
                  <Switch
                    id="visible"
                    checked={selectedItem.props?.visible !== false}
                    onCheckedChange={(checked) => updateProp('visible', checked)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
