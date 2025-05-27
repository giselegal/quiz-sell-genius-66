
"use client";
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { StyleResult } from '@/types/quiz';

interface SalesEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const SalesEditorPanel: React.FC<SalesEditorPanelProps> = ({ 
  isPreviewing, 
  primaryStyle 
}) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full border-r bg-white overflow-y-auto">
          <div className="p-4">
            <h3 className="font-medium mb-4">Componentes</h3>
            <p className="text-gray-500 text-sm">Editor de página de vendas em desenvolvimento.</p>
          </div>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={55}>
        <div className="h-full bg-[#FAF9F7] p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm min-h-full p-6">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Editor de Página de Vendas</h2>
              <p className="text-gray-600">Esta funcionalidade está em desenvolvimento.</p>
            </div>
          </div>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="h-full border-l bg-white overflow-y-auto p-4">
          <h3 className="font-medium mb-4">Propriedades</h3>
          <p className="text-gray-500 text-sm">Selecione um componente para editar suas propriedades.</p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SalesEditorPanel;
