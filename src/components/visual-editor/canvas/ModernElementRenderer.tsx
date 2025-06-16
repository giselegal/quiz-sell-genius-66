
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ArrowUp, ArrowDown, Edit, Trash2 } from 'lucide-react';
import { EditorElement } from '@/hooks/useModernEditor';

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
  const renderElement = () => {
    switch (element.type) {
      // Brand Elements
      case 'brand-header':
        return (
          <div className="w-full bg-gradient-to-r from-[#8F7A6A] to-[#B89B7A] p-4 text-center">
            <div className="max-w-24 mx-auto">
              <img 
                src="https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png" 
                alt="Logo" 
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
            </div>
            <Progress value={30} className="w-full mt-4 h-2 bg-zinc-300" />
          </div>
        );

      case 'brand-logo':
        return (
          <div className="flex justify-center p-4">
            <img 
              src="https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png" 
              alt="Logo" 
              className="w-24 h-24 object-cover"
            />
          </div>
        );

      case 'brand-divider':
        return <hr className="border-[#B89B7A] border-2 my-6" />;

      // Quiz Intro Elements
      case 'quiz-hero-title':
        return (
          <h1 className="text-4xl md:text-5xl font-bold text-[#432818] text-center mb-8 font-playfair">
            {element.content.title || 'Descubra Seu Estilo Único'}
          </h1>
        );

      case 'quiz-hero-image':
        return (
          <div className="w-full max-w-md mx-auto mb-8">
            <img 
              src={element.content.imageUrl || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744734906/1_ntzpey.webp'} 
              alt="Quiz Hero" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        );

      case 'quiz-description':
        return (
          <p className="text-lg text-[#8F7A6A] text-center mb-8 leading-relaxed">
            {element.content.description || 'Responda às perguntas e descobriremos qual é o seu estilo único de se vestir.'}
          </p>
        );

      case 'quiz-form':
        return (
          <div className="max-w-md mx-auto space-y-4">
            <Input 
              placeholder="Digite seu nome" 
              className="text-center text-lg py-6 border-[#B89B7A] focus:border-[#8F7A6A]"
            />
            <Button className="w-full py-6 text-lg bg-gradient-to-r from-[#8F7A6A] to-[#B89B7A] hover:from-[#7A6B5B] hover:to-[#A68B6B] text-white font-semibold rounded-lg shadow-lg transform transition hover:scale-105">
              Começar o Quiz
            </Button>
          </div>
        );

      case 'quiz-input':
        return (
          <Input 
            placeholder="Digite seu nome" 
            className="max-w-md mx-auto text-center text-lg py-6 border-[#B89B7A] focus:border-[#8F7A6A]"
          />
        );

      case 'quiz-button':
        return (
          <Button className="w-full max-w-md mx-auto py-6 text-lg bg-gradient-to-r from-[#8F7A6A] to-[#B89B7A] hover:from-[#7A6B5B] hover:to-[#A68B6B] text-white font-semibold rounded-lg shadow-lg transform transition hover:scale-105">
            {element.content.text || 'Começar o Quiz'}
          </Button>
        );

      // Question Elements
      case 'question-header':
        return (
          <div className="w-full bg-gradient-to-r from-[#8F7A6A] to-[#B89B7A] p-4 text-center">
            <div className="flex flex-row w-full h-auto justify-center relative">
              <Button className="absolute left-0 h-10 w-10 ghost hover:bg-primary hover:text-foreground">
                ←
              </Button>
              <div className="flex flex-col w-full justify-start items-center gap-4">
                <img 
                  width="96" 
                  height="96" 
                  className="max-w-24 object-cover" 
                  alt="Logo" 
                  src="https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png"
                />
                <Progress value={30} className="w-full h-2 bg-zinc-300" />
              </div>
            </div>
          </div>
        );

      case 'progress-bar':
        return (
          <Progress 
            value={element.content.progress || 30} 
            className="w-full h-2 bg-zinc-300 mb-6" 
          />
        );

      case 'question-title':
        return (
          <h1 className="text-3xl font-bold text-center mb-8 text-[#432818]">
            {element.content.title || '1- Como você define o seu jeito de Ser?'}
          </h1>
        );

      case 'question-options-grid':
        return (
          <div className="flex flex-col items-start justify-start gap-2 w-full">
            {[
              'A) Sou espontânea e descontraída, adoro coisas simples.',
              'B) Gosto de organização, sou uma pessoa séria e conservadora.',
              'C) Sou prática e objetiva, valorizo a funcionalidade.',
              'D) Sou exigente e sofisticada, cuidadosa nas minhas escolhas.',
              'E) Tenho um lado delicado e sensível que transparece em tudo.',
              'F) Sou confiante e sensual e adoro me cuidar.',
              'G) Sou moderna e audaciosa, tenho presença.',
              'H) Sou exótica e aventureira, gosto da liberdade.'
            ].map((option, index) => (
              <button
                key={index}
                className="option border-zinc-200 bg-background hover:bg-primary hover:text-foreground h-auto px-4 hover:shadow-2xl overflow-hidden min-w-full gap-2 flex py-8 flex-row items-center justify-between border drop-shadow-none rounded-md transition-colors"
              >
                <div className="py-2 px-4 w-full flex flex-row text-base items-center text-full-primary justify-between">
                  <div className="break-words w-full text-left">
                    <p>{option}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      case 'question-option-card':
        return (
          <button className="option border-zinc-200 bg-background hover:bg-primary hover:text-foreground h-auto px-4 hover:shadow-2xl overflow-hidden min-w-full gap-2 flex py-8 flex-row items-center justify-between border drop-shadow-none rounded-md transition-colors">
            <div className="py-2 px-4 w-full flex flex-row text-base items-center text-full-primary justify-between">
              <div className="break-words w-full text-left">
                <p>{element.content.text || 'Opção de resposta'}</p>
              </div>
            </div>
          </button>
        );

      // Continue Button
      case 'continue-button':
        return (
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 min-w-full h-14">
            {element.content.text || 'Continuar'}
          </Button>
        );

      // Transition Elements
      case 'transition-hero':
        return (
          <div className="text-center py-16 bg-gradient-to-b from-[#FAF9F7] to-white">
            <h1 className="text-4xl font-bold text-[#432818] mb-6 font-playfair">
              {element.content.title || 'Agora vamos conhecer você melhor...'}
            </h1>
            <p className="text-xl text-[#8F7A6A] mb-8">
              {element.content.subtitle || 'Algumas perguntas mais específicas sobre seu estilo'}
            </p>
          </div>
        );

      case 'transition-continue':
        return (
          <Button className="w-full max-w-md mx-auto py-6 text-lg bg-gradient-to-r from-[#8F7A6A] to-[#B89B7A] hover:from-[#7A6B5B] hover:to-[#A68B6B] text-white font-semibold rounded-lg shadow-lg">
            {element.content.text || 'Continuar'}
          </Button>
        );

      // Result Elements
      case 'result-hero':
        return (
          <div className="text-center py-16 bg-gradient-to-b from-[#FAF9F7] to-white">
            <h1 className="text-5xl font-bold text-[#432818] mb-6 font-playfair">
              {element.content.title || 'Seu Resultado Está Pronto!'}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-[#8F7A6A] to-[#B89B7A] mx-auto mb-8"></div>
          </div>
        );

      case 'result-title':
        return (
          <h2 className="text-4xl font-bold text-[#432818] text-center mb-4 font-playfair">
            {element.content.title || 'Seu Estilo é: Elegante'}
          </h2>
        );

      case 'result-subtitle':
        return (
          <p className="text-xl text-[#8F7A6A] text-center mb-8 leading-relaxed">
            {element.content.subtitle || 'Você possui um estilo sofisticado e refinado, com preferência por peças clássicas e atemporais.'}
          </p>
        );

      // Offer Elements
      case 'offer-section':
        return (
          <div className="bg-gradient-to-r from-[#8F7A6A] to-[#B89B7A] p-8 rounded-lg text-white text-center">
            <h3 className="text-3xl font-bold mb-4 font-playfair">
              {element.content.title || 'Oferta Especial Para Você'}
            </h3>
            <p className="text-xl mb-6">
              {element.content.description || 'Descubra como criar looks incríveis com seu estilo único'}
            </p>
          </div>
        );

      case 'price-highlight':
        return (
          <div className="text-center py-8">
            <div className="text-sm text-gray-500 line-through mb-2">
              {element.content.originalPrice || 'De R$ 297,00'}
            </div>
            <div className="text-4xl font-bold text-[#432818] mb-2">
              {element.content.price || 'Por apenas R$ 97,00'}
            </div>
            <div className="text-lg text-[#8F7A6A]">
              {element.content.installments || 'ou 12x de R$ 9,70'}
            </div>
          </div>
        );

      case 'cta-button':
        return (
          <Button className="w-full max-w-lg mx-auto py-6 text-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-105">
            {element.content.text || 'QUERO MEU GUIA DE ESTILO AGORA'}
          </Button>
        );

      // Spacer
      case 'spacer':
        return (
          <div className="py-2 border-dashed border-yellow-500 border rounded-lg min-w-full">
            <div className="text-center text-gray-400 text-sm">Espaçamento</div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-gray-100 rounded border">
            <span className="text-gray-600">Elemento: {element.type}</span>
          </div>
        );
    }
  };

  if (isPreviewMode) {
    return <div className="w-full">{renderElement()}</div>;
  }

  return (
    <div 
      className={`relative group cursor-pointer border-2 transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      {renderElement()}
      
      {isSelected && (
        <div className="absolute top-2 right-2 flex gap-1 bg-white shadow-lg rounded">
          {canMoveUp && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
            >
              <ArrowUp className="w-3 h-3" />
            </Button>
          )}
          {canMoveDown && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
            >
              <ArrowDown className="w-3 h-3" />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              // Open edit modal
            }}
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  );
};
