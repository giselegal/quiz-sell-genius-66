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
  Palette, 
  Eye, 
  Star, 
  TrendingUp, 
  Award, 
  Target,
  Sparkles,
  Crown,
  Gift,
  Heart,
  Zap
} from 'lucide-react';
import type { Block } from '@/types/editor';

interface StyleResultPropertyEditorProps {
  block: Block;
  onUpdate: (blockId: string, content: any) => void;
}

const resultLayouts = [
  {
    id: 'card',
    name: 'Card',
    description: 'Layout em cartão com bordas arredondadas'
  },
  {
    id: 'banner',
    name: 'Banner',
    description: 'Layout horizontal tipo banner'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Layout minimalista sem bordas'
  },
  {
    id: 'featured',
    name: 'Destaque',
    description: 'Layout destacado com fundo especial'
  }
];

const scoreDisplayTypes = [
  {
    id: 'percentage',
    name: 'Porcentagem',
    example: '85%'
  },
  {
    id: 'points',
    name: 'Pontos',
    example: '85/100'
  },
  {
    id: 'stars',
    name: 'Estrelas',
    example: '★★★★☆'
  },
  {
    id: 'level',
    name: 'Nível',
    example: 'Nível 8/10'
  },
  {
    id: 'grade',
    name: 'Nota',
    example: 'Nota B+'
  }
];

const resultIcons = [
  { id: 'star', icon: Star, name: 'Estrela' },
  { id: 'crown', icon: Crown, name: 'Coroa' },
  { id: 'award', icon: Award, name: 'Prêmio' },
  { id: 'target', icon: Target, name: 'Alvo' },
  { id: 'trending', icon: TrendingUp, name: 'Crescimento' },
  { id: 'sparkles', icon: Sparkles, name: 'Brilho' },
  { id: 'gift', icon: Gift, name: 'Presente' },
  { id: 'heart', icon: Heart, name: 'Coração' },
  { id: 'zap', icon: Zap, name: 'Raio' },
  { id: 'palette', icon: Palette, name: 'Paleta' }
];

const colorThemes = [
  {
    name: 'Azul Elegante',
    primary: '#3b82f6',
    secondary: '#93c5fd',
    background: '#eff6ff',
    text: '#1e40af'
  },
  {
    name: 'Verde Sucesso',
    primary: '#22c55e',
    secondary: '#86efac',
    background: '#f0fdf4',
    text: '#15803d'
  },
  {
    name: 'Roxo Luxo',
    primary: '#8b5cf6',
    secondary: '#c4b5fd',
    background: '#f5f3ff',
    text: '#7c3aed'
  },
  {
    name: 'Dourado Premium',
    primary: '#f59e0b',
    secondary: '#fcd34d',
    background: '#fffbeb',
    text: '#d97706'
  },
  {
    name: 'Rosa Moderno',
    primary: '#ec4899',
    secondary: '#f9a8d4',
    background: '#fdf2f8',
    text: '#db2777'
  }
];

