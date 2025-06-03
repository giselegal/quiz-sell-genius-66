import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Shield, 
  Clock, 
  RefreshCw, 
  DollarSign, 
  Star, 
  CheckCircle, 
  TrendingUp,
  Zap,
  Award,
  Heart
} from 'lucide-react';
import type { Block } from '@/types/editor';

interface GuaranteePropertyEditorProps {
  block: Block;
  onUpdate: (blockId: string, content: any) => void;
}

const guaranteeIcons = [
  { id: 'shield', icon: Shield, name: 'Escudo' },
  { id: 'clock', icon: Clock, name: 'Relógio' },
  { id: 'refresh', icon: RefreshCw, name: 'Renovar' },
  { id: 'dollar', icon: DollarSign, name: 'Dinheiro' },
  { id: 'star', icon: Star, name: 'Estrela' },
  { id: 'check', icon: CheckCircle, name: 'Check' },
  { id: 'trending', icon: TrendingUp, name: 'Crescimento' },
  { id: 'zap', icon: Zap, name: 'Raio' },
  { id: 'award', icon: Award, name: 'Prêmio' },
  { id: 'heart', icon: Heart, name: 'Coração' }
];

const guaranteeTemplates = [
  {
    name: 'Garantia 30 dias',
    icon: 'shield',
    title: 'Garantia de 30 dias',
    description: 'Se você não ficar 100% satisfeito, devolvemos seu dinheiro sem perguntas.',
    period: '30 dias',
    showIcon: true,
    iconColor: '#22c55e',
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e'
  },
  {
    name: 'Garantia 60 dias',
    icon: 'clock',
    title: 'Garantia estendida de 60 dias',
    description: 'Experimente por 60 dias completos. Não gostou? Reembolso total garantido.',
    period: '60 dias',
    showIcon: true,
    iconColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6'
  },
  {
    name: 'Satisfação garantida',
    icon: 'star',
    title: 'Satisfação 100% garantida',
    description: 'Sua satisfação é nossa prioridade. Garantimos resultados ou seu dinheiro de volta.',
    period: 'Vitalícia',
    showIcon: true,
    iconColor: '#f59e0b',
    backgroundColor: '#fffbeb',
    borderColor: '#f59e0b'
  }
];

