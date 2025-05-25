import React, { useState, useCallback } from 'react';
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

  // Step ativo
  const activeStep = steps.find(step => step.id === activeStepId);
  const selectedItem = activeStep?.items.find(item => item.id === selectedItemId);

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
    if (active.data.current?.type === 'component' && over.data.current?.type === 'canvas') {
      const component = COMPONENT_REGISTRY.find(c => c.id === active.id);
      if (component && activeStep) {
        saveToHistory();
        
        const newItem: CanvasItem = {
          id: `${component.type}-${Date.now()}`,
          type: component.type,
          props: { ...component.defaultProps },
          position: activeStep.items.length
        };

        setSteps(prev => prev.map(step => 
          step.id === activeStepId 
            ? { ...step, items: [...step.items, newItem] }
            : step
        ));
      }
    }

    // Reordenação de itens no canvas
    if (active.data.current?.type === 'canvas-item' && over.data.current?.type === 'canvas-item') {
      const activeIndex = activeStep?.items.findIndex(item => item.id === active.id) ?? -1;
      const overIndex = activeStep?.items.findIndex(item => item.id === over.id) ?? -1;
      
      if (activeIndex !== -1 && overIndex !== -1 && activeStep) {
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
  }, [activeStepId, activeStep, saveToHistory]);

  // Função para adicionar nova etapa
  const addStep = useCallback((name?: string) => {
    saveToHistory();
    const newStep: Step = {
      id: `step-${Date.now()}`,
      name: name || `Etapa ${steps.length + 1}`,
      items: [],
      settings: {
        showLogo: true,
        showProgress: true,
        allowReturn: true,
        isVisible: true
      }
    };
    setSteps(prev => [...prev, newStep]);
    setActiveStepId(newStep.id);
  }, [steps.length, saveToHistory]);

  // Função para atualizar etapa
  const updateStep = useCallback((stepId: string, updates: Partial<Step>) => {
    saveToHistory();
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  }, [saveToHistory]);

  // Função para deletar etapa
  const deleteStep = useCallback((stepId: string) => {
    if (steps.length <= 1) return;
    
    saveToHistory();
    setSteps(prev => prev.filter(step => step.id !== stepId));
    
    if (activeStepId === stepId) {
      setActiveStepId(steps[0].id);
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
        ? {
            ...step, 
            items: step.items.map(item => 
              item.id === itemId 
                ? { ...item, props: { ...item.props, ...newProps } }
                : item
            )
          }
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
    if (!itemToDuplicate) return;
    
    saveToHistory();
    const duplicatedItem: CanvasItem = {
      ...itemToDuplicate,
      id: `${itemToDuplicate.type}-${Date.now()}`,
      position: itemToDuplicate.position + 1
    };
    
    setSteps(prev => prev.map(step => 
      step.id === activeStepId 
        ? { 
            ...step, 
            items: [
              ...step.items.slice(0, itemToDuplicate.position + 1),
              duplicatedItem,
              ...step.items.slice(itemToDuplicate.position + 1)
            ]
          }
        : step
    ));
  }, [activeStep, activeStepId, saveToHistory]);

  // Função para salvar
  const handleSave = useCallback(() => {
    const editorConfig = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0',
      theme: currentTheme,
      mode
    };
    onSave(editorConfig);
  }, [steps, activeStepId, previewMode, currentTheme, mode, onSave]);

  // Carregar configuração inicial baseada no modo
  React.useEffect(() => {
    const loadInitialConfig = async () => {
      if (quizId) {
        try {
          const response = await fetch(`/api/quiz/${quizId}/config?mode=${mode}`);
          const data = await response.json();
          
          if (data.success && data.config) {
            setSteps(data.config.steps || []);
            setActiveStepId(data.config.activeStepId || data.config.steps[0]?.id);
            setPreviewMode(data.config.previewMode || 'desktop');
            setCurrentTheme(data.config.theme || 'default');
          }
        } catch (error) {
          console.error('Erro ao carregar configuração:', error);
        }
      }
    };

    loadInitialConfig();
  }, [quizId, mode]);

  // Auto-save a cada 30 segundos com debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (steps.length > 0) {
        handleSave();
      }
    }, 30000);

    return () => clearTimeout(timeoutId);
  }, [steps, handleSave]);

  // Shortcuts de teclado
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave]);

  // Adicionar funcionalidade de exportação/importação
  const exportConfig = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0'
    };
    
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
        setActiveStepId(config.activeStepId || config.steps[0]?.id);
        setPreviewMode(config.previewMode || 'desktop');
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
      }
    };
    reader.readAsText(file);
  }, []);

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

  // Função para aplicar template
  const applyTemplate = useCallback((template: any) => {
    saveToHistory();
    setSteps(template.steps);
    setActiveStepId(template.steps[0]?.id);
    setShowTemplateLibrary(false);
  }, [saveToHistory]);

  // Função para upload de mídia
  const handleMediaUpload = useCallback((file: File) => {
    // Simular upload - na prática integraria com serviço de storage
    const url = URL.createObjectURL(file);
    return url;
  }, []);

  // Função para aplicar tema
  const applyTheme = useCallback((theme: any) => {
    setCurrentTheme(theme.id);
    // Aplicar cores globais a todos os componentes
    setSteps(prev => prev.map(step => ({
      ...step,
      items: step.items.map(item => ({
        ...item,
        props: {
          ...item.props,
          color: theme.textColor,
          backgroundColor: theme.primaryColor
        }
      }))
    })));
  }, []);

  // Função para publicar
  const handlePublish = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0',
      theme: currentTheme
    };
    
    // Simular publicação - na prática enviaria para API
    const publishedUrl = `https://quiz.app/published/${Date.now()}`;
    setPublishUrl(publishedUrl);
    setIsPublished(true);
    setShowPublishModal(false);
    
    onSave(config);
  }, [steps, activeStepId, previewMode, currentTheme, onSave]);

  // Templates pré-definidos
  const TEMPLATES = [
    {
      id: 'lead-magnet',
      name: 'Lead Magnet',
      category: 'Marketing',
      preview: '🧲',
      steps: [
        {
          id: 'step-1',
          name: 'Captura de Lead',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Seu Perfil Ideal',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'text-1',
              type: 'text',
              props: {
                content: 'Responda algumas perguntas e receba um relatório personalizado',
                fontSize: 18,
                textAlign: 'center'
              },
              position: 1
            },
            {
              id: 'input-1',
              type: 'input',
              props: {
                label: 'Seu melhor e-mail',
                type: 'email',
                placeholder: 'exemplo@email.com'
              },
              position: 2
            },
            {
              id: 'button-1',
              type: 'button',
              props: {
                text: 'Começar Quiz',
                fullWidth: true
              },
              position: 3
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: false,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'product-recommendation',
      name: 'Recomendação de Produto',
      category: 'E-commerce',
      preview: '🛍️',
      steps: [
        {
          id: 'step-1',
          name: 'Descobrir Preferências',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Encontre o Produto Perfeito',
                level: 1,
                fontSize: 42,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'image-1',
              type: 'image',
              props: {
                src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400',
                alt: 'Produtos',
                width: 600,
                height: 400
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'personality-test',
      name: 'Teste de Personalidade',
      category: 'Educação',
      preview: '🧠',
      steps: [
        {
          id: 'step-1',
          name: 'Introdução',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Sua Personalidade',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'testimonial-1',
              type: 'testimonial',
              props: {
                quote: 'Este teste me ajudou a entender melhor minhas características!',
                author: 'Ana Costa',
                role: 'Usuária',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face',
                rating: 5
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    }
  ];

  // Temas pré-definidos
  const THEMES = [
    {
      id: 'default',
      name: 'Padrão',
      primaryColor: '#B89B7A',
      secondaryColor: '#aa6b5d',
      textColor: '#432818',
      backgroundColor: '#ffffff',
      preview: '🎨'
    },
    {
      id: 'modern-blue',
      name: 'Azul Moderno',
      primaryColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💙'
    },
    {
      id: 'vibrant-orange',
      name: 'Laranja Vibrante',
      primaryColor: '#F97316',
      secondaryColor: '#EA580C',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '🧡'
    },
    {
      id: 'elegant-purple',
      name: 'Roxo Elegante',
      primaryColor: '#8B5CF6',
      secondaryColor: '#7C3AED',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💜'
    },
    {
      id: 'dark-mode',
      name: 'Modo Escuro',
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      textColor: '#F9FAFB',
      backgroundColor: '#111827',
      preview: '🌙'
    }
  ];

  // Carregar configuração inicial baseada no modo
  React.useEffect(() => {
    const loadInitialConfig = async () => {
      if (quizId) {
        try {
          const response = await fetch(`/api/quiz/${quizId}/config?mode=${mode}`);
          const data = await response.json();
          
          if (data.success && data.config) {
            setSteps(data.config.steps || []);
            setActiveStepId(data.config.activeStepId || data.config.steps[0]?.id);
            setPreviewMode(data.config.previewMode || 'desktop');
            setCurrentTheme(data.config.theme || 'default');
          }
        } catch (error) {
          console.error('Erro ao carregar configuração:', error);
        }
      }
    };

    loadInitialConfig();
  }, [quizId, mode]);

  // Auto-save a cada 30 segundos com debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (steps.length > 0) {
        handleSave();
      }
    }, 30000);

    return () => clearTimeout(timeoutId);
  }, [steps, handleSave]);

  // Shortcuts de teclado
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave]);

  // Adicionar funcionalidade de exportação/importação
  const exportConfig = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0'
    };
    
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
        setActiveStepId(config.activeStepId || config.steps[0]?.id);
        setPreviewMode(config.previewMode || 'desktop');
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
      }
    };
    reader.readAsText(file);
  }, []);

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

  // Função para aplicar template
  const applyTemplate = useCallback((template: any) => {
    saveToHistory();
    setSteps(template.steps);
    setActiveStepId(template.steps[0]?.id);
    setShowTemplateLibrary(false);
  }, [saveToHistory]);

  // Função para upload de mídia
  const handleMediaUpload = useCallback((file: File) => {
    // Simular upload - na prática integraria com serviço de storage
    const url = URL.createObjectURL(file);
    return url;
  }, []);

  // Função para aplicar tema
  const applyTheme = useCallback((theme: any) => {
    setCurrentTheme(theme.id);
    // Aplicar cores globais a todos os componentes
    setSteps(prev => prev.map(step => ({
      ...step,
      items: step.items.map(item => ({
        ...item,
        props: {
          ...item.props,
          color: theme.textColor,
          backgroundColor: theme.primaryColor
        }
      }))
    })));
  }, []);

  // Função para publicar
  const handlePublish = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0',
      theme: currentTheme
    };
    
    // Simular publicação - na prática enviaria para API
    const publishedUrl = `https://quiz.app/published/${Date.now()}`;
    setPublishUrl(publishedUrl);
    setIsPublished(true);
    setShowPublishModal(false);
    
    onSave(config);
  }, [steps, activeStepId, previewMode, currentTheme, onSave]);

  // Templates pré-definidos
  const TEMPLATES = [
    {
      id: 'lead-magnet',
      name: 'Lead Magnet',
      category: 'Marketing',
      preview: '🧲',
      steps: [
        {
          id: 'step-1',
          name: 'Captura de Lead',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Seu Perfil Ideal',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'text-1',
              type: 'text',
              props: {
                content: 'Responda algumas perguntas e receba um relatório personalizado',
                fontSize: 18,
                textAlign: 'center'
              },
              position: 1
            },
            {
              id: 'input-1',
              type: 'input',
              props: {
                label: 'Seu melhor e-mail',
                type: 'email',
                placeholder: 'exemplo@email.com'
              },
              position: 2
            },
            {
              id: 'button-1',
              type: 'button',
              props: {
                text: 'Começar Quiz',
                fullWidth: true
              },
              position: 3
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: false,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'product-recommendation',
      name: 'Recomendação de Produto',
      category: 'E-commerce',
      preview: '🛍️',
      steps: [
        {
          id: 'step-1',
          name: 'Descobrir Preferências',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Encontre o Produto Perfeito',
                level: 1,
                fontSize: 42,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'image-1',
              type: 'image',
              props: {
                src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400',
                alt: 'Produtos',
                width: 600,
                height: 400
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'personality-test',
      name: 'Teste de Personalidade',
      category: 'Educação',
      preview: '🧠',
      steps: [
        {
          id: 'step-1',
          name: 'Introdução',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Sua Personalidade',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'testimonial-1',
              type: 'testimonial',
              props: {
                quote: 'Este teste me ajudou a entender melhor minhas características!',
                author: 'Ana Costa',
                role: 'Usuária',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face',
                rating: 5
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    }
  ];

  // Temas pré-definidos
  const THEMES = [
    {
      id: 'default',
      name: 'Padrão',
      primaryColor: '#B89B7A',
      secondaryColor: '#aa6b5d',
      textColor: '#432818',
      backgroundColor: '#ffffff',
      preview: '🎨'
    },
    {
      id: 'modern-blue',
      name: 'Azul Moderno',
      primaryColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💙'
    },
    {
      id: 'vibrant-orange',
      name: 'Laranja Vibrante',
      primaryColor: '#F97316',
      secondaryColor: '#EA580C',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '🧡'
    },
    {
      id: 'elegant-purple',
      name: 'Roxo Elegante',
      primaryColor: '#8B5CF6',
      secondaryColor: '#7C3AED',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💜'
    },
    {
      id: 'dark-mode',
      name: 'Modo Escuro',
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      textColor: '#F9FAFB',
      backgroundColor: '#111827',
      preview: '🌙'
    }
  ];

  // Carregar configuração inicial baseada no modo
  React.useEffect(() => {
    const loadInitialConfig = async () => {
      if (quizId) {
        try {
          const response = await fetch(`/api/quiz/${quizId}/config?mode=${mode}`);
          const data = await response.json();
          
          if (data.success && data.config) {
            setSteps(data.config.steps || []);
            setActiveStepId(data.config.activeStepId || data.config.steps[0]?.id);
            setPreviewMode(data.config.previewMode || 'desktop');
            setCurrentTheme(data.config.theme || 'default');
          }
        } catch (error) {
          console.error('Erro ao carregar configuração:', error);
        }
      }
    };

    loadInitialConfig();
  }, [quizId, mode]);

  // Auto-save a cada 30 segundos com debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (steps.length > 0) {
        handleSave();
      }
    }, 30000);

    return () => clearTimeout(timeoutId);
  }, [steps, handleSave]);

  // Shortcuts de teclado
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave]);

  // Adicionar funcionalidade de exportação/importação
  const exportConfig = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0'
    };
    
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
        setActiveStepId(config.activeStepId || config.steps[0]?.id);
        setPreviewMode(config.previewMode || 'desktop');
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
      }
    };
    reader.readAsText(file);
  }, []);

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

  // Função para aplicar template
  const applyTemplate = useCallback((template: any) => {
    saveToHistory();
    setSteps(template.steps);
    setActiveStepId(template.steps[0]?.id);
    setShowTemplateLibrary(false);
  }, [saveToHistory]);

  // Função para upload de mídia
  const handleMediaUpload = useCallback((file: File) => {
    // Simular upload - na prática integraria com serviço de storage
    const url = URL.createObjectURL(file);
    return url;
  }, []);

  // Função para aplicar tema
  const applyTheme = useCallback((theme: any) => {
    setCurrentTheme(theme.id);
    // Aplicar cores globais a todos os componentes
    setSteps(prev => prev.map(step => ({
      ...step,
      items: step.items.map(item => ({
        ...item,
        props: {
          ...item.props,
          color: theme.textColor,
          backgroundColor: theme.primaryColor
        }
      }))
    })));
  }, []);

  // Função para publicar
  const handlePublish = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0',
      theme: currentTheme
    };
    
    // Simular publicação - na prática enviaria para API
    const publishedUrl = `https://quiz.app/published/${Date.now()}`;
    setPublishUrl(publishedUrl);
    setIsPublished(true);
    setShowPublishModal(false);
    
    onSave(config);
  }, [steps, activeStepId, previewMode, currentTheme, onSave]);

  // Templates pré-definidos
  const TEMPLATES = [
    {
      id: 'lead-magnet',
      name: 'Lead Magnet',
      category: 'Marketing',
      preview: '🧲',
      steps: [
        {
          id: 'step-1',
          name: 'Captura de Lead',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Seu Perfil Ideal',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'text-1',
              type: 'text',
              props: {
                content: 'Responda algumas perguntas e receba um relatório personalizado',
                fontSize: 18,
                textAlign: 'center'
              },
              position: 1
            },
            {
              id: 'input-1',
              type: 'input',
              props: {
                label: 'Seu melhor e-mail',
                type: 'email',
                placeholder: 'exemplo@email.com'
              },
              position: 2
            },
            {
              id: 'button-1',
              type: 'button',
              props: {
                text: 'Começar Quiz',
                fullWidth: true
              },
              position: 3
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: false,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'product-recommendation',
      name: 'Recomendação de Produto',
      category: 'E-commerce',
      preview: '🛍️',
      steps: [
        {
          id: 'step-1',
          name: 'Descobrir Preferências',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Encontre o Produto Perfeito',
                level: 1,
                fontSize: 42,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'image-1',
              type: 'image',
              props: {
                src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400',
                alt: 'Produtos',
                width: 600,
                height: 400
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'personality-test',
      name: 'Teste de Personalidade',
      category: 'Educação',
      preview: '🧠',
      steps: [
        {
          id: 'step-1',
          name: 'Introdução',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Sua Personalidade',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'testimonial-1',
              type: 'testimonial',
              props: {
                quote: 'Este teste me ajudou a entender melhor minhas características!',
                author: 'Ana Costa',
                role: 'Usuária',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face',
                rating: 5
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    }
  ];

  // Temas pré-definidos
  const THEMES = [
    {
      id: 'default',
      name: 'Padrão',
      primaryColor: '#B89B7A',
      secondaryColor: '#aa6b5d',
      textColor: '#432818',
      backgroundColor: '#ffffff',
      preview: '🎨'
    },
    {
      id: 'modern-blue',
      name: 'Azul Moderno',
      primaryColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💙'
    },
    {
      id: 'vibrant-orange',
      name: 'Laranja Vibrante',
      primaryColor: '#F97316',
      secondaryColor: '#EA580C',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '🧡'
    },
    {
      id: 'elegant-purple',
      name: 'Roxo Elegante',
      primaryColor: '#8B5CF6',
      secondaryColor: '#7C3AED',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💜'
    },
    {
      id: 'dark-mode',
      name: 'Modo Escuro',
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      textColor: '#F9FAFB',
      backgroundColor: '#111827',
      preview: '🌙'
    }
  ];

  // Carregar configuração inicial baseada no modo
  React.useEffect(() => {
    const loadInitialConfig = async () => {
      if (quizId) {
        try {
          const response = await fetch(`/api/quiz/${quizId}/config?mode=${mode}`);
          const data = await response.json();
          
          if (data.success && data.config) {
            setSteps(data.config.steps || []);
            setActiveStepId(data.config.activeStepId || data.config.steps[0]?.id);
            setPreviewMode(data.config.previewMode || 'desktop');
            setCurrentTheme(data.config.theme || 'default');
          }
        } catch (error) {
          console.error('Erro ao carregar configuração:', error);
        }
      }
    };

    loadInitialConfig();
  }, [quizId, mode]);

  // Auto-save a cada 30 segundos com debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (steps.length > 0) {
        handleSave();
      }
    }, 30000);

    return () => clearTimeout(timeoutId);
  }, [steps, handleSave]);

  // Shortcuts de teclado
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave]);

  // Adicionar funcionalidade de exportação/importação
  const exportConfig = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0'
    };
    
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
        setActiveStepId(config.activeStepId || config.steps[0]?.id);
        setPreviewMode(config.previewMode || 'desktop');
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
      }
    };
    reader.readAsText(file);
  }, []);

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

  // Função para aplicar template
  const applyTemplate = useCallback((template: any) => {
    saveToHistory();
    setSteps(template.steps);
    setActiveStepId(template.steps[0]?.id);
    setShowTemplateLibrary(false);
  }, [saveToHistory]);

  // Função para upload de mídia
  const handleMediaUpload = useCallback((file: File) => {
    // Simular upload - na prática integraria com serviço de storage
    const url = URL.createObjectURL(file);
    return url;
  }, []);

  // Função para aplicar tema
  const applyTheme = useCallback((theme: any) => {
    setCurrentTheme(theme.id);
    // Aplicar cores globais a todos os componentes
    setSteps(prev => prev.map(step => ({
      ...step,
      items: step.items.map(item => ({
        ...item,
        props: {
          ...item.props,
          color: theme.textColor,
          backgroundColor: theme.primaryColor
        }
      }))
    })));
  }, []);

  // Função para publicar
  const handlePublish = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0',
      theme: currentTheme
    };
    
    // Simular publicação - na prática enviaria para API
    const publishedUrl = `https://quiz.app/published/${Date.now()}`;
    setPublishUrl(publishedUrl);
    setIsPublished(true);
    setShowPublishModal(false);
    
    onSave(config);
  }, [steps, activeStepId, previewMode, currentTheme, onSave]);

  // Templates pré-definidos
  const TEMPLATES = [
    {
      id: 'lead-magnet',
      name: 'Lead Magnet',
      category: 'Marketing',
      preview: '🧲',
      steps: [
        {
          id: 'step-1',
          name: 'Captura de Lead',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Seu Perfil Ideal',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'text-1',
              type: 'text',
              props: {
                content: 'Responda algumas perguntas e receba um relatório personalizado',
                fontSize: 18,
                textAlign: 'center'
              },
              position: 1
            },
            {
              id: 'input-1',
              type: 'input',
              props: {
                label: 'Seu melhor e-mail',
                type: 'email',
                placeholder: 'exemplo@email.com'
              },
              position: 2
            },
            {
              id: 'button-1',
              type: 'button',
              props: {
                text: 'Começar Quiz',
                fullWidth: true
              },
              position: 3
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: false,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'product-recommendation',
      name: 'Recomendação de Produto',
      category: 'E-commerce',
      preview: '🛍️',
      steps: [
        {
          id: 'step-1',
          name: 'Descobrir Preferências',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Encontre o Produto Perfeito',
                level: 1,
                fontSize: 42,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'image-1',
              type: 'image',
              props: {
                src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400',
                alt: 'Produtos',
                width: 600,
                height: 400
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'personality-test',
      name: 'Teste de Personalidade',
      category: 'Educação',
      preview: '🧠',
      steps: [
        {
          id: 'step-1',
          name: 'Introdução',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Sua Personalidade',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'testimonial-1',
              type: 'testimonial',
              props: {
                quote: 'Este teste me ajudou a entender melhor minhas características!',
                author: 'Ana Costa',
                role: 'Usuária',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face',
                rating: 5
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    }
  ];

  // Temas pré-definidos
  const THEMES = [
    {
      id: 'default',
      name: 'Padrão',
      primaryColor: '#B89B7A',
      secondaryColor: '#aa6b5d',
      textColor: '#432818',
      backgroundColor: '#ffffff',
      preview: '🎨'
    },
    {
      id: 'modern-blue',
      name: 'Azul Moderno',
      primaryColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💙'
    },
    {
      id: 'vibrant-orange',
      name: 'Laranja Vibrante',
      primaryColor: '#F97316',
      secondaryColor: '#EA580C',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '🧡'
    },
    {
      id: 'elegant-purple',
      name: 'Roxo Elegante',
      primaryColor: '#8B5CF6',
      secondaryColor: '#7C3AED',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💜'
    },
    {
      id: 'dark-mode',
      name: 'Modo Escuro',
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      textColor: '#F9FAFB',
      backgroundColor: '#111827',
      preview: '🌙'
    }
  ];

  // Carregar configuração inicial baseada no modo
  React.useEffect(() => {
    const loadInitialConfig = async () => {
      if (quizId) {
        try {
          const response = await fetch(`/api/quiz/${quizId}/config?mode=${mode}`);
          const data = await response.json();
          
          if (data.success && data.config) {
            setSteps(data.config.steps || []);
            setActiveStepId(data.config.activeStepId || data.config.steps[0]?.id);
            setPreviewMode(data.config.previewMode || 'desktop');
            setCurrentTheme(data.config.theme || 'default');
          }
        } catch (error) {
          console.error('Erro ao carregar configuração:', error);
        }
      }
    };

    loadInitialConfig();
  }, [quizId, mode]);

  // Auto-save a cada 30 segundos com debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (steps.length > 0) {
        handleSave();
      }
    }, 30000);

    return () => clearTimeout(timeoutId);
  }, [steps, handleSave]);

  // Shortcuts de teclado
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave]);

  // Adicionar funcionalidade de exportação/importação
  const exportConfig = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0'
    };
    
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
        setActiveStepId(config.activeStepId || config.steps[0]?.id);
        setPreviewMode(config.previewMode || 'desktop');
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
      }
    };
    reader.readAsText(file);
  }, []);

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

  // Função para aplicar template
  const applyTemplate = useCallback((template: any) => {
    saveToHistory();
    setSteps(template.steps);
    setActiveStepId(template.steps[0]?.id);
    setShowTemplateLibrary(false);
  }, [saveToHistory]);

  // Função para upload de mídia
  const handleMediaUpload = useCallback((file: File) => {
    // Simular upload - na prática integraria com serviço de storage
    const url = URL.createObjectURL(file);
    return url;
  }, []);

  // Função para aplicar tema
  const applyTheme = useCallback((theme: any) => {
    setCurrentTheme(theme.id);
    // Aplicar cores globais a todos os componentes
    setSteps(prev => prev.map(step => ({
      ...step,
      items: step.items.map(item => ({
        ...item,
        props: {
          ...item.props,
          color: theme.textColor,
          backgroundColor: theme.primaryColor
        }
      }))
    })));
  }, []);

  // Função para publicar
  const handlePublish = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0',
      theme: currentTheme
    };
    
    // Simular publicação - na prática enviaria para API
    const publishedUrl = `https://quiz.app/published/${Date.now()}`;
    setPublishUrl(publishedUrl);
    setIsPublished(true);
    setShowPublishModal(false);
    
    onSave(config);
  }, [steps, activeStepId, previewMode, currentTheme, onSave]);

  // Templates pré-definidos
  const TEMPLATES = [
    {
      id: 'lead-magnet',
      name: 'Lead Magnet',
      category: 'Marketing',
      preview: '🧲',
      steps: [
        {
          id: 'step-1',
          name: 'Captura de Lead',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Seu Perfil Ideal',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'text-1',
              type: 'text',
              props: {
                content: 'Responda algumas perguntas e receba um relatório personalizado',
                fontSize: 18,
                textAlign: 'center'
              },
              position: 1
            },
            {
              id: 'input-1',
              type: 'input',
              props: {
                label: 'Seu melhor e-mail',
                type: 'email',
                placeholder: 'exemplo@email.com'
              },
              position: 2
            },
            {
              id: 'button-1',
              type: 'button',
              props: {
                text: 'Começar Quiz',
                fullWidth: true
              },
              position: 3
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: false,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'product-recommendation',
      name: 'Recomendação de Produto',
      category: 'E-commerce',
      preview: '🛍️',
      steps: [
        {
          id: 'step-1',
          name: 'Descobrir Preferências',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Encontre o Produto Perfeito',
                level: 1,
                fontSize: 42,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'image-1',
              type: 'image',
              props: {
                src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400',
                alt: 'Produtos',
                width: 600,
                height: 400
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'personality-test',
      name: 'Teste de Personalidade',
      category: 'Educação',
      preview: '🧠',
      steps: [
        {
          id: 'step-1',
          name: 'Introdução',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Sua Personalidade',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'testimonial-1',
              type: 'testimonial',
              props: {
                quote: 'Este teste me ajudou a entender melhor minhas características!',
                author: 'Ana Costa',
                role: 'Usuária',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face',
                rating: 5
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    }
  ];

  // Temas pré-definidos
  const THEMES = [
    {
      id: 'default',
      name: 'Padrão',
      primaryColor: '#B89B7A',
      secondaryColor: '#aa6b5d',
      textColor: '#432818',
      backgroundColor: '#ffffff',
      preview: '🎨'
    },
    {
      id: 'modern-blue',
      name: 'Azul Moderno',
      primaryColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💙'
    },
    {
      id: 'vibrant-orange',
      name: 'Laranja Vibrante',
      primaryColor: '#F97316',
      secondaryColor: '#EA580C',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '🧡'
    },
    {
      id: 'elegant-purple',
      name: 'Roxo Elegante',
      primaryColor: '#8B5CF6',
      secondaryColor: '#7C3AED',
      textColor: '#1F2937',
      backgroundColor: '#ffffff',
      preview: '💜'
    },
    {
      id: 'dark-mode',
      name: 'Modo Escuro',
      primaryColor: '#10B981',
      secondaryColor: '#059669',
      textColor: '#F9FAFB',
      backgroundColor: '#111827',
      preview: '🌙'
    }
  ];

  // Carregar configuração inicial baseada no modo
  React.useEffect(() => {
    const loadInitialConfig = async () => {
      if (quizId) {
        try {
          const response = await fetch(`/api/quiz/${quizId}/config?mode=${mode}`);
          const data = await response.json();
          
          if (data.success && data.config) {
            setSteps(data.config.steps || []);
            setActiveStepId(data.config.activeStepId || data.config.steps[0]?.id);
            setPreviewMode(data.config.previewMode || 'desktop');
            setCurrentTheme(data.config.theme || 'default');
          }
        } catch (error) {
          console.error('Erro ao carregar configuração:', error);
        }
      }
    };

    loadInitialConfig();
  }, [quizId, mode]);

  // Auto-save a cada 30 segundos com debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (steps.length > 0) {
        handleSave();
      }
    }, 30000);

    return () => clearTimeout(timeoutId);
  }, [steps, handleSave]);

  // Shortcuts de teclado
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave]);

  // Adicionar funcionalidade de exportação/importação
  const exportConfig = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0'
    };
    
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
        setActiveStepId(config.activeStepId || config.steps[0]?.id);
        setPreviewMode(config.previewMode || 'desktop');
      } catch (error) {
        console.error('Erro ao importar configuração:', error);
      }
    };
    reader.readAsText(file);
  }, []);

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

  // Função para aplicar template
  const applyTemplate = useCallback((template: any) => {
    saveToHistory();
    setSteps(template.steps);
    setActiveStepId(template.steps[0]?.id);
    setShowTemplateLibrary(false);
  }, [saveToHistory]);

  // Função para upload de mídia
  const handleMediaUpload = useCallback((file: File) => {
    // Simular upload - na prática integraria com serviço de storage
    const url = URL.createObjectURL(file);
    return url;
  }, []);

  // Função para aplicar tema
  const applyTheme = useCallback((theme: any) => {
    setCurrentTheme(theme.id);
    // Aplicar cores globais a todos os componentes
    setSteps(prev => prev.map(step => ({
      ...step,
      items: step.items.map(item => ({
        ...item,
        props: {
          ...item.props,
          color: theme.textColor,
          backgroundColor: theme.primaryColor
        }
      }))
    })));
  }, []);

  // Função para publicar
  const handlePublish = useCallback(() => {
    const config = {
      steps,
      activeStepId,
      previewMode,
      timestamp: Date.now(),
      version: '2.0',
      theme: currentTheme
    };
    
    // Simular publicação - na prática enviaria para API
    const publishedUrl = `https://quiz.app/published/${Date.now()}`;
    setPublishUrl(publishedUrl);
    setIsPublished(true);
    setShowPublishModal(false);
    
    onSave(config);
  }, [steps, activeStepId, previewMode, currentTheme, onSave]);

  // Templates pré-definidos
  const TEMPLATES = [
    {
      id: 'lead-magnet',
      name: 'Lead Magnet',
      category: 'Marketing',
      preview: '🧲',
      steps: [
        {
          id: 'step-1',
          name: 'Captura de Lead',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Seu Perfil Ideal',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'text-1',
              type: 'text',
              props: {
                content: 'Responda algumas perguntas e receba um relatório personalizado',
                fontSize: 18,
                textAlign: 'center'
              },
              position: 1
            },
            {
              id: 'input-1',
              type: 'input',
              props: {
                label: 'Seu melhor e-mail',
                type: 'email',
                placeholder: 'exemplo@email.com'
              },
              position: 2
            },
            {
              id: 'button-1',
              type: 'button',
              props: {
                text: 'Começar Quiz',
                fullWidth: true
              },
              position: 3
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: false,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'product-recommendation',
      name: 'Recomendação de Produto',
      category: 'E-commerce',
      preview: '🛍️',
      steps: [
        {
          id: 'step-1',
          name: 'Descobrir Preferências',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Encontre o Produto Perfeito',
                level: 1,
                fontSize: 42,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'image-1',
              type: 'image',
              props: {
                src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400',
                alt: 'Produtos',
                width: 600,
                height: 400
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true
          }
        }
      ]
    },
    {
      id: 'personality-test',
      name: 'Teste de Personalidade',
      category: 'Educação',
      preview: '🧠',
      steps: [
        {
          id: 'step-1',
          name: 'Introdução',
          items: [
            {
              id: 'heading-1',
              type: 'heading',
              props: {
                content: 'Descubra Sua Personalidade',
                level: 1,
                fontSize: 48,
                textAlign: 'center'
              },
              position: 0
            },
            {
              id: 'testimonial-1',
              type: 'testimonial',
              props: {
                quote: 'Este teste me ajudou a entender melhor minhas características!',
                author: 'Ana Costa',
                role: 'Usuária',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face',
                rating: 5
              },
              position: 1
            }
          ],
          settings: {
            showLogo: true,
            showProgress: true,
            allowReturn: true,
            isVisible: true