import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Lazy imports - carregados progressivamente
const Header = lazy(() => import('@/components/result/Header').then(module => ({ default: module.Header })));
const SecondaryStylesSection = lazy(() => import('@/components/quiz-result/SecondaryStylesSection'));
const BeforeAfterTransformation4 = lazy(() => import('@/components/result/BeforeAfterTransformation4'));
const MotivationSection = lazy(() => import('@/components/result/MotivationSection'));
const BonusSection = lazy(() => import('@/components/result/BonusSection'));
const Testimonials = lazy(() => import('@/components/quiz-result/sales/Testimonials'));
const GuaranteeSection = lazy(() => import('@/components/result/GuaranteeSection'));
const MentorSection = lazy(() => import('@/components/result/MentorSection'));

interface ComponentLoadState {
  name: string;
  loaded: boolean;
  error: string | null;
  component: React.ComponentType<any> | null;
}

const ResultPageProgressive: React.FC = () => {
  const navigate = useNavigate();
  const { quizData, userAnswers } = useQuiz();
  const [currentStep, setCurrentStep] = useState(0);
  const [components, setComponents] = useState<ComponentLoadState[]>([
    { name: 'Header', loaded: false, error: null, component: null },
    { name: 'SecondaryStylesSection', loaded: false, error: null, component: null },
    { name: 'BeforeAfterTransformation4', loaded: false, error: null, component: null },
    { name: 'MotivationSection', loaded: false, error: null, component: null },
    { name: 'BonusSection', loaded: false, error: null, component: null },
    { name: 'Testimonials', loaded: false, error: null, component: null },
    { name: 'GuaranteeSection', loaded: false, error: null, component: null },
    { name: 'MentorSection', loaded: false, error: null, component: null },
  ]);

  const [debugInfo, setDebugInfo] = useState({
    quizDataExists: false,
    userAnswersExists: false,
    localStorage: '',
    errors: [] as string[]
  });

  // Mock data para teste
  const mockQuizData = {
    id: 'test-quiz',
    title: 'Quiz de Teste',
    description: 'Quiz para teste de debug',
    questions: []
  };

  const mockUserAnswers = {
    primaryStyle: 'Romântico',
    secondaryStyle: 'Clássico',
    bodyType: 'Ampulheta',
    colorPalette: 'Inverno',
    lifestyle: 'Executiva'
  };

  useEffect(() => {
    // Coleta informações de debug
    const localStorageData = localStorage.getItem('quizResult') || localStorage.getItem('userAnswers') || 'Nenhum dado encontrado';
    
    setDebugInfo({
      quizDataExists: !!quizData || !!localStorage.getItem('quizResult'),
      userAnswersExists: !!userAnswers || !!localStorage.getItem('userAnswers'),
      localStorage: localStorageData,
      errors: []
    });

    console.log('🔍 ResultPageProgressive Debug:', {
      quizData,
      userAnswers,
      localStorage: localStorageData
    });
  }, [quizData, userAnswers]);

  const loadComponent = async (index: number) => {
    const componentName = components[index].name;
    console.log(`🔄 Carregando componente: ${componentName}`);

    try {
      let component = null;
      
      switch (componentName) {
        case 'Header':
          component = Header;
          break;
        case 'SecondaryStylesSection':
          component = SecondaryStylesSection;
          break;
        case 'BeforeAfterTransformation4':
          component = BeforeAfterTransformation4;
          break;
        case 'MotivationSection':
          component = MotivationSection;
          break;
        case 'BonusSection':
          component = BonusSection;
          break;
        case 'Testimonials':
          component = Testimonials;
          break;
        case 'GuaranteeSection':
          component = GuaranteeSection;
          break;
        case 'MentorSection':
          component = MentorSection;
          break;
      }

      setComponents(prev => prev.map((comp, idx) => 
        idx === index 
          ? { ...comp, loaded: true, error: null, component }
          : comp
      ));

      console.log(`✅ Componente ${componentName} carregado com sucesso`);
      
    } catch (error: any) {
      console.error(`❌ Erro ao carregar ${componentName}:`, error);
      setComponents(prev => prev.map((comp, idx) => 
        idx === index 
          ? { ...comp, loaded: false, error: error.message, component: null }
          : comp
      ));
    }
  };

  const loadNextComponent = () => {
    if (currentStep < components.length) {
      loadComponent(currentStep);
      setCurrentStep(prev => prev + 1);
    }
  };

  const loadAllComponents = async () => {
    for (let i = 0; i < components.length; i++) {
      await loadComponent(i);
      await new Promise(resolve => setTimeout(resolve, 500)); // Pausa entre carregamentos
    }
    setCurrentStep(components.length);
  };

  const resetTest = () => {
    setCurrentStep(0);
    setComponents(prev => prev.map(comp => ({ 
      ...comp, 
      loaded: false, 
      error: null, 
      component: null 
    })));
  };

  // Dados efetivos (mock se não houver dados reais)
  const effectiveQuizData = quizData || mockQuizData;
  const effectiveUserAnswers = userAnswers || mockUserAnswers;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header de Debug */}
        <Card className="mb-6 p-6">
          <h1 className="text-2xl font-bold mb-4">🔍 ResultPage Progressive Debug</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold">Status dos Dados:</h3>
              <p>Quiz Data: {debugInfo.quizDataExists ? '✅' : '❌'}</p>
              <p>User Answers: {debugInfo.userAnswersExists ? '✅' : '❌'}</p>
            </div>
            <div>
              <h3 className="font-semibold">LocalStorage:</h3>
              <p className="text-sm text-gray-600 truncate">{debugInfo.localStorage}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={loadNextComponent} disabled={currentStep >= components.length}>
              Carregar Próximo Componente ({currentStep}/{components.length})
            </Button>
            <Button onClick={loadAllComponents} variant="outline">
              Carregar Todos
            </Button>
            <Button onClick={resetTest} variant="outline">
              Reset
            </Button>
            <Button onClick={() => navigate('/resultado-debug')} variant="outline">
              ResultPageDebug
            </Button>
          </div>

          <Progress value={(currentStep / components.length) * 100} className="mt-4" />
        </Card>

        {/* Status dos Componentes */}
        <Card className="mb-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Status dos Componentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {components.map((comp, index) => (
              <div 
                key={comp.name} 
                className={`p-3 rounded border ${
                  comp.loaded ? 'bg-green-50 border-green-200' :
                  comp.error ? 'bg-red-50 border-red-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{comp.name}</span>
                  <span>
                    {comp.loaded ? '✅' : comp.error ? '❌' : '⏳'}
                  </span>
                </div>
                {comp.error && (
                  <p className="text-sm text-red-600 mt-1">{comp.error}</p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Renderização dos Componentes Carregados */}
        <div className="space-y-6">
          {components.map((comp, index) => {
            if (!comp.loaded || !comp.component) return null;

            const Component = comp.component;

            return (
              <Card key={comp.name} className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  🔧 {comp.name}
                </h3>
                <Suspense fallback={
                  <div className="flex items-center justify-center p-8">
                    <LoadingSpinner />
                    <span className="ml-2">Carregando {comp.name}...</span>
                  </div>
                }>
                  <div className="border-2 border-dashed border-blue-200 p-4 rounded">
                    <Component 
                      quizData={effectiveQuizData}
                      userAnswers={effectiveUserAnswers}
                      primaryStyle={effectiveUserAnswers.primaryStyle}
                      secondaryStyle={effectiveUserAnswers.secondaryStyle}
                    />
                  </div>
                </Suspense>
              </Card>
            );
          })}
        </div>

        {/* Dados de Debug */}
        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Dados Efetivos Utilizados</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify({
              quizData: effectiveQuizData,
              userAnswers: effectiveUserAnswers
            }, null, 2)}
          </pre>
        </Card>
      </div>
    </div>
  );
};

export default ResultPageProgressive;
