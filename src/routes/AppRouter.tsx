
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

// Layouts
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Public Pages
import QuizIntro from '@/components/QuizIntro';
import QuizPage from '@/components/QuizPage';
import QuizOfferPage from '@/components/QuizOfferPage';
import ResultPage from '@/pages/ResultPage';
import QuizResult from '@/components/QuizResult';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UnifiedEditorPage from '@/pages/UnifiedEditorPage';
import AnalyticsPage from '@/pages/admin/AnalyticsPage';
import CreativeAnalyticsPage from '@/pages/admin/CreativeAnalyticsPage';
import ABTestsPage from '@/pages/admin/ABTestsPage';
import QuickMetricsPage from '@/pages/admin/QuickMetricsPage';
import HeaderEditorPage from '@/pages/admin/HeaderEditorPage';
import LiveEditorPage from '@/pages/admin/LiveEditorPage';
import EditorPage from '@/pages/admin/EditorPage';

// Utils
import { useNavigate } from 'react-router-dom';
import { StyleResult } from '@/types/quiz';

// Wrapper components
const QuizIntroWrapper = () => {
  const navigate = useNavigate();
  
  const handleStart = (name: string) => {
    localStorage.setItem('userName', name);
    navigate('/quiz');
  };
  
  return <QuizIntro onStart={handleStart} />;
};

const QuizResultWrapper = () => {
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

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ========== ROTAS PÚBLICAS ========== */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<QuizIntroWrapper />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="quiz-descubra-seu-estilo" element={<QuizOfferPage />} />
          <Route path="resultado" element={<ResultPage />} />
          <Route path="resultado/:style" element={<ResultPage />} />
          
          {/* Rota auxiliar - temporária */}
          <Route path="quiz-results" element={<QuizResultWrapper />} />
        </Route>

        {/* ========== ROTAS ADMINISTRATIVAS ========== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="editor" element={<UnifiedEditorPage />} />
          <Route path="live-editor" element={<LiveEditorPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="creative-analytics" element={<CreativeAnalyticsPage />} />
          <Route path="ab-tests" element={<ABTestsPage />} />
          <Route path="quick-metrics" element={<QuickMetricsPage />} />
          <Route path="header-editor" element={<HeaderEditorPage />} />
          <Route path="editor/:style" element={<EditorPage />} />
        </Route>
      </Routes>
      
      <Toaster />
    </Router>
  );
};

export default AppRouter;
