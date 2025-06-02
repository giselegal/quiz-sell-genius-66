
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QuizIntro } from '@/components/quiz/QuizIntro';
import { QuizFlow } from '@/components/quiz/QuizFlow';
import { QuizResults } from '@/components/quiz/QuizResults';
import { ResultPageWithBlocks } from '@/components/result/ResultPageWithBlocks';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F2E9]">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<QuizIntro />} />
          <Route path="/quiz" element={<QuizFlow />} />
          <Route path="/quiz-flow" element={<QuizFlow />} />
          <Route path="/quiz-results" element={<QuizResults />} />
          <Route path="/resultado" element={<ResultPageWithBlocks />} />
          <Route path="/resultado/:style" element={<ResultPageWithBlocks />} />
          
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
  );
}

export default App;
