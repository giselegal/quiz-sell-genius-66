
import React, { useState } from 'react';
import { QuizQuestion } from '@/types/quiz';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DraggableQuizEditor } from './DraggableQuizEditor';

interface VisualEditorLayoutProps {
  questions: QuizQuestion[];
  onQuestionsChange: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}

export const VisualEditorLayout: React.FC<VisualEditorLayoutProps> = ({
  questions,
  onQuestionsChange
}) => {
  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="questions">Perguntas</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions">
          <DraggableQuizEditor
            questions={questions}
            onQuestionsChange={onQuestionsChange}
          />
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Configurações do Quiz</h2>
            <p>Configurações em desenvolvimento...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Preview do Quiz</h2>
            <p>Preview em desenvolvimento...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
