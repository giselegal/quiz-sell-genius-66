
import React, { useEffect, useState } from 'react';
import { useQuizPixel } from '../hooks/useQuizPixel';
import { trackPixelEvent } from '../utils/facebookPixel';

interface QuizDescubraSeuEstiloWindow extends Window {
  fbq?: (action: string, event: string, data?: any) => void;
}

declare const window: QuizDescubraSeuEstiloWindow;

const QuizDescubraSeuEstilo: React.FC = () => {
  const { trackPageView, trackCTAClick, trackScroll } = useQuizPixel();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    trackPageView();
    
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      trackScroll(Math.round(scrolled));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackPageView, trackScroll]);

  const handleCTAClick = (position: string) => {
    trackCTAClick(position);
    trackPixelEvent('Purchase', {
      content_name: 'Manual de Estilo Contemporâneo',
      content_category: 'Digital Product',
      value: 47,
      currency: 'BRL',
    });
    window.location.href = '/quiz';
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-[#FAF9F7] via-[#F6F3EF] to-[#F0EBE5] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B89B7A' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Logo Header */}
          <div className="pt-8 pb-4 text-center">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
              alt="Gisele Galvão - Consultora de Imagem"
              className="h-16 sm:h-20 mx-auto"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-200px)] py-8 lg:py-12">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left mb-8 lg:mb-0 lg:pr-8">
              <div className="space-y-4 lg:space-y-6">
                <p className="text-[#B89B7A] font-semibold text-sm sm:text-base lg:text-lg tracking-wide uppercase">
                  Método Exclusivo Gisele Galvão
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#432818] leading-tight">
                  Descubra o Seu{' '}
                  <span className="text-[#B89B7A] relative inline-block">
                    Estilo Único
                    <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-gradient-to-r from-[#B89B7A] to-[#D4B896] rounded-full"></div>
                  </span>
                  {' '}e Transforme Sua{' '}
                  <span className="text-[#B89B7A]">Autoconfiança</span>
                </h1>
                <p className="text-lg sm:text-xl text-[#432818]/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Em apenas 3 minutos, você descobrirá exatamente qual estilo combina com sua personalidade e receberá um guia completo para se vestir com elegância e autenticidade todos os dias.
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-3 lg:space-y-4">
                {[
                  '✨ Análise personalizada do seu perfil de estilo',
                  '🎨 Paleta de cores exclusiva para você',
                  '👗 Guia completo de peças essenciais',
                  '💡 Combinações práticas para o dia a dia'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 bg-[#B89B7A] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#432818] font-medium text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4 lg:pt-6">
                <button
                  onClick={() => handleCTAClick('hero')}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#B89B7A] to-[#A38A69] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold hover:from-[#A38A69] hover:to-[#8F7A6A] transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                >
                  🎯 Descobrir Meu Estilo Único Agora
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-sm sm:text-base text-[#432818]/70 pt-2">
                <div className="flex -space-x-1 lg:-space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-[#B89B7A] to-[#A38A69] rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span className="font-medium">+5.000 mulheres já transformaram seu estilo</span>
              </div>
            </div>

            {/* Right Content - Product Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative max-w-sm lg:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B89B7A]/20 to-transparent rounded-3xl transform rotate-3"></div>
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                  alt="Manual de Estilo Contemporâneo - Gisele Galvão"
                  className="relative z-10 w-full rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#432818] mb-4 lg:mb-6">
                Você se identifica com essas situações?
              </h2>
              <p className="text-lg sm:text-xl text-[#432818]/70 max-w-3xl mx-auto">
                Milhares de mulheres enfrentam os mesmos desafios todos os dias...
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: '😟',
                  title: 'Armário cheio, mas "nada para vestir"',
                  description: 'Você tem dezenas de peças, mas sempre sente que não tem nada adequado ou que combine direito para usar.'
                },
                {
                  icon: '🤔',
                  title: 'Insegurança constante com suas escolhas',
                  description: 'Fica sempre em dúvida se a roupa está adequada e se sente insegura sobre sua aparência.'
                },
                {
                  icon: '💸',
                  title: 'Compras erradas que viram arrependimento',
                  description: 'Compra peças que pareciam perfeitas na loja, mas em casa percebe que não tem nada para combinar.'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#FAF9F7] p-6 lg:p-8 rounded-2xl border border-[#B89B7A]/10 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 cursor-pointer text-center"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="text-4xl lg:text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg lg:text-xl font-bold text-[#432818] mb-3 leading-tight">{item.title}</h3>
                  <p className="text-[#432818]/70 text-sm lg:text-base leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#B89B7A]/5 to-[#D4B896]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#432818] mb-4 lg:mb-6">
                A transformação começa aqui! ✨
              </h2>
              <p className="text-lg sm:text-xl text-[#432818]/80 max-w-3xl mx-auto">
                O método exclusivo da Gisele Galvão vai identificar seu estilo único e te ensinar como se vestir de forma autêntica e elegante.
              </p>
            </div>
            
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-[#B89B7A]/10">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#432818] mb-8 lg:mb-10 text-center">Como funciona o método?</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {[
                  {
                    step: '1',
                    title: 'Quiz Personalizado',
                    description: '3 minutos de perguntas estratégicas sobre suas preferências, personalidade e estilo de vida'
                  },
                  {
                    step: '2',
                    title: 'Análise Completa',
                    description: 'Receba seu perfil de estilo único com análise detalhada e paleta de cores personalizada'
                  },
                  {
                    step: '3',
                    title: 'Guia Prático',
                    description: 'Aplique as dicas exclusivas e transforme seu visual com confiança e elegância'
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-[#B89B7A] to-[#A38A69] text-white rounded-full flex items-center justify-center text-xl lg:text-2xl font-bold mx-auto mb-4 shadow-lg">
                      {item.step}
                    </div>
                    <h4 className="text-lg lg:text-xl font-bold text-[#432818] mb-3">{item.title}</h4>
                    <p className="text-[#432818]/70 text-sm lg:text-base leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#432818] mb-4">
                Veja os resultados reais das nossas clientes
              </h2>
              <p className="text-lg sm:text-xl text-[#432818]/70">
                Transformações autênticas de mulheres que descobriram seu estilo único
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  name: 'Natália Santos',
                  location: 'São Paulo, SP',
                  text: 'O guia mudou minha vida! Agora sei exatamente quais peças combinam com meu estilo e personalidade. Minha autoestima melhorou muito.',
                  rating: 5
                },
                {
                  name: 'Marina Costa',
                  location: 'Rio de Janeiro, RJ',
                  text: 'Incrível como pequenas mudanças fazem tanta diferença! O guia me ajudou a criar looks que realmente combinam comigo.',
                  rating: 5
                },
                {
                  name: 'Carolina Lima',
                  location: 'Belo Horizonte, MG',
                  text: 'Melhor investimento que fiz! Economizei muito dinheiro evitando compras erradas e agora tenho um guarda-roupa que funciona.',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-[#FAF9F7] p-6 lg:p-8 rounded-2xl border border-[#B89B7A]/10 hover:shadow-xl transition-all duration-300">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[#B89B7A] text-lg lg:text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-[#432818]/80 mb-4 italic text-sm lg:text-base leading-relaxed">"{testimonial.text}"</p>
                  <div className="border-t border-[#B89B7A]/20 pt-4">
                    <p className="font-bold text-[#432818] text-sm lg:text-base">{testimonial.name}</p>
                    <p className="text-[#432818]/60 text-xs lg:text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#432818] to-[#5A3A24] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="w-full lg:w-1/3 text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#B89B7A]/30 to-transparent rounded-2xl transform rotate-3"></div>
                  <img
                    src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745347467/GISELE-GALV%C3%83O-POSE-ACESSIBILIDADE_i23qvj.webp"
                    alt="Gisele Galvão - Consultora de Imagem e Estilo"
                    className="relative z-10 rounded-2xl shadow-2xl w-full max-w-sm mx-auto"
                  />
                </div>
              </div>
              <div className="w-full lg:w-2/3 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
                  Criado por Gisele Galvão
                </h2>
                <p className="text-xl sm:text-2xl mb-6 lg:mb-8 opacity-90 leading-relaxed">
                  Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    '👩‍🎓 Advogada de formação',
                    '✨ +5.000 mulheres transformadas',
                    '🎯 Especialista em Personal Styling',
                    '🌟 Método exclusivo de análise de estilo',
                    '🏆 Certificação internacional em coloração pessoal'
                  ].map((credential, index) => (
                    <div key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-[#B89B7A] rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">{credential}</span>
                    </div>
                  ))}
                </div>
                <p className="text-lg opacity-80 italic">
                  "Minha missão é ajudar mulheres a descobrirem sua autenticidade através do estilo, criando uma versão mais confiante e elegante de si mesmas."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-16 lg:py-24 bg-[#FAF9F7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#432818] mb-4">
                O que você vai receber
              </h2>
              <p className="text-lg sm:text-xl text-[#432818]/70">
                Um kit completo para transformar seu estilo e sua confiança
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 sm:order-1">
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
                  alt="Kit Completo de Estilo - Gisele Galvão"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div className="order-1 sm:order-2 space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#432818]">Kit Completo de Transformação</h3>
                <div className="space-y-4">
                  {[
                    { icon: '📋', title: 'Análise Personalizada', desc: 'Seu perfil de estilo único baseado no quiz' },
                    { icon: '🎨', title: 'Paleta de Cores', desc: 'Cores que realçam sua beleza natural' },
                    { icon: '👗', title: 'Guia de Peças', desc: 'Lista completa do que ter no guarda-roupa' },
                    { icon: '💡', title: 'Combinações Práticas', desc: 'Looks prontos para cada ocasião' },
                    { icon: '🎁', title: 'Bônus Exclusivos', desc: 'Materiais extras para sua transformação' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="font-bold text-[#432818]">{item.title}</h4>
                        <p className="text-[#432818]/70 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#B89B7A] to-[#D4B896] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
              Pronta para descobrir seu estilo único?
            </h2>
            <p className="text-xl sm:text-2xl mb-8 lg:mb-10 opacity-90 leading-relaxed">
              São apenas 3 minutos que podem transformar completamente sua relação com a moda e sua autoconfiança para sempre.
            </p>
            
            <div className="bg-white/10 p-6 lg:p-10 rounded-3xl backdrop-blur-sm mb-8 lg:mb-10 border border-white/20">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">✨ Sua transformação inclui:</h3>
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 text-left">
                {[
                  { icon: '🎯', text: 'Análise completa e personalizada do seu estilo' },
                  { icon: '👗', text: 'Lista de peças essenciais para seu guarda-roupa' },
                  { icon: '🎨', text: 'Paleta de cores exclusiva para você' },
                  { icon: '💡', text: 'Guia prático de combinações para cada ocasião' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-2xl lg:text-3xl">{benefit.icon}</span>
                    <span className="text-sm lg:text-base font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCTAClick('final')}
              className="w-full sm:w-auto bg-white text-[#B89B7A] px-10 lg:px-12 py-5 lg:py-6 rounded-full text-xl lg:text-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl border-4 border-white/20"
            >
              🚀 Quero Descobrir Meu Estilo Único Agora!
            </button>
            
            <div className="mt-6 lg:mt-8 space-y-2">
              <p className="text-sm lg:text-base opacity-90 font-medium">
                ⏰ Resultado imediato • 100% Gratuito • Sem cadastro
              </p>
              <p className="text-xs lg:text-sm opacity-80">
                Mais de 5.000 mulheres já transformaram seu estilo conosco
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#432818] mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-lg sm:text-xl text-[#432818]/70">
                Tire suas dúvidas sobre o método da Gisele Galvão
              </p>
            </div>
            
            <div className="space-y-4 lg:space-y-6">
              {[
                {
                  question: 'Quanto tempo leva para fazer o quiz e receber o resultado?',
                  answer: 'O quiz leva apenas 3 minutos para ser concluído e você recebe seu resultado imediatamente. São perguntas estratégicas desenvolvidas pela Gisele para identificar seu perfil único de estilo.'
                },
                {
                  question: 'O resultado é realmente personalizado para mim?',
                  answer: 'Sim! Cada resultado é único e baseado no método exclusivo da Gisele Galvão. Nosso algoritmo analisa suas respostas específicas para criar uma análise personalizada do seu estilo, incluindo paleta de cores e recomendações práticas.'
                },
                {
                  question: 'Preciso pagar alguma coisa para fazer o quiz?',
                  answer: 'O quiz é 100% gratuito. Você recebe seu resultado completo imediatamente após responder as perguntas, sem custo algum e sem necessidade de cadastro.'
                },
                {
                  question: 'O método funciona para qualquer idade e tipo físico?',
                  answer: 'Absolutamente! O método da Gisele Galvão foi desenvolvido para se adaptar a diferentes idades, tipos físicos e estilos de vida. O importante é sua personalidade e preferências únicas, que são o foco da nossa análise.'
                },
                {
                  question: 'Como a Gisele desenvolveu esse método?',
                  answer: 'Gisele Galvão é consultora de imagem com certificação internacional e já transformou mais de 5.000 mulheres. O método combina sua experiência em Personal Styling, coloração pessoal e análise de personalidade.'
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#B89B7A]/20 rounded-2xl p-4 lg:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#FAF9F7]"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base lg:text-lg font-bold text-[#432818] pr-4">{faq.question}</h3>
                    <span className="text-[#B89B7A] text-xl lg:text-2xl flex-shrink-0 transition-transform duration-300" style={{
                      transform: expandedFaq === index ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}>
                      +
                    </span>
                  </div>
                  {expandedFaq === index && (
                    <div className="mt-4 text-[#432818]/70 text-sm lg:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Footer */}
      <section className="py-8 bg-[#432818] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔒</span>
              <span className="text-sm">100% Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="text-sm">Resultado Instantâneo</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span className="text-sm">Método Comprovado</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">❤️</span>
              <span className="text-sm">+5.000 Clientes Satisfeitas</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizDescubraSeuEstilo;
