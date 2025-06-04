
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
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B89B7A' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen py-12 lg:py-20">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left mb-12 lg:mb-0">
              <div className="space-y-4 lg:space-y-6">
                <p className="text-[#B89B7A] font-semibold text-sm sm:text-base lg:text-lg tracking-wide uppercase">
                  Descubra Agora
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#432818] leading-tight">
                  Qual é o Seu{' '}
                  <span className="text-[#B89B7A] relative inline-block">
                    Estilo Único?
                    <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-0.5 lg:h-1 bg-gradient-to-r from-[#B89B7A] to-[#D4B896] rounded-full"></div>
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-[#432818]/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Em apenas 3 minutos, você vai descobrir exatamente qual estilo combina com sua personalidade e como se vestir com mais confiança.
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-3 lg:space-y-4">
                {[
                  'Resultado personalizado e instantâneo',
                  'Dicas práticas para o seu dia a dia',
                  'Baseado na sua personalidade única'
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
                  className="w-full sm:w-auto bg-[#B89B7A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#A38A69] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🎯 Descobrir Meu Estilo Agora
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-xs sm:text-sm text-[#432818]/70 pt-2">
                <div className="flex -space-x-1 lg:-space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-6 h-6 lg:w-8 lg:h-8 bg-[#B89B7A] rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span>+2.847 mulheres já descobriram seu estilo</span>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative max-w-sm lg:max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B89B7A]/20 to-transparent rounded-3xl transform rotate-3"></div>
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/f_avif,q_60,w_600,c_limit,fl_progressive/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.avif"
                  alt="Mulher elegante descobrindo seu estilo"
                  className="relative z-10 w-full rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#432818] mb-4 lg:mb-6">
                Você se reconhece em alguma dessas situações?
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: '😔',
                  title: 'Guarda-roupa lotado, mas "nada para vestir"',
                  description: 'Você tem muitas roupas, mas sempre sente que não tem nada adequado para usar.'
                },
                {
                  icon: '🤔',
                  title: 'Insegurança na hora de se vestir',
                  description: 'Fica em dúvida se a roupa está adequada e se sente insegura com suas escolhas.'
                },
                {
                  icon: '💸',
                  title: 'Compras por impulso que se tornam arrependimento',
                  description: 'Compra peças que pareciam perfeitas na loja, mas nunca usa em casa.'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#FAF9F7] p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 cursor-pointer text-center"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="text-3xl lg:text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg lg:text-xl font-semibold text-[#432818] mb-3">{item.title}</h3>
                  <p className="text-[#432818]/70 text-sm lg:text-base">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#B89B7A]/5 to-[#D4B896]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#432818] mb-4 lg:mb-6">
                A solução está aqui! 🎯
              </h2>
              <p className="text-lg sm:text-xl text-[#432818]/80 max-w-3xl mx-auto">
                Nosso quiz exclusivo vai identificar seu estilo único e te ensinar como se vestir de forma autêntica e confiante.
              </p>
            </div>
            
            <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl lg:text-2xl font-bold text-[#432818] mb-6 lg:mb-8 text-center">Como funciona?</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    step: '1',
                    title: 'Responda o Quiz',
                    description: '3 minutos de perguntas sobre suas preferências e personalidade'
                  },
                  {
                    step: '2',
                    title: 'Receba seu Resultado',
                    description: 'Descubra seu estilo único com análise personalizada'
                  },
                  {
                    step: '3',
                    title: 'Transforme seu Visual',
                    description: 'Aplique as dicas e se vista com mais confiança'
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#B89B7A] text-white rounded-full flex items-center justify-center text-lg lg:text-xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h4 className="text-base lg:text-lg font-semibold text-[#432818] mb-2">{item.title}</h4>
                    <p className="text-[#432818]/70 text-sm lg:text-base">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#432818]">
                Veja o que outras mulheres estão falando
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  name: 'Ana Carolina',
                  text: 'Incrível como o quiz foi certeiro! Finalmente entendi meu estilo e agora me visto com muito mais confiança.',
                  rating: 5
                },
                {
                  name: 'Juliana Santos',
                  text: 'Mudou completamente minha relação com o guarda-roupa. Agora sei exatamente o que comprar e como combinar.',
                  rating: 5
                },
                {
                  name: 'Fernanda Lima',
                  text: 'O resultado foi surpreendente! Me ajudou a entender por que certas roupas não funcionavam comigo.',
                  rating: 5
                },
                {
                  name: 'Mariana Costa',
                  text: 'Adorei descobrir meu estilo! As dicas são práticas e realmente fazem diferença no dia a dia.',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-[#FAF9F7] p-6 rounded-2xl">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[#B89B7A] text-lg lg:text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-[#432818]/80 mb-4 italic text-sm lg:text-base">"{testimonial.text}"</p>
                  <p className="font-semibold text-[#432818] text-sm lg:text-base">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#432818] to-[#5A3A24] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="w-full lg:w-1/3 text-center lg:text-left">
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/f_avif,q_80,w_400,c_limit/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.avif"
                  alt="Gisele Galvão"
                  className="rounded-2xl shadow-2xl mx-auto max-w-xs lg:max-w-full"
                />
              </div>
              <div className="w-full lg:w-2/3 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
                  Criado por Gisele Galvão
                </h2>
                <p className="text-lg sm:text-xl mb-6 opacity-90">
                  Consultora de Imagem e Estilo com mais de 10 anos de experiência, já transformou a vida de milhares de mulheres.
                </p>
                <div className="space-y-3">
                  {[
                    '+5.000 mulheres atendidas',
                    'Especialista em Personal Styling',
                    'Método exclusivo de análise de estilo'
                  ].map((credential, index) => (
                    <div key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-[#B89B7A] rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">{credential}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#B89B7A] to-[#D4B896] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
              Está pronta para descobrir seu estilo único?
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              São apenas 3 minutos que podem transformar completamente sua relação com a moda e sua autoconfiança.
            </p>
            
            <div className="bg-white/10 p-6 lg:p-8 rounded-3xl backdrop-blur-sm mb-8">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">✨ O que você vai receber:</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  { icon: '🎯', text: 'Análise completa do seu estilo' },
                  { icon: '👗', text: 'Dicas de peças essenciais' },
                  { icon: '🎨', text: 'Paleta de cores personalizada' },
                  { icon: '💡', text: 'Guia prático de combinações' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-xl lg:text-2xl">{benefit.icon}</span>
                    <span className="text-sm lg:text-base">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCTAClick('final')}
              className="w-full sm:w-auto bg-white text-[#B89B7A] px-8 lg:px-10 py-4 lg:py-5 rounded-full text-lg lg:text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              🚀 Quero Descobrir Meu Estilo Agora!
            </button>
            
            <p className="mt-6 text-xs lg:text-sm opacity-80">
              ⏰ Resultado imediato • 100% Gratuito • Sem cadastro
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#432818]">
                Perguntas Frequentes
              </h2>
            </div>
            
            <div className="space-y-4 lg:space-y-6">
              {[
                {
                  question: 'Quanto tempo leva para fazer o quiz?',
                  answer: 'O quiz leva apenas 3 minutos para ser concluído. São perguntas simples sobre suas preferências e personalidade.'
                },
                {
                  question: 'O resultado é realmente personalizado?',
                  answer: 'Sim! Cada resultado é único e baseado nas suas respostas específicas. Nosso algoritmo analiza suas preferências para criar uma análise personalizada.'
                },
                {
                  question: 'Preciso pagar alguma coisa?',
                  answer: 'O quiz é 100% gratuito. Você recebe seu resultado imediatamente após completar as perguntas, sem custo algum.'
                },
                {
                  question: 'O quiz funciona para qualquer idade?',
                  answer: 'Sim! Nosso método se adapta a diferentes idades e estilos de vida. O importante é sua personalidade e preferências únicas.'
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="border border-[#B89B7A]/20 rounded-2xl p-4 lg:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base lg:text-lg font-semibold text-[#432818] pr-4">{faq.question}</h3>
                    <span className="text-[#B89B7A] text-xl lg:text-2xl flex-shrink-0 transition-transform duration-300" style={{
                      transform: expandedFaq === index ? 'rotate(45deg)' : 'rotate(0deg)'
                    }}>
                      +
                    </span>
                  </div>
                  {expandedFaq === index && (
                    <div className="mt-4 text-[#432818]/70 text-sm lg:text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizDescubraSeuEstilo;
