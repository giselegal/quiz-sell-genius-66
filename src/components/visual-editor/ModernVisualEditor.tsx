
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit3, Eye, Smartphone, Tablet, Monitor, Menu, X } from 'lucide-react';
import { CanvasLayout, CanvasHeader, CanvasContent, EditableHeadingCanvas, EditableSpacerCanvas, EditableButtonCanvas, CanvasFooter } from '@/components/editor/CanvasLayout';
import { EditableImageOptions } from '@/components/editor/EditableImageOptions';
import { OptionConfigurationPanel } from '@/components/editor/ConfigurationPanel';
import { useSupabaseQuestions } from '@/hooks/useSupabaseQuestions';
import { toast } from '@/components/ui/use-toast';
import QuizIntro from '@/components/QuizIntro';
import QuizFinalTransition from '@/components/QuizFinalTransition';
import QuizResult from '@/components/QuizResult';
import QuizOfferPage from '@/components/QuizOfferPage';

interface ModernVisualEditorProps {
  funnelId: string;
  onSave: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({ funnelId, onSave }) => {
  const [pages, setPages] = useState<any[]>([]);
  const [currentPageId, setCurrentPageId] = useState('');
  const [showEditor, setShowEditor] = useState(true);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showOptionConfig, setShowOptionConfig] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const { questions, strategicQuestions, loading, error } = useSupabaseQuestions();

  const [realComponentConfig, setRealComponentConfig] = useState({
    intro: {
      title: 'DESCUBRA SEU ESTILO PESSOAL',
      subtitle: 'Quiz personalizado para descobrir seu estilo único',
      description: 'Responda às perguntas e descubra qual estilo combina mais com você!',
      buttonText: 'COMEÇAR QUIZ',
      logoImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_webp,q_70,w_120,h_50,c_fit/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
      backgroundImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/f_avif,q_85,w_300,c_limit/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.avif',
      backgroundColor: '#FEFEFE',
      textColor: '#432818',
      buttonColor: '#B89B7A'
    },
    questions: {
      backgroundColor: '#FEFEFE',
      textColor: '#432818',
      optionColor: '#F8F5F0',
      selectedColor: '#B89B7A',
      borderColor: '#E5E7EB'
    },
    transitions: {
      backgroundColor: '#FEFEFE',
      textColor: '#432818',
      primaryColor: '#B89B7A',
      buttonColor: '#B89B7A',
      cardBackground: '#F8F5F0'
    },
    result: {
      title: 'Seu Resultado Está Pronto!',
      subtitle: 'Descobrimos seu estilo predominante',
      description: 'Com base nas suas respostas, identificamos características únicas do seu perfil',
      backgroundColor: '#FEFEFE',
      textColor: '#432818',
      primaryColor: '#B89B7A',
      cardBackground: '#F8F5F0',
      buttonColor: '#B89B7A',
      resultImage: 'https://via.placeholder.com/400x300/B89B7A/FFFFFF?text=Seu+Resultado'
    },
    offer: {
      title: 'Oferta Especial Para Você!',
      subtitle: 'Baseado no seu estilo, temos uma seleção exclusiva',
      description: 'Aproveite nossa consultoria personalizada com 50% de desconto',
      buttonText: 'QUERO APROVEITAR',
      originalPrice: 'R$ 297,00',
      finalPrice: 'R$ 147,00',
      backgroundColor: '#432818',
      textColor: '#FFFFFF',
      buttonColor: '#B89B7A',
      features: [
        'Consultoria personalizada de estilo',
        'Análise completa do seu guarda-roupa',
        'Guia de compras personalizado',
        'Suporte por 30 dias'
      ]
    }
  });

