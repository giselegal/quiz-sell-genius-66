
import React from 'react';

interface QuizOfferPageEditableProps {
  onEdit?: (section: string) => void;
}

const QuizOfferPageEditable: React.FC<QuizOfferPageEditableProps> = ({ onEdit }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Quiz Offer Page Editor</h2>
      <p>Editor de página de oferta do quiz em desenvolvimento.</p>
    </div>
  );
};

export default QuizOfferPageEditable;
