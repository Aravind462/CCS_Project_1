import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import HeaderStatusContext from './contexts/headerStatusContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HeaderStatusContext>
        <App />
      </HeaderStatusContext>
    </BrowserRouter>
  </StrictMode>,
)
