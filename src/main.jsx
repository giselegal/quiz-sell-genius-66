
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log('🔥 main.jsx iniciando...');

const prepareRootAndRender = () => {
  try {
    console.log('🔍 Procurando elemento root...');
    const rootElement = document.getElementById('root');
    
    if (rootElement) {
      console.log('✅ Elemento root encontrado!');
      
      // Remove loading fallback if exists
      const loadingFallback = rootElement.querySelector('.loading-fallback');
      if (loadingFallback) {
        console.log('🧹 Removendo loading fallback...');
        loadingFallback.style.display = 'none';
      }
      
      console.log('🚀 Iniciando render do React...');
      ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      console.log('✅ React renderizado com sucesso!');
    } else {
      console.error('❌ Elemento root não encontrado!');
    }
  } catch (error) {
    console.error('❌ Erro ao renderizar o aplicativo:', error);
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center;">
          <h2>Oops! Algo deu errado.</h2>
          <p>Erro: ${error.message}</p>
          <button onclick="window.location.reload()" style="padding: 8px 16px; background: #3B82F6; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px;">
            Recarregar Página
          </button>
        </div>
      `;
    }
  }
};

// Execute rendering immediately
prepareRootAndRender();
