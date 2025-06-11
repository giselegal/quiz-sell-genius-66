
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Image, 
  Award, 
  Heart, 
  ShoppingCart, 
  Users, 
  Shield, 
  Star,
  Crown,
  Zap,
  User,
  ArrowRight
} from 'lucide-react';
import { ResultPageBlockType } from '@/types/resultPageBlocks';
import { StyleResult } from '@/types/quiz';

interface ResultPageSidebarProps {
  onComponentAdd: (type: ResultPageBlockType) => void;
  primaryStyle: StyleResult;
}

const RESULT_PAGE_COMPONENTS = [
  {
    type: 'result-header' as ResultPageBlockType,
    name: 'Cabeçalho Resultado',
    icon: User,
    description: 'Seção com nome do usuário e estilo predominante',
    category: 'Resultado'
  },
  {
    type: 'transition' as ResultPageBlockType,
    name: 'Seção Transição',
    icon: ArrowRight,
    description: 'Seção de transição motivacional',
    category: 'Educacional'
  },
  {
    type: 'final-cta' as ResultPageBlockType,
    name: 'CTA Final',
    icon: ShoppingCart,
    description: 'Call-to-action final com produtos e ofertas',
    category: 'Conversão'
  },
  {
    type: 'header' as ResultPageBlockType,
    name: 'Cabeçalho',
    icon: Crown,
    description: 'Logo e navegação do site',
    category: 'Estrutura'
  },
  {
    type: 'styleResult' as ResultPageBlockType,
    name: 'Resultado do Estilo',
    icon: Star,
    description: 'Mostra o estilo predominante descoberto',
    category: 'Resultado'
  },
  {
    type: 'transformation' as ResultPageBlockType,
    name: 'Transformações',
    icon: Zap,
    description: 'Galeria de antes e depois',
    category: 'Social Proof'
  },
  {
    type: 'motivation' as ResultPageBlockType,
    name: 'Motivação',
    icon: Heart,
    description: 'Por que aplicar o estilo é importante',
    category: 'Educacional'
  },
  {
    type: 'bonus' as ResultPageBlockType,
    name: 'Bônus',
    icon: Award,
    description: 'Produtos e bônus inclusos',
    category: 'Oferta'
  },
  {
    type: 'testimonials' as ResultPageBlockType,
    name: 'Depoimentos',
    icon: Users,
    description: 'Testemunhos de clientes satisfeitas',
    category: 'Social Proof'
  },
  {
    type: 'guarantee' as ResultPageBlockType,
    name: 'Garantia',
    icon: Shield,
    description: 'Garantia de satisfação ou dinheiro de volta',
    category: 'Segurança'
  },
  {
    type: 'mentor' as ResultPageBlockType,
    name: 'Mentora',
    icon: Users,
    description: 'Apresentação da consultora Gisele',
    category: 'Autoridade'
  },
  {
    type: 'cta' as ResultPageBlockType,
    name: 'Chamada para Ação',
    icon: ShoppingCart,
    description: 'Botão principal de conversão',
    category: 'Conversão'
  },
  {
    type: 'footer' as ResultPageBlockType,
    name: 'Rodapé',
    icon: Type,
    description: 'Links legais e informações da empresa',
    category: 'Estrutura'
  }
];

const CATEGORIES = [
  { id: 'Resultado', name: 'Resultado', color: 'bg-purple-100 text-purple-800' },
  { id: 'Educacional', name: 'Educacional', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'Conversão', name: 'Conversão', color: 'bg-red-100 text-red-800' },
  { id: 'Estrutura', name: 'Estrutura', color: 'bg-blue-100 text-blue-800' },
  { id: 'Social Proof', name: 'Social Proof', color: 'bg-green-100 text-green-800' },
  { id: 'Oferta', name: 'Oferta', color: 'bg-orange-100 text-orange-800' },
  { id: 'Segurança', name: 'Segurança', color: 'bg-gray-100 text-gray-800' },
  { id: 'Autoridade', name: 'Autoridade', color: 'bg-indigo-100 text-indigo-800' }
];

export const ResultPageSidebar: React.FC<ResultPageSidebarProps> = ({
  onComponentAdd,
  primaryStyle
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-2">Componentes da Página de Resultado</h2>
        <p className="text-sm text-gray-600">
          Estilo: <span className="font-medium text-[#B89B7A]">{primaryStyle.category}</span>
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {CATEGORIES.map(category => {
          const categoryComponents = RESULT_PAGE_COMPONENTS.filter(
            comp => comp.category === category.id
          );
          
          if (categoryComponents.length === 0) return null;
          
          return (
            <div key={category.id} className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                  {category.name}
                </span>
              </div>
              
              <div className="space-y-2">
                {categoryComponents.map(component => {
                  const IconComponent = component.icon;
                  return (
                    <Card 
                      key={component.type}
                      className="p-3 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-[#B89B7A]"
                      onClick={() => onComponentAdd(component.type)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#B89B7A]/10 rounded-lg">
                          <IconComponent className="w-4 h-4 text-[#B89B7A]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 mb-1">
                            {component.name}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {component.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600 text-center">
          <p className="mb-1">Arraste os componentes para o canvas</p>
          <p>para construir sua página de resultado</p>
        </div>
      </div>
    </div>
  );
};
