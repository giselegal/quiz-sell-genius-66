import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Tablet, Plus, Settings, Eye, Grid3x3, Layers, Undo2, Redo2, Save } from 'lucide-react';
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
}

export const DragDropEditor: React.FC<DragDropEditorProps> = ({ onSave, initialBlocks = [] }) => {
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
      version: '2.0'
    };
    onSave(editorConfig);
  }, [steps, activeStepId, previewMode, onSave]);

  // Auto-save a cada 30 segundos
  React.useEffect(() => {
    const interval = setInterval(handleSave, 30000);
    return () => clearInterval(interval);
  }, [handleSave]);

  // Shortcuts de teclado
  React.useEffect(() => {
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

  // Adicionar funcionalidade de exportação/importação
  const exportConfig = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0'
    };
    
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `quiz-config-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [steps, activeStepId, previewMode]);

  const importConfig = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        setSteps(config.steps || []);
        setActiveStepId(config.activeStepId || config.steps[0]?.id);
        setPreviewMode(config.previewMode || 'desktop');
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
      }
    };
    reader.readAsText(file);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        
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
                  Etapas
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
            onReorderSteps={() => {}} // Implementar se necessário
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
                  onClick={exportConfig}
                >
                  📥 Exportar
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => e.target.files?.[0] && importConfig(e.target.files[0])}
                  style={{ display: 'none' }}
                  id="import-config"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => document.getElementById('import-config')?.click()}
                >
                  📤 Importar
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
    </DndContext>
  );
};

export default DragDropEditor;
