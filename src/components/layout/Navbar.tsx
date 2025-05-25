import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAdmin, hasEditorAccess } = useAuth();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo e Nome do Site */}
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">SeuSite</Link>
        </div>
        
        {/* Links da Navbar */}
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Início</Link>
          <Link to="/sobre" className="text-gray-600 hover:text-gray-900">Sobre</Link>
          <Link to="/contato" className="text-gray-600 hover:text-gray-900">Contato</Link>
          
          {/* Links de Admin (visíveis apenas para admin) */}
          {isAdmin && (
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin" 
                className="text-gray-600 hover:text-gray-900"
              >
                Admin
              </Link>
              
              {hasEditorAccess && (
                <Link 
                  to="/admin/editor" 
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Editor
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};