import React, { useEffect, useState } from 'react';
import { preloadCriticalImages } from '@/utils/images/preloading';
import FixedIntroImage from '@/components/ui/FixedIntroImage';
import { ChevronRight, Check, Clock, Star, ShoppingBag, Heart, Users, Award, Shield, ArrowRight, TrendingUp, BadgeCheck, Lock, Gift } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

// Constantes para versão B da página
const VARIANT_B = true;

// Constantes para otimização de imagens
const HERO_IMAGE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"; // Mulher perdida com guarda-roupa bagunçado (usada na Hero e Problema)
const LOGO_MARCA_GISELE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp";
const QUIZ_ESTILO_FUNIL2_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp";
const MOCKUP_TABLET_GUIA_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp";
const MOCKUP_3_REVISTAS_GUIA_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp";
const MOCKUP_REVISTA_PECAS_CHAVE_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp";
const MOCKUP_GUIA_POR_DENTRO_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515075/Espanhol_Portugu%C3%AAs_1_uru4r3.webp";
const MOCKUP_TABLET_VISAGISMO_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp";
const VISAGISMO_IMAGEM_COMPLEMENTAR_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp";
const GISELE_GALVAO_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp";
const GISELE_GALVAO_ESPELHO_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp";
const DEPOIMENTOS_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp";
const ANTES_DEPOIS_MARIANGELA_ADRIANA_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745521117/Captura_de_tela_2025-03-31_034324_qxvdho.webp";
const ANTES_DEPOIS_1_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp";
const ANTES_DEPOIS_2_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp";
const ANTES_DEPOIS_3_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp";
const GARANTIA_7_DIAS_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp";
const MOCKUP_COMPLETO_BONUS_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp";
const PERGUNTAS_ESTRATEGICAS_URL = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515862/Sem_nome_1000_x_1000_px_1280_x_720_px_vmqk3j.webp";

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
      question: "Quanto tempo leva para fazer o quiz?",
      answer: "O quiz leva apenas alguns minutos para ser completado. São perguntas simples e objetivas sobre suas preferências e estilo de vida."
    },
    {
      question: "Como recebo os materiais após a compra?",
      answer: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com as instruções de acesso a todos os materiais."
    },
    {
      question: "Os guias servem para qualquer tipo físico?",
      answer: "Sim! Os guias foram desenvolvidos considerando a diversidade de tipos físicos. O mais importante é o seu estilo predominante, e as orientações são adaptáveis para valorizar seu corpo único."
    },
    {
      question: "Preciso ter conhecimento prévio sobre moda?",
      answer: "Não! Os guias foram criados justamente para quem quer aprender do zero ou aprimorar seus conhecimentos sobre estilo pessoal. Tudo é explicado de forma clara e didática."
    },
    {
      question: "Posso acessar os materiais pelo celular?",
      answer: "Sim! Todos os materiais são digitais e podem ser acessados por qualquer dispositivo: computador, tablet ou smartphone."
    },
    {
      question: "E se eu não gostar do conteúdo?",
      answer: "Você tem 7 dias de garantia incondicional. Se não ficar satisfeita, basta solicitar o reembolso e devolveremos 100% do seu investimento."
    },
    {
      question: "Quanto tempo terei acesso aos materiais?",
      answer: "O acesso é vitalício! Você poderá consultar os guias sempre que precisar, sem prazo de expiração."
    },
    {
      question: "Os guias funcionam para qualquer idade?",
      answer: "Absolutamente! Os princípios de estilo pessoal são atemporais e adaptáveis para mulheres de todas as idades. O importante é expressar sua essência, independente da sua fase de vida."
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

// Componente Stats - REMOVER ESTE COMPONENTE, NÃO É MAIS USADO DIRETAMENTE
/*
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
*/

const QuizOfferPage: React.FC = () => {
  // Versão B da página
  useEffect(() => {
    // Pré-carregar imagens críticas assim que o componente for montado
    preloadCriticalImages(
      [LOGO_MARCA_GISELE_URL, HERO_IMAGE_URL, QUIZ_ESTILO_FUNIL2_URL], // Atualizar imagens pre-carregadas
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
      {/* 1. Headline e Subheadline */}
      <section className="py-12 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-4">
          <img src={LOGO_MARCA_GISELE_URL} alt="Logo Gisele Galvão" className="mx-auto h-20 md:h-24 mb-6" />
          <ActiveUsersIndicator />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#432818] mb-6 font-playfair">
            Descubra Seu Estilo Autêntico e Transforme Seu Guarda-Roupa em um Aliado da Sua Imagem Pessoal
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Chega de um guarda-roupa lotado e da sensação de que nada combina com você. Descubra seu estilo predominante e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg mb-8">
          <FixedIntroImage 
            src={HERO_IMAGE_URL} 
            alt="Mulher perdida com guarda-roupa bagunçado" 
            width={700} 
            height={450} 
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
            onClick={() => handleCtaClick('hero_cta', 'Quero Descobrir Meu Estilo Agora!')}
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

      {/* 2. Introdução ao Problema/Dor */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 font-playfair text-[#432818]">
            Você se identifica com isso?
          </h2>
          <img src={HERO_IMAGE_URL} alt="Mulher frustrada com guarda-roupa" className="rounded-lg shadow-md mb-8 w-full max-w-md mx-auto" />
          <p className="text-gray-700 mb-4 text-left md:text-center">
            Você já se sentiu frustrada ao abrir seu guarda-roupa cheio de roupas e mesmo assim não ter o que vestir? Ou já comprou peças que pareciam perfeitas na loja, mas que nunca combinaram com nada que você tem?
          </p>
          <p className="text-gray-700 mb-4 text-left md:text-center">
            A verdade é que ter um armário lotado não significa ter um guarda-roupa funcional. Pelo contrário, muitas vezes isso só aumenta a ansiedade na hora de se vestir e o sentimento de que "nada fica bom em mim".
          </p>
          <p className="text-gray-700 mb-4 text-left md:text-center">
            Quantas vezes você já perdeu tempo precioso tentando montar um look que te fizesse sentir confiante? Ou gastou dinheiro em peças que raramente (ou nunca) usou? Talvez você sinta que sua imagem não comunica quem você realmente é, enquanto observa pessoas que parecem ter um estilo definido e autêntico.
          </p>
          <p className="text-gray-700 font-semibold text-left md:text-center">
            Isso acontece porque você ainda não descobriu seu estilo predominante - aquele que está alinhado com sua personalidade, valores e essência. Sem esse conhecimento, você continua comprando peças aleatórias que não conversam entre si e não expressam quem você é.
          </p>
        </div>
      </section>

      {/* 3. Apresentação da Solução: Quiz de Estilo */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 font-playfair text-[#432818]">
            A Solução Para Sua Transformação de Estilo Começa Aqui
          </h2>
          <img src={QUIZ_ESTILO_FUNIL2_URL} alt="Quiz de Estilo Gisele Galvão" className="rounded-lg shadow-md mb-8 w-full max-w-md mx-auto" />
          <p className="text-gray-700 mb-4 text-left md:text-center">
            E se eu te dissesse que em apenas alguns minutos você pode descobrir seu estilo predominante e começar a transformar sua relação com a moda e sua imagem pessoal?
          </p>
          <p className="text-gray-700 mb-4 text-left md:text-center">
            Apresento a você o <strong>Quiz de Estilo Gisele Galvão</strong> - uma ferramenta desenvolvida com base em anos de experiência em consultoria de imagem e estilo pessoal.
          </p>
          <p className="text-gray-700 mb-4 text-left md:text-center">
            Este não é apenas mais um teste genérico da internet. É um método preciso que analisa suas preferências reais e identifica seu estilo predominante entre os 7 estilos universais: Clássico, Natural, Romântico, Dramático, Criativo, Elegante e Contemporâneo.
          </p>
          <p className="text-gray-700 mb-4 text-left md:text-center">
            Ao descobrir seu estilo predominante, você dá o primeiro passo para criar um guarda-roupa que realmente funciona para você, economizar tempo e dinheiro nas suas compras, expressar sua personalidade através da sua imagem e sentir-se confiante e autêntica todos os dias.
          </p>
          <p className="text-gray-700 text-left md:text-center">
            O quiz é rápido, intuitivo e foi criado especialmente para mulheres que desejam alinhar sua imagem à sua essência, sem precisar seguir tendências passageiras ou gastar fortunas com roupas que não combinam entre si.
          </p>
        </div>
      </section>
      
      {/* 4. Benefícios dos Guias de Estilo e Imagem */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-12 font-playfair text-[#432818]">
            Muito Além do Quiz: Guias Práticos Para Sua Jornada de Estilo
          </h2>
          <div className="md:flex md:items-center md:gap-8 mb-12">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img src={MOCKUP_TABLET_GUIA_URL} alt="Mockup tablet com guia de estilo" className="rounded-lg shadow-md mx-auto" />
            </div>
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img src={MOCKUP_3_REVISTAS_GUIA_URL} alt="Mockup 3 revistas guia de estilo" className="rounded-lg shadow-md mx-auto" />
            </div>
          </div>
          <p className="text-gray-700 mb-6 text-left md:text-center">
            Mas descobrir seu estilo é apenas o começo. Para realmente transformar sua imagem, você precisa de orientação prática e estratégica. Por isso, ao fazer o quiz, você terá acesso ao <strong>Guia de Imagem e Estilo específico para o seu estilo predominante!</strong>
          </p>
          <p className="text-gray-700 mb-4 font-semibold text-left md:text-center">Cada guia foi cuidadosamente desenvolvido para oferecer:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-left max-w-2xl mx-auto mb-6">
            <li><strong>Autoconhecimento profundo:</strong> Entenda como sua personalidade, valores e essência se refletem no seu estilo. Como você viu no início do quiz, 55% da comunicação é visual, 38% é tom de voz e apenas 7% é verbal. Isso significa que sua imagem comunica muito antes de você falar qualquer coisa!</li>
            <li><strong>Orientações práticas:</strong> Descubra quais cores, tecidos, estampas e modelagens valorizam seu tipo físico e estilo. Aprenda a identificar peças que realmente combinam com você e que podem ser usadas de múltiplas formas.</li>
            <li><strong>Estratégias de imagem:</strong> Aprenda a comunicar visualmente quem você é antes mesmo de dizer uma palavra. Entenda como usar sua imagem para transmitir seus valores e personalidade em qualquer ambiente.</li>
            <li><strong>Dicas de composição:</strong> Saiba como montar looks versáteis e autênticos para diferentes ocasiões, desde o dia a dia até eventos especiais, sempre mantendo sua essência.</li>
          </ul>
          <p className="text-gray-700 text-left md:text-center">
            Com o Guia de Imagem e Estilo, você terá todas as ferramentas para construir uma imagem que realmente reflete quem você é e potencializa sua comunicação pessoal e profissional. Não se trata apenas de estar na moda, mas de criar um estilo atemporal que te representa em qualquer situação.
          </p>
        </div>
      </section>

      {/* 5. Bônus Especial 1: Peças-Chave do Guarda-Roupa de Sucesso */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 font-playfair text-[#B89B7A]">
            BÔNUS ESPECIAL #1
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-12 font-playfair text-[#432818]">
            Guia das Peças-Chave do Guarda-Roupa de Sucesso
          </h3>
          <div className="md:flex md:items-center md:gap-8 mb-12">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img src={MOCKUP_REVISTA_PECAS_CHAVE_URL} alt="Mockup revista peças-chave" className="rounded-lg shadow-md mx-auto" />
            </div>
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img src={MOCKUP_GUIA_POR_DENTRO_URL} alt="Mockup de como é o guia por dentro" className="rounded-lg shadow-md mx-auto" />
            </div>
          </div>
          <p className="text-gray-700 mb-6 text-left md:text-center">
            Como bônus especial, você também receberá o <strong>Guia das Peças-Chave do Guarda-Roupa de Sucesso</strong> - um manual completo para construir um armário funcional, versátil e alinhado com sua identidade.
          </p>
          <p className="text-gray-700 mb-4 font-semibold text-left md:text-center">Neste guia exclusivo, você vai descobrir:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-left max-w-2xl mx-auto mb-6">
            <li>Quais são as peças essenciais que toda mulher deveria ter, independente do seu estilo.</li>
            <li>Como adaptar essas peças-chave ao seu estilo predominante para criar looks autênticos.</li>
            <li>Estratégias para maximizar combinações e minimizar gastos, economizando tempo e dinheiro.</li>
            <li>Como montar um guarda-roupa cápsula que funciona para sua rotina e estilo de vida.</li>
            <li>Dicas para valorizar seu tipo físico e criar uma imagem coerente e cheia de presença.</li>
          </ul>
          <p className="text-gray-700 mb-4 text-left md:text-center">
            Imagine ter um guarda-roupa onde todas as peças combinam entre si, onde você consegue montar looks incríveis em minutos, e onde cada item reflete quem você é! Sem mais compras por impulso, sem mais peças esquecidas com etiqueta, sem mais frustração ao se vestir pela manhã.
          </p>
          <p className="text-gray-700 font-semibold text-left md:text-center">
            Este bônus sozinho já vale o investimento no quiz e nos guias, pois vai te ajudar a economizar tempo e dinheiro, além de eliminar a frustração diária de não saber o que vestir. É como ter uma consultora de imagem pessoal te orientando em cada compra e na montagem dos seus looks.
          </p>
        </div>
      </section>

      {/* 6. Bônus Especial 2: Guia Visagismo Facial */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 font-playfair text-[#B89B7A]">
            BÔNUS ESPECIAL #2
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-12 font-playfair text-[#432818]">
            Guia de Visagismo Facial
          </h3>
          <div className="md:flex md:items-center md:gap-8 mb-12">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img src={MOCKUP_TABLET_VISAGISMO_URL} alt="Mockup tablet visagismo" className="rounded-lg shadow-md mx-auto" />
            </div>
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img src={VISAGISMO_IMAGEM_COMPLEMENTAR_URL} alt="Visagismo imagem complementar" className="rounded-lg shadow-md mx-auto" />
            </div>
          </div>
          <p className="text-gray-700 mb-6 text-left md:text-center">
            E tem mais! Você também receberá o <strong>Guia de Visagismo Facial</strong> - uma ferramenta poderosa para valorizar seus traços naturais e potencializar sua beleza única.
          </p>
          <p className="text-gray-700 mb-4 text-left md:text-center">
            O visagismo é a arte de harmonizar sua imagem considerando a estrutura do seu rosto. Neste guia exclusivo, você vai aprender:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-left max-w-2xl mx-auto mb-6">
            <li>Como identificar o formato do seu rosto (oval, redondo, quadrado, retangular, etc.).</li>
            <li>Quais cortes de cabelo valorizam seus traços naturais e equilibram as proporções do seu rosto.</li>
            <li>Como escolher brincos, colares e óculos que complementam seu formato facial e realçam sua beleza.</li>
            <li>Técnicas de maquiagem para realçar seus pontos fortes e criar harmonia visual.</li>
            <li>Dicas personalizadas para cada tipo de rosto, considerando os terços faciais e as linhas predominantes.</li>
          </ul>
          <p className="text-gray-700 mb-4 text-left md:text-center">
            Imagine saber exatamente quais acessórios escolher para valorizar seu rosto e complementar seu estilo! Este conhecimento vai transformar a maneira como você se vê e como os outros te percebem.
          </p>
          <p className="text-gray-700 font-semibold text-left md:text-center">
            Com o Guia de Visagismo Facial, você terá mais uma ferramenta poderosa para construir uma imagem autêntica, harmoniosa e impactante. Seus acessórios e corte de cabelo trabalharão a favor da sua beleza natural, criando uma imagem coesa e equilibrada.
          </p>
        </div>
      </section>

      {/* 7. Apresentação da Mentora: Gisele Galvão */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-12 font-playfair text-[#432818]">
            Conheça Sua Mentora
          </h2>
          <div className="md:flex md:items-center md:gap-12">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <img src={GISELE_GALVAO_URL} alt="Gisele Galvão" className="rounded-lg shadow-lg mx-auto w-full max-w-xs" />
              {/* <img src={GISELE_GALVAO_ESPELHO_URL} alt="Gisele Galvão Espelho" className="rounded-lg shadow-lg mx-auto mt-4 w-full max-w-xs" /> */}
            </div>
            <div className="md:w-2/3 text-left">
              <h3 className="text-2xl font-bold text-[#B89B7A] mb-4 font-playfair">Gisele Galvão</h3>
              <p className="text-gray-700 mb-3">
                Consultora de Imagem e Estilo, Persona Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.
              </p>
              <p className="text-gray-700 mb-3">
                Advogada de formação. Mãe da Victória, esposa do Fabrício.
              </p>
              <p className="text-gray-700 mb-3">
                Apaixonada pela vida, pelos detalhes, viagens e tudo que me proporcione crescer como ser humano. Colérica, virginiana, paciente, pacificadora e muito empata.
              </p>
              <p className="text-gray-700 mb-3">
                Amo receber, atos de serviços e tempo de qualidade são minha linguagem de amor. Amo vinho, chás e café. Meus maiores valores são minha família, justiça, honestidade, ética e liberdade.
              </p>
              <p className="text-gray-700 mb-3">
                Há anos venho ajudando mulheres a descobrirem seu estilo autêntico e transformarem sua relação com a moda e a imagem pessoal. Minha missão é fazer com que você se vista de você mesma, comunicando sua essência através da sua imagem.
              </p>
              <p className="text-gray-700">
                Através da minha metodologia exclusiva, já transformei a vida de centenas de mulheres que, assim como você, buscavam uma forma de expressar quem realmente são através da sua imagem. Minha abordagem une conhecimentos técnicos de consultoria de imagem com uma visão humanizada e personalizada para cada cliente.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 8. Depoimentos e Resultados */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-12 font-playfair text-[#432818]">
            Veja o que dizem as mulheres que já descobriram seu estilo e transformaram sua imagem com os guias:
          </h2>
          
          <div className="mb-12">
            <img src={DEPOIMENTOS_URL} alt="Depoimentos de clientes" className="rounded-lg shadow-md mx-auto w-full max-w-3xl" />
          </div>

          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            [Aqui entrariam depoimentos reais de clientes. Por enquanto, este é um placeholder.]
          </p>
          
          <h3 className="text-xl md:text-2xl font-semibold mb-8 font-playfair text-[#432818]">
            Transformações Reais: Antes e Depois
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <img src={ANTES_DEPOIS_MARIANGELA_ADRIANA_URL} alt="Antes e depois Mariangela e Adriana" className="rounded-lg shadow-md w-full" />
            <img src={ANTES_DEPOIS_1_URL} alt="Antes e depois cliente 1" className="rounded-lg shadow-md w-full" />
            <img src={ANTES_DEPOIS_2_URL} alt="Antes e depois cliente 2" className="rounded-lg shadow-md w-full" />
            {/* <img src={ANTES_DEPOIS_3_URL} alt="Antes e depois cliente 3" className="rounded-lg shadow-md w-full" /> */}
          </div>

          <p className="text-gray-700 mb-4 max-w-3xl mx-auto">
            Estas são apenas algumas das centenas de mulheres que já transformaram sua relação com a moda e sua imagem pessoal através do Quiz de Estilo e dos Guias exclusivos.
          </p>
          <p className="text-gray-700 font-semibold max-w-3xl mx-auto">
            Você também pode ter essa transformação! Imagine como seria se vestir todos os dias com confiança, sabendo que cada peça do seu guarda-roupa reflete quem você é e comunica sua essência. Imagine economizar tempo e dinheiro, tendo um guarda-roupa funcional onde tudo combina entre si. Imagine sentir que sua imagem externa finalmente está alinhada com quem você é por dentro.
          </p>
        </div>
      </section>
      
      {/* 9. Garantia e Chamada para Ação */}
      <section className="py-16 px-4 bg-[#432818] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <img src={GARANTIA_7_DIAS_URL} alt="Garantia de 7 dias" className="mx-auto mb-8 w-32 md:w-40" />
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-playfair">
            Sua Satisfação Garantida ou Seu Dinheiro de Volta!
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Estou tão confiante de que estes materiais vão transformar sua relação com a moda e sua imagem pessoal que ofereço uma <strong>garantia incondicional de 7 dias</strong>. Se por qualquer motivo você não ficar satisfeita com o conteúdo, basta solicitar o reembolso dentro desse período e devolverei 100% do seu investimento, sem perguntas.
          </p>

          <div className="bg-white text-[#432818] p-8 rounded-lg shadow-xl mb-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 font-playfair">Investimento Único Para Sua Transformação Completa:</h3>
            <img src={MOCKUP_COMPLETO_BONUS_URL} alt="Mockup completo com bônus" className="rounded-lg shadow-md mx-auto mb-6 w-full max-w-md" />
            <p className="text-5xl font-bold text-[#B89B7A] mb-4">R$ [VALOR]</p>
            <p className="text-lg mb-1">Acesso a:</p>
            <ul className="list-none space-y-2 text-left text-sm md:text-base max-w-md mx-auto mb-6">
              <li className="flex items-center"><Check size={20} className="text-green-500 mr-2" /> Quiz de Estilo para descobrir seu estilo predominante</li>
              <li className="flex items-center"><Check size={20} className="text-green-500 mr-2" /> Guia de Imagem e Estilo específico para seu resultado</li>
              <li className="flex items-center"><Check size={20} className="text-green-500 mr-2" /> <strong>Bônus 1:</strong> Guia das Peças-Chave do Guarda-Roupa de Sucesso</li>
              <li className="flex items-center"><Check size={20} className="text-green-500 mr-2" /> <strong>Bônus 2:</strong> Guia de Visagismo Facial</li>
            </ul>
            <p className="font-semibold mb-6">Todo esse conteúdo exclusivo por um investimento único, sem mensalidades!</p>
            
            <p className="text-sm mb-6">
              Pense bem: quanto você já gastou com roupas que nunca usou? Quanto vale para você economizar tempo todas as manhãs, sabendo exatamente o que vestir? Quanto vale se sentir confiante e autêntica em qualquer situação?
            </p>
            <p className="text-sm font-semibold mb-8">
              Este investimento em autoconhecimento e imagem pessoal vai muito além de roupas - é um investimento em você mesma, na sua confiança e na forma como o mundo te percebe.
            </p>

            <a 
              href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912" 
              onClick={() => handleCtaClick('guarantee_cta', 'Quero Descobrir Meu Estilo Agora!')}
              className="group px-10 py-4 bg-[#B89B7A] hover:bg-[#A1835D] text-white font-medium rounded-md text-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center mx-auto max-w-md"
            >
              <span>Quero Descobrir Meu Estilo Agora!</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
      
      {/* 10. Perguntas Frequentes */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <img src={PERGUNTAS_ESTRATEGICAS_URL} alt="Perguntas estratégicas" className="mx-auto mb-8 w-full max-w-sm" />
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-playfair text-[#432818]">
            Ainda Tem Dúvidas? Nós Respondemos!
          </h2>
        </div>
        <FaqSection />
        <div className="mt-12 flex flex-col items-center">
          <a 
            href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
            onClick={() => handleCtaClick('faq_cta', 'Quero Transformar Minha Imagem Agora!')}
            className="group px-8 py-4 bg-[#B89B7A] hover:bg-[#A1835D] text-white font-medium rounded-md text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <span>Quero Transformar Minha Imagem Agora!</span>
            <ShoppingBag size={18} className="ml-2 group-hover:scale-110 transition-transform" />
          </a>
          <p className="mt-4 text-sm text-gray-500 flex items-center">
            <Lock size={14} className="mr-1" />
            Compra 100% segura. Acesso vitalício e imediato.
          </p>
        </div>
      </section>
      
      {/* REMOVER SEÇÃO DE CHAMADA PARA AÇÃO FINAL ANTIGA, POIS A NOVA SEÇÃO DE GARANTIA JÁ TEM UM CTA FORTE */}
      {/* 
      <section className="py-16 px-4 bg-[#432818]">
        // ... (conteúdo antigo) ...
      </section>
      */}
    </div>
  );
};

export default QuizOfferPage;
