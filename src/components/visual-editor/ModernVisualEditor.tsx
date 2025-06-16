
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { StepsPanel } from './steps/StepsPanel';
import { ComponentsPalette } from './sidebar/ComponentsPalette';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { OptionConfigurationPanel } from './panels/OptionConfigurationPanel';
import { EditableCanvas } from './canvas/EditableCanvas';
import { 
  Eye, 
  Save, 
  Monitor, 
  Tablet, 
  Smartphone
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  type: 'intro' | 'quiz' | 'transition' | 'result' | 'offer';
}

interface CanvasElement {
  id: string;
  type: 'headline' | 'text' | 'image' | 'form' | 'button';
  content: any;
  order: number;
}

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [currentStage, setCurrentStage] = useState<string>('intro');
  const [stages] = useState<Stage[]>([
    { id: 'intro', name: 'Intro', type: 'intro' },
    { id: 'quiz', name: 'Quiz', type: 'quiz' },
    { id: 'transition', name: 'Transição', type: 'transition' },
    { id: 'result', name: 'Resultado', type: 'result' },
    { id: 'offer', name: 'Oferta', type: 'offer' },
  ]);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showOptionConfig, setShowOptionConfig] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  
  // Canvas elements state
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([
    {
      id: '1',
      type: 'headline',
      content: { text: 'Teste de Estilo Pessoal', level: 1 },
      order: 0
    },
    {
      id: '2',
      type: 'image',
      content: {
        src: 'https://cakto-quiz-br01.b-cdn.net/uploads/ecbe689b-1c0a-4071-98d3-4d391b6dd98f.png',
        alt: 'Imagem do quiz',
        width: 640,
        height: 480
      },
      order: 1
    },
    {
      id: '3',
      type: 'form',
      content: {
        label: 'NOME',
        placeholder: 'Digite seu nome aqui...',
        required: true,
        type: 'text'
      },
      order: 2
    },
    {
      id: '4',
      type: 'button',
      content: { text: 'Continuar' },
      order: 3
    }
  ]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const handleSave = useCallback(() => {
    const data = {
      stages,
      currentStage,
      canvasElements,
      settings: {
        viewportMode,
        isPreviewMode
      }
    };
    console.log('Saving:', data);
    onSave?.(data);
  }, [stages, currentStage, canvasElements, viewportMode, isPreviewMode, onSave]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSave();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [handleSave]);

  const handleStageSelect = (stageId: string) => {
    setCurrentStage(stageId);
    setSelectedElementId(null);
  };

  const handleComponentSelect = (componentType: string) => {
    setSelectedComponent(componentType);
    handleElementAdd(componentType);
  };

  const handleElementAdd = (type: string, position?: number) => {
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: type as any,
      content: getDefaultContent(type),
      order: position ?? canvasElements.length
    };

    setCanvasElements(prev => [...prev, newElement]);
    setSelectedElementId(newElement.id);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'headline':
        return { text: 'Novo Título', level: 1 };
      case 'text':
        return { text: 'Novo texto', size: 'base', align: 'left' };
      case 'image':
        return { 
          src: 'https://via.placeholder.com/400x200',
          alt: 'Nova imagem',
          width: 400,
          height: 200
        };
      case 'form':
        return {
          label: 'Novo Campo',
          placeholder: 'Digite aqui...',
          required: false,
          type: 'text'
        };
      case 'button':
        return { text: 'Novo Botão' };
      default:
        return {};
    }
  };

  const handleElementUpdate = (id: string, content: any) => {
    setCanvasElements(prev =>
      prev.map(el => el.id === id ? { ...el, content } : el)
    );
  };

  const handleElementDelete = (id: string) => {
    setCanvasElements(prev => prev.filter(el => el.id !== id));
    if (selectedElementId === id) {
      setSelectedElementId(null);
    }
  };

  const handleElementReorder = (draggedId: string, targetId: string) => {
    const draggedIndex = canvasElements.findIndex(el => el.id === draggedId);
    const targetIndex = canvasElements.findIndex(el => el.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newElements = [...canvasElements];
    const [draggedElement] = newElements.splice(draggedIndex, 1);
    newElements.splice(targetIndex, 0, draggedElement);

    // Update order values
    const updatedElements = newElements.map((el, index) => ({
      ...el,
      order: index
    }));

    setCanvasElements(updatedElements);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Editor Visual Moderno</h1>
            <Badge variant="outline" className="border-blue-500 text-blue-700">
              {funnelId}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Viewport Controls */}
            <div className="flex items-center border rounded-lg">
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
                className="rounded-none border-x"
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

            {/* Preview Toggle */}
            <Button
              variant={isPreviewMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {isPreviewMode ? 'Edição' : 'Preview'}
            </Button>

            {/* Save Button */}
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Resizable 4 Columns Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Column - Steps Panel */}
          <ResizablePanel defaultSize={15} minSize={10} maxSize={25}>
            <div className="h-full bg-white border-r border-gray-200">
              <StepsPanel
                stages={stages}
                currentStage={currentStage}
                onStageSelect={handleStageSelect}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Second Column - Components Palette */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-gray-50 border-r border-gray-200">
              <ComponentsPalette
                onComponentSelect={handleComponentSelect}
                selectedComponent={selectedComponent}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Third Column - Editor Canvas */}
          <ResizablePanel defaultSize={45} minSize={30}>
            <div className="h-full overflow-auto bg-gray-100 p-6">
              <div className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden ${
                viewportMode === 'desktop' ? 'max-w-6xl' :
                viewportMode === 'tablet' ? 'max-w-2xl' :
                'max-w-sm'
              }`}>
                <EditableCanvas
                  elements={canvasElements}
                  selectedElementId={selectedElementId}
                  isPreviewMode={isPreviewMode}
                  onElementSelect={setSelectedElementId}
                  onElementUpdate={handleElementUpdate}
                  onElementAdd={handleElementAdd}
                  onElementReorder={handleElementReorder}
                  onElementDelete={handleElementDelete}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Fourth Column - Configuration Panel */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-white border-l border-gray-200">
              <div className="h-full overflow-auto">
                <StageConfigurationPanel
                  stageName={stages.find(s => s.id === currentStage)?.name || ''}
                  stageType={currentStage}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Option Configuration Modal */}
      {showOptionConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <OptionConfigurationPanel
            isOpen={showOptionConfig}
            onClose={() => setShowOptionConfig(false)}
            optionId={selectedOptionId || ''}
            onConfigUpdate={(config) => {
              console.log('Configuração atualizada:', config);
            }}
          />
        </div>
      )}
    </div>
  );
};
