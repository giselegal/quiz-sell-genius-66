import React, { useState, useEffect } from 'react';
import InlineEditor from '@/components/inline-editor/InlineEditor';
import QuizOfferPage from './QuizOfferPage';

const PreviewQuizOfferPage: React.FC = () => {
  const [title, setTitle] = useState('Visualização do Funil 2 - Quiz Offer Page');
  const [subtitle, setSubtitle] = useState('Esta é uma visualização da página de oferta do quiz');

  useEffect(() => {
    const savedTitle = localStorage.getItem('previewQuizTitle');
    const savedSubtitle = localStorage.getItem('previewQuizSubtitle');
    if (savedTitle) setTitle(savedTitle);
    if (savedSubtitle) setSubtitle(savedSubtitle);
  }, []);

  const handleBlur = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1
          className="text-xl font-bold"
          contentEditable
          suppressContentEditableWarning
          onBlur={e => { setTitle(e.currentTarget.textContent || ''); handleBlur('previewQuizTitle', e.currentTarget.textContent || ''); }}
        >{title}</h1>
        <p
          className="text-sm text-gray-500"
          contentEditable
          suppressContentEditableWarning
          onBlur={e => { setSubtitle(e.currentTarget.textContent || ''); handleBlur('previewQuizSubtitle', e.currentTarget.textContent || ''); }}
        >{subtitle}</p>
      </div>
      
      <div className="preview-content">
        <QuizOfferPage />
      </div>
    </div>
  );
};

export default PreviewQuizOfferPage;
