
import React from 'react';
import { ComponentItem } from './ComponentItem';
import { QuizComponentType } from '@/types/quizBuilder';
import { 
  Type, 
  Image, 
  CheckSquare, 
  Star, 
  Layout,
  Palette,
  Gift,
  Shield,
  DollarSign,
  Users,
  Play,
  Code,
  Grid,
  Separator
} from 'lucide-react';

interface UnifiedComponentsSidebarProps {
  onComponentSelect: (type: QuizComponentType) => void;
  activeTab: 'quiz' | 'result' | 'sales';
  activeStageType: string | null;
}

const quizComponents = [
  { type: 'header' as QuizComponentType, label: 'Cabeçalho', icon: <Layout />, description: 'Título e descrição da página' },
  { type: 'text' as QuizComponentType, label: 'Texto', icon: <Type />, description: 'Bloco de texto simples' },
  { type: 'image' as QuizComponentType, label: 'Imagem', icon: <Image />, description: 'Imagem com opções de estilo' },
  { type: 'multipleChoice' as QuizComponentType, label: 'Múltipla Escolha', icon: <CheckSquare />, description: 'Pergunta com múltiplas opções' },
  { type: 'result' as QuizComponentType, label: 'Resultado', icon: <Star />, description: 'Exibição do resultado do quiz' }
];

const resultComponents = [
  { type: 'header' as QuizComponentType, label: 'Cabeçalho', icon: <Layout />, description: 'Título e descrição da página' },
  { type: 'styleDescription' as QuizComponentType, label: 'Descrição do Estilo', icon: <Palette />, description: 'Descrição detalhada do estilo' },
  { type: 'image' as QuizComponentType, label: 'Imagem', icon: <Image />, description: 'Imagem decorativa' },
  { type: 'text' as QuizComponentType, label: 'Texto', icon: <Type />, description: 'Bloco de texto personalizado' },
  { type: 'secondaryStyles' as QuizComponentType, label: 'Estilos Secundários', icon: <Grid />, description: 'Grid de estilos relacionados' },
  { type: 'cta' as QuizComponentType, label: 'Call to Action', icon: <Star />, description: 'Botão de ação principal' },
  { type: 'spacer' as QuizComponentType, label: 'Espaçador', icon: <Separator />, description: 'Espaço em branco' }
];

const salesComponents = [
  { type: 'hero' as QuizComponentType, label: 'Hero Section', icon: <Layout />, description: 'Seção principal da página' },
  { type: 'benefits' as QuizComponentType, label: 'Benefícios', icon: <Gift />, description: 'Lista de benefícios do produto' },
  { type: 'pricing' as QuizComponentType, label: 'Preços', icon: <DollarSign />, description: 'Seção de preços e ofertas' },
  { type: 'testimonials' as QuizComponentType, label: 'Depoimentos', icon: <Users />, description: 'Depoimentos de clientes' },
  { type: 'guarantee' as QuizComponentType, label: 'Garantia', icon: <Shield />, description: 'Seção de garantia' },
  { type: 'video' as QuizComponentType, label: 'Vídeo', icon: <Play />, description: 'Player de vídeo' },
  { type: 'customCode' as QuizComponentType, label: 'Código Personalizado', icon: <Code />, description: 'HTML/CSS personalizado' }
];

export const UnifiedComponentsSidebar: React.FC<UnifiedComponentsSidebarProps> = ({
  onComponentSelect,
  activeTab,
  activeStageType
}) => {
  const getComponentsForTab = () => {
    switch (activeTab) {
      case 'quiz':
        return quizComponents;
      case 'result':
        return resultComponents;
      case 'sales':
        return salesComponents;
      default:
        return [];
    }
  };

  const components = getComponentsForTab();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium text-[#432818]">
          Componentes {activeTab === 'quiz' ? 'do Quiz' : activeTab === 'result' ? 'de Resultado' : 'de Vendas'}
        </h3>
        <p className="text-sm text-[#8F7A6A] mt-1">
          Arraste e solte os componentes para construir sua página
        </p>
      </div>
      
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {components.map((component) => (
          <ComponentItem
            key={component.type}
            type={component.type}
            label={component.label}
            icon={component.icon}
            description={component.description}
            onSelect={onComponentSelect}
            isActive={false}
          />
        ))}
        
        {components.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#8F7A6A] text-sm">
              Nenhum componente disponível para esta aba.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
