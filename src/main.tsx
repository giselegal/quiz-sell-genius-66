
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { displayVersion } from './utils/version';

// Display version information in console
displayVersion();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
