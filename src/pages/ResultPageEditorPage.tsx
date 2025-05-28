"use client";
import { safeLocalStorage } from "@/utils/safeLocalStorage";
import React, { useState, useEffect } from 'react';
import { StyleResult } from '@/types/quiz';
import { ResultPageEditorWithControls } from '@/components/result-editor/ResultPageEditorWithControls';
import { useRouter } from 'next/navigation';

const ResultPageEditorPage: React.FC = () => {
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>([]);
  const [customDomain, setCustomDomain] = useState(''); // Novo estado para domínio personalizado
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      const savedResult = safeLocalStorage.getItem('quizResult');
      const savedDomain = safeLocalStorage.getItem('customDomain'); // Carregar domínio salvo
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        if (parsedResult?.primaryStyle) {
          setPrimaryStyle(parsedResult.primaryStyle);
          setSecondaryStyles(parsedResult.secondaryStyles || []);
        } else {
          console.error("Formato de resultado inválido");
          router.push('/resultado');
        }
      } else {
        const defaultStyle: StyleResult = {
          category: 'Natural',
          score: 10,
          percentage: 100
        };
        setPrimaryStyle(defaultStyle);
        setSecondaryStyles([]);
      }
      if (savedDomain) {
        setCustomDomain(savedDomain);
    } catch (error) {
      console.error("Erro ao carregar resultados:", error);
      router.push('/resultado');
    } finally {
      setIsLoading(false);
    }
  }, [router]);
  const handleSave = () => {
      const resultToSave = {
        primaryStyle,
        secondaryStyles
      };
      safeLocalStorage.setItem('quizResult', JSON.stringify(resultToSave));
      safeLocalStorage.setItem('customDomain', customDomain); // Salvar domínio personalizado
      alert('Configurações salvas com sucesso!');
      console.error("Erro ao salvar configurações:", error);
      alert('Erro ao salvar configurações. Verifique o console para mais detalhes.');
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando editor...</p>
      </div>
    );
  }
  if (!primaryStyle) {
        <div className="text-center">
          <p className="text-lg mb-4">Erro: Nenhum resultado encontrado para editar</p>
          <button 
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => router.push('/resultado')}
          >
            Voltar para Resultados
          </button>
        </div>
  return (
    <div className="editor-container">
      <ResultPageEditorWithControls 
        primaryStyle={primaryStyle} 
        secondaryStyles={secondaryStyles} 
      />
      <div className="editor-settings mt-4">
        <label className="block mb-2">Domínio Personalizado:</label>
        <input 
          type="text" 
          value={customDomain} 
          onChange={(e) => setCustomDomain(e.target.value)} 
          className="border rounded px-2 py-1 w-full"
          placeholder="https://meu-dominio.com"
        />
        <button 
          className="bg-primary text-white px-4 py-2 rounded mt-4"
          onClick={handleSave}
        >
          Salvar Configurações
        </button>
    </div>
  );
};
export default ResultPageEditorPage;
