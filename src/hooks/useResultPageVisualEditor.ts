
import { useState, useCallback } from 'react';
import { ResultPageElement, ResultPageEditorState, ResultPageBlockType } from '@/types/resultPageEditor';
import { StyleResult } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';

export const useResultPageVisualEditor = (primaryStyle: StyleResult, secondaryStyles?: StyleResult[]) => {
  const [state, setState] = useState<ResultPageEditorState>({
    elements: [],
    stages: [{
      id: 'result-stage-1',
      title: 'Página de Resultado',
      order: 0,
      type: 'result',
      settings: {
        showHeader: true,
        showProgress: false,
        allowBack: false
      }
    }],
    activeStageId: 'result-stage-1',
    primaryStyle,
    secondaryStyles: secondaryStyles || [],
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'Inter, sans-serif'
    }
  });

  const addElement = useCallback((type: ResultPageBlockType, position?: number) => {
    const elementId = `result-element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const targetStageId = state.activeStageId || state.stages[0]?.id;
    
    if (!targetStageId) return elementId;

    const newElement: ResultPageElement = {
      id: elementId,
      type,
      stageId: targetStageId,
      order: position ?? state.elements.filter(el => el.stageId === targetStageId).length,
      content: getDefaultContentForResultType(type, primaryStyle),
      style: getDefaultStyleForResultType(type),
      visible: true,
      locked: false
    };

    setState(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));

    return elementId;
  }, [state.activeStageId, state.stages, state.elements, primaryStyle]);

  const updateElement = useCallback((elementId: string, updates: Partial<ResultPageElement>) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  }, []);

  const deleteElement = useCallback((elementId: string) => {
    setState(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
  }, []);

  const moveElement = useCallback((elementId: string, direction: 'up' | 'down') => {
    setState(prev => {
      const element = prev.elements.find(el => el.id === elementId);
      if (!element) return prev;

      const stageElements = prev.elements
        .filter(el => el.stageId === element.stageId)
        .sort((a, b) => a.order - b.order);

      const currentIndex = stageElements.findIndex(el => el.id === elementId);
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

      if (newIndex < 0 || newIndex >= stageElements.length) return prev;

      const updatedElements = prev.elements.map(el => {
        if (el.id === elementId) {
          return { ...el, order: stageElements[newIndex].order };
        }
        if (el.id === stageElements[newIndex].id) {
          return { ...el, order: element.order };
        }
        return el;
      });

      return { ...prev, elements: updatedElements };
    });
  }, []);

  const saveProject = useCallback(async () => {
    try {
      const configToSave = {
        styleType: primaryStyle.category,
        elements: state.elements,
        globalStyles: state.globalStyles,
        primaryStyle: state.primaryStyle,
        secondaryStyles: state.secondaryStyles
      };
      
      localStorage.setItem(`result-page-editor-${primaryStyle.category}`, JSON.stringify(configToSave));
      
      toast({
        title: "Página salva",
        description: "Todas as alterações foram salvas com sucesso."
      });
      return true;
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a página.",
        variant: "destructive"
      });
      return false;
    }
  }, [state, primaryStyle]);

  return {
    elements: state.elements,
    stages: state.stages,
    activeStageId: state.activeStageId,
    primaryStyle: state.primaryStyle,
    globalStyles: state.globalStyles,
    addElement,
    updateElement,
    deleteElement,
    moveElement,
    saveProject
  };
};

const getDefaultContentForResultType = (type: ResultPageBlockType, primaryStyle: StyleResult): any => {
  switch (type) {
    case 'styleResult':
      return { 
        styleCategory: primaryStyle.category,
        percentage: primaryStyle.percentage,
        description: `Você tem ${primaryStyle.percentage}% de compatibilidade com o estilo ${primaryStyle.category}.`
      };
    case 'hero':
      return { 
        title: 'SEU RESULTADO ESTÁ PRONTO!',
        subtitle: `Descubra tudo sobre o estilo ${primaryStyle.category}`,
        heroImage: 'https://placehold.co/600x400?text=Hero+Image'
      };
    case 'pricing':
      return { 
        regularPrice: '197,00',
        salePrice: '67,00',
        buttonText: 'QUERO MEU GUIA COMPLETO',
        ctaUrl: '#',
        urgencyText: 'Oferta por tempo limitado!'
      };
    case 'testimonials':
      return { 
        title: 'O que nossas clientes estão dizendo',
        testimonialsImage: 'https://placehold.co/600x400?text=Testimonials'
      };
    case 'guarantee':
      return { 
        title: 'Garantia de 7 dias',
        text: 'Se você não ficar 100% satisfeita, devolvemos seu dinheiro.',
        image: 'https://placehold.co/100x100?text=Garantia'
      };
    default:
      return { text: 'Clique para editar este conteúdo' };
  }
};

const getDefaultStyleForResultType = (type: ResultPageBlockType): any => {
  switch (type) {
    case 'hero':
      return { 
        backgroundColor: '#fff7f3',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem'
      };
    case 'pricing':
      return { 
        backgroundColor: '#fff7f3',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem',
        margin: '1rem 0'
      };
    case 'styleResult':
      return { 
        backgroundColor: '#FAF9F7',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        margin: '1rem 0'
      };
    default:
      return { padding: '1rem', margin: '0.5rem 0' };
  }
};
