
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Mount the app to the root element
const root = document.getElementById('root')
if (root) {
  createRoot(root).render(<App />)
}
