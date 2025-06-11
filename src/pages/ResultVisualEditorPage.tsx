
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { VisualEditorToolbar } from '@/components/visual-editor/toolbar/VisualEditorToolbar';
import { UnifiedSidebar } from '@/components/visual-editor/sidebar/UnifiedSidebar';
import { VisualEditorCanvas } from '@/components/visual-editor/canvas/VisualEditorCanvas';
import { PropertiesPanel } from '@/components/visual-editor/properties/VisualEditorProperties';
import { ResultPageTemplates } from '@/components/visual-editor/templates/ResultPageTemplates';
import { useVisualEditor } from '@/hooks/useVisualEditor';
import { useVisualEditorPersistence } from '@/hooks/useVisualEditorPersistence';
import { BlockType, VisualElement } from '@/types/visualEditor';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ResultVisualEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showTemplates, setShowTemplates] = useState(false);

  // Mock primary style - in real app this would come from quiz results
  const [primaryStyle] = useState<StyleResult>({
    category: "Natural" as any,
    score: 100,
    percentage: 85
  });

  const {
    elements,
    stages,
    activeStageId,
    addElement,
    updateElement,
    deleteElement,
    moveElement,
    addStage,
    setActiveStage,
    canUndo,
    canRedo,
    undo,
    redo,
    replaceAllElements
  } = useVisualEditor();

  const { saveEditorState, loadEditorState, isSaving } = useVisualEditorPersistence();

  useEffect(() => {
    if (id) {
      loadEditorState(id).then(state => {
        if (state) {
          // Load the saved state into the editor
          console.log('Loaded state:', state);
        }
      });
    }
  }, [id, loadEditorState]);

  const handleElementAdd = (type: BlockType, position?: number) => {
    const elementId = addElement(type, activeStageId, position);
    setSelectedElementId(elementId);
  };

  const handleElementSelect = (elementId: string) => {
    setSelectedElementId(elementId);
  };

  const handleElementUpdate = (elementId: string, updates: any) => {
    updateElement(elementId, updates);
  };

  const handleSave = async () => {
    if (!id) return;
    
    const editorState = {
      elements,
      stages,
      activeStageId,
      history: [],
      historyIndex: 0,
      selectedElementId,
      viewport: viewportMode,
      isPreviewMode
    };

    const success = await saveEditorState(id, editorState);
    if (success) {
      toast({
        title: "Projeto salvo",
        description: "Suas alterações foram salvas com sucesso",
        duration: 3000
      });
    }
  };

  const handleTemplateSelect = (templateElements: VisualElement[]) => {
    replaceAllElements(templateElements);
    setShowTemplates(false);
    toast({
      title: "Template aplicado",
      description: "O template foi aplicado com sucesso",
      duration: 3000
    });
  };

  const handlePreviewResult = () => {
    // Open the actual result page to see how it looks
    window.open('/resultado', '_blank');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-playfair text-[#432818]">
                Editor Visual - Página de Resultado
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviewResult}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Resultado Real
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTemplates(true)}
              >
                Templates
              </Button>
            </div>
          </div>
        </div>

        <VisualEditorToolbar
          isPreviewing={isPreviewMode}
          onPreviewToggle={() => setIsPreviewMode(!isPreviewMode)}
          onSave={handleSave}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          viewportMode={viewportMode}
          onViewportChange={setViewportMode}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {!isPreviewMode && (
            <UnifiedSidebar
              stages={stages}
              activeStageId={activeStageId}
              onStageSelect={setActiveStage}
              onStageAdd={addStage}
              onComponentAdd={handleElementAdd}
              elements={elements}
            />
          )}
          
          <VisualEditorCanvas
            elements={elements}
            stages={stages}
            activeStageId={activeStageId}
            selectedElementId={selectedElementId}
            isPreviewMode={isPreviewMode}
            viewportMode={viewportMode}
            onElementSelect={handleElementSelect}
            onElementUpdate={handleElementUpdate}
            onElementDelete={deleteElement}
            onElementMove={moveElement}
            onElementAdd={handleElementAdd}
            onStageAdd={addStage}
            onStageSelect={setActiveStage}
          />
          
          {!isPreviewMode && selectedElementId && (
            <PropertiesPanel
              elementId={selectedElementId}
              element={elements.find(el => el.id === selectedElementId)}
              onUpdate={(updates) => handleElementUpdate(selectedElementId, updates)}
              onClose={() => setSelectedElementId(null)}
            />
          )}
        </div>

        {/* Templates Modal */}
        {showTemplates && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-[#432818]">
                  Escolher Template
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplates(false)}
                >
                  ✕
                </Button>
              </div>
              <ResultPageTemplates
                onSelectTemplate={handleTemplateSelect}
                primaryStyle={primaryStyle}
              />
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default ResultVisualEditorPage;
