import React, { useState } from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { ShoppingCart } from 'lucide-react';
import QuizPage from '@/components/QuizPage';
import QuizOption from '@/components/quiz/QuizOption';
import { ArrowRight } from 'lucide-react';
import MentorSection from '@/components/result/MentorSection';
import { Check, Star, Heart, Shield } from 'lucide-react';

const sampleOptions = [
  {
    id: 'sample-1',
    text: 'Elegante e Sofisticado',
    styleCategory: 'Elegante',
    imageUrl:
      'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1687095491/style-quiz/elegante-6_u1ghdr.jpg',
  },
  {
    id: 'sample-2',
    text: 'Contemporâneo e Moderno',
    styleCategory: 'Contemporâneo',
    imageUrl:
      'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1687095491/style-quiz/contemporaneo-6_riqfun.jpg',
  },
  {
    id: 'sample-3',
    text: 'Romântico e Delicado',
    styleCategory: 'Romântico',
    imageUrl:
      'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1687095492/style-quiz/romantico-6_nkahb3.jpg',
  },
  {
    id: 'sample-4',
    text: 'Sexy e Empoderado',
    styleCategory: 'Sexy',
    imageUrl:
      'https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1687095492/style-quiz/sexy-6_xvvf64.jpg',
  },
];

export default function QuizDescubraSeuEstilo() {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    // Scroll to quiz section
    setTimeout(() => {
      document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBuyNow = () => {
    window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-white">
      {/* Header/Logo */}
      <div className="py-8 text-center">
        <img 
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Logo Gisele Galvão"
          className="h-16 md:h-20 mx-auto"
        />
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Mobile: Text first, Desktop: Text left */}
            <div className="order-1 md:order-1 space-y-6">
              <h1 className="text-3xl md:text-5xl font-playfair text-[#432818] leading-tight">
                Descubra Seu Estilo Autêntico e Transforme Seu Guarda-Roupa em um Aliado da Sua Imagem Pessoal
              </h1>
              
              <p className="text-lg md:text-xl text-[#8F7A6A] leading-relaxed">
                Chega de um guarda-roupa lotado e da sensação de que nada combina com você. Descubra seu estilo predominante e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleStartQuiz}
                  className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white py-3 md:py-4 px-8 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Começar o Quiz Gratuito
                </Button>
                
                <Button 
                  onClick={handleBuyNow}
                  className="bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-3 md:py-4 px-8 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adquirir Guia Completo
                </Button>
              </div>
            </div>
            
            {/* Mobile: Image second, Desktop: Image right */}
            <div className="order-2 md:order-2 relative">
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"
                alt="Mulher perdida com guarda-roupa bagunçado"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problema/Dor Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-8">
            Você já se sentiu assim?
          </h2>
          
          <div className="space-y-6 text-lg text-[#8F7A6A] leading-relaxed">
            <p>
              Você já se sentiu frustrada ao abrir seu guarda-roupa cheio de roupas e mesmo assim não ter o que vestir? Ou já comprou peças que pareciam perfeitas na loja, mas que nunca combinaram com nada que você tem?
            </p>
            
            <p>
              A verdade é que ter um armário lotado não significa ter um guarda-roupa funcional. Pelo contrário, muitas vezes isso só aumenta a ansiedade na hora de se vestir e o sentimento de que "nada fica bom em mim".
            </p>
            
            <p>
              Quantas vezes você já perdeu tempo precioso tentando montar um look que te fizesse sentir confiante? Ou gastou dinheiro em peças que raramente (ou nunca) usou? Talvez você sinta que sua imagem não comunica quem você realmente é, enquanto observa pessoas que parecem ter um estilo definido e autêntico.
            </p>
            
            <p>
              Isso acontece porque você ainda não descobriu seu estilo predominante - aquele que está alinhado com sua personalidade, valores e essência. Sem esse conhecimento, você continua comprando peças aleatórias que não conversam entre si e não expressam quem você é.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz-section" className="py-16 px-4 bg-[#F9F7F4]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] text-center mb-8">
            {showQuiz ? "Descubra Seu Estilo Pessoal" : "Experimente o Quiz"}
          </h2>
          
          {showQuiz ? (
            <div className="border border-[#EAE4DA] rounded-lg overflow-hidden shadow-md bg-white p-4">
              <QuizPage />
            </div>
          ) : (
            <Card className="shadow-md border border-[#EAE4DA] bg-white overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-playfair text-[#432818] text-center mb-4">
                  Qual estilo combina mais com você?
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {sampleOptions.map((option) => (
                    <div key={option.id} className="aspect-[3/4]">
                      <QuizOption
                        option={option}
                        isSelected={false}
                        onSelect={() => {}}
                        type="both"
                        questionId="sample"
                      />
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleStartQuiz}
                  className="w-full mt-3 bg-[#B89B7A] hover:bg-[#A68A6A] text-white py-3 text-lg"
                >
                  Descobrir Meu Estilo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-center text-[#432818]/70 mt-3">
                  Este é apenas um exemplo. O quiz completo tem vários passos para identificar seu estilo com precisão.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Solução - Pacote Completo */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-6">
              Apresento a Você o Pacote Completo de Estilo Gisele Galvão
            </h2>
            <p className="text-lg text-[#8F7A6A] max-w-4xl mx-auto">
              E se eu te dissesse que você pode descobrir seu estilo predominante e transformar sua relação com a moda e sua imagem pessoal com um investimento único?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp"
                alt="Qual é o Seu Estilo FUNIL 2"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-playfair text-[#432818]">
                Este pacote exclusivo inclui:
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#432818] mb-1">Quiz de Estilo Personalizado</h4>
                    <p className="text-[#8F7A6A] text-sm">Um método preciso que analisa suas preferências reais e identifica seu estilo predominante entre os 7 estilos universais.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#432818] mb-1">Guia de Imagem e Estilo</h4>
                    <p className="text-[#8F7A6A] text-sm">Específico para o seu resultado no Quiz, com orientações práticas para valorizar seu tipo físico.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#B89B7A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#432818] mb-1">Bônus Exclusivos</h4>
                    <p className="text-[#8F7A6A] text-sm">Guia das Peças-Chave do Guarda-Roupa de Sucesso e Guia de Visagismo Facial.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios Detalhados */}
      <section className="py-16 px-4 bg-[#F9F7F4]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-playfair text-[#432818]">
                Mais que um Quiz - Uma Transformação Completa
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B89B7A] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-[#432818] mb-1">Autoconhecimento profundo</h4>
                    <p className="text-[#8F7A6A] text-sm">Entenda como sua personalidade, valores e essência se refletem no seu estilo. 55% da comunicação é visual!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B89B7A] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-[#432818] mb-1">Orientações práticas</h4>
                    <p className="text-[#8F7A6A] text-sm">Descubra quais cores, tecidos, estampas e modelagens valorizam seu tipo físico e estilo.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B89B7A] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-[#432818] mb-1">Estratégias de imagem</h4>
                    <p className="text-[#8F7A6A] text-sm">Aprenda a comunicar visualmente quem você é antes mesmo de dizer uma palavra.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B89B7A] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-[#432818] mb-1">Dicas de composição</h4>
                    <p className="text-[#8F7A6A] text-sm">Saiba como montar looks versáteis e autênticos para diferentes ocasiões.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"
                alt="Mockup tablet com guia"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bônus 1 - Peças-Chave */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"
                alt="Mockup revista peças-chave"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div className="bg-[#B89B7A] text-white px-4 py-2 rounded-full inline-block">
                <span className="text-sm font-medium">BÔNUS ESPECIAL 1</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-playfair text-[#432818]">
                Peças-Chave do Guarda-Roupa de Sucesso
              </h2>
              
              <p className="text-lg text-[#8F7A6A]">
                Um manual completo para construir um armário funcional, versátil e alinhado com sua identidade.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-[#B89B7A] flex-shrink-0 mt-1" />
                  <p className="text-[#8F7A6A]">Quais são as peças essenciais que toda mulher deveria ter</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-[#B89B7A] flex-shrink-0 mt-1" />
                  <p className="text-[#8F7A6A]">Como adaptar essas peças-chave ao seu estilo predominante</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-[#B89B7A] flex-shrink-0 mt-1" />
                  <p className="text-[#8F7A6A]">Estratégias para maximizar combinações e minimizar gastos</p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-[#B89B7A] flex-shrink-0 mt-1" />
                  <p className="text-[#8F7A6A]">Como montar um guarda-roupa cápsula funcional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bônus 2 - Visagismo */}
      <section className="py-16 px-4 bg-[#F9F7F4]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-[#aa6b5d] text-white px-4 py-2 rounded-full inline-block">
                <span className="text-sm font-medium">BÔNUS ESPECIAL 2</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-playfair text-[#432818]">
                Guia de Visagismo Facial
              </h2>
              
              <p className="text-lg text-[#8F7A6A]">
                Uma ferramenta poderosa para valorizar seus traços naturais e potencializar sua beleza única.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#aa6b5d] flex-shrink-0 mt-1" />
                  <p className="text-[#8F7A6A]">Como identificar o formato do seu rosto</p>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#aa6b5d] flex-shrink-0 mt-1" />
                  <p className="text-[#8F7A6A]">Quais cortes de cabelo valorizam seus traços naturais</p>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#aa6b5d] flex-shrink-0 mt-1" />
                  <p className="text-[#8F7A6A]">Como escolher brincos, colares e óculos ideais</p>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#aa6b5d] flex-shrink-0 mt-1" />
                  <p className="text-[#8F7A6A]">Técnicas de maquiagem para realçar seus pontos fortes</p>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp"
                alt="Mockup tablet visagismo"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mentora */}
      <MentorSection />

      {/* Depoimentos */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] text-center mb-12">
            Depoimentos de mulheres que já viveram essa transformação
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 shadow-lg border border-[#B89B7A]/20">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp"
                    alt="Mariangela"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-[#432818]">Mariangela</h4>
                    <p className="text-sm text-[#8F7A6A]">Engenheira</p>
                  </div>
                </div>
                <blockquote className="text-[#8F7A6A] italic">
                  "Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim."
                </blockquote>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg border border-[#B89B7A]/20">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp"
                    alt="Patrícia Paranhos"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-[#432818]">Patrícia Paranhos</h4>
                    <p className="text-sm text-[#8F7A6A]">Advogada</p>
                  </div>
                </div>
                <blockquote className="text-[#8F7A6A] italic">
                  "Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente."
                </blockquote>
              </div>
            </Card>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Card className="p-6 shadow-lg border border-[#B89B7A]/20 max-w-md">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp"
                    alt="Sônia Spier"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-[#432818]">Sônia Spier</h4>
                    <p className="text-sm text-[#8F7A6A]">Terapeuta</p>
                  </div>
                </div>
                <blockquote className="text-[#8F7A6A] italic">
                  "A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito."
                </blockquote>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="py-16 px-4 bg-[#F9F7F4]">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 shadow-lg border border-[#B89B7A]/20 bg-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#aa6b5d] to-[#B89B7A] flex items-center justify-center text-white shadow-lg">
                  <div className="flex flex-col items-center">
                    <Shield className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium">7 DIAS</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#432818] mb-2">
                  Garantia Total de Satisfação
                </h3>
                <p className="text-[#8F7A6A] leading-relaxed">
                  Estou tão confiante de que estes materiais vão transformar sua relação com a moda e sua imagem pessoal que ofereço uma garantia incondicional de 7 dias. Se por qualquer motivo você não ficar satisfeita com o conteúdo, basta solicitar o reembolso dentro desse período e devolverei 100% do seu investimento, sem perguntas.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-[#432818] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">
            Transforme Sua Imagem Pessoal Hoje Mesmo
          </h2>
          
          <div className="bg-white/10 rounded-lg p-6 mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <p className="text-sm text-[#aa6b5d] uppercase font-medium">Investimento único</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-sm mr-1 text-[#432818]">R$</span>
                  <p className="text-4xl font-bold text-[#432818]">39</p>
                  <span className="text-lg text-[#432818]">,99</span>
                </div>
                <p className="text-xs text-[#8F7A6A] mt-1">Pagamento único</p>
              </div>
            </div>
            
            <div className="space-y-2 text-white/90 mb-6">
              <p>✓ Quiz de Estilo Personalizado</p>
              <p>✓ Guia de Imagem e Estilo específico</p>
              <p>✓ Bônus: Peças-Chave do Guarda-Roupa</p>
              <p>✓ Bônus: Guia de Visagismo Facial</p>
              <p>✓ Acesso vitalício</p>
              <p>✓ Garantia de 7 dias</p>
            </div>
          </div>
          
          <Button 
            onClick={handleBuyNow}
            className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white py-3 md:py-4 px-12 text-xl font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ShoppingCart className="w-6 h-6 mr-3" />
            Quero Transformar Minha Imagem Agora!
          </Button>
          
          <p className="text-white/70 text-sm mt-4">
            Acesso imediato após a confirmação do pagamento
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] text-center mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="grid gap-6">
            <Card className="p-6 border border-[#B89B7A]/20">
              <h3 className="font-medium text-[#432818] mb-2">Como funciona o Quiz de Estilo?</h3>
              <p className="text-[#8F7A6A]">Após a compra, você terá acesso ao Quiz de Estilo, que contém perguntas simples e objetivas sobre suas preferências e estilo de vida. Ao finalizar, você receberá imediatamente seu resultado e o Guia específico para seu estilo predominante.</p>
            </Card>
            
            <Card className="p-6 border border-[#B89B7A]/20">
              <h3 className="font-medium text-[#432818] mb-2">Como recebo os materiais após a compra?</h3>
              <p className="text-[#8F7A6A]">Imediatamente após a confirmação do pagamento, você receberá um e-mail com as instruções de acesso a todos os materiais, incluindo o Quiz de Estilo e os bônus.</p>
            </Card>
            
            <Card className="p-6 border border-[#B89B7A]/20">
              <h3 className="font-medium text-[#432818] mb-2">Os guias servem para qualquer tipo físico?</h3>
              <p className="text-[#8F7A6A]">Sim! Os guias foram desenvolvidos considerando a diversidade de tipos físicos. O mais importante é o seu estilo predominante, e as orientações são adaptáveis para valorizar seu corpo único.</p>
            </Card>
            
            <Card className="p-6 border border-[#B89B7A]/20">
              <h3 className="font-medium text-[#432818] mb-2">Quanto tempo terei acesso aos materiais?</h3>
              <p className="text-[#8F7A6A]">O acesso é vitalício! Você poderá consultar os guias sempre que precisar, sem prazo de expiração.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
