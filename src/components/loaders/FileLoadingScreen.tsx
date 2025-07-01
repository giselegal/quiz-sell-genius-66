import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

interface FileLoadingScreenProps {
  totalFiles?: number;
  initialFilesLoaded?: number;
  loadingSpeed?: number; // ms between file increments
  onLoadingComplete?: () => void;
  redirectUrl?: string;
  title?: string;
  subtitle?: string;
}

export const FileLoadingScreen: React.FC<FileLoadingScreenProps> = ({
  totalFiles = 3700,
  initialFilesLoaded = 2000,
  loadingSpeed = 50,
  onLoadingComplete,
  redirectUrl,
  title = "Lovable Editor",
  subtitle = "Carregando arquivos do Editor Unificado"
}) => {
  const [filesLoaded, setFilesLoaded] = useState(initialFilesLoaded);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [loadingText, setLoadingText] = useState('Carregando arquivos...');
  
  // Textos de carregamento por etapa
  const loadingTexts = [
    'Inicializando componentes...',
    'Carregando arquivos...',
    'Preparando editor visual...',
    'Configurando ambiente...',
    'Carregando templates...',
    'Inicializando interface...',
    'Quase pronto...'
  ];
  
  useEffect(() => {
    // Trocar texto de carregamento periodicamente
    const textInterval = setInterval(() => {
      setLoadingText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);
    }, 2000);
    
    // Incrementar número de arquivos carregados
    const interval = setInterval(() => {
      setFilesLoaded(prev => {
        if (prev >= totalFiles) {
          clearInterval(interval);
          clearInterval(textInterval);
          setLoadingComplete(true);
          setLoadingText('Carregamento concluído!');
          
          // Executar callback se existir
          if (onLoadingComplete) {
            onLoadingComplete();
          }
          
          // Redirecionar se URL fornecida
          if (redirectUrl) {
            setTimeout(() => {
              window.location.href = redirectUrl;
            }, 1000);
          }
          
          return totalFiles;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, loadingSpeed);
    
    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [totalFiles, loadingSpeed, redirectUrl, onLoadingComplete]);
  
  const progressPercentage = (filesLoaded / totalFiles) * 100;
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#FAF9F7] to-[#EDE5DB]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="mr-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#B89B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#B89B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#B89B7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-2xl font-playfair text-[#432818]">{title}</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-[#432818]">{subtitle}</h3>
          <p className="text-[#8F7A6A] text-sm mb-4">{loadingText}</p>
          
          <Progress value={progressPercentage} className="h-3 mb-2" 
            style={{
              background: '#EDE5DB',
              '--tw-progress-bar': loadingComplete ? '#4CAF50' : '#B89B7A'
            }} 
          />
          
          <div className="flex justify-between text-sm text-[#8F7A6A]">
            <span>{filesLoaded} de {totalFiles} arquivos</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>
        
        {loadingComplete && (
          <div className="text-center p-3 bg-green-50 rounded-md text-green-700">
            Carregamento concluído! Redirecionando...
          </div>
        )}
      </div>
    </div>
  );
};
