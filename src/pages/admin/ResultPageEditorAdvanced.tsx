import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Save, RefreshCw, ArrowLeft, Settings, Palette, FileText, ShoppingCart, 
  Monitor, Smartphone, Tablet, Eye, MousePointer, Hand, Plus,
  Type, Image, Star, Gift, Shield, Clock, Target, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load do componente ResultPage para preview
const ResultPage = React.lazy(() => import('../ResultPage'));

interface ResultPageConfig {
  pageTitle: string;
  pageDescription: string;
  timerEnabled: boolean;
  timerHours: number;
  timerMinutes: number;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  mainTitle: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  offerTitle: string;
  originalPrice: string;
  discountPrice: string;
  urgencyText: string;
  guaranteeEnabled: boolean;
  guaranteeText: string;
  guaranteeDays: number;
  bonusEnabled: boolean;
  bonusTitle: string;
  bonusDescription: string;
}

interface ComponentBlock {
  id: string;
  type: 'header' | 'title' | 'subtitle' | 'cta' | 'offer' | 'guarantee' | 'bonus' | 'timer';
  name: string;
  icon: React.ReactNode;
  configurable: boolean;
}

const defaultConfig: ResultPageConfig = {
  pageTitle: "Seu Estilo Descoberto - Quiz Sell Genius",
  pageDescription: "Descubra seu estilo pessoal e transforme seu guarda-roupa",
  timerEnabled: true,
  timerHours: 2,
  timerMinutes: 59,
  primaryColor: "#B89B7A",
  secondaryColor: "#aa6b5d", 
  backgroundColor: "#fffaf7",
  textColor: "#432818",
  mainTitle: "🎉 Parabéns! Descobrimos seu estilo único!",
  subtitle: "Baseado nas suas respostas, criamos um guia personalizado especialmente para você.",
  ctaText: "QUERO MEU GUIA PERSONALIZADO",
  ctaLink: "/quiz-descubra-seu-estilo",
  offerTitle: "🎁 Oferta Especial Exclusiva para Você!",
  originalPrice: "R$ 297,00",
  discountPrice: "R$ 97,00",
  urgencyText: "⏰ Esta oferta expira em:",
  guaranteeEnabled: true,
  guaranteeText: "Garantia de 30 dias ou seu dinheiro de volta",
  guaranteeDays: 30,
  bonusEnabled: true,
  bonusTitle: "🎁 Bônus Exclusivos",
  bonusDescription: "Receba materiais extras para completar sua transformação"
};

const componentBlocks: ComponentBlock[] = [
  { id: 'header', type: 'header', name: 'Cabeçalho', icon: <Type className="h-4 w-4" />, configurable: false },
  { id: 'title', type: 'title', name: 'Título Principal', icon: <Type className="h-4 w-4" />, configurable: true },
  { id: 'subtitle', type: 'subtitle', name: 'Subtítulo', icon: <FileText className="h-4 w-4" />, configurable: true },
  { id: 'timer', type: 'timer', name: 'Timer de Urgência', icon: <Clock className="h-4 w-4" />, configurable: true },
  { id: 'offer', type: 'offer', name: 'Seção de Oferta', icon: <Target className="h-4 w-4" />, configurable: true },
  { id: 'cta', type: 'cta', name: 'Botão Principal', icon: <MousePointer className="h-4 w-4" />, configurable: true },
  { id: 'guarantee', type: 'guarantee', name: 'Garantia', icon: <Shield className="h-4 w-4" />, configurable: true },
  { id: 'bonus', type: 'bonus', name: 'Bônus', icon: <Gift className="h-4 w-4" />, configurable: true },
];

