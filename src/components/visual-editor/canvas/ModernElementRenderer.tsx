
import React, { useState } from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Trash2, 
  Copy, 
  ArrowUp, 
  ArrowDown,
  Edit,
  Settings
} from 'lucide-react';

interface ModernElementRendererProps {
  element: EditorElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<EditorElement>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export const ModernElementRenderer: React.FC<ModernElementRendererProps> = ({
  element,
  isSelected,
  isPreviewMode,
  onSelect,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (element.visible === false && !isSelected) {
    return null;
  }

  const handleContentChange = (newContent: any) => {
    onUpdate({ content: { ...element.content, ...newContent } });
  };

  const handleStyleChange = (newStyle: any) => {
    onUpdate({ style: { ...element.style, ...newStyle } });
  };

  const renderElementContent = () => {
    switch (element.type) {
      case 'brand-header':
        return (
          <header style={element.style} className="w-full">
            <div className="container mx-auto max-w-lg">
              {element.content.text || 'Header da Marca'}
            </div>
          </header>
        );

      case 'brand-logo':
        return (
          <div className="flex flex-col items-center">
            <img 
              src={element.content.image || 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_120,h_50,c_fit/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'} 
              alt={element.content.alt || 'Logo'}
              style={element.style}
              className="object-contain"
            />
          </div>
        );

      case 'brand-divider':
        return (
          <div style={element.style} className="mx-auto"></div>
        );

      case 'quiz-hero-title':
        return (
          <h1 style={element.style} className="px-2">
            <span className="text-[#B89B7A]">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com{' '}
            <span className="text-[#B89B7A]">Você</span>.
          </h1>
        );

      case 'quiz-hero-image':
        return (
          <div className="w-full flex justify-center">
            <div style={element.style} className="overflow-hidden bg-[#F8F5F0]">
              <img 
                src={element.content.image || 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_85,w_300,c_limit/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp'} 
                alt={element.content.alt || 'Imagem do quiz'}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        );

      case 'quiz-description':
        return (
          <p style={element.style}>
            Em poucos minutos, descubra seu{' '}
            <span className="font-semibold text-[#B89B7A]">
              Estilo Predominante
            </span>{' '}
            — e aprenda a montar looks que realmente refletem sua{' '}
            <span className="font-semibold text-[#432818]">
              essência
            </span>, com
            praticidade e{' '}
            <span className="font-semibold text-[#432818]">
              confiança
            </span>.
          </p>
        );

      case 'quiz-form':
        return (
          <div style={element.style}>
            <form className="w-full space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[#432818] mb-1.5">
                  NOME <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  className="w-full p-2.5 bg-[#FEFEFE] rounded-md border-2 border-[#B89B7A] focus:ring-2 focus:ring-[#A1835D] focus:ring-offset-2"
                />
              </div>
              <button
                type="button"
                className="w-full py-3 px-4 text-sm font-semibold rounded-md shadow-md bg-[#B89B7A] text-white hover:bg-[#A1835D] transition-all duration-300"
              >
                Quero Descobrir meu Estilo Agora!
              </button>
            </form>
          </div>
        );

      case 'quiz-input':
        return (
          <div>
            <label className="block text-xs font-semibold text-[#432818] mb-1.5">
              {element.content.label || 'NOME'} <span className="text-red-500">*</span>
            </label>
            <input
              style={element.style}
              type="text"
              placeholder={element.content.placeholder || 'Digite seu nome'}
              className="focus:ring-2 focus:ring-[#A1835D] focus:ring-offset-2 focus:outline-none"
            />
          </div>
        );

      case 'quiz-button':
        return (
          <button style={element.style} className="hover:bg-[#A1835D] hover:shadow-lg transform hover:scale-[1.01]">
            {element.content.text || 'Botão'}
          </button>
        );

      case 'question-header':
        return (
          <header style={element.style}>
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <img 
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_80,h_32,c_fit/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                  alt="Logo"
                  className="h-8"
                />
                <span className="text-sm text-gray-600">Questão 2 de 8</span>
              </div>
            </div>
          </header>
        );

      case 'progress-bar':
        return (
          <div style={element.style}>
            <div 
              className="h-full bg-[#B89B7A] rounded-full transition-all duration-300"
              style={{ width: `${element.content.progress || 25}%` }}
            ></div>
          </div>
        );

      case 'question-title':
        return (
          <h2 style={element.style}>
            {element.content.text || 'Qual dessas opções mais combina com você?'}
          </h2>
        );

      case 'question-options-grid':
        return (
          <div style={element.style}>
            {/* Grid será renderizado pelos question-option-card individuais */}
          </div>
        );

      case 'question-option-card':
        return (
          <div 
            style={element.style}
            className="hover:shadow-lg hover:border-[#B89B7A] hover:bg-[#FAF9F7] group"
          >
            {element.content.image && (
              <img 
                src={element.content.image} 
                alt={element.content.text}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            )}
            <h3 className="font-medium text-[#432818] group-hover:text-[#B89B7A] transition-colors">
              {element.content.text || 'Opção de Resposta'}
            </h3>
            {element.content.description && (
              <p className="text-sm text-gray-600 mt-2">{element.content.description}</p>
            )}
          </div>
        );

      case 'result-hero':
        return (
          <section style={element.style}>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4 font-playfair">
                Seu Estilo: Elegante
              </h1>
              <p className="text-xl opacity-90">
                Você tem um gosto refinado e sofisticado que se reflete em suas escolhas de moda.
              </p>
            </div>
          </section>
        );

      case 'result-title':
        return (
          <h2 style={element.style}>
            {element.content.text || 'Seu Estilo: Elegante'}
          </h2>
        );

      case 'result-subtitle':
        return (
          <p style={element.style}>
            {element.content.text || 'Você tem um gosto refinado e sofisticado.'}
          </p>
        );

      case 'offer-section':
        return (
          <section style={element.style}>
            <h3 className="text-2xl font-bold text-[#432818] mb-4 font-playfair">
              Transforme Seu Guarda-Roupa
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Consultoria personalizada baseada no seu estilo único
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-left">
                <h4 className="font-semibold text-[#432818] mb-2">O que você vai receber:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-[#B89B7A] mr-2">✓</span>
                    Análise completa do seu estilo
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#B89B7A] mr-2">✓</span>
                    Consultoria personalizada
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#B89B7A] mr-2">✓</span>
                    Guia de compras exclusivo
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">R$ 247</div>
                <div className="text-lg line-through text-gray-500">R$ 497</div>
                <div className="text-sm text-red-600 font-semibold">50% OFF por tempo limitado</div>
              </div>
            </div>
          </section>
        );

      case 'price-highlight':
        return (
          <div className="text-center">
            {element.content.original_price && (
              <div className="text-lg line-through text-gray-500 mb-2">
                {element.content.original_price}
              </div>
            )}
            <div style={element.style}>
              {element.content.text || 'R$ 247'}
            </div>
            {element.content.discount && (
              <div className="text-lg text-red-600 font-semibold mt-2">
                {element.content.discount}
              </div>
            )}
          </div>
        );

      case 'cta-button':
        return (
          <div className="text-center">
            <button 
              style={element.style}
              className="hover:bg-[#8F7A6A] hover:shadow-xl hover:scale-105 active:scale-95"
            >
              {element.content.text || 'Garantir Minha Vaga Agora'}
            </button>
          </div>
        );

      default:
        return (
          <div style={element.style} className="p-4 border-2 border-dashed border-gray-300 rounded">
            <p className="text-gray-500 text-center">
              Componente: {element.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div 
      className={`relative group transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${element.visible === false ? 'opacity-50' : ''} ${
        element.locked ? 'pointer-events-none' : ''
      }`}
      onClick={onSelect}
    >
      <div className={element.locked ? 'opacity-60' : ''}>
        {renderElementContent()}
      </div>

      {!isPreviewMode && isSelected && (
        <div className="absolute -top-10 left-0 right-0 flex items-center justify-between bg-white border rounded-lg shadow-lg p-2 z-10">
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onUpdate({ visible: !element.visible });
              }}
            >
              {element.visible !== false ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onUpdate({ locked: !element.locked });
              }}
            >
              {element.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              disabled={!canMoveUp}
            >
              <ArrowUp className="h-3 w-3" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              disabled={!canMoveDown}
            >
              <ArrowDown className="h-3 w-3" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {element.locked && !isPreviewMode && (
        <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded">
          <Lock className="h-3 w-3" />
        </div>
      )}
    </div>
  );
};
