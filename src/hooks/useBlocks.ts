import { useState, useEffect, useCallback } from 'react';
import { BlockData } from '@/types/resultPageConfig';
import { BlockTemplate } from '@/data/blockTemplates';

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultBlocks: BlockData[] = [
  {
    id: 'hero-main',
    type: 'hero',
    title: 'Seção Hero',
    content: {
      title: 'Descobrimos Seu Estilo Predominante:',
      subtitle: 'Agora você tem clareza total sobre quem você é!',
    },
    style: {
      backgroundColor: 'white',
      padding: '2rem',
      textAlign: 'center',
    },
    visible: true,
    order: 0,
    editable: false,
  },
  {
    id: 'text-intro',
    type: 'text',
    title: 'Introdução',
    content: {
      title: 'Agora você tem clareza total',
      description: 'sobre quem você é e como expressar sua personalidade através do seu estilo!',
    },
    style: {
      backgroundColor: 'white',
      padding: '1.5rem',
    },
    visible: true,
    order: 1,
    editable: true,
  },
  {
    id: 'transformations',
    type: 'transformations',
    title: 'Transformações',
    content: {
      title: 'Resultados que Falam por Si',
      description: 'Veja como mulheres descobriram sua melhor versão seguindo as mesmas estratégias que você vai receber',
    },
    style: {
      backgroundColor: 'white',
      padding: '2rem',
    },
    visible: true,
    order: 2,
    editable: false,
  },
  {
    id: 'motivation',
    type: 'motivation',
    title: 'Motivação',
    content: {
      title: 'Por que Aplicar o seu Estilo é tão importante?',
      description: 'Conhecer seu estilo pessoal é muito mais do que seguir tendências passageiras — é uma ferramenta poderosa de comunicação não-verbal e autoconfiança.',
    },
    style: {
      backgroundColor: 'white',
      padding: '2rem',
    },
    visible: true,
    order: 3,
    editable: false,
  },
  {
    id: 'bonus',
    type: 'bonus',
    title: 'Bônus',
    content: {
      title: 'Bônus Exclusivos para Você',
      description: 'Além do guia principal, você receberá estas ferramentas complementares para potencializar sua jornada de transformação',
    },
    style: {
      backgroundColor: 'white',
      padding: '2rem',
    },
    visible: true,
    order: 4,
    editable: false,
  },
  {
    id: 'testimonials',
    type: 'testimonials',
    title: 'Depoimentos',
    content: {
      title: 'Transformações Reais',
      description: 'O que mulheres como você estão dizendo sobre esta jornada de transformação',
      userName: 'Maria Silva',
    },
    style: {
      backgroundColor: 'white',
      padding: '2rem',
    },
    visible: true,
    order: 5,
    editable: false,
  },
  {
    id: 'guarantee',
    type: 'guarantee',
    title: 'Garantia',
    content: {
      title: 'Sua Satisfação 100% Garantida',
      description: 'Se por qualquer motivo você não ficar 100% satisfeita, reembolsamos o valor integral sem perguntas.',
    },
    style: {
      backgroundColor: 'white',
      padding: '2rem',
    },
    visible: true,
    order: 6,
    editable: false,
  },
  {
    id: 'mentor',
    type: 'mentor',
    title: 'Mentora',
    content: {
      title: 'Conheça Sua Mentora',
      description: 'Gisele Galvão — Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.',
      name: 'Gisele Galvão',
    },
    style: {
      backgroundColor: 'white',
      padding: '2rem',
    },
    visible: true,
    order: 7,
    editable: false,
  },
  {
    id: 'cta-final',
    type: 'cta',
    title: 'Call to Action',
    content: {
      title: 'Transforme Seu Estilo Hoje!',
      description: 'Não perca esta oportunidade única',
      ctaText: 'Adquirir Agora',
      ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
      price: '5x R$ 8,83',
      regularPrice: 'R$ 59,90',
    },
    style: {
      backgroundColor: 'linear-gradient(135deg, #fff7f3 0%, #f9f4ef 100%)',
      padding: '3rem',
      textAlign: 'center',
      borderRadius: '1rem',
    },
    visible: true,
    order: 8,
    editable: true,
  },
];

interface UseBlocksResult {
  blocks: BlockData[];
  updateBlocks: (newBlocks: BlockData[]) => void;
  addBlock: (blockType: BlockData['type']) => void;
  addBlocksFromTemplate: (template: BlockTemplate) => void;
  updateBlock: (blockId: string, updates: Partial<BlockData>) => void;
  deleteBlock: (blockId: string) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
}

