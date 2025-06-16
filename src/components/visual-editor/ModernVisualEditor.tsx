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

// Import existing components
import QuizIntro from '@/components/QuizIntro';
import QuizFinalTransition from '@/components/QuizFinalTransition';
import QuizResult from '@/components/QuizResult';
import QuizOfferPage from '@/components/QuizOfferPage';

interface EditorPage {
  id: string;
  name: string;
  type: 'intro' | 'question' | 'transition-strategic' | 'strategic' | 'capture' | 'transition-result' | 'result' | 'offer';
  questionIndex?: number;
}

interface ModernVisualEditorProps {
  funnelId: string;
  onSave: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({ funnelId, onSave }) => {
  
  const [pages, setPages] = useState<EditorPage[]>([]);
  const [currentPageId, setCurrentPageId] = useState<string>('');
  const [showEditor, setShowEditor] = useState(true);
  const [viewportMode, setViewportMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
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

  // Initialize pages when Supabase data is loaded
  useEffect(() => {
    if (pages.length === 0 && !loading && (questions.length > 0 || strategicQuestions.length > 0)) {
      const newPages: EditorPage[] = [
        { id: 'intro', name: '🏠 Introdução/Capa', type: 'intro' },
        ...questions.slice(0, 9).map((_, index) => ({
          id: `question-${index}`,
          name: `❓ Questão ${index + 1}`,
          type: 'question' as const,
          questionIndex: index
        })),
        { id: 'transition-strategic', name: '⏳ Transição → Estratégicas', type: 'transition-strategic' },
        ...strategicQuestions.slice(0, 6).map((_, index) => ({
          id: `strategic-${index}`,
          name: `🎯 Estratégica ${index + 1}`,
          type: 'strategic' as const,
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

  // Load saved configurations
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
        ...realComponentConfig[section as keyof typeof realComponentConfig],
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando questões...</p>
            </div>
          </div>
        </div>
      );
    }

    // Mock data for results
    const mockResults = [
      {
        category: 'Clássico Elegante',
        percentage: 75,
        description: 'Seu estilo reflete sofisticação e atemporalidade.',
        characteristics: [
          'Prefere peças básicas e versáteis',
          'Valoriza qualidade sobre quantidade',
          'Gosta de cores neutras e sóbrias'
        ],
        recommendations: [
          'Invista em peças chave de boa qualidade',
          'Combine texturas para criar interesse visual',
          'Adicione acessórios clássicos ao look'
        ]
      },
      {
        category: 'Romântico Feminino',
        percentage: 60,
        description: 'Você adora detalhes delicados e femininos.',
        characteristics: ['Gosta de estampas florais', 'Prefere silhuetas fluidas'],
        recommendations: ['Use tecidos leves', 'Aposte em tons pastéis']
      }
    ];

    switch (currentPage.type) {
      case 'intro':
        return <QuizIntro onStart={(name: string) => console.log('Started with:', name)} />;
      
      case 'question':
        const questionIndex = currentPage.questionIndex || 0;
        const questionData = questions[questionIndex];
        
        if (!questionData) {
          return (
            <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
              <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center mb-4">Questão {questionIndex + 1}</h2>
                <p className="text-center text-gray-600">Dados da questão não encontrados</p>
              </div>
            </div>
          );
        }
        
        // Canvas editável baseado na estrutura analisada com imagens responsivas
        const realImageUrls = [
          'https://cakto-quiz-br01.b-cdn.net/uploads/b2fefbd6-0e7d-4582-ba8b-2896addff401.png',
          'https://cakto-quiz-br01.b-cdn.net/uploads/b15ba435-ffdf-4cc4-babf-db387ddd5966.png',
          'https://cakto-quiz-br01.b-cdn.net/uploads/5932c580-f01e-4d7d-a205-fb28de5ac3ef.png',
          'https://cakto-quiz-br01.b-cdn.net/uploads/41147537-a827-4186-b335-f927bfb60584.png',
          'https://cakto-quiz-br01.b-cdn.net/uploads/bea71e05-26ef-457f-82e5-f1557f80f667.png',
          'https://cakto-quiz-br01.b-cdn.net/uploads/a5839aa4-5fdd-4f28-9b5e-212f76bc7f8b.png',
          'https://cakto-quiz-br01.b-cdn.net/uploads/1a64dd93-e81e-4c69-8e9a-a7929f61ec4c.png',
          'https://cakto-quiz-br01.b-cdn.net/uploads/4f5b215c-b36c-429f-9006-14d957e6ddd0.png'
        ];
        
        const questionImageOptions = questionData.options?.map((option: any, index: number) => ({
          id: `option-${index}`,
          label: String.fromCharCode(65 + index), // A, B, C, etc.
          text: option.text,
          imageUrl: realImageUrls[index] || option.imageUrl,
          alt: `${String.fromCharCode(65 + index)}) ${option.text}`
        })) || [];

        const questionProgress = ((questionIndex + 1) / 9) * 100;

        return (
          <CanvasLayout>
            <CanvasHeader 
              logoUrl={realComponentConfig.intro.logoImage}
              progress={questionProgress}
              onBackClick={() => console.log('Back clicked')}
            />
            
            <CanvasContent>
              <EditableHeadingCanvas
                id="question-heading"
                text={questionData.title || `${questionIndex + 1}- Como você define o seu jeito de Ser?`}
                isSelected={selectedComponentId === 'question-heading'}
                onSelect={() => setSelectedComponentId('question-heading')}
                onTextChange={(text) => {
                  console.log('Question text changed:', text);
                  setHasUnsavedChanges(true);
                }}
              />
              
              <EditableSpacerCanvas
                id="question-spacer"
                isSelected={selectedComponentId === 'question-spacer'}
                onSelect={() => setSelectedComponentId('question-spacer')}
              />
              
              <EditableImageOptions
                id="question-options"
                options={questionImageOptions}
                isSelected={selectedComponentId === 'question-options'}
                onSelect={() => setSelectedComponentId('question-options')}
                onOptionClick={(optionId) => console.log('Option clicked:', optionId)}
                onOptionUpdate={(optionId, field, value) => {
                  console.log('Option updated:', optionId, field, value);
                  setHasUnsavedChanges(true);
                }}
                onConfigureOption={(optionId) => {
                  setSelectedOptionId(optionId);
                  setShowOptionConfig(true);
                }}
                columns={2}
              />
              
              <EditableButtonCanvas
                id="question-button"
                text="Continuar"
                isSelected={selectedComponentId === 'question-button'}
                onSelect={() => setSelectedComponentId('question-button')}
                onClick={() => console.log('Continue clicked')}
                onTextChange={(text) => {
                  console.log('Button text changed:', text);
                  setHasUnsavedChanges(true);
                }}
              />
            </CanvasContent>
            
            <CanvasFooter />
          </CanvasLayout>
        );
      
      case 'strategic':
        
      case 'transition-strategic':
        return <QuizFinalTransition onShowResult={() => console.log('Show strategic questions')} />;
      
      case 'capture':
        return (
          <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-6">
              <h2 className="text-2xl font-playfair text-[#432818] text-center font-bold">
                Quase lá! 📧
              </h2>
              <p className="text-[#3a3a3a] text-center">
                Para receber seu resultado completo e personalizado, precisamos do seu email.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="w-full p-3 border border-[#B89B7A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B89B7A]"
                />
                <button className="w-full bg-[#B89B7A] text-white py-3 rounded-md hover:bg-[#a08968] transition-colors">
                  Receber Meu Resultado
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'transition-result':
        return <QuizFinalTransition onShowResult={() => console.log('Show result')} />;
      
      case 'result':
        return (
          <QuizResult
            primaryStyle={{
              category: 'Clássico Elegante',
              percentage: 75
            }}
            secondaryStyles={[
              {
                category: 'Romântico Feminino',
                percentage: 60
              }
            ]}
            onReset={() => {}}
          />
        );
      
      case 'offer':
        return (
          <QuizOfferPage
            onAccept={() => {}}
            onDecline={() => {}}
          />
        );
      
      default:
        return <div className="p-8 text-center">Componente não encontrado</div>;
    }
  };

  

  const { width, height } = getViewportDimensions();

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-lg"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:static top-0 left-0 z-40 w-64 h-full bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
      `}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Páginas do Quiz</h2>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  setCurrentPageId(page.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                  currentPageId === page.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-sm">{page.name}</div>
                <div className="text-xs text-gray-500 mt-1 capitalize">{page.type}</div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <h1 className="font-semibold text-xl lg:block hidden">Editor CaktoQuiz</h1>
            <h1 className="font-semibold text-lg lg:hidden">CaktoQuiz</h1>
            <div className="text-sm text-gray-600 truncate">
              {currentPage?.name} - {currentPage?.type}
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <ViewportControls />
            
            <Button
              variant={showEditor ? "default" : "outline"}
              size="sm"
              onClick={() => setShowEditor(!showEditor)}
              className="flex items-center gap-1"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">{showEditor ? 'Ocultar Editor' : 'Mostrar Editor'}</span>
            </Button>
            
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            
            <Button 
              onClick={handleSave}
              className={`
                ${hasUnsavedChanges 
                  ? 'bg-[#B89B7A] hover:bg-[#8B7355] text-white' 
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                }
                transition-colors duration-200
              `}
              disabled={!hasUnsavedChanges}
              size="sm"
            >
              Salvar
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Preview Area */}
          <div 
            className="flex-1 bg-gray-50 overflow-auto"
            style={{ 
              maxWidth: viewportMode === 'desktop' ? '100%' : width,
              maxHeight: viewportMode === 'desktop' ? '100%' : height 
            }}
          >
            <div className="w-full h-full">
              {renderCurrentComponent()}
            </div>
          </div>

          {/* Editor Panel */}
          {showEditor && (
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto">
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-4">Editor de Propriedades</h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Selecione um componente no preview para editar suas propriedades.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Panels */}
      <OptionConfigurationPanel
        optionId={selectedOptionId}
        isOpen={showOptionConfig}
        onClose={() => {
          setShowOptionConfig(false);
          setSelectedOptionId(null);
        }}
      />
    </div>
  );
};
