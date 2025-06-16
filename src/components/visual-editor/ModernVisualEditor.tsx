import React, { useState, useEffect } from 'react';
import { Monitor, Tablet, Smartphone, Save, Menu, Edit3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizIntro } from '@/components/QuizIntro';
import { QuizFinalTransition } from '@/components/QuizFinalTransition';
import { QuizResult } from '@/components/QuizResult';
import { QuizOfferPage } from '@/components/QuizOfferPage';
import { QuizContent } from '@/components/QuizContent';
import { toast } from '@/components/ui/use-toast';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { OptionConfigurationPanel } from './panels/OptionConfigurationPanel';

interface Page {
  id: string;
  name: string;
  type: 'intro' | 'question' | 'strategic' | 'transition-strategic' | 'transition-result' | 'result' | 'offer';
  questionIndex?: number;
}

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string; }[];
}

interface ModernVisualEditorProps {
  funnelId: string;
  onSave: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({ 
  funnelId, 
  onSave 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [currentPageId, setCurrentPageId] = useState<string>('intro');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConfigurationPanelOpen, setIsConfigurationPanelOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [realComponentConfig, setRealComponentConfig] = useState({
    intro: {
      userName: 'Visitante',
      title: 'Descubra o Seu Estilo Ideal',
      description: 'Responda algumas perguntas e veja o resultado',
      logoImage: 'https://uploads-ssl.webflow.com/64b4c9959224725311145643/64b4c99592247253111456a8_Frame%2017.svg',
      backgroundImage: 'https://uploads-ssl.webflow.com/64b4c9959224725311145643/64b4c99592247253111456a8_Frame%2017.svg',
      buttonText: 'Começar'
    }
  });

  const pages: Page[] = [
    { id: 'intro', name: 'Página Inicial', type: 'intro' },
    { id: 'question1', name: 'Pergunta 1', type: 'question', questionIndex: 0 },
    { id: 'question2', name: 'Pergunta 2', type: 'question', questionIndex: 1 },
    { id: 'strategic1', name: 'Pergunta Estratégica 1', type: 'strategic', questionIndex: 0 },
    { id: 'strategic2', name: 'Pergunta Estratégica 2', type: 'strategic', questionIndex: 1 },
    { id: 'transition-strategic', name: 'Transição Estratégica', type: 'transition-strategic' },
    { id: 'transition-result', name: 'Transição Resultado', type: 'transition-result' },
    { id: 'result', name: 'Página de Resultado', type: 'result' },
    { id: 'offer', name: 'Página de Oferta', type: 'offer' },
  ];

  const questions: Question[] = [
    {
      id: 'q1',
      text: 'Qual a sua cor favorita?',
      options: [
        { id: 'opt1', text: 'Azul' },
        { id: 'opt2', text: 'Verde' },
        { id: 'opt3', text: 'Vermelho' },
        { id: 'opt4', text: 'Amarelo' },
      ],
    },
    {
      id: 'q2',
      text: 'Qual seu animal favorito?',
      options: [
        { id: 'opt5', text: 'Cachorro' },
        { id: 'opt6', text: 'Gato' },
        { id: 'opt7', text: 'Pássaro' },
        { id: 'opt8', text: 'Peixe' },
      ],
    },
  ];

  const strategicQuestions: Question[] = [
    {
      id: 'sq1',
      text: 'O que você mais valoriza em um produto?',
      options: [
        { id: 'sopt1', text: 'Qualidade' },
        { id: 'sopt2', text: 'Preço' },
      ],
    },
    {
      id: 'sq2',
      text: 'Como você prefere comprar?',
      options: [
        { id: 'sopt3', text: 'Online' },
        { id: 'sopt4', text: 'Na loja' },
      ],
    },
  ];

  useEffect(() => {
    // Simulação de carregamento de dados
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    // Simulação de salvamento
    toast({
      title: 'Progresso Salvo!',
      description: 'As alterações foram salvas com sucesso.',
    });
    setHasUnsavedChanges(false);
    onSave({ funnelId, data: 'Dados simulados do editor' });
  };

  const getViewportDimensions = () => {
    switch (viewportMode) {
      case 'mobile':
        return { width: 375, height: 667 };
      case 'tablet':
        return { width: 768, height: 1024 };
      default:
        return { width: 1280, height: 720 };
    }
  };

  const renderCurrentComponent = () => {
    if (!currentPage) return null;
    
    if (loading) {
      return (
        <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Carregando questões...</p>
            </div>
          </div>
        </div>
      );
    }

    const mockQuizResult = {
      primaryStyle: {
        category: "Elegante" as const,
        score: 85,
        percentage: 85
      },
      secondaryStyles: [
        {
          category: "Romântico" as const,
          score: 65,
          percentage: 65
        }
      ]
    };

    switch (currentPage.type) {
      case 'intro':
        return (
          <QuizIntro
            userName={realComponentConfig.intro.userName || 'Visitante'}
            title={realComponentConfig.intro.title}
            description={realComponentConfig.intro.description}
            logo={realComponentConfig.intro.logoImage}
            backgroundImage={realComponentConfig.intro.backgroundImage}
            buttonText={realComponentConfig.intro.buttonText}
            onStartQuiz={() => setCurrentPageId('question1')}
          />
        );

      case 'transition-strategic':
        return (
          <QuizFinalTransition
            onShowResult={() => setCurrentPageId('strategic1')}
          />
        );

      case 'transition-result':
        return (
          <QuizFinalTransition
            onShowResult={() => setCurrentPageId('result')}
          />
        );

      case 'result':
        return (
          <QuizResult
            primaryStyle={mockQuizResult.primaryStyle}
            secondaryStyles={mockQuizResult.secondaryStyles}
            onViewOffer={() => setCurrentPageId('offer')}
          />
        );

      case 'offer':
        return (
          <QuizOfferPage />
        );

      case 'question':
        const questionIndex = currentPage.questionIndex || 0;
        const currentQuestion = questions[questionIndex];
        
        if (!currentQuestion) {
          return (
            <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
              <div className="text-center">
                <p className="text-gray-600">Questão não encontrada</p>
              </div>
            </div>
          );
        }

        return (
          <QuizContent
            user={{ userName: 'Preview User' }}
            currentQuestionIndex={questionIndex}
            totalQuestions={questions.length}
            showingStrategicQuestions={false}
            currentStrategicQuestionIndex={0}
            currentQuestion={currentQuestion}
            currentAnswers={[]}
            handleAnswerSubmit={() => {}}
            handleNextClick={() => {
              const nextPageIndex = pages.findIndex(p => p.id === currentPageId) + 1;
              if (nextPageIndex < pages.length) {
                setCurrentPageId(pages[nextPageIndex].id);
              }
            }}
            handlePrevious={() => {
              const currentPageIndex = pages.findIndex(p => p.id === currentPageId);
              if (currentPageIndex > 0) {
                setCurrentPageId(pages[currentPageIndex - 1].id);
              }
            }}
          />
        );

      case 'strategic':
        const strategicIndex = currentPage.questionIndex || 0;
        const currentStrategicQuestion = strategicQuestions[strategicIndex];
        
        if (!currentStrategicQuestion) {
          return (
            <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
              <div className="text-center">
                <p className="text-gray-600">Questão estratégica não encontrada</p>
              </div>
            </div>
          );
        }

        return (
          <QuizContent
            user={{ userName: 'Preview User' }}
            currentQuestionIndex={0}
            totalQuestions={2}
            showingStrategicQuestions={true}
            currentStrategicQuestionIndex={strategicIndex}
            currentQuestion={currentStrategicQuestion}
            currentAnswers={[]}
            handleAnswerSubmit={() => {}}
            handleNextClick={() => {
              const nextPageIndex = pages.findIndex(p => p.id === currentPageId) + 1;
              if (nextPageIndex < pages.length) {
                setCurrentPageId(pages[nextPageIndex].id);
              }
            }}
            handlePrevious={() => {
              const currentPageIndex = pages.findIndex(p => p.id === currentPageId);
              if (currentPageIndex > 0) {
                setCurrentPageId(pages[currentPageIndex - 1].id);
              }
            }}
          />
        );

      default:
        return (
          <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-gray-600">Tipo de página não reconhecido: {currentPage.type}</p>
            </div>
          </div>
        );
    }
  };

  const currentPage = pages.find(page => page.id === currentPageId);

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
        <Tablet className="w-4 h-4 mr-2" />
        Tablet
      </Button>
      <Button
        variant={viewportMode === 'desktop' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewportMode('desktop')}
      >
        <Monitor className="w-4 h-4 mr-2" />
        Desktop
      </Button>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <Menu className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Editor Visual</h1>
          {hasUnsavedChanges && (
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
              Alterações não salvas
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <ViewportControls />
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-white border-r w-80 flex-shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-medium text-gray-800 mb-3">Páginas do Funil</h2>
              <ScrollArea className="h-64">
                <div className="space-y-1">
                  {pages.map((page) => (
                    <Button
                      key={page.id}
                      variant={currentPageId === page.id ? 'default' : 'ghost'}
                      className="w-full justify-start text-sm"
                      onClick={() => setCurrentPageId(page.id)}
                    >
                      {page.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <div className="flex-1 p-4">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-800">Configurações</h3>
                <p className="text-sm text-gray-600">
                  Selecione uma página para ver as opções de configuração.
                </p>
                {currentPage && (
                  <>
                    {/* Stage Configuration Panel */}
                    <StageConfigurationPanel
                      stageName={currentPage.name}
                      stageType={currentPage.type}
                      currentOptions={questions[0]?.options.map(opt => ({
                        id: opt.id,
                        label: opt.id,
                        text: opt.text
                      }))}
                      onOptionUpdate={(optionId, field, value) => {
                        console.log(`Updating option ${optionId} field ${field} with value ${value}`);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-100 overflow-auto">
          <div className="p-4">
            <div 
              className="mx-auto bg-white shadow-lg overflow-hidden"
              style={getViewportDimensions()}
            >
              {renderCurrentComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
