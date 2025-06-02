
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import QuizIntro from '@/components/QuizIntro';
import QuizPage from '@/components/QuizPage';
import QuizResult from '@/components/QuizResult';
import ResultPage from '@/pages/ResultPage';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UnifiedEditorPage from '@/pages/UnifiedEditorPage';
import AnalyticsPage from '@/pages/admin/AnalyticsPage';
import CreativeAnalyticsPage from '@/pages/admin/CreativeAnalyticsPage';
import ABTestsPage from '@/pages/admin/ABTestsPage';
import QuickMetricsPage from '@/pages/admin/QuickMetricsPage';
import HeaderEditorPage from '@/pages/admin/HeaderEditorPage';
import LiveEditorPage from '@/pages/admin/LiveEditorPage';
import EditorPage from '@/pages/admin/EditorPage';
import { useNavigate } from 'react-router-dom';
import { StyleResult } from '@/types/quiz';
import { AuthProvider } from '@/context/AuthContext';
import { QuizProvider } from '@/context/QuizContext';

// Wrapper component for QuizIntro to handle navigation
const QuizIntroWrapper = () => {
  const navigate = useNavigate();
  
  const handleStart = (name: string) => {
    localStorage.setItem('userName', name);
    navigate('/quiz');
  };
  
  return <QuizIntro onStart={handleStart} />;
};

// Wrapper component for QuizResult to provide default props
const QuizResultWrapper = () => {
  // Get quiz results from localStorage or provide defaults
  const savedResults = localStorage.getItem('quizResults');
  let primaryStyle: StyleResult = { category: 'Natural' as const, score: 100, percentage: 100 };
  let secondaryStyles: StyleResult[] = [];
  
  if (savedResults) {
    try {
      const results = JSON.parse(savedResults);
      primaryStyle = results.primaryStyle || primaryStyle;
      secondaryStyles = results.secondaryStyles || [];
    } catch (error) {
      console.error('Error parsing quiz results:', error);
    }
  }
  
  return <QuizResult primaryStyle={primaryStyle} secondaryStyles={secondaryStyles} />;
};

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F2E9]">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<QuizIntroWrapper />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/quiz-results" element={<QuizResultWrapper />} />
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/resultado/:style" element={<ResultPage />} />
              
              {/* Admin Routes with Sidebar */}
              <Route path="/admin/*" element={
                <div className="flex min-h-screen w-full">
                  <AdminSidebar />
                  <div className="flex-1">
                    <Routes>
                      <Route index element={<AdminDashboard />} />
                      <Route path="editor" element={<UnifiedEditorPage />} />
                      <Route path="live-editor" element={<LiveEditorPage />} />
                      <Route path="analytics" element={<AnalyticsPage />} />
                      <Route path="creative-analytics" element={<CreativeAnalyticsPage />} />
                      <Route path="ab-tests" element={<ABTestsPage />} />
                      <Route path="quick-metrics" element={<QuickMetricsPage />} />
                      <Route path="header-editor" element={<HeaderEditorPage />} />
                      <Route path="editor/:style" element={<EditorPage />} />
                    </Routes>
                  </div>
                </div>
              } />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
