import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentLibrarySidebar } from './sidebar/ComponentLibrarySidebar';
import { VisualEditorCanvas } from './canvas/VisualEditorCanvas';
import { EditorToolbar } from './toolbar/EditorToolbar';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { ElementPropertiesPanel } from './properties/ElementPropertiesPanel';
import { 
  VisualElement, 
  VisualStage, 
  BlockType, 
  ElementUpdate 
} from '@/types/visualEditor';

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

interface EditorState {
  elements: VisualElement[];
  stages: VisualStage[];
  selectedElementId: string | null;
  activeStageId: string | null;
  isPreviewMode: boolean;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [editorState, setEditorState] = useState<EditorState>({
    elements: [],
    stages: [
      {
        id: 'stage-1',
        title: 'Introdução',
        order: 1,
        type: 'intro',
        settings: {
          showHeader: true,
          showProgress: true,
          allowBack: false,
          backgroundColor: '#ffffff'
        }
      },
      {
        id: 'stage-2',
        title: 'Questão 1',
        order: 2,
        type: 'quiz',
        settings: {
          showHeader: true,
          showProgress: true,
          allowBack: true,
          backgroundColor: '#ffffff'
        }
      }
    ],
    selectedElementId: null,
    activeStageId: 'stage-1',
    isPreviewMode: false,
    viewportMode: 'desktop'
  });

