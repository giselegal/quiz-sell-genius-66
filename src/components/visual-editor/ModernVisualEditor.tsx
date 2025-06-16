import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Save, Eye, Settings, Download, Upload, Smartphone, Tablet, Monitor } from 'lucide-react';
import { VisualElement as CanvasElement, BlockType } from '@/types/visualEditor';

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
  pageType?: 'funnel' | 'resultado' | 'quiz-descubra-seu-estilo';
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({ 
  funnelId, 
  onSave,
  pageType = 'funnel'
}) => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const componentLibrary: { type: BlockType; label: string; icon: React.ReactNode }[] = [
    { type: 'title', label: 'Título', icon: '📝' },
    { type: 'text', label: 'Texto', icon: '📄' },
    { type: 'image', label: 'Imagem', icon: '🖼️' },
    { type: 'button', label: 'Botão', icon: '🔘' },
    { type: 'input', label: 'Campo de Texto', icon: '📝' },
    { type: 'email', label: 'E-mail', icon: '✉️' },
    { type: 'phone', label: 'Telefone', icon: '📞' },
    { type: 'video', label: 'Vídeo', icon: '🎥' },
    { type: 'audio', label: 'Áudio', icon: '🎵' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
    { type: 'radio', label: 'Radio', icon: '🔘' },
    { type: 'testimonial', label: 'Depoimento', icon: '💬' },
    { type: 'price', label: 'Preço', icon: '💰' },
    { type: 'alert', label: 'Alerta', icon: '⚠️' },
    { type: 'carousel', label: 'Carrossel', icon: '🎠' },
    { type: 'chart', label: 'Gráfico', icon: '📊' },
    { type: 'progress', label: 'Progresso', icon: '📈' },
    { type: 'spacer', label: 'Espaçador', icon: '⬜' },
    { type: 'loading', label: 'Loading', icon: '⏳' },
    { type: 'level', label: 'Nível', icon: '📊' },
    { type: 'calendar', label: 'Calendário', icon: '📅' },
    { type: 'headline', label: 'Manchete', icon: '📰' },
    { type: 'form', label: 'Formulário', icon: '📋' }
  ];

  // Add page-specific components based on pageType
  if (pageType === 'quiz-descubra-seu-estilo') {
    componentLibrary.push(
      { type: 'question-title', label: 'Título da Questão', icon: '❓' },
      { type: 'question-options', label: 'Opções da Questão', icon: '☰' }
    );
  }

  const handleDragStart = (type: BlockType) => {
    // Handle drag start logic
  };

  const handleElementSelect = useCallback((elementId: string) => {
    setSelectedElementId(elementId);
  }, []);

  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  }, []);

  const handleSave = useCallback(() => {
    const data = {
      funnelId,
      pageType,
      elements,
      timestamp: Date.now()
    };
    
    if (onSave) {
      onSave(data);
    }
    
    console.log('Saving:', data);
  }, [funnelId, pageType, elements, onSave]);

  const getPageTitle = () => {
    switch (pageType) {
      case 'resultado':
        return 'Editor da Página de Resultado';
      case 'quiz-descubra-seu-estilo':
        return 'Editor do Quiz Descubra Seu Estilo';
      default:
        return 'Editor Visual de Funil';
    }
  };

  const getViewportStyles = () => {
    switch (viewport) {
      case 'mobile':
        return { maxWidth: '375px', margin: '0 auto' };
      case 'tablet':
        return { maxWidth: '768px', margin: '0 auto' };
      default:
        return { width: '100%' };
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {getPageTitle()}
              </h1>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {pageType.toUpperCase()}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Viewport Controls */}
              <div className="flex items-center gap-1 mr-4">
                <Button
                  variant={viewport === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewport('desktop')}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewport === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewport('tablet')}
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewport === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewport('mobile')}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant={isPreviewMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                <Eye className="w-4 h-4 mr-1" />
                {isPreviewMode ? 'Sair do Preview' : 'Preview'}
              </Button>
              
              <Button onClick={handleSave} size="sm">
                <Save className="w-4 h-4 mr-1" />
                Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Component Library Sidebar */}
            {!isPreviewMode && (
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <div className="h-full bg-white border-r border-gray-200">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-medium text-gray-900">Componentes</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Arraste para o canvas
                    </p>
                  </div>
                  <div className="p-2">
                    {componentLibrary.map((component) => (
                      <div
                        key={component.type}
                        draggable
                        onDragStart={() => handleDragStart(component.type)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-grab active:cursor-grabbing border border-gray-200 mb-2"
                      >
                        <span className="text-lg">{component.icon}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {component.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ResizablePanel>
            )}

            {!isPreviewMode && <ResizableHandle withHandle />}

            {/* Canvas */}
            <ResizablePanel defaultSize={isPreviewMode ? 100 : 60}>
              <div className="h-full bg-gray-100 p-4 overflow-auto">
                <div style={getViewportStyles()}>
                  <div className="bg-white min-h-[600px] shadow-lg rounded-lg p-6">
                    {elements.length === 0 ? (
                      <div className="flex items-center justify-center h-96 text-gray-500">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Settings className="w-8 h-8" />
                          </div>
                          <h3 className="text-lg font-medium mb-2">Canvas Vazio</h3>
                          <p className="text-sm">
                            Arraste componentes da barra lateral para começar a construir sua página
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {elements.map((element) => (
                          <div
                            key={element.id}
                            onClick={() => handleElementSelect(element.id)}
                            className={`
                              p-4 border rounded-lg cursor-pointer transition-all
                              ${selectedElementId === element.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            <div className="text-sm text-gray-600 mb-2">
                              {componentLibrary.find(c => c.type === element.type)?.label || element.type}
                            </div>
                            <div className="text-gray-900">
                              {element.content.text || 'Componente sem texto'}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ResizablePanel>

            {!isPreviewMode && <ResizableHandle withHandle />}

            {/* Properties Panel */}
            {!isPreviewMode && (
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <div className="h-full bg-white border-l border-gray-200">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-medium text-gray-900">Propriedades</h2>
                  </div>
                  <div className="p-4">
                    {selectedElementId ? (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Elemento selecionado: {selectedElementId}
                        </p>
                        {/* Properties form would go here */}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Selecione um elemento para editar suas propriedades
                      </p>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </DndProvider>
  );
};
