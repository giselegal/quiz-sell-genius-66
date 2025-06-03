// filepath: /workspaces/quiz-sell-genius-66/src/pages/admin/ResultPageEditorPage.tsx
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, RefreshCw, Eye, ArrowLeft, Settings, Palette, FileText, ShoppingCart, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy load do componente ResultPage para preview
const ResultPage = React.lazy(() => import('../ResultPage'));

interface ResultPageConfig {
  // Configurações gerais
  pageTitle: string;
  pageDescription: string;
  
  // Configurações do timer
  timerEnabled: boolean;
  timerHours: number;
  timerMinutes: number;
  
  // Configurações de cores/tema
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  
  // Configurações de conteúdo
  mainTitle: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  
  // Configurações de oferta
  offerTitle: string;
  originalPrice: string;
  discountPrice: string;
  urgencyText: string;
  
  // Configurações de garantia
  guaranteeEnabled: boolean;
  guaranteeText: string;
  guaranteeDays: number;
  
  // Configurações de bônus
  bonusEnabled: boolean;
  bonusTitle: string;
  bonusDescription: string;
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

const ResultPageEditorPage: React.FC = () => {
  const [config, setConfig] = useState<ResultPageConfig>(defaultConfig);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
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
      // Salvar no localStorage (em produção, isso seria uma API)
      localStorage.setItem('resultPageConfig', JSON.stringify(config));
      
      toast({
        title: "Configurações Salvas",
        description: "As alterações da página de resultado foram salvas com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro ao Salvar",
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
      title: "Configurações Resetadas",
      description: "Todas as configurações foram restauradas para o padrão.",
    });
  };

