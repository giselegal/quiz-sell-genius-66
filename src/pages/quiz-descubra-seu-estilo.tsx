
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuizPixel } from "../hooks/useQuizPixel";
import { Check, Clock, Star, Shield, Users, Zap, ArrowRight, ChevronDown } from "lucide-react";

const QuizDescubraSeuEstilo = () => {
  const { trackPageView, trackCTAClick } = useQuizPixel();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    trackPageView();
  }, [trackPageView]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCTAClick = (position: string) => {
    trackCTAClick(position);
    window.open("https://pay.kiwify.com.br/JGnq6a4", "_blank");
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf7] to-[#f9f4ef]">
      {/* Hero Section Otimizada */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fffaf7] via-[#f9f4ef] to-[#f3e8e6] py-12 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23B89B7A" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-red-100 text-red-700 border-red-200 mb-4 px-4 py-2 text-sm font-semibold animate-pulse">
              🔥 OFERTA EXCLUSIVA - ÚLTIMAS HORAS
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-[#432818] mb-6 leading-tight">
              Pare de Gastar Dinheiro em Roupas que 
              <span className="text-[#B89B7A] block">Nunca Usa!</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#8F7A6A] mb-8 max-w-4xl mx-auto leading-relaxed">
              Descubra seu <strong>Estilo Único</strong> em 7 minutos e transforme seu guarda-roupa em looks que realmente te representam
              <span className="block mt-2 text-lg">
                ✨ Já transformou a vida de <strong>+12.847 mulheres</strong>
              </span>
            </p>

            {/* Countdown Timer */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 mb-8 max-w-md mx-auto shadow-lg">
              <p className="text-sm mb-2 font-medium">⏰ Oferta expira em:</p>
              <div className="flex justify-center gap-4 text-2xl font-bold">
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <div className="text-xs">HRS</div>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <div className="text-xs">MIN</div>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <div className="text-xs">SEG</div>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => handleCTAClick("hero")}
              size="lg"
              className="bg-gradient-to-r from-[#B89B7A] to-[#A38A69] hover:from-[#A38A69] hover:to-[#8F7A6A] text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-4"
            >
              <Zap className="w-6 h-6 mr-3" />
              DESCOBRIR MEU ESTILO AGORA
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            
            <p className="text-sm text-[#8F7A6A] mb-8">
              🔒 Pagamento 100% Seguro • ✅ Acesso Imediato • 🎯 Garantia de 7 dias
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_600/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                alt="Gisele Galvão - Consultora de Imagem"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#B89B7A] text-white rounded-full p-4 shadow-lg">
                <Star className="w-8 h-8" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="bg-green-100 rounded-full p-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#432818]">+12.847 Transformações</h3>
                  <p className="text-[#8F7A6A] text-sm">Mulheres que descobriram seu estilo único</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="bg-blue-100 rounded-full p-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#432818]">7 Minutos para Descobrir</h3>
                  <p className="text-[#8F7A6A] text-sm">Quiz cientificamente validado</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="bg-purple-100 rounded-full p-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#432818]">Garantia Total</h3>
                  <p className="text-[#8F7A6A] text-sm">7 dias para testar sem riscos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Dor Emocional */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-[#f9f4ef]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#432818] mb-8">
            Você se Reconhece em Alguma dessas Situações?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: "😫",
                title: "Armário Lotado, Nada para Vestir",
                description: "Gasta horas escolhendo roupa e sempre sente que 'não tem nada' que combine"
              },
              {
                icon: "💸",
                title: "Compras por Impulso que se Arrependeu",
                description: "Já comprou peças 'lindas' que nunca usou porque não sabia como combinar"
              },
              {
                icon: "😔",
                title: "Se Sente Sem Estilo Próprio",
                description: "Copia looks das redes sociais mas nunca fica igual ou se sente 'você'"
              },
              {
                icon: "🤔",
                title: "Não Sabe o que te Favorece",
                description: "Fica perdida sobre cores, modelagens e tecidos que realmente te valorizam"
              }
            ].map((item, index) => (
              <Card key={index} className="border-l-4 border-l-[#B89B7A] hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-[#432818] mb-2">{item.title}</h3>
                  <p className="text-[#8F7A6A]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-8">
            <p className="text-red-800 text-lg font-medium">
              <strong>A consequência?</strong> Você perde tempo, dinheiro e autoestima todos os dias. 
              Continua comprando por impulso, acumulando roupas que não usa e se sentindo perdida na sua própria identidade.
            </p>
          </div>

          <Button 
            onClick={() => handleCTAClick("pain")}
            size="lg"
            className="bg-gradient-to-r from-[#B89B7A] to-[#A38A69] hover:from-[#A38A69] hover:to-[#8F7A6A] text-white text-lg px-10 py-4 rounded-full shadow-xl"
          >
            QUERO DESCOBRIR MEU ESTILO ÚNICO
          </Button>
        </div>
      </section>

      {/* Prova Social Fortalecida */}
      <section className="py-16 px-4 bg-[#f9f4ef]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#432818] mb-12">
            O que Dizem as +12.847 Mulheres que Já Descobriram seu Estilo
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Marina S., 34 anos",
                text: "Finalmente entendi por que certas roupas não ficavam bem em mim! O quiz me ajudou a identificar meu estilo e agora me visto com muito mais confiança. Economizei uma fortuna parando de comprar por impulso!",
                stars: 5,
                location: "São Paulo, SP"
              },
              {
                name: "Carla M., 28 anos", 
                text: "Eram anos me sentindo perdida no meu guarda-roupa. Depois do quiz, descobri que sou Clássica Moderna e isso mudou TUDO! Meus looks ficaram incríveis e recebo elogios toda semana.",
                stars: 5,
                location: "Rio de Janeiro, RJ"
              },
              {
                name: "Ana Paula L., 42 anos",
                text: "Pensava que não tinha mais idade para ter estilo próprio. O Manual da Gisele me mostrou que estava completamente errada! Hoje me sinto mais jovem e confiante do que aos 30.",
                stars: 5,
                location: "Belo Horizonte, MG"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#432818] mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-[#B89B7A]">{testimonial.name}</p>
                    <p className="text-sm text-[#8F7A6A]">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-[#B89B7A]/10 rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#432818] mb-4">
                Resultados Comprovados
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-[#B89B7A]">97%</div>
                  <div className="text-sm text-[#8F7A6A]">Descobriram seu estilo</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#B89B7A]">89%</div>
                  <div className="text-sm text-[#8F7A6A]">Economizaram dinheiro</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#B89B7A]">94%</div>
                  <div className="text-sm text-[#8F7A6A]">Mais autoestima</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Irresistível */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#B89B7A] to-[#A38A69] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-yellow-400 text-yellow-900 mb-6 px-6 py-3 text-lg font-bold">
            🎯 OFERTA ESPECIAL - HOJE APENAS
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Manual de Estilo Contemporâneo
            <span className="block text-yellow-300">Descubra Seu Estilo em 7 Minutos</span>
          </h2>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-300" />
                    <span>Quiz Científico de Identificação de Estilo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-300" />
                    <span>Manual Completo com seu Perfil Único</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-300" />
                    <span>Cores que te Valorizam</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-300" />
                    <span>Modelagens Ideais para seu Corpo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-300" />
                    <span>Guia de Compras Inteligentes</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-300 line-through mb-2">De R$ 197,00</div>
                <div className="text-5xl font-bold text-yellow-300 mb-2">R$ 47</div>
                <div className="text-lg">à vista no PIX</div>
                <div className="text-sm mt-2">ou 3x de R$ 16,70</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-400 text-yellow-900 rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold mb-4">🎁 BÔNUS EXCLUSIVOS (Valor: R$ 297)</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Guia de Visagismo</strong>
                <p>Cortes e cores de cabelo ideais</p>
              </div>
              <div>
                <strong>Peças-Chave Essenciais</strong>
                <p>Lista das 20 peças que não podem faltar</p>
              </div>
              <div>
                <strong>Combinações Prontas</strong>
                <p>30 looks montados para cada estilo</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => handleCTAClick("offer")}
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 text-2xl px-16 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-6"
          >
            <Zap className="w-8 h-8 mr-4" />
            QUERO MEU MANUAL AGORA!
            <ArrowRight className="w-8 h-8 ml-4" />
          </Button>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Acesso imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Pagamento seguro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Por que tão barato? */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#432818] mb-8">
            "Por que tão barato se vale muito mais?"
          </h2>
          
          <div className="bg-[#f9f4ef] rounded-xl p-8 text-left">
            <p className="text-[#432818] text-lg leading-relaxed mb-6">
              <strong>Simples:</strong> Minha missão é democratizar o acesso ao conhecimento de estilo e imagem. 
              Uma consultoria presencial comigo custa R$ 1.200. Este manual contém 80% do que ensino nas consultorias.
            </p>
            
            <p className="text-[#432818] text-lg leading-relaxed mb-6">
              Prefiro impactar milhares de mulheres com um preço acessível do que apenas algumas poucas com um preço alto.
            </p>
            
            <p className="text-[#B89B7A] font-semibold text-xl">
              Você está investindo em conhecimento que vai usar para o resto da vida!
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Autoridade */}
      <section className="py-16 px-4 bg-[#f9f4ef]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#432818] mb-12">
            Quem é Gisele Galvão?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_90,w_500/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                alt="Gisele Galvão - Consultora de Imagem"
                className="w-full rounded-2xl shadow-xl"
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#B89B7A]">
                Consultora de Imagem & Personal Stylist
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <span>+15 anos de experiência em consultoria de imagem</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <span>+2.000 mulheres atendidas presencialmente</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <span>Formação em Consultoria de Imagem pela AICI</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <span>Especialização em Visagismo e Coloração Pessoal</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <span>+180K seguidores no Instagram</span>
                </div>
              </div>
              
              <blockquote className="bg-white p-6 rounded-lg border-l-4 border-[#B89B7A] italic">
                "Minha missão é ajudar mulheres a descobrirem sua essência através do seu estilo único. 
                Quando você se veste de acordo com quem realmente é, sua autoestima e confiança se transformam."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#432818] mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            {[
              {
                question: "Quanto tempo leva para fazer o quiz?",
                answer: "O quiz leva entre 5 a 7 minutos para ser concluído. É rápido, mas muito preciso!"
              },
              {
                question: "Como recebo o resultado?",
                answer: "Assim que finalizar o quiz, você recebe seu manual personalizado por email instantaneamente."
              },
              {
                question: "O manual funciona para qualquer idade?",
                answer: "Sim! O método funciona para mulheres de 18 a 80 anos. O estilo não tem idade!"
              },
              {
                question: "E se eu não gostar do resultado?",
                answer: "Você tem 7 dias de garantia total. Se não ficar satisfeita, devolvemos 100% do seu dinheiro."
              },
              {
                question: "O método funciona para qualquer tipo de corpo?",
                answer: "Absolutamente! O quiz identifica seu estilo pessoal e adapta as recomendações para seu biotipo específico."
              },
              {
                question: "Posso pagar no cartão?",
                answer: "Sim! Aceitamos PIX (R$ 47) ou cartão em até 3x de R$ 16,70 sem juros."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-2 border-[#B89B7A]/20">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-[#f9f4ef] transition-colors"
                  >
                    <h3 className="font-semibold text-[#432818]">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-[#B89B7A] transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-[#8F7A6A]">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#B89B7A] to-[#A38A69] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Chegou a Hora de se Descobrir!
          </h2>
          
          <p className="text-xl mb-8 opacity-90">
            Pare de perder tempo, dinheiro e autoestima. Descubra seu estilo único hoje e transforme sua relação com a moda para sempre.
          </p>

          <div className="bg-red-500 text-white rounded-xl p-6 mb-8 max-w-md mx-auto">
            <p className="text-sm mb-2 font-medium">⏰ Últimas horas desta oferta:</p>
            <div className="flex justify-center gap-4 text-2xl font-bold">
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <div className="text-xs">HRS</div>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <div className="text-xs">MIN</div>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <div className="text-xs">SEG</div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={() => handleCTAClick("final")}
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 text-2xl px-16 py-8 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 mb-6"
          >
            <Zap className="w-8 h-8 mr-4" />
            SIM, QUERO DESCOBRIR MEU ESTILO!
            <ArrowRight className="w-8 h-8 ml-4" />
          </Button>
          
          <p className="text-sm opacity-75">
            🔒 Compra 100% Segura • ✅ Acesso Imediato • 🎯 Garantia de 7 dias ou seu dinheiro de volta
          </p>
        </div>
      </section>
    </div>
  );
};

export default QuizDescubraSeuEstilo;
