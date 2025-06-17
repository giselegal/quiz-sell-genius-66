import React from "react";
import { Button } from "@/components/ui/button";

const EditorTest: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Editor</h1>
      <p className="mb-4">
        Esta é uma página de teste para verificar o roteamento.
      </p>
      <Button>Botão de Teste</Button>
    </div>
  );
};

export default EditorTest;
