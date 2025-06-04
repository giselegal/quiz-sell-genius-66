
import React, { useEffect, useState } from 'react';
import { useQuizPixel } from '../hooks/useQuizPixel';
import { trackPixelEvent } from '../utils/facebookPixel';

const QuizDescubraSeuEstilo: React.FC = () => {
  const { trackPageView, trackCTAClick, trackScroll } = useQuizPixel();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    trackPageView();
    
    // Scroll tracking
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
  };

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = document.querySelectorAll('.transformation-card')[index] as HTMLElement;
    if (card) {
      if (isEntering) {
        card.style.transform = 'scale(1.02)';
        card.style.boxShadow = '0 10px 30px rgba(184, 155, 122, 0.2)';
        setHoveredCard(index);
      } else {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
        setHoveredCard(null);
      }
    }
  };

  const handleCTAHover = (isEntering: boolean, element: EventTarget | null) => {
    const btn = element as HTMLElement;
    if (btn) {
      if (isEntering) {
        btn.style.transform = 'scale(1.02)';
        btn.style.boxShadow = '0 8px 25px rgba(184, 155, 122, 0.4)';
      } else {
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = '0 4px 15px rgba(184, 155, 122, 0.2)';
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-background">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-[#FAF9F7] via-[#F6F3EF] to-[#F0EBE5] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23B89B7A" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center min-h-screen py-8 lg:py-12">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1 mt-8 lg:mt-0">
              <div className="space-y-4">
                <p className="text-brand-primary font-medium text-sm sm:text-base lg:text-lg tracking-wide uppercase">
                  Descubra Agora
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold text-brand-secondary leading-tight font-playfair">
                  Qual é o Seu{' '}
                  <span className="text-brand-primary relative inline-block">
                    Estilo Único?
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 lg:h-1 bg-gradient-to-r from-brand-primary to-[#D4B896] rounded-full"></div>
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-brand-secondary/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Em apenas 3 minutos, você vai descobrir exatamente qual estilo combina com sua personalidade e como se vestir com mais confiança.
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-3 lg:space-y-4 max-w-lg mx-auto lg:mx-0">
                {[
                  'Resultado personalizado e instantâneo',
                  'Dicas práticas para o seu dia a dia',
                  'Baseado na sua personalidade única'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 text-left">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-brand-secondary font-medium text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={() => handleCTAClick('hero')}
                  onMouseEnter={(e) => handleCTAHover(true, e.target)}
                  onMouseLeave={(e) => handleCTAHover(false, e.target)}
                  className="bg-brand-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#A38A69] transition-all duration-300 shadow-lg"
                >
                  🎯 Descobrir Meu Estilo Agora
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-xs sm:text-sm text-brand-secondary/70">
                <div className="flex -space-x-1 lg:-space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-6 h-6 lg:w-8 lg:h-8 bg-brand-primary rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span className="ml-2">+2.847 mulheres já descobriram seu estilo</span>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative max-w-sm lg:max-w-md xl:max-w-lg w-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent rounded-3xl transform rotate-3"></div>
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/f_avif,q_60,w_600,c_limit,fl_progressive/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.avif"
                  alt="Mulher elegante descobrindo seu estilo"
                  className="relative z-10 w-full rounded-3xl shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-secondary mb-8 lg:mb-12 font-playfair">
              Você se reconhece em alguma dessas situações?
            </h2>
            
            <div className="grid gap-6 lg:gap-8 md:grid-cols-3 mt-8 lg:mt-12">
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
                  className="transformation-card bg-[#FAF9F7] p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:shadow-lg cursor-pointer border border-brand-primary/10"
                  onMouseEnter={() => handleCardHover(index, true)}
                  onMouseLeave={() => handleCardHover(index, false)}
                >
                  <div className="text-3xl lg:text-4xl mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="text-lg lg:text-xl font-semibold text-brand-secondary mb-3 text-center">{item.title}</h3>
                  <p className="text-brand-secondary/70 text-sm lg:text-base text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-brand-primary/5 to-[#D4B896]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-secondary mb-8 lg:mb-12 font-playfair">
              A solução está aqui! 🎯
            </h2>
            <p className="text-lg lg:text-xl text-brand-secondary/80 mb-8 lg:mb-12 max-w-3xl mx-auto">
              Nosso quiz exclusivo vai identificar seu estilo único e te ensinar como se vestir de forma autêntica e confiante.
            </p>
            
            <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-xl border border-brand-primary/10">
              <h3 className="text-xl lg:text-2xl font-bold text-brand-secondary mb-6 font-playfair">Como funciona?</h3>
              <div className="grid gap-6 lg:gap-8 md:grid-cols-3">
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
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-primary text-white rounded-full flex items-center justify-center text-lg lg:text-xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h4 className="text-base lg:text-lg font-semibold text-brand-secondary mb-2">{item.title}</h4>
                    <p className="text-brand-secondary/70 text-sm lg:text-base">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-secondary mb-8 lg:mb-12 font-playfair">
              Veja o que outras mulheres estão falando
            </h2>
            
            <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
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
                <div key={index} className="bg-[#FAF9F7] p-6 rounded-2xl border border-brand-primary/10 text-center">
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-brand-primary text-lg lg:text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-brand-secondary/80 mb-4 italic text-sm lg:text-base">"{testimonial.text}"</p>
                  <p className="font-semibold text-brand-secondary text-sm lg:text-base">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-brand-secondary to-[#5A3A24] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 text-center lg:text-left">
              <div className="w-full lg:w-1/3 flex justify-center">
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/f_avif,q_80,w_400,c_limit/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.avif"
                  alt="Gisele Galvão"
                  className="rounded-2xl shadow-2xl max-w-xs lg:max-w-sm w-full"
                />
              </div>
              <div className="w-full lg:w-2/3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 font-playfair">
                  Criado por Gisele Galvão
                </h2>
                <p className="text-lg lg:text-xl mb-6 opacity-90">
                  Consultora de Imagem e Estilo com mais de 10 anos de experiência, já transformou a vida de milhares de mulheres.
                </p>
                <div className="space-y-3">
                  {[
                    '+5.000 mulheres atendidas',
                    'Especialista em Personal Styling',
                    'Método exclusivo de análise de estilo'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-brand-primary rounded-full flex-shrink-0"></div>
                      <span className="text-sm lg:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-brand-primary to-[#D4B896] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 font-playfair">
              Está pronta para descobrir seu estilo único?
            </h2>
            <p className="text-lg lg:text-xl mb-8 opacity-90">
              São apenas 3 minutos que podem transformar completamente sua relação com a moda e sua autoconfiança.
            </p>
            
            <div className="bg-white/10 p-6 lg:p-8 rounded-3xl backdrop-blur-sm mb-8 border border-white/20">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 font-playfair">✨ O que você vai receber:</h3>
              <div className="grid gap-4 md:grid-cols-2 text-left">
                {[
                  { icon: '🎯', text: 'Análise completa do seu estilo' },
                  { icon: '👗', text: 'Dicas de peças essenciais' },
                  { icon: '🎨', text: 'Paleta de cores personalizada' },
                  { icon: '💡', text: 'Guia prático de combinações' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 justify-center md:justify-start">
                    <span className="text-xl lg:text-2xl">{item.icon}</span>
                    <span className="text-sm lg:text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCTAClick('final')}
              onMouseEnter={(e) => handleCTAHover(true, e.target)}
              onMouseLeave={(e) => handleCTAHover(false, e.target)}
              className="bg-white text-brand-primary px-8 lg:px-10 py-4 lg:py-5 rounded-full text-lg lg:text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl"
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
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-secondary text-center mb-8 lg:mb-12 font-playfair">
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-4 lg:space-y-6">
              {[
                {
                  question: 'Quanto tempo leva para fazer o quiz?',
                  answer: 'O quiz leva apenas 3 minutos para ser concluído. São perguntas simples sobre suas preferências e personalidade.'
                },
                {
                  question: 'O resultado é realmente personalizado?',
                  answer: 'Sim! Cada resultado é único e baseado nas suas respostas específicas. Nosso algoritmo analisa suas preferências para criar uma análise personalizada.'
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
                  className="border border-brand-primary/20 rounded-2xl p-4 lg:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-[#FAF9F7]"
                  onClick={(e) => {
                    const answer = (e.currentTarget as HTMLElement).querySelector('.faq-answer');
                    const icon = (e.currentTarget as HTMLElement).querySelector('.faq-icon');
                    if (answer && icon) {
                      const isHidden = (answer as HTMLElement).style.display === 'none' || !(answer as HTMLElement).style.display;
                      (answer as HTMLElement).style.display = isHidden ? 'block' : 'none';
                      (icon as HTMLElement).style.transform = isHidden ? 'rotate(45deg)' : 'rotate(0deg)';
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base lg:text-lg font-semibold text-brand-secondary pr-4">{faq.question}</h3>
                    <span className="faq-icon text-brand-primary text-2xl transition-transform duration-300 flex-shrink-0">+</span>
                  </div>
                  <div className="faq-answer mt-4 text-brand-secondary/70 text-sm lg:text-base" style={{ display: 'none' }}>
                    {faq.answer}
                  </div>
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
