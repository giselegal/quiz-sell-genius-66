
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ErrorState: React.FC = () => {
  const handleRetry = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-[#B89B7A]/20">
          <AlertCircle className="w-16 h-16 text-[#aa6b5d] mx-auto mb-6" />
          <h2 className="text-2xl font-playfair font-bold text-[#2C1810] mb-4">
            Ops! Algo deu errado
          </h2>
          <p className="text-[#5D4A3A] mb-6">
            Não conseguimos carregar seus resultados. Que tal refazer o quiz?
          </p>
          <Button
            onClick={handleRetry}
            className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform"
          >
            Refazer Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