  useEffect(() => {
    if (pages.length === 0 && !loading && (questions.length > 0 || strategicQuestions.length > 0)) {
      const newPages = [
        { id: 'intro', name: '🏠 Introdução/Capa', type: 'intro' },
        ...questions.slice(0, 9).map((_, index) => ({
          id: `question-${index}`,
          name: `❓ Questão ${index + 1}`,
          type: 'question',
          questionIndex: index
        })),
        { id: 'transition-strategic', name: '⏳ Transição → Estratégicas', type: 'transition-strategic' },
        ...strategicQuestions.slice(0, 6).map((_, index) => ({
          id: `strategic-${index}`,
          name: `🎯 Estratégica ${index + 1}`,
          type: 'strategic',
          questionIndex: index
        })),
        { id: 'capture', name: '📧 Captura de Email', type: 'capture' },
        { id: 'transition-result', name: '⏳ Transição → Resultado', type: 'transition-result' },
        { id: 'result', name: '🎉 Resultado', type: 'result' },
        { id: 'offer', name: '💰 Oferta', type: 'offer' }
      ];
      setPages(newPages);
      setCurrentPageId('intro');
    }
  }, [questions.length, strategicQuestions.length, loading, pages.length]);

  useEffect(() => {
    const savedIntroConfig = localStorage.getItem('editorCoverConfig');
    const savedOfferConfig = localStorage.getItem('editorOfferConfig');
    
    if (savedIntroConfig) {
      try {
        const parsed = JSON.parse(savedIntroConfig);
        setRealComponentConfig(prev => ({
          ...prev,
          intro: { ...prev.intro, ...parsed }
        }));
      } catch (error) {
        console.error('Error loading intro config:', error);
      }
    }
    
    if (savedOfferConfig) {
      try {
        const parsed = JSON.parse(savedOfferConfig);
        setRealComponentConfig(prev => ({
          ...prev,
          offer: { ...prev.offer, ...parsed }
        }));
      } catch (error) {
        console.error('Error loading offer config:', error);
      }
    }
  }, []);

