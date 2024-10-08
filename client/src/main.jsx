import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'
import { ContextProvider } from './contexts/ContextProvider.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
 
  </React.StrictMode>,
)
