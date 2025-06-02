
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF9F7] to-[#F5F2EE]">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-[#B89B7A] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[#432818] mb-2">
            Página não encontrada
          </h2>
          <p className="text-[#6B7280] max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')}
            className="bg-[#B89B7A] hover:bg-[#A1835D] text-white"
          >
            <Home className="w-4 h-4 mr-2" />
            Ir para o Quiz
          </Button>
          
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
