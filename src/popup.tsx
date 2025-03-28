
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This ensures styles are included in the build
import './App.css'

// Mount the app to the root element
const root = document.getElementById('root')
if (root) {
  createRoot(root).render(<App />)
}
