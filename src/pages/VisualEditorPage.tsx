
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LiveQuizEditor from '@/components/live-editor/LiveQuizEditor';

const VisualEditorPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="visual-editor-page h-screen overflow-hidden">
      <div className="h-full">
        <LiveQuizEditor />
      </div>
    </div>
  );
};

export default VisualEditorPage;