  const handleExportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'resultpage-config.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Configuração Exportada",
      description: "O arquivo de configuração foi baixado com sucesso!",
    });
  };

  // Estilo do preview baseado no dispositivo selecionado
  const getPreviewStyle = () => {
    switch (previewDevice) {
      case 'mobile':
        return { width: '375px', height: '100%', maxWidth: '375px' };
      case 'tablet':
        return { width: '768px', height: '100%', maxWidth: '768px' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header da página */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 text-[#B89B7A] hover:text-[#432818] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Painel
          </Link>
          <h1 className="text-xl font-bold text-[#432818]">
            Editor da Página de Resultado
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExportConfig}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Exportar
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#B89B7A] hover:bg-[#A1835D] text-white"
          >
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Layout principal split-screen */}
      <div className="flex flex-1 overflow-hidden">
        {/* Painel de Edição - Lado Esquerdo */}
        <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
          {/* Header do painel de edição */}
          <div className="p-4 border-b border-gray-200 shrink-0">
            <h2 className="text-lg font-semibold text-[#432818]">
              Configurações
            </h2>
            <p className="text-sm text-gray-600">
              Edite os componentes e veja as alterações em tempo real
            </p>
          </div>

          {/* Abas de configuração */}
          <div className="flex-1 overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-4 m-4">
                <TabsTrigger value="general" className="flex items-center gap-1 text-xs">
                  <Settings className="h-3 w-3" />
                  Geral
                </TabsTrigger>
                <TabsTrigger value="design" className="flex items-center gap-1 text-xs">
                  <Palette className="h-3 w-3" />
                  Design
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-1 text-xs">
                  <FileText className="h-3 w-3" />
                  Conteúdo
                </TabsTrigger>
                <TabsTrigger value="offer" className="flex items-center gap-1 text-xs">
                  <ShoppingCart className="h-3 w-3" />
                  Oferta
                </TabsTrigger>
              </TabsList>

              {/* Conteúdo das abas */}
              <div className="px-4 pb-4">
                {/* Aba Geral */}
                <TabsContent value="general" className="mt-0">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="pageTitle" className="text-sm font-medium text-[#432818]">
                          Título da Página (SEO)
                        </Label>
                        <Input
                          id="pageTitle"
                          value={config.pageTitle}
                          onChange={(e) => handleInputChange('pageTitle', e.target.value)}
                          placeholder="Título para SEO"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="pageDescription" className="text-sm font-medium text-[#432818]">
                          Descrição da Página (SEO)
                        </Label>
                        <Textarea
                          id="pageDescription"
                          value={config.pageDescription}
                          onChange={(e) => handleInputChange('pageDescription', e.target.value)}
                          placeholder="Descrição para SEO"
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <Separator />

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
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="timerHours" className="text-sm font-medium text-[#432818]">
                              Horas
                            </Label>
                            <Input
                              id="timerHours"
                              type="number"
                              min="0"
                              max="23"
                              value={config.timerHours}
                              onChange={(e) => handleInputChange('timerHours', parseInt(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="timerMinutes" className="text-sm font-medium text-[#432818]">
                              Minutos
                            </Label>
                            <Input
                              id="timerMinutes"
                              type="number"
                              min="0"
                              max="59"
                              value={config.timerMinutes}
                              onChange={(e) => handleInputChange('timerMinutes', parseInt(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>

                {/* Aba Design */}
                <TabsContent value="design" className="mt-0">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="primaryColor" className="text-sm font-medium text-[#432818]">
                          Cor Primária
                        </Label>
                        <div className="flex items-center gap-3 mt-1">
                          <input
                            type="color"
                            id="primaryColor"
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

                      <div>
                        <Label htmlFor="secondaryColor" className="text-sm font-medium text-[#432818]">
                          Cor Secundária
                        </Label>
                        <div className="flex items-center gap-3 mt-1">
                          <input
                            type="color"
                            id="secondaryColor"
                            value={config.secondaryColor}
                            onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                            className="w-10 h-8 border border-gray-300 rounded"
                          />
                          <Input
                            value={config.secondaryColor}
                            onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                            placeholder="#aa6b5d"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="backgroundColor" className="text-sm font-medium text-[#432818]">
                          Cor de Fundo
                        </Label>
                        <div className="flex items-center gap-3 mt-1">
                          <input
                            type="color"
                            id="backgroundColor"
                            value={config.backgroundColor}
                            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                            className="w-10 h-8 border border-gray-300 rounded"
                          />
                          <Input
                            value={config.backgroundColor}
                            onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                            placeholder="#fffaf7"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="textColor" className="text-sm font-medium text-[#432818]">
                          Cor do Texto
                        </Label>
                        <div className="flex items-center gap-3 mt-1">
                          <input
                            type="color"
                            id="textColor"
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
                  </Card>
                </TabsContent>

                {/* Aba Conteúdo */}
                <TabsContent value="content" className="mt-0">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="mainTitle" className="text-sm font-medium text-[#432818]">
                          Título Principal
                        </Label>
                        <Input
                          id="mainTitle"
                          value={config.mainTitle}
                          onChange={(e) => handleInputChange('mainTitle', e.target.value)}
                          placeholder="🎉 Parabéns! Descobrimos seu estilo único!"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subtitle" className="text-sm font-medium text-[#432818]">
                          Subtítulo
                        </Label>
                        <Textarea
                          id="subtitle"
                          value={config.subtitle}
                          onChange={(e) => handleInputChange('subtitle', e.target.value)}
                          placeholder="Baseado nas suas respostas, criamos um guia personalizado especialmente para você."
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="ctaText" className="text-sm font-medium text-[#432818]">
                          Texto do Botão Principal
                        </Label>
                        <Input
                          id="ctaText"
                          value={config.ctaText}
                          onChange={(e) => handleInputChange('ctaText', e.target.value)}
                          placeholder="QUERO MEU GUIA PERSONALIZADO"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="ctaLink" className="text-sm font-medium text-[#432818]">
                          Link do Botão Principal
                        </Label>
                        <Input
                          id="ctaLink"
                          value={config.ctaLink}
                          onChange={(e) => handleInputChange('ctaLink', e.target.value)}
                          placeholder="/quiz-descubra-seu-estilo"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Aba Oferta */}
                <TabsContent value="offer" className="mt-0">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="offerTitle" className="text-sm font-medium text-[#432818]">
                          Título da Oferta
                        </Label>
                        <Input
                          id="offerTitle"
                          value={config.offerTitle}
                          onChange={(e) => handleInputChange('offerTitle', e.target.value)}
                          placeholder="🎁 Oferta Especial Exclusiva para Você!"
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="originalPrice" className="text-sm font-medium text-[#432818]">
                            Preço Original
                          </Label>
                          <Input
                            id="originalPrice"
                            value={config.originalPrice}
                            onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                            placeholder="R$ 297,00"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="discountPrice" className="text-sm font-medium text-[#432818]">
                            Preço com Desconto
                          </Label>
                          <Input
                            id="discountPrice"
                            value={config.discountPrice}
                            onChange={(e) => handleInputChange('discountPrice', e.target.value)}
                            placeholder="R$ 97,00"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="urgencyText" className="text-sm font-medium text-[#432818]">
                          Texto de Urgência
                        </Label>
                        <Input
                          id="urgencyText"
                          value={config.urgencyText}
                          onChange={(e) => handleInputChange('urgencyText', e.target.value)}
                          placeholder="⏰ Esta oferta expira em:"
                          className="mt-1"
                        />
                      </div>

                      <Separator />

                      <div>
                        <div className="flex items-center gap-4 mb-4">
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
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="guaranteeText" className="text-sm font-medium text-[#432818]">
                                Texto da Garantia
                              </Label>
                              <Input
                                id="guaranteeText"
                                value={config.guaranteeText}
                                onChange={(e) => handleInputChange('guaranteeText', e.target.value)}
                                placeholder="Garantia de 30 dias ou seu dinheiro de volta"
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor="guaranteeDays" className="text-sm font-medium text-[#432818]">
                                Dias de Garantia
                              </Label>
                              <Input
                                id="guaranteeDays"
                                type="number"
                                min="1"
                                max="365"
                                value={config.guaranteeDays}
                                onChange={(e) => handleInputChange('guaranteeDays', parseInt(e.target.value) || 30)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div>
                        <div className="flex items-center gap-4 mb-4">
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
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="bonusTitle" className="text-sm font-medium text-[#432818]">
                                Título dos Bônus
                              </Label>
                              <Input
                                id="bonusTitle"
                                value={config.bonusTitle}
                                onChange={(e) => handleInputChange('bonusTitle', e.target.value)}
                                placeholder="🎁 Bônus Exclusivos"
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor="bonusDescription" className="text-sm font-medium text-[#432818]">
                                Descrição dos Bônus
                              </Label>
                              <Textarea
                                id="bonusDescription"
                                value={config.bonusDescription}
                                onChange={(e) => handleInputChange('bonusDescription', e.target.value)}
                                placeholder="Receba materiais extras para completar sua transformação"
                                className="mt-1"
                                rows={3}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Ações na parte inferior */}
          <div className="p-4 border-t border-gray-200 shrink-0">
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Resetar para Padrão
            </Button>
          </div>
        </div>

        {/* Painel de Preview - Lado Direito */}
        <div className="w-1/2 bg-gray-100 flex flex-col">
          {/* Header do preview */}
          <div className="p-4 bg-white border-b border-gray-200 shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#432818]">
                Preview em Tempo Real
              </h3>
              
              {/* Controles de dispositivo */}
              <div className="flex items-center gap-2">
                <Button
                  variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('desktop')}
                  className="flex items-center gap-1"
                >
                  <Monitor className="h-3 w-3" />
                  Desktop
                </Button>
                <Button
                  variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('tablet')}
                  className="flex items-center gap-1"
                >
                  <Tablet className="h-3 w-3" />
                  Tablet
                </Button>
                <Button
                  variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewDevice('mobile')}
                  className="flex items-center gap-1"
                >
                  <Smartphone className="h-3 w-3" />
                  Mobile
                </Button>
              </div>
            </div>
          </div>

          {/* Container do preview */}
          <div className="flex-1 overflow-auto p-4 flex justify-center">
            <div 
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              style={getPreviewStyle()}
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
      </div>
    </div>
  );
};

export default ResultPageEditorPage;
