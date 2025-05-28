import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeAnimationOptimization } from './utils/disable-animations'
import { initializeResourcePreloading } from './utils/preloadResources'

// 1) Inicializa o que é crítico
initializeAnimationOptimization()
initializeResourcePreloading()

// 2) Renderiza imediatamente
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// 3) Lazy-load de monitoramentos e rotas quando o navegador estiver ocioso
const loadNonCritical = () => {
  import('./utils/performance-monitor').then(m => m.monitorPerformance())
  import('./utils/siteHealthCheck').then(m => m.checkSiteHealth())
  import('./utils/funnelMonitor').then(m => m.monitorFunnelRoutes())
}
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(loadNonCritical, { timeout: 2000 })
} else {
  setTimeout(loadNonCritical, 2000)
}
