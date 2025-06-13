import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthLayout } from '@/layouts/AuthLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import DashboardPage from '@/pages/DashboardPage';
import QuizBuilderPage from '@/pages/QuizBuilderPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import CreativesPage from '@/pages/CreativesPage';
import SettingsPage from '@/pages/SettingsPage';
import EditorPage from '@/pages/EditorPage';
import QuizPage from '@/pages/QuizPage';
import ResultPage from '@/pages/ResultPage';
import QuizOfferPage from '@/pages/QuizOfferPage';
import QuizEditorPage from '@/pages/QuizEditorPage';
import LiveEditorPage from '@/pages/LiveEditorPage';
import ResultPageEditorPage from '@/pages/ResultPageEditorPage';
import ABTestPage from '@/pages/ABTestPage';
import QuizIntro from '@/components/QuizIntro';
import InLeadEditorPage from '@/pages/InLeadEditorPage';

function App() {
  const { authData, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [location.pathname, checkAuth]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/login"
          element={authData ? <Navigate to="/admin/dashboard" replace /> : <AuthLayout><LoginPage /></AuthLayout>}
        />
        <Route
          path="/register"
          element={authData ? <Navigate to="/admin/dashboard" replace /> : <AuthLayout><RegisterPage /></AuthLayout>}
        />
        <Route
          path="/forgot-password"
          element={authData ? <Navigate to="/admin/dashboard" replace /> : <AuthLayout><ForgotPasswordPage /></AuthLayout>}
        />
        <Route
          path="/reset-password/:token"
          element={authData ? <Navigate to="/admin/dashboard" replace /> : <AuthLayout><ResetPasswordPage /></AuthLayout>}
        />
        <Route path="/" element={<QuizIntro />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/quiz-descubra-seu-estilo" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        
        {/* InLead Editor Route */}
        <Route path="/inlead-editor" element={<InLeadEditorPage />} />
        
        <Route path="/quiz-offer" element={<QuizOfferPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="quiz-builder" element={<QuizBuilderPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="creatives" element={<CreativesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="editor" element={<EditorPage />} />
          <Route path="quiz-editor" element={<QuizEditorPage />} />
          <Route path="live-editor" element={<LiveEditorPage />} />
          <Route path="result-editor" element={<ResultPageEditorPage />} />
          <Route path="ab-test" element={<ABTestPage />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
