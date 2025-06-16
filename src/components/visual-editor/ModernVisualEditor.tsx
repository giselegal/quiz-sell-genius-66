
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Save, 
  Play, 
  Settings,
  Plus,
  Eye,
  Code
} from 'lucide-react';
import { VisualEditorCanvas } from './canvas/VisualEditorCanvas';
import { StepsPanel } from './steps/StepsPanel';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { ComponentsPalette } from './palette/ComponentsPalette';
import { VisualElement, VisualStage, BlockType, VisualEditorState } from '@/types/visualEditor';

export interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

// Mock data para demonstração
const mockStages: VisualStage[] = [
  {
    id: 'intro-1',
    title: 'Introdução',
    order: 0,
    type: 'intro',
    settings: {
      showHeader: true,
      showProgress: true,
      allowBack: false,
      backgroundColor: '#ffffff'
    }
  },
  {
    id: 'question-1',
    title: 'Questão 1',
    order: 1,
    type: 'quiz',
    settings: {
      showHeader: true,
      showProgress: true,
      allowBack: true,
      backgroundColor: '#ffffff'
    }
  },
  {
    id: 'question-2',
    title: 'Questão 2',
    order: 2,
    type: 'quiz',
    settings: {
      showHeader: true,
      showProgress: true,
      allowBack: true,
      backgroundColor: '#ffffff'
    }
  },
  {
    id: 'strategic-1',
    title: 'Questão Estratégica',
    order: 3,
    type: 'strategic',
    settings: {
      showHeader: true,
      showProgress: true,
      allowBack: true,
      backgroundColor: '#ffffff'
    }
  },
  {
    id: 'result-1',
    title: 'Resultado',
    order: 4,
    type: 'result',
    settings: {
      showHeader: true,
      showProgress: false,
      allowBack: false,
      backgroundColor: '#ffffff'
    }
  },
  {
    id: 'offer-1',
    title: 'Oferta',
    order: 5,
    type: 'offer',
    settings: {
      showHeader: false,
      showProgress: false,
      allowBack: false,
      backgroundColor: '#ffffff'
    }
  }
];

const mockElements: VisualElement[] = [
  {
    id: 'element-1',
    type: 'headline',
    stageId: 'intro-1',
    order: 0,
    content: { text: 'Bem-vindo ao Quiz', level: '1' },
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

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [editorState, setEditorState] = useState<VisualEditorState>({
    elements: mockElements,
    stages: mockStages,
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

  const [selectedPanel, setSelectedPanel] = useState<'components' | 'stages' | 'config'>('stages');

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

  const handleElementAdd = useCallback((type: BlockType, position?: number) => {
    if (!editorState.activeStageId) return;
    
    const newElement: VisualElement = {
      id: `element-${Date.now()}`,
      type,
      stageId: editorState.activeStageId,
      order: position ?? editorState.elements.filter(el => el.stageId === editorState.activeStageId).length,
      content: {},
      style: {},
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
        {/* Header Toolbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">Editor Visual</h1>
            
            {/* Viewport Controls */}
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
              {editorState.isPreviewMode ? 'Editar' : 'Visualizar'}
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* Left Sidebar */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <div className="h-full bg-white border-r border-gray-200">
                {/* Sidebar Tabs */}
                <div className="border-b border-gray-200 p-2">
                  <div className="flex gap-1">
                    <Button
                      variant={selectedPanel === 'stages' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPanel('stages')}
                      className="flex-1"
                    >
                      Etapas
                    </Button>
                    <Button
                      variant={selectedPanel === 'components' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPanel('components')}
                      className="flex-1"
                    >
                      Componentes
                    </Button>
                  </div>
                </div>

                {/* Sidebar Content */}
                <ScrollArea className="h-[calc(100vh-120px)]">
                  {selectedPanel === 'stages' && (
                    <StepsPanel
                      stages={editorState.stages.map(stage => ({
                        id: stage.id,
                        name: stage.title,
                        type: stage.type
                      }))}
                      currentStage={editorState.activeStageId || ''}
                      onStageSelect={handleStageSelect}
                    />
                  )}
                  
                  {selectedPanel === 'components' && (
                    <ComponentsPalette onComponentAdd={handleElementAdd} />
                  )}
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Main Canvas */}
            <ResizablePanel defaultSize={60}>
              <VisualEditorCanvas
                elements={editorState.elements}
                stages={editorState.stages}
                activeStageId={editorState.activeStageId}
                selectedElementId={editorState.selectedElementId}
                isPreviewMode={editorState.isPreviewMode}
                viewportMode={editorState.viewport}
                onElementSelect={handleElementSelect}
                onElementUpdate={handleElementUpdate}
                onElementDelete={handleElementDelete}
                onElementMove={handleElementMove}
                onElementAdd={handleElementAdd}
                onStageAdd={handleStageAdd}
                onStageSelect={handleStageSelect}
              />
            </ResizablePanel>

            <ResizableHandle />

            {/* Right Sidebar */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <div className="h-full bg-white border-l border-gray-200">
                <StageConfigurationPanel
                  stageName={activeStage?.title || 'Sem etapa selecionada'}
                  stageType={activeStage?.type || 'unknown'}
                  questionData={selectedElement?.content}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </DndProvider>
  );
};
