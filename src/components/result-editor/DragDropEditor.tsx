import React, { useState, useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Tablet, Plus, Settings, Eye, Grid3x3, Layers, Undo2, Redo2, Save, Download, Upload, Palette, FileText, Share2, Users, History, HelpCircle } from 'lucide-react';
import { COMPONENT_REGISTRY, COMPONENT_CATEGORIES, ComponentDefinition } from './ComponentRegistry';
import { ComponentToolbar } from './ComponentToolbar';
import { StepsPanel } from './StepsPanel';
import { PropertiesPanel } from './PropertiesPanel';
import { DropZoneCanvas } from './DropZoneCanvas';

interface CanvasItem {
  id: string;
  type: string;
  props: Record<string, any>;
  position: number;
}

interface Step {
  id: string;
  name: string;
  items: CanvasItem[];
  settings: {
    showLogo: boolean;
    showProgress: boolean;
    allowReturn: boolean;
    isVisible: boolean;
  };
}

interface DragDropEditorProps {
  onSave: (config: any) => void;
  initialBlocks?: any[];
  mode?: 'quiz' | 'result' | 'offer';
  quizId?: string;
}

export const DragDropEditor: React.FC<DragDropEditorProps> = ({ 
  onSave, 
  initialBlocks = [], 
  mode = 'quiz',
  quizId 
}) => {
  // Estados principais
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'step-1',
      name: 'Etapa 1',
      items: [],
      settings: {
        showLogo: true,
        showProgress: true,
        allowReturn: true,
        isVisible: true
      }
    }
  ]);
  
  const [activeStepId, setActiveStepId] = useState('step-1');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [draggedComponent, setDraggedComponent] = useState<ComponentDefinition | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState({
    steps: false,
    components: false,
    properties: false
  });

  // Sistema de undo/redo
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Estados para funcionalidades avançadas
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isPublished, setIsPublished] = useState(false);
  const [publishUrl, setPublishUrl] = useState('');

  // Sensores para drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Step ativo
  const activeStep = steps.find(step => step.id === activeStepId);
  const selectedItem = activeStep?.items.find(item => item.id === selectedItemId);

  // Carregar configuração inicial baseada no modo
  useEffect(() => {
    const loadInitialConfig = async () => {
      if (quizId) {
        try {
          const response = await fetch(`/api/quiz/${quizId}/config?mode=${mode}`);
          const data = await response.json();
          
          if (data.success && data.config) {
            setSteps(data.config.steps || []);
            setActiveStepId(data.config.activeStepId || data.config.steps[0]?.id);
            setPreviewMode(data.config.previewMode || 'desktop');
            setCurrentTheme(data.config.theme || 'default');
          }
        } catch (error) {
          console.error('Erro ao carregar configuração:', error);
        }
      }
    };

    loadInitialConfig();
  }, [quizId, mode]);

  // Salvar estado no histórico
  const saveToHistory = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ steps, activeStepId });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [steps, activeStepId, history, historyIndex]);

  // Undo/Redo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setSteps(previousState.steps);
      setActiveStepId(previousState.activeStepId);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setSteps(nextState.steps);
      setActiveStepId(nextState.activeStepId);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  // Handlers para drag & drop
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    
    if (active.data.current?.type === 'component') {
      const component = COMPONENT_REGISTRY.find(c => c.id === active.id);
      setDraggedComponent(component || null);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setDraggedComponent(null);
      return;
    }

    // Drag de componente para canvas
    if (active.data.current?.type === 'component' && over.data.current?.type === 'canvas') {
      const component = COMPONENT_REGISTRY.find(c => c.id === active.id);
      if (component && activeStep) {
        saveToHistory();
        
        const newItem: CanvasItem = {
          id: `${component.type}-${Date.now()}`,
          type: component.type,
          props: { ...component.defaultProps },
          position: activeStep.items.length
        };

        setSteps(prev => prev.map(step => 
          step.id === activeStepId 
            ? { ...step, items: [...step.items, newItem] }
            : step
        ));
      }
    }

    // Reordenação de itens no canvas
    if (active.data.current?.type === 'canvas-item' && over.data.current?.type === 'canvas-item') {
      const activeIndex = activeStep?.items.findIndex(item => item.id === active.id) ?? -1;
      const overIndex = activeStep?.items.findIndex(item => item.id === over.id) ?? -1;
      
      if (activeIndex !== -1 && overIndex !== -1 && activeStep) {
        saveToHistory();
        const newItems = arrayMove(activeStep.items, activeIndex, overIndex);
        setSteps(prev => prev.map(step => 
          step.id === activeStepId 
            ? { ...step, items: newItems }
            : step
        ));
      }
    }

    setDraggedComponent(null);
  }, [activeStepId, activeStep, saveToHistory]);

  // Função para adicionar nova etapa
  const addStep = useCallback((name?: string) => {
    saveToHistory();
    const newStep: Step = {
      id: `step-${Date.now()}`,
      name: name || `Etapa ${steps.length + 1}`,
      items: [],
      settings: {
        showLogo: true,
        showProgress: true,
        allowReturn: true,
        isVisible: true
      }
    };
    setSteps(prev => [...prev, newStep]);
    setActiveStepId(newStep.id);
  }, [steps.length, saveToHistory]);

  // Função para atualizar etapa
  const updateStep = useCallback((stepId: string, updates: Partial<Step>) => {
    saveToHistory();
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  }, [saveToHistory]);

  // Função para deletar etapa
  const deleteStep = useCallback((stepId: string) => {
    if (steps.length <= 1) return;
    
    saveToHistory();
    setSteps(prev => prev.filter(step => step.id !== stepId));
    
    if (activeStepId === stepId) {
      setActiveStepId(steps[0].id);
    }
  }, [steps, activeStepId, saveToHistory]);

  // Função para duplicar etapa
  const duplicateStep = useCallback((stepId: string) => {
    const stepToDuplicate = steps.find(step => step.id === stepId);
    if (!stepToDuplicate) return;
    
    saveToHistory();
    const duplicatedStep: Step = {
      ...stepToDuplicate,
      id: `step-${Date.now()}`,
      name: `${stepToDuplicate.name} (Cópia)`,
      items: stepToDuplicate.items.map(item => ({
        ...item,
        id: `${item.type}-${Date.now()}-${Math.random()}`
      }))
    };
    
    const stepIndex = steps.findIndex(step => step.id === stepId);
    setSteps(prev => [
      ...prev.slice(0, stepIndex + 1),
      duplicatedStep,
      ...prev.slice(stepIndex + 1)
    ]);
  }, [steps, saveToHistory]);

  // Função para atualizar propriedades do item
  const updateItemProps = useCallback((itemId: string, newProps: Record<string, any>) => {
    saveToHistory();
    setSteps(prev => prev.map(step => 
      step.id === activeStepId 
        ? {
            ...step, 
            items: step.items.map(item => 
              item.id === itemId 
                ? { ...item, props: { ...item.props, ...newProps } }
                : item
            )
          }
        : step
    ));
  }, [activeStepId, saveToHistory]);

  // Função para deletar item
  const deleteItem = useCallback((itemId: string) => {
    saveToHistory();
    setSteps(prev => prev.map(step => 
      step.id === activeStepId 
        ? { ...step, items: step.items.filter(item => item.id !== itemId) }
        : step
    ));
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
    }
  }, [activeStepId, selectedItemId, saveToHistory]);

  // Função para duplicar item
  const duplicateItem = useCallback((itemId: string) => {
    const itemToDuplicate = activeStep?.items.find(item => item.id === itemId);
    if (!itemToDuplicate) return;
    
    saveToHistory();
    const duplicatedItem: CanvasItem = {
      ...itemToDuplicate,
      id: `${itemToDuplicate.type}-${Date.now()}`,
      position: itemToDuplicate.position + 1
    };
    
    setSteps(prev => prev.map(step => 
      step.id === activeStepId 
        ? { 
            ...step, 
            items: [
              ...step.items.slice(0, itemToDuplicate.position + 1),
              duplicatedItem,
              ...step.items.slice(itemToDuplicate.position + 1)
            ]
          }
        : step
    ));
  }, [activeStep, activeStepId, saveToHistory]);

  // Função para salvar
  const handleSave = useCallback(() => {
    const editorConfig = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0',
      theme: currentTheme,
      mode
    };
    onSave(editorConfig);
  }, [steps, activeStepId, previewMode, currentTheme, mode, onSave]);

  // Auto-save a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(handleSave, 30000);
    return () => clearInterval(interval);
  }, [handleSave]);

  // Shortcuts de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave]);

  // Função para aplicar template
  const applyTemplate = useCallback((template: any) => {
    saveToHistory();
    setSteps(template.steps);
    setActiveStepId(template.steps[0]?.id);
    setShowTemplateLibrary(false);
  }, [saveToHistory]);

  // Função para upload de mídia
  const handleMediaUpload = useCallback((file: File) => {
    // Simular upload - na prática integraria com serviço de storage
    const url = URL.createObjectURL(file);
    return url;
  }, []);

  // Função para aplicar tema
  const applyTheme = useCallback((theme: any) => {
    setCurrentTheme(theme.id);
    // Aplicar cores globais a todos os componentes
    setSteps(prev => prev.map(step => ({
      ...step,
      items: step.items.map(item => ({
        ...item,
        props: {
          ...item.props,
          color: theme.textColor,
          backgroundColor: theme.primaryColor
        }
      }))
    })));
  }, []);

  // Função para publicar
  const handlePublish = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0',
      theme: currentTheme
    };
    
    // Simular publicação - na prática enviaria para API
    const publishedUrl = `https://quiz.app/published/${Date.now()}`;
    setPublishUrl(publishedUrl);
    setIsPublished(true);
    setShowPublishModal(false);
    
    onSave(config);
  }, [steps, activeStepId, previewMode, currentTheme, onSave]);

  // Templates específicos por modo
  const getTemplatesByMode = () => {
    if (mode === 'result') {
      return [
        {
          id: 'result-simple',
          name: 'Resultado Simples',
          category: 'Resultado',
          preview: '🎯',
          steps: [
            {
              id: 'step-1',
              name: 'Resultado',
              items: [
                {
                  id: 'heading-1',
                  type: 'heading',
                  props: {
                    content: 'Seu Resultado: {RESULT_TITLE}',
                    level: 1,
                    fontSize: 48,
                    textAlign: 'center'
                  },
                  position: 0
                }
              ],
              settings: {
                showLogo: true,
                showProgress: false,
                allowReturn: false,
                isVisible: true
              }
            }
          ]
        }
      ];
    }

    if (mode === 'offer') {
      return [
        {
          id: 'offer-urgency',
          name: 'Oferta com Urgência',
          category: 'Oferta',
          preview: '⚡',
          steps: [
            {
              id: 'step-1',
              name: 'Oferta Especial',
              items: [
                {
                  id: 'heading-1',
                  type: 'heading',
                  props: {
                    content: 'Oferta Exclusiva Para Você',
                    level: 1,
                    fontSize: 48,
                    textAlign: 'center'
                  },
                  position: 1
                }
              ],
              settings: {
                showLogo: true,
                showProgress: false,
                allowReturn: false,
                isVisible: true
              }
            }
          ]
        }
      ];
    }

    // Templates para quiz
    return [
      {
        id: 'lead-magnet',
        name: 'Lead Magnet',
        category: 'Marketing',
        preview: '🧲',
        steps: [
          {
            id: 'step-1',
            name: 'Captura de Lead',
            items: [
              {
                id: 'heading-1',
                type: 'heading',
                props: {
                  content: 'Descubra Seu Perfil Ideal',
                  level: 1,
                  fontSize: 48,
                  textAlign: 'center'
                },
                position: 0
              }
            ],
            settings: {
              showLogo: true,
              showProgress: true,
              allowReturn: false,
              isVisible: true
            }
          }
        ]
      }
    ];
  };

  // Header do modo
  const getModeTitle = () => {
    switch (mode) {
      case 'quiz': return 'Editor de Quiz';
      case 'result': return 'Editor de Resultado';
      case 'offer': return 'Editor de Oferta';
      default: return 'Editor Visual';
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Header com modo */}
        <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900">{getModeTitle()}</h1>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {mode.toUpperCase()}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Quiz ID: {quizId}
              </div>
            </div>
          </div>
        </div>

        {/* Ajustar margin-top para o header */}
        <div className="flex w-full mt-16">
          
          {/* SIDEBAR ESQUERDA - ETAPAS */}
          <div className={`transition-all duration-300 ${
            sidebarCollapsed.steps ? 'w-16' : 'w-64'
          } bg-white border-r border-gray-200 flex flex-col`}>
            
            {/* Header das Etapas */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed.steps && (
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    {mode === 'quiz' ? 'Etapas' : mode === 'result' ? 'Resultados' : 'Ofertas'}
                  </h2>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(prev => ({ ...prev, steps: !prev.steps }))}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Lista de Etapas */}
            <StepsPanel
              steps={steps}
              activeStepId={activeStepId}
              onStepSelect={setActiveStepId}
              onAddStep={addStep}
              onUpdateStep={updateStep}
              onDeleteStep={deleteStep}
              onDuplicateStep={duplicateStep}
              onReorderSteps={() => {}}
              collapsed={sidebarCollapsed.steps}
            />
          </div>

          {/* SIDEBAR ESQUERDA 2 - COMPONENTES */}
          <div className={`transition-all duration-300 ${
            sidebarCollapsed.components ? 'w-16' : 'w-80'
          } bg-white border-r border-gray-200 flex flex-col`}>
            
            {/* Header dos Componentes */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed.components && (
                  <h2 className="font-semibold text-gray-900">Componentes</h2>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(prev => ({ ...prev, components: !prev.components }))}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Toolbar de Componentes */}
            <ComponentToolbar
              categories={COMPONENT_CATEGORIES}
              components={COMPONENT_REGISTRY}
              collapsed={sidebarCollapsed.components}
            />
          </div>

          {/* ÁREA PRINCIPAL - CANVAS */}
          <div className="flex-1 flex flex-col">
            
            {/* Toolbar Superior */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                
                {/* Actions Left */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={undo}
                    disabled={historyIndex <= 0}
                  >
                    <Undo2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={redo}
                    disabled={historyIndex >= history.length - 1}
                  >
                    <Redo2 className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Preview Mode Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Preview:</span>
                  <div className="flex border border-gray-300 rounded-lg">
                    {[
                      { mode: 'desktop', icon: Monitor, label: 'Desktop' },
                      { mode: 'tablet', icon: Tablet, label: 'Tablet' },
                      { mode: 'mobile', icon: Smartphone, label: 'Mobile' }
                    ].map(({ mode, icon: Icon, label }) => (
                      <Button
                        key={mode}
                        variant={previewMode === mode ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setPreviewMode(mode as any)}
                        className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                      >
                        <Icon className="w-4 h-4 mr-1" />
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Actions Right */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTemplateLibrary(true)}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Templates
                  </Button>

                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>

                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-1" />
                    Salvar
                  </Button>
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 overflow-auto p-6">
              <DropZoneCanvas
                items={activeStep?.items || []}
                previewMode={previewMode}
                selectedItemId={selectedItemId}
                onSelectItem={setSelectedItemId}
                onDeleteItem={deleteItem}
              />
            </div>
          </div>

          {/* SIDEBAR DIREITA - PROPRIEDADES */}
          <div className={`transition-all duration-300 ${
            sidebarCollapsed.properties ? 'w-16' : 'w-80'
          } bg-white border-l border-gray-200 flex flex-col`}>
            
            {/* Header das Propriedades */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed.properties && (
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Propriedades
                  </h2>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(prev => ({ ...prev, properties: !prev.properties }))}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Painel de Propriedades */}
            <PropertiesPanel
              selectedItem={selectedItem}
              step={activeStep}
              onUpdateItem={updateItemProps}
              onUpdateStep={(updates) => updateStep(activeStepId, updates)}
              onDeleteItem={deleteItem}
              onDuplicateItem={duplicateItem}
              collapsed={sidebarCollapsed.properties}
            />
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {draggedComponent ? (
            <Card className="p-3 shadow-lg bg-white border-2 border-blue-500 opacity-90">
              <div className="flex items-center gap-2">
                <draggedComponent.icon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">{draggedComponent.label}</span>
              </div>
            </Card>
          ) : null}
        </DragOverlay>

        {/* Template Library Modal */}
        {showTemplateLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    Templates para {mode === 'quiz' ? 'Quiz' : mode === 'result' ? 'Resultado' : 'Oferta'}
                  </h2>
                  <Button variant="ghost" onClick={() => setShowTemplateLibrary(false)}>✕</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {getTemplatesByMode().map((template) => (
                    <Card key={template.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{template.preview}</div>
                        <h3 className="font-semibold mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{template.category}</p>
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => applyTemplate(template)}
                        >
                          Usar Template
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default DragDropEditor;