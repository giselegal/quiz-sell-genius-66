import React, { useState, useEffect } from 'react';
import { Button, Monitor, Tablet } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import QuizIntro from '@/components/QuizIntro';
import QuizFinalTransition from '@/components/QuizFinalTransition';
import QuizResult from '@/components/QuizResult';
import QuizOfferPage from '@/components/QuizOfferPage';
import { StageConfigurationPanel } from './panels/StageConfigurationPanel';
import { OptionConfigurationPanel } from './panels/OptionConfigurationPanel';
import { toast } from '@/components/ui/use-toast';

interface Page {
  id: string;
  name: string;
  type: string;
  questionIndex?: number;
}

interface ComponentProps {
  text?: string;
  level?: number;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  src?: string;
  alt?: string;
}

interface Component {
  id: string;
  type: string;
  props?: ComponentProps;
}

interface ModernVisualEditorProps {
  funnelId: string;
  onSave: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [showEditor, setShowEditor] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPageId, setCurrentPageId] = useState('cover');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showOptionConfig, setShowOptionConfig] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
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

  const [questions, setQuestions] = useState<any[]>([]);
  const [strategicQuestions, setStrategicQuestions] = useState<any[]>([]);

  useEffect(() => {
    const mockPages = [
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
    ];

    const mockQuestions = [
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
      }
    ];

    const mockStrategicQuestions = [
      {
        id: 'sq1',
        title: 'Em qual ocasião você se sente mais confiante?',
        type: 'text',
        options: [
          { id: 'so1', text: 'Festa', styleCategory: 'Sexy' },
          { id: 'so2', text: 'Trabalho', styleCategory: 'Clássico' }
        ],
        multiSelect: 1
      }
    ];

    setQuestions(mockQuestions);
    setStrategicQuestions(mockStrategicQuestions);
    setLoading(false);
  }, []);

  const currentPage = pages.find(page => page.id === currentPageId);

  const updateRealComponentConfig = (section: string, key: string, value: any) => {
    const newConfig = {
      ...realComponentConfig,
      [section]: {
        ...realComponentConfig[section],
        [key]: value
      }
    };
    setRealComponentConfig(newConfig);
    setHasUnsavedChanges(true);
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
      title: 'Quiz salvo com sucesso!',
      description: 'Todas as alterações foram salvas.'
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
        category: 'Elegante',
        score: 85,
        percentage: 85
      },
      secondaryStyles: [
        {
          category: 'Romântico',
          score: 70,
          percentage: 70
        }
      ]
    };

    switch (currentPage.type) {
      case 'intro':
        return (
          <QuizIntro
            onStart={(name: string) => {
              console.log('Quiz started with name:', name);
              setCurrentPageId('question1');
            }}
          />
        );

      case 'transition-result':
        return (
          <QuizFinalTransition
            onShowResult={() => {
              console.log('Showing result...');
              setCurrentPageId('result');
            }}
          />
        );

      case 'result':
        return (
          <QuizResult
            primaryStyle={mockQuizResult.primaryStyle}
            secondaryStyles={mockQuizResult.secondaryStyles}
            onReset={() => {
              console.log('Resetting quiz...');
              setCurrentPageId('cover');
            }}
          />
        );

      case 'offer':
        return <QuizOfferPage />;

      default:
        return (
          <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-4">
                {currentPage.name}
              </h2>
              <p className="text-gray-600 mb-4">
                Tipo: {currentPage.type}
              </p>
              <p className="text-sm text-gray-500">
                Esta página está em desenvolvimento...
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar esquerda */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Editor Visual</h1>
          <p className="text-sm text-gray-500">Quiz: {funnelId}</p>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <StageConfigurationPanel
              stageName={currentPage?.name || 'Página'}
              stageType={currentPage?.type || 'unknown'}
              currentOptions={[]}
              onOptionUpdate={() => {}}
            />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleSave}
            className="w-full"
            disabled={!hasUnsavedChanges}
          >
            💾 Salvar {hasUnsavedChanges && '*'}
          </Button>
        </div>
      </div>

      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <ViewportControls />
            <div className="flex items-center gap-2">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant={currentPageId === page.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPageId(page.id)}
                  className="text-xs"
                >
                  {page.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-gray-100 p-4">
          <div
            className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
            style={getViewportDimensions()}
          >
            {renderCurrentComponent()}
          </div>
        </div>
      </div>

      {/* Configuration Panel */}
      {showOptionConfig && (
        <div className="fixed top-4 right-4 z-50">
          <OptionConfigurationPanel
            isOpen={showOptionConfig}
            onClose={() => setShowOptionConfig(false)}
            optionId={selectedOptionId || ''}
            onConfigUpdate={(config) => {
              console.log('Option config updated:', config);
            }}
          />
        </div>
      )}
    </div>
  );
};
