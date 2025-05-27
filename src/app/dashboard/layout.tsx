// Este é um exemplo de como adicionar o link no layout do dashboard

import Link from 'next/link';
import { FileEdit } from 'lucide-react';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
        <nav className="mt-6">
          {/* ... outros links do menu ... */}
          
          {/* Novo link para o editor de resultados */}
          <Link href="/dashboard/result-editor" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 transition-colors">
            <FileEdit className="h-5 w-5 mr-3" />
            <span>Editor de Resultados</span>
          </Link>
        </nav>
      </div>
      
      {/* Conteúdo principal */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
