
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit3, Eye, Smartphone, Tablet, Monitor, Menu, X } from 'lucide-react';
import { CanvasLayout, CanvasHeader, CanvasContent, EditableHeadingCanvas, EditableSpacerCanvas, EditableOptionsCanvas, EditableButtonCanvas, CanvasFooter } from '@/components/editor/CanvasLayout';
import { EditableImageOptions } from '@/components/editor/EditableImageOptions';
import { OptionConfigurationPanel, StageConfigurationPanel } from '@/components/editor/ConfigurationPanel';
import { useSupabaseQuestions } from '@/hooks/useSupabaseQuestions';
import { toast } from '@/components/ui/use-toast';

// Import real quiz components for faithful layouts
import QuizIntro from '@/components/QuizIntro';
import QuizFinalTransition from '@/components/QuizFinalTransition';
import QuizResult from '@/components/quiz/QuizResult';
import QuizOffer from '@/components/quiz/QuizOffer';

interface EditorPage {
  id: string;
  name: string;
  type: 'intro' | 'question' | 'transition-strategic' | 'strategic' | 'capture' | 'transition-result' | 'result' | 'offer';
  questionIndex?: number;
  stepIndex?: number;
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

  // Load saved config from localStorage
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
    
    // Save to localStorage
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
      description: "Todas as alterações foram salvas.",
    });
  };

  // Viewport dimensions for responsive preview
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

    if (error) {
      return (
        <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center">
              <p className="text-red-600 mb-4">Erro ao carregar questões</p>
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      );
    }

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
        
        const questionImageOptions = questionData.options?.map((option: any, index: number) => ({
          id: `option-${index}`,
          label: String.fromCharCode(65 + index),
          text: option.text,
          imageUrl: option.imageUrl,
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
        const strategicIndex = currentPage.questionIndex || 0;
        const strategicQuestion = strategicQuestions[strategicIndex];
        
        if (!strategicQuestion) {
          return (
            <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
              <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center mb-4">Questão Estratégica {strategicIndex + 1}</h2>
                <p className="text-center text-gray-600">Questão estratégica não encontrada</p>
              </div>
            </div>
          );
        }
        
        return (
          <div className="min-h-screen bg-[#fffaf7] flex flex-col">
            <div className="container mx-auto px-4 py-8 w-full max-w-5xl flex-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-[#432818] mb-2">
                    Questão Estratégica {strategicIndex + 1} de {strategicQuestions.length}
                  </h1>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((strategicIndex + 1) / strategicQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold text-[#432818] mb-6 text-center">
                  {strategicQuestion.title}
                </h2>
                
                <div className="space-y-3">
                  {strategicQuestion.options?.map((option: any, index: number) => (
                    <button
                      key={index}
                      className="w-full p-4 text-left border border-[#D4AF37] rounded-lg hover:bg-[#fff9e6] transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="font-semibold text-[#432818] mr-3">
                          {String.fromCharCode(65 + index)})
                        </span>
                        <span className="text-[#3a3a3a]">{option.text}</span>
                      </div>
                    </button>
                  )) || (
                    <div className="text-center text-gray-500 py-8">
                      Nenhuma opção disponível para esta questão
                    </div>
                  )}
                </div>
                
                <div className="mt-8 text-center">
                  <button className="bg-[#D4AF37] text-white px-8 py-3 rounded-lg hover:bg-[#b8941f] transition-colors">
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
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
            results={[
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
              }
            ]}
            userName="Preview User"
            onRestart={() => {}}
            onShare={() => {}}
            onDownload={() => {}}
          />
        );
      
      case 'offer':
        return (
          <QuizOffer
            onAccept={() => {}}
            onDecline={() => {}}
          />
        );
      
      default:
        return <div className="p-8 text-center">Componente não encontrado</div>;
    }
  };

  const renderEditorPanel = () => {
    if (!currentPage) return null;

    switch (currentPage.type) {
      case 'intro':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Editar Introdução do Quiz</h3>
            
            <div>
              <Label htmlFor="intro-title">Título Principal</Label>
              <Textarea
                id="intro-title"
                value={realComponentConfig.intro.title}
                onChange={(e) => updateRealComponentConfig('intro', 'title', e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="intro-subtitle">Subtítulo</Label>
              <Textarea
                id="intro-subtitle"
                value={realComponentConfig.intro.subtitle}
                onChange={(e) => updateRealComponentConfig('intro', 'subtitle', e.target.value)}
                rows={2}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="intro-description">Descrição</Label>
              <Textarea
                id="intro-description"
                value={realComponentConfig.intro.description}
                onChange={(e) => updateRealComponentConfig('intro', 'description', e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="intro-button-text">Texto do Botão</Label>
              <Input
                id="intro-button-text"
                value={realComponentConfig.intro.buttonText}
                onChange={(e) => updateRealComponentConfig('intro', 'buttonText', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <Separator />
            <h4 className="font-semibold">Imagens</h4>
            
            <div>
              <Label htmlFor="intro-logo">URL da Logo</Label>
              <Input
                id="intro-logo"
                value={realComponentConfig.intro.logoImage}
                onChange={(e) => updateRealComponentConfig('intro', 'logoImage', e.target.value)}
                placeholder="https://..."
                className="mt-1"
              />
              <div className="mt-2">
                <img 
                  src={realComponentConfig.intro.logoImage} 
                  alt="Logo preview" 
                  className="h-12 object-contain border rounded"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/120x50/ccc/666?text=Logo' }}
                />
              </div>
            </div>
            
            <Separator />
            <h4 className="font-semibold">Cores</h4>
            
            <div>
              <Label htmlFor="intro-bg-color">Cor de Fundo</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="color"
                  value={realComponentConfig.intro.backgroundColor}
                  onChange={(e) => updateRealComponentConfig('intro', 'backgroundColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={realComponentConfig.intro.backgroundColor}
                  onChange={(e) => updateRealComponentConfig('intro', 'backgroundColor', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="intro-button-color">Cor do Botão</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="color"
                  value={realComponentConfig.intro.buttonColor}
                  onChange={(e) => updateRealComponentConfig('intro', 'buttonColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={realComponentConfig.intro.buttonColor}
                  onChange={(e) => updateRealComponentConfig('intro', 'buttonColor', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'question':
      case 'strategic':
        const questionIndex = currentPage.questionIndex || 0;
        const isStrategic = currentPage.type === 'strategic';
        const questionData = isStrategic ? strategicQuestions[questionIndex] : questions[questionIndex];
        
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              Editar {isStrategic ? 'Questão Estratégica' : 'Questão'} {questionIndex + 1}
            </h3>
            
            <div>
              <Label htmlFor="question-title">Título da Questão</Label>
              <Textarea
                id="question-title"
                value={questionData?.title || ''}
                onChange={(e) => {
                  console.log('Updating question:', e.target.value);
                  setHasUnsavedChanges(true);
                }}
                rows={2}
                className="mt-1"
                placeholder="Digite o título da questão..."
              />
            </div>

            <Separator />
            <h4 className="font-semibold">Opções de Resposta</h4>
            
            {questionData?.options?.map((option, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`option-${index}`}>
                  Opção {String.fromCharCode(65 + index)}
                </Label>
                <Textarea
                  id={`option-${index}`}
                  value={option.text || ''}
                  onChange={(e) => {
                    console.log(`Updating option ${index}:`, e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  rows={2}
                  className="mt-1"
                  placeholder={`Digite a opção ${String.fromCharCode(65 + index)}...`}
                />
                {option.imageUrl && (
                  <div className="mt-2">
                    <img 
                      src={option.imageUrl} 
                      alt={`Option ${index} preview`} 
                      className="h-20 w-20 object-cover border rounded"
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/80x80/ccc/666?text=Img' }}
                    />
                  </div>
                )}
              </div>
            )) || (
              <div className="text-gray-500 text-center p-4">
                Nenhuma opção encontrada para esta questão
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Editor em desenvolvimento</h3>
            <p className="text-sm text-gray-600">
              Este tipo de componente ainda não possui editor personalizado.
            </p>
          </div>
        );
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
            <h1 className="font-semibold text-xl lg:block hidden">Editor Visual Quiz</h1>
            <h1 className="font-semibold text-lg lg:hidden">Quiz Editor</h1>
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
              Salvar Quiz
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Canvas Area */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <div 
              className="mx-auto bg-white shadow-lg min-h-full"
              style={{ 
                width: width,
                height: viewportMode === 'desktop' ? 'auto' : height,
                maxWidth: viewportMode === 'desktop' ? '100%' : width
              }}
            >
              {renderCurrentComponent()}
            </div>
          </div>

          {/* Properties Panel */}
          {showEditor && (
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto">
              <div className="p-4">
                {renderEditorPanel()}
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
        onUpdate={(optionId, field, value) => {
          console.log('Option config updated:', optionId, field, value);
          setHasUnsavedChanges(true);
        }}
      />
    </div>
  );
};
