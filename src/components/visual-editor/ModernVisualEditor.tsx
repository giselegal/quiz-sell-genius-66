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
  const [showEditor, setShowEditor] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPageId, setCurrentPageId] = useState("cover");
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showOptionConfig, setShowOptionConfig] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewportMode, setViewportMode] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [loading, setLoading] = useState(true);

  const [realComponentConfig, setRealComponentConfig] = useState({
    intro: {
      title: "Descubra seu Estilo Ideal",
      description: "Responda algumas perguntas e encontre o estilo que mais combina com você!",
      logoImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
      backgroundImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
      buttonText: "Começar o Quiz"
    },
    transitions: {
      transitionTitle: "Estamos quase lá...",
      transitionDescription: "Mais algumas perguntinhas rápidas para garantir o melhor resultado!",
      transitionImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
      buttonText: "Continuar"
    },
    result: {
      resultTitle: "Seu Estilo é...",
      resultDescription: "Com base nas suas respostas, identificamos que seu estilo predominante é...",
      primaryColor: "#000000",
      secondaryColor: "#000000",
      textColor: "#000000",
      backgroundImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
      buttonText: "Ver Mais"
    },
    offer: {
      offerTitle: "Oferta Exclusiva",
      offerDescription: "Aproveite nossa oferta especial para você!",
      offerImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
      buttonText: "Comprar Agora"
    }
  });

  const [pages, setPages] = useState([
    { id: "cover", name: "Capa", type: "intro" },
    { id: "question1", name: "Questão 1", type: "question", questionIndex: 0 },
    { id: "question2", name: "Questão 2", type: "question", questionIndex: 1 },
    { id: "question3", name: "Questão 3", type: "question", questionIndex: 2 },
    { id: "question4", name: "Questão 4", type: "question", questionIndex: 3 },
    { id: "question5", name: "Questão 5", type: "question", questionIndex: 4 },
    { id: "transition1", name: "Transição 1", type: "transition-strategic" },
    { id: "strategic1", name: "Estratégica 1", type: "strategic", questionIndex: 0 },
    { id: "strategic2", name: "Estratégica 2", type: "strategic", questionIndex: 1 },
    { id: "transition2", name: "Transição 2", type: "transition-result" },
    { id: "result", name: "Resultado", type: "result" },
    { id: "offer", name: "Oferta", type: "offer" }
  ]);

  const [questions, setQuestions] = useState<any[]>([]);
  const [strategicQuestions, setStrategicQuestions] = useState<any[]>([]);

  useEffect(() => {
    const storedCoverConfig = localStorage.getItem("editorCoverConfig");
    const storedOfferConfig = localStorage.getItem("editorOfferConfig");

    if (storedCoverConfig) {
      setRealComponentConfig(prevConfig => ({
        ...prevConfig,
        intro: JSON.parse(storedCoverConfig)
      }));
    }

    if (storedOfferConfig) {
      setRealComponentConfig(prevConfig => ({
        ...prevConfig,
        offer: JSON.parse(storedOfferConfig)
      }));
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOptionClick = (optionId: string) => {
    setSelectedOptionId(optionId);
    setShowOptionConfig(true);
  };

  const handleUpdateOption = (optionId: string, field: string, value: any) => {
    console.log(`Updating option ${optionId} field ${field} with value ${value}`);
  };

  const handleConfigureOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setShowOptionConfig(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--background', realComponentConfig.intro.backgroundImage);
  }, [realComponentConfig.intro.backgroundImage]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', realComponentConfig.result.primaryColor);
  }, [realComponentConfig.result.primaryColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--secondary', realComponentConfig.result.secondaryColor);
  }, [realComponentConfig.result.secondaryColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--text', realComponentConfig.result.textColor);
  }, [realComponentConfig.result.textColor]);

  const updateConfig = (section: string, key: string, value: any) => {
    setRealComponentConfig(prevConfig => ({
      ...prevConfig,
      [section]: {
        ...prevConfig[section],
        [key]: value
      }
    }));
  };

  const handleSaveConfig = () => {
    localStorage.setItem("editorCoverConfig", JSON.stringify(realComponentConfig.intro));
    localStorage.setItem("editorOfferConfig", JSON.stringify(realComponentConfig.offer));
    toast({
      title: "Configurações salvas!",
      description: "As configurações foram salvas com sucesso."
    });
  };

  const handleResetConfig = () => {
    localStorage.removeItem("editorCoverConfig");
    localStorage.removeItem("editorOfferConfig");
    setRealComponentConfig({
      intro: {
        title: "Descubra seu Estilo Ideal",
        description: "Responda algumas perguntas e encontre o estilo que mais combina com você!",
        logoImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
        backgroundImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
        buttonText: "Começar o Quiz"
      },
      transitions: {
        transitionTitle: "Estamos quase lá...",
        transitionDescription: "Mais algumas perguntinhas rápidas para garantir o melhor resultado!",
        transitionImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
        buttonText: "Continuar"
      },
      result: {
        resultTitle: "Seu Estilo é...",
        resultDescription: "Com base nas suas respostas, identificamos que seu estilo predominante é...",
        primaryColor: "#000000",
        secondaryColor: "#000000",
        textColor: "#000000",
        backgroundImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
        buttonText: "Ver Mais"
      },
      offer: {
        offerTitle: "Oferta Exclusiva",
        offerDescription: "Aproveite nossa oferta especial para você!",
        offerImage: "https://uploads-ssl.webflow.com/64b05491983999339793b19e/64b05491983999339793b241_Group%201741.svg",
        buttonText: "Comprar Agora"
      }
    });
    toast({
      title: "Configurações resetadas!",
      description: "As configurações foram resetadas para os valores padrão."
    });
  };

  useEffect(() => {
    const mockQuestions = [
      {
        id: "q1",
        title: "Qual sua cor favorita?",
        type: "text",
        options: [
          { id: "o1", text: "Azul", styleCategory: "Clássico" },
          { id: "o2", text: "Verde", styleCategory: "Natural" },
          { id: "o3", text: "Vermelho", styleCategory: "Sexy" },
          { id: "o4", text: "Preto", styleCategory: "Dramático" }
        ],
        multiSelect: 1
      },
      {
        id: "q2",
        title: "Que tipo de roupa você prefere?",
        type: "text",
        options: [
          { id: "o5", text: "Casual", styleCategory: "Natural" },
          { id: "o6", text: "Formal", styleCategory: "Clássico" },
          { id: "o7", text: "Moderna", styleCategory: "Contemporâneo" },
          { id: "o8", text: "Elegante", styleCategory: "Elegante" }
        ],
        multiSelect: 1
      }
    ];
    
    const mockStrategicQuestions = [
      {
        id: "sq1",
        title: "Em qual ocasião você se sente mais confiante?",
        type: "text",
        options: [
          { id: "so1", text: "Festa", styleCategory: "Sexy" },
          { id: "so2", text: "Trabalho", styleCategory: "Clássico" },
          { id: "so3", text: "Dia a dia", styleCategory: "Natural" },
          { id: "so4", text: "Evento social", styleCategory: "Elegante" }
        ],
        multiSelect: 1
      }
    ];
    
    setQuestions(mockQuestions);
    setStrategicQuestions(mockStrategicQuestions);
    setLoading(false);
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
    
    if (section === "intro") {
      localStorage.setItem("editorCoverConfig", JSON.stringify(newConfig.intro));
    } else if (section === "offer") {
      localStorage.setItem("editorOfferConfig", JSON.stringify(newConfig.offer));
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
      case "mobile":
        return { width: "320px", height: "568px" };
      case "tablet":
        return { width: "768px", height: "1024px" };
      case "desktop":
        return { width: "100%", height: "100%" };
      default:
        return { width: "100%", height: "100%" };
    }
  };

  const ViewportControls = () => (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant={viewportMode === "mobile" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewportMode("mobile")}
      >
        📱 Mobile
      </Button>
      <Button
        variant={viewportMode === "tablet" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewportMode("tablet")}
      >
        <Tablet className="w-4 h-4 mr-2" />
        Tablet
      </Button>
      <Button
        variant={viewportMode === "desktop" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewportMode("desktop")}
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

    const mockPrimaryStyle = {
      category: "Elegante" as const,
      score: 85,
      percentage: 85
    };

    const mockSecondaryStyles = [
      {
        category: "Romântico" as const,
        score: 70,
        percentage: 70
      },
      {
        category: "Clássico" as const,
        score: 65,
        percentage: 65
      }
    ];

    switch (currentPage.type) {
      case "intro":
        return (
          <QuizIntro 
            config={realComponentConfig.intro}
            onStartQuiz={() => console.log("Start quiz")}
          />
        );
      
      case "transition-result":
        return (
          <QuizFinalTransition 
            onShowResult={() => console.log("Show result")}
          />
        );
      
      case "result":
        return (
          <QuizResult
            primaryStyle={mockPrimaryStyle}
            secondaryStyles={mockSecondaryStyles}
            onReset={() => console.log("Reset quiz")}
          />
        );
      
      case "offer":
        return (
          <QuizOfferPage />
        );
      
      default:
        return (
          <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">
                {currentPage.name}
              </h2>
              <p className="text-gray-600">
                Preview para {currentPage.type}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className={`${showEditor ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-gray-200 bg-white overflow-hidden`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Editor Visual</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEditor(!showEditor)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          {/* Pages List */}
          <div className="p-4">
            <h3 className="font-medium text-sm text-gray-700 mb-3">Páginas</h3>
            <div className="space-y-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPageId(page.id)}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    currentPageId === page.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Properties Panel */}
          <div className="p-4">
            <h3 className="font-medium text-sm text-gray-700 mb-3">Propriedades</h3>
            {currentPage && (
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-gray-600">Tipo</Label>
                  <p className="text-sm">{currentPage.type}</p>
                </div>
                
                {currentPage.type === "intro" && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-600">Título</Label>
                      <Input
                        value={realComponentConfig.intro.title}
                        onChange={(e) => updateRealComponentConfig("intro", "title", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Descrição</Label>
                      <Textarea
                        value={realComponentConfig.intro.description}
                        onChange={(e) => updateRealComponentConfig("intro", "description", e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Texto do Botão</Label>
                      <Input
                        value={realComponentConfig.intro.buttonText}
                        onChange={(e) => updateRealComponentConfig("intro", "buttonText", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleSave}
            className="w-full"
            disabled={!hasUnsavedChanges}
          >
            💾 Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {!showEditor && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditor(true)}
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}
            <span className="text-sm text-gray-600">
              Editando: {currentPage?.name || 'Carregando...'}
            </span>
          </div>
          
          <ViewportControls />
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div 
            className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
            style={getViewportDimensions()}
          >
            {renderCurrentComponent()}
          </div>
        </div>
      </div>
      
      {/* Configuration Panel */}
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
