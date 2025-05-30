import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SecureAuthProvider } from './context/SecureAuthContext';
import { QuizProvider } from './context/QuizContext';
import { Toaster } from './components/ui/toaster';
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import ResultPageMinimal from './pages/ResultPageMinimal';
import SimpleResultPage from './pages/SimpleResultPage';
import QuizOfferPage from './pages/QuizOfferPage';
import { AdminRoute } from './components/admin/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPage from './pages/admin/AdminPage';
import AuthPage from './pages/AuthPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import QuizEditorPage from './pages/admin/QuizEditorPage';
import TroubleshootPage from './pages/admin/TroubleshootPage';
import LoginPage from './pages/admin/LoginPage';
import ResultPageDebug from './pages/ResultPageDebug';
import ResultPageProgressive from './pages/ResultPageProgressive';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <SecureAuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Rotas públicas - SEM autenticação */}
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/resultado" element={<ResultPage />} />
                <Route path="/resultado-minima" element={<ResultPageMinimal />} />
                <Route path="/resultado-debug" element={<ResultPageDebug />} />
                <Route path="/resultado-progressivo" element={<ResultPageProgressive />} />
                <Route path="/resultado-simples" element={<SimpleResultPage />} />
                <Route path="/oferta" element={<QuizOfferPage />} />
                <Route path="/auth" element={<AuthPage />} />
                
                {/* Rotas de login administrativo - SEM autenticação */}
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Rota de diagnóstico - SEM autenticação para resolver problemas */}
                <Route path="/troubleshoot" element={<TroubleshootPage />} />
                <Route path="/admin/troubleshoot" element={<TroubleshootPage />} />
                
                {/* Rotas administrativas - COM autenticação protegida */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                
                <Route path="/admin/dashboard" element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                } />
                
                <Route path="/admin/analytics" element={
                  <AdminRoute>
                    <AnalyticsPage />
                  </AdminRoute>
                } />
                
                <Route path="/admin/settings" element={
                  <AdminRoute>
                    <SettingsPage />
                  </AdminRoute>
                } />
                
                <Route path="/admin/quiz-builder" element={
                  <AdminRoute>
                    <QuizBuilderPage />
                  </AdminRoute>
                } />
                
                <Route path="/admin/quiz-editor/:templateId?" element={
                  <AdminRoute>
                    <QuizEditorPage />
                  </AdminRoute>
                } />
                
                {/* Rotas adicionais identificadas no AdminSidebar */}
                <Route path="/admin/pages" element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                } />
                
                <Route path="/admin/analytics/criativos" element={
                  <AdminRoute>
                    <AnalyticsPage />
                  </AdminRoute>
                } />
                
                <Route path="/admin/leads" element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                } />
                
                <Route path="/admin/tracking" element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                } />
                
                <Route path="/admin/ab-tests" element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                } />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </SecureAuthProvider>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
