
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Layers
} from 'lucide-react';
import { ModernSidebar } from './sidebar/ModernSidebar';
import { ModernCanvas } from './canvas/ModernCanvas';
import { ModernPropertiesPanel } from './properties/ModernPropertiesPanel';
import { useModernEditor } from '@/hooks/useModernEditor';

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
    deleteElement,
    selectElement,
    togglePreview,
    undo,
    redo,
    save
  } = useModernEditor(initialData);

  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showGrid, setShowGrid] = useState(true);

  const handleSave = useCallback(async () => {
    const data = await save();
    if (onSave) {
      onSave(data);
    }
  }, [save, onSave]);

  const handleAddElement = useCallback((type: string) => {
    const newElementId = addElement(type);
    selectElement(newElementId);
  }, [addElement, selectElement]);

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
            </div>

            {/* Center Section - Viewport Controls */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewport === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport('desktop')}
                className="px-3"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport('tablet')}
                className="px-3"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewport('mobile')}
                className="px-3"
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
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
              >
                <Redo className="w-4 h-4" />
              </Button>
              <Button
                variant={isPreviewMode ? 'default' : 'outline'}
                size="sm"
                onClick={togglePreview}
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreviewMode ? 'Editando' : 'Preview'}
              </Button>
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
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
            {/* Left Sidebar - Components */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <ModernSidebar onAddElement={handleAddElement} />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Canvas Area */}
            <ResizablePanel defaultSize={60}>
              <div className="h-full bg-gray-50 relative">
                <ModernCanvas
                  elements={elements}
                  selectedElementId={selectedElementId}
                  onSelectElement={selectElement}
                  onUpdateElement={updateElement}
                  onDeleteElement={deleteElement}
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
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </DndProvider>
  );
};

export default ModernVisualEditor;
