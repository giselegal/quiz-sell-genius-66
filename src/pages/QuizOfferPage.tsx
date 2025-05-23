import React, { useEffect, useState } from 'react';
import { preloadCriticalImages } from '@/utils/images/preloading';
import FixedIntroImage from '@/components/ui/FixedIntroImage';
import { ChevronRight, Check, Clock, Star, ShoppingBag, Heart, Users, Award, Shield, ArrowRight, TrendingUp, BadgeCheck, Lock, Gift } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

// Constantes para versão B da página
const VARIANT_B = true;

// Constantes para otimização de imagens
const HERO_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up";
const TESTIMONIAL_IMAGE_1 = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838400/testimonial-1_xvdpyb";
const TESTIMONIAL_IMAGE_2 = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838400/testimonial-2_xbcdnq";
const TESTIMONIAL_IMAGE_3 = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746838400/testimonial-3_asdcfq";

// Componente de estrelas para avaliações
const RatingStars = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={`${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} mr-0.5`}
        />
      ))}
    </div>
  );
};

// Componente de indicador de usuários ativos
const ActiveUsersIndicator = () => {
  const [activeCustomers, setActiveCustomers] = useState(312); // Número inicial de clientes satisfeitos
  
  useEffect(() => {
    // Simula pequenas flutuações no número de clientes
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) - 2; // -2 a +2
      setActiveCustomers(prev => Math.max(300, Math.min(350, prev + change))); // Mantém entre 300 e 350
    }, 13000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 px-4 py-2 rounded-full text-sm text-purple-800 shadow-md">
      <Heart size={18} className="text-pink-500 mr-2 animate-pulse" />
      <span className="font-semibold">+{activeCustomers} Clientes Felizes</span>
      <span className="ml-1.5">Transformaram Seus Estilos!</span>
    </div>
  );
};

// Componente de contagem regressiva melhorado
const CountdownTimer = () => {
  const [time, setTime] = useState({
    hours: 1,
    minutes: 59,
    seconds: 59
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 1, minutes: 59, seconds: 59 }; // Reinicia
        }
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatNumber = (num) => num.toString().padStart(2, '0');
  
  return (
    <div className="flex flex-col items-center">
      <p className="text-[#432818] font-semibold mb-2 flex items-center">
        <Clock size={18} className="mr-1 text-[#B89B7A]" />
        Esta oferta expira em:
      </p>
      <div className="flex items-center justify-center gap-1">
        <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">
          {formatNumber(time.hours)}
        </div>
        <span className="text-[#B89B7A] font-bold text-xl">:</span>
        <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">
          {formatNumber(time.minutes)}
        </div>
        <span className="text-[#B89B7A] font-bold text-xl">:</span>
        <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">
          {formatNumber(time.seconds)}
        </div>
      </div>
    </div>
  );
};

