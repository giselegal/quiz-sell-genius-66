import React, { useState, useCallback, useMemo } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable-panels';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Play, 
  Save, 
  Undo, 
  Redo, 
  Eye, 
  EyeOff,
  Plus,
  Monitor,
  Tablet,
  Smartphone,
  Settings,
  Palette,
  Type,
  Image as ImageIcon,
  Square,
  MousePointer,
  FormInput,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

import { VerticalCanvasItem } from './canvas/VerticalCanvasItem';
import { StepsPanel } from './steps/StepsPanel';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { VisualElement, VisualStage, VisualEditorState, BlockType } from '@/types/visualEditor';

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

const mockElements: VisualElement[] = [
  {
    id: '1',
    type: 'headline',
    stageId: '1',
    order: 1,
    content: {
      text: 'Título da Página',
    },
    style: {},
    visible: true,
    locked: false,
  },
  {
    id: '2',
    type: 'text',
    stageId: '1',
    order: 2,
    content: {
      text: 'Texto de apresentação da página.',
    },
    style: {},
    visible: true,
    locked: false,
  },
  {
    id: '3',
    type: 'image',
    stageId: '1',
    order: 3,
    content: {
      src: 'https://images.unsplash.com/photo-1682685797497-f296491f8c69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60',
      alt: 'Imagem ilustrativa',
    },
    style: {},
    visible: true,
    locked: false,
  },
  {
    id: '4',
    type: 'button',
    stageId: '1',
    order: 4,
    content: {
      text: 'Avançar',
    },
    style: {},
    visible: true,
    locked: false,
  },
];

const mockStages: VisualStage[] = [
  {
    id: '1',
    title: 'Página Inicial',
    order: 1,
    type: 'intro',
    settings: {
      showHeader: false,
      showProgress: false,
      allowBack: false,
    },
  },
  {
    id: '2',
    title: 'Quiz 1',
    order: 2,
    type: 'quiz',
    settings: {
      showHeader: true,
      showProgress: true,
      allowBack: true,
    },
  },
  {
    id: '3',
    title: 'Resultado',
    order: 3,
    type: 'result',
    settings: {
      showHeader: true,
      showProgress: false,
      allowBack: false,
    },
  },
];

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [canvasElements, setCanvasElements] = useState<VisualElement[]>(mockElements);
  const [mockStages, setMockStages] = useState<VisualStage[]>(mockStages);
  const [activeStageId, setActiveStageId] = useState<string | null>(mockStages[0].id);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const viewportClass = useMemo(() => {
    switch (viewport) {
      case 'tablet':
        return 'max-w-3xl';
      case 'mobile':
        return 'max-w-sm';
      default:
        return 'max-w-5xl';
    }
  }, [viewport]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setCanvasElements((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const handleElementUpdate = (elementId: string, updates: Partial<VisualElement>) => {
    setCanvasElements(elements =>
      elements.map(element =>
        element.id === elementId ? { ...element, ...updates } : element
      )
    );
  };

  const handleElementDelete = (elementId: string) => {
    setCanvasElements(elements =>
      elements.filter(element => element.id !== elementId)
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">Editor Visual</h1>
            <Badge variant="secondary">Funnel ID: {funnelId}</Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsPreviewMode(!isPreviewMode)}>
              {isPreviewMode ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Voltar para Editar
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </>
              )}
            </Button>
            <Button size="sm" onClick={() => onSave?.(canvasElements)}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Steps Panel */}
          <ResizablePanel defaultSize={15} minSize={12} maxSize={25}>
            <div className="h-full border-r border-gray-200 bg-white">
              <StepsPanel 
                stages={mockStages}
                currentStage={activeStageId || ''}
                onStageSelect={setActiveStageId}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Main Editor Area */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="h-full flex flex-col bg-white">
              {/* Viewport Controls */}
              <div className="bg-gray-100 border-b border-gray-200 p-2">
                <div className="container mx-auto flex items-center justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setViewport('desktop')}
                    active={viewport === 'desktop'}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setViewport('tablet')}
                    active={viewport === 'tablet'}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setViewport('mobile')}
                    active={viewport === 'mobile'}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Canvas Area */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className={`p-6 ${viewportClass}`}>
                    <div className="mx-auto bg-white shadow-lg rounded-lg min-h-screen">
                      <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={canvasElements.map(el => el.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-4 p-6">
                            {canvasElements.map((element) => (
                              <VerticalCanvasItem
                                key={element.id}
                                element={element}
                                isSelected={selectedElementId === element.id}
                                isPreviewMode={isPreviewMode}
                                onSelect={() => setSelectedElementId(element.id)}
                                onUpdate={(content) => handleElementUpdate(element.id, { content })}
                                onDelete={() => handleElementDelete(element.id)}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Properties Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <div className="h-full border-l border-gray-200 bg-white">
              <Tabs defaultValue="content" className="h-full flex flex-col">
                <TabsList className="shrink-0 border-b">
                  <TabsTrigger value="content">Conteúdo</TabsTrigger>
                  <TabsTrigger value="style">Estilo</TabsTrigger>
                  <TabsTrigger value="settings">Ajustes</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="h-full p-4">
                  <Card className="w-full space-y-3">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <Type className="mr-2 h-4 w-4" />
                          Texto
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Edite o texto do elemento selecionado.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="w-full space-y-3">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Imagem
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure a imagem do elemento selecionado.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="w-full space-y-3">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <FormInput className="mr-2 h-4 w-4" />
                          Formulário
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure os campos do formulário.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="w-full space-y-3">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Opções
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure as opções do elemento.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="style" className="h-full p-4">
                  <Card className="w-full space-y-3">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <Palette className="mr-2 h-4 w-4" />
                          Cores
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Altere as cores do elemento selecionado.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="w-full space-y-3">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <Type className="mr-2 h-4 w-4" />
                          Tipografia
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Altere a tipografia do elemento selecionado.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="w-full space-y-3">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <Square className="mr-2 h-4 w-4" />
                          Tamanho
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Altere o tamanho do elemento selecionado.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings" className="h-full p-4">
                  <Card className="w-full space-y-3">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <MousePointer className="mr-2 h-4 w-4" />
                          Interatividade
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure a interatividade do elemento selecionado.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="w-full space-y-3">
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center">
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Visibilidade
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure a visibilidade do elemento selecionado.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