export const useBlocks = (styleCategory: string): UseBlocksResult => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  // Carregar blocos do localStorage ou usar padrão
  useEffect(() => {
    const storageKey = `resultPage_blocks_${styleCategory}`;
    const savedBlocks = localStorage.getItem(storageKey);
    
    if (savedBlocks) {
      try {
        const parsedBlocks = JSON.parse(savedBlocks);
        setBlocks(parsedBlocks);
      } catch (error) {
        console.error('Erro ao carregar blocos salvos:', error);
        setBlocks(defaultBlocks);
      }
    } else {
      setBlocks(defaultBlocks);
    }
  }, [styleCategory]);

  // Salvar blocos no localStorage quando mudarem
  const saveBlocks = useCallback((newBlocks: BlockData[]) => {
    const storageKey = `resultPage_blocks_${styleCategory}`;
    localStorage.setItem(storageKey, JSON.stringify(newBlocks));
    setBlocks(newBlocks);
  }, [styleCategory]);

  const updateBlocks = useCallback((newBlocks: BlockData[]) => {
    saveBlocks(newBlocks);
  }, [saveBlocks]);

  const addBlock = useCallback((blockType: BlockData['type']) => {
    const newBlock: BlockData = {
      id: generateId(),
      type: blockType,
      title: `Novo Bloco ${blockType}`,
      content: getDefaultContentForType(blockType),
      style: {
        backgroundColor: 'white',
        padding: '1.5rem',
        textAlign: 'left',
      },
      visible: true,
      order: blocks.length,
      editable: true,
    };

    const newBlocks = [...blocks, newBlock];
    saveBlocks(newBlocks);
  }, [blocks, saveBlocks]);

  const updateBlock = useCallback((blockId: string, updates: Partial<BlockData>) => {
    const newBlocks = blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    saveBlocks(newBlocks);
  }, [blocks, saveBlocks]);

  const deleteBlock = useCallback((blockId: string) => {
    const newBlocks = blocks
      .filter(block => block.id !== blockId)
      .map((block, index) => ({ ...block, order: index }));
    saveBlocks(newBlocks);
  }, [blocks, saveBlocks]);

  const reorderBlocks = useCallback((startIndex: number, endIndex: number) => {
    const result = Array.from(blocks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const reorderedBlocks = result.map((block, index) => ({ ...block, order: index }));
    saveBlocks(reorderedBlocks);
  }, [blocks, saveBlocks]);

  const addBlocksFromTemplate = useCallback((template: BlockTemplate) => {
    const newBlocks = template.blocks.map((templateBlock, index) => ({
      ...templateBlock,
      id: generateId(),
      order: blocks.length + index,
    }));

    const updatedBlocks = [...blocks, ...newBlocks];
    saveBlocks(updatedBlocks);
  }, [blocks, saveBlocks]);

  return {
    blocks: blocks.sort((a, b) => a.order - b.order),
    updateBlocks,
    addBlock,
    addBlocksFromTemplate,
    updateBlock,
    deleteBlock,
    reorderBlocks,
  };
};

// Função auxiliar para obter conteúdo padrão por tipo
function getDefaultContentForType(type: BlockData['type']) {
  switch (type) {
    case 'hero':
      return {
        title: 'Novo Título Hero',
        subtitle: 'Subtítulo do hero',
      };
    case 'text':
      return {
        title: 'Novo Título',
        description: 'Adicione seu conteúdo de texto aqui...',
      };
    case 'image':
      return {
        title: 'Nova Imagem',
        imageUrl: '/placeholder-image.jpg',
      };
    case 'cta':
      return {
        title: 'Novo Call to Action',
        description: 'Descrição do CTA',
        ctaText: 'Clique Aqui',
        ctaUrl: '#',
      };
    case 'pricing':
      return {
        title: 'Nova Oferta',
        price: 'R$ 99,90',
        regularPrice: 'R$ 199,90',
      };
    case 'testimonials':
      return {
        title: 'Depoimentos',
        description: 'Adicione um depoimento aqui...',
        userName: 'Nome do Cliente',
      };
    case 'secondary-styles':
      return {
        title: 'Seus Estilos Complementares',
        description: 'Além do seu estilo predominante, você também tem características destes estilos:',
        showPrimaryStyle: true,
        showPercentages: true,
      };
    default:
      return {
        title: `Conteúdo ${type}`,
        description: 'Adicione conteúdo personalizado...',
      };
  }
}