// Componente de notificação de vagas limitadas
const LimitedSpotsNotification = () => {
  const [spotsFilled, setSpotsFilled] = useState(86);
  
  return (
    <div className="bg-[#FFF7ED] border border-[#FDBA74] rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <TrendingUp size={20} className="text-[#F97316] mr-2" />
        <div>
          <p className="font-medium text-[#7C2D12]">Vagas limitadas para hoje!</p>
          <p className="text-sm text-[#9A3412]">Apenas 14 vagas restantes</p>
        </div>
      </div>
      <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#F97316] rounded-full"
          style={{ width: `${spotsFilled}%` }}
        ></div>
      </div>
    </div>
  );
};

// Componente FAQ
const FaqSection = () => {
  const [openItem, setOpenItem] = useState(null);
  
  const faqItems = [
    {
      question: "O que exatamente estou comprando com esta oferta?",
      answer: "Você está adquirindo um pacote completo de transformação de estilo! Isso inclui: acesso ao nosso Quiz de Estilo exclusivo e detalhado, um dossiê personalizado do seu estilo com recomendações de peças e looks, um guia prático de combinações de cores, além de bônus especiais como masterclasses e acesso a uma comunidade exclusiva."
    },
    {
      question: "Como e quando terei acesso ao Quiz de Estilo e aos outros materiais?",
      answer: "Imediatamente após a confirmação do seu pagamento! Você receberá um e-mail com todas as instruções para acessar nossa área de membros exclusiva, onde encontrará o Quiz de Estilo e todos os guias, vídeos e bônus prometidos, disponíveis 24/7."
    },
    {
      question: "Este valor é um pagamento único ou uma assinatura mensal?",
    },
    {
      question: "Preciso pagar algo a mais para ver os resultados do quiz ou ter acesso aos bônus?",
      answer: "Não! O valor da oferta inclui acesso completo ao Quiz de Estilo, todos os seus resultados detalhados, e todos os bônus prometidos. Não há taxas ocultas ou pagamentos adicionais para o conteúdo descrito nesta página."
    },
    {
      question: "Por quanto tempo terei acesso ao material?",
      answer: "Você terá acesso vitalício ao seu perfil de estilo e aos materiais base do quiz. Bônus específicos podem ter prazos de acesso diferenciados, que serão claramente informados."
    }
  ];
  
  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold text-[#432818] mb-6 font-playfair">
        Perguntas Frequentes
      </h3>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#B89B7A]"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-[#432818]">{item.question}</span>
              <ChevronRight 
                size={20} 
                className={`text-[#B89B7A] transition-transform duration-300 ${openItem === index ? 'transform rotate-90' : ''}`} 
              />
            </button>
            
            {openItem === index && (
              <div className="px-6 py-4 text-gray-700 bg-gray-50 border-t border-gray-100">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente Stats
const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-4xl font-bold text-[#B89B7A] mb-2">98%</div>
        <p className="text-[#432818]">Satisfação dos usuários com os resultados</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-4xl font-bold text-[#B89B7A] mb-2">250mil+</div>
        <p className="text-[#432818]">Pessoas já descobriram seu estilo único</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-4xl font-bold text-[#B89B7A] mb-2">4.9/5</div>
        <p className="text-[#432818]">Avaliação média dos nossos usuários</p>
      </div>
    </div>
  );
};

const QuizOfferPage: React.FC = () => {
  // Versão B da página
  useEffect(() => {
    // Pré-carregar imagens críticas assim que o componente for montado
    preloadCriticalImages(
      [HERO_IMAGE_URL],
      { quality: 95 }
    );
    
    // Reportar métricas de performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark('offer-page-mounted');
    }
  }, []);
  
  // Função para rastrear cliques em botões
  const handleCtaClick = (buttonId: string, action: string = 'Comprar Agora') => {
    trackButtonClick(
      buttonId,
      action,
      'quiz_offer_page'
    );
  };
  
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section com imagem otimizada */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <ActiveUsersIndicator />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#432818] mb-6 font-playfair">
            Revele Seu Estilo Único e Transforme Seu Guarda-Roupa Com Nossa Oferta Exclusiva!
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Nossa consultoria de estilo, que inclui um quiz detalhado, é o primeiro passo para você construir um visual que reflete sua verdadeira essência e te dá confiança todos os dias.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg">
          <FixedIntroImage 
            src={HERO_IMAGE_URL}
            alt="Descubra seu estilo e transforme seu guarda-roupa" 
            width={600}
            height={400}
            priority={true}
          />
        </div>
        
        <div className="mt-6">
          <CountdownTimer />
        </div>
        
        <div className="mt-6 max-w-md mx-auto">
          <LimitedSpotsNotification />
        </div>
        
        <div className="mt-8 flex flex-col items-center">
          <a 
            href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
            onClick={() => handleCtaClick('hero_cta', 'Quero Descobrir Meu Estilo Agora')}
            className="group px-8 py-4 bg-[#B89B7A] hover:bg-[#A1835D] text-white font-medium rounded-md text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <span>Quero Descobrir Meu Estilo Agora!</span>
            <ShoppingBag size={18} className="ml-2 group-hover:scale-110 transition-transform" />
          </a>
          <p className="mt-4 text-sm text-gray-500 flex items-center">
            <Shield size={14} className="mr-1" />
            Compra segura e acesso imediato ao quiz e materiais exclusivos.
          </p>
        </div>
      </section>
      
      {/* Seção de estatísticas */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-playfair text-[#432818]">
            Quiz de Estilo Premiado e Confiável
          </h2>
        </div>
        
        <StatsSection />
      </section>
      
      {/* Seção de depoimentos */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-playfair text-[#432818]">
            O que Nossas Clientes Dizem
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Veja como ajudamos outras pessoas a descobrirem seu estilo único e transformarem suas vidas.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Depoimento 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1 transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-4">
              <img 
                src={TESTIMONIAL_IMAGE_1} 
                alt="Depoimento de cliente" 
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg text-[#432818]">Maria Clara</h3>
                <RatingStars rating={5} />
              </div>
            </div>
            <p className="text-gray-700">
              "O quiz foi uma revelação! Nunca pensei que poderia me identificar tanto com um estilo. As dicas de moda mudaram minha vida!"
            </p>
          </div>
          
          {/* Depoimento 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1 transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-4">
              <img 
                src={TESTIMONIAL_IMAGE_2} 
                alt="Depoimento de cliente" 
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg text-[#432818]">João Pedro</h3>
                <RatingStars rating={4} />
              </div>
            </div>
            <p className="text-gray-700">
              "As recomendações de roupas foram incríveis. Aprendi a valorizar meu corpo e meu estilo pessoal."
            </p>
          </div>
          
          {/* Depoimento 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1 transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-4">
              <img 
                src={TESTIMONIAL_IMAGE_3} 
                alt="Depoimento de cliente" 
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg text-[#432818]">Ana Luiza</h3>
                <RatingStars rating={5} />
              </div>
            </div>
            <p className="text-gray-700">
              "Senti uma conexão imediata com as sugestões de estilo. O quiz realmente entende quem eu sou!"
            </p>
          </div>
        </div>
      </section>
      
      {/* Seção de benefícios */}
      <section className="py-16 px-4 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-playfair text-[#432818]">
            Por Que Investir na Sua Transformação de Estilo?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra os benefícios exclusivos que nossa oferta proporciona, incluindo o acesso ao nosso renomado quiz de estilo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefício 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <BadgeCheck size={40} className="text-[#B89B7A] mr-3" />
              <h3 className="text-lg font-semibold text-[#432818]">Resultados Personalizados</h3>
            </div>
            <p className="text-gray-700">
              Receba um relatório detalhado sobre seu estilo único com recomendações personalizadas.
            </p>
          </div>
          
          {/* Benefício 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Gift size={40} className="text-[#B89B7A] mr-3" />
              <h3 className="text-lg font-semibold text-[#432818]">Bônus Exclusivos</h3>
            </div>
            <p className="text-gray-700">
              Ganhe acesso a conteúdos exclusivos, descontos em consultorias e muito mais.
            </p>
          </div>
          
          {/* Benefício 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Lock size={40} className="text-[#B89B7A] mr-3" />
              <h3 className="text-lg font-semibold text-[#432818]">Segurança e Privacidade</h3>
            </div>
            <p className="text-gray-700">
              Seus dados estão seguros conosco. Não compartilhamos suas informações pessoais.
            </p>
          </div>
        </div>
      </section>
      
      {/* Seção de FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-playfair text-[#432818]">
            Ainda Tem Dúvidas?
          </h2>
        </div>
        
        <FaqSection />
      </section>
      
      {/* Seção de chamada para ação final */}
      <section className="py-16 px-4 bg-[#432818]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Transformar Seu Estilo?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Adquira seu acesso e descubra o estilo que combina perfeitamente com você através do nosso quiz exclusivo.
          </p>
          
          <div className="mt-8">
            <a 
              href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912" 
              onClick={() => handleCtaClick('footer_cta', 'Garantir Minha Vaga e Fazer o Quiz')}
              className="group px-10 py-4 bg-[#B89B7A] hover:bg-[#A1835D] text-white font-medium rounded-md text-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center mx-auto"
            >
              <span>Garantir Minha Vaga e Fazer o Quiz!</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <p className="mt-4 text-sm text-gray-300 flex items-center justify-center">
              <Users size={14} className="mr-1" />
              Se junte a mais de 250.000 pessoas que já transformaram seu estilo
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizOfferPage;
