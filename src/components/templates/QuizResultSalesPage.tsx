
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, Award, CheckCircle, Star, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { trackButtonClick, trackSaleConversion } from '@/utils/analytics';

// Tipos locais para compatibilidade
interface StyleResult {
  category: string;
  percentage: number;
}

// Helper function to get style descriptions
const getStyleDescription = (styleType: string): string => {
  switch (styleType) {
    case 'Natural':
      return 'Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.';
    case 'Clássico':
      return 'Você aprecia roupas atemporais e elegantes. Seu estilo é refinado e tradicional, com peças de qualidade que nunca saem de moda.';
    case 'Contemporâneo':
      return 'Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil, combinando o clássico com o atual.';
    case 'Elegante':
      return 'Você valoriza a sofisticação e o requinte. Seu estilo é polido e imponente, com peças de alta qualidade e acabamento impecável.';
    case 'Romântico':
      return 'Você aprecia detalhes delicados e femininos. Seu estilo é suave e gracioso, com elementos como rendas, babados e estampas florais.';
    case 'Sexy':
      return 'Você gosta de valorizar suas curvas. Seu estilo é sensual e marcante, com peças que destacam seu corpo e sua confiança.';
    case 'Dramático':
      return 'Você busca impactar e chamar atenção. Seu estilo é arrojado e marcante, com peças estruturadas e de design diferenciado.';
    case 'Criativo':
      return 'Você adora expressar sua individualidade. Seu estilo é único e original, combinando cores, texturas e elementos de forma não convencional.';
    default:
      return 'Seu estilo pessoal reflete sua personalidade e preferências únicas.';
  }
};

// Lazy load componentes menos críticos
const Testimonials = lazy(() => import('@/components/quiz-result/sales/Testimonials'));
const BenefitList = lazy(() => import('@/components/quiz-result/sales/BenefitList'));

interface QuizResultSalesPageProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  userName?: string;
}

const QuizResultSalesPage: React.FC<QuizResultSalesPageProps> = ({
  primaryStyle,
  secondaryStyles,
  userName = 'Visitante'
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [criticalImagesLoaded, setCriticalImagesLoaded] = useState(false);

  // Pré-carregar imagens críticas
  useEffect(() => {
    const criticalImages = [
      "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg"
    ];
    
    let loadedCount = 0;
    const totalImages = criticalImages.length;
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setCriticalImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        console.error(`Failed to load image: ${src}`);
        if (loadedCount === totalImages) {
          setCriticalImagesLoaded(true);
        }
      };
    });
    
    // Timeout para garantir que não ficará travado mesmo se alguma imagem falhar
    const timeout = setTimeout(() => {
      setCriticalImagesLoaded(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleBuyNow = () => {
    // Rastrear evento de clique no botão
    trackButtonClick('buy_now_button', 'Quero Comprar', 'result_page_main_cta');
    
    // Rastrear conversão para analytics
    trackSaleConversion(39);
    
    toast({
      title: "Redirecionando para o checkout",
      description: "Você será redirecionado para a página de pagamento.",
    });
    
    // URL do checkout
    window.location.href = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912";
  };

  // Loading state quando imagens críticas estão carregando
  if (!criticalImagesLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf7]">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-[#432818]">Carregando seu resultado personalizado...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf7]">
      {/* Header */}
      <header className="bg-white py-4 px-4 border-b border-[#B89B7A]/20 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg" 
            alt="Logo" 
            className="h-16" 
            width="128"
            height="64"
          />
          <div className="text-right">
            <p className="text-sm text-[#432818]"><span className="font-semibold text-[#aa6b5d]">5 x de R$ 8,83 *</span></p>
            <p className="text-sm text-[#432818]">Ou R$ 39,90 à vista</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl md:text-4xl font-playfair text-[#aa6b5d] mb-4">
                {userName}, seu Estilo é {primaryStyle.category}!
              </h1>
              <p className="text-lg mb-6 text-[#3a3a3a]">
                Descubra como aplicar seu estilo predominante com clareza e autenticidade no seu dia a dia.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h2 className="font-medium text-[#aa6b5d] mb-2">Seu estilo predominante:</h2>
                <div className="flex flex-col items-start">
                  <h3 className="font-playfair text-xl mb-2">{primaryStyle.category}</h3>
                  <div className="w-16 h-16 rounded-full bg-[#aa6b5d] flex items-center justify-center text-white text-2xl font-bold mb-2">
                    {primaryStyle.percentage}%
                  </div>
                  <p className="text-sm text-[#3a3a3a]/80">{getStyleDescription(primaryStyle.category)}</p>
                </div>
              </div>
              {secondaryStyles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-[#aa6b5d] mb-4">
                    Seus estilos complementares
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                    {secondaryStyles.slice(0, 2).map((style, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-white p-4 rounded-lg shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#432818]">
                            {style.category}
                          </span>
                          <span className="text-sm font-semibold text-[#aa6b5d]">
                            {style.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#FAF9F7] rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-2 bg-[#B89B7A] rounded-full"
                            style={{ width: `${style.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp"
                alt="Resultado do Quiz Visagismo"
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
                width="600"
                height="400"
              />
            </div>
          </div>
        </section>

        {/* Seção Antes e Depois */}
        <section className="mb-16">
          <h2 className="text-3xl font-playfair text-[#aa6b5d] text-center mb-6">
            Quando você não conhece seu estilo...
          </h2>
          <ul className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
              <span>Compra peças por impulso que não combinam entre si</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
              <span>Sente que tem um guarda-roupa cheio, mas "nada para vestir"</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
              <span>Investe em tendências que não valorizam sua imagem</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
              <span>Tem dificuldade em criar uma imagem coerente e autêntica</span>
            </li>
          </ul>
          <h2 className="text-3xl font-playfair text-[#B89B7A] text-center mt-12 mb-6">
            Quando você domina seu estilo...
          </h2>
          <ul className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <span>Economiza tempo e dinheiro em compras conscientes</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <span>Projeta a imagem que realmente representa você</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <span>Aumenta sua confiança em qualquer ambiente</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <span>Cria looks harmoniosos com menos peças</span>
            </li>
          </ul>
        </section>

        {/* Final CTA */}
        <section className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
            Transforme seu Estilo Agora!
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Não perca mais tempo com roupas que não combinam com você. Descubra como 
            expressar sua verdadeira essência através do seu estilo pessoal.
          </p>
          <Button 
            onClick={handleBuyNow}
            className="bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-6 px-8 rounded-md text-lg leading-none md:leading-normal transition-colors duration-300"
          >
            <Star className="w-5 h-5 mr-2" />
            Quero Transformar Meu Estilo
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#432818] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">© 2025 Todos os direitos reservados</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-white hover:text-[#B89B7A]">Termos de Uso</a>
            <a href="#" className="text-white hover:text-[#B89B7A]">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuizResultSalesPage;
