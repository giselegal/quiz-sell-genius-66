import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from './components/ui/toaster';

// Lazy loading com React nativo
const QuizApp = lazy(() => import('./components/QuizApp'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));

// Componente de loading melhorado
function LoadingSpinner() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
        <p className="text-gray-600 font-medium">Carregando Quiz Sell Genius...</p>
      </div>
    </div>
  );
}

// Componente de erro para fallback
function ErrorFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Ops! Algo deu errado</h2>
        <p className="text-gray-600 mb-6">Não conseguimos carregar esta página.</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Voltar ao Quiz
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Rota principal do quiz */}
            <Route path="/" element={<QuizApp />} />
            
            {/* Rotas do admin com wildcard corrigido */}
            <Route path="/admin/*" element={<AdminLayout />} />
            
            {/* Rotas específicas que podem ser necessárias */}
            <Route path="/quiz" element={<QuizApp />} />
            <Route path="/resultado" element={<QuizApp />} />
            
            {/* Rota de erro 404 */}
            <Route path="*" element={<ErrorFallback />} />
          </Routes>
        </Suspense>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
