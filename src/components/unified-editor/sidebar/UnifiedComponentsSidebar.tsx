import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { EditorTab } from '../UnifiedVisualEditor';
import { 
  Layout, 
  Type, 
  FileText, 
  Image, 
  CheckSquare, 
  AlertCircle,
  BarChart2,
  Columns,
  MessageCircle,
  Star,
  PanelLeft,
  ArrowRight,
  ShoppingCart,
  CreditCard,
  Tag,
  List,
  Users
} from 'lucide-react';

interface UnifiedComponentsSidebarProps {
  activeTab: EditorTab;
  onComponentSelect: (type: string) => void;
  activeStageType: string | null;
}

interface ComponentItem {
  type: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface ComponentGroup {
  title: string;
  items: ComponentItem[];
}

export const UnifiedComponentsSidebar: React.FC<UnifiedComponentsSidebarProps> = ({
  activeTab,
  onComponentSelect,
  activeStageType
}) => {
  // Get the appropriate components based on the active tab
  const getComponentsForTab = (): ComponentGroup[] => {
    switch (activeTab) {
      case 'quiz':
        return getQuizComponents();
      case 'result':
        return getResultComponents();
      case 'sales':
        return getSalesComponents();
      default:
        return [];
    }
  };

  const getQuizComponents = (): ComponentGroup[] => {
    const basicComponents: ComponentGroup = {
      title: 'Componentes Básicos',
      items: [
        {
          type: 'headline',
          name: 'Título',
          icon: <Type className="w-4 h-4" />,
          description: 'Título e subtítulo para seu quiz'
        },
        {
          type: 'text',
          name: 'Texto',
          icon: <FileText className="w-4 h-4" />,
          description: 'Bloco de texto para explicações'
        },
        {
          type: 'image',
          name: 'Imagem',
          icon: <Image className="w-4 h-4" />,
          description: 'Imagem com legenda opcional'
        }
      ]
    };

    // Quiz specific components based on stage type
    if (activeStageType === 'question') {
      return [
        {
          title: 'Componentes de Questão',
          items: [
            {
              type: 'stageQuestion',
              name: 'Questão',
              icon: <AlertCircle className="w-4 h-4" />,
              description: 'Questão principal com opções'
            },
            {
              type: 'singleChoice',
              name: 'Escolha Única',
              icon: <CheckSquare className="w-4 h-4" />,
              description: 'Questão com uma única resposta'
            },
            {
              type: 'multipleChoice',
              name: 'Múltipla Escolha',
              icon: <Columns className="w-4 h-4" />,
              description: 'Questão com várias respostas'
            }
          ]
        },
        basicComponents
      ];
    } else if (activeStageType === 'cover') {
      return [
        {
          title: 'Componentes de Capa',
          items: [
            {
              type: 'stageCover',
              name: 'Capa do Quiz',
              icon: <Layout className="w-4 h-4" />,
              description: 'Capa inicial do quiz com título e imagem'
            }
          ]
        },
        basicComponents
      ];
    } else if (activeStageType === 'result') {
      return [
        {
          title: 'Componentes de Resultado',
          items: [
            {
              type: 'stageResult',
              name: 'Resultado do Quiz',
              icon: <BarChart2 className="w-4 h-4" />,
              description: 'Mostra os resultados do quiz'
            }
          ]
        },
        basicComponents
      ];
    }

    return [basicComponents];
  };

  const getResultComponents = (): ComponentGroup[] => {
    return [
      {
        title: 'Estrutura e Layout',
        items: [
          {
            type: 'header',
            name: 'Cabeçalho',
            icon: <PanelLeft className="w-4 h-4" />,
            description: 'Cabeçalho da página de resultado'
          },
          {
            type: 'hero-section',
            name: 'Seção Hero',
            icon: <Layout className="w-4 h-4" />,
            description: 'Seção principal com título e imagem de destaque'
          },
          {
            type: 'two-column',
            name: 'Duas Colunas',
            icon: <Columns className="w-4 h-4" />,
            description: 'Layout de duas colunas para organizar conteúdo'
          },
          {
            type: 'spacer',
            name: 'Espaçador',
            icon: <Layout className="w-4 h-4" />,
            description: 'Espaço em branco para separar seções'
          }
        ]
      },
      {
        title: 'Conteúdo e Texto',
        items: [
          {
            type: 'headline',
            name: 'Título',
            icon: <Type className="w-4 h-4" />,
            description: 'Título principal com subtítulo opcional'
          },
          {
            type: 'text',
            name: 'Texto',
            icon: <FileText className="w-4 h-4" />,
            description: 'Bloco de texto formatado'
          },
          {
            type: 'image',
            name: 'Imagem',
            icon: <Image className="w-4 h-4" />,
            description: 'Imagem com legenda opcional'
          },
          {
            type: 'video',
            name: 'Vídeo',
            icon: <Image className="w-4 h-4" />,
            description: 'Player de vídeo incorporado'
          },
          {
            type: 'icon',
            name: 'Ícone',
            icon: <Star className="w-4 h-4" />,
            description: 'Ícone decorativo ou informativo'
          },
          {
            type: 'carousel',
            name: 'Carrossel',
            icon: <ArrowRight className="w-4 h-4" />,
            description: 'Carrossel de imagens ou conteúdo'
          },
          {
            type: 'animation',
            name: 'Animação',
            icon: <Star className="w-4 h-4" />,
            description: 'Elemento animado para engajamento'
          },
          {
            type: 'custom-code',
            name: 'Código Customizado',
            icon: <Type className="w-4 h-4" />,
            description: 'HTML/CSS personalizado'
          }
        ]
      },
      {
        title: 'Resultados do Quiz',
        items: [
          {
            type: 'style-result',
            name: 'Estilo Principal',
            icon: <BarChart2 className="w-4 h-4" />,
            description: 'Exibe o estilo principal identificado'
          },
          {
            type: 'secondary-styles',
            name: 'Estilos Secundários',
            icon: <BarChart2 className="w-4 h-4" />,
            description: 'Lista os estilos secundários com percentuais'
          },
          {
            type: 'antes-depois-transformacao',
            name: 'Antes e Depois',
            icon: <ArrowRight className="w-4 h-4" />,
            description: 'Galeria de transformações com antes e depois'
          }
        ]
      },
      {
        title: 'Vendas e Conversão',
        items: [
          {
            type: 'cta',
            name: 'Chamada para Ação',
            icon: <ArrowRight className="w-4 h-4" />,
            description: 'Botão de chamada para ação principal'
          },
          {
            type: 'pricing',
            name: 'Preços',
            icon: <CreditCard className="w-4 h-4" />,
            description: 'Tabela de preços e ofertas'
          },
          {
            type: 'products',
            name: 'Produtos',
            icon: <ShoppingCart className="w-4 h-4" />,
            description: 'Showcase de produtos ou serviços'
          },
          {
            type: 'benefits',
            name: 'Benefícios',
            icon: <List className="w-4 h-4" />,
            description: 'Lista de benefícios do produto'
          },
          {
            type: 'testimonials',
            name: 'Depoimentos',
            icon: <MessageCircle className="w-4 h-4" />,
            description: 'Depoimentos de clientes satisfeitos'
          },
          {
            type: 'guarantee',
            name: 'Garantia',
            icon: <Star className="w-4 h-4" />,
            description: 'Seção de garantia e segurança'
          },
          {
            type: 'faq',
            name: 'Perguntas Frequentes',
            icon: <AlertCircle className="w-4 h-4" />,
            description: 'Seção de perguntas e respostas'
          },
          {
            type: 'bonus',
            name: 'Bônus',
            icon: <Star className="w-4 h-4" />,
            description: 'Seção de bônus e benefícios extras'
          },
          {
            type: 'urgency',
            name: 'Urgência',
            icon: <AlertCircle className="w-4 h-4" />,
            description: 'Elementos de urgência e escassez'
          },
          {
            type: 'social-proof',
            name: 'Prova Social',
            icon: <Users className="w-4 h-4" />,
            description: 'Elementos de prova social e credibilidade'
          },
          {
            type: 'quiz-stats',
            name: 'Estatísticas do Quiz',
            icon: <BarChart2 className="w-4 h-4" />,
            description: 'Estatísticas detalhadas do resultado'
          },
          {
            type: 'transformation',
            name: 'Transformação',
            icon: <ArrowRight className="w-4 h-4" />,
            description: 'Histórias de transformação de clientes'
          },
          {
            type: 'countdown',
            name: 'Contagem Regressiva',
            icon: <AlertCircle className="w-4 h-4" />,
            description: 'Timer de urgência para ofertas'
          },
          {
            type: 'payment-methods',
            name: 'Formas de Pagamento',
            icon: <CreditCard className="w-4 h-4" />,
            description: 'Exibição das formas de pagamento aceitas'
          },
          {
            type: 'about-creator',
            name: 'Sobre o Criador',
            icon: <Users className="w-4 h-4" />,
            description: 'Informações sobre quem criou o conteúdo'
          },
          {
            type: 'objection-handling',
            name: 'Tratamento de Objeções',
            icon: <MessageCircle className="w-4 h-4" />,
            description: 'Respostas a possíveis objeções'
          },
          {
            type: 'value-stack',
            name: 'Pilha de Valor',
            icon: <BarChart2 className="w-4 h-4" />,
            description: 'Demonstração do valor total oferecido'
          },
          {
            type: 'pain-points',
            name: 'Pontos de Dor',
            icon: <AlertCircle className="w-4 h-4" />,
            description: 'Identificação dos problemas do público'
          },
          {
            type: 'solution',
            name: 'Solução',
            icon: <CheckSquare className="w-4 h-4" />,
            description: 'Apresentação da solução oferecida'
          },
          {
            type: 'features-benefits',
            name: 'Recursos e Benefícios',
            icon: <List className="w-4 h-4" />,
            description: 'Lista detalhada de recursos e benefícios'
          },
          {
            type: 'comparison',
            name: 'Comparação',
            icon: <Columns className="w-4 h-4" />,
            description: 'Tabela comparativa com concorrentes'
          },
          {
            type: 'risk-reversal',
            name: 'Reversão de Risco',
            icon: <Star className="w-4 h-4" />,
            description: 'Elementos que reduzem o risco da compra'
          }
        ]
      },
      {
        title: 'Componentes Básicos',
        items: [
          {
            type: 'headline',
            name: 'Título',
            icon: <Type className="w-4 h-4" />,
            description: 'Título com destaque'
          },
          {
            type: 'text',
            name: 'Texto',
            icon: <FileText className="w-4 h-4" />,
            description: 'Bloco de texto para explicações'
          },
          {
            type: 'image',
            name: 'Imagem',
            icon: <Image className="w-4 h-4" />,
            description: 'Imagem com legenda opcional'
          }
        ]
      }
    ];
  };

  const getSalesComponents = (): ComponentGroup[] => {
    return [
      {
        title: 'Estrutura Principal',
        items: [
          {
            type: 'hero',
            name: 'Seção Hero',
            icon: <Layout className="w-4 h-4" />,
            description: 'Seção principal com título e imagem'
          },
          {
            type: 'headline',
            name: 'Título',
            icon: <Type className="w-4 h-4" />,
            description: 'Título com destaque'
          },
          {
            type: 'text',
            name: 'Texto',
            icon: <FileText className="w-4 h-4" />,
            description: 'Bloco de texto para explicações'
          },
          {
            type: 'image',
            name: 'Imagem',
            icon: <Image className="w-4 h-4" />,
            description: 'Imagem com legenda opcional'
          },
          {
            type: 'video',
            name: 'Vídeo',
            icon: <Image className="w-4 h-4" />,
            description: 'Player de vídeo incorporado'
          }
        ]
      },
      {
        title: 'Produto e Oferta',
        items: [
          {
            type: 'productInfo',
            name: 'Informação do Produto',
            icon: <ShoppingCart className="w-4 h-4" />,
            description: 'Detalhes do produto ou serviço'
          },
          {
            type: 'pricing',
            name: 'Preço',
            icon: <CreditCard className="w-4 h-4" />,
            description: 'Informações de preço e pagamento'
          },
          {
            type: 'benefits',
            name: 'Benefícios',
            icon: <Star className="w-4 h-4" />,
            description: 'Lista de benefícios do produto'
          },
          {
            type: 'features-benefits',
            name: 'Recursos e Benefícios',
            icon: <List className="w-4 h-4" />,
            description: 'Lista detalhada de recursos e benefícios'
          },
          {
            type: 'value-stack',
            name: 'Pilha de Valor',
            icon: <BarChart2 className="w-4 h-4" />,
            description: 'Demonstração do valor total oferecido'
          },
          {
            type: 'bonus',
            name: 'Bônus',
            icon: <Star className="w-4 h-4" />,
            description: 'Seção de bônus e benefícios extras'
          }
        ]
      },
      {
        title: 'Conversão e Vendas',
        items: [
          {
            type: 'callToAction',
            name: 'Chamada para Ação',
            icon: <ArrowRight className="w-4 h-4" />,
            description: 'Botão de chamada para ação'
          },
          {
            type: 'cta',
            name: 'CTA Avançado',
            icon: <ArrowRight className="w-4 h-4" />,
            description: 'Botão de CTA com mais opções'
          },
          {
            type: 'countdown',
            name: 'Contagem Regressiva',
            icon: <AlertCircle className="w-4 h-4" />,
            description: 'Temporizador de urgência'
          },
          {
            type: 'urgency',
            name: 'Urgência',
            icon: <AlertCircle className="w-4 h-4" />,
            description: 'Elementos de urgência e escassez'
          },
          {
            type: 'guarantee',
            name: 'Garantia',
            icon: <Tag className="w-4 h-4" />,
            description: 'Política de garantia'
          },
          {
            type: 'risk-reversal',
            name: 'Reversão de Risco',
            icon: <Star className="w-4 h-4" />,
            description: 'Elementos que reduzem o risco da compra'
          },
          {
            type: 'payment-methods',
            name: 'Formas de Pagamento',
            icon: <CreditCard className="w-4 h-4" />,
            description: 'Exibição das formas de pagamento aceitas'
          }
        ]
      },
      {
        title: 'Credibilidade',
        items: [
          {
            type: 'testimonials',
            name: 'Depoimentos',
            icon: <MessageCircle className="w-4 h-4" />,
            description: 'Depoimentos de clientes'
          },
          {
            type: 'socialProof',
            name: 'Prova Social',
            icon: <Users className="w-4 h-4" />,
            description: 'Prova social para aumentar confiança'
          },
          {
            type: 'social-proof',
            name: 'Prova Social Avançada',
            icon: <Users className="w-4 h-4" />,
            description: 'Elementos de prova social e credibilidade'
          },
          {
            type: 'about-creator',
            name: 'Sobre o Criador',
            icon: <Users className="w-4 h-4" />,
            description: 'Informações sobre quem criou o conteúdo'
          },
          {
            type: 'transformation',
            name: 'Transformação',
            icon: <ArrowRight className="w-4 h-4" />,
            description: 'Histórias de transformação de clientes'
          }
        ]
      },
      {
        title: 'Suporte e Informações',
        items: [
          {
            type: 'faq',
            name: 'Perguntas Frequentes',
            icon: <AlertCircle className="w-4 h-4" />,
            description: 'Seção de perguntas frequentes'
          },
          {
            type: 'objection-handling',
            name: 'Tratamento de Objeções',
            icon: <MessageCircle className="w-4 h-4" />,
            description: 'Respostas a possíveis objeções'
          },
          {
            type: 'pain-points',
            name: 'Pontos de Dor',
            icon: <AlertCircle className="w-4 h-4" />,
            description: 'Identificação dos problemas do público'
          },
          {
            type: 'solution',
            name: 'Solução',
            icon: <CheckSquare className="w-4 h-4" />,
            description: 'Apresentação da solução oferecida'
          },
          {
            type: 'comparison',
            name: 'Comparação',
            icon: <Columns className="w-4 h-4" />,
            description: 'Tabela comparativa com concorrentes'
          },
          {
            type: 'featureList',
            name: 'Lista de Recursos',
            icon: <List className="w-4 h-4" />,
            description: 'Lista de recursos ou características'
          }
        ]
      }
    ];
  };

  const components = getComponentsForTab();

  return (
    <div className="h-full flex flex-col border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-[#432818]">Componentes</h2>
        <p className="text-sm text-gray-500 mt-1">
          Arraste ou clique para adicionar à página
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {components.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h3 className="text-sm font-medium mb-3 text-gray-700">{group.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {group.items.map((item) => (
                  <Button
                    key={item.type}
                    variant="outline"
                    className="flex flex-col h-auto py-3 px-2 items-center justify-center text-center hover:bg-[#B89B7A]/10 hover:border-[#B89B7A]"
                    onClick={() => onComponentSelect(item.type)}
                  >
                    <div className="mb-1.5 text-[#B89B7A]">{item.icon}</div>
                    <span className="text-xs font-medium mb-1">{item.name}</span>
                    <p className="text-[10px] text-gray-500 leading-tight">{item.description}</p>
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {activeTab === 'quiz' && !activeStageType && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <AlertCircle className="w-8 h-8 mb-2 text-amber-500 opacity-80" />
              <p className="text-sm text-gray-600 mb-1">
                Selecione uma etapa do quiz para visualizar os componentes disponíveis.
              </p>
              <p className="text-xs text-gray-500">
                Cada tipo de etapa tem componentes específicos.
              </p>
            </div>
          )}
          
          {components.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <AlertCircle className="w-8 h-8 mb-2 text-amber-500 opacity-80" />
              <p className="text-sm text-gray-600">
                Nenhum componente disponível para esta seção.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