export const StyleResultPropertyEditor: React.FC<StyleResultPropertyEditorProps> = ({
  block,
  onUpdate
}) => {
  const content = block.content || {
    title: 'Seu Resultado',
    subtitle: 'Baseado nas suas respostas',
    showIcon: true,
    icon: 'star',
    layout: 'card',
    scoreDisplay: 'percentage',
    showScore: true,
    showDescription: true,
    description: 'Este é o seu perfil baseado nas respostas do quiz.',
    primaryColor: '#3b82f6',
    secondaryColor: '#93c5fd',
    backgroundColor: '#eff6ff',
    textColor: '#1e40af',
    borderRadius: 12,
    padding: 24,
    showBorder: true,
    borderColor: '#3b82f6',
    textAlign: 'center' as const,
    titleSize: 24,
    subtitleSize: 16,
    descriptionSize: 14,
    scoreSize: 32,
    showAnimations: true,
    showGradient: false
  };

  const updateContent = (updates: Partial<typeof content>) => {
    onUpdate(block.id, { ...content, ...updates });
  };

  const applyColorTheme = (theme: typeof colorThemes[0]) => {
    updateContent({
      primaryColor: theme.primary,
      secondaryColor: theme.secondary,
      backgroundColor: theme.background,
      textColor: theme.text,
      borderColor: theme.primary
    });
  };

  const selectedIcon = resultIcons.find(icon => icon.id === content.icon);
  const IconComponent = selectedIcon?.icon || Star;

  const formatScore = (score: number, type: string) => {
    switch (type) {
      case 'percentage':
        return `${score}%`;
      case 'points':
        return `${score}/100`;
      case 'stars':
        return '★'.repeat(Math.floor(score / 20)) + '☆'.repeat(5 - Math.floor(score / 20));
      case 'level':
        return `Nível ${Math.floor(score / 10)}/10`;
      case 'grade':
        if (score >= 90) return 'A+';
        if (score >= 80) return 'A';
        if (score >= 70) return 'B+';
        if (score >= 60) return 'B';
        if (score >= 50) return 'C+';
        return 'C';
      default:
        return `${score}%`;
    }
  };

  return (
    <div className="space-y-4">
      {/* Quick Color Themes */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Temas de Cores
          </Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {colorThemes.map((theme, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto p-3 hover:bg-[#FAF9F7]"
              onClick={() => applyColorTheme(theme)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="flex gap-1">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <div 
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: theme.background }}
                  />
                </div>
                <span className="text-sm font-medium">{theme.name}</span>
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
          {/* Title and Subtitle */}
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Título</Label>
              <Input
                value={content.title}
                onChange={(e) => updateContent({ title: e.target.value })}
                placeholder="Digite o título do resultado"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Subtítulo</Label>
              <Input
                value={content.subtitle}
                onChange={(e) => updateContent({ subtitle: e.target.value })}
                placeholder="Digite o subtítulo"
              />
            </div>
          </div>

          <Separator />

          {/* Icon */}
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
                {resultIcons.map((icon) => (
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

          {/* Score Display */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Mostrar Pontuação</Label>
              <Switch
                checked={content.showScore}
                onCheckedChange={(checked) => updateContent({ showScore: checked })}
              />
            </div>
            
            {content.showScore && (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Tipo de Pontuação</Label>
                <Select value={content.scoreDisplay} onValueChange={(value) => updateContent({ scoreDisplay: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scoreDisplayTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{type.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            {type.example}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Descrição</Label>
              <Switch
                checked={content.showDescription}
                onCheckedChange={(checked) => updateContent({ showDescription: checked })}
              />
            </div>
            {content.showDescription && (
              <Textarea
                value={content.description}
                onChange={(e) => updateContent({ description: e.target.value })}
                placeholder="Descreva o resultado do quiz"
                rows={3}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Layout */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="text-sm font-medium">Layout</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium">Estilo do Layout</Label>
            <Select value={content.layout} onValueChange={(value) => updateContent({ layout: value })}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {resultLayouts.map((layout) => (
                  <SelectItem key={layout.id} value={layout.id}>
                    <div>
                      <div className="font-medium">{layout.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {layout.description}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
        </CardContent>
      </Card>

      {/* Styling */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="text-sm font-medium">Cores e Estilo</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Cor Principal</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={content.primaryColor}
                  onChange={(e) => updateContent({ primaryColor: e.target.value })}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={content.primaryColor}
                  onChange={(e) => updateContent({ primaryColor: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Cor Secundária</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={content.secondaryColor}
                  onChange={(e) => updateContent({ secondaryColor: e.target.value })}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={content.secondaryColor}
                  onChange={(e) => updateContent({ secondaryColor: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

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
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Advanced Styling */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Mostrar Borda</Label>
              <Switch
                checked={content.showBorder}
                onCheckedChange={(checked) => updateContent({ showBorder: checked })}
              />
            </div>

            {content.showBorder && (
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
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Gradiente de Fundo</Label>
              <Switch
                checked={content.showGradient}
                onCheckedChange={(checked) => updateContent({ showGradient: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Animações</Label>
              <Switch
                checked={content.showAnimations}
                onCheckedChange={(checked) => updateContent({ showAnimations: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="text-sm font-medium">Tipografia</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Tamanho do Título</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[content.titleSize]}
                  onValueChange={(value) => updateContent({ titleSize: value[0] })}
                  min={16}
                  max={48}
                  step={2}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-12">
                  {content.titleSize}px
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Tamanho do Subtítulo</Label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[content.subtitleSize]}
                  onValueChange={(value) => updateContent({ subtitleSize: value[0] })}
                  min={12}
                  max={24}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-12">
                  {content.subtitleSize}px
                </span>
              </div>
            </div>

            {content.showScore && (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Tamanho da Pontuação</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[content.scoreSize]}
                    onValueChange={(value) => updateContent({ scoreSize: value[0] })}
                    min={20}
                    max={60}
                    step={2}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-12">
                    {content.scoreSize}px
                  </span>
                </div>
              </div>
            )}

            {content.showDescription && (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Tamanho da Descrição</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    value={[content.descriptionSize]}
                    onValueChange={(value) => updateContent({ descriptionSize: value[0] })}
                    min={12}
                    max={20}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-12">
                    {content.descriptionSize}px
                  </span>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-xs font-medium">Padding</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[content.padding]}
                onValueChange={(value) => updateContent({ padding: value[0] })}
                min={12}
                max={48}
                step={4}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-12">
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
                max={32}
                step={2}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-12">
                {content.borderRadius}px
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Label>
        </CardHeader>
        <CardContent>
          <div 
            className={`rounded-lg ${content.showBorder ? 'border-2' : ''}`}
            style={{ 
              backgroundColor: content.showGradient 
                ? `linear-gradient(135deg, ${content.backgroundColor}, ${content.secondaryColor})`
                : content.backgroundColor,
              borderColor: content.showBorder ? content.borderColor : 'transparent',
              borderRadius: `${content.borderRadius}px`,
              padding: `${content.padding}px`,
              textAlign: content.textAlign,
              transition: content.showAnimations ? 'all 0.3s ease' : 'none'
            }}
          >
            {content.showIcon && (
              <div className="mb-4 flex justify-center">
                <div 
                  className="p-3 rounded-full"
                  style={{ 
                    backgroundColor: content.primaryColor,
                    color: 'white'
                  }}
                >
                  <IconComponent className="h-8 w-8" />
                </div>
              </div>
            )}
            
            <div 
              className="font-bold mb-2"
              style={{ 
                color: content.textColor,
                fontSize: `${content.titleSize}px`
              }}
            >
              {content.title}
            </div>
            
            <div 
              className="mb-4"
              style={{ 
                color: content.textColor,
                fontSize: `${content.subtitleSize}px`,
                opacity: 0.8
              }}
            >
              {content.subtitle}
            </div>
            
            {content.showScore && (
              <div 
                className="font-bold mb-4"
                style={{ 
                  color: content.primaryColor,
                  fontSize: `${content.scoreSize}px`
                }}
              >
                {formatScore(85, content.scoreDisplay)}
              </div>
            )}
            
            {content.showDescription && (
              <div 
                style={{ 
                  color: content.textColor,
                  fontSize: `${content.descriptionSize}px`,
                  opacity: 0.9
                }}
              >
                {content.description}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
