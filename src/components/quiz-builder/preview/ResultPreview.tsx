
import React from 'react';
import { QuizResult } from '@/types/quiz';

interface ResultPreviewProps {
  result: QuizResult;
}

const ResultPreview: React.FC<ResultPreviewProps> = ({ result }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-playfair mb-4 text-[#432818]">
          Seu Resultado
        </h1>
        <p className="text-lg text-[#8F7A6A]">
          Baseado nas suas respostas, identificamos seu estilo predominante
        </p>
      </div>

      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-medium mb-2 text-[#432818]">
            Seu estilo predominante é
          </h2>
          <div className="text-4xl font-bold text-[#B89B7A] mb-4">
            {result.primaryStyle?.name || 'Elegante'}
          </div>
          <div className="text-xl text-[#8F7A6A]">
            {result.primaryStyle?.percentage || 65}%
          </div>
          
          {result.primaryStyle?.description && (
            <div className="mt-4 p-4 bg-[#FAF9F7] rounded-lg">
              <p className="text-[#432818] leading-relaxed">
                {result.primaryStyle.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4 text-center text-[#432818]">
          Seus estilos secundários
        </h3>
        <div className="space-y-4">
          {result.secondaryStyles?.map((style, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-lg">
              <span className="font-medium text-[#432818]">{style.name}</span>
              <span className="text-[#8F7A6A]">{style.percentage}%</span>
            </div>
          )) || (
            <>
              <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-lg">
                <span className="font-medium text-[#432818]">Clássico</span>
                <span className="text-[#8F7A6A]">25%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-lg">
                <span className="font-medium text-[#432818]">Natural</span>
                <span className="text-[#8F7A6A]">20%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FAF9F7] rounded-lg">
                <span className="font-medium text-[#432818]">Contemporâneo</span>
                <span className="text-[#8F7A6A]">15%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPreview;
