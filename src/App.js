// src/App.jsx
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import { useColorModes } from '@coreui/react'
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
const Modulos = React.lazy(() => import('./views/dashboard/Modulos'))


const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme')?.match(/^[A-Za-z0-9\s]+/)?.[0]
    if (theme) {
      setColorMode(theme)
    }
    if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
              <Route path="/verificar-token" element={<VerifyToken />} />
            </Route>

            {/* Rutas protegidas */}
            <Route element={<PrivateRoutes />}>
              <Route element={<DefaultLayout />}>
                <Route path="/*" element={<Modulos />} />
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
