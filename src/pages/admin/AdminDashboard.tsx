import React, { useState, useEffect } from 'react';

// Helper function to simulate class joining
// const classNames = (...classes) => classes.filter(Boolean).join(' '); // Not used in the current setup, can be removed if not needed elsewhere

// --- Simulated Components (Normally from libraries or other files) ---

// Simulated AdminLayout component
const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
    {/* Simulated Header */}
    <header className="bg-[#432818] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <nav>
          {/* Add any header navigation links here if needed */}
        </nav>
      </div>
    </header>

    {/* Main Content Area */}
    <main className="flex-grow container mx-auto p-4">
      {children}
    </main>

    {/* Simulated Footer */}
    <footer className="bg-[#432818] text-white p-4 text-center">
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </footer>
  </div>
);

// Simulated Link component (basic navigation for this example)
// Now uses onNavigate prop to integrate with App's routing
const MockLink = ({ to, className, children, onNavigate }) => (
  <a
    href={`#${to}`} // Ensure href attribute is a valid hash link
    className={className}
    onClick={(e) => {
      e.preventDefault(); // Prevent default anchor tag behavior
      if (onNavigate) {
        onNavigate(to); // Call the navigation handler from App component
      } else {
        // Fallback or warning if onNavigate is not provided
        console.warn(`MockLink: onNavigate prop not provided for path: ${to}. Navigation might not work as expected.`);
      }
    }}
  >
    {children}
  </a>
);

// --- Main Application Components ---

