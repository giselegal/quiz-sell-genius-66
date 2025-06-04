
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuizPixel } from "../hooks/useQuizPixel";
import { Clock, Star, Shield, CheckCircle, Users, Award, ArrowRight, Zap, Heart, TrendingUp } from "lucide-react";

// Type definitions for Facebook Pixel
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

const QuizDescubraSeuEstilo = () => {
  const { trackQuizStart, trackCTAClick, trackScroll, isQuizPage } = useQuizPixel();
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 horas em segundos
  const heroRef = useRef<HTMLDivElement>(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      trackScroll(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackScroll]);

  // Formatação do countdown
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Animações de hover para CTAs
  const handleCTAHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    target.style.transform = "scale(1.05)";
    target.style.boxShadow = "0 20px 40px rgba(178, 150, 112, 0.3)";
  };

  const handleCTALeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement;
    target.style.transform = "scale(1)";
    target.style.boxShadow = "0 10px 30px rgba(178, 150, 112, 0.2)";
  };

  // Função para iniciar o quiz
  const handleStartQuiz = () => {
    trackQuizStart();
    trackCTAClick("hero-cta");
    
    // Scroll suave para o quiz
    const quizSection = document.getElementById("quiz-section");
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // CTA principal
  const handleMainCTA = () => {
    trackCTAClick("main-offer");
    window.open("https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5f1] to-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-r from-[#b29670] to-[#9d8560] text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          {/* Urgência no topo */}
          <div className="text-center mb-8">
            <Badge className="bg-red-600 text-white px-4 py-2 text-sm font-semibold animate-pulse">
              ⚡ ÚLTIMAS 24 HORAS: {formatTime(timeLeft)}
            </Badge>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            {/* Pre-headline */}
            <p className="text-lg md:text-xl mb-4 text-yellow-200 font-medium">
              Mais de 15.000 mulheres já transformaram seu estilo
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Descubra Seu{" "}
              <span className="text-yellow-300 relative">
                Estilo Único
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-yellow-300"
                  viewBox="0 0 100 10"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 L100,10 L0,10 Z" />
                </svg>
              </span>{" "}
              em 3 Minutos
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Pare de gastar dinheiro em roupas que não combinam com você.{" "}
              <strong className="text-yellow-300">
                Manual exclusivo de R$ 297 por apenas R$ 47
              </strong>{" "}
              (por tempo limitado)
            </p>

            {/* Social Proof */}
            <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm">4.9/5 (2.847 avaliações)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span className="text-sm">15.234+ alunas</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-300" />
                <span className="text-sm">Garantia 30 dias</span>
              </div>
            </div>

            {/* Main CTA */}
            <Button
              onClick={handleStartQuiz}
              onMouseEnter={handleCTAHover}
              onMouseLeave={handleCTALeave}
              className="bg-yellow-400 hover:bg-yellow-500 text-black text-xl px-12 py-4 rounded-full font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              🎯 DESCOBRIR MEU ESTILO AGORA
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>

            <p className="text-sm text-gray-200 mt-4">
              ✅ Sem cobrança agora • ✅ Resultado imediato • ✅ 100% online
            </p>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-pink-400/20 rounded-full animate-pulse"></div>
      </section>

      {/* Pain Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-12">
              Você já se sentiu assim?
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: "😰",
                  title: "Guarda-roupa lotado, mas 'nada para vestir'",
                  description: "Você tem dezenas de roupas, mas sempre sente que não tem nada adequado para usar. A frustração é constante.",
                },
                {
                  icon: "💸",
                  title: "Gasta muito e se arrepende depois",
                  description: "Compra por impulso, chega em casa e percebe que não combina com nada. O dinheiro jogado fora machuca.",
                },
                {
                  icon: "😔",
                  title: "Se sente insegura e desconfortável",
                  description: "Não se reconhece no espelho. A autoestima vai lá embaixo quando não consegue se vestir bem.",
                },
                {
                  icon: "⏰",
                  title: "Perde tempo escolhendo roupas",
                  description: "Demora horas para se arrumar, experimenta várias combinações e ainda sai insatisfeita de casa.",
                },
              ].map((pain, index) => (
                <Card key={index} className="p-6 border-l-4 border-red-500 bg-red-50">
                  <CardContent className="p-0">
                    <div className="text-4xl mb-4">{pain.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{pain.title}</h3>
                    <p className="text-gray-600">{pain.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-red-100 to-pink-100 p-8 rounded-2xl border-2 border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-4">
                ❌ A verdade dolorosa que ninguém te conta:
              </h3>
              <p className="text-lg text-red-700">
                <strong>Sem conhecer seu estilo pessoal</strong>, você continuará gastando dinheiro em roupas que não funcionam,
                se sentindo insegura e perdendo tempo precioso todos os dias. E o pior:{" "}
                <strong>sua autoestima vai continuar sendo afetada</strong> sempre que se olhar no espelho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Teaser */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">
              Mas e se eu te dissesse que existe uma solução?
            </h2>

            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-green-200">
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Imagine acordar todos os dias sabendo exatamente o que vestir
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Suas roupas combinam perfeitamente, você se sente confiante e elegante.
                As pessoas elogiam seu estilo e perguntam onde você compra suas roupas.
                <strong> Você finalmente descobriu seu estilo único!</strong>
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {[
                  { icon: <Heart className="w-8 h-8 text-pink-500" />, text: "Autoestima nas alturas" },
                  { icon: <Zap className="w-8 h-8 text-yellow-500" />, text: "Economia de tempo e dinheiro" },
                  { icon: <TrendingUp className="w-8 h-8 text-green-500" />, text: "Elogios constantes" },
                ].map((benefit, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    {benefit.icon}
                    <span className="mt-2 font-semibold text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">
              Descubra seu estilo em 3 minutos
            </h2>
            
            <p className="text-xl text-gray-600 mb-12">
              Responda a algumas perguntas rápidas e receba seu perfil de estilo personalizado + 
              oferta exclusiva do Manual de Estilo Contemporâneo
            </p>

            {/* Quiz simulado */}
            <Card className="p-8 shadow-xl">
              <CardContent className="p-0">
                <div className="text-2xl font-bold text-gray-800 mb-6">
                  1. Qual dessas peças você mais gosta de usar?
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { text: "Vestidos fluidos e femininos", emoji: "👗" },
                    { text: "Blazers estruturados e calças", emoji: "👔" },
                    { text: "Jeans e camisetas básicas", emoji: "👕" },
                    { text: "Peças com estampas e cores", emoji: "🌺" },
                  ].map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="p-6 h-auto text-left hover:bg-[#b29670] hover:text-white transition-all duration-300"
                      onClick={() => {
                        trackQuizStart();
                        // Simular redirecionamento para o quiz completo
                        setTimeout(() => {
                          document.getElementById("offer-section")?.scrollIntoView({ behavior: "smooth" });
                        }, 1000);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="text-lg">{option.text}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    🎁 <strong>Bonus:</strong> Quem terminar o quiz hoje ganha desconto especial no Manual!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-12">
              O que nossas alunas estão dizendo
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Marina Santos",
                  location: "São Paulo, SP",
                  rating: 5,
                  text: "Incrível como em apenas 3 minutos descobri meu estilo! Agora me visto com muito mais confiança e recebo elogios toda semana. Valeu cada centavo!",
                  image: "👩‍💼",
                  result: "Estilo Clássico Contemporâneo",
                },
                {
                  name: "Ana Carolina",
                  location: "Rio de Janeiro, RJ",
                  rating: 5,
                  text: "Economizei mais de R$ 800 em roupas que não usaria. O manual me ensinou a comprar apenas o que realmente combina comigo. Revolucionou meu guarda-roupa!",
                  image: "👩‍🎨",
                  result: "Estilo Criativo Moderno",
                },
                {
                  name: "Letícia Oliveira",
                  location: "Belo Horizonte, MG",
                  rating: 5,
                  text: "Antes eu demorava 1 hora para me arrumar. Hoje levo 10 minutos e sempre saio satisfeita! Minha autoestima mudou completamente.",
                  image: "👩‍🔬",
                  result: "Estilo Minimalista Elegante",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{testimonial.image}</div>
                      <div>
                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-[#b29670]/10 rounded-lg">
                      <p className="text-sm font-semibold text-[#b29670]">
                        ✨ Resultado: {testimonial.result}
                      </p>
                    </div>
                    
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex justify-center items-center gap-8 mt-12 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="text-sm font-semibold">Pagamento 100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-semibold">Garantia 30 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-sm font-semibold">15.000+ mulheres atendidas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-8">
                Quem é Gisele Galvão?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <div className="w-64 h-64 mx-auto bg-gradient-to-b from-[#b29670] to-[#9d8560] rounded-full flex items-center justify-center text-6xl text-white mb-6">
                  👩‍🎓
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#b29670]">15K+</div>
                    <div className="text-sm text-gray-600">Mulheres atendidas</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#b29670]">8 anos</div>
                    <div className="text-sm text-gray-600">De experiência</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#b29670]">4.9★</div>
                    <div className="text-sm text-gray-600">Avaliação média</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#b29670]">98%</div>
                    <div className="text-sm text-gray-600">Satisfação</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  A especialista que revolucionou o estilo de milhares de mulheres
                </h3>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Consultora de Estilo há 8 anos</strong>, Gisele já transformou o guarda-roupa 
                    e a autoestima de mais de 15.000 mulheres em todo o Brasil.
                  </p>
                  
                  <p>
                    Formada em Moda pela SENAC e especialista em Personal Styling, ela desenvolveu 
                    um método único que identifica o estilo pessoal em apenas 3 minutos.
                  </p>
                  
                  <div className="bg-[#b29670]/10 p-4 rounded-lg">
                    <p className="font-semibold text-[#b29670]">
                      💡 "Acredito que toda mulher merece se sentir confiante e elegante todos os dias. 
                      Meu método já provou que isso é possível para qualquer pessoa, independente do orçamento."
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Consultora oficial de grandes magazines</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Palestrante em eventos de moda</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Método validado por milhares de clientes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="offer-section" className="py-16 bg-gradient-to-r from-[#b29670] to-[#9d8560] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Urgency header */}
            <div className="mb-8">
              <Badge className="bg-red-600 text-white px-6 py-3 text-lg font-bold animate-pulse">
                ⏰ PROMOÇÃO TERMINA EM: {formatTime(timeLeft)}
              </Badge>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Manual de Estilo Contemporâneo
            </h2>

            <p className="text-xl mb-12">
              O guia completo para descobrir e aplicar seu estilo único no dia a dia
            </p>

            {/* Offer container */}
            <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl">
              {/* Product showcase */}
              <div className="mb-8">
                <div className="w-48 h-64 mx-auto bg-gradient-to-b from-[#b29670] to-[#9d8560] rounded-lg flex items-center justify-center text-6xl text-white mb-6">
                  📖
                </div>
                <h3 className="text-2xl font-bold mb-4">O que você vai receber:</h3>
              </div>

              {/* Benefits list */}
              <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                {[
                  "✅ Quiz completo de identificação do seu estilo pessoal",
                  "✅ Manual com 47 páginas de conteúdo exclusivo",
                  "✅ Guia de cores que harmonizam com seu tom de pele",
                  "✅ Combinações prontas para cada ocasião",
                  "✅ Lista de peças essenciais para seu estilo",
                  "✅ Dicas de como economizar na hora de comprar",
                  "✅ Acesso vitalício ao conteúdo",
                  "✅ Atualizações gratuitas do material",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <div className="text-center">
                  <div className="text-lg text-gray-600 line-through mb-2">
                    De R$ 297
                  </div>
                  <div className="text-4xl font-bold text-[#b29670] mb-2">
                    Por apenas R$ 47
                  </div>
                  <div className="text-sm text-gray-600">
                    ou 12x de R$ 4,99 no cartão
                  </div>
                </div>
              </div>

              {/* Why so cheap section */}
              <div className="bg-yellow-50 p-6 rounded-xl mb-8 border-2 border-yellow-200">
                <h4 className="text-xl font-bold text-yellow-800 mb-4">
                  🤔 Por que tão barato?
                </h4>
                <p className="text-yellow-700">
                  <strong>Esta é uma promoção especial de lançamento!</strong> Queremos que o máximo de mulheres 
                  possível tenham acesso ao método. Após esta promoção, o preço voltará para R$ 297.
                </p>
              </div>

              {/* Main CTA */}
              <Button
                onClick={handleMainCTA}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.transform = "scale(1.05)";
                  target.style.boxShadow = "0 20px 40px rgba(178, 150, 112, 0.3)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.currentTarget as HTMLButtonElement;
                  target.style.transform = "scale(1)";
                  target.style.boxShadow = "0 10px 30px rgba(178, 150, 112, 0.2)";
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-6 rounded-full font-bold shadow-xl transition-all duration-300"
                style={{
                  background: "linear-gradient(45deg, #10b981, #059669)",
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                }}
              >
                🛒 QUERO MEU MANUAL AGORA
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>

              <p className="text-sm text-gray-600 mt-4">
                🔒 Compra 100% segura • ✅ Acesso imediato • 🎁 Garantia 30 dias
              </p>
            </div>

            {/* Guarantee */}
            <div className="mt-12 bg-green-100 text-green-800 p-6 rounded-xl">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Shield className="w-12 h-12" />
                <h3 className="text-2xl font-bold">Garantia Blindada de 30 Dias</h3>
              </div>
              <p className="text-lg">
                Se você não ficar 100% satisfeita com o Manual de Estilo Contemporâneo, 
                devolvemos todo seu dinheiro. <strong>Sem perguntas, sem burocracia.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-12">
              Dúvidas Frequentes
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: "Como funciona o quiz de estilo?",
                  answer: "É super simples! São apenas 10 perguntas rápidas sobre suas preferências, estilo de vida e personalidade. Com base nas suas respostas, nosso algoritmo identifica seu estilo pessoal e te dá recomendações específicas.",
                },
                {
                  question: "O manual é apenas digital?",
                  answer: "Sim! O manual é 100% digital, o que significa que você recebe acesso imediato após a compra. Você pode ler no celular, tablet ou computador, e ainda pode imprimir se preferir.",
                },
                {
                  question: "Funciona para qualquer idade?",
                  answer: "Absolutamente! Nosso método funciona para mulheres de 18 a 80 anos. O estilo não tem idade, e nossas técnicas se adaptam à sua fase da vida e estilo pessoal.",
                },
                {
                  question: "E se eu não gostar do resultado?",
                  answer: "Você tem 30 dias de garantia total! Se não ficar satisfeita, devolvemos 100% do seu dinheiro. É nosso compromisso com sua satisfação.",
                },
                {
                  question: "Quanto tempo leva para ver resultados?",
                  answer: "Os resultados são imediatos! Assim que você terminar o quiz, já recebe seu perfil de estilo. E já na primeira semana aplicando as dicas do manual, você notará a diferença na sua confiança.",
                },
                {
                  question: "Preciso gastar muito para renovar o guarda-roupa?",
                  answer: "Não! Uma das principais vantagens do método é ensinar você a aproveitar melhor as roupas que já tem e fazer compras mais inteligentes. Muitas alunas economizam centenas de reais.",
                },
              ].map((faq, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
                      <span className="text-2xl">❓</span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 pl-11">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#b29670] to-[#9d8560] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Não deixe para amanhã a transformação que você pode começar hoje
            </h2>
            
            <div className="bg-red-600 p-6 rounded-xl mb-8">
              <div className="text-2xl font-bold mb-2">⏰ ÚLTIMAS HORAS!</div>
              <div className="text-xl">Promoção termina em: {formatTime(timeLeft)}</div>
            </div>

            <p className="text-xl mb-8">
              Mais de 15.000 mulheres já descobriram seu estilo único e transformaram 
              sua confiança. <strong>Agora é a sua vez!</strong>
            </p>

            <Button
              onClick={handleMainCTA}
              className="bg-yellow-400 hover:bg-yellow-500 text-black text-xl px-12 py-6 rounded-full font-bold shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              🎯 SIM, QUERO DESCOBRIR MEU ESTILO!
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>

            <p className="text-sm text-gray-200 mt-6">
              De R$ 297 por apenas R$ 47 • Garantia 30 dias • Acesso imediato
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Gisele Galvão - Todos os direitos reservados
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Este site não é afiliado ao Facebook ou qualquer entidade do Facebook.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QuizDescubraSeuEstilo;
