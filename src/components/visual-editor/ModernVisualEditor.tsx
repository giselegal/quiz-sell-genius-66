import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Play, 
  Eye, 
  Save, 
  Undo, 
  Redo, 
  Monitor, 
  Tablet, 
  Smartphone,
  Settings,
  Layers,
  RotateCcw,
  Zap
} from 'lucide-react';
import { ModernSidebar } from './sidebar/ModernSidebar';
import { ModernCanvas } from './canvas/ModernCanvas';
import { ModernPropertiesPanel } from './properties/ModernPropertiesPanel';
import { useModernEditor } from '@/hooks/useModernEditor';
import { StepsPanel } from './steps/StepsPanel';
import { useStepsManager } from '@/hooks/useStepsManager';

interface ModernVisualEditorProps {
  funnelId?: string;
  initialData?: any;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  initialData,
  onSave
}) => {
  const {
    elements,
    selectedElementId,
    isPreviewMode,
    canUndo,
    canRedo,
    addElement,
    updateElement,
    duplicateElement,
    deleteElement,
    selectElement,
    togglePreview,
    undo,
    redo,
    save,
    loadAutoSave
  } = useModernEditor(initialData);

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showGrid, setShowGrid] = useState(true);
  const { toast } = useToast();

  // Load autosave on mount
  useEffect(() => {
    const hasAutoSave = localStorage.getItem('modern-editor-autosave');
    if (hasAutoSave && !initialData?.elements?.length) {
      toast({
        title: "Auto-save encontrado",
        description: "Deseja carregar o último rascunho salvo?",
        action: (
          <Button onClick={() => {
            loadAutoSave();
            toast({ title: "Rascunho carregado!" });
          }}>
            Carregar
          </Button>
        )
      });
    }
  }, [loadAutoSave, initialData, toast]);

  const handleSave = useCallback(async () => {
    try {
      const data = await save();
      if (onSave) {
        onSave(data);
      }
      toast({
        title: "✅ Salvo com sucesso!",
        description: "Suas alterações foram salvas."
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao salvar",
        description: "Tente novamente em alguns segundos.",
        variant: "destructive"
      });
    }
  }, [save, onSave, toast]);

  const handleAddElement = useCallback((type: string, position?: { x: number; y: number }) => {
    const newElementId = addElement(type, position);
    selectElement(newElementId);
    toast({
      title: "Componente adicionado",
      description: `${type} foi adicionado ao canvas.`
    });
  }, [addElement, selectElement, toast]);

  const handleDuplicateElement = useCallback(() => {
    if (selectedElementId) {
      const newElementId = duplicateElement(selectedElementId);
      selectElement(newElementId);
      toast({
        title: "Elemento duplicado",
        description: "Uma cópia foi criada."
      });
    }
  }, [selectedElementId, duplicateElement, selectElement, toast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'd':
            e.preventDefault();
            handleDuplicateElement();
            break;
        }
      }
      
      if (e.key === 'Delete' && selectedElementId) {
        deleteElement(selectedElementId);
        toast({
          title: "Elemento excluído",
          description: "O elemento foi removido do canvas."
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave, handleDuplicateElement, selectedElementId, deleteElement, toast]);

  // Add steps management
  const {
    steps,
    activeStepId: activeStep,
    addStep,
    deleteStep,
    duplicateStep,
    editStep,
    reorderStep,
    selectStep
  } = useStepsManager();

  // Update viewport classes function
  const getViewportClasses = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      default:
        return 'w-full';
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen bg-[#F8FAFC] flex flex-col overflow-hidden">
        {/* Header Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <h1 className="text-lg font-semibold text-gray-900">Editor Visual</h1>
                {funnelId && (
                  <Badge variant="secondary" className="text-xs">
                    {funnelId.slice(0, 8)}...
                  </Badge>
                )}
              </div>
              
              {/* Auto-save indicator */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Zap className="w-3 h-3" />
                Auto-save ativo
              </div>
            </div>

            {/* Center Section - Viewport Controls */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewport === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport('desktop')}
                className="px-3"
                title="Desktop (Ctrl+1)"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport('tablet')}
                className="px-3"
                title="Tablet (Ctrl+2)"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport('mobile')}
                className="px-3"
                title="Mobile (Ctrl+3)"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                title="Desfazer (Ctrl+Z)"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                title="Refazer (Ctrl+Y)"
              >
                <Redo className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  loadAutoSave();
                  toast({ title: "Rascunho carregado!" });
                }}
                title="Carregar último rascunho"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant={isPreviewMode ? 'default' : 'outline'}
                size="sm"
                onClick={togglePreview}
                title="Alternar preview"
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreviewMode ? 'Editando' : 'Preview'}
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                title="Salvar (Ctrl+S)"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Steps Panel - New first column */}
            <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
              <StepsPanel
                steps={steps}
                activeStepId={activeStep}
                onStepSelect={selectStep}
                onStepAdd={addStep}
                onStepEdit={editStep}
                onStepDelete={deleteStep}
                onStepDuplicate={duplicateStep}
                onStepReorder={reorderStep}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Left Sidebar - Components */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <ModernSidebar onAddElement={handleAddElement} />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Canvas Area */}
            <ResizablePanel defaultSize={45}>
              <div className="h-full bg-gray-50 relative">
                <ModernCanvas
                  elements={elements}
                  selectedElementId={selectedElementId}
                  onSelectElement={selectElement}
                  onUpdateElement={updateElement}
                  onDeleteElement={deleteElement}
                  onAddElement={handleAddElement}
                  isPreviewMode={isPreviewMode}
                  viewport={viewport}
                  showGrid={showGrid}
                  className={getViewportClasses()}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Panel - Properties */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <ModernPropertiesPanel
                selectedElement={elements.find(el => el.id === selectedElementId)}
                onUpdateElement={updateElement}
                onDeleteElement={deleteElement}
                onDuplicateElement={handleDuplicateElement}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Status bar */}
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>{elements.length} elementos</span>
              <span>Zoom: 100%</span>
              <span>Grid: {showGrid ? 'On' : 'Off'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Ctrl+S para salvar</span>
              <span>•</span>
              <span>Del para excluir</span>
              <span>•</span>
              <span>Ctrl+D para duplicar</span>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default ModernVisualEditor;