export const GuaranteePropertyEditor: React.FC<GuaranteePropertyEditorProps> = ({
  block,
  onUpdate
}) => {
  const content = block.content || {
    icon: 'shield',
    title: 'Garantia de 30 dias',
    description: 'Se você não ficar 100% satisfeito, devolvemos seu dinheiro sem perguntas.',
    period: '30 dias',
    showIcon: true,
    showPeriod: true,
    iconColor: '#22c55e',
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
    textColor: '#1f2937',
    titleSize: 18,
    descriptionSize: 14,
    borderRadius: 8,
    padding: 24,
    textAlign: 'center' as const
  };

  const updateContent = (updates: Partial<typeof content>) => {
    onUpdate(block.id, { ...content, ...updates });
  };

  const applyTemplate = (template: typeof guaranteeTemplates[0]) => {
    updateContent({
      icon: template.icon,
      title: template.title,
      description: template.description,
      period: template.period,
      showIcon: template.showIcon,
      iconColor: template.iconColor,
      backgroundColor: template.backgroundColor,
      borderColor: template.borderColor
    });
  };

  const selectedIcon = guaranteeIcons.find(icon => icon.id === content.icon);
  const IconComponent = selectedIcon?.icon || Shield;

  return (
    <div className="space-y-4">
      {/* Quick Templates */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Templates Rápidos
          </Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {guaranteeTemplates.map((template, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left h-auto p-3 hover:bg-[#FAF9F7]"
              onClick={() => applyTemplate(template)}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="p-2 rounded"
                  style={{ backgroundColor: template.backgroundColor }}
                >
                  {React.createElement(
                    guaranteeIcons.find(i => i.id === template.icon)?.icon || Shield,
                    { 
                      className: "h-4 w-4",
                      style: { color: template.iconColor }
                    }
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {template.title}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="text-sm font-medium">Conteúdo</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Icon Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Ícone</Label>
              <Switch
                checked={content.showIcon}
                onCheckedChange={(checked) => updateContent({ showIcon: checked })}
              />
            </div>
            {content.showIcon && (
              <div className="grid grid-cols-5 gap-2">
                {guaranteeIcons.map((icon) => (
                  <Button
                    key={icon.id}
                    variant={content.icon === icon.id ? "default" : "outline"}
                    size="sm"
                    className="h-10 w-10 p-0"
                    onClick={() => updateContent({ icon: icon.id })}
                    title={icon.name}
                  >
                    <icon.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Title */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Título</Label>
            <Input
              value={content.title}
              onChange={(e) => updateContent({ title: e.target.value })}
              placeholder="Digite o título da garantia"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Descrição</Label>
            <Textarea
              value={content.description}
              onChange={(e) => updateContent({ description: e.target.value })}
              placeholder="Descreva os detalhes da garantia"
              rows={3}
            />
          </div>

          {/* Period */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Período</Label>
              <Switch
                checked={content.showPeriod}
                onCheckedChange={(checked) => updateContent({ showPeriod: checked })}
              />
            </div>
            {content.showPeriod && (
              <Input
                value={content.period}
                onChange={(e) => updateContent({ period: e.target.value })}
                placeholder="Ex: 30 dias, 60 dias, Vitalícia"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Styling */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="text-sm font-medium">Estilo</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Cor do Ícone</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={content.iconColor}
                  onChange={(e) => updateContent({ iconColor: e.target.value })}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={content.iconColor}
                  onChange={(e) => updateContent({ iconColor: e.target.value })}
                  className="text-xs"
                  placeholder="#22c55e"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Cor do Texto</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={content.textColor}
                  onChange={(e) => updateContent({ textColor: e.target.value })}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={content.textColor}
                  onChange={(e) => updateContent({ textColor: e.target.value })}
                  className="text-xs"
                  placeholder="#1f2937"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Cor de Fundo</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={content.backgroundColor}
                  onChange={(e) => updateContent({ backgroundColor: e.target.value })}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={content.backgroundColor}
                  onChange={(e) => updateContent({ backgroundColor: e.target.value })}
                  className="text-xs"
                  placeholder="#f0fdf4"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Cor da Borda</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={content.borderColor}
                  onChange={(e) => updateContent({ borderColor: e.target.value })}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={content.borderColor}
                  onChange={(e) => updateContent({ borderColor: e.target.value })}
                  className="text-xs"
                  placeholder="#22c55e"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Typography */}
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Tamanho do Título</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[content.titleSize]}
                  onValueChange={(value) => updateContent({ titleSize: value[0] })}
                  min={12}
                  max={32}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8">
                  {content.titleSize}px
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Tamanho da Descrição</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[content.descriptionSize]}
                  onValueChange={(value) => updateContent({ descriptionSize: value[0] })}
                  min={10}
                  max={20}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8">
                  {content.descriptionSize}px
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Layout */}
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Alinhamento</Label>
              <div className="flex gap-1">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <Button
                    key={align}
                    variant={content.textAlign === align ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateContent({ textAlign: align })}
                    className="flex-1 text-xs"
                  >
                    {align === 'left' && '←'}
                    {align === 'center' && '↔'}
                    {align === 'right' && '→'}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Padding</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[content.padding]}
                  onValueChange={(value) => updateContent({ padding: value[0] })}
                  min={8}
                  max={48}
                  step={4}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8">
                  {content.padding}px
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Arredondamento</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[content.borderRadius]}
                  onValueChange={(value) => updateContent({ borderRadius: value[0] })}
                  min={0}
                  max={24}
                  step={2}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8">
                  {content.borderRadius}px
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="text-sm font-medium">Preview</Label>
        </CardHeader>
        <CardContent>
          <div 
            className="border rounded-lg"
            style={{ 
              backgroundColor: content.backgroundColor,
              borderColor: content.borderColor,
              borderRadius: `${content.borderRadius}px`,
              padding: `${content.padding}px`,
              textAlign: content.textAlign
            }}
          >
            {content.showIcon && (
              <div className="mb-3 flex justify-center">
                <IconComponent 
                  className="h-8 w-8"
                  style={{ color: content.iconColor }}
                />
              </div>
            )}
            
            <div 
              className="font-semibold mb-2"
              style={{ 
                color: content.textColor,
                fontSize: `${content.titleSize}px`
              }}
            >
              {content.title}
            </div>
            
            <div 
              className="mb-2"
              style={{ 
                color: content.textColor,
                fontSize: `${content.descriptionSize}px`,
                opacity: 0.8
              }}
            >
              {content.description}
            </div>
            
            {content.showPeriod && (
              <Badge 
                variant="outline" 
                className="text-xs"
                style={{ 
                  borderColor: content.borderColor,
                  color: content.iconColor
                }}
              >
                {content.period}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
