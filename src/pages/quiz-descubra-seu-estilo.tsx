
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, Star, Shield, ChevronRight, User, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackQuizStart } from '@/utils/analytics';
import { initializePixelAndTracking } from '@/services/pixelManager';

const QuizDescubraSeuEstilo: React.FC = () => {
  const navigate = useNavigate();
  const [showCtaAnimation, setShowCtaAnimation] = useState(false);

  useEffect(() => {
    initializePixelAndTracking();
    
    const animationTimer = setTimeout(() => {
      setShowCtaAnimation(true);
    }, 2000);

    return () => clearTimeout(animationTimer);
  }, []);

  const handleStartQuiz = () => {
    trackQuizStart('Quiz Descubra Seu Estilo', 'anonymous');
    navigate('/quiz');
  };

  const handleBuyNow = () => {
    window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-white">
      {/* Hero Section */}
      <section className="py-12 px-4 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-[#B89B7A]/10 text-[#B89B7A] px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Kit Completo de Ferramentas de Estilo
              </div>
              
              <h1 className="text-4xl md:text-5xl font-playfair text-[#432818] leading-tight">
                Descubra Seu <span className="text-[#B89B7A]">Estilo de Ser</span> Autêntico
              </h1>
              
              <p className="text-xl text-[#432818]/80 leading-relaxed">
                Um kit completo de ferramentas práticas para potencializar sua imagem de sucesso e expressar sua verdadeira personalidade através do seu estilo pessoal.
              </p>

              <div className="flex items-center gap-4 text-[#432818]/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#B89B7A] rounded-full"></div>
                  <span className="text-sm">Quiz Personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#B89B7A] rounded-full"></div>
                  <span className="text-sm">Guia Completo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#B89B7A] rounded-full"></div>
                  <span className="text-sm">2 Bônus Exclusivos</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleStartQuiz}
                  className="bg-[#B89B7A] hover:bg-[#A68A6A] text-white px-8 py-6 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  Começar Quiz Gratuito
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  variant="outline"
                  className="border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white px-8 py-6 rounded-lg text-lg font-medium transition-all duration-300"
                >
                  Quero o Kit Completo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
                  alt="Kit de Ferramentas de Estilo"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#B89B7A]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#432818]/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-[#B89B7A] text-[#B89B7A]" />
                ))}
              </div>
              <span className="text-[#432818] font-medium">4.9/5 avaliação média</span>
            </div>
            <p className="text-lg text-[#432818]">
              <strong>+3.000 mulheres já descobriram seu Estilo de Ser</strong> e transformaram sua confiança através das nossas ferramentas práticas
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-4">
              Você se identifica com alguma dessas situações?
            </h2>
            <div className="w-24 h-1 bg-[#B89B7A] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <div className="w-3 h-3 bg-[#B89B7A] rotate-45"></div>,
                text: "Fica perdida na frente do guarda-roupa sem saber o que vestir"
              },
              {
                icon: <div className="w-3 h-3 bg-[#B89B7A] rounded-full"></div>,
                text: "Compra roupas que não combinam com seu estilo ou personalidade"
              },
              {
                icon: <div className="w-3 h-3 bg-[#B89B7A] rotate-45"></div>,
                text: "Não se sente confiante com as roupas que escolhe"
              },
              {
                icon: <div className="w-3 h-3 bg-[#B89B7A] rounded-full"></div>,
                text: "Gasta muito dinheiro em peças que acabam não usando"
              },
              {
                icon: <div className="w-3 h-3 bg-[#B89B7A] rotate-45"></div>,
                text: "Não sabe quais cores e cortes valorizam mais seu biotipo"
              },
              {
                icon: <div className="w-3 h-3 bg-[#B89B7A] rounded-full"></div>,
                text: "Quer descobrir seu estilo autêntico mas não sabe por onde começar"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0 mt-2">
                  {item.icon}
                </div>
                <p className="text-[#432818] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#FAF9F7] to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-4">
              A Solução: Kit de Ferramentas Para Seu Estilo de Sucesso
            </h2>
            <p className="text-xl text-[#432818]/80 max-w-3xl mx-auto">
              Um conjunto completo de ferramentas práticas e aplicáveis para você descobrir, desenvolver e potencializar sua imagem pessoal de forma autêntica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <User className="w-8 h-8 text-[#B89B7A]" />,
                title: "Quiz Personalizado",
                description: "Descubra seu estilo pessoal através de perguntas estratégicas"
              },
              {
                icon: <Heart className="w-8 h-8 text-[#B89B7A]" />,
                title: "Guia Completo",
                description: "Manual prático de imagem e estilo pessoal para aplicar no dia a dia"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-[#B89B7A]" />,
                title: "Peças-Chave",
                description: "Bônus: Guia das peças essenciais do guarda-roupa de sucesso"
              },
              {
                icon: <Star className="w-8 h-8 text-[#B89B7A]" />,
                title: "Visagismo",
                description: "Bônus: Guia de visagismo facial para harmonizar seu visual"
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center border border-[#B89B7A]/20 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-[#B89B7A]/10 rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-[#432818] mb-2">{item.title}</h3>
                  <p className="text-[#432818]/70 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Detail */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-4">
              O Que Você Vai Receber
            </h2>
            <div className="w-24 h-1 bg-[#B89B7A] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#B89B7A] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#432818] mb-2">Quiz para Descobrir Seu Estilo</h3>
                    <p className="text-[#432818]/70">Questionário estratégico que revela seu estilo pessoal autêntico com base na sua personalidade e preferências.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#B89B7A] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#432818] mb-2">Guia de Imagem e Estilo Pessoal</h3>
                    <p className="text-[#432818]/70">Manual completo com orientações práticas para aplicar seu estilo no dia a dia, incluindo dicas de combinações e styling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#432818] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">B1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#432818] mb-2">Bônus: Peças-Chave do Guarda-Roupa</h3>
                    <p className="text-[#432818]/70">Guia das peças essenciais que toda mulher de sucesso deve ter no guarda-roupa para criar looks versáteis.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#432818] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">B2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#432818] mb-2">Bônus: Guia de Visagismo Facial</h3>
                    <p className="text-[#432818]/70">Técnicas para harmonizar seu visual com base no formato do rosto, valorizando suas características naturais.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg"
                alt="Gisele Galvão - Consultora de Imagem"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-[#FAF9F7]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-4">
              O Que Dizem Sobre o Kit
            </h2>
            <div className="w-24 h-1 bg-[#B89B7A] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Natália Santos",
                location: "São Paulo, SP",
                image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/testimonials/natalia.jpg",
                text: "O guia mudou minha vida! Agora sei exatamente quais peças combinam com meu estilo e personalidade. Minha autoestima melhorou muito."
              },
              {
                name: "Marina Costa", 
                location: "Rio de Janeiro, RJ",
                image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/testimonials/marina.jpg",
                text: "Incrível como pequenas mudanças fazem tanta diferença! O guia me ajudou a criar looks que realmente combinam comigo."
              },
              {
                name: "Carolina Lima",
                location: "Belo Horizonte, MG", 
                image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/testimonials/carolina.jpg",
                text: "Melhor investimento que fiz! Economizei muito dinheiro evitando compras erradas e agora tenho um guarda-roupa que funciona."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white border border-[#B89B7A]/20">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-[#432818]">{testimonial.name}</h4>
                      <p className="text-sm text-[#432818]/70">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-[#432818]/80 italic">"{testimonial.text}"</p>
                  <div className="flex mt-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-[#B89B7A] text-[#B89B7A]" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Mentor */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-playfair text-[#432818] mb-6">
                Quem é Gisele Galvão
              </h2>
              <div className="space-y-4 text-[#432818]/80">
                <p>
                  <strong>Consultora de Imagem e Estilo</strong>, especialista em Persona Branding e estrategista de marca pessoal com certificação internacional em coloração pessoal.
                </p>
                <p>
                  Advogada de formação, mãe da Victória e esposa do Fabrício. Apaixonada pela vida, pelos detalhes e por tudo que proporciona crescimento pessoal.
                </p>
                <p>
                  Seus maiores valores são família, justiça, honestidade, ética e liberdade. Acredita que o estilo é uma forma de expressar nossa verdadeira essência.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745347467/GISELE-GALV%C3%83O-POSE-ACESSIBILIDADE_i23qvj.webp"
                alt="Gisele Galvão"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FAF9F7] to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-4">
              Invista no Seu Estilo de Sucesso
            </h2>
            <div className="w-24 h-1 bg-[#B89B7A] mx-auto rounded-full"></div>
          </div>

          <Card className="p-8 border-2 border-[#B89B7A] relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-4 py-2 text-sm font-medium">
              OFERTA ESPECIAL
            </div>
            
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <div className="mb-4">
                  <span className="text-[#432818]/60 line-through text-xl">R$ 175,00</span>
                  <span className="text-4xl font-bold text-[#B89B7A] ml-4">R$ 39,00</span>
                </div>
                <p className="text-[#432818]/70">ou 4x de R$ 10,86 no cartão</p>
                <div className="mt-2">
                  <span className="bg-[#B89B7A] text-white px-3 py-1 rounded-full text-sm">
                    78% OFF - Por tempo limitado
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Quiz personalizado para descobrir seu estilo",
                  "Guia completo de imagem e estilo pessoal", 
                  "Bônus: Peças-chave do guarda-roupa de sucesso",
                  "Bônus: Guia de visagismo facial",
                  "Acesso imediato após a compra",
                  "Garantia de 7 dias"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#432818]">{item}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleBuyNow}
                className={`w-full bg-[#B89B7A] hover:bg-[#A68A6A] text-white py-6 text-xl font-medium rounded-lg transition-all duration-500 ${
                  showCtaAnimation ? 'animate-pulse' : ''
                }`}
              >
                Quero Descobrir Meu Estilo de Ser
                <ChevronRight className="ml-2 h-6 w-6" />
              </Button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-[#432818]/70">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Compra 100% segura e protegida</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 bg-gradient-to-r from-[#FAF9F7] to-white border border-[#B89B7A]/20">
            <CardContent className="p-0">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-[#B89B7A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-playfair text-[#432818] mb-2">
                    Garantia Total de 7 Dias
                  </h3>
                  <p className="text-[#432818]/80">
                    Teste o kit completo por 7 dias. Se não ficar satisfeita por qualquer motivo, 
                    devolvemos 100% do seu investimento. Sem perguntas, sem complicações.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[#FAF9F7]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-4">
              Perguntas Frequentes
            </h2>
            <div className="w-24 h-1 bg-[#B89B7A] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Como funciona o kit de ferramentas?",
                answer: "Você recebe acesso imediato ao quiz, guia completo e os 2 bônus. Primeiro faz o quiz para descobrir seu estilo, depois aplica as orientações do guia no seu dia a dia."
              },
              {
                question: "Quanto tempo leva para ver resultados?",
                answer: "Os resultados são imediatos! Você descobrirá seu estilo logo após completar o quiz e poderá começar a aplicar as dicas do guia no mesmo dia."
              },
              {
                question: "O kit serve para qualquer idade?",
                answer: "Sim! As ferramentas são adaptáveis para mulheres de todas as idades que querem descobrir e potencializar seu estilo pessoal autêntico."
              },
              {
                question: "Preciso ter conhecimento prévio de moda?",
                answer: "Não! O kit foi desenvolvido para iniciantes. Todas as orientações são práticas e fáceis de aplicar, mesmo sem conhecimento técnico."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 bg-white border border-[#B89B7A]/20">
                <CardContent className="p-0">
                  <h3 className="text-lg font-medium text-[#432818] mb-3">{faq.question}</h3>
                  <p className="text-[#432818]/80">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-6">
            Pronta Para Descobrir Seu Estilo de Ser?
          </h2>
          <p className="text-xl text-[#432818]/80 mb-8 max-w-2xl mx-auto">
            Junte-se às +3.000 mulheres que já descobriram seu estilo autêntico e transformaram sua confiança.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleStartQuiz}
              variant="outline"
              className="border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white px-8 py-6 rounded-lg text-lg font-medium"
            >
              Começar Quiz Gratuito
            </Button>
            <Button 
              onClick={handleBuyNow}
              className="bg-[#B89B7A] hover:bg-[#A68A6A] text-white px-8 py-6 rounded-lg text-lg font-medium"
            >
              Quero o Kit Completo Agora
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizDescubraSeuEstilo;
