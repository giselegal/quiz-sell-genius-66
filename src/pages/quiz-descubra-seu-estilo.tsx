import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizOption } from '@/components/quiz/QuizOption';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, ShoppingCart, Lock } from 'lucide-react';
import { useQuiz } from '@/hooks/useQuiz';
import { useRouter } from 'next/router';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { styleConfig } from '@/config/styleConfig';
import { trackButtonClick } from '@/utils/analytics';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatioContainer } from '@/components/ui/aspect-ratio-container';
import { OptimizedAutoFixedImages } from '@/components/ui/OptimizedAutoFixedImages';
import { FixedIntroImage } from '@/components/ui/FixedIntroImage';
import { useAuth } from '@/context/AuthContext';

const QuizPage: React.FC = () => {
  const {
    currentQuestionIndex,
    questions,
    userAnswers,
    goToNextQuestion,
    recordAnswer,
    primaryStyle,
    secondaryStyles,
    resetQuiz
  } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const currentQuestion = questions[currentQuestionIndex];
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    if (!currentQuestion && questions.length > 0) {
      // Quiz is complete, navigate to results page
      router.push('/results');
    }
  }, [currentQuestion, questions, router]);

  useEffect(() => {
    // Scroll to top on question change
    window.scrollTo(0, 0);
  }, [currentQuestionIndex]);

  const handleAnswer = (optionId: string) => {
    if (currentQuestion) {
      recordAnswer(currentQuestion.id, optionId);
    }
  };

  const handleNext = () => {
    if (currentQuestion) {
      goToNextQuestion();
    }
  };

  const handleCTAClick = () => {
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'quiz_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (!currentQuestion) {
    return null; // Or a loading state
  }

  const {
    title,
    options,
    type,
    styleCategory,
    imageUrl
  } = currentQuestion;

  const strategicOptions = options.filter(option => option.isStrategic);
  const hasStrategicOptions = strategicOptions.length > 0;
  const isStrategicQuestion = hasStrategicOptions;

  const isTextOnlyQuestion = !options.some(option => option.imageUrl);

  return (
    <OptimizedAutoFixedImages fixOnMount={true} fixOnUpdate={false}>
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          backgroundColor: globalStyles.backgroundColor || '#fffaf7',
          color: globalStyles.textColor || '#432818',
          fontFamily: globalStyles.fontFamily || 'inherit'
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        {/* Header Section */}
        <header className="bg-white py-4 shadow-md z-20 relative">
          <div className="container mx-auto px-4 flex items-center justify-between max-w-5xl">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src={globalStyles.logo || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'}
                  alt={globalStyles.logoAlt || "Gisele Galvão"}
                  className="h-12 w-auto mr-2"
                  style={{ maxHeight: globalStyles.logoHeight || '48px' }}
                />
              </a>
            </div>

            {/* User Info */}
            {user && (
              <div className="text-sm text-[#432818] font-medium">
                Olá, {user.userName}!
              </div>
            )}
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#8F7A6A]">
                {currentQuestionIndex + 1} de {questions.length}
              </span>
              <span className="text-[#aa6b5d] font-medium">
                {progress.toFixed(0)}%
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-[#F3E8E6]"
              indicatorClassName="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d]"
            />
          </div>

          {/* Question Card */}
          <Card className="bg-white shadow-md border border-[#B89B7A]/20 card-elegant mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
                {title}
              </h2>

              {/* Image above question for mobile view */}
              {imageUrl && isMobile && (
                <div className="mb-4">
                  <AspectRatioContainer ratio="16/9">
                    <FixedIntroImage
                      src={imageUrl}
                      alt={title}
                      width={500}
                      height={281}
                      className="rounded-md shadow-md"
                      objectFit="cover"
                    />
                  </AspectRatioContainer>
                </div>
              )}

              {/* Options Grid */}
              <div className={`grid ${type === 'text' ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-4`}>
                {options.map((option) => (
                  <QuizOption
                    key={option.id}
                    option={option}
                    isSelected={userAnswers[currentQuestion.id] === option.id}
                    onSelect={handleAnswer}
                    type={type}
                    questionId={currentQuestion.id}
                    isDisabled={isStrategicQuestion && userAnswers[currentQuestion.id] && userAnswers[currentQuestion.id] !== option.id}
                    isStrategicOption={option.isStrategic}
                    isTextOnlyQuestion={isTextOnlyQuestion}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Image beside question for desktop view */}
          {imageUrl && !isMobile && (
            <div className="mb-4">
              <AspectRatioContainer ratio="16/9">
                <FixedIntroImage
                  src={imageUrl}
                  alt={title}
                  width={800}
                  height={450}
                  className="rounded-md shadow-md"
                  objectFit="cover"
                />
              </AspectRatioContainer>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                resetQuiz();
                router.push('/');
              }}
            >
              Recomeçar
            </Button>
            <Button onClick={handleNext} disabled={!userAnswers[currentQuestion.id]}>
              {isLastQuestion ? 'Ver meu resultado' : 'Próxima Pergunta'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="bg-[#f9f4ef] py-6 z-20 relative">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-3 gap-4">
              {/* First Column - Guarantee */}
              <div className="flex items-center gap-2">
                <Shield className="text-[#aa6b5d] w-5 h-5" />
                <p className="text-sm text-[#432818]">
                  <strong>Compra Segura</strong>
                </p>
              </div>

              {/* Second Column - Delivery Time */}
              <div className="flex items-center gap-2">
                <Clock className="text-[#aa6b5d] w-5 h-5" />
                <p className="text-sm text-[#432818]">
                  <strong>Acesso Imediato</strong>
                </p>
              </div>

              {/* Third Column - Community */}
              <div className="flex items-center gap-2">
                <Users className="text-[#aa6b5d] w-5 h-5" />
                <p className="text-sm text-[#432818]">
                  <strong>Comunidade Exclusiva</strong>
                </p>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="text-center mt-8">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">
                Transforme seu Estilo Hoje!
              </h3>
              <p className="text-[#432818] mb-6">
                Descubra o poder de se vestir com autenticidade e confiança.
              </p>
              <Button
                className="text-white py-4 px-6 rounded-md btn-cta-green"
                style={{
                  background: "linear-gradient(to right, #4CAF50, #45a049)",
                  boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
                }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                onClick={handleCTAClick}
              >
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart className={`w-5 h-5 transition-transform duration-300 ${isButtonHovered ? 'scale-110' : ''}`} />
                  Quero meu Guia de Estilo Agora
                </span>
              </Button>
              <p className="text-sm text-[#aa6b5d] mt-2 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Oferta exclusiva nesta página
              </p>
            </div>

            {/* Copyright */}
            <div className="text-center mt-6">
              <p className="text-xs text-[#8F7A6A]">
                © {new Date().getFullYear()} Gisele Galvão. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </OptimizedAutoFixedImages>
  );
};

export default QuizPage;
