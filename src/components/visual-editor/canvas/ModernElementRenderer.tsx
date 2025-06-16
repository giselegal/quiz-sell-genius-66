
import React from 'react';
import { EditorElement } from '@/hooks/useModernEditor';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trash2, MoveUp, MoveDown, Eye, Edit3 } from 'lucide-react';

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
  const renderElementContent = () => {
    const { type, content } = element;

    switch (type) {
      // Componentes da Marca
      case 'brand-header':
        return (
          <div className="w-full bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] text-white py-8">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-2">
                {content?.title || 'Descubra Seu Estilo Único'}
              </h1>
              <p className="text-lg opacity-90">
                {content?.subtitle || 'Quiz desenvolvido pela especialista Gisele Galvão'}
              </p>
            </div>
          </div>
        );

      case 'brand-logo':
        return (
          <div className="flex justify-center py-6">
            <div className="w-32 h-32 bg-gradient-to-br from-[#B89B7A] to-[#8F7A6A] rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold font-['Playfair_Display']">GG</span>
            </div>
          </div>
        );

      case 'brand-divider':
        return (
          <div className="flex justify-center py-6">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#B89B7A] to-transparent rounded-full"></div>
          </div>
        );

      // Componentes do Quiz Intro
      case 'quiz-hero-title':
        return (
          <div className="text-center py-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] bg-clip-text text-transparent leading-tight">
              {content?.title || 'Qual é o Seu Estilo Único?'}
            </h1>
          </div>
        );

      case 'quiz-hero-image':
        return (
          <div className="flex justify-center py-8">
            <div className="relative">
              <img 
                src={content?.imageUrl || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp'}
                alt={content?.alt || 'Quiz de Estilo'}
                className="w-full max-w-md rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        );

      case 'quiz-description':
        return (
          <div className="text-center py-6 max-w-2xl mx-auto">
            <p className="text-lg text-[#432818] leading-relaxed">
              {content?.text || 'Responda algumas perguntas e descubra qual estilo combina perfeitamente com sua personalidade e lifestyle. Um quiz rápido e divertido que vai transformar sua forma de se vestir!'}
            </p>
          </div>
        );

      case 'quiz-form':
        return (
          <div className="max-w-md mx-auto">
            <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-[#432818] font-medium mb-2">
                    Como você gostaria de ser chamada?
                  </label>
                  <Input 
                    placeholder="Digite seu primeiro nome"
                    className="border-[#B89B7A]/30 focus:border-[#B89B7A] h-12"
                  />
                </div>
                
                <Button className="w-full h-12 bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] hover:from-[#8F7A6A] hover:to-[#B89B7A] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
                  Começar o Quiz
                </Button>
                
                <p className="text-xs text-center text-[#432818]/70">
                  ⚡ Leva apenas 3 minutos • 100% gratuito
                </p>
              </div>
            </Card>
          </div>
        );

      case 'quiz-input':
        return (
          <div className="max-w-md mx-auto">
            <label className="block text-[#432818] font-medium mb-2">
              {content?.label || 'Nome'}
            </label>
            <Input 
              placeholder={content?.placeholder || 'Digite aqui...'}
              className="border-[#B89B7A]/30 focus:border-[#B89B7A] h-12"
            />
          </div>
        );

      case 'quiz-button':
        return (
          <div className="text-center">
            <Button className="px-8 py-3 bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] hover:from-[#8F7A6A] hover:to-[#B89B7A] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
              {content?.text || 'Começar Quiz'}
            </Button>
          </div>
        );

      // Componentes de Questões
      case 'question-header':
        return (
          <div className="w-full bg-white border-b border-[#B89B7A]/20 sticky top-0 z-10">
            <div className="max-w-4xl mx-auto py-4 px-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#B89B7A] to-[#8F7A6A] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">GG</span>
                </div>
                <span className="text-[#432818] font-medium">Quiz de Estilo</span>
              </div>
              <Badge variant="outline" className="text-[#B89B7A] border-[#B89B7A]">
                {content?.currentQuestion || 1} de {content?.totalQuestions || 17}
              </Badge>
            </div>
          </div>
        );

      case 'progress-bar':
        return (
          <div className="w-full py-4 px-4">
            <div className="max-w-4xl mx-auto">
              <Progress 
                value={content?.progress || 25} 
                className="h-2 bg-[#B89B7A]/20"
              />
              <p className="text-center text-sm text-[#432818]/70 mt-2">
                {content?.progress || 25}% concluído
              </p>
            </div>
          </div>
        );

      case 'question-title':
        return (
          <div className="text-center py-8 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] text-[#432818] leading-tight">
              {content?.title || 'Qual dessas opções mais combina com você?'}
            </h2>
          </div>
        );

      case 'question-options-grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
            {[1, 2, 3, 4].map(index => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-[#B89B7A]">
                <div className="aspect-square bg-gradient-to-br from-[#FAF9F7] to-[#F5F3F0] flex items-center justify-center">
                  <span className="text-6xl opacity-30">👗</span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-[#432818] text-center font-medium group-hover:text-[#B89B7A] transition-colors">
                    Opção {index}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        );

      case 'question-option-card':
        return (
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-[#B89B7A]">
            <div className="aspect-square bg-gradient-to-br from-[#FAF9F7] to-[#F5F3F0] flex items-center justify-center">
              <img 
                src={content?.imageUrl || 'https://via.placeholder.com/300x300'}
                alt={content?.text || 'Opção'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-[#432818] text-center font-medium group-hover:text-[#B89B7A] transition-colors">
                {content?.text || 'Opção de escolha'}
              </p>
            </div>
          </Card>
        );

      // Componentes de Transição
      case 'transition-hero':
        return (
          <div className="text-center py-16 bg-gradient-to-br from-[#FAF9F7] to-[#F5F3F0]">
            <div className="max-w-2xl mx-auto px-4">
              <div className="text-6xl mb-6">✨</div>
              <h2 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] text-[#432818] mb-4">
                {content?.title || 'Perfeito! Agora vamos conhecer você melhor...'}
              </h2>
              <p className="text-lg text-[#432818]/80">
                {content?.subtitle || 'Algumas perguntas estratégicas para personalizar ainda mais seu resultado'}
              </p>
            </div>
          </div>
        );

      case 'transition-continue':
        return (
          <div className="text-center py-8">
            <Button className="px-8 py-3 bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] hover:from-[#8F7A6A] hover:to-[#B89B7A] text-white font-semibold rounded-lg">
              {content?.text || 'Continuar →'}
            </Button>
          </div>
        );

      // Componentes do Resultado
      case 'result-hero':
        return (
          <div className="text-center py-16 bg-gradient-to-br from-[#B89B7A]/10 to-[#8F7A6A]/10">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] bg-clip-text text-transparent mb-4">
                {content?.title || 'Parabéns! Descobrimos seu estilo!'}
              </h1>
              <p className="text-xl text-[#432818]/80">
                {content?.subtitle || 'Aqui está sua análise personalizada completa'}
              </p>
            </div>
          </div>
        );

      case 'result-title':
        return (
          <div className="text-center py-8">
            <h2 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] text-[#432818] mb-2">
              {content?.title || 'Seu Estilo é: Elegante'}
            </h2>
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] text-white rounded-full">
              <span className="font-semibold">{content?.styleType || 'Elegante'}</span>
            </div>
          </div>
        );

      case 'result-subtitle':
        return (
          <div className="text-center py-6 max-w-3xl mx-auto">
            <p className="text-lg text-[#432818] leading-relaxed">
              {content?.text || 'Você possui um estilo sofisticado e refinado, priorizando qualidade, elegância e peças atemporais que transmitem confiança e bom gosto.'}
            </p>
          </div>
        );

      // Componentes de Oferta
      case 'offer-section':
        return (
          <div className="py-16 bg-gradient-to-br from-[#FAF9F7] to-[#F5F3F0]">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] text-[#432818] mb-6">
                {content?.title || 'Transforme Seu Estilo Hoje Mesmo'}
              </h2>
              <p className="text-lg text-[#432818]/80 mb-8">
                {content?.subtitle || 'Guias completos personalizados para seu estilo único'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {['Guia Completo', 'Análise Personal', 'Suporte 30 dias'].map((benefit, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2">
                    <div className="w-6 h-6 bg-[#B89B7A] text-white rounded-full flex items-center justify-center text-sm">✓</div>
                    <span className="text-[#432818] font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'price-highlight':
        return (
          <div className="text-center py-8">
            <div className="inline-block bg-white rounded-2xl shadow-xl p-8 border-2 border-[#B89B7A]/20">
              <div className="text-sm text-[#432818]/60 line-through mb-2">
                De: R$ {content?.originalPrice || '497,00'}
              </div>
              <div className="text-4xl font-bold text-[#B89B7A] mb-2">
                R$ {content?.currentPrice || '97,00'}
              </div>
              <div className="text-sm text-[#432818]/80">
                {content?.installments || 'ou 3x de R$ 32,33'}
              </div>
            </div>
          </div>
        );

      case 'cta-button':
        return (
          <div className="text-center py-8">
            <Button className="px-12 py-4 text-lg bg-gradient-to-r from-[#B89B7A] to-[#8F7A6A] hover:from-[#8F7A6A] hover:to-[#B89B7A] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.05] shadow-lg">
              {content?.text || 'Quero Meu Guia Agora! 🛍️'}
            </Button>
            <p className="text-sm text-[#432818]/60 mt-3">
              {content?.guarantee || '✅ Garantia de 7 dias • Pagamento 100% seguro'}
            </p>
          </div>
        );

      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 text-center">
              Componente: {type}
              <br />
              <small>Clique para editar</small>
            </p>
          </div>
        );
    }
  };

  if (isPreviewMode) {
    return <div className="w-full">{renderElementContent()}</div>;
  }

  return (
    <div
      className={cn(
        "relative group w-full",
        isSelected && "ring-2 ring-blue-500 ring-offset-2"
      )}
      onClick={onSelect}
    >
      {renderElementContent()}
      
      {isSelected && (
        <div className="absolute top-2 right-2 flex space-x-1 bg-white rounded-lg shadow-lg border p-1 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onMoveUp();
            }}
            disabled={!canMoveUp}
            className="h-8 w-8 p-0"
          >
            <MoveUp className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onMoveDown();
            }}
            disabled={!canMoveDown}
            className="h-8 w-8 p-0"
          >
            <MoveDown className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Abrir painel de edição
            }}
            className="h-8 w-8 p-0"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
