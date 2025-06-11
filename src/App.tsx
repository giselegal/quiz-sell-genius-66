import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ResultPage from './pages/ResultPage';
import { QuizProvider } from './context/QuizContext';
import ResultPageVisualEditorPage from './pages/ResultPageVisualEditorPage';
import VisualEditorPage from './pages/VisualEditorPage';
import EnhancedQuizBuilder from './components/enhanced-editor/EnhancedQuizBuilder';
import ResultPageEditorPage from './pages/admin/ResultPageEditorPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <QuizProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/resultado" element={<ResultPage />} />
              
              {/* Visual Editor Routes */}
              <Route path="/admin/visual-editor" element={<VisualEditorPage />} />
              <Route path="/admin/result-page-editor/:id" element={<ResultPageVisualEditorPage />} />
              
              {/* Enhanced Quiz Builder */}
              <Route path="/admin/quiz-builder" element={<EnhancedQuizBuilder />} />
              
              {/* Unified Result Page Editor */}
              <Route path="/result-page-editor" element={<ResultPageEditorPage />} />
            </Routes>
          </div>
        </QuizProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
