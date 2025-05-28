'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Eye, BarChart3, Copy, Trash2 } from 'lucide-react';

// Importando configuração estática
export { dynamic } from './static';

export default function QuizDetailPage() {
  const params = useParams();
  const quizId = params?.id;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/quizzes">
          <button className="p-2 hover:bg-[#F5F2E9] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#B89B7A]" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#432818]">Quiz #{quizId}</h1>
          <p className="text-[#B89B7A]">Detalhes e configurações do quiz</p>
        </div>
      </div>

      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-[#432818] mb-2">
          Página em Desenvolvimento
        </h2>
        <p className="text-[#B89B7A]">
          Esta funcionalidade será implementada em breve.
        </p>
      </div>
    </div>
  );
}
