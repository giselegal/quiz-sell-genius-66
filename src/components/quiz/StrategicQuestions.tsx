
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { QuizQuestion } from '@/types/quiz';
import { UserResponse } from '@/types/quiz';
import { strategicQuestions } from '@/data/strategicQuestions';
import OptimizedImage from '../ui/optimized-image';

interface StrategicQuestionsProps {
  currentQuestionIndex: number;
  answers: Record<string, string[]>;
  onAnswer: (response: UserResponse) => void;
  questions?: QuizQuestion[];
  onComplete?: (answers: Record<string, string[]>) => void;
}

interface BankImage {
  url: string;
  alt: string;
  id: string;
}

const strategicImageBank: BankImage[] = [
  {
    url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp",
    alt: "Estilo clássico elegante",
    id: "classic-1"
  },
  {
    url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp",
    alt: "Estilo romântico feminino",
    id: "romantic-1"
  },
  {
    url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp",
    alt: "Estilo natural casual",
    id: "natural-1"
  },
  {
    url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp",
    alt: "Estilo moderno sofisticado",
    id: "modern-1"
  },
  {
    url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp",
    alt: "Estilo criativo único",
    id: "creative-1"
  }
];

const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({ 
  currentQuestionIndex, 
  answers, 
  onAnswer, 
  questions = strategicQuestions,
  onComplete 
}) => {
  const [localQuestionIndex, setLocalQuestionIndex] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<Record<string, string[]>>(answers);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = questions[localQuestionIndex];
  const progress = ((localQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    setLocalAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      
      if (question.multiSelect > 1) {
        if (currentAnswers.includes(optionId)) {
          return { ...prev, [questionId]: currentAnswers.filter(id => id !== optionId) };
        } else if (currentAnswers.length < question.multiSelect) {
          return { ...prev, [questionId]: [...currentAnswers, optionId] };
        }
        return prev;
      } else {
        const newAnswers = { ...prev, [questionId]: [optionId] };
        
        // Call onAnswer with the response
        onAnswer({
          questionId,
          selectedOptions: [optionId]
        });
        
        return newAnswers;
      }
    });
  };

  const handleNext = () => {
    if (localQuestionIndex < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setLocalQuestionIndex(prev => prev + 1);
        setIsAnimating(false);
      }, 150);
    } else {
      if (onComplete) {
        onComplete(localAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (localQuestionIndex > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setLocalQuestionIndex(prev => prev - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const getImageForOption = (index: number): BankImage => {
    return strategicImageBank[index % strategicImageBank.length];
  };

  const canProceed = () => {
    const currentAnswers = localAnswers[currentQuestion?.id] || [];
    return currentAnswers.length > 0;
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-[#B89B7A]">
            Pergunta {localQuestionIndex + 1} de {questions.length}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}% completo</span>
        </div>
        <Progress value={progress} className="h-3 bg-gray-200" />
      </div>

      <Card className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-xl md:text-2xl font-bold text-[#432818] mb-2">
            {currentQuestion.title}
          </CardTitle>
          <p className="text-gray-600 text-base md:text-lg">
            {currentQuestion.text}
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = (localAnswers[currentQuestion.id] || []).includes(option.id);
              const imageData = getImageForOption(index);
              
              return (
                <div
                  key={option.id}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                  className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    isSelected 
                      ? 'border-[#B89B7A] bg-[#B89B7A]/10 shadow-lg' 
                      : 'border-gray-200 hover:border-[#B89B7A]/50'
                  }`}
                >
                  {currentQuestion.type === 'image' || currentQuestion.type === 'both' ? (
                    <div className="aspect-square rounded-lg overflow-hidden mb-3">
                      <OptimizedImage
                        src={option.imageUrl || imageData.url}
                        alt={option.text}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="p-4">
                    <p className="text-center font-medium text-[#432818]">
                      {option.text}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-[#B89B7A] text-white rounded-full p-1">
                      <CheckCircle size={20} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              disabled={localQuestionIndex === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Anterior
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#B89B7A] hover:bg-[#A08660] text-white flex items-center gap-2"
            >
              {localQuestionIndex === questions.length - 1 ? 'Finalizar Quiz' : 'Próxima'}
              <ArrowRight size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategicQuestions;
export { StrategicQuestions };
