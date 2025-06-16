
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit3, Eye, Smartphone, Tablet, Monitor, Menu, X } from 'lucide-react';
import { CanvasLayout, CanvasHeader, CanvasContent, EditableHeadingCanvas, EditableSpacerCanvas, EditableOptionsCanvas, EditableButtonCanvas, CanvasFooter } from './CanvasLayout';
import { EditorGroup, EditorField, ColorPickerField, EditorSection, QuickActions } from './EditorPanel';
import { EditableImageOptions, ImageOptionEditor } from './EditableImageOptions';
import { OptionConfigurationPanel, StageConfigurationPanel } from './ConfigurationPanel';
import { useSupabaseQuestions } from '@/hooks/useSupabaseQuestions';

interface EditorPage {
  id: string;
  name: string;
  type: 'intro' | 'question' | 'transition-strategic' | 'strategic' | 'capture' | 'transition-result' | 'result' | 'offer';
  questionIndex?: number;
  stepIndex?: number;
}

const CaktoQuizEditor = () => {
  const [pages, setPages] = useState<EditorPage[]>([]);
  const [currentPageId, setCurrentPageId] = useState<string>('');
  const [showEditor, setShowEditor] = useState(true);
  const [viewportMode, setViewportMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showOptionConfig, setShowOptionConfig] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const { questions, strategicQuestions, loading } = useSupabaseQuestions();

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
    if (pages.length === 0 && questions.length > 0) {
      const newPages: EditorPage[] = [
        { id: 'intro', name: '🏠 Introdução/Capa', type: 'intro' },
        ...questions.slice(0, 9).map((_, index) => ({
          id: `question-${index}`,
          name: `❓ Questão ${index + 1}`,
          type: 'question' as const,
          questionIndex: index
        })),
        { id: 'transition-strategic', name: '⏳ Transição → Estratégicas', type: 'transition-strategic' },
        ...strategicQuestions.map((_, index) => ({
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
  }, [questions.length, strategicQuestions.length, pages.length]);

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

    switch (currentPage.type) {
      case 'intro':
        return (
          <div 
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: realComponentConfig.intro.backgroundColor }}
          >
            <div className="max-w-md w-full text-center space-y-6">
              <img 
                src={realComponentConfig.intro.logoImage} 
                alt="Logo" 
                className="h-16 mx-auto object-contain"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/120x50/ccc/666?text=Logo' }}
              />
              <h1 
                className="text-4xl font-bold font-playfair"
                style={{ color: realComponentConfig.intro.textColor }}
              >
                {realComponentConfig.intro.title}
              </h1>
              <p 
                className="text-xl"
                style={{ color: realComponentConfig.intro.textColor }}
              >
                {realComponentConfig.intro.subtitle}
              </p>
              <p 
                className="text-lg"
                style={{ color: realComponentConfig.intro.textColor }}
              >
                {realComponentConfig.intro.description}
              </p>
              <button 
                className="w-full py-4 text-xl font-bold rounded-lg transition-colors"
                style={{ 
                  backgroundColor: realComponentConfig.intro.buttonColor,
                  color: '#ffffff'
                }}
              >
                {realComponentConfig.intro.buttonText}
              </button>
            </div>
          </div>
        );
      
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
            
            <EditorField label="Título Principal">
              <Textarea
                value={realComponentConfig.intro.title}
                onChange={(e) => updateRealComponentConfig('intro', 'title', e.target.value)}
                rows={2}
              />
            </EditorField>
            
            <EditorField label="Subtítulo">
              <Textarea
                value={realComponentConfig.intro.subtitle}
                onChange={(e) => updateRealComponentConfig('intro', 'subtitle', e.target.value)}
                rows={2}
              />
            </EditorField>
            
            <EditorField label="Descrição">
              <Textarea
                value={realComponentConfig.intro.description}
                onChange={(e) => updateRealComponentConfig('intro', 'description', e.target.value)}
                rows={3}
              />
            </EditorField>
            
            <EditorField label="Texto do Botão">
              <Input
                value={realComponentConfig.intro.buttonText}
                onChange={(e) => updateRealComponentConfig('intro', 'buttonText', e.target.value)}
              />
            </EditorField>
            
            <EditorSection title="Cores">
              <ColorPickerField
                label="Cor de Fundo"
                value={realComponentConfig.intro.backgroundColor}
                onChange={(value) => updateRealComponentConfig('intro', 'backgroundColor', value)}
              />
              
              <ColorPickerField
                label="Cor do Texto"
                value={realComponentConfig.intro.textColor}
                onChange={(value) => updateRealComponentConfig('intro', 'textColor', value)}
              />
              
              <ColorPickerField
                label="Cor do Botão"
                value={realComponentConfig.intro.buttonColor}
                onChange={(value) => updateRealComponentConfig('intro', 'buttonColor', value)}
              />
            </EditorSection>
          </div>
        );

      case 'question':
        const questionIndex = currentPage.questionIndex || 0;
        const questionData = questions[questionIndex];
        
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Editar Questão {questionIndex + 1}</h3>
            
            <EditorField label="Título da Questão">
              <Textarea
                value={questionData?.title || ''}
                onChange={(e) => console.log('Updating question:', e.target.value)}
                rows={2}
                placeholder="Digite o título da questão..."
              />
            </EditorField>

            <EditorSection title="Opções de Resposta">
              {questionData?.options?.map((option, index) => (
                <EditorField key={index} label={`Opção ${String.fromCharCode(65 + index)}`}>
                  <Textarea
                    value={option.text || ''}
                    onChange={(e) => console.log(`Updating option ${index}:`, e.target.value)}
                    rows={2}
                    placeholder={`Digite a opção ${String.fromCharCode(65 + index)}...`}
                  />
                </EditorField>
              )) || (
                <div className="text-gray-500 text-center p-4">
                  Nenhuma opção encontrada para esta questão
                </div>
              )}
            </EditorSection>

            <EditorSection title="Configurações Visuais">
              <ColorPickerField
                label="Cor de Fundo"
                value={realComponentConfig.questions.backgroundColor}
                onChange={(value) => updateRealComponentConfig('questions', 'backgroundColor', value)}
              />
              
              <ColorPickerField
                label="Cor do Texto"
                value={realComponentConfig.questions.textColor}
                onChange={(value) => updateRealComponentConfig('questions', 'textColor', value)}
              />
            </EditorSection>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Editor não disponível</h3>
            <p className="text-sm text-gray-600">
              Este tipo de componente ainda não possui editor personalizado.
            </p>
          </div>
        );
    }
  };

  const { width, height } = getViewportDimensions();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
          <p>Carregando editor...</p>
        </div>
      </div>
    );
  }

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
              onClick={() => {
                console.log('Salvando quiz completo...');
                setHasUnsavedChanges(false);
              }}
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
          {/* Canvas */}
          <div className="flex-1 relative overflow-auto">
            <div 
              className="mx-auto transition-all duration-300"
              style={{ 
                width,
                height: viewportMode === 'desktop' ? '100%' : height,
                minHeight: '100%'
              }}
            >
              {renderCurrentComponent()}
            </div>
          </div>

          {/* Editor Panel */}
          {showEditor && (
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold">Propriedades</h3>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                {renderEditorPanel()}
              </ScrollArea>
              
              <div className="p-4 border-t border-gray-200">
                <QuickActions
                  onSave={() => {
                    console.log('Saving component...');
                    setHasUnsavedChanges(false);
                  }}
                  onPreview={() => console.log('Preview component...')}
                />
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

export default CaktoQuizEditor;
