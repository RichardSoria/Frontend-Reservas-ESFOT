import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'

// Pages públicas
const Login = React.lazy(() => import('./views/pages/login/Login'))
const RecoverPassword = React.lazy(() => import('./views/pages/recover-password/RecoverPassword'))
const VerifyToken = React.lazy(() => import('./views/pages/verfiy-token/VerfiyToken'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Layout protegido y páginas internas
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
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
    <BrowserRouter>
      <Suspense fallback={<div className="pt-3 text-center"><CSpinner color="primary" variant="grow" /></div>}>
        <Routes>

          {/* Rutas públicas */}
          <Route path="/" element={<Navigate to="/iniciar-sesión" replace />} />
          <Route path="/iniciar-sesión" element={<Login />} />
          <Route path="/recuperar-contraseña" element={<RecoverPassword />} />
          <Route path="/enviar-contraseña-recuperación/:token" element={<VerifyToken />} />
          <Route path="/404" element={<Page404 />} />


          {/* Rutas protegidas */}
          <Route element={<Auth />}>
            <Route element={<DefaultLayout />}>
              <Route path="/*" element={<Dashboard />} />
            </Route>
          </Route>

          {/* Página 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
