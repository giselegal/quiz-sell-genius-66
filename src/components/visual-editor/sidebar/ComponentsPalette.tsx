
import React from 'react';
import { ComponentItem } from '../../unified-editor/sidebar/ComponentItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Type, 
  Image, 
  ButtonIcon, 
  Layout,
  Video,
  Star,
  ShoppingCart,
  Users,
  Clock,
  CheckCircle,
  Gift,
  Shield,
  Quote
} from 'lucide-react';

interface ComponentsPaletteProps {
  onComponentSelect: (componentType: string) => void;
  selectedComponent: string | null;
}

export const ComponentsPalette: React.FC<ComponentsPaletteProps> = ({
  onComponentSelect,
  selectedComponent
}) => {
  const componentCategories = [
    {
      title: 'Conteúdo',
      components: [
        { type: 'headline', label: 'Título', icon: Type, description: 'Título principal' },
        { type: 'text', label: 'Texto', icon: Type, description: 'Parágrafo de texto' },
        { type: 'image', label: 'Imagem', icon: Image, description: 'Imagem ou foto' },
        { type: 'video', label: 'Vídeo', icon: Video, description: 'Player de vídeo' },
      ]
    },
    {
      title: 'Interação',
      components: [
        { type: 'button', label: 'Botão', icon: ButtonIcon, description: 'Botão de ação' },
        { type: 'cta', label: 'CTA', icon: ShoppingCart, description: 'Call to Action' },
        { type: 'form', label: 'Formulário', icon: Layout, description: 'Campos de entrada' },
      ]
    },
    {
      title: 'Social Proof',
      components: [
        { type: 'testimonial', label: 'Depoimento', icon: Quote, description: 'Testemunho de cliente' },
        { type: 'rating', label: 'Avaliação', icon: Star, description: 'Estrelas de avaliação' },
        { type: 'social-proof', label: 'Prova Social', icon: Users, description: 'Números e estatísticas' },
      ]
    },
    {
      title: 'Vendas',
      components: [
        { type: 'pricing', label: 'Preço', icon: ShoppingCart, description: 'Tabela de preços' },
        { type: 'countdown', label: 'Contador', icon: Clock, description: 'Tempo limitado' },
        { type: 'guarantee', label: 'Garantia', icon: Shield, description: 'Selo de garantia' },
        { type: 'bonus', label: 'Bônus', icon: Gift, description: 'Oferta especial' },
      ]
    },
    {
      title: 'Layout',
      components: [
        { type: 'divider', label: 'Divisor', icon: Layout, description: 'Linha separadora' },
        { type: 'spacer', label: 'Espaço', icon: Layout, description: 'Espaçamento vertical' },
        { type: 'container', label: 'Container', icon: Layout, description: 'Agrupamento' },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="font-semibold text-gray-900">Componentes</h2>
        <p className="text-sm text-gray-600 mt-1">
          Arraste para adicionar ao canvas
        </p>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {componentCategories.map((category) => (
          <div key={category.title} className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              {category.title}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {category.components.map((component) => (
                <ComponentItem
                  key={component.type}
                  type={component.type}
                  label={component.label}
                  icon={component.icon}
                  description={component.description}
                  onSelect={onComponentSelect}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          💡 Arraste os componentes para o canvas para começar a editar
        </div>
      </div>
    </div>
  );
};
