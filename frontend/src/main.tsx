import React from 'react'
import ReactDOM from 'react-dom/client'
import AppContent from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SurveyProvider } from './contexts/SurveyContext.tsx' // Import SurveyProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SurveyProvider> {/* Wrap App with SurveyProvider */}
        <AppContent />
      </SurveyProvider>
    </BrowserRouter>
  </React.StrictMode>,
)