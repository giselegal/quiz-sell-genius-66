
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { StyleResult } from '@/types/quiz';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeAfterTransformationProps {
  primaryStyle?: StyleResult;
  onContinue?: () => void;
  handleCTAClick?: () => void;
}

export const BeforeAfterTransformation: React.FC<BeforeAfterTransformationProps> = ({
  primaryStyle,
  onContinue,
  handleCTAClick
}) => {
  const [activeTab, setActiveTab] = useState('before');
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Default style if none provided
  const defaultStyle: StyleResult = {
    category: 'Natural',
    score: 0,
    percentage: 0
  };
  
  const style = primaryStyle || defaultStyle;
  
  useEffect(() => {
    // Start animation after a delay
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else if (handleCTAClick) {
      handleCTAClick();
    }
  };
  
  const getStyleSpecificContent = () => {
    if (!style?.category) {
      return {
        before: {
          title: "Antes da Transformação",
          description: "Você provavelmente está usando roupas que não refletem sua verdadeira essência e personalidade.",
          points: [
            "Peças que não valorizam seu tipo físico",
            "Cores que não harmonizam com seu tom de pele",
            "Estilos que não expressam sua personalidade",
            "Combinações sem coerência visual"
          ]
        },
        after: {
          title: "Depois da Transformação",
          description: "Ao incorporar elementos do seu estilo dominante, você expressará naturalmente sua personalidade através das roupas.",
          points: [
            "Peças que valorizam suas características físicas",
            "Cores que realçam seu tom de pele",
            "Estilos que expressam sua personalidade",
            "Combinações harmoniosas e coerentes"
          ]
        }
      };
    }

    switch (style.category) {
      case 'Romântico':
        return {
          before: {
            title: "Antes da Transformação Romântica",
            description: "Você provavelmente está usando roupas que não valorizam sua essência romântica, com peças muito estruturadas ou minimalistas que não expressam sua personalidade delicada e feminina.",
            points: [
              "Roupas muito rígidas ou geométricas",
              "Cores neutras ou muito escuras",
              "Ausência de detalhes delicados",
              "Silhuetas que não valorizam suas curvas"
            ]
          },
          after: {
            title: "Depois da Transformação Romântica",
            description: "Ao incorporar elementos do estilo Romântico, você expressará naturalmente sua personalidade através de peças delicadas, fluidas e com detalhes femininos que realçam sua beleza natural.",
            points: [
              "Tecidos leves e fluidos que criam movimento",
              "Estampas florais e cores suaves",
              "Detalhes como babados, laços e rendas",
              "Silhuetas que valorizam a feminilidade"
            ]
          }
        };
        
      case 'Elegante':
        return {
          before: {
            title: "Antes da Transformação Elegante",
            description: "Você provavelmente está usando roupas que não transmitem a sofisticação que você naturalmente possui, com peças muito casuais ou desconexas que não refletem sua essência refinada.",
            points: [
              "Combinações sem harmonia visual",
              "Peças muito casuais para ocasiões importantes",
              "Acessórios que não complementam o visual",
              "Tecidos de qualidade inferior"
            ]
          },
          after: {
            title: "Depois da Transformação Elegante",
            description: "Ao incorporar elementos do estilo Elegante, você expressará naturalmente sua sofisticação através de peças bem estruturadas, tecidos nobres e uma paleta de cores sofisticada.",
            points: [
              "Peças bem cortadas e estruturadas",
              "Tecidos de qualidade superior",
              "Acessórios refinados e minimalistas",
              "Combinações harmoniosas e sofisticadas"
            ]
          }
        };
        
      case 'Natural':
        return {
          before: {
            title: "Antes da Transformação Natural",
            description: "Você provavelmente está usando roupas que não refletem sua essência autêntica e descomplicada, com peças muito elaboradas ou desconfortáveis que não combinam com seu estilo de vida prático.",
            points: [
              "Peças desconfortáveis ou restritivas",
              "Excessos de acessórios ou detalhes",
              "Combinações muito formais para o dia a dia",
              "Tecidos sintéticos que não respiram"
            ]
          },
          after: {
            title: "Depois da Transformação Natural",
            description: "Ao incorporar elementos do estilo Natural, você expressará sua autenticidade através de peças confortáveis, funcionais e em materiais naturais que combinam com seu estilo de vida ativo.",
            points: [
              "Tecidos naturais como algodão, linho e lã",
              "Peças confortáveis e funcionais",
              "Cores terrosas e neutras",
              "Acessórios artesanais e minimalistas"
            ]
          }
        };
        
      default:
        return {
          before: {
            title: "Antes da Transformação",
            description: "Você provavelmente está usando roupas que não refletem sua verdadeira essência e personalidade, criando uma desconexão entre quem você é e como se apresenta.",
            points: [
              "Peças que não valorizam seu tipo físico",
              "Cores que não harmonizam com seu tom de pele",
              "Estilos que não expressam sua personalidade",
              "Combinações sem coerência visual"
            ]
          },
          after: {
            title: "Depois da Transformação",
            description: "Ao incorporar elementos do seu estilo dominante, você expressará naturalmente sua personalidade através das roupas, criando uma imagem autêntica e poderosa.",
            points: [
              "Peças que valorizam suas características físicas",
              "Cores que realçam seu tom de pele",
              "Estilos que expressam sua personalidade",
              "Combinações harmoniosas e coerentes"
            ]
          }
        };
    }
  };
  
  const content = getStyleSpecificContent();
  
  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-lg overflow-hidden bg-white/95 backdrop-blur">
      <CardHeader className="bg-gradient-to-r from-[#F5EEE6] to-[#F9F5F0] border-b">
        <CardTitle className="text-2xl font-serif text-[#432818]">
          Sua Transformação de Estilo
        </CardTitle>
        <CardDescription>
          Descubra como o conhecimento do seu estilo {style.category} pode transformar sua imagem
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="before" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="before" className="data-[state=active]:bg-[#B89B7A]/20 data-[state=active]:text-[#432818]">
              Antes
            </TabsTrigger>
            <TabsTrigger value="after" className="data-[state=active]:bg-[#B89B7A]/20 data-[state=active]:text-[#432818]">
              Depois
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-6">
          <TabsContent value="before" className="mt-0">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-medium text-[#432818] mb-2">{content.before.title}</h3>
                <p className="text-gray-600">{content.before.description}</p>
              </div>
              
              <div className="bg-[#F9F5F0] rounded-lg p-4">
                <h4 className="font-medium text-[#432818] mb-2">Desafios comuns:</h4>
                <ul className="space-y-2">
                  {content.before.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-red-100 text-red-600 mr-2 mt-0.5 p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {showAnimation && activeTab === 'before' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="text-center"
                >
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveTab('after')}
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
                <h3 className="text-xl font-medium text-[#432818] mb-2">{content.after.title}</h3>
                <p className="text-gray-600">{content.after.description}</p>
              </div>
              
              <div className="bg-[#F5F9F1] rounded-lg p-4">
                <h4 className="font-medium text-[#432818] mb-2">Benefícios da transformação:</h4>
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
                  Pronta para transformar seu estilo e sua imagem?
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Descubra como aplicar seu estilo {style.category} no seu dia a dia
                </p>
              </motion.div>
            </div>
          </TabsContent>
        </CardContent>
        
        <CardFooter className={cn(
          "flex justify-between border-t bg-[#FBF7F1] p-4",
          activeTab === 'before' ? "justify-start" : "justify-end"
        )}>
          {activeTab === 'before' ? (
            <Button 
              variant="outline" 
              onClick={() => setActiveTab('after')}
              className="border-[#B89B7A]/50 text-[#432818] hover:bg-[#B89B7A]/10"
            >
              Ver transformação
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleContinue}
              className="bg-[#B89B7A] hover:bg-[#8A7258] text-white"
            >
              Continuar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default BeforeAfterTransformation;
