import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Clock,
  Star,
  Check,
  Frown,
  ShoppingBag,
  Timer,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { trackPixelEvent } from "@/utils/facebookPixel";
import { useUtmParameters } from "@/hooks/useUtmParameters";
import MentorSection from "@/components/result/MentorSection";

// Adiciona declaração global para window.ctaClickProcessing
// @ts-expect-error
if (!("ctaClickProcessing" in window)) {
  (window as Window & { ctaClickProcessing?: boolean }).ctaClickProcessing = false;
}

const DescubraSeuEstilo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { captureUtmParameters } = useUtmParameters();

  useEffect(() => {
    setIsVisible(true);
    captureUtmParameters();
    trackPixelEvent("ViewContent", {
      content_name: "Quiz Descubra Seu Estilo",
      content_category: "Landing Page",
    });
  }, [captureUtmParameters]);

  const handleCTAClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof window !== 'undefined') {
      // @ts-expect-error
      if (window.ctaClickProcessing) return;
      // @ts-expect-error
      window.ctaClickProcessing = true;

      trackPixelEvent("InitiateCheckout", {
        content_name: "Quiz de Estilo Completo",
        value: 39.99,
        currency: "BRL",
      });
      const checkoutUrl =
        "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912&utm_source=quiz&utm_medium=abtest&utm_campaign=testeB";
      if (window.innerWidth >= 768) {
        window.open(checkoutUrl, "_blank");
      } else {
        window.location.href = checkoutUrl;
      }
      setTimeout(() => {
        // @ts-expect-error
        window.ctaClickProcessing = false;
      }, 1000);
    }
  };

  const painPoints = [
    {
      icon: <Frown className="h-8 w-8 text-[#B89B7A] mx-auto" />,
      title: "Guarda-roupa lotado, mas nada para vestir",
      description:
        "Você tem muitas roupas, mas sempre sente que não tem nada adequado para usar.",
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-[#B89B7A] mx-auto" />,
      title: "Compras que nunca usa",
      description:
        "Gastou dinheiro em peças que pareciam perfeitas na loja, mas nunca combinaram com nada.",
    },
    {
      icon: <Timer className="h-8 w-8 text-[#B89B7A] mx-auto" />,
      title: "Perde tempo se arrumando",
      description:
        "Demora muito para escolher o que vestir e ainda assim não se sente confiante.",
    },
    {
      icon: <User className="h-8 w-8 text-[#B89B7A] mx-auto" />,
      title: "Imagem não reflete quem você é",
      description:
        "Sente que sua aparência não comunica sua verdadeira personalidade e essência.",
    },
  ];

  const benefits = [
    "Autoconhecimento profundo sobre seu estilo",
    "Orientações práticas para valorizar seu tipo físico",
    "Estratégias de imagem para comunicar visualmente quem você é",
    "Dicas de composição para looks versáteis e autênticos",
    "Guia das Peças-Chave do Guarda-Roupa de Sucesso",
    "Guia de Visagismo Facial personalizado",
  ];

  const realTestimonials = [
    {
      text: "Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim.",
      author: "Mariangela, Engenheira",
      image:
        "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/testimonials/natalia.jpg",
    },
    {
      text: "Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente.",
      author: "Patrícia Paranhos, Advogada",
      image:
        "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/testimonials/marina.jpg",
    },
    {
      text: "A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito.",
      author: "Sônia Spier, Terapeuta",
      image:
        "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/testimonials/carolina.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Hero Section */}
      <section className="py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Mobile: Text first, Desktop: Text left */}
            <div className="order-1 md:order-1 space-y-6">
              <div className="text-center md:text-left mb-6">
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                  alt="Gisele Galvão - Logo da Marca"
                  className="h-12 md:h-16 mx-auto md:mx-0 mb-4"
                />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair text-[#432818] text-center md:text-left leading-tight">
                Descubra Seu Estilo Autêntico e Transforme Seu Guarda-Roupa em
                um Aliado da Sua Imagem Pessoal
              </h1>

              <p className="text-lg md:text-xl text-[#8F7A6A] text-center md:text-left">
                Chega de um guarda-roupa lotado e da sensação de que nada
                combina com você. Descubra seu estilo predominante e aprenda a
                montar looks que realmente refletem sua essência, com
                praticidade e confiança.
              </p>

              <div className="flex justify-center md:justify-start">
                <Button
                  onClick={handleCTAClick}
                  size="lg"
                  className="bg-[#B89B7A] hover:bg-[#A68A6A] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Descobrir Meu Estilo Por R$ 39,99
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Mobile: Image second, Desktop: Image right */}
            <div className="order-2 md:order-2 relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.jpg"
                  alt="Mulher descobrindo seu estilo autêntico"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema/Dor Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-6">
              Você já se sentiu frustrada ao abrir seu guarda-roupa cheio de
              roupas e mesmo assim não ter o que vestir?
            </h2>
            <p className="text-lg text-[#8F7A6A] max-w-4xl mx-auto">
              A verdade é que ter um armário lotado não significa ter um
              guarda-roupa funcional. Pelo contrário, muitas vezes isso só
              aumenta a ansiedade na hora de se vestir e o sentimento de que
              "nada fica bom em mim".
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <Card
                key={index}
                className="border-[#B89B7A]/20 hover:shadow-lg transition-shadow duration-300 rounded-lg"
              >
                <CardContent className="p-6 text-center flex flex-col items-center">
                  {point.icon}
                  <h3 className="text-base md:text-lg font-semibold text-[#432818] mb-2 mt-4">
                    {point.title}
                  </h3>
                  <p className="text-[#8F7A6A] text-sm">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-[#8F7A6A] italic max-w-4xl mx-auto">
              Isso acontece porque você ainda não descobriu seu estilo
              predominante - aquele que está alinhado com sua personalidade,
              valores e essência. Sem esse conhecimento, você continua comprando
              peças aleatórias que não conversam entre si e não expressam quem
              você é.
            </p>
          </div>
        </div>
      </section>

      {/* Mentora Section */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <MentorSection />
        </div>
      </section>

      {/* Solução Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-6">
              Pacote Completo de Estilo Gisele Galvão
            </h2>
            <p className="text-lg text-[#8F7A6A] max-w-4xl mx-auto mb-8">
              E se eu te dissesse que você pode descobrir seu estilo
              predominante e transformar sua relação com a moda e sua imagem
              pessoal com um investimento único?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp"
                alt="Qual é o Seu Estilo - Quiz Completo"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp"
                alt="Mockup completo com bônus"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-[#B89B7A]/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#432818] mb-4">
                  Quiz de Estilo Personalizado
                </h3>
                <p className="text-[#8F7A6A]">
                  Um método preciso que analisa suas preferências reais e
                  identifica seu estilo predominante entre os 7 estilos
                  universais.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#B89B7A]/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#432818] mb-4">
                  Guia de Imagem e Estilo
                </h3>
                <p className="text-[#8F7A6A]">
                  Específico para o seu resultado no Quiz, com orientações
                  práticas para valorizar seu tipo físico e expressar sua
                  personalidade.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#B89B7A]/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#432818] mb-4">
                  Bônus Exclusivos
                </h3>
                <p className="text-[#8F7A6A]">
                  Guia das Peças-Chave do Guarda-Roupa de Sucesso e Guia de
                  Visagismo Facial para complementar sua transformação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-6">
              Com este pacote completo, você vai:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"
                alt="Mockup tablet com guia de imagem e estilo"
                className="w-full rounded-lg shadow-lg object-cover h-auto"
              />
            </div>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-[#B89B7A] flex-shrink-0 mt-0.5" />
                  <span className="text-[#432818] text-base md:text-lg">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-[#8F7A6A] max-w-4xl mx-auto italic">
              Como você descobrirá, 55% da comunicação é visual, 38% é tom de
              voz e apenas 7% é verbal. Isso significa que sua imagem comunica
              muito antes de você falar qualquer coisa!
            </p>
          </div>
        </div>
      </section>

      {/* Bônus Sections */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-6">
              Bônus Especiais Inclusos
            </h2>
          </div>

          {/* Bônus 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h3 className="text-xl font-semibold text-[#432818] mb-4">
                Bônus 1: Peças-Chave do Guarda-Roupa de Sucesso
              </h3>
              <p className="text-[#8F7A6A] mb-4">
                Um manual completo para construir um armário funcional, versátil
                e alinhado com sua identidade.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#B89B7A]" />
                  <span className="text-sm text-[#432818]">
                    Peças essenciais que toda mulher deveria ter
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#B89B7A]" />
                  <span className="text-sm text-[#432818]">
                    Como adaptar ao seu estilo predominante
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#B89B7A]" />
                  <span className="text-sm text-[#432818]">
                    Estratégias para maximizar combinações
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"
                alt="Guia das Peças-Chave"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Bônus 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp"
                alt="Guia de Visagismo Facial"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl font-semibold text-[#432818] mb-4">
                Bônus 2: Guia de Visagismo Facial
              </h3>
              <p className="text-[#8F7A6A] mb-4">
                Uma ferramenta poderosa para valorizar seus traços naturais e
                potencializar sua beleza única.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#B89B7A]" />
                  <span className="text-sm text-[#432818]">
                    Como identificar o formato do seu rosto
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#B89B7A]" />
                  <span className="text-sm text-[#432818]">
                    Cortes de cabelo que valorizam seus traços
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#B89B7A]" />
                  <span className="text-sm text-[#432818]">
                    Acessórios e maquiagem personalizados
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Reais */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-[#F9F7F4]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-6">
              Depoimentos de mulheres que já viveram essa transformação:
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {realTestimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-[#B89B7A]/20 hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-[#432818]">
                        {testimonial.author}
                      </p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-[#B89B7A] text-[#B89B7A]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[#8F7A6A] italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Garantia e CTA Final */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#F9F7F4] rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="h-12 w-12 text-[#B89B7A]" />
              <div>
                <h3 className="text-xl font-semibold text-[#432818]">
                  Garantia de 7 Dias
                </h3>
                <p className="text-[#8F7A6A]">100% do seu dinheiro de volta</p>
              </div>
            </div>
            <p className="text-[#8F7A6A]">
              Estou tão confiante de que estes materiais vão transformar sua
              relação com a moda e sua imagem pessoal que ofereço uma garantia
              incondicional de 7 dias.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#B89B7A] to-[#A68A6A] rounded-2xl p-8 text-white mb-8">
            <h3 className="text-2xl font-playfair mb-4">Investimento Único</h3>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold">R$ 39,99</span>
              <p className="text-white/80">Pagamento único, sem mensalidades</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-left mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Quiz de Estilo Personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Guia de Imagem e Estilo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Guia das Peças-Chave</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Guia de Visagismo Facial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Acesso vitalício</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Garantia de 7 dias</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCTAClick}
            size="lg"
            className="bg-[#B89B7A] hover:bg-[#A68A6A] text-white px-8 py-4 text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 w-full md:w-auto"
          >
            Quero Transformar Minha Imagem Agora!
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-sm text-[#8F7A6A] mt-4">
            Pense bem: quanto você já gastou com roupas que nunca usou? Este
            investimento em autoconhecimento vai muito além de roupas - é um
            investimento em você mesma.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DescubraSeuEstilo;
