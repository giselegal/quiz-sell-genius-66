import React from 'react';
import QuizOfferPage from './QuizOfferPage';

const PreviewQuizOfferPage: React.FC = () => {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1 className="text-xl font-bold">Visualização do Funil 2 - Quiz Offer Page</h1>
        <p className="text-sm text-gray-500">Esta é uma visualização da página de oferta do quiz</p>
      </div>
      
      <div className="preview-content">
        <QuizOfferPage />
      </div>
      
      <style jsx global>{`
        .preview-container {
          padding: 20px;
          max-width: 100%;
          margin: 0 auto;
        }
        
        .preview-header {
          background-color: #f8f9fa;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        
        .preview-content {
          border: 1px dashed #ddd;
          border-radius: 8px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default PreviewQuizOfferPage;
