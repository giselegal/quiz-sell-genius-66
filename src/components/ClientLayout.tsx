'use client';

import React from 'react';
import dynamic from 'next/dynamic';
const LovableClientProvider = dynamic(
  () => import('./LovableClientProvider').then(mod => mod.LovableClientProvider),
  { ssr: false }
);
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LovableClientProvider>
      {children}
    </LovableClientProvider>
  );
}
