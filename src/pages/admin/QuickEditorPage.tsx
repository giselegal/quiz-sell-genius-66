import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import QuickVisualEditor from '../../components/quick-editor/QuickVisualEditor';

const QuickEditorPage = () => {
  return (
    <AdminLayout>
      <div className="h-[calc(100vh-64px)] bg-white">
        <div className="flex flex-col h-full">
          <div className="border-b p-4 bg-gray-50 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#432818]">🚀 Editor Rápido</h1>
              <p className="text-sm text-[#8F7A6A]">Edite suas páginas de resultado e oferta imediatamente</p>
            </div>
            <div className="text-sm text-[#8F7A6A] bg-green-100 px-3 py-1 rounded-full">
              ✨ Solução de Urgência - Pronto para usar!
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <QuickVisualEditor />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuickEditorPage;
