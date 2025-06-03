// src/App.jsx
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'

// Páginas públicas
const Login = React.lazy(() => import('./views/pages/login/Login'))
const RecoverPassword = React.lazy(() => import('./views/pages/recover-password/RecoverPassword'))
const VerifyToken = React.lazy(() => import('./views/pages/verfiy-token/VerfiyToken'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Layout protegido y páginas internas
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Modulos = React.lazy(() => import('./views/dashboard/Modulos'))
const Auth = React.lazy(() => import('./layout/Auth'))

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
        <Suspense
          fallback={
            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 px-3 bg-light text-center">
              <img
                src="https://esfot.epn.edu.ec/images/logo_esfot_buho.png"
                alt="Cargando..."
                className="img-fluid"
                style={{ maxWidth: '150px', marginBottom: '20px' }}
              />
              <CSpinner
                variant="grow"
                style={{
                  width: '3rem',
                  height: '3rem',
                  color: '#0e4c71',
                }}
              />
              <p className="mt-4 fw-semibold fs-6 fs-md-5" style={{ color: '#e72f2b' }}>
                Cargando Sistema de Reservas de Aulas y Laboratorios ESFOT...
              </p>
            </div>
          }
        >
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Navigate to="/iniciar-sesion" replace />} />
            <Route path="/iniciar-sesion" element={<Login />} />
            <Route path="/recuperar-contrasena" element={<RecoverPassword />} />
            <Route path="/enviar-contrasena-recuperacion/:token" element={<VerifyToken />} />

            {/* Rutas protegidas */}
            <Route element={<Auth />}>
              <Route element={<DefaultLayout />}>
                <Route path="/*" element={<Modulos />} />
              </Route>
            </Route>

            {/* Página 404 */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      {/* ToastContainer global para notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover

      />
    </>
  )
}

export default App
