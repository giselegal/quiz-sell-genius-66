
import { useState, useCallback } from 'react';
import { EditorStage, EditorComponent } from '@/components/live-editor/LiveQuizEditor';
import { toast } from '@/components/ui/use-toast';

export const useLiveEditor = () => {
  const [stages, setStages] = useState<EditorStage[]>([]);
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const setActiveStage = useCallback((stageId: string) => {
    setActiveStageId(stageId);
    setSelectedComponentId(null);
  }, []);

  const setSelectedComponent = useCallback((componentId: string | null) => {
    setSelectedComponentId(componentId);
  }, []);

  const addStage = useCallback((stage: EditorStage) => {
    setStages(prev => [...prev, stage]);
  }, []);

  const updateStage = useCallback((stageId: string, updates: Partial<EditorStage>) => {
    setStages(prev => prev.map(stage => 
      stage.id === stageId ? { ...stage, ...updates } : stage
    ));
  }, []);

  const deleteStage = useCallback((stageId: string) => {
    setStages(prev => prev.filter(stage => stage.id !== stageId));
    if (activeStageId === stageId) {
      setActiveStageId(null);
      setSelectedComponentId(null);
    }
  }, [activeStageId]);

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
            components: stage.components.map(component =>
              component.id === componentId ? { ...component, ...updates } : component
            )
          }
        : stage
    ));
  }, []);

  const deleteComponent = useCallback((stageId: string, componentId: string) => {
    setStages(prev => prev.map(stage => 
      stage.id === stageId 
        ? { ...stage, components: stage.components.filter(c => c.id !== componentId) }
        : stage
    ));
  }, []);

  const togglePreview = useCallback(() => {
    setIsPreviewMode(prev => !prev);
    setSelectedComponentId(null);
  }, []);

  const saveEditor = useCallback(async () => {
    try {
      // Salvar no localStorage por enquanto
      localStorage.setItem('liveEditor', JSON.stringify({
        stages,
        activeStageId,
        lastSaved: new Date().toISOString()
      }));
      return true;
    } catch (error) {
      console.error('Error saving editor:', error);
      throw error;
    }
  }, [stages, activeStageId]);

  const loadEditor = useCallback(() => {
    try {
      const saved = localStorage.getItem('liveEditor');
      if (saved) {
        const data = JSON.parse(saved);
        setStages(data.stages || []);
        setActiveStageId(data.activeStageId || null);
      }
    } catch (error) {
      console.error('Error loading editor:', error);
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
