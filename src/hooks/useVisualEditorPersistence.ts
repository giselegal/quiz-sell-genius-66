
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { VisualEditorState } from '@/types/visualEditor';
import { toast } from '@/components/ui/use-toast';

export const useVisualEditorPersistence = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saveEditorState = useCallback(async (
    projectId: string, 
    editorState: VisualEditorState
  ): Promise<boolean> => {
    setIsSaving(true);
    try {
      // For now, save to localStorage until we create the proper table
      const projectData = {
        id: projectId,
        editorState,
        lastModified: new Date().toISOString(),
        version: '1.0'
      };
      
      localStorage.setItem(`visual-editor-${projectId}`, JSON.stringify(projectData));
      
      toast({
        title: "Projeto salvo",
        description: "Suas alterações foram salvas com sucesso",
        duration: 3000
      });
      
      return true;
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o projeto",
        variant: "destructive",
        duration: 5000
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const loadEditorState = useCallback(async (
    projectId: string
  ): Promise<VisualEditorState | null> => {
    setIsLoading(true);
    try {
      // For now, load from localStorage until we create the proper table
      const saved = localStorage.getItem(`visual-editor-${projectId}`);
      if (saved) {
        const projectData = JSON.parse(saved);
        return projectData.editorState;
      }
      return null;
    } catch (error) {
      console.error('Error loading project:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar o projeto",
        variant: "destructive",
        duration: 5000
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const listProjects = useCallback(async (): Promise<Array<{id: string, name: string, lastModified: string}>> => {
    try {
      const projects = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('visual-editor-')) {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          projects.push({
            id: data.id,
            name: `Projeto ${data.id}`,
            lastModified: data.lastModified
          });
        }
      }
      return projects;
    } catch (error) {
      console.error('Error listing projects:', error);
      return [];
    }
  }, []);

  return {
    saveEditorState,
    loadEditorState,
    listProjects,
    isSaving,
    isLoading
  };
};
