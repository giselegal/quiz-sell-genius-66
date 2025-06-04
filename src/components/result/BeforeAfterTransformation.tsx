import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  CheckCircle,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { trackButtonClick } from "@/utils/analytics";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { preloadImagesByUrls } from "@/utils/imageManager";

interface BeforeAfterTransformationProps {
  primaryStyle?: any;
  onContinue?: () => void;
  handleCTAClick?: () => void;
}

interface TransformationItem {
  image: string;
  name: string;
  id: string;
  width?: number;
  height?: number;
}

// Transformações reais de clientes
const transformations: TransformationItem[] = [
  {
    image:
      "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80,w_800/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    name: "Adriana",
    id: "transformation-adriana",
    width: 800,
    height: 1000,
  },
  {
    image:
      "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_80,w_800/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    name: "Mariangela",
    id: "transformation-mariangela",
    width: 800,
    height: 1000,
  },
];

// Pré-carregar as imagens prioritárias
const preloadInitialTransformationImages = () => {
  const imageUrls = transformations.slice(0, 1).map((item) => item.image);
  if (imageUrls.length > 0) {
    preloadImagesByUrls(imageUrls, {
      quality: 85,
      batchSize: 1,
    });
  }
};

export const BeforeAfterTransformation: React.FC<
  BeforeAfterTransformationProps
