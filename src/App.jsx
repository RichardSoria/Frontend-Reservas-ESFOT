// src/App.jsx
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

// Estilos globales
import './scss/style.scss'
import './scss/examples.scss'

// Páginas públicas
const Login = React.lazy(() => import('./views/pages/login/Login'))
const RecoverPassword = React.lazy(() => import('./views/pages/recover-password/RecoverPassword'))
const VerifyToken = React.lazy(() => import('./views/pages/verfiy-token/VerfiyToken'))

// Rutas públicas y privadas
const PublicRoutes = React.lazy(() => import('./layout/PublicRoutes'))
const PrivateRoutes = React.lazy(() => import('./layout/PrivateRoutes'))

// Layout protegido y páginas internas
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))


const App = () => {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>

          <Routes>
            {/* Rutas públicas */}
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Navigate to="/iniciar-sesion" replace />} />
              <Route path="/iniciar-sesion" element={<Login />} />
              <Route path="/recuperar-contrasena" element={<RecoverPassword />} />
              <Route path="/enviar-contrasena-recuperacion/:token" element={<VerifyToken />} />
            </Route>

            {/* Rutas protegidas */}
            <Route element={<PrivateRoutes />}>
              <Route path="/*" element={<DefaultLayout />}>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>

      {/* ToastContainer global para notificaciones */}
      <ToastContainer position="top-right"/>
    </>
  )
}

export default App
