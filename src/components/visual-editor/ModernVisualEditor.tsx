
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Eye,
  Code
} from 'lucide-react';

import { VisualEditorCanvas } from './canvas/VisualEditorCanvas';
import { StepsPanel } from './steps/StepsPanel';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { ComponentsPalette } from './sidebar/ComponentsPalette';
import type { VisualElement, VisualStage, VisualEditorState, BlockType } from '@/types/visualEditor';

const mockStages = [
  {
    id: 'intro-1',
    name: 'Introdução',
    type: 'intro' as const,
  },
  {
    id: 'question-1',
    name: 'Questão 1',
    type: 'quiz' as const,
  },
  {
    id: 'question-2',
    name: 'Questão 2',
    type: 'quiz' as const,
  },
  {
    id: 'strategic-1',
    name: 'Questão Estratégica',
    type: 'strategic' as const,
  },
  {
    id: 'result-1',
    name: 'Resultado',
    type: 'result' as const,
  },
  {
    id: 'offer-1',
    name: 'Oferta',
    type: 'offer' as const,
  }
];

const mockElements: VisualElement[] = [
  {
    id: 'element-1',
    type: 'headline',
    stageId: 'intro-1',
    order: 0,
    content: { text: 'Bem-vindo ao Quiz' },
    style: { fontSize: '2rem', textAlign: 'center', color: '#000000' },
    visible: true,
    locked: false
  },
  {
    id: 'element-2',
    type: 'text',
    stageId: 'intro-1',
    order: 1,
    content: { text: 'Descubra seu estilo pessoal em apenas alguns minutos!' },
    style: { fontSize: '1.2rem', textAlign: 'center', color: '#666666' },
    visible: true,
    locked: false
  },
  {
    id: 'element-3',
    type: 'button',
    stageId: 'intro-1',
    order: 2,
    content: { text: 'Começar Quiz' },
    style: { backgroundColor: '#3b82f6', color: '#ffffff', padding: '12px 24px' },
    visible: true,
    locked: false
  }
];

const getDefaultElementContent = (type: BlockType) => {
  switch (type) {
    case 'headline':
      return { text: 'Novo Título' };
    case 'text':
      return { text: 'Novo texto' };
    case 'button':
      return { text: 'Botão' };
    case 'image':
      return { src: '', alt: 'Nova imagem' };
    case 'question-title':
      return { text: 'Nova pergunta' };
    case 'question-options':
      return { 
        options: [
          'Opção A',
          'Opção B',
          'Opção C',
          'Opção D'
        ],
        multiSelect: false 
      };
    default:
      return {};
  }
};

