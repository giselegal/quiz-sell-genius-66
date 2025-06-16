
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

          <TabsContent value="imagem" className="p-4 space-y-6">
            {/* Layout das Opções */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[#8B7355]">Layout das Opções</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-2 h-auto p-3 border-[#B89B7A]/30 text-[#8B7355] hover:bg-[#B89B7A]/10"
                >
                  <div className="w-8 h-6 bg-[#B89B7A]/20 rounded grid grid-cols-2 gap-0.5">
                    <div className="bg-[#B89B7A] rounded-sm"></div>
                    <div className="bg-[#B89B7A] rounded-sm"></div>
                  </div>
                  <span className="text-xs">2 Colunas</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center gap-2 h-auto p-3 border-[#B89B7A]/30 text-[#8B7355] hover:bg-[#B89B7A]/10"
                >
                  <div className="w-8 h-6 bg-[#B89B7A]/20 rounded grid grid-cols-3 gap-0.5">
                    <div className="bg-[#B89B7A] rounded-sm"></div>
                    <div className="bg-[#B89B7A] rounded-sm"></div>
                    <div className="bg-[#B89B7A] rounded-sm"></div>
                  </div>
                  <span className="text-xs">3 Colunas</span>
                </Button>
              </div>
            </div>

            {/* Altura das imagens */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Altura das imagens: 192px</Label>
              <Slider
                defaultValue={[192]}
                min={120}
                max={300}
                step={12}
                className="w-full"
              />
              <div className="text-xs text-[#8B7355]/70">Recomendado: 192px para melhor proporção</div>
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Arredondamento: 12px</Label>
              <Slider
                defaultValue={[12]}
                min={0}
                max={24}
                step={2}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[#8B7355]/70">
                <span>Quadrado</span>
                <span>Arredondado</span>
              </div>
            </div>

            {/* Ajuste da Imagem */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Ajuste da Imagem</Label>
              <Select defaultValue="cover">
                <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cover">Cobrir - Preenche todo espaço</SelectItem>
                  <SelectItem value="contain">Conter - Imagem completa visível</SelectItem>
                  <SelectItem value="fill">Preencher - Distorção permitida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Efeitos Visuais */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[#8B7355]">Efeitos Visuais</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-[#8B7355]">Sombra</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-24 h-8 border-[#B89B7A]/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma</SelectItem>
                      <SelectItem value="small">Sutil</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="large">Intensa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-[#8B7355]">Hover (Ampliar)</Label>
                  <Select defaultValue="scale-105">
                    <SelectTrigger className="w-24 h-8 border-[#B89B7A]/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Desligado</SelectItem>
                      <SelectItem value="scale-102">Sutil</SelectItem>
                      <SelectItem value="scale-105">Médio</SelectItem>
                      <SelectItem value="scale-110">Intenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Espaçamento entre opções */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Espaçamento entre opções: 16px</Label>
              <Slider
                defaultValue={[16]}
                min={8}
                max={32}
                step={4}
                className="w-full"
              />
            </div>

            {/* Cores de Estado */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-[#8B7355]">Cores de Estado</Label>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-[#8B7355]">Cor de Seleção</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      defaultValue="#B89B7A"
                      className="w-12 h-8 p-0 border-0 rounded"
                    />
                    <Input
                      defaultValue="#B89B7A"
                      placeholder="#B89B7A"
                      className="flex-1 text-xs border-[#B89B7A]/30 focus:border-[#B89B7A]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-[#8B7355]">Cor de Hover</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      defaultValue="#D4C4A8"
                      className="w-12 h-8 p-0 border-0 rounded"
                    />
                    <Input
                      defaultValue="#D4C4A8"
                      placeholder="#D4C4A8"
                      className="flex-1 text-xs border-[#B89B7A]/30 focus:border-[#B89B7A]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview das Configurações */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#8B7355]">Preview</Label>
              <div className="border border-[#B89B7A]/30 rounded-lg p-3 bg-gray-50">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border-2 border-[#B89B7A] rounded-xl overflow-hidden shadow-md transform scale-105">
                    <div className="h-16 bg-gradient-to-br from-[#B89B7A] to-[#8B7355]"></div>
                    <div className="p-2">
                      <div className="h-2 bg-[#B89B7A]/20 rounded mb-1"></div>
                      <div className="h-1.5 bg-[#B89B7A]/10 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-16 bg-gray-200"></div>
                    <div className="p-2">
                      <div className="h-2 bg-gray-200 rounded mb-1"></div>
                      <div className="h-1.5 bg-gray-100 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-center text-[#8B7355]/70 mt-2">
                  Selecionada vs Normal
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
