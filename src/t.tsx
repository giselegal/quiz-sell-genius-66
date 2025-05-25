import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Star,
  ArrowRight,
  CheckCircle,
  Zap
} from 'lucide-react';

// Dados simulados do quiz
const quizQuestions = [
  {
    id: 1,
    question: "Qual é o seu principal objetivo financeiro?",
    options: [
      { id: 'a', text: 'Aumentar minha renda', value: 'income' },
      { id: 'b', text: 'Investir melhor meu dinheiro', value: 'investment' },
      { id: 'c', text: 'Criar um negócio próprio', value: 'business' },
      { id: 'd', text: 'Ter mais segurança financeira', value: 'security' }
    ]
  },
  {
    id: 2,
    question: "Quanto tempo você dedica por semana para estudar sobre finanças?",
    options: [
      { id: 'a', text: 'Menos de 1 hora', value: 'minimal' },
      { id: 'b', text: '1-3 horas', value: 'moderate' },
      { id: 'c', text: '3-5 horas', value: 'dedicated' },
      { id: 'd', text: 'Mais de 5 horas', value: 'intensive' }
    ]
  },
  {
    id: 3,
    question: "Qual é o seu perfil de risco para investimentos?",
    options: [
      { id: 'a', text: 'Conservador - prefiro segurança', value: 'conservative' },
      { id: 'b', text: 'Moderado - equilibro risco e retorno', value: 'moderate' },
      { id: 'c', text: 'Arrojado - busco maiores retornos', value: 'aggressive' },
      { id: 'd', text: 'Não sei ainda', value: 'uncertain' }
    ]
  }
];

const results = {
  'income-minimal-conservative': {
    title: 'Construtor Cauteloso',
    description: 'Você busca aumentar sua renda de forma segura e gradual.',
    recommendation: 'Curso: Renda Extra Segura',
    color: 'bg-blue-500'
  },
  'investment-moderate-moderate': {
    title: 'Investidor Estratégico',
    description: 'Você tem potencial para se tornar um investidor de sucesso.',
    recommendation: 'Curso: Masterclass de Investimentos',
    color: 'bg-green-500'
  },
  'business-dedicated-aggressive': {
    title: 'Empreendedor Nato',
    description: 'Você tem o perfil ideal para criar seu próprio negócio.',
    recommendation: 'Curso: Empreendedorismo Digital',
    color: 'bg-purple-500'
  }
};

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const answerValues = Object.values(answers);
    const resultKey = answerValues.join('-');
    
    // Buscar resultado mais próximo ou usar um padrão
    const foundResult = results[resultKey as keyof typeof results] || 
                       results['investment-moderate-moderate'];
    
    setResult(foundResult);
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Quiz Sell Genius
                </h1>
              </div>
              <Badge className="bg-green-100 text-green-800 mb-4">
                <CheckCircle className="h-4 w-4 mr-2" />
                Quiz Concluído!
              </Badge>
            </div>

            {/* Resultado */}
            <Card className="border-0 shadow-xl mb-8">
              <CardHeader className="text-center">
                <div className={`w-20 h-20 ${result.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Star className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">{result.title}</CardTitle>
                <CardDescription className="text-lg">
                  {result.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Recomendação Especial</h3>
                  <p className="text-lg">{result.recommendation}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="font-medium">Potencial Alto</div>
                    <div className="text-gray-600">Para seu perfil</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-medium">Foco Direcionado</div>
                    <div className="text-gray-600">Estratégia personalizada</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Brain className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-medium">Método Comprovado</div>
                    <div className="text-gray-600">Resultados garantidos</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                    Ver Curso Recomendado
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Button variant="outline" onClick={restartQuiz} className="w-full">
                    Refazer Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500">
              <p>Quiz desenvolvido por especialistas em educação financeira</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Quiz Sell Genius
              </h1>
            </div>
            <p className="text-gray-600">
              Descubra seu perfil financeiro ideal em apenas 3 perguntas
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
              <span>{Math.round(progress)}% concluído</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Questão */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQ.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(currentQ.id, option.value)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:border-purple-300 hover:bg-purple-50 ${
                      answers[currentQ.id] === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        answers[currentQ.id] === option.value
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQ.id] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  Anterior
                </Button>
                
                <Button 
                  onClick={nextQuestion}
                  disabled={!answers[currentQ.id]}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'Ver Resultado' : 'Próxima'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
