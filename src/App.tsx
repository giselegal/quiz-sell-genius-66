
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import UnifiedEditorPage from '@/pages/UnifiedEditorPage';
import VisualEditorPage from '@/pages/VisualEditorPage';
import ResultVisualEditorPage from '@/pages/ResultVisualEditorPage';
import EditorsHubPage from '@/pages/EditorsHubPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/login"
          element={<AuthLayout><LoginPage /></AuthLayout>}
        />
        <Route
          path="/register"
          element={<AuthLayout><RegisterPage /></AuthLayout>}
        />
        <Route
          path="/forgot-password"
          element={<AuthLayout><ForgotPasswordPage /></AuthLayout>}
        />
        <Route
          path="/reset-password/:token"
          element={<AuthLayout><ResetPasswordPage /></AuthLayout>}
        />
        <Route path="/" element={<QuizIntro onStart={(nome: string, email?: string) => {
          console.log('Quiz started:', nome, email);
        }} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/quiz-descubra-seu-estilo" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        
        {/* Hub de Editores - Página principal para escolher editor */}
        <Route path="/editors" element={<EditorsHubPage />} />
        
        {/* Editores Públicos - Acesso direto para desenvolvimento/testes */}
        <Route path="/unified-editor" element={<UnifiedEditorPage />} />
        <Route path="/visual-editor" element={<VisualEditorPage />} />
        <Route path="/result-visual-editor" element={<ResultVisualEditorPage />} />
        <Route path="/inlead-editor" element={<InLeadEditorPage />} />
        
        <Route path="/quiz-offer" element={<QuizOfferPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
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
          
          {/* Editores Admin - Versões integradas no painel admin */}
          <Route path="unified-editor" element={<UnifiedEditorPage />} />
          <Route path="visual-editor" element={<VisualEditorPage />} />
          <Route path="result-visual-editor" element={<ResultVisualEditorPage />} />
          <Route path="editors" element={<EditorsHubPage />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
