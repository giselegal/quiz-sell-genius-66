import { safeLocalStorage } from "@/utils/safeLocalStorage";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
  Palette, 
  Type, 
  Layout, 
  Save, 
  Eye, 
  RefreshCw,
  Monitor,
  Smartphone,
  Settings
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface EditorConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    cardBg: string;
  };
  typography: {
    titleSize: number;
    subtitleSize: number;
    bodySize: number;
  };
  layout: {
    padding: number;
    borderRadius: number;
    spacing: number;
  };
  content: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
  };
}

const EditorCompleto: React.FC = () => {
  const [config, setConfig] = useState<EditorConfig>({
    colors: {
      primary: '#B89B7A',
      secondary: '#aa6b5d', 
      background: '#fffaf7',
      text: '#432818',
      cardBg: '#ffffff'
    },
    typography: {
      titleSize: 48,
      subtitleSize: 32,
      bodySize: 16
    },
    layout: {
      padding: 24,
      borderRadius: 12,
      spacing: 16
    },
    content: {
      title: 'Descubra Seu Estilo Único',
      subtitle: 'Guia Personalizado de Estilo',
      description: 'Transforme sua imagem e conquiste mais confiança com um guia feito especialmente para você.',
      buttonText: 'Adquirir Agora'
    }
  });

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(false);

  // Aplicar estilos em tempo real
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'editor-live-styles';
    
    style.textContent = `
      .live-preview {
        background-color: ${config.colors.background};
        color: ${config.colors.text};
        padding: ${config.layout.padding}px;
        border-radius: ${config.layout.borderRadius}px;
      }
      
      .live-preview h1 {
        font-size: ${config.typography.titleSize}px;
        background: linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary});
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: ${config.layout.spacing}px;
      }
      
      .live-preview h2 {
        font-size: ${config.typography.subtitleSize}px;
        color: ${config.colors.secondary};
        margin-bottom: ${config.layout.spacing}px;
      }
      
      .live-preview p {
        font-size: ${config.typography.bodySize}px;
        color: ${config.colors.text};
        line-height: 1.6;
        margin-bottom: ${config.layout.spacing * 1.5}px;
      }
      
      .live-preview .card {
        background-color: ${config.colors.cardBg};
        border-radius: ${config.layout.borderRadius}px;
        padding: ${config.layout.padding}px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin-bottom: ${config.layout.spacing}px;
      }
      
      .live-preview .btn {
        background: linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary});
        color: white;
        padding: ${config.layout.padding / 2}px ${config.layout.padding}px;
        border-radius: ${config.layout.borderRadius / 2}px;
        border: none;
        font-size: ${config.typography.bodySize}px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .live-preview .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      }
    `;
    
    // Remove estilo anterior se existir
    const oldStyle = document.getElementById('editor-live-styles');
    if (oldStyle) {
      oldStyle.remove();
    }
    
    document.head.appendChild(style);
    
    return () => {
      style.remove();
    };
  }, [config]);

  const updateConfig = (section: keyof EditorConfig, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    
    try {
      // Salvar no localStorage
      safeLocalStorage.setItem('editorConfig', JSON.stringify(config));
      safeLocalStorage.setItem('pageEditorConfig', JSON.stringify(config));
      
      toast({
        title: "Configuração salva!",
        description: "As alterações foram aplicadas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao salvar:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetConfig = () => {
    setConfig({
      colors: {
        primary: '#B89B7A',
        secondary: '#aa6b5d',
        background: '#fffaf7',
        text: '#432818',
        cardBg: '#ffffff'
      },
      typography: {
        titleSize: 48,
        subtitleSize: 32,
        bodySize: 16
      },
      layout: {
        padding: 24,
        borderRadius: 12,
        spacing: 16
      },
      content: {
        title: 'Descubra Seu Estilo Único',
        subtitle: 'Guia Personalizado de Estilo',
        description: 'Transforme sua imagem e conquiste mais confiança com um guia feito especialmente para você.',
        buttonText: 'Adquirir Agora'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header do Editor */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Editor Visual Completo</h1>
            <p className="text-gray-600">Edite em tempo real e veja as mudanças instantaneamente</p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(previewMode === 'desktop' ? 'mobile' : 'desktop')}
            >
              {previewMode === 'desktop' ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
              {previewMode === 'desktop' ? 'Mobile' : 'Desktop'}
            </Button>
            
            <Button variant="outline" onClick={resetConfig}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            
            <Button onClick={handleSave} disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Painel de Controles */}
        <div className="w-80 bg-white border-r p-6 overflow-y-auto max-h-screen">
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="colors">
                <Palette className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="typography">
                <Type className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="content">
                <Settings className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>

            {/* Cores */}
            <TabsContent value="colors" className="space-y-4">
              <div>
                <Label>Cor Primária</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={config.colors.primary}
                    onChange={(e) => updateConfig('colors', 'primary', e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={config.colors.primary}
                    onChange={(e) => updateConfig('colors', 'primary', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label>Cor Secundária</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={config.colors.secondary}
                    onChange={(e) => updateConfig('colors', 'secondary', e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={config.colors.secondary}
                    onChange={(e) => updateConfig('colors', 'secondary', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label>Fundo</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={config.colors.background}
                    onChange={(e) => updateConfig('colors', 'background', e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={config.colors.background}
                    onChange={(e) => updateConfig('colors', 'background', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label>Texto</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={config.colors.text}
                    onChange={(e) => updateConfig('colors', 'text', e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={config.colors.text}
                    onChange={(e) => updateConfig('colors', 'text', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label>Fundo do Card</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="color"
                    value={config.colors.cardBg}
                    onChange={(e) => updateConfig('colors', 'cardBg', e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={config.colors.cardBg}
                    onChange={(e) => updateConfig('colors', 'cardBg', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tipografia */}
            <TabsContent value="typography" className="space-y-4">
              <div>
                <Label>Tamanho do Título: {config.typography.titleSize}px</Label>
                <Slider
                  value={[config.typography.titleSize]}
                  onValueChange={([value]) => updateConfig('typography', 'titleSize', value)}
                  min={24}
                  max={72}
                  step={2}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Tamanho do Subtítulo: {config.typography.subtitleSize}px</Label>
                <Slider
                  value={[config.typography.subtitleSize]}
                  onValueChange={([value]) => updateConfig('typography', 'subtitleSize', value)}
                  min={18}
                  max={48}
                  step={2}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Tamanho do Texto: {config.typography.bodySize}px</Label>
                <Slider
                  value={[config.typography.bodySize]}
                  onValueChange={([value]) => updateConfig('typography', 'bodySize', value)}
                  min={12}
                  max={24}
                  step={1}
                  className="mt-2"
                />
              </div>
            </TabsContent>

            {/* Layout */}
            <TabsContent value="layout" className="space-y-4">
              <div>
                <Label>Padding: {config.layout.padding}px</Label>
                <Slider
                  value={[config.layout.padding]}
                  onValueChange={([value]) => updateConfig('layout', 'padding', value)}
                  min={8}
                  max={48}
                  step={4}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Bordas Arredondadas: {config.layout.borderRadius}px</Label>
                <Slider
                  value={[config.layout.borderRadius]}
                  onValueChange={([value]) => updateConfig('layout', 'borderRadius', value)}
                  min={0}
                  max={32}
                  step={2}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Espaçamento: {config.layout.spacing}px</Label>
                <Slider
                  value={[config.layout.spacing]}
                  onValueChange={([value]) => updateConfig('layout', 'spacing', value)}
                  min={8}
                  max={32}
                  step={2}
                  className="mt-2"
                />
              </div>
            </TabsContent>

            {/* Conteúdo */}
            <TabsContent value="content" className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={config.content.title}
                  onChange={(e) => updateConfig('content', 'title', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Subtítulo</Label>
                <Input
                  value={config.content.subtitle}
                  onChange={(e) => updateConfig('content', 'subtitle', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Descrição</Label>
                <textarea
                  value={config.content.description}
                  onChange={(e) => updateConfig('content', 'description', e.target.value)}
                  className="w-full p-2 border rounded-md mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label>Texto do Botão</Label>
                <Input
                  value={config.content.buttonText}
                  onChange={(e) => updateConfig('content', 'buttonText', e.target.value)}
                  className="mt-1"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview */}
        <div className="flex-1 p-6">
          <div className={`mx-auto ${previewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'}`}>
            <div className="live-preview">
              <div className="card">
                <h1 className="font-bold">{config.content.title}</h1>
                <h2 className="font-semibold">{config.content.subtitle}</h2>
                <p>{config.content.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="card">
                    <h3 className="font-medium mb-2">Seu Estilo</h3>
                    <p className="text-sm">Descubra o estilo que combina perfeitamente com você.</p>
                  </div>
                  <div className="card">
                    <h3 className="font-medium mb-2">Guia Personalizado</h3>
                    <p className="text-sm">Receba dicas exclusivas baseadas no seu perfil.</p>
                  </div>
                </div>
                
                <button className="btn w-full md:w-auto">
                  {config.content.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorCompleto;
