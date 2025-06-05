import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  initializeResourcePreloading,
  setupRouteChangePreloading,
} from "./utils/preloadResources";
import { fixMainRoutes } from "./utils/fixMainRoutes";
import { checkMainRoutes } from "./utils/routeChecker";
import "./utils/hotmartWebhookSimulator"; // Carregar simulador de webhook
import "./utils/hotmartSimulator"; // Carregar simulador de dados da Hotmart

// 1) Initialize critical resources and route fixing
initializeResourcePreloading();

// 2) Render immediately with error handling
const prepareRootAndRender = () => {
  try {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      // Remove loading fallback if exists
      const loadingFallback = rootElement.querySelector(".loading-fallback");
      if (loadingFallback) {
        loadingFallback.style.display = "none";
      }

      ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } else {
      console.error("Elemento root não encontrado!");
    }
  } catch (error) {
    console.error("Erro ao renderizar o aplicativo:", error);
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center;">
          <h2>Oops! Algo deu errado.</h2>
          <p>Estamos trabalhando para resolver. Por favor, tente recarregar a página.</p>
          <button onclick="window.location.reload()" style="padding: 8px 16px; background: #B89B7A; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px;">
            Recarregar Página
          </button>
        </div>
      `;
    }
  }
};

// Execute rendering immediately
prepareRootAndRender();

// 3) Setup route change monitoring and fixes
const loadNonCritical = () => {
  // Fix any URL issues in the main routes
  fixMainRoutes();

  // Setup monitoring for route changes to preload resources
  setupRouteChangePreloading();

  // Check the status of main routes
  setTimeout(() => {
    checkMainRoutes();
    console.log("✅ Main routes activated and checked");
  }, 1000);
};

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(loadNonCritical, { timeout: 2000 });
} else {
  setTimeout(loadNonCritical, 2000);
}

// Registrar Service Worker
if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => console.log("SW registered:", registration))
      .catch((error) => console.log("SW registration failed:", error));
  });
}
