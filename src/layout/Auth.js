import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { set } from '../store'

const Auth = () => {
    const [auth, setAuth] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/auth/status`, { withCredentials: true })
            .then(res => {
                setAuth(res.data.authenticated)
                if (res.data.authenticated) {
                    dispatch(set({ user: res.data.user }))
                } else {
                    dispatch(set({ user: null }))
                }
            })
            .catch(() => {
                setAuth(false)
                dispatch(set({ user: null }))
            })
    }, [dispatch])

    if (auth === null) return 
    if (auth === false) return <Navigate to="/iniciar-sesion" replace />

    return <Outlet />
}

export default Auth
