"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Tablet, Plus, Settings, Eye, Grid3x3, Layers, Undo2, Redo2, Save, Download, Upload, Palette, FileText, Share2, Users, History, HelpCircle } from 'lucide-react';
import { COMPONENT_REGISTRY, COMPONENT_CATEGORIES, ComponentDefinition } from './ComponentRegistry';
import { ComponentToolbar } from './ComponentToolbar';
import { StepsPanel } from './StepsPanel';
import { PropertiesPanel } from './PropertiesPanel';
import { DropZoneCanvas } from './DropZoneCanvas';
import Link from 'next/link';
import { 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Copy,
  BarChart3
} from 'lucide-react';

interface CanvasItem {
  id: string;
  type: string;
  props: Record<string, any>;
  position: number;
}

interface Step {
  id: string;
  name: string;
  items: CanvasItem[];
  settings: {
    showLogo: boolean;
    showProgress: boolean;
    allowReturn: boolean;
    isVisible: boolean;
  };
}

interface DragDropEditorProps {
  onSave: (config: any) => void;
  initialBlocks?: any[];
  mode?: 'quiz' | 'result' | 'offer';
  quizId?: string;
}

export const DragDropEditor: React.FC<DragDropEditorProps> = ({ 
  onSave, 
  initialBlocks = [], 
  mode = 'quiz',
  quizId 
}) => {
  // Estados principais
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'step-1',
      name: 'Etapa 1',
      items: [],
      settings: {
        showLogo: true,
        showProgress: true,
        allowReturn: true,
        isVisible: true
      }
    }
  ]);
  
  const [activeStepId, setActiveStepId] = useState('step-1');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [draggedComponent, setDraggedComponent] = useState<ComponentDefinition | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState({
    steps: false,
    components: false,
    properties: false
  });

  // Novos estados para funcionalidades avançadas
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isPublished, setIsPublished] = useState(false);
  const [publishUrl, setPublishUrl] = useState('');

  // Sistema de undo/redo
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Sensores para drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Step ativo e item selecionado
  const activeStep = steps.find(step => step.id === activeStepId);
  const selectedItem = activeStep?.items.find(item => item.id === selectedItemId); // Descomentado e corrigido

  // Salvar estado no histórico
  const saveToHistory = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ steps, activeStepId });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [steps, activeStepId, history, historyIndex]);

  // Undo/Redo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setSteps(previousState.steps);
      setActiveStepId(previousState.activeStepId);
      setHistoryIndex(historyIndex - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setSteps(nextState.steps);
      setActiveStepId(nextState.activeStepId);
      setHistoryIndex(historyIndex + 1);
    }
  }, [history, historyIndex]);

  // Handlers para drag & drop
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === 'component') {
      const component = COMPONENT_REGISTRY.find(c => c.id === active.id);
      setDraggedComponent(component || null);
    }
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setDraggedComponent(null);
      return;
    }

    // Drag de componente para canvas
    if (draggedComponent && active.data.current?.type === 'component' && over.data.current?.type === 'canvas' && activeStep) {
      saveToHistory();
      const newItem: CanvasItem = {
        id: `${draggedComponent.type}-${Date.now()}`,
        type: draggedComponent.type,
        props: { ...draggedComponent.defaultProps },
        position: activeStep.items.length
      };
      setSteps(prev => prev.map(step => 
        step.id === activeStepId 
          ? { ...step, items: [...step.items, newItem] }
          : step
      ));
    }
    // Reordenação de itens no canvas
    else if (active.data.current?.type === 'canvas-item' && over.data.current?.type === 'canvas-item' && activeStep) {
      const activeIndex = activeStep.items.findIndex(item => item.id === active.id);
      const overIndex = activeStep.items.findIndex(item => item.id === over.id);
      if (activeIndex !== -1 && overIndex !== -1) {
        saveToHistory();
        const newItems = arrayMove(activeStep.items, activeIndex, overIndex);
        setSteps(prev => prev.map(step => 
          step.id === activeStepId 
            ? { ...step, items: newItems }
            : step
        ));
      }
    }
    setDraggedComponent(null);
  }, [activeStepId, activeStep, saveToHistory, draggedComponent]);

  // Função para adicionar nova etapa
  const addStep = useCallback((name?: string) => {
    saveToHistory();
    const newStepId = `step-${Date.now()}`;
    const newStep: Step = {
      id: newStepId,
      name: name || `Etapa ${steps.length + 1}`,
      items: [],
      settings: { showLogo: true, showProgress: true, allowReturn: true, isVisible: true }
    };
    setSteps(prev => [...prev, newStep]);
    setActiveStepId(newStepId);
  }, [steps.length, saveToHistory]);

  // Função para atualizar etapa
  const updateStep = useCallback((stepId: string, updates: Partial<Step>) => {
    saveToHistory();
    setSteps(prev => prev.map(step => step.id === stepId ? { ...step, ...updates } : step));
  }, [saveToHistory]);

  // Função para deletar etapa
  const deleteStep = useCallback((stepId: string) => {
    if (steps.length <= 1) return;
    saveToHistory();
    const remainingSteps = steps.filter(step => step.id !== stepId);
    setSteps(remainingSteps);
    if (activeStepId === stepId) {
      setActiveStepId(remainingSteps[0]?.id || 'step-1'); // Fallback para step-1 se não houver mais etapas
    }
  }, [steps, activeStepId, saveToHistory]);

  // Função para duplicar etapa
  const duplicateStep = useCallback((stepId: string) => {
    const stepToDuplicate = steps.find(step => step.id === stepId);
    if (!stepToDuplicate) return;
    saveToHistory();
    const duplicatedStep: Step = {
      ...stepToDuplicate,
      id: `step-${Date.now()}`,
      name: `${stepToDuplicate.name} (Cópia)`,
      items: stepToDuplicate.items.map(item => ({
        ...item,
        id: `${item.type}-${Date.now()}-${Math.random()}`
      }))
    };
    const stepIndex = steps.findIndex(step => step.id === stepId);
    setSteps(prev => [
      ...prev.slice(0, stepIndex + 1),
      duplicatedStep,
      ...prev.slice(stepIndex + 1)
    ]);
  }, [steps, saveToHistory]);

  // Função para atualizar propriedades do item
  const updateItemProps = useCallback((itemId: string, newProps: Record<string, any>) => {
    saveToHistory();
    setSteps(prev => prev.map(step => 
      step.id === activeStepId 
        ? { ...step, items: step.items.map(item => item.id === itemId ? { ...item, props: { ...item.props, ...newProps } } : item) }
        : step
    ));
  }, [activeStepId, saveToHistory]);

  // Função para deletar item
  const deleteItem = useCallback((itemId: string) => {
    saveToHistory();
    setSteps(prev => prev.map(step => 
      step.id === activeStepId 
        ? { ...step, items: step.items.filter(item => item.id !== itemId) }
        : step
    ));
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
    }
  }, [activeStepId, selectedItemId, saveToHistory]);

  // Função para duplicar item
  const duplicateItem = useCallback((itemId: string) => {
    const itemToDuplicate = activeStep?.items.find(item => item.id === itemId);
    if (!itemToDuplicate || !activeStep) return; // Adicionado !activeStep check
    saveToHistory();
    const duplicatedItem: CanvasItem = {
      ...itemToDuplicate,
      id: `${itemToDuplicate.type}-${Date.now()}`,
      position: itemToDuplicate.position + 1 // A lógica de posição pode precisar de ajuste se as posições não forem contínuas
    };
    const itemIndex = activeStep.items.findIndex(item => item.id === itemId);
    const newItems = [
      ...activeStep.items.slice(0, itemIndex + 1),
      duplicatedItem,
      ...activeStep.items.slice(itemIndex + 1)
    ].map((item, index) => ({ ...item, position: index })); // Reajustar posições

    setSteps(prev => prev.map(step => 
      step.id === activeStepId 
        ? { ...step, items: newItems }
        : step
    ));
  }, [activeStep, activeStepId, saveToHistory]);

  // Função para salvar
  const handleSave = useCallback(() => {
    const editorConfig = {
      steps, activeStepId, previewMode,
      timestamp: Date.now(), version: '2.0',
      theme: currentTheme, mode
    };
    onSave(editorConfig);
  }, [steps, activeStepId, previewMode, currentTheme, mode, onSave]);

  // Auto-save a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(handleSave, 30000);
    return () => clearInterval(interval);
  }, [handleSave]);

  // Shortcuts de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
      else if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave]);

  // Adicionar funcionalidade de exportação/importação
  const exportConfig = useCallback(() => {
    const config = { steps, activeStepId, previewMode, timestamp: Date.now(), version: '2.0' };
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `quiz-config-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [steps, activeStepId, previewMode]);

  const importConfig = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        setSteps(config.steps || []);
        setActiveStepId(config.activeStepId || config.steps[0]?.id || 'step-1');
        setPreviewMode(config.previewMode || 'desktop');
        // Resetar histórico após importação
        setHistory([]);
        setHistoryIndex(-1);
        saveToHistory(); // Salvar estado inicial importado
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
        // Adicionar feedback ao usuário aqui, se desejado
      }
    };
    reader.readAsText(file);
  }, [saveToHistory]); // Adicionado saveToHistory como dependência

  // Função para aplicar template
  const applyTemplate = useCallback((template: any) => {
    saveToHistory();
    setSteps(template.steps);
    setActiveStepId(template.steps[0]?.id || 'step-1');
    setShowTemplateLibrary(false);
  }, [saveToHistory]);

  // Função para upload de mídia (placeholder)
  const handleMediaUpload = useCallback((file: File): string => {
    const url = URL.createObjectURL(file);
    // Aqui você integraria com um serviço de storage e retornaria a URL real
    console.log("Media uploaded (simulated):", url, file.name);
    return url; 
  }, []);

  // Função para aplicar tema
  const applyTheme = useCallback((theme: any) => {
    setCurrentTheme(theme.id);
    // A lógica de aplicar cores globais pode ser mais complexa dependendo dos componentes
    setSteps(prev => prev.map(step => ({
      ...step,
      items: step.items.map(item => ({
        ...item,
        props: { ...item.props, color: theme.textColor, backgroundColor: theme.primaryColor } // Exemplo simplificado
      }))
    })));
  }, []);

  // Função para publicar (placeholder)
  const handlePublish = useCallback(() => {
    const config = { steps, activeStepId, previewMode, timestamp: Date.now(), version: '2.0', theme: currentTheme };
    const publishedUrl = `https://quiz.app/published/${Date.now()}`; // Simulação
    setPublishUrl(publishedUrl);
    setIsPublished(true);
    setShowPublishModal(false);
    onSave(config); // Salvar configuração ao publicar
    console.log("Quiz published (simulated):", publishedUrl, config);
  }, [steps, activeStepId, previewMode, currentTheme, onSave]);

  // Templates pré-definidos (removidas propriedades textAlign duplicadas)
  const TEMPLATES = [
    {
      id: 'lead-magnet', name: 'Lead Magnet', category: 'Marketing', preview: '🧲',
      steps: [{
        id: 'step-1', name: 'Captura de Lead', items: [
          { id: 'h-1', type: 'heading', props: { content: 'Descubra Seu Perfil Ideal', level: 1, fontSize: 48, textAlign: 'center' }, position: 0 },
          { id: 't-1', type: 'text', props: { content: 'Responda algumas perguntas e receba um relatório personalizado', fontSize: 18, textAlign: 'center' }, position: 1 },
          { id: 'i-1', type: 'input', props: { label: 'Seu melhor e-mail', type: 'email', placeholder: 'exemplo@email.com' }, position: 2 },
          { id: 'b-1', type: 'button', props: { text: 'Começar Quiz', fullWidth: true }, position: 3 }
        ], settings: { showLogo: true, showProgress: true, allowReturn: false, isVisible: true }
      }]
    },
    {
      id: 'product-recommendation', name: 'Recomendação de Produto', category: 'E-commerce', preview: '🛍️',
      steps: [{
        id: 'step-pr-1', name: 'Descobrir Preferências', items: [
          { id: 'h-pr-1', type: 'heading', props: { content: 'Encontre o Produto Perfeito', level: 1, fontSize: 42, textAlign: 'center' }, position: 0 },
          { id: 'img-pr-1', type: 'image', props: { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400', alt: 'Produtos', width: 600, height: 400 }, position: 1 }
        ], settings: { showLogo: true, showProgress: true, allowReturn: true, isVisible: true }
      }]
    },
    {
      id: 'personality-test', name: 'Teste de Personalidade', category: 'Educação', preview: '🧠',
      steps: [{
        id: 'step-pt-1', name: 'Introdução', items: [
          { id: 'h-pt-1', type: 'heading', props: { content: 'Descubra Sua Personalidade', level: 1, fontSize: 48, textAlign: 'center' }, position: 0 },
          { id: 'testim-pt-1', type: 'testimonial', props: { quote: 'Este teste me ajudou a entender melhor minhas características!', author: 'Ana Costa', role: 'Usuária', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face', rating: 5 }, position: 1 }
        ], settings: { showLogo: true, showProgress: true, allowReturn: true, isVisible: true }
      }]
    }
  ];

  // Temas pré-definidos
  const THEMES = [
    { id: 'default', name: 'Padrão', primaryColor: '#B89B7A', secondaryColor: '#aa6b5d', textColor: '#432818', backgroundColor: '#ffffff', preview: '🎨' },
    { id: 'modern-blue', name: 'Azul Moderno', primaryColor: '#3B82F6', secondaryColor: '#1D4ED8', textColor: '#1F2937', backgroundColor: '#ffffff', preview: '💙' },
    { id: 'vibrant-orange', name: 'Laranja Vibrante', primaryColor: '#F97316', secondaryColor: '#EA580C', textColor: '#1F2937', backgroundColor: '#ffffff', preview: '🧡' },
    { id: 'elegant-purple', name: 'Roxo Elegante', primaryColor: '#8B5CF6', secondaryColor: '#7C3AED', textColor: '#1F2937', backgroundColor: '#ffffff', preview: '💜' },
    { id: 'dark-mode', name: 'Modo Escuro', primaryColor: '#10B981', secondaryColor: '#059669', textColor: '#F9FAFB', backgroundColor: '#111827', preview: '🌙' }
  ];

  // Carregar configuração inicial baseada no modo (placeholder)
  useEffect(() => {
    const loadInitialConfig = async () => {
      if (quizId) {
        // Lógica para carregar quiz existente por ID (ex: fetch da API)
        console.log("Carregando quiz existente (simulado):", quizId, mode);
        // Exemplo: const data = await fetchQuizConfig(quizId); 
        // setSteps(data.steps); setActiveStepId(data.activeStepId); ...
      } else {
        // Lógica para nova configuração baseada no modo
        console.log("Configurando novo editor para o modo:", mode);
        // Exemplo: if (mode === 'result') setSteps(INITIAL_RESULT_STEPS);
      }
    };
    loadInitialConfig();
  }, [quizId, mode]);

  // Templates específicos por modo
  const getTemplatesByMode = () => {
    // Filtrar templates baseados no `mode` se necessário
    // Por enquanto, retorna todos.
    return TEMPLATES;
  };
  
  // Título do modo
  const getModeTitle = () => {
    switch (mode) {
      case 'quiz': return 'Editor de Quiz';
      case 'result': return 'Editor de Página de Resultado';
      case 'offer': return 'Editor de Página de Oferta';
      default: return 'Editor';
    }
  };

  // JSX da UI (conforme fornecido anteriormente, com selectedItem corrigido)
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Header com modo */}
        <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900">{getModeTitle()}</h1>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {mode.toUpperCase()}
                </div>
              </div>
              {quizId && <div className="text-sm text-gray-600">Quiz ID: {quizId}</div>}
            </div>
          </div>
        </div>

        {/* Ajustar margin-top para o header */}
        <div className="flex w-full mt-16"> {/* mt-16 para compensar o header fixo */}
          
          {/* SIDEBAR ESQUERDA - ETAPAS */}
          <div className={`transition-all duration-300 ${sidebarCollapsed.steps ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col`}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed.steps && (
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    {mode === 'quiz' ? 'Etapas' : mode === 'result' ? 'Resultados' : 'Ofertas'}
                  </h2>
                )}
                <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(prev => ({ ...prev, steps: !prev.steps }))}>
                  <Grid3x3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <StepsPanel
              steps={steps}
              activeStepId={activeStepId}
              onStepSelect={setActiveStepId}
              onAddStep={addStep}
              onUpdateStep={updateStep}
              onDeleteStep={deleteStep}
              onDuplicateStep={duplicateStep}
              onReorderSteps={(reorderedSteps) => setSteps(reorderedSteps)} // Assumindo que StepsPanel pode reordenar
              collapsed={sidebarCollapsed.steps}
            />
          </div>

          {/* SIDEBAR ESQUERDA 2 - COMPONENTES */}
          <div className={`transition-all duration-300 ${sidebarCollapsed.components ? 'w-16' : 'w-80'} bg-white border-r border-gray-200 flex flex-col`}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed.components && <h2 className="font-semibold text-gray-900">Componentes</h2>}
                <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(prev => ({ ...prev, components: !prev.components }))}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <ComponentToolbar
              categories={COMPONENT_CATEGORIES}
              components={COMPONENT_REGISTRY}
              collapsed={sidebarCollapsed.components}
            />
          </div>

          {/* ÁREA PRINCIPAL - CANVAS */}
          <div className="flex-1 flex flex-col bg-gray-100"> {/* Adicionado bg-gray-100 para contraste */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}><Undo2 className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}><Redo2 className="w-4 h-4" /></Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Preview:</span>
                  <div className="flex border border-gray-300 rounded-lg">
                    {[{ mode: 'desktop', icon: Monitor, label: 'Desktop' }, { mode: 'tablet', icon: Tablet, label: 'Tablet' }, { mode: 'mobile', icon: Smartphone, label: 'Mobile' }].map(pm => (
                      <Button key={pm.mode} variant={previewMode === pm.mode ? 'default' : 'ghost'} size="sm" onClick={() => setPreviewMode(pm.mode as any)} className="rounded-none first:rounded-l-lg last:rounded-r-lg">
                        <pm.icon className="w-4 h-4 mr-1" /> {pm.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowTemplateLibrary(true)}><FileText className="w-4 h-4 mr-1" />Templates</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowMediaLibrary(true)}>📁 Mídia</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowThemePanel(true)}><Palette className="w-4 h-4 mr-1" />Temas</Button>
                  <Button variant="outline" size="sm" onClick={exportConfig}><Download className="w-4 h-4 mr-1" />Exportar</Button>
                  <input type="file" accept=".json" onChange={(e) => e.target.files?.[0] && importConfig(e.target.files[0])} style={{ display: 'none' }} id="import-config" />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById('import-config')?.click()}><Upload className="w-4 h-4 mr-1" />Importar</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowCollaboration(true)}><Users className="w-4 h-4 mr-1" />Colaborar</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowAnalytics(true)}>📊 Analytics</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowTutorial(true)}><HelpCircle className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm" onClick={() => { /* Lógica de preview em nova aba/modal */ console.log("Preview clicked"); }}><Eye className="w-4 h-4 mr-1" />Preview</Button>
                  <Button onClick={() => setShowPublishModal(true)} size="sm" className={isPublished ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}> {/* Melhoria no estilo do botão Publicar */}
                    <Share2 className="w-4 h-4 mr-1" />{isPublished ? 'Publicado' : 'Publicar'}
                  </Button>
                  <Button onClick={handleSave} size="sm" className="bg-green-500 hover:bg-green-600 text-white"> {/* Melhoria no estilo do botão Salvar */}
                    <Save className="w-4 h-4 mr-1" />Salvar
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <DropZoneCanvas
                items={activeStep?.items || []}
                previewMode={previewMode}
                selectedItemId={selectedItemId}
                onSelectItem={setSelectedItemId}
                onDeleteItem={deleteItem}
                // onDuplicateItem={duplicateItem} // Passar se DropZoneCanvas precisar duplicar
                // onUpdateItem={updateItemProps} // Passar se DropZoneCanvas precisar atualizar
              />
            </div>
          </div>

          {/* SIDEBAR DIREITA - PROPRIEDADES */}
          <div className={`transition-all duration-300 ${sidebarCollapsed.properties ? 'w-16' : 'w-80'} bg-white border-l border-gray-200 flex flex-col`}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed.properties && (
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Settings className="w-5 h-5" /> Propriedades
                  </h2>
                )}
                <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(prev => ({ ...prev, properties: !prev.properties }))}>
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <PropertiesPanel
              selectedItem={selectedItem} // Corrigido
              step={activeStep}
              onUpdateItem={updateItemProps}
              onUpdateStep={(updates) => activeStepId && updateStep(activeStepId, updates)} // Garantir que activeStepId exista
              onDeleteItem={deleteItem}
              onDuplicateItem={duplicateItem}
              collapsed={sidebarCollapsed.properties}
            />
          </div>
        </div>

        <DragOverlay>
          {draggedComponent ? (
            <Card className="p-3 shadow-lg bg-white border-2 border-blue-500 opacity-90">
              <div className="flex items-center gap-2">
                {/* Assumindo que draggedComponent.icon é um componente React */}
                {React.createElement(draggedComponent.icon, { className: "w-5 h-5 text-blue-600" })}
                <span className="font-medium text-blue-900">{draggedComponent.label}</span>
              </div>
            </Card>
          ) : null}
        </DragOverlay>

        {/* Modals e Painéis (conforme fornecido anteriormente) */}
        {showTemplateLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"> {/* Aumentado max-h */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Templates para {getModeTitle()}</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowTemplateLibrary(false)}>✕</Button> {/* Melhoria no botão fechar */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Ajustado grid para responsividade */}
                  {getTemplatesByMode().map((template) => (
                    <Card key={template.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{template.preview}</div>
                        <h3 className="font-semibold mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{template.category}</p>
                      </div>
                      <Button size="sm" className="w-full mt-auto" onClick={() => applyTemplate(template)}>Usar Template</Button>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {showThemePanel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Escolher Tema</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowThemePanel(false)}>✕</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {THEMES.map((theme) => (
                    <Card key={theme.id} className={`p-4 hover:shadow-lg transition-shadow cursor-pointer ${currentTheme === theme.id ? 'ring-2 ring-blue-500' : ''}`} onClick={() => applyTheme(theme)}>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{theme.preview}</div>
                        <div>
                          <h3 className="font-semibold">{theme.name}</h3>
                          <div className="flex gap-1 mt-1">
                            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: theme.primaryColor }}/>
                            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: theme.secondaryColor }}/>
                            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: theme.textColor }}/>
                            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: theme.backgroundColor }}/>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {showPublishModal && (
           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Publicar {getModeTitle()}</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowPublishModal(false)}>✕</Button>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Seu {mode} será {isPublished ? 'atualizado e' : 'publicado e ficará'} disponível publicamente.
                  </p>
                  {publishUrl && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-800 mb-1">Link Público:</p>
                      <input type="text" readOnly value={publishUrl} className="w-full p-2 border rounded-md text-xs bg-white" onClick={(e) => (e.target as HTMLInputElement).select()} />
                    </div>
                  )}
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={() => setShowPublishModal(false)} className="flex-1">Cancelar</Button>
                    <Button onClick={handlePublish} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">{isPublished ? 'Atualizar' : 'Publicar Agora'}</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {showAnalytics && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Analytics do {getModeTitle()}</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowAnalytics(false)}>✕</Button>
                </div>
                {/* Conteúdo do Analytics (placeholder) */}
                <div className="text-center py-10">
                  <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Dados de analytics aparecerão aqui.</p>
                  <p className="text-sm text-gray-500">(Visualizações, Conclusões, Leads, etc.)</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {showTutorial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Tutorial Rápido</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowTutorial(false)}>✕</Button>
                </div>
                {/* Conteúdo do Tutorial (placeholder) */}
                <div className="space-y-4 text-sm text-gray-700">
                  <p>Bem-vindo ao editor! Use os painéis laterais para adicionar componentes e gerenciar etapas. Clique nos itens para ver suas propriedades.</p>
                  <p>Salve seu progresso regularmente e use o modo de preview para ver como seu {mode} ficará.</p>
                </div>
                <div className="mt-6 text-center">
                  <Button onClick={() => setShowTutorial(false)} className="bg-blue-600 hover:bg-blue-700 text-white">Entendi!</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
         {/* Modal para Media Library (Placeholder) */}
        {showMediaLibrary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Biblioteca de Mídia</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowMediaLibrary(false)}>✕</Button>
                </div>
                <div className="text-center py-10">
                  <p className="text-gray-600">A funcionalidade de upload e gerenciamento de mídia aparecerá aqui.</p>
                  <input type="file" multiple onChange={(e) => {
                    if (e.target.files) {
                      for (const file of Array.from(e.target.files)) {
                        handleMediaUpload(file); // Exemplo de uso
                      }
                    }
                  }} />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Modal para Colaboração (Placeholder) */}
        {showCollaboration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Colaboração</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowCollaboration(false)}>✕</Button>
                </div>
                <div className="text-center py-10">
                  <p className="text-gray-600">Recursos de colaboração em tempo real (em breve).</p>
                </div>
              </div>
            </Card>
          </div>
        )}

      </div>
    </DndContext>
  );
};

export default DragDropEditor;