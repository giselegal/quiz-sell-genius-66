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
  GripVertical,
  Undo,
  Redo,
  RotateCcw,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { useBlockOperations } from '@/hooks/editor/useBlockOperations';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { StyleResult } from '@/types/quiz';
import { Block } from '@/types/editor';
import { PropertyEditorRouter } from '@/components/live-editor/property-editors';
import { BlockRenderer } from '@/components/live-editor/preview/BlockRenderer';
import { ProjectManager } from '@/components/live-editor/ProjectManager';
import { EditorTutorial, useEditorTutorial } from '@/components/live-editor/EditorTutorial';
import { ShortcutsPanel } from '@/components/live-editor/ShortcutsPanel';
import { useEditorPersistence } from '@/hooks/editor/useEditorPersistence';
import { useUndoRedo } from '@/hooks/editor/useUndoRedo';
import { useKeyboardShortcuts } from '@/hooks/editor/useKeyboardShortcuts';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
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

// Drop Zone Component for the preview area
interface DropZoneProps {
  onDrop: (componentType: ComponentBlock['type']) => void;
  isOver: boolean;
  children?: React.ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop, isOver, children }) => {
  const { setNodeRef } = useDroppable({
    id: 'preview-drop-zone',
    data: {
      type: 'drop-zone',
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-full transition-all duration-200 relative",
        isOver && "bg-[#B89B7A]/5"
      )}
    >
      {/* Drop indicator overlay */}
      {isOver && (
        <div className="absolute inset-0 border-2 border-dashed border-[#D4B996] bg-[#D4B996]/10 rounded-lg z-10 flex items-center justify-center animate-pulse">
          <div className="bg-white px-6 py-3 rounded-lg shadow-xl border-2 border-[#D4B996] transform scale-105">
            <div className="flex items-center gap-3 text-[#D4B996]">
              <div className="p-2 bg-[#D4B996]/10 rounded-full">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm font-semibold">Solte aqui para adicionar</span>
                <p className="text-xs text-[#8F7A6A] mt-1">O componente será inserido na posição ideal</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};

const ResultPageLiveEditor: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'content' | 'marketing' | 'design'>('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOverDropZone, setIsOverDropZone] = useState(false);
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

  // Editor persistence for save/load functionality
  const {
    states,
    currentState,
    hasUnsavedChanges,
    isAutoSaveEnabled,
    saveState,
    loadState,
    deleteState,
    duplicateState,
    exportState,
    importState,
    markAsChanged,
    setIsAutoSaveEnabled,
  } = useEditorPersistence(blocks);

  // Undo/Redo functionality
  const {
    canUndo,
    canRedo,
    pushState,
    undo,
    redo,
    clearHistory,
    updateInitialBlocks,
    getHistoryInfo,
  } = useUndoRedo(blocks);

  // Tutorial functionality
  const {
    hasSeenTutorial,
    isTutorialOpen,
    showTutorial,
    completeTutorial,
    resetTutorial,
    closeTutorial,
  } = useEditorTutorial();

  // Undo/Redo handlers
  const handleUndo = () => {
    const previousBlocks = undo();
    if (previousBlocks) {
      updateBlocks(previousBlocks);
      updateSection('blocks', previousBlocks);
    }
  };

  const handleRedo = () => {
    const nextBlocks = redo();
    if (nextBlocks) {
      updateBlocks(nextBlocks);
      updateSection('blocks', nextBlocks);
    }
  };

  // Keyboard shortcuts
  const { shortcuts } = useKeyboardShortcuts({
    onUndo: handleUndo,
    onRedo: handleRedo,
    onSave: () => {
      if (currentState) {
        handleSaveProject(currentState.name, currentState.id);
      } else {
        handleSaveChanges();
      }
    },
    onDelete: () => {
      if (selectedBlockId) {
        handleDeleteBlock(selectedBlockId);
      }
    },
    onEscape: () => {
      setSelectedBlockId(null);
      setSelectedComponentId(null);
    },
    isEnabled: !isTutorialOpen, // Disable shortcuts when tutorial is open
  });

  // Sync blocks with config when needed
  useEffect(() => {
    if (resultPageConfig?.blocks) {
      updateBlocks(resultPageConfig.blocks);
    } else {
      updateSection('blocks', []);
    }
  }, [resultPageConfig, updateBlocks, updateSection]);

  // Auto-save functionality
  useEffect(() => {
    if (!currentState || !isAutoSaveEnabled || !hasUnsavedChanges) {
      return;
    }

    const autoSaveTimer = setTimeout(() => {
      handleSaveProject(currentState.name, currentState.id);
      toast({
        title: "Auto-salvamento",
        description: "Projeto salvo automaticamente",
        duration: 1500
      });
    }, 30000); // Auto-save after 30 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [blocks, currentState, isAutoSaveEnabled, hasUnsavedChanges]);

  // Monitor blocks changes for undo/redo and persistence
  useEffect(() => {
    if (blocks.length > 0) {
      markAsChanged();
    }
  }, [blocks]);

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setIsOverDropZone(false);

    if (!over) return;

    // Handle component drop to preview area
    if (active.data.current?.type === 'component' && 
        (over.data.current?.type === 'drop-zone' || over.id === 'preview-drop-zone')) {
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
        
        // Add to undo/redo history
        pushState(newBlocks, 'Reordenar blocos');
        markAsChanged();
      }
    }
  };

  const handleAddComponent = (type: ComponentBlock['type']) => {
    const newBlockId = blockActions.handleAddBlock(type);
    setSelectedBlockId(newBlockId);
    setSelectedComponentId(newBlockId);
    
    // Add to undo/redo history
    const componentName = componentBlocks.find(c => c.type === type)?.name;
    pushState(blocks, `Adicionar ${componentName}`);
    markAsChanged();
    
    toast({
      title: "Componente adicionado",
      description: `${componentName} foi adicionado à página`,
      duration: 2000
    });
  };

  const handleBlockSelect = (blockId: string | null) => {
    setSelectedBlockId(blockId);
    setSelectedComponentId(blockId);
  };

  const handleUpdateBlock = (blockId: string, content: any) => {
    const updatedBlocks = blocks.map(block => 
      block.id === blockId 
        ? { ...block, content }
        : block
    );
    updateBlocks(updatedBlocks);
    updateSection('blocks', updatedBlocks);
    
    // Add to undo/redo history
    const block = blocks.find(b => b.id === blockId);
    const blockType = block?.type || 'componente';
    pushState(updatedBlocks, `Editar ${blockType}`);
    markAsChanged();
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

  // Project management handlers
  const handleSaveProject = (name: string, stateId?: string) => {
    const savedState = saveState(name, blocks, stateId);
    if (savedState && !stateId) {
      // New save - update undo/redo history
      clearHistory(blocks);
    }
  };

  const handleLoadProject = (stateId: string) => {
    const loadedState = loadState(stateId);
    if (loadedState) {
      updateBlocks(loadedState.blocks);
      updateSection('blocks', loadedState.blocks);
      updateInitialBlocks(loadedState.blocks);
      setSelectedBlockId(null);
      setSelectedComponentId(null);
    }
  };

  const handleDeleteProject = (stateId: string) => {
    deleteState(stateId);
  };

  const handleDuplicateProject = (stateId: string) => {
    duplicateState(stateId);
  };

  const handleExportProject = (stateId: string) => {
    exportState(stateId);
  };

  const handleImportProject = async (file: File) => {
    const importedState = await importState(file);
    if (importedState) {
      updateBlocks(importedState.blocks);
      updateSection('blocks', importedState.blocks);
      updateInitialBlocks(importedState.blocks);
    }
  };

  // Delete block with undo/redo support
  const handleDeleteBlock = (blockId: string) => {
    const blockToDelete = blocks.find(b => b.id === blockId);
    const blockName = blockToDelete ? componentBlocks.find(c => c.type === blockToDelete.type)?.name : 'componente';
    
    blockActions.handleDeleteBlock(blockId);
    
    // Add to undo/redo history
    pushState(blocks.filter(b => b.id !== blockId), `Deletar ${blockName}`);
    markAsChanged();
    
    // Clear selection if deleted block was selected
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
      setSelectedComponentId(null);
    }
    
    toast({
      title: "Componente removido",
      description: `${blockName} foi removido da página`,
      duration: 2000
    });
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
      onDragOver={(event) => {
        const { over } = event;
        setIsOverDropZone(over?.id === 'preview-drop-zone' || over?.data.current?.type === 'drop-zone');
      }}
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
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-[#432818]">Editor Visual da Página de Resultado</h1>
                {currentState && (
                  <>
                    <span className="text-[#8F7A6A]">•</span>
                    <span className="text-sm font-medium text-[#D4B996]">
                      {currentState.name}
                    </span>
                    {hasUnsavedChanges && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                        Modificado
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className="text-sm text-[#8F7A6A]">
                Crie uma experiência visual incrível para seus usuários
                {currentState && (
                  <span className="ml-2">• {blocks.length} componente{blocks.length !== 1 ? 's' : ''}</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Project Management */}
            <ProjectManager
              states={states}
              currentState={currentState}
              onSave={handleSaveProject}
              onLoad={handleLoadProject}
              onDelete={handleDeleteProject}
              onDuplicate={handleDuplicateProject}
              onExport={handleExportProject}
              onImport={handleImportProject}
              hasUnsavedChanges={hasUnsavedChanges}
            />

            <Separator orientation="vertical" className="h-6" />

            {/* Undo/Redo Controls */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleUndo}
                disabled={!canUndo}
                title={`Desfazer${canUndo ? ` (${getHistoryInfo().undoAction})` : ''}`}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRedo}
                disabled={!canRedo}
                title={`Refazer${canRedo ? ` (${getHistoryInfo().redoAction})` : ''}`}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

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

            <Separator orientation="vertical" className="h-6" />

            {/* Help Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={showTutorial}
              title="Mostrar tutorial"
              className="flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="text-xs">Ajuda</span>
            </Button>

            {/* Shortcuts Panel */}
            <ShortcutsPanel shortcuts={shortcuts} />

            <Separator orientation="vertical" className="h-6" />

            {/* Auto-save Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoSaveEnabled(!isAutoSaveEnabled)}
              className={cn(
                "flex items-center gap-2",
                isAutoSaveEnabled && "text-green-600"
              )}
              title={`Auto-salvamento ${isAutoSaveEnabled ? 'ativado' : 'desativado'}`}
            >
              <div className={cn(
                "w-2 h-2 rounded-full",
                isAutoSaveEnabled ? "bg-green-500" : "bg-gray-300"
              )}></div>
              <span className="text-xs">Auto</span>
            </Button>

            {/* Auto-save Status & Save Button */}
            <div className="flex items-center gap-2">
              {isAutoSaveEnabled && hasUnsavedChanges && (
                <div className="flex items-center gap-1 text-xs text-[#8F7A6A]">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span>Auto-salvamento em 30s</span>
                </div>
              )}
              {!hasUnsavedChanges && currentState && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Salvo</span>
                </div>
              )}
              
              <Button
                onClick={handleSaveChanges}
                size="sm"
                variant={hasUnsavedChanges ? "default" : "outline"}
                className={hasUnsavedChanges ? "bg-[#B89B7A] hover:bg-[#8F7A6A] text-white animate-pulse" : ""}
              >
                <Save className="h-4 w-4 mr-2" />
                {hasUnsavedChanges ? 'Salvar*' : 'Salvar'}
              </Button>
            </div>
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
                    <DropZone
                      onDrop={handleAddComponent}
                      isOver={isOverDropZone}
                    >
                      <div className="min-h-full relative">
                        {/* Empty state when no blocks */}
                        {blocks.length === 0 && !isPreviewing && (
                          <div className="h-64 flex flex-col items-center justify-center text-[#8F7A6A] border-2 border-dashed border-[#B89B7A]/40 rounded-lg m-4">
                            <div className="text-center">
                              <Type className="h-12 w-12 mx-auto mb-4 text-[#B89B7A]/50" />
                              <p className="text-lg font-medium mb-2">Arraste componentes para esta área</p>
                              <p className="text-sm opacity-75">
                                Ou use o botão "+" nos componentes da barra lateral
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {/* Blocks preview with sortable functionality */}
                        {blocks.length > 0 && (
                          <div className="p-4">
                            <SortableContext
                              items={blocks.map(block => block.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              <div className="space-y-4">
                                {blocks.map((block, index) => (
                                  <SortableBlockItem
                                    key={block.id}
                                    blockId={block.id}
                                    index={index}
                                    isSelected={selectedBlockId === block.id}
                                    onSelect={handleBlockSelect}
                                    onDelete={handleDeleteBlock}
                                  >
                                    <div className="p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-lg hover:bg-[#FAF9F7]/80 transition-colors">
                                      <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-white rounded border border-[#B89B7A]/20">
                                          {componentBlocks.find(c => c.type === block.type)?.icon}
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-[#432818]">
                                            {componentBlocks.find(c => c.type === block.type)?.name || block.type}
                                          </div>
                                          <div className="text-xs text-[#8F7A6A]">
                                            {componentBlocks.find(c => c.type === block.type)?.description}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="bg-white p-3 rounded border border-[#B89B7A]/10">
                                        <BlockRenderer
                                          block={block}
                                          isSelected={selectedBlockId === block.id}
                                          onClick={() => handleBlockSelect(block.id)}
                                        />
                                      </div>
                                    </div>
                                  </SortableBlockItem>
                                ))}
                              </div>
                            </SortableContext>
                          </div>
                        )}
                        
                        {/* ResultPageVisualEditor integration */}
                        <div className={cn(
                          "transition-opacity duration-200",
                          blocks.length > 0 ? "mt-4 border-t border-[#B89B7A]/20" : ""
                        )}>
                          <ResultPageVisualEditor
                            selectedStyle={mockPrimaryStyle}
                            initialConfig={resultPageConfig}
                          />
                        </div>
                      </div>
                    </DropZone>
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
                        
                        {/* Property Editor Router */}
                        <PropertyEditorRouter
                          selectedBlock={blocks.find(block => block.id === selectedComponentId) || null}
                          onUpdateBlock={handleUpdateBlock}
                        />
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
          <div className="bg-white p-4 rounded-lg shadow-2xl border-2 border-[#D4B996] opacity-95 transform rotate-3 scale-105">
            {(() => {
              const component = componentBlocks.find(c => c.id === activeId);
              return component ? (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#D4B996]/10 rounded border border-[#D4B996]/20">
                    {component.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#432818]">{component.name}</div>
                    <div className="text-xs text-[#8F7A6A]">{component.description}</div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-[#432818]">Arrastando componente...</div>
              );
            })()}
          </div>
        ) : null}
      </DragOverlay>

      {/* Tutorial Component */}
      <EditorTutorial
        isOpen={isTutorialOpen}
        onClose={closeTutorial}
        onComplete={completeTutorial}
      />
    </DndContext>
  );
};

export default ResultPageLiveEditor;
