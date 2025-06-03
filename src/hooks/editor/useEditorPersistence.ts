import { useState, useEffect, useCallback } from 'react';
import { Block } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';

export interface EditorState {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
  version: number;
}

const STORAGE_KEY = 'result-page-editor-states';
const AUTO_SAVE_INTERVAL = 30000; // 30 segundos

export const useEditorPersistence = (initialBlocks: Block[] = []) => {
  const [states, setStates] = useState<EditorState[]>([]);
  const [currentState, setCurrentState] = useState<EditorState | null>(null);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  // Carregar estados salvos do localStorage
  useEffect(() => {
    try {
      const savedStates = localStorage.getItem(STORAGE_KEY);
      if (savedStates) {
        const parsedStates = JSON.parse(savedStates) as EditorState[];
        setStates(parsedStates);
      }
    } catch (error) {
      console.error('Erro ao carregar estados salvos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os projetos salvos.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Salvar estados no localStorage
  const saveToLocalStorage = useCallback((updatedStates: EditorState[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStates));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o projeto localmente.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Criar novo estado
  const createState = useCallback((name: string, blocks: Block[]): EditorState => {
    const now = new Date().toISOString();
    return {
      id: `state_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      blocks: JSON.parse(JSON.stringify(blocks)), // deep clone
      createdAt: now,
      updatedAt: now,
      version: 1,
    };
  }, []);

  // Salvar estado atual
  const saveState = useCallback((name: string, blocks: Block[], stateId?: string) => {
    try {
      let updatedStates: EditorState[];
      
      if (stateId) {
        // Atualizar estado existente
        updatedStates = states.map(state => 
          state.id === stateId 
            ? {
                ...state,
                name,
                blocks: JSON.parse(JSON.stringify(blocks)),
                updatedAt: new Date().toISOString(),
                version: state.version + 1,
              }
            : state
        );
      } else {
        // Criar novo estado
        const newState = createState(name, blocks);
        updatedStates = [...states, newState];
        setCurrentState(newState);
      }

      setStates(updatedStates);
      saveToLocalStorage(updatedStates);
      setHasUnsavedChanges(false);

      toast({
        title: "Sucesso",
        description: `Projeto "${name}" salvo com sucesso!`,
      });

      return updatedStates.find(s => s.name === name);
    } catch (error) {
      console.error('Erro ao salvar estado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o projeto.",
        variant: "destructive",
      });
      return null;
    }
  }, [states, createState, saveToLocalStorage, toast]);

  // Carregar estado
  const loadState = useCallback((stateId: string): EditorState | null => {
    try {
      const state = states.find(s => s.id === stateId);
      if (state) {
        setCurrentState(state);
        setHasUnsavedChanges(false);
        toast({
          title: "Sucesso",
          description: `Projeto "${state.name}" carregado com sucesso!`,
        });
        return state;
      } else {
        toast({
          title: "Erro",
          description: "Projeto não encontrado.",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error('Erro ao carregar estado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o projeto.",
        variant: "destructive",
      });
      return null;
    }
  }, [states, toast]);

  // Deletar estado
  const deleteState = useCallback((stateId: string) => {
    try {
      const updatedStates = states.filter(s => s.id !== stateId);
      setStates(updatedStates);
      saveToLocalStorage(updatedStates);

      if (currentState?.id === stateId) {
        setCurrentState(null);
      }

      toast({
        title: "Sucesso",
        description: "Projeto deletado com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao deletar estado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível deletar o projeto.",
        variant: "destructive",
      });
    }
  }, [states, currentState, saveToLocalStorage, toast]);

  // Duplicar estado
  const duplicateState = useCallback((stateId: string) => {
    try {
      const originalState = states.find(s => s.id === stateId);
      if (originalState) {
        const duplicatedState = createState(
          `${originalState.name} (Cópia)`,
          originalState.blocks
        );
        const updatedStates = [...states, duplicatedState];
        setStates(updatedStates);
        saveToLocalStorage(updatedStates);

        toast({
          title: "Sucesso",
          description: "Projeto duplicado com sucesso!",
        });

        return duplicatedState;
      }
    } catch (error) {
      console.error('Erro ao duplicar estado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível duplicar o projeto.",
        variant: "destructive",
      });
    }
    return null;
  }, [states, createState, saveToLocalStorage, toast]);

  // Exportar estado para JSON
  const exportState = useCallback((stateId: string) => {
    try {
      const state = states.find(s => s.id === stateId);
      if (state) {
        const dataStr = JSON.stringify(state, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${state.name.replace(/[^a-z0-9]/gi, '_')}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        
        toast({
          title: "Sucesso",
          description: "Projeto exportado com sucesso!",
        });
      }
    } catch (error) {
      console.error('Erro ao exportar estado:', error);
      toast({
        title: "Erro",
        description: "Não foi possível exportar o projeto.",
        variant: "destructive",
      });
    }
  }, [states, toast]);

  // Importar estado de JSON
  const importState = useCallback((file: File): Promise<EditorState | null> => {
    return new Promise((resolve) => {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedState = JSON.parse(e.target?.result as string) as EditorState;
            
            // Validar estrutura básica
            if (!importedState.id || !importedState.name || !Array.isArray(importedState.blocks)) {
              throw new Error('Formato de arquivo inválido');
            }

            // Gerar novo ID para evitar conflitos
            const newState = {
              ...importedState,
              id: `imported_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: `${importedState.name} (Importado)`,
              updatedAt: new Date().toISOString(),
            };

            const updatedStates = [...states, newState];
            setStates(updatedStates);
            saveToLocalStorage(updatedStates);

            toast({
              title: "Sucesso",
              description: "Projeto importado com sucesso!",
            });

            resolve(newState);
          } catch (error) {
            console.error('Erro ao processar arquivo importado:', error);
            toast({
              title: "Erro",
              description: "Arquivo inválido ou corrompido.",
              variant: "destructive",
            });
            resolve(null);
          }
        };

        reader.onerror = () => {
          toast({
            title: "Erro",
            description: "Não foi possível ler o arquivo.",
            variant: "destructive",
          });
          resolve(null);
        };

        reader.readAsText(file);
      } catch (error) {
        console.error('Erro ao importar estado:', error);
        toast({
          title: "Erro",
          description: "Não foi possível importar o projeto.",
          variant: "destructive",
        });
        resolve(null);
      }
    });
  }, [states, saveToLocalStorage, toast]);

  // Auto-save (chamado externamente quando há mudanças)
  const markAsChanged = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  // Auto-save quando há mudanças e auto-save está habilitado
  useEffect(() => {
    if (!isAutoSaveEnabled || !hasUnsavedChanges || !currentState) {
      return;
    }

    const autoSaveTimer = setTimeout(() => {
      // Este seria chamado externamente com os blocos atuais
      // Aqui apenas marcamos como não tendo mudanças pendentes
      // A implementação real do auto-save precisa ser feita no componente pai
    }, AUTO_SAVE_INTERVAL);

    return () => clearTimeout(autoSaveTimer);
  }, [isAutoSaveEnabled, hasUnsavedChanges, currentState]);

  return {
    // Estados
    states,
    currentState,
    hasUnsavedChanges,
    isAutoSaveEnabled,

    // Ações
    saveState,
    loadState,
    deleteState,
    duplicateState,
    exportState,
    importState,
    markAsChanged,
    setIsAutoSaveEnabled,
    setCurrentState,

    // Utils
    createState,
  };
};