> = ({ primaryStyle, onContinue, handleCTAClick }) => {
  const [activeTab, setActiveTab] = useState("before");
  const [showAnimation, setShowAnimation] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Default style if none provided
  const defaultStyle: any = {
    category: "Natural",
    score: 0,
    percentage: 0,
  };

  const style = primaryStyle || defaultStyle;
  const activeTransformation = transformations[activeIndex];
  const autoSlideInterval = 6000; // Intervalo para mudança automática

  // Efeito para pré-carregar imagens iniciais
  useEffect(() => {
    preloadInitialTransformationImages();
    const fallbackLoadingTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3000);

    return () => clearTimeout(fallbackLoadingTimer);
  }, []);

  // Efeito para gerenciar carregamento de imagens
  useEffect(() => {
    setImageLoaded(false);
    setIsLoading(true);

    const currentImage = activeTransformation?.image;
    if (currentImage) {
      const img = new Image();
      img.src = currentImage;
      img.onload = () => {
        setImageLoaded(true);
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
      };

      // Pré-carrega próxima imagem
      const nextIndex = (activeIndex + 1) % transformations.length;
      if (
        transformations.length > 1 &&
        transformations[nextIndex] &&
        nextIndex !== activeIndex
      ) {
        const nextImg = new Image();
        nextImg.src = transformations[nextIndex].image;
      }

      const timer = setTimeout(() => {
        if (!imageLoaded) {
          setIsLoading(false);
        }
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [activeIndex, activeTransformation]);

  // Auto slide para as transformações
  useEffect(() => {
    if (transformations.length <= 1 || !imageLoaded || activeTab !== "after")
      return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) =>
        prev === transformations.length - 1 ? 0 : prev + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(intervalId);
  }, [
    transformations.length,
    autoSlideInterval,
    imageLoaded,
    activeIndex,
    activeTab,
  ]);

  useEffect(() => {
    // Start animation after a delay
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex((prev) =>
      prev === 0 ? transformations.length - 1 : prev - 1
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prev) =>
      prev === transformations.length - 1 ? 0 : prev + 1
    );
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else if (handleCTAClick) {
      handleCTAClick();
    }
  };

  const handleButtonClick = () => {
    trackButtonClick(
      "checkout_button",
      "Iniciar Checkout",
      "transformation_section"
    );
    if (handleCTAClick) {
      handleCTAClick();
    } else {
      window.location.href =
        "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912";
    }
  };

  const getStyleSpecificContent = () => {
    if (!style?.category) {
      return {
        before: {
          title: "Antes da Transformação",
          description:
            "Você provavelmente está usando roupas que não refletem sua verdadeira essência e personalidade.",
          points: [
            "Peças que não valorizam seu tipo físico",
            "Cores que não harmonizam com seu tom de pele",
            "Estilos que não expressam sua personalidade",
            "Combinações sem coerência visual",
          ],
        },
        after: {
          title: "Depois da Transformação",
          description:
            "Ao incorporar elementos do seu estilo dominante, você expressará naturalmente sua personalidade através das roupas.",
          points: [
            "Peças que valorizam suas características físicas",
            "Cores que realçam seu tom de pele",
            "Estilos que expressam sua personalidade",
            "Combinações harmoniosas e coerentes",
          ],
        },
      };
    }

    switch (style.category) {
      case "Romântico":
        return {
          before: {
            title: "Antes da Transformação Romântica",
            description:
              "Você provavelmente está usando roupas que não valorizam sua essência romântica, com peças muito estruturadas ou minimalistas que não expressam sua personalidade delicada e feminina.",
            points: [
              "Roupas muito rígidas ou geométricas",
              "Cores neutras ou muito escuras",
              "Ausência de detalhes delicados",
              "Silhuetas que não valorizam suas curvas",
            ],
          },
          after: {
            title: "Depois da Transformação Romântica",
            description:
              "Ao incorporar elementos do estilo Romântico, você expressará naturalmente sua personalidade através de peças delicadas, fluidas e com detalhes femininos que realçam sua beleza natural.",
            points: [
              "Tecidos leves e fluidos que criam movimento",
              "Estampas florais e cores suaves",
              "Detalhes como babados, laços e rendas",
              "Silhuetas que valorizam a feminilidade",
            ],
          },
        };

      case "Elegante":
        return {
          before: {
            title: "Antes da Transformação Elegante",
            description:
              "Você provavelmente está usando roupas que não transmitem a sofisticação que você naturalmente possui, com peças muito casuais ou desconexas que não refletem sua essência refinada.",
            points: [
              "Combinações sem harmonia visual",
              "Peças muito casuais para ocasiões importantes",
              "Acessórios que não complementam o visual",
              "Tecidos de qualidade inferior",
            ],
          },
          after: {
            title: "Depois da Transformação Elegante",
            description:
              "Ao incorporar elementos do estilo Elegante, você expressará naturalmente sua sofisticação através de peças bem estruturadas, tecidos nobres e uma paleta de cores sofisticada.",
            points: [
              "Peças bem cortadas e estruturadas",
              "Tecidos de qualidade superior",
              "Acessórios refinados e minimalistas",
              "Combinações harmoniosas e sofisticadas",
            ],
          },
        };

      case "Natural":
        return {
          before: {
            title: "Antes da Transformação Natural",
            description:
              "Você provavelmente está usando roupas que não refletem sua essência autêntica e descomplicada, com peças muito elaboradas ou desconfortáveis que não combinam com seu estilo de vida prático.",
            points: [
              "Peças desconfortáveis ou restritivas",
              "Excessos de acessórios ou detalhes",
              "Combinações muito formais para o dia a dia",
              "Tecidos sintéticos que não respiram",
            ],
          },
          after: {
            title: "Depois da Transformação Natural",
            description:
              "Ao incorporar elementos do estilo Natural, você expressará sua autenticidade através de peças confortáveis, funcionais e em materiais naturais que combinam com seu estilo de vida ativo.",
            points: [
              "Tecidos naturais como algodão, linho e lã",
              "Peças confortáveis e funcionais",
              "Cores terrosas e neutras",
              "Acessórios artesanais e minimalistas",
            ],
          },
        };

      default:
        return {
          before: {
            title: "Antes da Transformação",
            description:
              "Você provavelmente está usando roupas que não refletem sua verdadeira essência e personalidade, criando uma desconexão entre quem você é e como se apresenta.",
            points: [
              "Peças que não valorizam seu tipo físico",
              "Cores que não harmonizam com seu tom de pele",
              "Estilos que não expressam sua personalidade",
              "Combinações sem coerência visual",
            ],
          },
          after: {
            title: "Depois da Transformação",
            description:
              "Ao incorporar elementos do seu estilo dominante, você expressará naturalmente sua personalidade através das roupas, criando uma imagem autêntica e poderosa.",
            points: [
              "Peças que valorizam suas características físicas",
              "Cores que realçam seu tom de pele",
              "Estilos que expressam sua personalidade",
              "Combinações harmoniosas e coerentes",
            ],
          },
        };
    }
  };

  const content = getStyleSpecificContent();

  return (
    <Card className="w-full max-w-6xl mx-auto border-0 shadow-lg overflow-hidden bg-white/95 backdrop-blur">
      <CardHeader className="bg-gradient-to-r from-[#F5EEE6] to-[#F9F5F0] border-b">
        <CardTitle className="text-2xl md:text-3xl font-serif text-[#432818] text-center">
          Sua Transformação de Estilo
        </CardTitle>
        <CardDescription className="text-center">
          Descubra como o conhecimento do seu estilo {style.category} pode
          transformar sua imagem
        </CardDescription>
      </CardHeader>

      <Tabs
        defaultValue="before"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-6 pt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="before"
              className="data-[state=active]:bg-[#B89B7A]/20 data-[state=active]:text-[#432818]"
            >
              Antes
            </TabsTrigger>
            <TabsTrigger
              value="after"
              className="data-[state=active]:bg-[#B89B7A]/20 data-[state=active]:text-[#432818]"
            >
              Depois
            </TabsTrigger>
            <TabsTrigger
              value="transformations"
              className="data-[state=active]:bg-[#B89B7A]/20 data-[state=active]:text-[#432818]"
            >
              Transformações Reais
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-6">
          <TabsContent value="before" className="mt-0">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-medium text-[#432818] mb-2">
                  {content.before.title}
                </h3>
                <p className="text-gray-600">{content.before.description}</p>
              </div>

              <div className="bg-[#F9F5F0] rounded-lg p-4">
                <h4 className="font-medium text-[#432818] mb-2">
                  Desafios comuns:
                </h4>
                <ul className="space-y-2">
                  {content.before.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-2 mt-0.5 p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {showAnimation && activeTab === "before" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="text-center"
                >
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab("after")}
                    className="text-[#B89B7A] hover:text-[#8A7258] hover:bg-[#F5EEE6]"
                  >
                    Ver como pode ser depois
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="after" className="mt-0">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-medium text-[#432818] mb-2">
                  {content.after.title}
                </h3>
                <p className="text-gray-600">{content.after.description}</p>
              </div>

              <div className="bg-[#F5F9F1] rounded-lg p-4">
                <h4 className="font-medium text-[#432818] mb-2">
                  Benefícios da transformação:
                </h4>
                <ul className="space-y-2">
                  {content.after.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-2 mt-0.5 p-1">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-[#FBF7F1] border border-[#B89B7A]/30 rounded-lg p-4 text-center"
              >
                <p className="text-[#432818] font-medium mb-2">
                  Veja como outras mulheres transformaram suas imagens!
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Conheça transformações reais de clientes que aplicaram o
                  método
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("transformations")}
                  className="border-[#B89B7A]/50 text-[#432818] hover:bg-[#B89B7A]/10"
                >
                  Ver Transformações Reais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="transformations" className="mt-0">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
                  Transformações de Mulheres Reais
                </h3>
                <p className="text-lg text-[#432818] max-w-3xl mx-auto">
                  Mulheres que reencontraram a própria essência e passaram a
                  refletir quem são através do estilo pessoal.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
                {/* Seção de Texto */}
                <div className="text-left lg:w-2/5 order-2 lg:order-1">
                  <h4 className="text-xl md:text-2xl font-semibold text-[#432818] mb-4 font-playfair">
                    Transforme Sua Imagem,{" "}
                    <span className="text-[#aa6b5d]">Revele Sua Essência</span>
                  </h4>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Seu estilo é uma ferramenta poderosa. Não se trata apenas de
                    roupas, mas de comunicar quem você é e aspira ser. Com a
                    orientação certa, você pode:
                  </p>
                  <ul className="space-y-3 text-gray-700 mb-8">
                    {[
                      {
                        text: "Construir looks com intenção e identidade visual.",
                      },
                      {
                        text: "Utilizar cores, modelagens e tecidos a seu favor.",
                      },
                      {
                        text: "Alinhar sua imagem aos seus objetivos pessoais e profissionais.",
                      },
                      {
                        text: "Desenvolver um guarda-roupa funcional e inteligente.",
                      },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#B89B7A] mr-3 mt-1 flex-shrink-0" />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={handleButtonClick}
                    className="text-white py-3.5 px-8 rounded-lg transition-all duration-300 w-full sm:w-auto text-base font-medium"
                    style={{
                      background: "linear-gradient(to right, #aa6b5d, #B89B7A)",
                      boxShadow: "0 4px 14px rgba(184, 155, 122, 0.3)",
                    }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                  >
                    <span className="flex items-center justify-center gap-2.5">
                      <ShoppingCart
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isButtonHovered ? "scale-110" : ""
                        }`}
                      />
                      <span>Quero Transformar Minha Imagem</span>
                    </span>
                  </Button>
                </div>

                {/* Seção do Slider de Imagem */}
                <div className="lg:w-3/5 order-1 lg:order-2 w-full max-w-xl mx-auto">
                  {isLoading && !imageLoaded ? (
                    <div className="aspect-[4/5] bg-gray-200 rounded-lg flex items-center justify-center w-full mx-auto">
                      <p className="text-gray-500">
                        Carregando transformação...
                      </p>
                    </div>
                  ) : (
                    <Card className="overflow-hidden shadow-2xl rounded-xl border border-[#B89B7A]/20 bg-white">
                      <div className="relative w-full aspect-[4/5] mx-auto">
                        <OptimizedImage
                          src={activeTransformation.image}
                          alt={`${activeTransformation.name} - Transformação`}
                          width={activeTransformation.width || 800}
                          height={activeTransformation.height || 1000}
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl"
                          onLoad={() => {
                            setImageLoaded(true);
                            setIsLoading(false);
                          }}
                          priority={true}
                          quality={85}
                          placeholderColor="#f8f4ef"
                        />
                      </div>
                      <div className="p-4 bg-white rounded-b-xl">
                        <p className="text-center text-xl font-medium text-[#432818] mb-2">
                          {activeTransformation.name}
                        </p>
                        <div className="flex justify-center space-x-2 mt-2">
                          {transformations.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => handleDotClick(index)}
                              className={`w-3 h-3 rounded-full transition-colors ${
                                activeIndex === index
                                  ? "bg-[#B89B7A]"
                                  : "bg-gray-300 hover:bg-gray-400"
                              }`}
                              aria-label={`Ver transformação ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </Card>
                  )}
                  {transformations.length > 1 && (
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="outline"
                        onClick={handlePrevClick}
                        className="text-[#432818] border-[#B89B7A] hover:bg-[#B89B7A]/10"
                      >
                        <ChevronLeft className="w-5 h-5 mr-1" /> Anterior
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleNextClick}
                        className="text-[#432818] border-[#B89B7A] hover:bg-[#B89B7A]/10"
                      >
                        Próxima <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>

        <CardFooter
          className={cn(
            "flex justify-between border-t bg-[#FBF7F1] p-4",
            activeTab === "before"
              ? "justify-start"
              : activeTab === "after"
              ? "justify-end"
              : "justify-center"
          )}
        >
          {activeTab === "before" ? (
            <Button
              variant="outline"
              onClick={() => setActiveTab("after")}
              className="border-[#B89B7A]/50 text-[#432818] hover:bg-[#B89B7A]/10"
            >
              Ver transformação
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : activeTab === "after" ? (
            <Button
              onClick={handleContinue}
              className="bg-[#B89B7A] hover:bg-[#8A7258] text-white"
            >
              Continuar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleContinue}
              className="bg-[#B89B7A] hover:bg-[#8A7258] text-white px-8"
            >
              Finalizar Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default BeforeAfterTransformation;
