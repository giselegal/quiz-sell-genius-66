import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Comentar ou remover qualquer função de manipulação de URL ou rotas aqui
// function fixMainRoutes() { ... }
// function checkMainRoutes() { ... }
// function setupRouteChangePreloading() { ... }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
