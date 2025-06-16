
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Type, 
  Image as ImageIcon, 
  Italic, 
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Settings
} from 'lucide-react';

interface OptionConfigurationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  optionId: string;
  onConfigUpdate: (config: any) => void;
}

export const OptionConfigurationPanel: React.FC<OptionConfigurationPanelProps> = ({
  isOpen,
  onClose,
  optionId,
  onConfigUpdate
}) => {
  const [fontSize, setFontSize] = useState(14);
  const [fontWeight, setFontWeight] = useState('Médio');
  const [textAlign, setTextAlign] = useState('center');
  const [textColor, setTextColor] = useState('#1f2937');
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  if (!isOpen) return null;

  return (
    <Card className="w-80 shadow-lg border-[#B89B7A]/30">
      <CardHeader className="pb-3 bg-[#B89B7A]/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2 text-[#8B7355]">
            <Settings className="w-5 h-5" />
            Configurar Opção
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-[#8B7355] hover:bg-[#B89B7A]/10"
          >
            ×
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="texto" className="w-full">
          <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
            <TabsTrigger 
              value="texto" 
              className="flex items-center gap-2 data-[state=active]:bg-[#B89B7A] data-[state=active]:text-white"
            >
              <Type className="w-4 h-4" />
              Texto
            </TabsTrigger>
            <TabsTrigger 
              value="imagem"
              className="flex items-center gap-2 data-[state=active]:bg-[#B89B7A] data-[state=active]:text-white"
            >
              <ImageIcon className="w-4 h-4" />
              Imagem
            </TabsTrigger>
          </TabsList>

          <TabsContent value="texto" className="p-4 space-y-4">
            {/* Tamanho da Fonte */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Tamanho da Fonte</Label>
              <div className="flex items-center gap-3">
                <Slider
                  value={[fontSize]}
                  onValueChange={([value]) => setFontSize(value)}
                  min={10}
                  max={24}
                  step={1}
                  className="flex-1"
                />
                <Badge variant="outline" className="min-w-[50px] text-center border-[#B89B7A]/30">
                  {fontSize}px
                </Badge>
              </div>
            </div>

            {/* Peso da Fonte */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Peso da Fonte</Label>
              <div className="grid grid-cols-4 gap-1">
                {['Normal', 'Médio', 'Semi', 'Negrito'].map((weight) => (
                  <Button
                    key={weight}
                    variant={fontWeight === weight ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFontWeight(weight)}
                    className={`text-xs ${
                      fontWeight === weight 
                        ? 'bg-[#B89B7A] text-white hover:bg-[#8B7355]' 
                        : 'border-[#B89B7A]/30 text-[#8B7355] hover:bg-[#B89B7A]/10'
                    }`}
                  >
                    {weight}
                  </Button>
                ))}
              </div>
            </div>

            {/* Estilo do Texto */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Estilo do Texto</Label>
              <div className="flex gap-2">
                <Button
                  variant={isItalic ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setIsItalic(!isItalic)}
                  className={`${
                    isItalic 
                      ? 'bg-[#B89B7A] text-white hover:bg-[#8B7355]' 
                      : 'border-[#B89B7A]/30 text-[#8B7355] hover:bg-[#B89B7A]/10'
                  }`}
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  variant={isUnderline ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setIsUnderline(!isUnderline)}
                  className={`${
                    isUnderline 
                      ? 'bg-[#B89B7A] text-white hover:bg-[#8B7355]' 
                      : 'border-[#B89B7A]/30 text-[#8B7355] hover:bg-[#B89B7A]/10'
                  }`}
                >
                  <Underline className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Alinhamento */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Alinhamento</Label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { value: 'left', icon: AlignLeft },
                  { value: 'center', icon: AlignCenter },
                  { value: 'right', icon: AlignRight }
                ].map(({ value, icon: Icon }) => (
                  <Button
                    key={value}
                    variant={textAlign === value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTextAlign(value)}
                    className={`${
                      textAlign === value 
                        ? 'bg-[#B89B7A] text-white hover:bg-[#8B7355]' 
                        : 'border-[#B89B7A]/30 text-[#8B7355] hover:bg-[#B89B7A]/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Cores */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[#8B7355]">Cores</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-[#8B7355]">Cor do Texto</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-12 h-8 p-0 border-0 rounded"
                    />
                    <Input
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      placeholder="#1f2937"
                      className="flex-1 text-xs border-[#B89B7A]/30 focus:border-[#B89B7A]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-[#8B7355]">Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-8 p-0 border-0 rounded"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="transparente"
                      className="flex-1 text-xs border-[#B89B7A]/30 focus:border-[#B89B7A]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Espaçamento */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[#8B7355]">Espaçamento</Label>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-[#8B7355]">Padding interno: 20px</Label>
                  <Slider
                    defaultValue={[20]}
                    min={0}
                    max={40}
                    step={2}
                    className="w-full"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-[#8B7355]">Margem externa: 8px</Label>
                  <Slider
                    defaultValue={[8]}
                    min={0}
                    max={24}
                    step={2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="imagem" className="p-4 space-y-4">
            {/* Altura das imagens */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Altura das imagens: 120px</Label>
              <Slider
                defaultValue={[120]}
                min={80}
                max={300}
                step={10}
                className="w-full"
              />
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Border Radius: 8px</Label>
              <Slider
                defaultValue={[8]}
                min={0}
                max={24}
                step={2}
                className="w-full"
              />
            </div>

            {/* Ajuste da Imagem */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Ajuste da Imagem</Label>
              <Select defaultValue="cover">
                <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cobrir (Cover)</SelectItem>
                  <SelectItem value="contain">Conter (Contain)</SelectItem>
                  <SelectItem value="fill">Preencher (Fill)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Posição da Imagem */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Posição da Imagem</Label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  'top left', 'top center', 'top right',
                  'center left', 'center center', 'center right',
                  'bottom left', 'bottom center', 'bottom right'
                ].map((position) => (
                  <Button
                    key={position}
                    variant="outline"
                    size="sm"
                    className="text-xs p-2 border-[#B89B7A]/30 text-[#8B7355] hover:bg-[#B89B7A]/10"
                  >
                    {position.split(' ').map(word => word.charAt(0).toUpperCase()).join('')}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
