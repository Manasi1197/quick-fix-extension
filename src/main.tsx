
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Only render if not in extension context (for development/testing)
if (!chrome.extension) {
  createRoot(document.getElementById("root")!).render(<App />)
}
