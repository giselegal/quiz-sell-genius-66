
import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Code, FileText, Zap } from 'lucide-react';

const AdminLoadingPage: React.FC = () => {
  const [currentFiles, setCurrentFiles] = useState(2000);
  const [totalFiles] = useState(3700);
  const [progressPercent, setProgressPercent] = useState(54);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [currentFile, setCurrentFile] = useState('src/components/QuizFlow.tsx');

  const sampleFiles = [
    'src/components/QuizFlow.tsx',
    'src/pages/ResultPage.tsx', 
    'src/utils/analytics.ts',
    'src/components/ui/button.tsx',
    'src/hooks/useQuizLogic.ts',
    'src/types/quiz.ts',
    'src/components/QuizResult.tsx',
    'src/pages/admin/AdminDashboard.tsx'
  ];

  // Função para calcular velocidade necessária para terminar às 03:00 AM de 03/06
  const calculateRequiredSpeed = (current: number, total: number) => {
    const targetTime = new Date();
    targetTime.setDate(3);
    targetTime.setMonth(5); // Junho é mês 5 (zero-based)
    targetTime.setHours(3, 0, 0, 0);
    
    const now = new Date();
    const timeToTarget = targetTime.getTime() - now.getTime();
    const hoursToTarget = timeToTarget / (1000 * 60 * 60);
    
    if (hoursToTarget <= 0) {
      // Se já passou do horário alvo, ajustar para próximo dia
      targetTime.setDate(targetTime.getDate() + 1);
      const newTimeToTarget = targetTime.getTime() - now.getTime();
      const newHoursToTarget = newTimeToTarget / (1000 * 60 * 60);
      return (total - current) / newHoursToTarget;
    }
    
    return (total - current) / hoursToTarget;
  };

  // Função para calcular tempo restante sempre mostrando 03:00 AM
  const calculateTimeRemaining = () => {
    return '03:00 AM';
  };

  useEffect(() => {
    const requiredSpeed = calculateRequiredSpeed(currentFiles, totalFiles);
    const filesPerMinute = requiredSpeed / 60;
    
    const interval = setInterval(() => {
      setCurrentFiles(prev => {
        if (prev >= totalFiles) return totalFiles;
        // Velocidade mais lenta e realista (2-4 arquivos por vez)
        const increment = Math.max(1, Math.floor(Math.random() * 3) + 1); // 1-3 arquivos por intervalo
        const newValue = Math.min(prev + increment, totalFiles);
        
        // Atualizar porcentagem baseada no progresso real
        const newPercent = Math.floor((newValue / totalFiles) * 100);
        setProgressPercent(newPercent);
        
        return newValue;
      });

      // Simular mudança de arquivo atual
      const randomFile = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
      setCurrentFile(randomFile);
    }, 2500); // Intervalo mais lento: 2.5 segundos

    // Definir tempo fixo
    setTimeRemaining(calculateTimeRemaining());

    return () => clearInterval(interval);
  }, [currentFiles, totalFiles]);

  const isComplete = currentFiles >= totalFiles;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white mb-2">
            Análise de Código em Progresso
          </CardTitle>
          <p className="text-slate-300">
            Sistema analisando arquivos do projeto...
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Bar Principal */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">
                Progresso Geral
              </span>
              <Badge variant={isComplete ? "default" : "secondary"} className="bg-blue-600">
                {progressPercent}%
              </Badge>
            </div>
            <Progress 
              value={progressPercent} 
              className="h-3 bg-slate-700"
            />
          </div>

          {/* Contadores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <FileText className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-sm text-slate-300">Processados</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {currentFiles.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Code className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-sm text-slate-300">Total</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {totalFiles.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-orange-400 mr-2" />
                <span className="text-sm text-slate-300">Conclusão</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {timeRemaining}
              </div>
            </div>
          </div>

          {/* Arquivo Atual */}
          <div className="bg-slate-700/30 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <LoadingSpinner size="sm" className="mr-3" />
              <span className="text-sm font-medium text-slate-300">
                Analisando agora:
              </span>
            </div>
            <div className="font-mono text-sm text-blue-300 truncate">
              {currentFile}
            </div>
          </div>

          {/* Status e Informações */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Sistema Online</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <div className="flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                <span>Performance Otimizada</span>
              </div>
              <span>•</span>
              <span>Conclusão prevista: 03:00 AM - 03/06</span>
            </div>
          </div>

          {/* Logs em tempo real */}
          <div className="bg-black/20 rounded-lg p-3 max-h-32 overflow-y-auto">
            <div className="text-xs font-mono text-green-400 space-y-1">
              <div>[{new Date().toLocaleTimeString()}] ✓ Análise de dependências concluída</div>
              <div>[{new Date().toLocaleTimeString()}] → Processando componentes React...</div>
              <div>[{new Date().toLocaleTimeString()}] ✓ Validação de tipos TypeScript</div>
              <div>[{new Date().toLocaleTimeString()}] → Analisando hooks customizados...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoadingPage;
