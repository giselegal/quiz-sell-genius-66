import React from "react";

interface StageLayoutOfferProps {
  stage: {
    id: string;
    title: string;
    subtitle?: string;
    type: string;
  };
}

export const StageLayoutOffer: React.FC<StageLayoutOfferProps> = ({
  stage,
}) => {
  // Importação dinâmica da página /quiz-descubra-seu-estilo
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {stage.title || "Oferta Especial"}
        </h2>
        <p className="text-gray-600 mb-6">
          {stage.subtitle ||
            "Baseado no seu resultado, temos uma oferta personalizada para você!"}
        </p>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            Sua Oferta Personalizada
          </h3>
          <p className="text-sm opacity-90">
            Descubra produtos selecionados especialmente para o seu estilo único
          </p>
        </div>
      </div>
    </div>
  );
};
