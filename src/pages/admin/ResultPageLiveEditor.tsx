import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Eye, 
  EyeOff, 
  Save, 
  ArrowLeft,
  Type, 
  Image, 
  Star, 
  Gift, 
  Shield, 
  Clock, 
  Target, 
  Zap,
  Plus,
  Settings,
  GripVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { useBlockOperations } from '@/hooks/editor/useBlockOperations';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { StyleResult } from '@/types/quiz';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Tipos de componentes disponíveis para arrastar
interface ComponentBlock {
  id: string;
  type: 'headline' | 'text' | 'image' | 'benefits' | 'pricing' | 'guarantee' | 'cta' | 'style-result';
  name: string;
  icon: React.ReactNode;
  description: string;
  category: 'content' | 'marketing' | 'design';
}

const componentBlocks: ComponentBlock[] = [
  {
    id: 'headline',
    type: 'headline',
    name: 'Título & Subtítulo',
    icon: <Type className="h-4 w-4" />,
    description: 'Títulos principais e subtítulos',
    category: 'content'
  },
  {
    id: 'text',
    type: 'text',
    name: 'Texto',
    icon: <Type className="h-4 w-4" />,
    description: 'Parágrafos e texto corrido',
    category: 'content'
  },
  {
    id: 'image',
    type: 'image',
    name: 'Imagem',
    icon: <Image className="h-4 w-4" />,
    description: 'Imagens e galerias',
    category: 'content'
  },
  {
    id: 'benefits',
    type: 'benefits',
    name: 'Lista de Benefícios',
    icon: <Star className="h-4 w-4" />,
    description: 'Lista de vantagens e benefícios',
    category: 'marketing'
  },
  {
    id: 'pricing',
    type: 'pricing',
    name: 'Preço',
    icon: <Target className="h-4 w-4" />,
    description: 'Seção de preços e ofertas',
    category: 'marketing'
  },
  {
    id: 'cta',
    type: 'cta',
    name: 'Botão de Ação',
    icon: <Zap className="h-4 w-4" />,
    description: 'Botões de call-to-action',
    category: 'marketing'
  },
  {
    id: 'guarantee',
    type: 'guarantee',
    name: 'Garantia',
    icon: <Shield className="h-4 w-4" />,
    description: 'Selo e texto de garantia',
    category: 'marketing'
  },
  {
    id: 'style-result',
    type: 'style-result',
    name: 'Resultado do Estilo',
    icon: <Gift className="h-4 w-4" />,
    description: 'Exibe o resultado do quiz',
    category: 'design'
  }
];

// Mock do estilo selecionado - normalmente viria do contexto/props
const mockPrimaryStyle: StyleResult = {
  category: 'Elegante',
  score: 85,
  percentage: 85
};

// Draggable Component Block Interface
interface DraggableComponentBlockProps {
  component: ComponentBlock;
  onAdd: (type: ComponentBlock['type']) => void;
}

