import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const SimpleResultPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadResult = () => {
      try {
        console.log('🔍 Carregando resultado do quiz...');
        
        // Tentar carregar do localStorage
        const savedResult = localStorage.getItem('quiz_result') || localStorage.getItem('quizResults');
        
        if (savedResult) {
          const parsed = JSON.parse(savedResult);
          console.log('✅ Resultado encontrado:', parsed);
          setResult(parsed);
        } else {
          console.log('⚠️ Nenhum resultado encontrado, criando exemplo...');
          const defaultResult = {
            userName: 'Visitante',
            primaryStyle: { category: 'Natural', percentage: 80 },
            secondaryStyles: []
          };
          setResult(defaultResult);
        }
        
      } catch (err) {
        console.error('❌ Erro ao carregar resultado:', err);
        setError('Erro ao carregar resultado do quiz');
      } finally {
        setIsLoading(false);
      }
    };

    // Simular um pequeno delay para ver o loading
    setTimeout(loadResult, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-[#B89B7A]">Carregando seu resultado...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops, algo deu errado!</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-[#B89B7A] text-white px-6 py-3 rounded-lg hover:bg-[#A1835D]"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#432818] mb-4">
            🎉 Parabéns, {result?.userName || 'Visitante'}!
          </h1>
          <p className="text-lg text-[#8F7A6A]">
            Descobrimos seu estilo dominante
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#432818] mb-4">
              Seu Estilo Principal
            </h2>
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#B89B7A] to-[#A1835D] rounded-full mb-4">
              <span className="text-white text-xl font-bold">
                {result?.primaryStyle?.percentage || 0}%
              </span>
            </div>
            <h3 className="text-xl font-semibold text-[#432818]">
              {result?.primaryStyle?.category || 'Natural'}
            </h3>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/')}
            className="bg-[#B89B7A] text-white px-8 py-3 rounded-lg hover:bg-[#A1835D] mr-4"
          >
            Fazer Novo Quiz
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600"
          >
            Recarregar
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold mb-2">Debug Info:</h4>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SimpleResultPage;
