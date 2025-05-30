
'use client';

import React from 'react';
import ResultPage from '@/pages/ResultPage';

interface ResultPageWrapperProps {
  id: string;
}

const ResultPageWrapper: React.FC<ResultPageWrapperProps> = ({ id }) => {
  return (
    <div data-lovable-component="result-page-wrapper" data-lovable-editable="true">
      <ResultPage />
    </div>
  );
};

export default ResultPageWrapper;
