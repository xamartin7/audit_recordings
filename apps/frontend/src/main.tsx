import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { LoginScreen } from './screens/auth/LoginScreen.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginScreen />
  </StrictMode>,
)