// DashboardCard component
const DashboardCard = ({
  title,
  description,
  linkTo,
  buttonText,
  isExternal = false,
  onNavigate // Prop to handle navigation, passed from AdminDashboard
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-[#B89B7A]/30 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-semibold text-[#432818] mb-2">{title}</h2>
      <p className="text-[#6B4F4F] mb-4 text-sm">{description}</p>
    </div>
    {isExternal ? (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block px-6 py-3 bg-[#B89B7A] text-white rounded-md hover:bg-[#A08466] transition-colors font-medium text-center"
      >
        {buttonText}
      </a>
    ) : (
      // Internal links use MockLink with the onNavigate handler
      <MockLink
        to={linkTo}
        onNavigate={onNavigate} // Pass the onNavigate handler
        className="mt-auto inline-block px-6 py-3 bg-[#B89B7A] text-white rounded-md hover:bg-[#A08466] transition-colors font-medium text-center"
      >
        {buttonText}
      </MockLink>
    )}
  </div>
);

// AdminDashboard component
const AdminDashboard = ({ onNavigate }) => {
  const cardsData = [
    { title: "Editor Unificado", description: "Edite quiz, páginas de resultados e vendas de forma centralizada.", linkTo: "/admin/editor", buttonText: "Abrir Editor" },
    { title: "Analytics Principal", description: "Visualize as métricas chave de desempenho do seu funil.", linkTo: "/admin/analytics", buttonText: "Ver Analytics" },
    { title: "Analytics de Criativos", description: "Analise a performance dos seus anúncios e criativos.", linkTo: "/admin/creative-analytics", buttonText: "Analisar Criativos" },
    { title: "Testes A/B", description: "Gerencie e configure seus testes A/B para otimizar conversões.", linkTo: "/admin/ab-tests", buttonText: "Gerenciar Testes" },
    { title: "Métricas Rápidas", description: "Acesse um resumo das métricas mais importantes rapidamente.", linkTo: "/admin/quick-metrics", buttonText: "Ver Métricas" },
    { title: "Ver Resultados", description: "Visualize os resultados dos quizzes enviados pelos usuários.", linkTo: "/resultado", buttonText: "Ver Resultados" },
    { title: "Quiz Principal", description: "Acesse e visualize o quiz principal como um usuário.", linkTo: "/", buttonText: "Ver Quiz" }, // Root path for the quiz
    { title: "Editor de Header", description: "Personalize o cabeçalho da página de resultado do quiz.", linkTo: "/admin/header-editor", buttonText: "Editar Header" }
  ];

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-3xl font-bold text-[#432818] mb-8 text-center md:text-left">
          Painel de Administração
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardsData.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              description={card.description}
              linkTo={card.linkTo}
              buttonText={card.buttonText}
              isExternal={card.isExternal} // Assuming isExternal might be a future prop
              onNavigate={onNavigate} // Pass navigation handler to each card
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

// --- Placeholder Page Components ---
// PlaceholderPage now also accepts onNavigate to pass to its MockLink
const PlaceholderPage = ({ pageName, onNavigate }) => (
  <AdminLayout>
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#432818] mb-6">
        {pageName}
      </h1>
      <p className="text-[#6B4F4F]">
        Esta é uma página de exemplo para "{pageName}". O conteúdo real seria renderizado aqui.
      </p>
      {/* This MockLink now also uses the onNavigate prop from App */}
      <MockLink
        to="/admin" // Link back to the admin dashboard
        onNavigate={onNavigate}
        className="mt-6 inline-block px-4 py-2 bg-[#B89B7A] text-white rounded-md hover:bg-[#8F7A6A] transition-colors"
      >
        Voltar ao Painel
      </MockLink>
    </div>
  </AdminLayout>
);


// Main App Component
export default function App() {
  // Initialize currentPage from the URL hash, defaulting to '/admin'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.substring(1); // Remove '#'
    return hash || '/admin'; // Default to /admin if hash is empty
  });

  // Navigation handler: updates URL hash and current page state
  const handleNavigate = (path) => {
    // Ensure path starts with '/' for consistency, though current paths are fine
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    window.location.hash = normalizedPath; // Set the URL hash
    // setCurrentPage(normalizedPath); // Optionally set state directly for immediate UI update,
                                    // though hashchange listener will also do this.
                                    // Keeping it can make UI feel more responsive.
                                    // For simplicity, let hashchange listener handle it to avoid potential double sets if not careful.
  };

  // Effect to listen for hash changes (e.g., browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      console.log("Hash changed to:", hash);
      setCurrentPage(hash || '/admin'); // Update page based on new hash
    };

    // Set initial page based on current hash when component mounts
    // This ensures the page is correct if the app loads with a specific hash
    handleHashChange(); 

    window.addEventListener('hashchange', handleHashChange);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Empty dependency array, so this effect runs once on mount and cleans up on unmount

  // Components that need navigation capabilities
  const AdminDashboardWithNav = () => <AdminDashboard onNavigate={handleNavigate} />;
  const PlaceholderPageWithNav = ({ pageName }) => (
    <PlaceholderPage pageName={pageName} onNavigate={handleNavigate} />
  );

  // Simple router based on currentPage state
  // console.log("Rendering page:", currentPage); // For debugging current route
  switch (currentPage) {
    case '/admin': // Handles both /admin and /admin/ (if hash was manually set to /admin/)
    case '/admin/':
      return <AdminDashboardWithNav />;
    case '/admin/editor':
      return <PlaceholderPageWithNav pageName="Editor Unificado" />;
    case '/admin/analytics':
      return <PlaceholderPageWithNav pageName="Analytics Principal" />;
    case '/admin/creative-analytics':
      return <PlaceholderPageWithNav pageName="Analytics de Criativos" />;
    case '/admin/ab-tests':
      return <PlaceholderPageWithNav pageName="Testes A/B" />;
    case '/admin/quick-metrics':
      return <PlaceholderPageWithNav pageName="Métricas Rápidas" />;
    case '/resultado':
      return <PlaceholderPageWithNav pageName="Resultados do Quiz" />;
    case '/': // Root path, typically the main quiz page
      return <PlaceholderPageWithNav pageName="Quiz Principal (Página Inicial)" />;
    case '/admin/header-editor':
      return <PlaceholderPageWithNav pageName="Editor de Header" />;
    default:
      // Fallback for unknown paths (404 page)
      return (
          <AdminLayout>
            <div className="p-6 text-center">
              <h1 className="text-3xl font-bold text-[#D9534F] mb-4">Página Não Encontrada (404)</h1>
              <p className="text-[#6B4F4F] mb-6">
                A página que você está procurando ({currentPage}) não existe ou foi movida.
              </p>
              {/* Link back to admin dashboard using MockLink and handleNavigate */}
              <MockLink
                to="/admin"
                onNavigate={handleNavigate}
                className="inline-block px-6 py-3 bg-[#B89B7A] text-white rounded-md hover:bg-[#A08466] transition-colors font-medium"
              >
                Voltar ao Painel de Administração
              </MockLink>
            </div>
          </AdminLayout>
      );
  }
}
