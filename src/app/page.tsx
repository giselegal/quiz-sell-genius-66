'use client';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LovableRoutes from '@/lovable-routes';

export default function HomePage() {
  return (
    <BrowserRouter>
      <LovableRoutes />
    </BrowserRouter>
  );
}
