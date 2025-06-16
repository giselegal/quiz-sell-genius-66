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

const mockStages = [
  {
    id: 'intro-1',
    title: 'Introdução',
    order: 0,
    type: 'intro' as const,
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
    type: 'quiz' as const,
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
    type: 'quiz' as const,
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
    type: 'strategic' as const,
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
    type: 'result' as const,
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
    type: 'offer' as const,
    settings: {
      showHeader: false,
      showProgress: false,
      allowBack: false,
      backgroundColor: '#ffffff'
    }
  }
];

const mockElements = [
  {
    id: 'element-1',
    type: 'headline' as const,
    stageId: 'intro-1',
    order: 0,
    content: { text: 'Bem-vindo ao Quiz', level: '1' },
    style: { fontSize: '2rem', textAlign: 'center' as const, color: '#000000' },
    visible: true,
    locked: false
  },
  {
    id: 'element-2',
    type: 'text' as const,
    stageId: 'intro-1',
    order: 1,
    content: { text: 'Descubra seu estilo pessoal em apenas alguns minutos!' },
    style: { fontSize: '1.2rem', textAlign: 'center' as const, color: '#666666' },
    visible: true,
    locked: false
  },
  {
    id: 'element-3',
    type: 'button' as const,
    stageId: 'intro-1',
    order: 2,
    content: { text: 'Começar Quiz' },
    style: { backgroundColor: '#3b82f6', color: '#ffffff', padding: '12px 24px' },
    visible: true,
    locked: false
  }
];

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({ 
  funnelId, 
  onSave 
}) => {
  const [editorState, setEditorState] = useState({
    elements: mockElements,
    stages: mockStages,
    activeStageId: mockStages[0]?.id || null,
    history: [],
    historyIndex: -1,
    selectedElementId: null,
    hoveredElementId: null,
    viewport: 'desktop' as const,
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

  const [selectedPanel, setSelectedPanel] = useState<string>('stages');

  const handleElementSelect = useCallback((elementId: string | null) => {
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

  const handleElementAdd = useCallback((type: string, position?: number) => {
    if (!editorState.activeStageId) return;
    
    const newElement = {
      id: `element-${Date.now()}`,
      type: type as any,
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
    const newStage = {
      id: `stage-${Date.now()}`,
      title: `Nova Etapa ${editorState.stages.length + 1}`,
      order: editorState.stages.length,
      type: 'quiz' as const,
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
        {/* Top Toolbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Editor Visual
            </h1>
            
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
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreviewToggle}>
              {editorState.isPreviewMode ? <Code className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {editorState.isPreviewMode ? 'Editar' : 'Preview'}
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
            <ResizablePanel defaultSize={250} minSize={200} maxSize={400}>
              <div className="h-full bg-white border-r border-gray-200">
                <div className="h-12 border-b border-gray-200 flex">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-full rounded-none flex-1 ${selectedPanel === 'stages' ? 'bg-gray-100' : ''}`}
                    onClick={() => setSelectedPanel('stages')}
                  >
                    Etapas
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-full rounded-none flex-1 ${selectedPanel === 'components' ? 'bg-gray-100' : ''}`}
                    onClick={() => setSelectedPanel('components')}
                  >
                    Componentes
                  </Button>
                </div>
                
                <ScrollArea className="h-[calc(100%-48px)]">
                  {selectedPanel === 'stages' ? (
                    <StepsPanel
                      stages={editorState.stages}
                      currentStage={editorState.activeStageId || ''}
                      onStageSelect={handleStageSelect}
                    />
                  ) : (
                    <ComponentsPalette
                      onComponentSelect={handleElementAdd}
                      selectedComponent={null}
                    />
                  )}
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Canvas Area */}
            <ResizablePanel defaultSize={400}>
              <div className="h-full bg-gray-100 overflow-hidden">
                <VisualEditorCanvas
                  elements={stageElements as any}
                  selectedElementId={editorState.selectedElementId}
                  isPreviewMode={editorState.isPreviewMode}
                  viewport={editorState.viewport}
                  onElementSelect={handleElementSelect}
                  onElementUpdate={handleElementUpdate}
                  onElementDelete={handleElementDelete}
                  onElementMove={handleElementMove}
                  onElementAdd={handleElementAdd}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Right Sidebar */}
            <ResizablePanel defaultSize={300} minSize={250} maxSize={400}>
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
