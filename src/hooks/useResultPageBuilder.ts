
import { useState, useCallback } from 'react';
import { ResultPageBlock, ResultPageBlockType, ResultPageBlockContent } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';

export const useResultPageBuilder = (primaryStyle: StyleResult, secondaryStyles?: StyleResult[]) => {
  const [blocks, setBlocks] = useState<ResultPageBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const generateId = () => `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const getDefaultContent = (type: ResultPageBlockType): ResultPageBlockContent => {
    switch (type) {
      case 'header':
        return {
          header: {
            logo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
            logoAlt: "Logo Gisele Galvão",
            logoHeight: 80,
            userName: "Visitante"
          }
        };
      case 'styleResult':
        return {
          styleResult: {
            description: `Você tem ${primaryStyle.percentage}% de compatibilidade com o estilo ${primaryStyle.category}.`,
            showSecondaryStyles: true
          }
        };
      case 'transformation':
        return {
          transformation: {
            title: "Transformações Reais",
            description: "Veja como outras mulheres transformaram seu estilo"
          }
        };
      case 'motivation':
        return {
          motivation: {
            title: "Por que Descobrir seu Estilo é Importante?",
            subtitle: "Transforme sua relação com a moda",
            items: [
              {
                title: "Autoconfiança",
                description: "Sinta-se segura e autêntica em suas escolhas"
              },
              {
                title: "Economia",
                description: "Compre apenas o que combina com você"
              }
            ]
          }
        };
      case 'bonus':
        return {
          bonus: {
            title: "Bônus Exclusivos",
            bonuses: [
              {
                title: "Guia de Peças Essenciais",
                description: "Descubra as peças-chave para seu estilo",
                value: "R$ 79,00"
              }
            ]
          }
        };
      case 'testimonials':
        return {
          testimonials: {
            title: "O que nossas clientes estão dizendo",
            testimonials: [
              {
                text: "Transformou completamente minha forma de me vestir!",
                author: "Maria Silva",
                rating: 5
              }
            ]
          }
        };
      case 'guarantee':
        return {
          guarantee: {
            title: "Garantia de Satisfação",
            description: "7 dias para testar sem risco",
            days: 7
          }
        };
      case 'mentor':
        return {
          mentor: {
            name: "Gisele Galvão",
            title: "Consultora de Imagem e Estilo",
            description: "Especialista em coloração pessoal com certificação internacional",
            image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745347467/GISELE-GALV%C3%83O-POSE-ACESSIBILIDADE_i23qvj.webp"
          }
        };
      case 'cta':
        return {
          cta: {
            title: "Transforme Seu Estilo Hoje",
            subtitle: "Guia Completo + Bônus Exclusivos",
            regularPrice: "R$ 175,00",
            salePrice: "R$ 39,00",
            installments: "4X de R$ 10,86",
            ctaText: "Quero meu Guia de Estilo Agora",
            ctaUrl: "#"
          }
        };
      case 'footer':
        return {
          footer: {
            companyName: "Gisele Galvão - Consultoria de Imagem",
            links: [
              { text: "Política de Privacidade", url: "#" },
              { text: "Termos de Uso", url: "#" }
            ]
          }
        };
      default:
        return {};
    }
  };

  const addBlock = useCallback((type: ResultPageBlockType, position?: number) => {
    const newBlock: ResultPageBlock = {
      id: generateId(),
      type,
      content: getDefaultContent(type),
      order: position ?? blocks.length,
      visible: true
    };

    setBlocks(prev => {
      const newBlocks = [...prev, newBlock];
      return newBlocks.sort((a, b) => a.order - b.order);
    });

    return newBlock.id;
  }, [blocks.length, primaryStyle]);

  const updateBlock = useCallback((blockId: string, updates: Partial<ResultPageBlock>) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
  }, []);

  const deleteBlock = useCallback((blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  }, [selectedBlockId]);

  const moveBlock = useCallback((blockId: string, direction: 'up' | 'down') => {
    setBlocks(prev => {
      const blockIndex = prev.findIndex(b => b.id === blockId);
      if (blockIndex === -1) return prev;

      const newBlocks = [...prev];
      const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;

      if (targetIndex < 0 || targetIndex >= newBlocks.length) return prev;

      [newBlocks[blockIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[blockIndex]];
      
      return newBlocks.map((block, index) => ({ ...block, order: index }));
    });
  }, []);

  const saveConfiguration = useCallback(async () => {
    try {
      const config = {
        blocks,
        primaryStyle,
        secondaryStyles,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(`result-page-config-${primaryStyle.category}`, JSON.stringify(config));
      
      toast({
        title: "Configuração salva",
        description: "As alterações foram salvas com sucesso."
      });
      return true;
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a configuração.",
        variant: "destructive"
      });
      return false;
    }
  }, [blocks, primaryStyle, secondaryStyles]);

  const loadConfiguration = useCallback(() => {
    try {
      const saved = localStorage.getItem(`result-page-config-${primaryStyle.category}`);
      if (saved) {
        const config = JSON.parse(saved);
        setBlocks(config.blocks || []);
        return true;
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
    }
    return false;
  }, [primaryStyle.category]);

  return {
    blocks,
    selectedBlockId,
    isPreviewMode,
    setSelectedBlockId,
    setIsPreviewMode,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    saveConfiguration,
    loadConfiguration,
    primaryStyle,
    secondaryStyles
  };
};
