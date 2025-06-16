
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface OptionData {
  id: string;
  label: string;
  text: string;
  imageUrl?: string;
  alt?: string;
}

interface StageConfigurationPanelProps {
  stageName: string;
  stageType: string;
  currentOptions?: OptionData[];
  onOptionUpdate?: (optionId: string, field: string, value: string) => void;
}

export const StageConfigurationPanel: React.FC<StageConfigurationPanelProps> = ({
  stageName,
  stageType,
  currentOptions = [],
  onOptionUpdate
}) => {
  const [showLogo, setShowLogo] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [returnButton, setReturnButton] = useState(false);
  const [layoutColumns, setLayoutColumns] = useState('2');
  const [direction, setDirection] = useState('vertical');
  const [spacing, setSpacing] = useState(16);
  const [imageHeight, setImageHeight] = useState(120);
  const [padding, setPadding] = useState(20);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(8);
  const [maxWidth, setMaxWidth] = useState('100');

  // Função para aplicar configurações automaticamente
  const applyConfiguration = (key: string, value: any) => {
    console.log(`Aplicando configuração: ${key} = ${value}`);
    // Aqui você pode adicionar lógica para aplicar as configurações em tempo real
  };

  return (
    <div className="space-y-4">
      {/* Header da Etapa */}
      <div className="bg-[#B89B7A]/5 rounded-lg p-3">
        <h3 className="font-medium text-[#8B7355] mb-1">Configurações da Etapa</h3>
        <div className="text-sm text-[#8B7355]/70">
          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs inline-block">
            {stageName}
          </div>
          <div className="text-xs mt-1">Tipo: {stageType} • Ordem: 0</div>
        </div>
      </div>

      {/* Layout das Opções */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-[#8B7355]">Layout das Opções</Label>
        <Select value={layoutColumns} onValueChange={(value) => {
          setLayoutColumns(value);
          applyConfiguration('layoutColumns', value);
        }}>
          <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Automático</SelectItem>
            <SelectItem value="1">1 Coluna</SelectItem>
            <SelectItem value="2">2 Colunas</SelectItem>
            <SelectItem value="3">3 Colunas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Direção */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-[#8B7355]">Direção</Label>
        <Select value={direction} onValueChange={(value) => {
          setDirection(value);
          applyConfiguration('direction', value);
        }}>
          <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vertical">Vertical</SelectItem>
            <SelectItem value="horizontal">Horizontal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Espaçamento entre elementos */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#8B7355]">Espaçamento entre elementos: {spacing}px</Label>
        <Slider
          value={[spacing]}
          onValueChange={([value]) => {
            setSpacing(value);
            applyConfiguration('spacing', value);
          }}
          min={8}
          max={32}
          step={4}
          className="w-full"
        />
      </div>

      {/* Altura das imagens */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#8B7355]">Altura das imagens: {imageHeight}px</Label>
        <Slider
          value={[imageHeight]}
          onValueChange={([value]) => {
            setImageHeight(value);
            applyConfiguration('imageHeight', value);
          }}
          min={80}
          max={300}
          step={10}
          className="w-full"
        />
      </div>

      {/* Padding interno */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#8B7355]">Padding interno: {padding}px</Label>
        <Slider
          value={[padding]}
          onValueChange={([value]) => {
            setPadding(value);
            applyConfiguration('padding', value);
          }}
          min={0}
          max={40}
          step={4}
          className="w-full"
        />
      </div>

      {/* Cor de Fundo */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#8B7355]">Cor de Fundo</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={backgroundColor}
            onChange={(e) => {
              setBackgroundColor(e.target.value);
              applyConfiguration('backgroundColor', e.target.value);
            }}
            className="w-12 h-8 p-0 border-0 rounded"
          />
          <Input
            type="text"
            value={backgroundColor}
            onChange={(e) => {
              setBackgroundColor(e.target.value);
              applyConfiguration('backgroundColor', e.target.value);
            }}
            placeholder="#ffffff"
            className="flex-1 border-[#B89B7A]/30 focus:border-[#B89B7A]"
          />
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#8B7355]">Border Radius: {borderRadius}px</Label>
        <Slider
          value={[borderRadius]}
          onValueChange={([value]) => {
            setBorderRadius(value);
            applyConfiguration('borderRadius', value);
          }}
          min={0}
          max={24}
          step={2}
          className="w-full"
        />
      </div>

      {/* Largura Máxima */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-[#8B7355]">Largura Máxima</Label>
        <Select value={maxWidth} onValueChange={(value) => {
          setMaxWidth(value);
          applyConfiguration('maxWidth', value);
        }}>
          <SelectTrigger className="border-[#B89B7A]/30 focus:border-[#B89B7A]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">Largura Total (100%)</SelectItem>
            <SelectItem value="80">80%</SelectItem>
            <SelectItem value="60">60%</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Editor de Opções para Questões */}
      {(stageType === 'question' || stageType === 'strategic') && currentOptions.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#8B7355] rounded-full"></div>
              <Label className="text-sm font-medium text-[#8B7355]">Editar Opções da Questão</Label>
            </div>
            
            {currentOptions.map((option) => (
              <div key={option.id} className="border border-[#B89B7A]/20 rounded-lg p-3 bg-white space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-[#B89B7A] text-[#8B7355]">
                    {option.label}
                  </Badge>
                  <Label className="text-xs font-medium text-[#8B7355]">Opção {option.label}</Label>
                </div>
                
                {/* Texto da Opção */}
                <div>
                  <Label className="text-xs text-[#8B7355]">Texto</Label>
                  <Input
                    value={option.text}
                    onChange={(e) => onOptionUpdate?.(option.id, 'text', e.target.value)}
                    className="mt-1 border-[#B89B7A]/30 focus:border-[#B89B7A] text-sm"
                    placeholder={`Digite o texto da opção ${option.label}...`}
                  />
                </div>
                
                {/* URL da Imagem */}
                <div>
                  <Label className="text-xs text-[#8B7355]">URL da Imagem</Label>
                  <Input
                    value={option.imageUrl || ''}
                    onChange={(e) => onOptionUpdate?.(option.id, 'imageUrl', e.target.value)}
                    className="mt-1 border-[#B89B7A]/30 focus:border-[#B89B7A] text-sm"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                
                {/* Preview da Imagem */}
                {option.imageUrl && (
                  <div className="mt-2">
                    <Label className="text-xs text-[#8B7355]">Preview</Label>
                    <div className="mt-1 w-full h-20 border border-[#B89B7A]/20 rounded overflow-hidden bg-gray-50">
                      <img 
                        src={option.imageUrl} 
                        alt={option.alt || option.text}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Configurações de Header */}
      <Separator />
      <div className="space-y-3">
        <Label className="text-sm font-medium text-[#8B7355]">Configurações de Header</Label>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm text-[#8B7355]">Mostrar Logo</Label>
          <Switch
            checked={showLogo}
            onCheckedChange={(checked) => {
              setShowLogo(checked);
              applyConfiguration('showLogo', checked);
            }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm text-[#8B7355]">Mostrar Progresso</Label>
          <Switch
            checked={showProgress}
            onCheckedChange={(checked) => {
              setShowProgress(checked);
              applyConfiguration('showProgress', checked);
            }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm text-[#8B7355]">Botão Voltar</Label>
          <Switch
            checked={returnButton}
            onCheckedChange={(checked) => {
              setReturnButton(checked);
              applyConfiguration('returnButton', checked);
            }}
          />
        </div>

        {/* Botão de Salvar Configurações */}
        <div className="pt-4 border-t border-[#B89B7A]/20">
          <Button 
            onClick={() => {
              console.log('Salvando todas as configurações...');
              // Aqui você implementaria o salvamento real
            }}
            className="w-full bg-[#B89B7A] hover:bg-[#8B7355] text-white"
          >
            💾 Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
};
