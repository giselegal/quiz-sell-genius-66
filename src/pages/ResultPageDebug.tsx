import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/hooks/useQuiz';
import { useAuth } from '@/context/AuthContext';

const ResultPageDebug: React.FC = () => {
  const { primaryStyle, secondaryStyles, resetQuiz } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [localResult, setLocalResult] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebug = (message: string) => {
    console.log('[ResultPageDebug]', message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addDebug('ResultPage carregando...');
    
    const loadQuizData = () => {
      addDebug(`Verificando context - primaryStyle: ${primaryStyle ? 'OK' : 'NULL'}`);
      addDebug(`Verificando user: ${user ? user.userName : 'NULL'}`);
      
      // Primeiro, verificar se há dados no context
      if (primaryStyle) {
        addDebug('Dados encontrados no context');
        setLocalResult({
          primaryStyle,
          secondaryStyles,
          userName: user?.userName || localStorage.getItem('userName') || 'Visitante'
        });
        setIsLoadingData(false);
        return;
      }

      // Tentar carregar do localStorage
      addDebug('Tentando carregar do localStorage...');
      const savedResult = localStorage.getItem('quiz_result') || localStorage.getItem('quizResults');
      if (savedResult) {
        try {
          addDebug('Dados encontrados no localStorage');
          const parsedResult = JSON.parse(savedResult);
          setLocalResult({
            ...parsedResult,
            userName: user?.userName || localStorage.getItem('userName') || 'Visitante'
          });
          setIsLoadingData(false);
          addDebug('Dados carregados com sucesso');
          return;
        } catch (error) {
          addDebug('Erro ao parsear dados do localStorage: ' + error);
        }
      }

      addDebug('Nenhum dado encontrado, criando exemplo...');
      // Se não encontrou dados, criar exemplo padrão
      const exampleResult = {
        primaryStyle: { 
          category: 'Natural', 
          percentage: 85,
          name: 'Natural',
          description: 'Estilo natural e autêntico'
        },
        secondaryStyles: [
          { category: 'Romântico', percentage: 70 },
          { category: 'Clássico', percentage: 65 }
        ],
        userName: user?.userName || localStorage.getItem('userName') || 'Visitante'
      };
      localStorage.setItem('quiz_result', JSON.stringify(exampleResult));
      setLocalResult(exampleResult);
      setIsLoadingData(false);
      addDebug('Exemplo criado e salvo');
    };

    loadQuizData();
  }, [primaryStyle, secondaryStyles, user]);

  if (isLoadingData) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>🔄 Carregando Resultado...</h1>
        <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
          <h3>Debug Info:</h3>
          {debugInfo.map((info, index) => (
            <div key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
              {info}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!localResult || !localResult.primaryStyle) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>❌ Erro no Resultado</h1>
        <p>Não foi possível carregar os dados do resultado.</p>
        <div style={{ background: '#f8d7da', padding: '15px', borderRadius: '8px', color: '#721c24' }}>
          <h3>Debug Info:</h3>
          {debugInfo.map((info, index) => (
            <div key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
              {info}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              background: '#dc3545', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  const { category, percentage } = localResult.primaryStyle;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>✅ Resultado do Quiz</h1>
      
      <div style={{ background: '#d4edda', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>Olá, {localResult.userName}!</h2>
        <h3>Seu estilo principal: {category}</h3>
        <p>Compatibilidade: {percentage}%</p>
        
        {localResult.secondaryStyles && localResult.secondaryStyles.length > 0 && (
          <div>
            <h4>Estilos secundários:</h4>
            <ul>
              {localResult.secondaryStyles.map((style: any, index: number) => (
                <li key={index}>
                  {style.category || style.name}: {style.percentage}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Debug Info:</h3>
        {debugInfo.map((info, index) => (
          <div key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
            {info}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            background: '#6c757d', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Voltar ao Início
        </button>
        
        <button 
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            resetQuiz();
            navigate('/');
          }}
          style={{ 
            background: '#dc3545', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Resetar Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultPageDebug;
