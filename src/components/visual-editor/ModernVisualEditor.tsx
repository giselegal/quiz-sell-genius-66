
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ComponentsPalette } from './sidebar/ComponentsPalette';
import { VisualEditorCanvas } from './canvas/VisualEditorCanvas';
import { StepsPanel } from './panels/StepsPanel';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { VisualElement, VisualStage, BlockType } from '@/types/visualEditor';
import { Button } from '@/components/ui/button';
import { Play, Save, Eye, EyeOff, Monitor, Tablet, Smartphone } from 'lucide-react';

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

// Mock data for demonstration
const mockElements: VisualElement[] = [
  {
    id: 'element-1',
    type: 'headline',
    stageId: 'stage-intro',
    order: 0,
    content: {
      text: 'Descubra Seu Estilo Pessoal',
      level: 'h1'
    },
    style: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      color: '#1a202c'
    },
    visible: true,
    locked: false
  },
  {
    id: 'element-2',
    type: 'text',
    stageId: 'stage-intro',
    order: 1,
    content: {
      text: 'Responda algumas perguntas simples e descubra qual é o seu estilo predominante.'
    },
    style: {
      fontSize: '1.125rem',
      textAlign: 'center' as const,
      color: '#4a5568'
    },
    visible: true,
    locked: false
  },
  {
    id: 'element-3',
    type: 'button',
    stageId: 'stage-intro',
    order: 2,
    content: {
      text: 'Começar Quiz'
    },
    style: {
      backgroundColor: '#3182ce',
      color: '#ffffff',
      padding: '12px 24px',
      textAlign: 'center' as const
    },
    visible: true,
    locked: false
  },
  {
    id: 'element-4',
    type: 'question-title',
    stageId: 'stage-question-1',
    order: 0,
    content: {
      text: 'Qual dessas opções mais combina com você?'
    },
    style: {
      fontSize: '1.875rem',
      fontWeight: 'semibold',
      textAlign: 'center' as const,
      color: '#1a202c'
    },
    visible: true,
    locked: false
  },
  {
    id: 'element-5',
    type: 'question-options',
    stageId: 'stage-question-1',
    order: 1,
    content: {
      options: [
        {
          id: 'opt-1',
          text: 'Gosto de roupas clássicas e atemporais',
          imageUrl: 'https://via.placeholder.com/300x200',
          styleCategory: 'classic',
          points: 10
        },
        {
          id: 'opt-2',
          text: 'Prefiro looks modernos e tendência',
          imageUrl: 'https://via.placeholder.com/300x200',
          styleCategory: 'modern',
          points: 10
        },
        {
          id: 'opt-3',
          text: 'Adoro um estilo mais despojado',
          imageUrl: 'https://via.placeholder.com/300x200',
          styleCategory: 'casual',
          points: 10
        },
        {
          id: 'opt-4',
          text: 'Gosto de ousar com looks únicos',
          imageUrl: 'https://via.placeholder.com/300x200',
          styleCategory: 'bold',
          points: 10
        }
      ],
      multiSelect: false
    },
    style: {
      padding: '20px'
    },
    visible: true,
    locked: false
  }
];

