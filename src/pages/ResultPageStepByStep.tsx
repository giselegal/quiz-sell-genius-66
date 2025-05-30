import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { Button } from '@/components/ui/button';

const ResultPageStepByStep: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const { primaryStyle, secondaryStyles } = useQuiz();
  
  const steps = [
    { name: 'Componente Base', component: null },
    { name: 'useQuiz Hook', component: null },
    { name: 'useGlobalStyles Hook', component: null },
    { name: 'Header Component', component: () => <Header primaryStyle={primaryStyle} timer={{ hours: 2, minutes: 59, seconds: 59 }} /> },
    { name: 'Style Config', component: null },
    { name: 'Lazy Components Test', component: null }
  ];

  const handleError = (error: Error, step: string) => {
    setErrors(prev => [...prev, `${step}: ${error.message}`]);
    console.error(`Erro no passo ${step}:`, error);
  };

  const renderCurrentStep = () => {
    const step = steps[currentStep];
    
    try {
      if (step.component) {
        return (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Testando: {step.name}</h3>
            {step.component()}
          </div>
        );
      } else {
        return (
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">✅ {step.name}</h3>
            <p className="text-sm text-gray-600">Componente básico funcionando</p>
          </div>
        );
      }
    } catch (error) {
      handleError(error as Error, step.name);
      return (
        <div className="bg-red-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-red-700">❌ {step.name}</h3>
          <p className="text-sm text-red-600">{(error as Error).message}</p>
        </div>
      );
    }
  };

  useEffect(() => {
    // Test hooks
    try {
      console.log('useQuiz result:', { primaryStyle, secondaryStyles });
    } catch (error) {
      handleError(error as Error, 'useQuiz Hook');
    }
  }, [primaryStyle, secondaryStyles]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          🔍 Debug ResultPage - Passo a Passo
        </h1>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Passo {currentStep + 1} de {steps.length}
            </span>
            <div className="flex gap-2">
              <Button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                variant="outline"
                size="sm"
              >
                Anterior
              </Button>
              <Button 
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                size="sm"
              >
                Próximo
              </Button>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {renderCurrentStep()}

        {errors.length > 0 && (
          <div className="mt-8 bg-red-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-700">Erros Encontrados:</h3>
            <ul className="space-y-2">
              {errors.map((error, index) => (
                <li key={index} className="text-sm text-red-600">
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Informações de Debug:</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Primary Style:</strong> {primaryStyle ? 'Presente' : 'Ausente'}</p>
            <p><strong>Secondary Styles:</strong> {secondaryStyles?.length || 0} encontrados</p>
            <p><strong>Location:</strong> {window.location.pathname}</p>
            <p><strong>Local Storage:</strong> {Object.keys(localStorage).length} chaves</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPageStepByStep;
