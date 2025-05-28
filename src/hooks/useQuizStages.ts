
import { useState, useCallback } from 'react';
import { QuizStage } from '@/types/quizBuilder';

export const useQuizStages = () => {
  const [stages, setStages] = useState<QuizStage[]>([]);
  const [activeStageId, setActiveStageId] = useState<string>('');

  const initializeStages = useCallback((initialStages: QuizStage[]) => {
    setStages(initialStages);
    if (initialStages.length > 0) {
      setActiveStageId(initialStages[0].id);
    }
  }, []);

  const addStage = useCallback((stage: Omit<QuizStage, 'id' | 'order'>): string => {
    const newStage: QuizStage = {
      ...stage,
      id: `stage-${Date.now()}`,
      order: stages.length
    };
    setStages(prev => [...prev, newStage]);
    return newStage.id;
  }, [stages.length]);

  const updateStage = useCallback((id: string, updates: Partial<QuizStage>) => {
    setStages(prev => 
      prev.map(stage => 
        stage.id === id ? { ...stage, ...updates } : stage
      )
    );
  }, []);

  const deleteStage = useCallback((id: string) => {
    setStages(prev => {
      const filteredStages = prev.filter(stage => stage.id !== id);
      return filteredStages.map((stage, index) => ({
        ...stage,
        order: index
      }));
    });
    
    // Update active stage if the deleted stage was active
    setActiveStageId(current => {
      if (current === id) {
        const remainingStages = stages.filter(s => s.id !== id);
        return remainingStages.length > 0 ? remainingStages[0].id : '';
      }
      return current;
    });
  }, [stages]);

  const moveStage = useCallback((draggedId: string, targetId: string) => {
    setStages(prev => {
      const draggedIndex = prev.findIndex(s => s.id === draggedId);
      const targetIndex = prev.findIndex(s => s.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newStages = [...prev];
      const [removed] = newStages.splice(draggedIndex, 1);
      newStages.splice(targetIndex, 0, removed);
      
      return newStages.map((stage, index) => ({
        ...stage,
        order: index
      }));
    });
  }, []);

  const setActiveStage = useCallback((stageId: string) => {
    setActiveStageId(stageId);
  }, []);

  return {
    stages,
    activeStageId,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage,
    initializeStages
  };
};
