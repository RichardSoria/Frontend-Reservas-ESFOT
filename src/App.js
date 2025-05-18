import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const RecoverPassword = React.lazy(() => import('./views/pages/recover-password/RecoverPassword'))
const VerfiyToken = React.lazy(() => import('./views/pages/verfiy-token/VerfiyToken'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path='/' name="Login Page" index element={<Login />} />
          <Route exact path="/recover-password" name="Recover Password Page" element={<RecoverPassword />} />
          <Route exact path="/verify-token/:token" name="Verfiy Token Page" element={<VerfiyToken />} />
          <Route exact path="/dashboard/*" name="Home" element={<DefaultLayout />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          
          <Route exact path="*" name="Page 404" element={<Page404 />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
