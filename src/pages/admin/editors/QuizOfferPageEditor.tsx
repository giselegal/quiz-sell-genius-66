import React, { useState, useEffect } from 'react';
import { QuizOfferPage } from '@/pages/QuizOfferPage'; // Importando a página para possível preview

// Mock de dados da página (eventualmente viria de um backend ou config)
const initialPageData = {
  heroTitle: "Descubra seu Estilo Único e Transforme seu Guarda-Roupa",
  heroSubtitle: "Em apenas alguns minutos, nosso quiz revelará seu estilo predominante e como criar looks que combinam perfeitamente com sua essência.",
  ctaButtonText: "Quero Descobrir Meu Estilo Agora!",
  checkoutUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
};

const QuizOfferPageEditor: React.FC = () => {
  const [pageData, setPageData] = useState(initialPageData);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPageData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log("Salvando dados da QuizOfferPage:", pageData);
    // Aqui viria a lógica para salvar os dados no backend/CMS
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula chamada API
    setIsSaving(false);
    alert("Alterações salvas com sucesso! (Simulação)");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna de Edição */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">
            Editor da Página de Oferta do Quiz (Funil 2)
          </h2>

          <div>
            <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Título Principal (Hero)
            </label>
            <input
              type="text"
              name="heroTitle"
              id="heroTitle"
              value={pageData.heroTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtítulo (Hero)
            </label>
            <textarea
              name="heroSubtitle"
              id="heroSubtitle"
              rows={3}
              value={pageData.heroSubtitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="ctaButtonText" className="block text-sm font-medium text-gray-700 mb-1">
              Texto do Botão CTA Principal
            </label>
            <input
              type="text"
              name="ctaButtonText"
              id="ctaButtonText"
              value={pageData.ctaButtonText}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="checkoutUrl" className="block text-sm font-medium text-gray-700 mb-1">
              URL de Checkout (Hotmart)
            </label>
            <input
              type="url"
              name="checkoutUrl"
              id="checkoutUrl"
              value={pageData.checkoutUrl}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </div>

        {/* Coluna de Preview (Simplificado) */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Preview (Simplificado)</h3>
          <div className="border border-dashed border-gray-300 p-4 rounded-md min-h-[300px]">
            <h1 className="text-2xl font-bold text-[#432818] mb-3 font-playfair">{pageData.heroTitle}</h1>
            <p className="text-md text-gray-600 mb-4">{pageData.heroSubtitle}</p>
            <a
              href={pageData.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#B89B7A] text-white font-medium rounded-md text-lg shadow-md"
            >
              {pageData.ctaButtonText}
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Nota: Este é um preview simplificado. A página real pode ter estilos e componentes adicionais.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizOfferPageEditor;
