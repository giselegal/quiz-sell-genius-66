import React, { useState, useCallback, useEffect } from 'react';
import {
  Button,
  Menu,
  Edit3,
  X
} from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  QuizIntro
} from './QuizIntro';
import {
  QuizFinalTransition
} from './QuizFinalTransition';
import {
  QuizResult
} from './QuizResult';
import {
  QuizOfferPage
} from './QuizOfferPage';
import {
  CanvasLayout,
  CanvasHeader,
  CanvasContent,
  CanvasFooter,
  EditableHeadingCanvas,
  EditableOptionsCanvas,
  EditableImageOptions
} from '@/components/editor/CanvasLayout';
import {
  OptionConfigurationPanel
} from '@/components/editor/ConfigurationPanel';
import { toast } from "@/components/ui/use-toast"
import {
  QuizQuestion,
  QuizOption
} from '@/types/quiz';
import {
  useStepsManager
} from '@/hooks/useStepsManager';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ModernVisualEditorProps {
  funnelId: string;
  onSave: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({ funnelId, onSave }) => {
  const [showEditor, setShowEditor] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPageId, setCurrentPageId] = useState('cover');
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [showOptionConfig, setShowOptionConfig] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewportMode, setViewportMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [loading, setLoading] = useState(true);

  const [realComponentConfig, setRealComponentConfig] = useState({
    intro: {
      title: 'Descubra seu Estilo Ideal',
      description: 'Responda algumas perguntas e encontre o estilo que mais combina com você!',
      logoImage: 'https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg',
      backgroundImage: 'https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg',
      buttonText: 'Começar o Quiz'
    },
    transitions: {
      transitionTitle: 'Estamos quase lá...',
      transitionDescription: 'Mais algumas perguntinhas rápidas para garantir o melhor resultado!',
      transitionImage: 'https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg',
      buttonText: 'Continuar'
    },
    result: {
      resultTitle: 'Seu Estilo é...',
      resultDescription: 'Com base nas suas respostas, identificamos que seu estilo predominante é...',
      primaryColor: '#000000',
      secondaryColor: '#000000',
      textColor: '#000000',
      backgroundImage: 'https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg',
      buttonText: 'Ver Mais'
    },
    offer: {
      offerTitle: 'Oferta Exclusiva',
      offerDescription: 'Aproveite nossa oferta especial para você!',
      offerImage: 'https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg',
      buttonText: 'Comprar Agora'
    }
  });

  const [pages, setPages] = useState([
    { id: 'cover', name: 'Capa', type: 'intro' },
    { id: 'question1', name: 'Questão 1', type: 'question', questionIndex: 0 },
    { id: 'question2', name: 'Questão 2', type: 'question', questionIndex: 1 },
    { id: 'question3', name: 'Questão 3', type: 'question', questionIndex: 2 },
    { id: 'question4', name: 'Questão 4', type: 'question', questionIndex: 3 },
    { id: 'question5', name: 'Questão 5', type: 'question', questionIndex: 4 },
    { id: 'transition1', name: 'Transição 1', type: 'transition-strategic' },
    { id: 'strategic1', name: 'Estratégica 1', type: 'strategic', questionIndex: 0 },
    { id: 'strategic2', name: 'Estratégica 2', type: 'strategic', questionIndex: 1 },
    { id: 'transition2', name: 'Transição 2', type: 'transition-result' },
    { id: 'result', name: 'Resultado', type: 'result' },
    { id: 'offer', name: 'Oferta', type: 'offer' }
  ]);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [strategicQuestions, setStrategicQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    // Mock data for questions
    const mockQuestions: QuizQuestion[] = [
      {
        id: 'q1',
        title: 'Qual sua cor favorita?',
        type: 'text',
        options: [
          { id: 'o1', text: 'Azul', styleCategory: 'Clássico' },
          { id: 'o2', text: 'Verde', styleCategory: 'Natural' },
          { id: 'o3', text: 'Vermelho', styleCategory: 'Sexy' },
          { id: 'o4', text: 'Preto', styleCategory: 'Dramático' }
        ],
        multiSelect: 1
      },
      {
        id: 'q2',
        title: 'Que tipo de roupa você prefere?',
        type: 'text',
        options: [
          { id: 'o5', text: 'Casual', styleCategory: 'Natural' },
          { id: 'o6', text: 'Formal', styleCategory: 'Clássico' },
          { id: 'o7', text: 'Moderna', styleCategory: 'Contemporâneo' },
          { id: 'o8', text: 'Elegante', styleCategory: 'Elegante' }
        ],
        multiSelect: 1
      },
      {
        id: 'q3',
        title: 'Qual acessório te define?',
        type: 'text',
        options: [
          { id: 'o9', text: 'Colar', styleCategory: 'Romântico' },
          { id: 'o10', text: 'Brinco', styleCategory: 'Elegante' },
          { id: 'o11', text: 'Pulseira', styleCategory: 'Criativo' },
          { id: 'o12', text: 'Anel', styleCategory: 'Sexy' }
        ],
        multiSelect: 1
      },
      {
        id: 'q4',
        title: 'O que não pode faltar no seu guarda-roupa?',
        type: 'text',
        options: [
          { id: 'o13', text: 'Jeans', styleCategory: 'Natural' },
          { id: 'o14', text: 'Blazer', styleCategory: 'Clássico' },
          { id: 'o15', text: 'Vestido', styleCategory: 'Romântico' },
          { id: 'o16', text: 'Saia', styleCategory: 'Sexy' }
        ],
        multiSelect: 1
      },
      {
        id: 'q5',
        title: 'Qual seu sapato ideal?',
        type: 'text',
        options: [
          { id: 'o17', text: 'Tênis', styleCategory: 'Natural' },
          { id: 'o18', text: 'Salto Alto', styleCategory: 'Sexy' },
          { id: 'o19', text: 'Sapatilha', styleCategory: 'Romântico' },
          { id: 'o20', text: 'Bota', styleCategory: 'Dramático' }
        ],
        multiSelect: 1
      }
    ];

    const mockStrategicQuestions: QuizQuestion[] = [
      {
        id: 'sq1',
        title: 'Em qual ocasião você se sente mais confiante?',
        type: 'text',
        options: [
          { id: 'so1', text: 'Festa', styleCategory: 'Sexy' },
          { id: 'so2', text: 'Trabalho', styleCategory: 'Clássico' },
          { id: 'so3', text: 'Dia a dia', styleCategory: 'Natural' },
          { id: 'so4', text: 'Evento social', styleCategory: 'Elegante' }
        ],
        multiSelect: 1
      },
      {
        id: 'sq2',
        title: 'O que te inspira na moda?',
        type: 'text',
        options: [
          { id: 'so5', text: 'Tendências', styleCategory: 'Contemporâneo' },
          { id: 'so6', text: 'Ícones de estilo', styleCategory: 'Clássico' },
          { id: 'so7', text: 'Sua intuição', styleCategory: 'Criativo' },
          { id: 'so8', text: 'Conforto', styleCategory: 'Natural' }
        ],
        multiSelect: 1
      }
    ];

    setQuestions(mockQuestions);
    setStrategicQuestions(mockStrategicQuestions);
    setLoading(false);
  }, []);

  const updateRealComponentConfig = (section, key, value) => {
    const newConfig = {
      ...realComponentConfig,
      [section]: {
        ...realComponentConfig[section],
        [key]: value
      }
    };
    setRealComponentConfig(newConfig);
    setHasUnsavedChanges(true);

    if (section === 'intro') {
      localStorage.setItem('editorCoverConfig', JSON.stringify(newConfig.intro));
    } else if (section === 'offer') {
      localStorage.setItem('editorOfferConfig', JSON.stringify(newConfig.offer));
    }
  };

  const handleSave = () => {
    const editorData = {
      funnelId,
      pages,
      currentPageId,
      config: realComponentConfig,
      timestamp: new Date().toISOString()
    };

    onSave(editorData);
    setHasUnsavedChanges(false);
    
    toast({
      title: "Quiz salvo com sucesso!",
      description: "Todas as alterações foram salvas."
    });
  };

  const getViewportDimensions = () => {
    switch (viewportMode) {
      case 'mobile':
        return { width: '320px', height: '568px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      case 'desktop':
        return { width: '100%', height: '100%' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  const ViewportControls = () => (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant={viewportMode === 'mobile' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewportMode('mobile')}
      >
        📱 Mobile
      </Button>
      <Button
        variant={viewportMode === 'tablet' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewportMode('tablet')}
      >
        <Tablet className="w-4 h-4 mr-2" /> Tablet
      </Button>
      <Button
        variant={viewportMode === 'desktop' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewportMode('desktop')}
      >
        <Monitor className="w-4 h-4 mr-2" /> Desktop
      </Button>
    </div>
  );

  const renderCurrentComponent = () => {
    if (!currentPage) return null;

    if (loading) {
      return (
        <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando questões...</p>
            </div>
          </div>
        </div>
      );
    }

    // Mock quiz result data with valid style categories
    const mockQuizResult = {
      primaryStyle: {
        category: 'Elegante' as const, // Fixed: using valid category
        score: 85,
        percentage: 85
      },
      secondaryStyles: [
        {
          category: 'Romântico' as const, // Fixed: using valid category
          score: 72,
          percentage: 72
        },
        {
          category: 'Clássico' as const,
          score: 68,
          percentage: 68
        }
      ],
      totalSelections: 10,
      userName: 'Usuário'
    };

    switch (currentPage.type) {
      case 'intro':
        return (
          <QuizIntro 
            config={realComponentConfig.intro}
            onConfigUpdate={(key, value) => updateRealComponentConfig('intro', key, value)}
          />
        );
      
      case 'question':
        const question = questions[currentPage.questionIndex];
        if (!question) return <div>Questão não encontrada</div>;
        
        return (
          <CanvasLayout>
            <CanvasHeader
              logoUrl={realComponentConfig.intro.logoImage}
              progress={((currentPage.questionIndex + 1) / questions.length) * 100}
            />
            <CanvasContent>
              <EditableHeadingCanvas
                id={`question-title-${currentPage.questionIndex}`}
                text={question.title}
                isSelected={selectedComponentId === `question-title-${currentPage.questionIndex}`}
                onSelect={() => setSelectedComponentId(`question-title-${currentPage.questionIndex}`)}
                onTextChange={(text) => console.log('Update question title:', text)}
              />
              
              <EditableImageOptions
                id={`question-options-${currentPage.questionIndex}`}
                options={question.options.map(opt => ({
                  id: opt.id,
                  label: String.fromCharCode(65 + question.options.indexOf(opt)),
                  text: opt.text,
                  imageUrl: opt.imageUrl,
                  alt: opt.text
                }))}
                isSelected={selectedComponentId === `question-options-${currentPage.questionIndex}`}
                onSelect={() => setSelectedComponentId(`question-options-${currentPage.questionIndex}`)}
                onOptionClick={(optionId) => console.log('Option clicked:', optionId)}
                onConfigureOption={(optionId) => {
                  setSelectedOptionId(optionId);
                  setShowOptionConfig(true);
                }}
                columns={2}
              />
            </CanvasContent>
            <CanvasFooter />
          </CanvasLayout>
        );

      case 'strategic':
        const strategicQuestion = strategicQuestions[currentPage.questionIndex];
        if (!strategicQuestion) return <div>Questão estratégica não encontrada</div>;
        
        return (
          <CanvasLayout>
            <CanvasHeader
              logoUrl={realComponentConfig.intro.logoImage}
              progress={80 + (currentPage.questionIndex * 5)}
            />
            <CanvasContent>
              <EditableHeadingCanvas
                id={`strategic-title-${currentPage.questionIndex}`}
                text={strategicQuestion.title}
                isSelected={selectedComponentId === `strategic-title-${currentPage.questionIndex}`}
                onSelect={() => setSelectedComponentId(`strategic-title-${currentPage.questionIndex}`)}
                onTextChange={(text) => console.log('Update strategic title:', text)}
              />
              
              <EditableImageOptions
                id={`strategic-options-${currentPage.questionIndex}`}
                options={strategicQuestion.options.map(opt => ({
                  id: opt.id,
                  label: String.fromCharCode(65 + strategicQuestion.options.indexOf(opt)),
                  text: opt.text,
                  imageUrl: opt.imageUrl,
                  alt: opt.text
                }))}
                isSelected={selectedComponentId === `strategic-options-${currentPage.questionIndex}`}
                onSelect={() => setSelectedComponentId(`strategic-options-${currentPage.questionIndex}`)}
                onOptionClick={(optionId) => console.log('Strategic option clicked:', optionId)}
                onConfigureOption={(optionId) => {
                  setSelectedOptionId(optionId);
                  setShowOptionConfig(true);
                }}
                columns={1}
              />
            </CanvasContent>
            <CanvasFooter />
          </CanvasLayout>
        );

      case 'transition-strategic':
      case 'transition-result':
      case 'capture':
        return (
          <QuizFinalTransition 
            config={realComponentConfig.transitions}
            onConfigUpdate={(key, value) => updateRealComponentConfig('transitions', key, value)}
          />
        );

      case 'result':
        return (
          <QuizResult 
            result={mockQuizResult}
            config={realComponentConfig.result}
            onConfigUpdate={(key, value) => updateRealComponentConfig('result', key, value)}
          />
        );

      case 'offer':
        return (
          <QuizOfferPage 
            config={realComponentConfig.offer}
            // Fixed: removed invalid props onAccept and onDecline
          />
        );

      default:
        return <div>Página não encontrada</div>;
    }
  };

  const dimensions = getViewportDimensions();

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Left Sidebar - Pages Navigation */}
      <div className={`${showEditor ? 'w-80' : 'w-0'} bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-50 lg:relative' : 'hidden lg:block'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Páginas do Quiz</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
              >
                💾 Salvar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditor(!showEditor)}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <ViewportControls />
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {pages.map((page) => (
              <Button
                key={page.id}
                variant={currentPageId === page.id ? "default" : "ghost"}
                className="w-full justify-start h-auto p-3 text-left"
                onClick={() => setCurrentPageId(page.id)}
              >
                <div>
                  <div className="font-medium">{page.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {page.type}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEditor(!showEditor)}
                  className="hidden lg:flex"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  {showEditor ? 'Ocultar' : 'Mostrar'} Editor
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {currentPage?.name || 'Selecione uma página'}
              </span>
              
              {hasUnsavedChanges && (
                <div className="w-2 h-2 bg-orange-500 rounded-full" title="Alterações não salvas" />
              )}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-100 overflow-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <div
              className="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: dimensions.width,
                height: dimensions.height,
                minHeight: viewportMode === 'desktop' ? '600px' : dimensions.height,
                maxWidth: '100%'
              }}
            >
              {renderCurrentComponent()}
            </div>
          </div>
        </div>
      </div>

      {/* Option Configuration Modal */}
      <OptionConfigurationPanel
        optionId={selectedOptionId}
        isOpen={showOptionConfig}
        onClose={() => {
          setShowOptionConfig(false);
          setSelectedOptionId(null);
        }}
        onUpdate={(optionId, field, value) => {
          console.log('Update option:', optionId, field, value);
        }}
      />
    </div>
  );
};

import { Tablet, Monitor } from 'lucide-react';
