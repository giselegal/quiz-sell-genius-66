
import { useState, useCallback, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';

export interface EditorStage {
  id: string;
  name: string;
  type: 'intro' | 'question' | 'result' | 'offer';
  order: number;
  components: EditorComponent[];
  settings: Record<string, any>;
}

export interface EditorComponent {
  id: string;
  type: string;
  content: Record<string, any>;
  style: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export const useLiveEditor = () => {
  const [stages, setStages] = useState<EditorStage[]>([]);
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Initialize with default stages
  useEffect(() => {
    const defaultStages: EditorStage[] = [
      {
        id: 'intro',
        name: 'Introdução',
        type: 'intro',
        order: 0,
        components: [],
        settings: {}
      },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `question-${i + 1}`,
        name: `Questão ${i + 1}`,
        type: 'question' as const,
        order: i + 1,
        components: [],
        settings: { questionIndex: i }
      })),
      {
        id: 'result',
        name: 'Resultado',
        type: 'result',
        order: 11,
        components: [],
        settings: {}
      },
      {
        id: 'offer',
        name: 'Oferta',
        type: 'offer',
        order: 12,
        components: [],
        settings: {}
      }
    ];

    setStages(defaultStages);
    setActiveStageId('intro');
  }, []);

  const setActiveStage = useCallback((stageId: string) => {
    setActiveStageId(stageId);
    setSelectedComponentId(null);
  }, []);

  const setSelectedComponent = useCallback((componentId: string | null) => {
    setSelectedComponentId(componentId);
  }, []);

  const addStage = useCallback((stage: EditorStage) => {
    setStages(prev => [...prev, stage].sort((a, b) => a.order - b.order));
  }, []);

  const updateStage = useCallback((stageId: string, updates: Partial<EditorStage>) => {
    setStages(prev => prev.map(stage => 
      stage.id === stageId ? { ...stage, ...updates } : stage
    ));
  }, []);

  const deleteStage = useCallback((stageId: string) => {
    setStages(prev => prev.filter(stage => stage.id !== stageId));
    if (activeStageId === stageId) {
      setActiveStageId(stages[0]?.id || null);
    }
  }, [activeStageId, stages]);

  const addComponent = useCallback((stageId: string, component: EditorComponent) => {
    setStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? { ...stage, components: [...stage.components, component] }
        : stage
    ));
  }, []);

  const updateComponent = useCallback((stageId: string, componentId: string, updates: Partial<EditorComponent>) => {
    setStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? {
            ...stage,
            components: stage.components.map(comp => 
              comp.id === componentId ? { ...comp, ...updates } : comp
            )
          }
        : stage
    ));
  }, []);

  const deleteComponent = useCallback((stageId: string, componentId: string) => {
    setStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? { ...stage, components: stage.components.filter(comp => comp.id !== componentId) }
        : stage
    ));
    if (selectedComponentId === componentId) {
      setSelectedComponentId(null);
    }
  }, [selectedComponentId]);

  const togglePreview = useCallback(() => {
    setIsPreviewMode(prev => !prev);
  }, []);

  const saveEditor = useCallback(async () => {
    const editorData = {
      stages,
      activeStageId,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('liveQuizEditor', JSON.stringify(editorData));
    console.log('Editor saved:', editorData);
  }, [stages, activeStageId]);

  const loadEditor = useCallback(() => {
    const savedData = localStorage.getItem('liveQuizEditor');
    if (savedData) {
      const data = JSON.parse(savedData);
      setStages(data.stages || []);
      setActiveStageId(data.activeStageId || null);
    }
  }, []);

  return {
    stages,
    activeStageId,
    selectedComponentId,
    isPreviewMode,
    setActiveStage,
    setSelectedComponent,
    addStage,
    updateStage,
    deleteStage,
    addComponent,
    updateComponent,
    deleteComponent,
    togglePreview,
    saveEditor,
    loadEditor
  };
};