  const generateElementId = () => `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleElementAdd = useCallback((type: BlockType, position?: number) => {
    if (!editorState.activeStageId) return;

    const newElement: VisualElement = {
      id: generateElementId(),
      type,
      stageId: editorState.activeStageId,
      order: position ?? editorState.elements.filter(el => el.stageId === editorState.activeStageId).length,
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
      visible: true,
      locked: false
    };

    setEditorState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      selectedElementId: newElement.id
    }));
  }, [editorState.activeStageId, editorState.elements]);

  const getDefaultContent = (type: BlockType) => {
    switch (type) {
      case 'headline':
        return { text: 'Novo Título', title: 'Novo Título' };
      case 'text':
        return { text: 'Novo texto de exemplo' };
      case 'image':
        return { 
          src: 'https://via.placeholder.com/400x300',
          alt: 'Imagem exemplo',
          imageUrl: 'https://via.placeholder.com/400x300'
        };
      case 'button':
        return { text: 'Continuar', href: '#' };
      case 'form':
        return { 
          label: 'NOME',
          placeholder: 'Digite seu nome aqui...',
          type: 'text'
        };
      case 'question-title':
        return { text: 'Título da questão' };
      case 'question-options':
        return {
          options: [
            { id: 'opt1', text: 'Opção 1', styleCategory: 'Natural', points: 1 },
            { id: 'opt2', text: 'Opção 2', styleCategory: 'Clássico', points: 1 }
          ],
          multiSelect: false
        };
      default:
        return { text: 'Conteúdo padrão' };
    }
  };

  const getDefaultStyle = (type: BlockType) => {
    return {
      width: '100%',
      padding: '1rem',
      margin: '0.5rem 0',
      textAlign: type === 'headline' || type === 'question-title' ? 'center' as const : 'left' as const
    };
  };

  const handleElementUpdate = useCallback((elementId: string, updates: ElementUpdate) => {
    setEditorState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId 
          ? { 
              ...el, 
              content: updates.content ? { ...el.content, ...updates.content } : el.content,
              style: updates.style ? { ...el.style, ...updates.style } : el.style,
              visible: updates.visible ?? el.visible,
              locked: updates.locked ?? el.locked
            }
          : el
      )
    }));
  }, []);

  const handleElementDelete = useCallback((elementId: string) => {
    setEditorState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId),
      selectedElementId: prev.selectedElementId === elementId ? null : prev.selectedElementId
    }));
  }, []);

  const handleElementMove = useCallback((elementId: string, direction: 'up' | 'down') => {
    setEditorState(prev => {
      const stageElements = prev.elements.filter(el => el.stageId === prev.activeStageId);
      const elementIndex = stageElements.findIndex(el => el.id === elementId);
      
      if (elementIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? elementIndex - 1 : elementIndex + 1;
      if (newIndex < 0 || newIndex >= stageElements.length) return prev;

      const updatedElements = prev.elements.map(el => {
        if (el.stageId !== prev.activeStageId) return el;
        
        if (el.id === elementId) {
          return { ...el, order: newIndex };
        }
        if (el.order === newIndex) {
          return { ...el, order: elementIndex };
        }
        return el;
      });

      return { ...prev, elements: updatedElements };
    });
  }, []);

  const handleElementSelect = useCallback((elementId: string) => {
    setEditorState(prev => ({
      ...prev,
      selectedElementId: elementId
    }));
  }, []);

  const handleStageAdd = useCallback(() => {
    const newStage: VisualStage = {
      id: `stage-${Date.now()}`,
      title: `Nova Etapa ${editorState.stages.length + 1}`,
      order: editorState.stages.length + 1,
      type: 'quiz',
      settings: {
        showHeader: true,
        showProgress: true,
        allowBack: true,
        backgroundColor: '#ffffff'
      }
    };

    setEditorState(prev => ({
      ...prev,
      stages: [...prev.stages, newStage],
      activeStageId: newStage.id
    }));
  }, [editorState.stages.length]);

  const handleStageSelect = useCallback((stageId: string) => {
    setEditorState(prev => ({
      ...prev,
      activeStageId: stageId,
      selectedElementId: null
    }));
  }, []);

  const handlePreviewToggle = useCallback(() => {
    setEditorState(prev => ({
      ...prev,
      isPreviewMode: !prev.isPreviewMode,
      selectedElementId: null
    }));
  }, []);

  const handleViewportChange = useCallback((viewport: 'desktop' | 'tablet' | 'mobile') => {
    setEditorState(prev => ({
      ...prev,
      viewportMode: viewport
    }));
  }, []);

  const handleSave = useCallback(() => {
    const dataToSave = {
      funnelId,
      elements: editorState.elements,
      stages: editorState.stages,
      lastModified: new Date().toISOString()
    };
    
    if (onSave) {
      onSave(dataToSave);
    }
    
    console.log('Editor salvado:', dataToSave);
  }, [funnelId, editorState, onSave]);

  const selectedElement = editorState.selectedElementId 
    ? editorState.elements.find(el => el.id === editorState.selectedElementId)
    : null;

  const activeStage = editorState.stages.find(stage => stage.id === editorState.activeStageId);
  
  const stageQuestionData = activeStage?.type.startsWith('question') ? {
    id: activeStage.id,
    title: activeStage.title,
    type: activeStage.type,
    multiSelect: 1,
    options: editorState.elements
      .filter(el => el.stageId === activeStage.id && el.type === 'question-options')
      .flatMap(el => el.content.options || [])
  } : undefined;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
        <EditorToolbar
          isPreviewing={editorState.isPreviewMode}
          onPreviewToggle={handlePreviewToggle}
          onSave={handleSave}
          viewportMode={editorState.viewportMode}
          onViewportChange={handleViewportChange}
        />

        <div className="flex-1 flex overflow-hidden">
          {!editorState.isPreviewMode && (
            <ComponentLibrarySidebar 
              onComponentAdd={handleElementAdd}
            />
          )}

          <VisualEditorCanvas
            elements={editorState.elements}
            stages={editorState.stages}
            activeStageId={editorState.activeStageId}
            selectedElementId={editorState.selectedElementId}
            isPreviewMode={editorState.isPreviewMode}
            viewportMode={editorState.viewportMode}
            onElementSelect={handleElementSelect}
            onElementUpdate={handleElementUpdate}
            onElementDelete={handleElementDelete}
            onElementMove={handleElementMove}
            onElementAdd={handleElementAdd}
            onStageAdd={handleStageAdd}
            onStageSelect={handleStageSelect}
          />

          {!editorState.isPreviewMode && (
            <div className="w-80 border-l border-gray-200 bg-white">
              <Tabs defaultValue="properties" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="properties">Propriedades</TabsTrigger>
                  <TabsTrigger value="stage">Etapa</TabsTrigger>
                </TabsList>
                
                <TabsContent value="properties" className="h-[calc(100%-40px)] overflow-hidden">
                  {selectedElement ? (
                    <ElementPropertiesPanel
                      element={selectedElement}
                      onUpdate={(updates) => handleElementUpdate(selectedElement.id, updates)}
                      onClose={() => setEditorState(prev => ({ ...prev, selectedElementId: null }))}
                    />
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p>Selecione um elemento para editar suas propriedades</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="stage" className="h-[calc(100%-40px)] overflow-hidden">
                  {activeStage ? (
                    <StageConfigurationPanel
                      stageName={activeStage.title}
                      stageType={activeStage.type}
                      questionData={stageQuestionData}
                    />
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p>Selecione uma etapa para configurar</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};
