
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { StyleResult } from '@/types/quiz';
import { ResultPageSidebar } from './sidebar/ResultPageSidebar';
import { ResultPageCanvas } from './canvas/ResultPageCanvas';
import { Button } from '@/components/ui/button';
import { Save, Eye, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useResultPageVisualEditor } from '@/hooks/useResultPageVisualEditor';

interface ResultPageBuilderProps {
  primaryStyle: StyleResult;
  secondaryStyles?: StyleResult[];
  onSave?: (config: any) => void;
  onPreview?: () => void;
}

export const ResultPageBuilder: React.FC<ResultPageBuilderProps> = ({
  primaryStyle,
  secondaryStyles,
  onSave,
  onPreview
}) => {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showProperties, setShowProperties] = useState(true);
  
  const {
    blocks,
    selectedBlockId,
    isPreviewMode,
    setSelectedBlockId,
    setIsPreviewMode,
    addBlock,
    updateBlock,
    deleteBlock,
    saveProject
  } = useResultPageVisualEditor(primaryStyle, secondaryStyles);

  const handleSave = async () => {
    const success = await saveProject();
    if (success && onSave) {
      onSave({ blocks, primaryStyle, secondaryStyles });
    }
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
    if (onPreview) {
      onPreview();
    }
  };

  const getViewportClasses = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-6xl mx-auto';
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col bg-gray-50">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-gray-900">
                Editor da Página de Resultado
              </h1>
              <div className="text-sm text-gray-600">
                Estilo: {primaryStyle.category}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Viewport controls */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant={viewportMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewportMode('desktop')}
                  className="rounded-r-none"
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewportMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewportMode('tablet')}
                  className="rounded-none border-x border-gray-300"
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewportMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewportMode('mobile')}
                  className="rounded-l-none"
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                {isPreviewMode ? 'Editar' : 'Preview'}
              </Button>
              
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Sidebar */}
            {!isPreviewMode && (
              <>
                <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                  <ResultPageSidebar
                    onComponentAdd={addBlock}
                    primaryStyle={primaryStyle}
                  />
                </ResizablePanel>
                <ResizableHandle withHandle />
              </>
            )}
            
            {/* Canvas */}
            <ResizablePanel defaultSize={isPreviewMode ? 100 : 60}>
              <div className={`h-full bg-gray-100 overflow-auto ${getViewportClasses()}`}>
                <ResultPageCanvas
                  blocks={blocks}
                  primaryStyle={primaryStyle}
                  secondaryStyles={secondaryStyles}
                  selectedBlockId={selectedBlockId}
                  isPreviewMode={isPreviewMode}
                  onBlockSelect={setSelectedBlockId}
                  onBlockUpdate={updateBlock}
                  onBlockDelete={deleteBlock}
                />
              </div>
            </ResizablePanel>
            
            {/* Properties Panel */}
            {!isPreviewMode && selectedBlockId && showProperties && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
                  <div className="h-full bg-white border-l border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Propriedades</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedBlockId(null)}
                      >
                        ✕
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Bloco selecionado: {selectedBlockId}
                      </p>
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          deleteBlock(selectedBlockId);
                          setSelectedBlockId(null);
                        }}
                      >
                        Excluir Bloco
                      </Button>
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </DndProvider>
  );
};