const DraggableComponentBlock: React.FC<DraggableComponentBlockProps> = ({ component, onAdd }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: component.id,
    data: {
      type: 'component',
      component,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "p-3 rounded-lg border border-gray-200 cursor-grab transition-all duration-200",
        "hover:border-[#B89B7A] hover:bg-[#FAF9F7] hover:shadow-sm",
        "group",
        isDragging && "opacity-50 cursor-grabbing"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#FAF9F7] rounded-md group-hover:bg-[#B89B7A] group-hover:text-white transition-colors">
          {component.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-[#432818] truncate">
            {component.name}
          </div>
          <div className="text-xs text-[#8F7A6A] leading-relaxed">
            {component.description}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <GripVertical className="h-3 w-3 text-[#8F7A6A] group-hover:text-[#B89B7A] transition-colors flex-shrink-0" />
          <Plus 
            className="h-3 w-3 text-[#8F7A6A] group-hover:text-[#B89B7A] transition-colors flex-shrink-0 cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              onAdd(component.type);
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Sortable Block Item for the preview area
interface SortableBlockItemProps {
  blockId: string;
  index: number;
  isSelected: boolean;
  onSelect: (blockId: string) => void;
  onDelete: (blockId: string) => void;
  children: React.ReactNode;
}

const SortableBlockItem: React.FC<SortableBlockItemProps> = ({
  blockId,
  index,
  isSelected,
  onSelect,
  onDelete,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: blockId,
    data: {
      type: 'block',
      blockId,
      index,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative group border-2 border-transparent rounded-lg transition-all duration-200",
        isSelected && "border-[#B89B7A] shadow-sm",
        isDragging && "opacity-50",
        "hover:border-[#B89B7A]/50"
      )}
      onClick={() => onSelect(blockId)}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className={cn(
          "absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-white border border-gray-200 rounded p-1 cursor-grab hover:bg-gray-50",
          isDragging && "cursor-grabbing"
        )}
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(blockId);
        }}
        className={cn(
          "absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity",
          "bg-red-500 hover:bg-red-600 text-white rounded p-1 text-xs"
        )}
      >
        ✕
      </button>

      {children}
    </div>
  );
}

const ResultPageLiveEditor: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'content' | 'marketing' | 'design'>('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const { toast } = useToast();

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Use o hook existente do ResultPageEditor
  const {
    resultPageConfig,
    loading,
    actions: {
      handleSave,
      handleReset,
      togglePreview,
      updateSection
    }
  } = useResultPageEditor(mockPrimaryStyle.category);

  const {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    updateBlocks,
    actions: blockActions
  } = useBlockOperations();

  // Sync blocks with config when needed
  useEffect(() => {
    if (resultPageConfig?.blocks) {
      updateBlocks(resultPageConfig.blocks);
    } else {
      updateSection('blocks', []);
    }
  }, [resultPageConfig, updateBlocks, updateSection]);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Handle component drop to preview area
    if (active.data.current?.type === 'component' && over.data.current?.type === 'drop-zone') {
      const component = active.data.current.component as ComponentBlock;
      handleAddComponent(component.type);
      return;
    }

    // Handle block reordering within preview
    if (active.data.current?.type === 'block' && over.data.current?.type === 'block') {
      const activeIndex = blocks.findIndex(block => block.id === active.id);
      const overIndex = blocks.findIndex(block => block.id === over.id);

      if (activeIndex !== overIndex) {
        const newBlocks = arrayMove(blocks, activeIndex, overIndex).map((block, index) => ({
          ...block,
          order: index
        }));
        
        updateBlocks(newBlocks);
        updateSection('blocks', newBlocks);
      }
    }
  };

  const handleAddComponent = (type: ComponentBlock['type']) => {
    const newBlockId = blockActions.handleAddBlock(type);
    setSelectedBlockId(newBlockId);
    setSelectedComponentId(newBlockId);
    
    toast({
      title: "Componente adicionado",
      description: `${componentBlocks.find(c => c.type === type)?.name} foi adicionado à página`,
      duration: 2000
    });
  };

  const handleBlockSelect = (blockId: string | null) => {
    setSelectedBlockId(blockId);
    setSelectedComponentId(blockId);
  };

  const handleSaveChanges = async () => {
    try {
      await handleSave();
      toast({
        title: "✅ Página salva com sucesso!",
        description: "Todas as alterações foram salvas.",
        duration: 3000
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  const filteredComponents = componentBlocks.filter(component => 
    selectedCategory === 'all' || component.category === selectedCategory
  );

  const getDeviceClass = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'max-w-md';
      case 'tablet':
        return 'max-w-2xl';
      default:
        return 'max-w-none';
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
          <p className="text-[#8F7A6A]">Carregando editor...</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen bg-[#FAF9F7] flex flex-col">
        {/* Header Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-lg font-semibold text-[#432818]">Editor Visual da Página de Resultado</h1>
              <p className="text-sm text-[#8F7A6A]">Crie uma experiência visual incrível para seus usuários</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Device Preview Controls */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('desktop')}
                className="h-8 px-3"
              >
                <Monitor className="h-3 w-3" />
              </Button>
              <Button
                variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('tablet')}
                className="h-8 px-3"
              >
                <Tablet className="h-3 w-3" />
              </Button>
              <Button
                variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('mobile')}
                className="h-8 px-3"
              >
                <Smartphone className="h-3 w-3" />
              </Button>
            </div>

            {/* Preview Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsPreviewing(!isPreviewing);
                togglePreview();
              }}
              className="flex items-center gap-2"
            >
              {isPreviewing ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {isPreviewing ? 'Editar' : 'Visualizar'}
            </Button>

            {/* Save Button */}
            <Button
              onClick={handleSaveChanges}
              size="sm"
              className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>

        {/* Main Editor Layout */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Sidebar - Components */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <div className="h-full bg-white border-r border-gray-200 flex flex-col">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-[#432818] mb-3">Componentes</h3>
                  
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant={selectedCategory === 'all' ? 'default' : 'outline'}
                      className="cursor-pointer text-xs"
                      onClick={() => setSelectedCategory('all')}
                    >
                      Todos
                    </Badge>
                    <Badge
                      variant={selectedCategory === 'content' ? 'default' : 'outline'}
                      className="cursor-pointer text-xs"
                      onClick={() => setSelectedCategory('content')}
                    >
                      Conteúdo
                    </Badge>
                    <Badge
                      variant={selectedCategory === 'marketing' ? 'default' : 'outline'}
                      className="cursor-pointer text-xs"
                      onClick={() => setSelectedCategory('marketing')}
                    >
                      Marketing
                    </Badge>
                    <Badge
                      variant={selectedCategory === 'design' ? 'default' : 'outline'}
                      className="cursor-pointer text-xs"
                      onClick={() => setSelectedCategory('design')}
                    >
                      Design
                    </Badge>
                  </div>
                </div>

                {/* Components List */}
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-2">
                    <SortableContext items={filteredComponents.map(c => c.id)} strategy={verticalListSortingStrategy}>
                      {filteredComponents.map((component) => (
                        <DraggableComponentBlock
                          key={component.id}
                          component={component}
                          onAdd={handleAddComponent}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Center Panel - Preview */}
            <ResizablePanel defaultSize={55}>
              <div className="h-full flex flex-col bg-[#f8f9fa]">
                {/* Preview Header */}
                <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-[#432818]">Preview</h3>
                    <Badge variant="outline" className="text-xs">
                      {previewDevice === 'desktop' && 'Desktop'}
                      {previewDevice === 'tablet' && 'Tablet'}
                      {previewDevice === 'mobile' && 'Mobile'}
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-[#8F7A6A]">
                    {blocks.length} {blocks.length === 1 ? 'componente' : 'componentes'}
                  </div>
                </div>

                {/* Preview Content */}
                <div className="flex-1 overflow-auto p-6 flex justify-center">
                  <div className={cn(
                    "w-full bg-white rounded-lg shadow-sm border border-gray-200 min-h-full transition-all duration-300",
                    getDeviceClass()
                  )}>
                    <ResultPageVisualEditor
                      selectedStyle={mockPrimaryStyle}
                      initialConfig={resultPageConfig}
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Panel - Properties */}
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <div className="h-full bg-white border-l border-gray-200 flex flex-col">
                {/* Properties Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[#432818]">Propriedades</h3>
                    {selectedComponentId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedComponentId(null);
                          setSelectedBlockId(null);
                        }}
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                </div>

                {/* Properties Content */}
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    {selectedComponentId ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-[#FAF9F7] rounded-lg">
                          <Settings className="h-4 w-4 text-[#B89B7A]" />
                          <div>
                            <div className="font-medium text-sm text-[#432818]">
                              Componente Selecionado
                            </div>
                            <div className="text-xs text-[#8F7A6A]">
                              {componentBlocks.find(c => c.id === selectedComponentId)?.name || 'Componente'}
                            </div>
                          </div>
                        </div>
                        
                        {/* O painel de propriedades específico será renderizado pelo ResultPageVisualEditor */}
                        <div className="text-sm text-[#8F7A6A]">
                          As propriedades deste componente aparecerão aqui quando implementadas.
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Settings className="h-8 w-8 mx-auto mb-3 text-[#8F7A6A] opacity-50" />
                        <p className="text-sm text-[#8F7A6A] mb-1">Nenhum componente selecionado</p>
                        <p className="text-xs text-[#8F7A6A]">
                          Clique em um componente no preview para editar suas propriedades
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeId ? (
          <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 opacity-90">
            {(() => {
              const component = componentBlocks.find(c => c.id === activeId);
              return component ? (
                <div className="flex items-center gap-2">
                  {component.icon}
                  <span className="text-sm font-medium">{component.name}</span>
                </div>
              ) : (
                <div className="text-sm">Arrastando componente...</div>
              );
            })()}
          </div>
};

export default ResultPageLiveEditor;
