
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EditableContent } from '@/types/editor';
import { ColorPicker } from '@/components/result-editor/ColorPicker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StyleEditorProps {
  style: EditableContent['style'];
  onUpdate: (style: any) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ style = {}, onUpdate }) => {
  const updateStyle = (key: string, value: any) => {
    onUpdate({ ...style, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="typography" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="typography" className="flex-1">Tipografia</TabsTrigger>
          <TabsTrigger value="layout" className="flex-1">Layout</TabsTrigger>
          <TabsTrigger value="colors" className="flex-1">Cores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="typography" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Família da Fonte</Label>
            <Select 
              value={style.fontFamily || ''} 
              onValueChange={(value) => updateStyle('fontFamily', value)}
            >
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Selecione uma fonte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Padrão</SelectItem>
                <SelectItem value="'Playfair Display', serif">Playfair Display</SelectItem>
                <SelectItem value="'Inter', sans-serif">Inter</SelectItem>
                <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                <SelectItem value="'Montserrat', sans-serif">Montserrat</SelectItem>
                <SelectItem value="'Poppins', sans-serif">Poppins</SelectItem>
                <SelectItem value="'Nunito', sans-serif">Nunito</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontSize">Tamanho da Fonte</Label>
            <Input
              id="fontSize"
              value={style.fontSize || ''}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
              placeholder="ex: 16px ou 1.2rem"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontWeight">Peso da Fonte</Label>
            <Select
              value={style.fontWeight || ''} 
              onValueChange={(value) => updateStyle('fontWeight', value)}
            >
              <SelectTrigger id="fontWeight">
                <SelectValue placeholder="Selecione um peso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="300">Leve (300)</SelectItem>
                <SelectItem value="400">Normal (400)</SelectItem>
                <SelectItem value="500">Médio (500)</SelectItem>
                <SelectItem value="600">Semi-Negrito (600)</SelectItem>
                <SelectItem value="700">Negrito (700)</SelectItem>
                <SelectItem value="800">Extra-Negrito (800)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        
        <TabsContent value="layout" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="margin">Margem</Label>
              <Input
                id="margin"
                value={style.margin || ''}
                onChange={(e) => updateStyle('margin', e.target.value)}
                placeholder="ex: 1rem ou 16px"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={style.padding || ''}
                onChange={(e) => updateStyle('padding', e.target.value)}
                placeholder="ex: 1rem ou 16px"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="display">Display</Label>
            <Select
              value={style.display || ''} 
              onValueChange={(value) => updateStyle('display', value)}
            >
              <SelectTrigger id="display">
                <SelectValue placeholder="Selecione um valor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="block">Block</SelectItem>
                <SelectItem value="inline-block">Inline Block</SelectItem>
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="inline-flex">Inline Flex</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="color">Cor do Texto</Label>
            <ColorPicker
              color={style.color || '#000000'}
              onChange={(color) => updateStyle('color', color)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Cor de Fundo</Label>
            <ColorPicker
              color={style.backgroundColor || '#ffffff'}
              onChange={(color) => updateStyle('backgroundColor', color)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StyleEditor;
