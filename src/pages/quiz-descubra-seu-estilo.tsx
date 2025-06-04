
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { QuizOption } from '@/components/quiz/QuizOption';
import MentorSection from '@/components/result/MentorSection';
import { useQuizLogic } from '@/hooks/useQuizLogic';

const sampleOptions = [
  {
    id: "sample-1",
    text: "Elegante e Sofisticado",
    styleCategory: "Elegante",
    imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1687095491/style-quiz/elegante-6_u1ghdr.jpg"
  },
  {
    id: "sample-2", 
    text: "Contemporâneo e Moderno",
    styleCategory: "Contemporâneo",
    imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1687095491/style-quiz/contemporaneo-6_riqfun.jpg"
  },
  {
    id: "sample-3",
    text: "Romântico e Delicado", 
    styleCategory: "Romântico",
    imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1687095492/style-quiz/romantico-6_nkahb3.jpg"
  },
  {
    id: "sample-4",
    text: "Sexy e Empoderado",
    styleCategory: "Sexy", 
    imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/f_auto,q_70,dpr_1.0,e_sharpen:40/v1687095492/style-quiz/sexy-6_xvvf64.jpg"
  }
];

export default function QuizDescubraSeuEstilo() {
  const [showQuiz, setShowQuiz] = useState(false);
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    handleAnswer,
    handleNext,
    isLastQuestion,
    totalQuestions,
    allQuestions
  } = useQuizLogic();

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setTimeout(() => {
      document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBuyNow = () => {
    window.open('https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912', '_blank');
  };

  const handleAnswerSelect = (optionId: string) => {
    if (currentQuestion) {
      handleAnswer(currentQuestion.id, [optionId]);
    }
  };

  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  const userAnswers = currentAnswers.reduce((acc, answer) => {
    acc[currentQuestion?.id || ''] = answer;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-white">
      {/* Header com Logo */}
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
            {/* Conteúdo Principal */}
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
            
            {/* Imagem Hero */}
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

      {/* Seção de Problema/Dor */}
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
              <strong>O problema não é você, é a falta de autoconhecimento do seu estilo autêntico.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Seção Quiz Preview */}
      <section className="py-16 px-4 bg-[#FAF9F7]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-8">
            Descubra Qual dos 8 Estilos Combina com Você
          </h2>
          
          <p className="text-lg text-[#8F7A6A] mb-12">
            Nosso quiz identifica seu estilo predominante e secundário entre 8 arquétipos únicos:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {sampleOptions.map((option) => (
              <div key={option.id} className="text-center">
                <img 
                  src={option.imageUrl}
                  alt={option.text}
                  className="w-full aspect-square object-cover rounded-lg mb-2 shadow-md"
                />
                <p className="text-sm font-medium text-[#432818]">{option.text}</p>
              </div>
            ))}
          </div>
          
          <Button
            onClick={handleStartQuiz}
            className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white py-3 md:py-4 px-8 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Fazer o Quiz Gratuito Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Seção Quiz */}
      {showQuiz && (
        <section id="quiz-section" className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            {currentQuestion ? (
              <Card className="bg-white shadow-md border border-[#B89B7A]/20">
                <div className="p-6">
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#8F7A6A]">
                        {currentQuestionIndex + 1} de {totalQuestions}
                      </span>
                      <span className="text-[#aa6b5d] font-medium">
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-[#F3E8E6] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Question */}
                  <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-6">
                    {currentQuestion.title}
                  </h2>

                  {/* Options */}
                  <div className={`grid ${currentQuestion.type === 'text' ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-4 mb-8`}>
                    {currentQuestion.options.map((option) => (
                      <QuizOption
                        key={option.id}
                        option={option}
                        isSelected={userAnswers[currentQuestion.id] === option.id}
                        onSelect={handleAnswerSelect}
                        type={currentQuestion.type}
                        questionId={currentQuestion.id}
                        isDisabled={false}
                        isStrategicOption={option.isStrategic || false}
                      />
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleNext} 
                      disabled={!userAnswers[currentQuestion.id]}
                      className="bg-[#B89B7A] hover:bg-[#8F7A6A] text-white"
                    >
                      {isLastQuestion ? 'Ver meu resultado' : 'Próxima Pergunta'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-playfair text-[#432818] mb-4">
                  Quiz carregando...
                </h2>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Seção Mentora */}
      <MentorSection />

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-[#432818] text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-playfair mb-6">
            Transforme seu Estilo Hoje!
          </h2>
          
          <p className="text-lg mb-8 opacity-90">
            Descubra o poder de se vestir com autenticidade e confiança.
          </p>
          
          <Button
            onClick={handleBuyNow}
            className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] hover:from-[#45a049] hover:to-[#4CAF50] text-white py-3 md:py-4 px-8 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Quero meu Guia de Estilo Agora
          </Button>
        </div>
      </section>
    </div>
  );
}
