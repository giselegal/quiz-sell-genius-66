
"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyleResult, QuizQuestion } from '@/types/quiz';
import { QuizContent } from '@/components/QuizContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

const QUIZ_ID = 'estilo-pessoal';

const QuizDescubraSeuEstiloPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadQuizData = async () => {
      setLoading(true);
      try {
        // Check localStorage first
        const storedQuestions = localStorage.getItem('quiz_editor_questions');
        if (storedQuestions) {
          setQuestions(JSON.parse(storedQuestions));
        } else {
          // If not in localStorage, fetch from the server (or any other source)
          // For now, let's use a default set of questions
          const defaultQuestions: QuizQuestion[] = [
            {
              id: '1',
              title: 'Qual peça de roupa te define?',
              type: 'single',
              options: [
                { id: '1a', text: 'Jeans confortáveis', styleCategory: 'Natural', points: 5 },
                { id: '1b', text: 'Um blazer elegante', styleCategory: 'Clássico', points: 5 },
                { id: '1c', text: 'Vestido moderno', styleCategory: 'Contemporâneo', points: 5 },
                { id: '1d', text: 'Uma saia romântica', styleCategory: 'Romântico', points: 5 },
              ],
            },
            {
              id: '2',
              title: 'Que acessório não pode faltar?',
              type: 'single',
              options: [
                { id: '2a', text: 'Um lenço estiloso', styleCategory: 'Criativo', points: 5 },
                { id: '2b', text: 'Joias delicadas', styleCategory: 'Elegante', points: 5 },
                { id: '2c', text: 'Óculos de sol da moda', styleCategory: 'Sexy', points: 5 },
                { id: '2d', text: 'Bolsa estruturada', styleCategory: 'Dramático', points: 5 },
              ],
            },
          ];
          setQuestions(defaultQuestions);
        }
      } catch (error) {
        console.error('Error loading quiz data:', error);
        toast({
          title: 'Erro ao carregar o quiz',
          description: 'Não foi possível carregar as perguntas do quiz.',
          variant: 'destructive',
        });
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, [toast]);

  const handleAnswerSubmit = useCallback((response: any) => {
    // Handle answer submission logic here
    console.log('Answer submitted:', response);
  }, []);

  const handleComplete = useCallback((results: StyleResult[]) => {
    console.log('Quiz completed with results:', results);
    
    if (results && results.length > 0) {
      const primaryStyle = results[0];
      const secondaryStyles = results.slice(1, 4);
      
      // Store results in localStorage
      localStorage.setItem('quiz_results', JSON.stringify({
        primaryStyle,
        secondaryStyles,
        completedAt: new Date().toISOString()
      }));
      
      // Navigate to results page
      navigate('/resultado');
    }
  }, [navigate]);

  const handleStartQuiz = () => {
    // Implement logic to start the quiz, e.g., show the first question
  };

  const handleNextClick = () => {
    // Implement next question logic
  };

  const handlePrevious = () => {
    // Implement previous question logic
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Card className="w-full max-w-md p-4">
          <CardHeader>
            <CardTitle><Skeleton className="h-5 w-3/4 mb-2" /></CardTitle>
            <CardDescription><Skeleton className="h-4 w-1/2" /></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
      <Card className="w-full max-w-3xl mx-auto shadow-md rounded-lg overflow-hidden">
        <CardHeader className="bg-white p-6 border-b">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Descubra Seu Estilo Pessoal
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Responda algumas perguntas e descubra o estilo que mais combina com você!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {questions && questions.length > 0 ? (
            <QuizContent
              user={{}}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              showingStrategicQuestions={showingStrategicQuestions}
              currentStrategicQuestionIndex={currentStrategicQuestionIndex}
              currentQuestion={questions[currentQuestionIndex]}
              currentAnswers={currentAnswers}
              handleAnswerSubmit={handleAnswerSubmit}
              handleNextClick={handleNextClick}
              handlePrevious={handlePrevious}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {questions === null ? 'Carregando quiz...' : 'Nenhuma pergunta encontrada.'}
              </p>
              {questions !== null && (
                <Button onClick={handleStartQuiz} className="mt-4">
                  Tentar Novamente
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-gray-500">
        <p>
          Feito com ❤️ por [Seu Nome/Empresa]
        </p>
      </footer>
    </div>
  );
};

export default QuizDescubraSeuEstiloPage;
