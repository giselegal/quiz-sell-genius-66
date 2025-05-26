"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import QuizEditor from '@/components/quiz-editor/QuizEditor';
import { LoadingState } from '@/components/ui/loading-state';
import { getTemplateById } from '@/services/templates/templateService';
import { QuizTemplate } from '@/types/quizTemplate';
const QuizEditorPage = () => {
  const router = useRouter();
  const { templateId } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [template, setTemplate] = useState<QuizTemplate | null>(null);
  useEffect(() => {
    const loadTemplate = async () => {
      if (templateId && typeof templateId === 'string') {
        try {
          const template = await getTemplateById(templateId);
          if (!template) {
            setError('Template não encontrado');
            router.push('/admin/quiz-editor');
            return;
          }
          setTemplate(template);
        } catch (err) {
          console.error('Error loading template:', err);
          setError('Erro ao carregar template');
          router.push('/admin/quiz-editor');
        }
      }
      setLoading(false);
    };
    loadTemplate();
  }, [templateId, router]);
  if (loading) {
    return (
      <AdminLayout>
        <LoadingState />
      </AdminLayout>
    );
  }
  if (error) {
        <div className="p-6">
          <p className="text-red-500">{error}</p>
        </div>
  return (
    <AdminLayout>
      <div className="h-full bg-[#FAF9F7] p-6">
        {template && <QuizEditor initialTemplate={template} />}
      </div>
    </AdminLayout>
  );
};
export default QuizEditorPage;