  const currentPage = pages.find(p => p.id === currentPageId);

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
    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
      <Button
        variant={viewportMode === 'mobile' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewportMode('mobile')}
        className="flex items-center gap-1"
      >
        <Smartphone className="w-4 h-4" />
        <span className="hidden sm:inline">Mobile</span>
      </Button>
      <Button
        variant={viewportMode === 'tablet' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewportMode('tablet')}
        className="flex items-center gap-1"
      >
        <Tablet className="w-4 h-4" />
        <span className="hidden sm:inline">Tablet</span>
      </Button>
      <Button
        variant={viewportMode === 'desktop' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setViewportMode('desktop')}
        className="flex items-center gap-1"
      >
        <Monitor className="w-4 h-4" />
        <span className="hidden sm:inline">Desktop</span>
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
        category: 'Elegante' as const,
        score: 85,
        percentage: 85
      },
      secondaryStyles: [
        {
          category: 'Romântico' as const,
          score: 72,
          percentage: 72
        }
      ]
    };

    switch (currentPage.type) {
      case 'intro':
        return (
          <QuizIntro 
            onStart={(name: string) => {
              console.log('Quiz started with name:', name);
            }}
          />
        );

      case 'question':
        const question = questions[currentPage.questionIndex];
        if (!question) return <div>Questão não encontrada</div>;
        
        return (
          <CanvasLayout>
            <CanvasHeader 
              logoUrl={realComponentConfig.intro.logoImage}
              progress={(currentPage.questionIndex + 1) / questions.length * 100}
            />
            <CanvasContent>
              <EditableHeadingCanvas
                id={`question-${currentPage.questionIndex}`}
                text={question.title}
                isSelected={selectedComponentId === `question-${currentPage.questionIndex}`}
                onSelect={() => setSelectedComponentId(`question-${currentPage.questionIndex}`)}
                onTextChange={(text) => console.log('Question text changed:', text)}
              />
              
              <EditableImageOptions
                id={`options-${currentPage.questionIndex}`}
                options={question.options?.map((opt: any, idx: number) => ({
                  id: opt.id,
                  label: String.fromCharCode(65 + idx),
                  text: opt.text,
                  imageUrl: opt.imageUrl,
                  alt: opt.alt
                })) || []}
                isSelected={selectedComponentId === `options-${currentPage.questionIndex}`}
                onSelect={() => setSelectedComponentId(`options-${currentPage.questionIndex}`)}
                onOptionClick={(optionId) => console.log('Option clicked:', optionId)}
                onOptionUpdate={(optionId, field, value) => console.log('Option updated:', optionId, field, value)}
                onConfigureOption={(optionId) => {
                  setSelectedOptionId(optionId);
                  setShowOptionConfig(true);
                }}
              />
            </CanvasContent>
          </CanvasLayout>
        );

      case 'strategic':
        const strategicQuestion = strategicQuestions[currentPage.questionIndex];
        if (!strategicQuestion) return <div>Questão estratégica não encontrada</div>;
        
        return (
          <CanvasLayout>
            <CanvasHeader 
              logoUrl={realComponentConfig.intro.logoImage}
              progress={80 + (currentPage.questionIndex + 1) / strategicQuestions.length * 20}
            />
            <CanvasContent>
              <EditableHeadingCanvas
                id={`strategic-${currentPage.questionIndex}`}
                text={strategicQuestion.title}
                isSelected={selectedComponentId === `strategic-${currentPage.questionIndex}`}
                onSelect={() => setSelectedComponentId(`strategic-${currentPage.questionIndex}`)}
                onTextChange={(text) => console.log('Strategic question text changed:', text)}
              />
              
              <EditableImageOptions
                id={`strategic-options-${currentPage.questionIndex}`}
                options={strategicQuestion.options?.map((opt: any, idx: number) => ({
                  id: opt.id,
                  label: String.fromCharCode(65 + idx),
                  text: opt.text,
                  imageUrl: opt.imageUrl,
                  alt: opt.alt
                })) || []}
                isSelected={selectedComponentId === `strategic-options-${currentPage.questionIndex}`}
                onSelect={() => setSelectedComponentId(`strategic-options-${currentPage.questionIndex}`)}
                onOptionClick={(optionId) => console.log('Strategic option clicked:', optionId)}
                onOptionUpdate={(optionId, field, value) => console.log('Strategic option updated:', optionId, field, value)}
                onConfigureOption={(optionId) => {
                  setSelectedOptionId(optionId);
                  setShowOptionConfig(true);
                }}
              />
            </CanvasContent>
          </CanvasLayout>
        );

      case 'transition-strategic':
      case 'transition-result':
        return (
          <QuizFinalTransition 
            onContinue={() => console.log('Transition continue clicked')}
          />
        );

      case 'result':
        return (
          <QuizResult 
            result={mockQuizResult}
            onViewOffer={() => console.log('View offer clicked')}
          />
        );

      case 'offer':
        return (
          <QuizOfferPage />
        );

      default:
        return <div>Tipo de página não reconhecido: {currentPage.type}</div>;
    }
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erro ao carregar dados</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar - Editor Controls */}
      <div className={`${showEditor ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Quiz Editor</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditor(false)}
                className="md:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <ViewportControls />
          </div>

          {/* Pages List */}
          <div className="flex-1 overflow-hidden">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Páginas do Quiz</h3>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-2">
                  {pages.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => setCurrentPageId(page.id)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                        currentPageId === page.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {page.name}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              onClick={handleSave}
              className="w-full"
              disabled={!hasUnsavedChanges}
            >
              {hasUnsavedChanges ? 'Salvar Alterações' : 'Salvo'}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      {!showEditor && (
        <Button
          onClick={() => setShowEditor(true)}
          className="fixed top-4 left-4 z-50 md:hidden"
          size="sm"
        >
          <Menu className="w-4 h-4" />
        </Button>
      )}

      {/* Main Canvas */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex items-center justify-center bg-gray-100 p-4">
          <div 
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={getViewportDimensions()}
          >
            {renderCurrentComponent()}
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
          console.log('Option config updated:', optionId, field, value);
        }}
      />
    </div>
  );
};
