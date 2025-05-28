
import { useState, useEffect } from 'react';
import QuizIntro from '../components/QuizIntro';
import QuizPage from '../components/QuizPage';
import { useQuizContext } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { trackLeadGeneration, trackQuizStart, captureUTMParameters, initFacebookPixel } from '@/utils/analytics';
import { useUtmParameters } from '@/hooks/useUtmParameters';

const HomePage = () => {
  const [started, setStarted] = useState(false);
  const { startQuiz } = useQuizContext();
  const { login } = useAuth();
  const { captureUtmParameters, utmParams } = useUtmParameters();

  // Inicializar o Facebook Pixel e capturar UTM parameters quando a página carregar
  useEffect(() => {
    // Inicializar o Facebook Pixel
    initFacebookPixel();
    
    // Capturar UTM parameters quando a página carregar
    captureUTMParameters();
    
    // Registrar o tempo de início para calcular o tempo de conclusão do quiz depois
    localStorage.setItem('page_load_time', Date.now().toString());
    
    // Log UTM parameters se existirem
    if (Object.keys(utmParams).length > 0) {
      console.log('UTM parameters on page load:', utmParams);
      
      // Verificar se veio de uma campanha do Facebook
      if (utmParams.source === 'facebook' || utmParams.fbclid) {
        console.log('User came from Facebook campaign');
      }
    }
  }, [utmParams]);

  const handleStart = async (name: string, email?: string) => {
    setStarted(true);
    login(name);
    
    // Salvar o timestamp de início oficial do quiz
    localStorage.setItem('quiz_start_time', Date.now().toString());
    
    // Rastrear início do quiz com dados do usuário e UTM parameters
    trackQuizStart(name, email);
    
    // Se o email foi fornecido, registrar como lead
    if (email) {
      trackLeadGeneration(email);
    }
    
    console.log(`Quiz started by ${name}${email ? ` (${email})` : ''}`);
    localStorage.setItem('userName', name);
    if (email) localStorage.setItem('userEmail', email);
  };

  return (
    <div className="min-h-screen bg-background">
      {!started ? (
        <QuizIntro onStart={handleStart} />
      ) : (
        <QuizPage />
      )}
    </div>
  );
};

export default HomePage;
