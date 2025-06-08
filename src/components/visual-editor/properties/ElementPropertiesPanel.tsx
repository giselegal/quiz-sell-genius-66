import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, 
  Palette, 
  Layout, 
  Settings,
  Image,
  Link,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  X
} from 'lucide-react';
import { ColorPicker } from '@/components/result-editor/ColorPicker';

interface CanvasElement {
  id: string;
  type: string;
  content: any;
  style: any;
  visible: boolean;
  locked: boolean;
}

interface ElementPropertiesPanelProps {
  element: CanvasElement | null;
  onUpdate: (updates: Partial<CanvasElement>) => void;
  onClose: () => void;
}

export const ElementPropertiesPanel: React.FC<ElementPropertiesPanelProps> = ({
  element,
  onUpdate,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('content');

  if (!element) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Selecione um elemento para editar suas propriedades</p>
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

  const updateSettings = (key: string, value: any) => {
    onUpdate({ [key]: value });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Propriedades</h3>
          <p className="text-sm text-gray-500 capitalize">{element.type}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Button
            variant={element.visible ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateSettings('visible', !element.visible)}
            className="flex-1"
          >
            {element.visible ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
            {element.visible ? 'Visível' : 'Oculto'}
          </Button>
          <Button
            variant={element.locked ? 'default' : 'outline'}
            size="sm"
            onClick={() => updateSettings('locked', !element.locked)}
            className="flex-1"
          >
            {element.locked ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
            {element.locked ? 'Bloqueado' : 'Livre'}
          </Button>
        </div>
      </div>

      {/* Properties Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 m-4">
          <TabsTrigger value="content" className="text-xs">
            <Type className="w-3 h-3 mr-1" />
            Conteúdo
          </TabsTrigger>
          <TabsTrigger value="style" className="text-xs">
            <Palette className="w-3 h-3 mr-1" />
            Estilo
          </TabsTrigger>
          <TabsTrigger value="layout" className="text-xs">
            <Layout className="w-3 h-3 mr-1" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs">
            <Settings className="w-3 h-3 mr-1" />
            Avançado
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          {/* Content Tab */}
          <TabsContent value="content" className="p-4 space-y-4">
            {renderContentProperties(element, updateContent)}
          </TabsContent>

          {/* Style Tab */}
          <TabsContent value="style" className="p-4 space-y-4">
            {renderStyleProperties(element, updateStyle)}
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="p-4 space-y-4">
            {renderLayoutProperties(element, updateStyle)}
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="p-4 space-y-4">
            {renderAdvancedProperties(element, updateStyle, updateSettings)}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

// Content Properties
const renderContentProperties = (element: CanvasElement, updateContent: (key: string, value: any) => void) => {
  switch (element.type) {
    case 'heading':
    case 'text':
      return (
        <>
          <div>
            <Label htmlFor="text">Texto</Label>
            <Textarea
              id="text"
              value={element.content?.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              rows={3}
            />
          </div>
          {element.type === 'heading' && (
            <div>
              <Label htmlFor="level">Nível do Título</Label>
              <Select
                value={element.content?.level || 'h1'}
                onValueChange={(value) => updateContent('level', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1 - Principal</SelectItem>
                  <SelectItem value="h2">H2 - Secundário</SelectItem>
                  <SelectItem value="h3">H3 - Terciário</SelectItem>
                  <SelectItem value="h4">H4 - Menor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </>
      );

    case 'button':
      return (
        <>
          <div>
            <Label htmlFor="text">Texto do Botão</Label>
            <Input
              id="text"
              value={element.content?.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="url">URL de Destino</Label>
            <Input
              id="url"
              type="url"
              value={element.content?.url || ''}
              onChange={(e) => updateContent('url', e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label htmlFor="target">Abrir em</Label>
            <Select
              value={element.content?.target || '_self'}
              onValueChange={(value) => updateContent('target', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_self">Mesma aba</SelectItem>
                <SelectItem value="_blank">Nova aba</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      );

    case 'image':
      return (
        <>
          <div>
            <Label htmlFor="src">URL da Imagem</Label>
            <Input
              id="src"
              type="url"
              value={element.content?.src || ''}
              onChange={(e) => updateContent('src', e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label htmlFor="alt">Texto Alternativo</Label>
            <Input
              id="alt"
              value={element.content?.alt || ''}
              onChange={(e) => updateContent('alt', e.target.value)}
              placeholder="Descrição da imagem"
            />
          </div>
          <div>
            <Label htmlFor="caption">Legenda</Label>
            <Input
              id="caption"
              value={element.content?.caption || ''}
              onChange={(e) => updateContent('caption', e.target.value)}
              placeholder="Legenda opcional"
            />
          </div>
        </>
      );

    default:
      return (
        <div className="text-center text-gray-500 py-8">
          <p className="text-sm">Nenhuma propriedade de conteúdo disponível para este elemento.</p>
        </div>
      );
  }
};

// Style Properties
const renderStyleProperties = (element: CanvasElement, updateStyle: (key: string, value: any) => void) => {
  return (
    <>
      {/* Colors */}
      <div>
        <Label>Cor do Texto</Label>
        <ColorPicker
          color={element.style?.color || '#000000'}
          onChange={(color) => updateStyle('color', color)}
        />
      </div>

      <div>
        <Label>Cor de Fundo</Label>
        <ColorPicker
          color={element.style?.backgroundColor || 'transparent'}
          onChange={(color) => updateStyle('backgroundColor', color)}
        />
      </div>

      {/* Typography */}
      <div>
        <Label htmlFor="fontSize">Tamanho da Fonte</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[parseInt(element.style?.fontSize) || 16]}
            onValueChange={([value]) => updateStyle('fontSize', `${value}px`)}
            max={72}
            min={8}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-12">
            {element.style?.fontSize || '16px'}
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="fontWeight">Peso da Fonte</Label>
        <Select
          value={element.style?.fontWeight || 'normal'}
          onValueChange={(value) => updateStyle('fontWeight', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="bold">Negrito</SelectItem>
            <SelectItem value="lighter">Mais Leve</SelectItem>
            <SelectItem value="bolder">Mais Pesado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="textAlign">Alinhamento do Texto</Label>
        <Select
          value={element.style?.textAlign || 'left'}
          onValueChange={(value) => updateStyle('textAlign', value)}
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
    </>
  );
};

// Layout Properties
const renderLayoutProperties = (element: CanvasElement, updateStyle: (key: string, value: any) => void) => {
  return (
    <>
      {/* Spacing */}
      <div>
        <Label>Margem Externa</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="marginTop" className="text-xs">Superior</Label>
            <Input
              id="marginTop"
              type="number"
              value={parseInt(element.style?.marginTop) || 0}
              onChange={(e) => updateStyle('marginTop', `${e.target.value}px`)}
            />
          </div>
          <div>
            <Label htmlFor="marginBottom" className="text-xs">Inferior</Label>
            <Input
              id="marginBottom"
              type="number"
              value={parseInt(element.style?.marginBottom) || 0}
              onChange={(e) => updateStyle('marginBottom', `${e.target.value}px`)}
            />
          </div>
        </div>
      </div>

      <div>
        <Label>Espaçamento Interno</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="paddingX" className="text-xs">Horizontal</Label>
            <Input
              id="paddingX"
              type="number"
              value={parseInt(element.style?.paddingLeft) || 0}
              onChange={(e) => {
                updateStyle('paddingLeft', `${e.target.value}px`);
                updateStyle('paddingRight', `${e.target.value}px`);
              }}
            />
          </div>
          <div>
            <Label htmlFor="paddingY" className="text-xs">Vertical</Label>
            <Input
              id="paddingY"
              type="number"
              value={parseInt(element.style?.paddingTop) || 0}
              onChange={(e) => {
                updateStyle('paddingTop', `${e.target.value}px`);
                updateStyle('paddingBottom', `${e.target.value}px`);
              }}
            />
          </div>
        </div>
      </div>

      {/* Border */}
      <div>
        <Label htmlFor="borderRadius">Bordas Arredondadas</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[parseInt(element.style?.borderRadius) || 0]}
            onValueChange={([value]) => updateStyle('borderRadius', `${value}px`)}
            max={50}
            min={0}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-12">
            {element.style?.borderRadius || '0px'}
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="borderWidth">Espessura da Borda</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[parseInt(element.style?.borderWidth) || 0]}
            onValueChange={([value]) => updateStyle('borderWidth', `${value}px`)}
            max={10}
            min={0}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-12">
            {element.style?.borderWidth || '0px'}
          </span>
        </div>
      </div>

      <div>
        <Label>Cor da Borda</Label>
        <ColorPicker
          color={element.style?.borderColor || '#e5e7eb'}
          onChange={(color) => updateStyle('borderColor', color)}
        />
      </div>
    </>
  );
};

// Advanced Properties
const renderAdvancedProperties = (
  element: CanvasElement, 
  updateStyle: (key: string, value: any) => void,
  updateSettings: (key: string, value: any) => void
) => {
  return (
    <>
      {/* Animation */}
      <div>
        <Label htmlFor="animation">Animação de Entrada</Label>
        <Select
          value={element.style?.animation || 'none'}
          onValueChange={(value) => updateStyle('animation', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhuma</SelectItem>
            <SelectItem value="fadeIn">Fade In</SelectItem>
            <SelectItem value="slideUp">Slide Up</SelectItem>
            <SelectItem value="slideDown">Slide Down</SelectItem>
            <SelectItem value="zoomIn">Zoom In</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Shadow */}
      <div>
        <Label htmlFor="boxShadow">Sombra</Label>
        <Select
          value={element.style?.boxShadow || 'none'}
          onValueChange={(value) => updateStyle('boxShadow', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhuma</SelectItem>
            <SelectItem value="0 1px 3px rgba(0,0,0,0.12)">Leve</SelectItem>
            <SelectItem value="0 4px 6px rgba(0,0,0,0.1)">Média</SelectItem>
            <SelectItem value="0 10px 15px rgba(0,0,0,0.1)">Forte</SelectItem>
            <SelectItem value="0 20px 25px rgba(0,0,0,0.15)">Muito Forte</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Opacity */}
      <div>
        <Label htmlFor="opacity">Opacidade</Label>
        <div className="flex items-center gap-2">
          <Slider
            value={[parseFloat(element.style?.opacity) * 100 || 100]}
            onValueChange={([value]) => updateStyle('opacity', value / 100)}
            max={100}
            min={0}
            step={5}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-12">
            {Math.round((parseFloat(element.style?.opacity) || 1) * 100)}%
          </span>
        </div>
      </div>

      {/* Custom CSS */}
      <div>
        <Label htmlFor="customCSS">CSS Customizado</Label>
        <Textarea
          id="customCSS"
          value={element.style?.customCSS || ''}
          onChange={(e) => updateStyle('customCSS', e.target.value)}
          placeholder="/* CSS customizado aqui */"
          rows={4}
          className="font-mono text-sm"
        />
      </div>
    </>
  );
};
