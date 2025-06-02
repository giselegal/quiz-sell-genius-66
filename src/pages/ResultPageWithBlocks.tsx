import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';
import { DragDropContainer } from '@/components/result/DragDropContainer';
import { BlockEditorModal } from '@/components/result/BlockEditorModal';
import { useBlocks } from '@/hooks/useBlocks';
import { BlockData } from '@/types/resultPageConfig';
import { styleConfig } from '@/config/styleConfig';
import { ShoppingCart, Plus, Edit } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import ErrorState from '@/components/result/ErrorState';
import { Button } from '@/components/ui/button';
import { useLoadingState } from '@/hooks/useLoadingState';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import ResultSkeleton from '@/components/result/ResultSkeleton';
import { trackButtonClick } from '@/utils/analytics';
import { useAuth } from '@/context/AuthContext';
import ResourcePreloader from '@/components/result/ResourcePreloader';
import PerformanceMonitor from '@/components/result/PerformanceMonitor';

// Design tokens
const tokens = {
  colors: {
    primary: '#B89B7A',
    primaryDark: '#A1835D',
    primaryLight: '#D4B79F',
    secondary: '#aa6b5d',
    secondaryDark: '#8F5A4D',
    secondaryLight: '#C28A7D',
    background: '#fffaf7',
    backgroundAlt: '#f9f4ef',
    text: '#432818',
    textLight: '#8F7A6A',
    textMuted: '#6B5B4E',
    success: '#4CAF50',
    successDark: '#45a049',
    border: 'rgba(184, 155, 122, 0.2)',
    borderLight: 'rgba(184, 155, 122, 0.1)',
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
  },
  shadows: {
    sm: '0 2px 4px rgba(184, 155, 122, 0.08)',
    md: '0 4px 8px rgba(184, 155, 122, 0.12)',
    lg: '0 8px 16px rgba(184, 155, 122, 0.16)',
    xl: '0 12px 24px rgba(184, 155, 122, 0.20)',
    cta: '0 8px 32px rgba(184, 155, 122, 0.4)',
  },
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

const ResultPageWithBlocks: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const { user } = useAuth();
  
  // Config editável
  const { resultPageConfig, updateSection } = useResultPageConfig(primaryStyle?.category || 'Natural');
  
  // Sistema de blocos drag-and-drop
  const { 
    blocks, 
    updateBlocks, 
    addBlock, 
    updateBlock, 
    deleteBlock 
  } = useBlocks(primaryStyle?.category || 'Natural');
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBlock, setEditingBlock] = useState<BlockData | null>(null);
  
  const [imagesLoaded, setImagesLoaded] = useState({
    style: false,
    guide: false
  });
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isLoading, completeLoading } = useLoadingState({
    minDuration: isLowPerformance ? 100 : 300,
    disableTransitions: isLowPerformance
  });

  // Button hover state
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Scroll tracking for sticky header and bottom bar
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBottomBar, setShowBottomBar] = useState(false);
  
  // Active section tracking
  const [activeSection, setActiveSection] = useState('primary-style');
  
  // Temporizador de contagem regressiva
  const [timer, setTimer] = useState({
    hours: 2,
    minutes: 59,
    seconds: 59
  });
  
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer.seconds > 0) {
          return { ...prevTimer, seconds: prevTimer.seconds - 1 };
        } else if (prevTimer.minutes > 0) {
          return { ...prevTimer, minutes: prevTimer.minutes - 1, seconds: 59 };
        } else if (prevTimer.hours > 0) {
          return { hours: prevTimer.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, []);
  
  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);
    
    const hasPreloadedResults = localStorage.getItem('preloadedResults') === 'true';
    
    if (hasPreloadedResults) {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
      return;
    } 
    
    const safetyTimeout = setTimeout(() => {
      setImagesLoaded({ style: true, guide: true });
      completeLoading();
    }, 2500);

    return () => clearTimeout(safetyTimeout);
  }, [primaryStyle, globalStyles.logo, completeLoading]);
  
  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);
  
  // Scroll tracking effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrolledToBottom = scrollTop + windowHeight >= documentHeight - 800;
      
      setShowBottomBar(scrolledToBottom);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;
  
  const { category } = primaryStyle;
  
  const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.ctaClickProcessing) return;
    window.ctaClickProcessing = true;
    
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    
    if (window.innerWidth >= 768) {
      window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
    } else {
      window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
    }
    
    setTimeout(() => {
      window.ctaClickProcessing = false;
    }, 1000);
  };
  
  // Funções do sistema de blocos
  const handleEditBlock = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      setEditingBlock(block);
    }
  };

  const handleAddNewBlock = () => {
    addBlock('text');
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      backgroundColor: globalStyles.backgroundColor || tokens.colors.background,
      color: globalStyles.textColor || tokens.colors.text,
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      {/* Custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #B89B7A, #aa6b5d);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #aa6b5d, #B89B7A);
          }
        `
      }} />

      {/* Preloaders and monitors */}
      <ResourcePreloader />
      <PerformanceMonitor />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#B89B7A]/10 to-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#aa6b5d]/10 to-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/3 left-0 w-1/5 h-1/5 bg-gradient-to-r from-[#B89B7A]/5 to-[#aa6b5d]/5 rounded-full blur-3xl -translate-x-1/2"></div>
      
      {/* Header */}
      <header className="py-4 px-6 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
          <img
            src={globalStyles.logo}
            alt={globalStyles.logoAlt || "Logo"}
            style={{ height: globalStyles.logoHeight || '60px' }}
            className="h-auto object-contain"
          />
          
          {/* Controles de edição para admin */}
          {(user?.role === 'admin' || user?.email === 'admin@quiz.com') && (
            <Button 
              onClick={handleToggleEditMode}
              className={`text-white text-xs px-3 py-2 rounded-md shadow-md transition-all duration-300 ${
                isEditMode 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              }`}
            >
              <Edit className="w-3 h-3 mr-1" />
              {isEditMode ? 'Sair' : 'Editar'}
            </Button>
          )}
        </div>
      </header>

      {/* Navigation dots */}
      <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col gap-2">
          {[
            { id: 'primary-style', label: 'Seu Estilo' },
            { id: 'transformations', label: 'Transformações' },
            { id: 'motivation', label: 'Motivação' },
            { id: 'bonuses', label: 'Bônus' },
            { id: 'testimonials', label: 'Depoimentos' },
            { id: 'guarantee', label: 'Garantia' },
            { id: 'cta', label: 'Adquirir' }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === section.id ? 'bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] scale-125 shadow-sm' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Ir para seção ${section.label}`}
              title={section.label}
            />
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-[#B89B7A]/20 py-3 px-4 z-40 transition-transform duration-500 ${showBottomBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-[#432818]">Guia de Estilo e Imagem + Bônus</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] bg-clip-text text-transparent whitespace-nowrap">5x R$ 8,83</span>
              <span className="text-xs font-normal text-[#8F7A6A] whitespace-nowrap">ou R$ 39,90 à vista</span>
            </div>
          </div>
          <Button 
            onClick={handleCTAClick} 
            className="text-white text-xs sm:text-sm leading-none py-3 px-6 rounded-md shadow-md transition-all duration-300 w-full sm:w-auto cursor-pointer"
            style={{
              background: 'linear-gradient(90deg, #4CAF50 0%, #43a047 100%)',
              boxShadow: '0 4px 14px rgba(76, 175, 80, 0.25)',
              transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setIsButtonHovered(true)} 
            onMouseLeave={() => setIsButtonHovered(false)}
            type="button"
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
              Adquirir Agora
            </span>
          </Button>
        </div>
      </div>

      {/* CONTAINER PRINCIPAL COM SISTEMA DE BLOCOS */}
      <div className="container mx-auto px-6 lg:px-8 py-8 max-w-4xl relative z-10">
        {/* SISTEMA DE BLOCOS DRAG-AND-DROP */}
        <DragDropContainer
          blocks={blocks}
          onBlocksChange={updateBlocks}
          onEditBlock={handleEditBlock}
          onDeleteBlock={deleteBlock}
          isEditMode={isEditMode}
          primaryStyle={primaryStyle}
          secondaryStyles={secondaryStyles}
          globalStyles={globalStyles}
          user={user}
          resultPageConfig={resultPageConfig}
          onCTAClick={handleCTAClick}
          isButtonHovered={isButtonHovered}
          setIsButtonHovered={setIsButtonHovered}
          timer={timer}
          imagesLoaded={imagesLoaded}
          setImagesLoaded={setImagesLoaded}
          isLowPerformance={isLowPerformance}
          tokens={tokens}
        />

        {/* BOTÃO PARA ADICIONAR NOVOS BLOCOS */}
        {isEditMode && (
          <div className="text-center mt-8">
            <Button
              onClick={handleAddNewBlock}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-md shadow-md transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Adicionar Novo Bloco
            </Button>
          </div>
        )}
      </div>

      {/* MODAL DE EDIÇÃO DE BLOCOS */}
      {editingBlock && (
        <BlockEditorModal
          block={editingBlock}
          onSave={(updatedBlock) => {
            updateBlock(updatedBlock.id, updatedBlock);
            setEditingBlock(null);
          }}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </div>
  );
};

export default ResultPageWithBlocks;
