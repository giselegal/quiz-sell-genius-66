
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseQuestions } from '@/hooks/useSupabaseQuestions';

interface EditorDebugPanelProps {
  steps: any[];
  activeStepId: string | null;
  elements: any[];
  isVisible: boolean;
  onToggle: () => void;
}

export const EditorDebugPanel: React.FC<EditorDebugPanelProps> = ({
  steps,
  activeStepId,
  elements,
  isVisible,
  onToggle
}) => {
  const { questions, strategicQuestions, loading, error } = useSupabaseQuestions();

  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
      >
        🐛 Debug
      </Button>
    );
  }

  const activeStep = steps.find(s => s.id === activeStepId);
  const activeStepElements = elements.filter(e => e.stepId === activeStepId);

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex justify-between items-center">
            🐛 Editor Debug Panel
            <Button onClick={onToggle} variant="ghost" size="sm">×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          {/* Status do Supabase */}
          <div>
            <h4 className="font-semibold mb-2">Supabase Status</h4>
            <div className="space-y-1">
              <Badge variant={loading ? "secondary" : "default"}>
                Loading: {loading ? "Yes" : "No"}
              </Badge>
              <Badge variant={error ? "destructive" : "default"}>
                Error: {error ? "Yes" : "No"}
              </Badge>
              <div className="text-xs">
                Questions: {questions.length} | Strategic: {strategicQuestions.length}
              </div>
            </div>
          </div>

          {/* Status das Etapas */}
          <div>
            <h4 className="font-semibold mb-2">Steps Status</h4>
            <div className="space-y-1">
              <div>Total Steps: {steps.length}</div>
              <div>Active Step: {activeStepId || 'None'}</div>
              {activeStep && (
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <div>Type: {activeStep.type}</div>
                  <div>Title: {activeStep.title}</div>
                  <div>Has Question Data: {activeStep.questionData ? 'Yes' : 'No'}</div>
                </div>
              )}
            </div>
          </div>

          {/* Status dos Elements */}
          <div>
            <h4 className="font-semibold mb-2">Elements Status</h4>
            <div className="space-y-1">
              <div>Total Elements: {elements.length}</div>
              <div>Active Step Elements: {activeStepElements.length}</div>
              {activeStepElements.length > 0 && (
                <div className="bg-gray-50 p-2 rounded text-xs max-h-20 overflow-auto">
                  {activeStepElements.map((el, i) => (
                    <div key={i}>{el.type} (order: {el.order})</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Ações de Debug */}
          <div>
            <h4 className="font-semibold mb-2">Debug Actions</h4>
            <div className="space-y-1">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => console.log('Debug Data:', {
                  steps,
                  activeStepId,
                  elements,
                  supabaseData: { questions, strategicQuestions, loading, error }
                })}
              >
                Log All Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