const getDefaultElementStyle = (type: BlockType) => {
  switch (type) {
    case 'headline':
      return { fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' };
    case 'text':
      return { fontSize: '1rem', textAlign: 'left' };
    case 'button':
      return { backgroundColor: '#3b82f6', color: '#ffffff', padding: '12px 24px' };
    default:
      return {};
  }
};

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [editorState, setEditorState] = useState<VisualEditorState>({
    elements: mockElements,
    stages: mockStages.map(stage => ({
      id: stage.id,
      title: stage.name,
      order: mockStages.indexOf(stage),
      type: stage.type,
      settings: {
        showHeader: true,
        showProgress: true,
        allowBack: stage.type !== 'intro',
        backgroundColor: '#ffffff'
      }
    })),
    activeStageId: mockStages[0]?.id || null,
    history: [],
    historyIndex: -1,
    selectedElementId: null,
    hoveredElementId: null,
    viewport: 'desktop',
    zoomLevel: 100,
    isPreviewMode: false,
    settings: {
      showGrid: false,
      snapToGrid: true,
      gridSize: 10,
      showRulers: false,
      showBoundingBoxes: true,
      autoSave: true,
      autoSaveInterval: 30000
    }
  });

  const [selectedPanel, setSelectedPanel] = useState<'stages' | 'components' | 'properties'>('stages');

  const handleElementSelect = useCallback((elementId: string) => {
    setEditorState(prev => ({
      ...prev,
      selectedElementId: elementId
    }));
  }, []);

  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    setEditorState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
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
      const elements = [...prev.elements];
      const elementIndex = elements.findIndex(el => el.id === elementId);
      
      if (elementIndex === -1) return prev;
      
      const targetIndex = direction === 'up' ? elementIndex - 1 : elementIndex + 1;
      
      if (targetIndex < 0 || targetIndex >= elements.length) return prev;
      
      [elements[elementIndex], elements[targetIndex]] = [elements[targetIndex], elements[elementIndex]];
      
      return { ...prev, elements };
    });
  }, []);

  const handleComponentSelect = useCallback((componentType: string) => {
    if (!editorState.activeStageId) return;

    const newElement: VisualElement = {
      id: `element-${Date.now()}`,
      type: componentType as BlockType,
      stageId: editorState.activeStageId,
      order: editorState.elements.filter(el => el.stageId === editorState.activeStageId).length,
      content: getDefaultElementContent(componentType as BlockType),
      style: getDefaultElementStyle(componentType as BlockType),
      visible: true,
      locked: false
    };

    setEditorState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      selectedElementId: newElement.id
    }));
  }, [editorState.activeStageId, editorState.elements]);

  const handleStageAdd = useCallback(() => {
    const newStage: VisualStage = {
      id: `stage-${Date.now()}`,
      title: `Nova Etapa ${editorState.stages.length + 1}`,
      order: editorState.stages.length,
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

  const handleViewportChange = useCallback((viewport: 'desktop' | 'tablet' | 'mobile') => {
    setEditorState(prev => ({ ...prev, viewport }));
  }, []);

  const handlePreviewToggle = useCallback(() => {
    setEditorState(prev => ({ ...prev, isPreviewMode: !prev.isPreviewMode }));
  }, []);

  const handleSave = useCallback(() => {
    const data = {
      editorState,
      pageInfo: {
        title: 'Quiz Visual Editor',
        description: 'Editor visual para criação de quizzes',
        slug: funnelId,
        published: false
      }
    };

    onSave?.(data);
    console.log('Salvando dados do editor:', data);
  }, [editorState, funnelId, onSave]);

  const activeStage = editorState.stages.find(stage => stage.id === editorState.activeStageId);
  const stageElements = editorState.elements.filter(el => el.stageId === editorState.activeStageId);
  const selectedElement = editorState.elements.find(el => el.id === editorState.selectedElementId);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Editor Visual
            </h1>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={editorState.viewport === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewportChange('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={editorState.viewport === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewportChange('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={editorState.viewport === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleViewportChange('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreviewToggle}>
              {editorState.isPreviewMode ? <Code className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {editorState.isPreviewMode ? 'Editar' : 'Preview'}
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-white border-r border-gray-200">
              <div className="border-b border-gray-200 p-2">
                <div className="flex rounded-lg bg-gray-100 p-1">
                  <Button
                    variant={selectedPanel === 'stages' ? 'default' : 'ghost'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedPanel('stages')}
                  >
                    Etapas
                  </Button>
                  <Button
                    variant={selectedPanel === 'components' ? 'default' : 'ghost'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedPanel('components')}
                  >
                    Componentes
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[calc(100%-60px)]">
                {selectedPanel === 'stages' && (
                  <StepsPanel
                    stages={mockStages}
                    currentStage={editorState.activeStageId || ''}
                    onStageSelect={handleStageSelect}
                  />
                )}
                {selectedPanel === 'components' && (
                  <ComponentsPalette
                    onComponentSelect={handleComponentSelect}
                    selectedComponent={null}
                  />
                )}
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Canvas */}
          <ResizablePanel defaultSize={60}>
            <VisualEditorCanvas
              elements={stageElements}
              selectedElementId={editorState.selectedElementId}
              isPreviewMode={editorState.isPreviewMode}
              onElementSelect={handleElementSelect}
              onElementUpdate={handleElementUpdate}
              onElementDelete={handleElementDelete}
              onElementMove={handleElementMove}
            />
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Sidebar - Properties */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-white border-l border-gray-200">
              <StageConfigurationPanel
                stage={activeStage}
                selectedElement={selectedElement}
                onStageUpdate={(updates) => {
                  if (activeStage) {
                    setEditorState(prev => ({
                      ...prev,
                      stages: prev.stages.map(stage =>
                        stage.id === activeStage.id ? { ...stage, ...updates } : stage
                      )
                    }));
                  }
                }}
                onElementUpdate={(updates) => {
                  if (selectedElement) {
                    handleElementUpdate(selectedElement.id, updates);
                  }
                }}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </DndProvider>
  );
};
