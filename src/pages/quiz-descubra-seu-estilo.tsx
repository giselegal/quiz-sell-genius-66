import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useQuizPixel } from '@/hooks/useQuizPixel';
import { trackFunnelEvent, getCtaUrl } from '@/services/pixelManager';
import { loadFacebookPixel } from '@/utils/facebookPixel';
import { Heart, Shield, Star, CheckCircle2, Users, Crown, Sparkles, ArrowRight, Gift, Clock, Target } from 'lucide-react';
import MentorSection from '@/components/result/MentorSection';
import { testimonials } from '@/data/testimonials';

const QuizDescubraSeuEstilo = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { trackQuizStart, trackQuizProgress, trackQuizComplete, trackCTAClick } = useQuizPixel();

  useEffect(() => {
    loadFacebookPixel();
    trackFunnelEvent('PageViewed', {
      page_type: 'quiz_offer',
      funnel_stage: 'quiz_inicio'
    });
  }, []);

  const questions = [
    {
      id: 1,
      question: "Qual é o seu maior desafio com estilo?",
      options: [
        "Não sei qual é o meu estilo pessoal",
        "Tenho dificuldade para combinar peças",
        "Meu guarda-roupa não me representa",
        "Não sei como realçar meus pontos fortes"
      ]
    },
    {
      id: 2,
      question: "Como você se sente ao se vestir?",
      options: [
        "Perdida e sem direção",
        "Entediada com as mesmas combinações",
        "Insegura sobre minhas escolhas",
        "Pronta para uma transformação"
      ]
    },
    {
      id: 3,
      question: "O que mais te motiva a descobrir seu estilo?",
      options: [
        "Aumentar minha autoconfiança",
        "Impressionar no trabalho",
        "Me sentir mais feminina",
        "Ter um visual mais moderno"
      ]
    }
  ];

  const handleStartQuiz = () => {
    setShowQuiz(true);
    trackQuizStart();
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: [answer]
    }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      trackQuizProgress(currentQuestion + 1, questions.length);
    } else {
      setShowResult(true);
      trackQuizComplete('estilo_contemporaneo');
    }
  };

  const handleCTAClick = () => {
    trackCTAClick('main_cta');
    window.open(getCtaUrl(), '_blank');
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <Crown className="w-16 h-16 text-[#B89B7A] mx-auto mb-4" />
              <h1 className="text-4xl font-playfair text-[#432818] mb-4">
                Seu Estilo é <span className="text-[#B89B7A]">Contemporâneo</span>
              </h1>
              <p className="text-lg text-[#432818]/80 mb-8">
                Você aprecia praticidade com um toque de estilo atual. Agora é hora de potencializar sua imagem!
              </p>
            </div>

            <Card className="p-8 mb-8 border-[#B89B7A]/20">
              <h2 className="text-2xl font-playfair text-[#432818] mb-6">
                Kit de Ferramentas para Potencializar sua Imagem de Sucesso
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-left">
                  <h3 className="font-semibold text-[#432818] mb-3 flex items-center">
                    <Target className="w-5 h-5 text-[#B89B7A] mr-2" />
                    Produto Principal
                  </h3>
                  <ul className="space-y-2 text-[#432818]/80">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-[#B89B7A] mr-2 mt-1 flex-shrink-0" />
                      Quiz completo para descobrir seu estilo
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-[#B89B7A] mr-2 mt-1 flex-shrink-0" />
                      Guia completo de imagem e estilo pessoal
                    </li>
                  </ul>
                </div>
                
                <div className="text-left">
                  <h3 className="font-semibold text-[#432818] mb-3 flex items-center">
                    <Gift className="w-5 h-5 text-[#B89B7A] mr-2" />
                    2 Bônus Exclusivos
                  </h3>
                  <ul className="space-y-2 text-[#432818]/80">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-[#B89B7A] mr-2 mt-1 flex-shrink-0" />
                      Peças-chave do guarda-roupa de sucesso
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-[#B89B7A] mr-2 mt-1 flex-shrink-0" />
                      Guia completo de visagismo facial
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#B89B7A] mb-2">R$ 47,00</div>
                <p className="text-sm text-[#432818]/60">Investimento único • Acesso imediato</p>
              </div>

              <Button 
                onClick={handleCTAClick}
                size="lg" 
                className="w-full bg-[#B89B7A] hover:bg-[#8F7A6A] text-white font-semibold py-4 text-lg"
              >
                Quero Meu Kit de Ferramentas Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>

            <div className="text-center text-[#432818]/60">
              <Users className="w-5 h-5 inline mr-2" />
              +3.000 mulheres já descobriram seu Estilo de Ser
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showQuiz) {
    const currentQ = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#432818]/60">Pergunta {currentQuestion + 1} de {questions.length}</span>
                <div className="flex space-x-1">
                  {questions.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index <= currentQuestion ? 'bg-[#B89B7A]' : 'bg-[#B89B7A]/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full bg-[#B89B7A]/20 rounded-full h-2">
                <div 
                  className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <Card className="p-8">
              <h2 className="text-2xl font-playfair text-[#432818] mb-8 text-center">
                {currentQ.question}
              </h2>
              
              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full p-6 text-left justify-start border-[#B89B7A]/20 hover:border-[#B89B7A] hover:bg-[#FAF9F7]"
                      onClick={() => handleAnswer(currentQ.id, option)}
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full border-2 border-[#B89B7A] mr-4" />
                        {option}
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-white">
      {/* Hero Section with Impact Image */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-[#B89B7A]/10 text-[#B89B7A] border-[#B89B7A]/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Kit de Ferramentas Exclusivo
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-[#432818] mb-6">
                Descubra Seu{' '}
                <span className="text-[#B89B7A]">Estilo de Ser</span>
              </h1>
              
              <p className="text-xl text-[#432818]/80 mb-8">
                Kit completo com ferramentas práticas para descobrir seu estilo pessoal e potencializar sua imagem de sucesso
              </p>
              
              <Button 
                onClick={handleStartQuiz}
                size="lg" 
                className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white font-semibold px-8 py-4 text-lg mb-8"
              >
                Fazer Quiz Gratuito Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="flex items-center text-[#432818]/60">
                <Users className="w-5 h-5 mr-2" />
                <span>+3.000 mulheres já descobriram seu Estilo de Ser</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.jpg"
                  alt="Mulher elegante descobrindo seu estilo pessoal"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#432818]/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#B89B7A]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair text-[#432818] text-center mb-12">
              Você se identifica com alguma dessas situações?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "Não sei qual é meu estilo",
                  description: "Você olha para o espelho e não reconhece sua personalidade no que está vestindo"
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Perco tempo escolhendo roupas",
                  description: "Todas as manhãs são um desafio para decidir o que vestir"
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Baixa autoestima",
                  description: "Não se sente confiante e bonita com suas roupas"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Compras erradas",
                  description: "Investe em peças que não usa e não combinam com você"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full border-[#B89B7A]/20 hover:border-[#B89B7A]/40 transition-colors">
                    <div className="text-[#B89B7A] mb-4 flex justify-center">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-[#432818] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#432818]/70 text-sm">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Section */}
      <section className="py-16 bg-[#FAF9F7]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair text-[#432818] text-center mb-12">
              Conheça sua Mentora em Imagem e Estilo
            </h2>
            <MentorSection />
          </div>
        </div>
      </section>

      {/* Solution with Product Images */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-playfair text-[#432818] mb-8">
              A solução está aqui: Kit de Ferramentas para seu Estilo de Ser
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 border-[#B89B7A]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#B89B7A]/10 rounded-full blur-xl"></div>
                <Target className="w-12 h-12 text-[#B89B7A] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#432818] mb-4">
                  Ferramentas Principais
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#B89B7A] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#432818]/80">Quiz completo para descobrir seu estilo pessoal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#B89B7A] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#432818]/80">Guia prático de imagem e estilo pessoal</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-8 border-[#B89B7A]/20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#aa6b5d]/10 rounded-full blur-xl"></div>
                <Gift className="w-12 h-12 text-[#B89B7A] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#432818] mb-4">
                  2 Bônus Exclusivos
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#B89B7A] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#432818]/80">Peças-chave do guarda-roupa de sucesso</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#B89B7A] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#432818]/80">Guia completo de visagismo facial</span>
                  </li>
                </ul>
              </Card>
            </div>
            
            <div className="bg-[#FAF9F7] p-8 rounded-2xl mb-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-[#B89B7A] mb-2">R$ 47,00</div>
                <p className="text-[#432818]/60">Investimento único • Acesso imediato • Garantia de 7 dias</p>
              </div>
            </div>
            
            <Button 
              onClick={handleStartQuiz}
              size="lg" 
              className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white font-semibold px-8 py-4 text-lg"
            >
              Começar Minha Transformação Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Real Testimonials */}
      <section className="py-16 bg-[#FAF9F7]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair text-[#432818] text-center mb-12">
              O que dizem quem já descobriu seu Estilo de Ser
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="p-6 h-full border-[#B89B7A]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B89B7A]/30"></div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#B89B7A] fill-current" />
                      ))}
                    </div>
                    <p className="text-[#432818]/80 mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div className="text-sm">
                        <div className="font-semibold text-[#432818]">
                          {testimonial.name}
                        </div>
                        {testimonial.location && (
                          <div className="text-[#432818]/60">
                            {testimonial.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-[#432818] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-playfair mb-6">
              Pronta para descobrir seu Estilo de Ser?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Comece agora com nosso quiz gratuito e receba seu kit de ferramentas completo
            </p>
            
            <Button 
              onClick={handleStartQuiz}
              size="lg" 
              className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white font-semibold px-8 py-4 text-lg mb-6"
            >
              Fazer Quiz Gratuito
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="flex items-center justify-center text-white/70">
              <Users className="w-5 h-5 mr-2" />
              <span>+3.000 mulheres já descobriram seu Estilo de Ser</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizDescubraSeuEstilo;