const ResultPageEditorAdvanced: React.FC = () => {
  const [config, setConfig] = useState<ResultPageConfig>(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>('title');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [editMode, setEditMode] = useState<'edit' | 'preview'>('edit');
  const { toast } = useToast();

  // Carregar configurações salvas do localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('resultPageConfig');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsed });
      } catch (error) {
        console.error('Erro ao carregar configuração da página de resultado:', error);
      }
    }
  }, []);

  const handleInputChange = (field: keyof ResultPageConfig, value: string | number | boolean) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem('resultPageConfig', JSON.stringify(config));
      toast({
        title: "✅ Configurações Salvas",
        description: "As alterações foram salvas com sucesso!",
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao Salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    toast({
      title: "🔄 Configurações Resetadas",
      description: "Todas as configurações foram restauradas para o padrão.",
    });
  };

  const getPreviewContainerStyle = () => {
    switch (previewDevice) {
      case 'mobile':
        return { width: '375px', minHeight: '100%' };
      case 'tablet':
        return { width: '768px', minHeight: '100%' };
      default:
        return { width: '100%', minHeight: '100%' };
    }
  };

  const renderComponentConfig = () => {
    if (!selectedComponent) {
      return (
        <div className="p-6 text-center text-gray-500">
          <Settings className="h-8 w-8 mx-auto mb-3 opacity-50" />
          <p>Selecione um componente para editar suas propriedades</p>
        </div>
      );
    }

    const component = componentBlocks.find(c => c.id === selectedComponent);
    if (!component) return null;

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b">
          {component.icon}
          <h3 className="font-semibold text-[#432818]">{component.name}</h3>
        </div>

        {selectedComponent === 'title' && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-[#432818]">Título Principal</Label>
              <Textarea
                value={config.mainTitle}
                onChange={(e) => handleInputChange('mainTitle', e.target.value)}
                placeholder="🎉 Parabéns! Descobrimos seu estilo único!"
                className="mt-1"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#432818]">Cor do Texto</Label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="color"
                  value={config.textColor}
                  onChange={(e) => handleInputChange('textColor', e.target.value)}
                  className="w-10 h-8 border border-gray-300 rounded"
                />
                <Input
                  value={config.textColor}
                  onChange={(e) => handleInputChange('textColor', e.target.value)}
                  placeholder="#432818"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}

        {selectedComponent === 'subtitle' && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-[#432818]">Subtítulo</Label>
              <Textarea
                value={config.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                placeholder="Baseado nas suas respostas..."
                className="mt-1"
                rows={4}
              />
            </div>
          </div>
        )}

        {selectedComponent === 'cta' && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-[#432818]">Texto do Botão</Label>
              <Input
                value={config.ctaText}
                onChange={(e) => handleInputChange('ctaText', e.target.value)}
                placeholder="QUERO MEU GUIA PERSONALIZADO"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#432818]">Link do Botão</Label>
              <Input
                value={config.ctaLink}
                onChange={(e) => handleInputChange('ctaLink', e.target.value)}
                placeholder="/quiz-descubra-seu-estilo"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-[#432818]">Cor do Botão</Label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="w-10 h-8 border border-gray-300 rounded"
                />
                <Input
                  value={config.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  placeholder="#B89B7A"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}

        {selectedComponent === 'timer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="timerEnabled"
                checked={config.timerEnabled}
                onChange={(e) => handleInputChange('timerEnabled', e.target.checked)}
                className="w-4 h-4 text-[#B89B7A] border-gray-300 rounded focus:ring-[#B89B7A]"
              />
              <Label htmlFor="timerEnabled" className="text-sm font-medium text-[#432818]">
                Habilitar Timer de Urgência
              </Label>
            </div>

            {config.timerEnabled && (
              <>
                <div>
                  <Label className="text-sm font-medium text-[#432818]">Texto de Urgência</Label>
                  <Input
                    value={config.urgencyText}
                    onChange={(e) => handleInputChange('urgencyText', e.target.value)}
                    placeholder="⏰ Esta oferta expira em:"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-[#432818]">Horas</Label>
                    <Input
                      type="number"
                      min="0"
                      max="23"
                      value={config.timerHours}
                      onChange={(e) => handleInputChange('timerHours', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#432818]">Minutos</Label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={config.timerMinutes}
                      onChange={(e) => handleInputChange('timerMinutes', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {selectedComponent === 'offer' && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-[#432818]">Título da Oferta</Label>
              <Input
                value={config.offerTitle}
                onChange={(e) => handleInputChange('offerTitle', e.target.value)}
                placeholder="🎁 Oferta Especial Exclusiva para Você!"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-[#432818]">Preço Original</Label>
                <Input
                  value={config.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                  placeholder="R$ 297,00"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-[#432818]">Preço com Desconto</Label>
                <Input
                  value={config.discountPrice}
                  onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                  placeholder="R$ 97,00"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {selectedComponent === 'guarantee' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="guaranteeEnabled"
                checked={config.guaranteeEnabled}
                onChange={(e) => handleInputChange('guaranteeEnabled', e.target.checked)}
                className="w-4 h-4 text-[#B89B7A] border-gray-300 rounded focus:ring-[#B89B7A]"
              />
              <Label htmlFor="guaranteeEnabled" className="text-sm font-medium text-[#432818]">
                Habilitar Seção de Garantia
              </Label>
            </div>

            {config.guaranteeEnabled && (
              <>
                <div>
                  <Label className="text-sm font-medium text-[#432818]">Texto da Garantia</Label>
                  <Input
                    value={config.guaranteeText}
                    onChange={(e) => handleInputChange('guaranteeText', e.target.value)}
                    placeholder="Garantia de 30 dias ou seu dinheiro de volta"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#432818]">Dias de Garantia</Label>
                  <Input
                    type="number"
                    min="1"
                    max="365"
                    value={config.guaranteeDays}
                    onChange={(e) => handleInputChange('guaranteeDays', parseInt(e.target.value) || 30)}
                    className="mt-1"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {selectedComponent === 'bonus' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="bonusEnabled"
                checked={config.bonusEnabled}
                onChange={(e) => handleInputChange('bonusEnabled', e.target.checked)}
                className="w-4 h-4 text-[#B89B7A] border-gray-300 rounded focus:ring-[#B89B7A]"
              />
              <Label htmlFor="bonusEnabled" className="text-sm font-medium text-[#432818]">
                Habilitar Seção de Bônus
              </Label>
            </div>

            {config.bonusEnabled && (
              <>
                <div>
                  <Label className="text-sm font-medium text-[#432818]">Título dos Bônus</Label>
                  <Input
                    value={config.bonusTitle}
                    onChange={(e) => handleInputChange('bonusTitle', e.target.value)}
                    placeholder="🎁 Bônus Exclusivos"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#432818]">Descrição dos Bônus</Label>
                  <Textarea
                    value={config.bonusDescription}
                    onChange={(e) => handleInputChange('bonusDescription', e.target.value)}
                    placeholder="Receba materiais extras para completar sua transformação"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header da página */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 text-[#B89B7A] hover:text-[#432818] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <h1 className="text-lg font-bold text-[#432818]">
            Editor Visual - Página de Resultado
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Controles de dispositivo */}
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewDevice('desktop')}
              className="h-8 px-2"
            >
              <Monitor className="h-3 w-3" />
            </Button>
            <Button
              variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewDevice('tablet')}
              className="h-8 px-2"
            >
              <Tablet className="h-3 w-3" />
            </Button>
            <Button
              variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewDevice('mobile')}
              className="h-8 px-2"
            >
              <Smartphone className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={editMode === 'edit' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setEditMode('edit')}
              className="h-8 px-2"
            >
              <Settings className="h-3 w-3" />
            </Button>
            <Button
              variant={editMode === 'preview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setEditMode('preview')}
              className="h-8 px-2"
            >
              <Eye className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#B89B7A] hover:bg-[#A1835D] text-white h-8"
          >
            {saving ? (
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            ) : (
              <Save className="h-3 w-3 mr-1" />
            )}
            Salvar
          </Button>
        </div>
      </div>

      {/* Layout principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Esquerda - Componentes */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-[#432818] mb-1">Componentes da Página</h2>
            <p className="text-xs text-gray-600">Clique em um componente para editá-lo</p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {componentBlocks.map((component) => (
                <div
                  key={component.id}
                  onClick={() => setSelectedComponent(component.id)}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
                    ${selectedComponent === component.id 
                      ? 'bg-[#B89B7A] text-white shadow-sm' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-md 
                    ${selectedComponent === component.id 
                      ? 'bg-white/20' 
                      : 'bg-white'
                    }
                  `}>
                    {component.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{component.name}</div>
                    <div className={`text-xs ${
                      selectedComponent === component.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {component.configurable ? 'Configurável' : 'Fixo'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Preview Central */}
        <div className="flex-1 bg-gray-100 flex flex-col">
          <div className="flex-1 overflow-auto flex justify-center items-start p-6">
            <div 
              className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300"
              style={getPreviewContainerStyle()}
            >
              <Suspense fallback={
                <div className="flex items-center justify-center h-96">
                  <LoadingSpinner size="lg" color="#B89B7A" />
                </div>
              }>
                <div className="h-full overflow-auto">
                  <ResultPage />
                </div>
              </Suspense>
            </div>
          </div>
        </div>

        {/* Painel de Propriedades - Direita */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-[#432818] mb-1">Propriedades</h2>
            <p className="text-xs text-gray-600">Configure o componente selecionado</p>
          </div>

          <ScrollArea className="flex-1">
            {renderComponentConfig()}
          </ScrollArea>

          {/* Ações na parte inferior */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Resetar Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPageEditorAdvanced;
