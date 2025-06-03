
import React from 'react';
import QuizOfferPage from '@/pages/QuizOfferPage';

const QuizOfferPageEditor: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">
          Editor da Página de Oferta do Quiz
        </h2>
        <p className="text-blue-600">
          Visualização da página de oferta do quiz. As edições podem ser feitas diretamente no código fonte.
        </p>
      </div>
      
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <QuizOfferPage />
      </div>
    </div>
  );
};

export default QuizOfferPageEditor;
