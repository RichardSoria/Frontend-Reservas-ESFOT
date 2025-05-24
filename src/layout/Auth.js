import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Auth = () => {
    const [auth, setAuth] = useState(null)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/status`, { withCredentials: true })
            .then(res => setAuth(res.data.authenticated))
            .catch(() => setAuth(false))
    }, [])

    if (auth === null) return   // Mostrar mientras se verifica
    if (auth === false) return <Navigate to="/iniciar-sesión" replace />  // No auth, redirige

    return <Outlet />  // Autenticado, renderiza las rutas hijas
}

export default Auth
