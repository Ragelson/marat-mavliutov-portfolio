import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/onest'
import '@fontsource-variable/jetbrains-mono'
import { App } from './App.tsx'
import './styles/tokens.css'
import './styles/globals.css'

const root = document.getElementById('root')
if (!root) throw new Error('Не найден элемент #root в index.html')

createRoot(root).render(
  <StrictMode>
    {/* base из vite.config.ts: "/" локально, "/marat-mavliutov-portfolio/" на GitHub Pages */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
