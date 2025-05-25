import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Edit, Palette } from 'lucide-react';
import { VisualEditor } from '@/components/result-editor/VisualEditor';

const EnhancedResultPageEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { primaryStyle, secondaryStyles } = useQuiz();
  const [isLoading, setIsLoading] = useState(false);
  
  // Carregar configurações salvas do localStorage
  const [initialConfig, setInitialConfig] = useState<any>(null);
  
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('pageEditorConfig');
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        setInitialConfig(config);
        // Aplicar configurações ao carregamento
        applyConfigToPage(config);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  }, []);
  
  // Função para aplicar configurações à página
  const applyConfigToPage = (config: any) => {
    if (!config) return;
    
    // Criar ou atualizar CSS customizado
    let styleElement = document.getElementById('dynamic-page-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dynamic-page-styles';
      document.head.appendChild(styleElement);
    }
    
    // Gerar CSS com as configurações
    const css = `
      :root {
        --editor-primary: ${config.colors?.primary || '#B89B7A'};
        --editor-secondary: ${config.colors?.secondary || '#aa6b5d'};
        --editor-background: ${config.colors?.background || '#fffaf7'};
        --editor-background-card: ${config.colors?.backgroundCard || '#ffffff'};
        --editor-text: ${config.colors?.text || '#432818'};
        --editor-text-muted: ${config.colors?.textMuted || '#8F7A6A'};
        --editor-h1-size: ${config.typography?.h1 || 48}px;
        --editor-h2-size: ${config.typography?.h2 || 36}px;
        --editor-h3-size: ${config.typography?.h3 || 24}px;
        --editor-body-size: ${config.typography?.body || 16}px;
        --editor-padding: ${config.layout?.padding || 24}px;
        --editor-border-radius: ${config.layout?.borderRadius || 16}px;
      }
      
      /* Aplicar configurações do editor */
      .editor-preview {
        background-color: var(--editor-background) !important;
        color: var(--editor-text) !important;
      }
      
      .editor-preview h1 {
        font-size: var(--editor-h1-size) !important;
        background: linear-gradient(135deg, var(--editor-primary) 0%, var(--editor-secondary) 100%) !important;
        background-clip: text !important;
        -webkit-background-clip: text !important;
        color: transparent !important;
      }
      
      .editor-preview h2 {
        font-size: var(--editor-h2-size) !important;
        color: var(--editor-secondary) !important;
      }
      
      .editor-preview h3 {
        font-size: var(--editor-h3-size) !important;
        color: var(--editor-text) !important;
      }
      
      .editor-preview p, .editor-preview div {
        font-size: var(--editor-body-size) !important;
        color: var(--editor-text) !important;
      }
      
      .editor-preview .muted {
        color: var(--editor-text-muted) !important;
      }
      
      .editor-preview .card {
        background-color: var(--editor-background-card) !important;
        border-radius: var(--editor-border-radius) !important;
        padding: var(--editor-padding) !important;
      }
      
      .editor-preview .button {
        background: linear-gradient(135deg, var(--editor-primary) 0%, var(--editor-secondary) 100%) !important;
        border-radius: calc(var(--editor-border-radius) / 2) !important;
      }
    `;
    
    styleElement.textContent = css;
  };
  
  // Função para salvar configurações
  const handleSaveConfig = (config: any) => {
    setIsLoading(true);
    
    try {
      // Salvar no localStorage
      localStorage.setItem('pageEditorConfig', JSON.stringify(config));
      
      // Aplicar mudanças imediatamente
      applyConfigToPage(config);
      
      // Também salvar no sistema antigo para compatibilidade
      localStorage.setItem('currentQuizFunnel', JSON.stringify({
        ...config,
        timestamp: Date.now()
      }));
      
      toast({
        title: "Configurações aplicadas",
        description: "As alterações foram salvas e aplicadas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Componente temporário melhorado com preview funcional
  const EnhancedTemporaryEditor = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Painel de informações */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <Palette className="h-6 w-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">Status do Editor</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Editor Visual</h3>
              <p className="text-blue-700 text-sm">
                O editor visual está em desenvolvimento. Por enquanto, use os controles abaixo para testar.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Dados Carregados:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Primary Style: {primaryStyle ? '✅ Carregado' : '❌ Não carregado'}</li>
                <li>• Secondary Styles: {secondaryStyles?.length ? `✅ ${secondaryStyles.length} estilos` : '❌ Nenhum'}</li>
                <li>• Config Salva: {initialConfig ? '✅ Encontrada' : '❌ Não encontrada'}</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => window.open('/resultado', '_blank')} 
                variant="outline"
                size="sm"
              >
                Ver Página Real
              </Button>
              <Button 
                onClick={() => handleSaveConfig({ 
                  test: true, 
                  timestamp: Date.now(),
                  colors: { primary: '#ff6b6b', secondary: '#4ecdc4' }
                })}
                disabled={isLoading}
                size="sm"
              >
                Testar Cores
              </Button>
            </div>
          </div>
        </div>
        
        {/* Preview em tempo real */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-medium mb-4">Preview em Tempo Real</h3>
          <div className="editor-preview space-y-4 p-4 border rounded-lg">
            <h1 className="font-bold">Título Principal</h1>
            <h2 className="font-semibold">Subtítulo Secundário</h2>
            <div className="card p-4 border rounded">
              <h3 className="font-medium mb-2">Card de Exemplo</h3>
              <p className="mb-2">Este é um parágrafo normal com texto.</p>
              <p className="muted text-sm">Texto secundário ou muted.</p>
            </div>
            <button className="button px-4 py-2 text-white rounded">
              Botão de Exemplo
            </button>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            * As mudanças aparecerão aqui quando você salvar configurações
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="border-b bg-white p-4 flex items-center justify-between shadow-sm">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/admin')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Dashboard
        </Button>
        <h1 className="text-xl font-semibold text-[#432818]">Editor da Página de Resultado</h1>
        <div className="text-sm text-gray-500">
          Preview Funcional
        </div>
      </div>
      
      <div className="p-4">
        <EnhancedTemporaryEditor />
      </div>
    </div>
  );
};

export default EnhancedResultPageEditorPage;