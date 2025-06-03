
import React from 'react';

interface QuizOfferPageEditableProps {
  onEdit?: (section: string) => void;
  data?: any;
}

const QuizOfferPageEditable: React.FC<QuizOfferPageEditableProps> = ({ onEdit, data }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Quiz Offer Page Editor</h2>
      <p>Editor de página de oferta do quiz em desenvolvimento.</p>
      {data && <div className="mt-4">Dados: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default QuizOfferPageEditable;
