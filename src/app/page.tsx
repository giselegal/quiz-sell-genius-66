'use client';

import dynamic from 'next/dynamic';

const QuizFlow = dynamic(() => import('../../components/QuizFlow'), {
  ssr: false,
  loading: () => <div className="flex h-screen w-full items-center justify-center">Carregando quiz...</div>
});

export default function HomePage() {
  return <QuizFlow />;
}
