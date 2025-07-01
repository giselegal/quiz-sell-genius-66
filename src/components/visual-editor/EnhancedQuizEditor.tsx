
import React from 'react';
import QuizBuilder from '../quiz-builder/QuizBuilder';

/**
 * EnhancedQuizEditor é um wrapper para o componente QuizBuilder
 * que pode adicionar funcionalidades extras como análises, ferramentas
 * avançadas de edição, e outras melhorias.
 */
const EnhancedQuizEditor: React.FC = () => {
  return (
    <div className="enhanced-quiz-editor">
      <QuizBuilder />
    </div>
  );
};

export default EnhancedQuizEditor;