const mockStages: VisualStage[] = [
  {
    id: 'stage-intro',
    title: 'Introdução',
    order: 0,
    type: 'intro',
    settings: {
      showHeader: true,
      showProgress: false,
      allowBack: false,
      backgroundColor: '#ffffff'
    }
  },
  {
    id: 'stage-question-1',
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
    id: 'stage-question-2',
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
    id: 'stage-result',
    title: 'Resultado',
    order: 3,
    type: 'result',
    settings: {
      showHeader: false,
      showProgress: false,
      allowBack: false,
      backgroundColor: '#f7fafc'
    }
  },
  {
    id: 'stage-offer',
    title: 'Oferta',
    order: 4,
    type: 'offer',
    settings: {
      showHeader: false,
      showProgress: false,
      allowBack: true,
      backgroundColor: '#ffffff'
    }
  }
];

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [editorState, setEditorState] = useState({
    elements: mockElements,
    stages: mockStages,
    activeStageId: 'stage-intro',
    selectedElementId: null as string | null,
    isPreviewMode: false,
    viewportMode: 'desktop' as 'desktop' | 'tablet' | 'mobile',
    settings: {
      showGrid: false,
      snapToGrid: true,
      gridSize: 8,
      showRulers: false,
      showBoundingBoxes: false,
      autoSave: true,
      autoSaveInterval: 30000
    }
  });

  // Handlers
  const handleElementAdd = useCallback((type: BlockType, position?: number) => {
    const newId = `element-${Date.now()}`;
    const stageElements = editorState.elements.filter(el => el.stageId === editorState.activeStageId);
    const order = position !== undefined ? position : stageElements.length;

    const getDefaultContent = (elementType: BlockType) => {
      switch (elementType) {
        case 'headline':
          return { text: 'Novo Título', level: 'h2' };
        case 'text':
          return { text: 'Novo texto...' };
        case 'button':
          return { text: 'Clique aqui' };
        case 'image':
          return { src: 'https://via.placeholder.com/400x300', alt: 'Nova imagem' };
        case 'question-title':
          return { text: 'Nova pergunta?' };
        case 'question-options':
          return { 
            options: [
              { id: 'opt-1', text: 'Opção 1', styleCategory: 'default', points: 5 },
              { id: 'opt-2', text: 'Opção 2', styleCategory: 'default', points: 5 }
            ],
            multiSelect: false 
          };
        default:
          return {};
      }
    };

    const getDefaultStyle = (elementType: BlockType) => {
      switch (elementType) {
        case 'headline':
          return { fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center' as const };
        case 'text':
          return { fontSize: '1rem', textAlign: 'left' as const };
        case 'button':
          return { backgroundColor: '#3182ce', color: '#ffffff', padding: '12px 24px', textAlign: 'center' as const };
        default:
          return {};
      }
    };

    const newElement: VisualElement = {
      id: newId,
      type,
      stageId: editorState.activeStageId!,
      order,
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
      visible: true,
      locked: false
    };

    setEditorState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
      selectedElementId: newId
    }));
  }, [editorState.activeStageId, editorState.elements]);

  const handleElementUpdate = useCallback((elementId: string, updates: any) => {
    setEditorState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId 
          ? { ...el, ...updates }
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
      const elements = [...prev.elements];
      const stageElements = elements.filter(el => el.stageId === prev.activeStageId).sort((a, b) => a.order - b.order);
      const elementIndex = stageElements.findIndex(el => el.id === elementId);
      
      if (elementIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? elementIndex - 1 : elementIndex + 1;
      if (newIndex < 0 || newIndex >= stageElements.length) return prev;

      // Swap orders
      const element = stageElements[elementIndex];
      const swapElement = stageElements[newIndex];
      
      const updatedElements = elements.map(el => {
        if (el.id === element.id) return { ...el, order: swapElement.order };
        if (el.id === swapElement.id) return { ...el, order: element.order };
        return el;
      });

      return { ...prev, elements: updatedElements };
    });
  }, []);

  const handleElementSelect = useCallback((elementId: string) => {
    setEditorState(prev => ({ ...prev, selectedElementId: elementId }));
  }, []);

  const handleStageSelect = useCallback((stageId: string) => {
    setEditorState(prev => ({ 
      ...prev, 
      activeStageId: stageId,
      selectedElementId: null 
    }));
  }, []);

  const handleStageAdd = useCallback(() => {
    const newStageId = `stage-${Date.now()}`;
    const newStage: VisualStage = {
      id: newStageId,
      title: 'Nova Etapa',
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
      activeStageId: newStageId
    }));
  }, [editorState.stages.length]);

  const handleViewportChange = useCallback((mode: 'desktop' | 'tablet' | 'mobile') => {
    setEditorState(prev => ({ ...prev, viewportMode: mode }));
  }, []);

  const handlePreviewToggle = useCallback(() => {
    setEditorState(prev => ({ ...prev, isPreviewMode: !prev.isPreviewMode }));
  }, []);

  const handleSave = useCallback(() => {
    const saveData = {
      funnelId,
      stages: editorState.stages,
      elements: editorState.elements,
      settings: editorState.settings,
      lastModified: new Date().toISOString()
    };

    if (onSave) {
      onSave(saveData);
    }

    // Auto-save to localStorage
    localStorage.setItem(`editor-${funnelId}`, JSON.stringify(saveData));
    
    console.log('Editor saved:', saveData);
  }, [funnelId, editorState, onSave]);

  // Get current stage data for configuration panel
  const currentStage = editorState.stages.find(stage => stage.id === editorState.activeStageId);
  const selectedElement = editorState.elements.find(el => el.id === editorState.selectedElementId);

  // Check if the current stage is a question stage and get question data
  const getQuestionData = () => {
    if (!currentStage || !currentStage.type.includes('quiz')) return null;
    
    const stageElements = editorState.elements.filter(el => el.stageId === editorState.activeStageId);
    const questionTitle = stageElements.find(el => el.type === 'question-title');
    const questionOptions = stageElements.find(el => el.type === 'question-options');
    
    return {
      id: currentStage.id,
      title: questionTitle?.content.text || '',
      type: 'multiple-choice',
      multiSelect: questionOptions?.content.multiSelect || false,
      options: questionOptions?.content.options || []
    };
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">Editor Visual</h1>
            <div className="text-sm text-gray-500">
              Funil: {funnelId}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Viewport Controls */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={editorState.viewportMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewportChange('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={editorState.viewportMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewportChange('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={editorState.viewportMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewportChange('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview Toggle */}
            <Button
              variant={editorState.isPreviewMode ? 'default' : 'outline'}
              size="sm"
              onClick={handlePreviewToggle}
            >
              {editorState.isPreviewMode ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Sair da Prévia
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Prévia
                </>
              )}
            </Button>

            {/* Save Button */}
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>

            {/* Test Button */}
            <Button variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Testar
            </Button>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Components Palette */}
          {!editorState.isPreviewMode && (
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
              <ComponentsPalette onElementAdd={handleElementAdd} />
            </div>
          )}

          {/* Steps Panel */}
          {!editorState.isPreviewMode && (
            <div className="w-64 bg-white border-r border-gray-200">
              <StepsPanel
                stages={editorState.stages}
                activeStageId={editorState.activeStageId}
                onStageSelect={handleStageSelect}
                onStageAdd={handleStageAdd}
              />
            </div>
          )}

          {/* Main Canvas */}
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

          {/* Right Sidebar - Configuration Panel */}
          {!editorState.isPreviewMode && currentStage && (
            <div className="w-80 bg-white border-l border-gray-200">
              <StageConfigurationPanel
                stageName={currentStage.title}
                stageType={currentStage.type}
                questionData={getQuestionData()}
              />
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};
