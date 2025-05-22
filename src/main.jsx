
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeResourcePreloading, setupRouteChangePreloading } from './utils/preloadResources'
import { fixMainRoutes } from './utils/fixMainRoutes'
import { checkMainRoutes } from './utils/routeChecker'

// 1) Initialize critical resources and route fixing
initializeResourcePreloading()

// 2) Render immediately
ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// 3) Setup route change monitoring and fixes
const loadNonCritical = () => {
  // Fix any URL issues in the main routes
  fixMainRoutes()
  
  // Setup monitoring for route changes to preload resources
  setupRouteChangePreloading()
  
  // Check the status of main routes
  setTimeout(() => {
    checkMainRoutes()
    console.log('✅ Main routes activated and checked')
  }, 1000)
}

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(loadNonCritical, { timeout: 2000 })
} else {
  setTimeout(loadNonCritical, 2000)
}
