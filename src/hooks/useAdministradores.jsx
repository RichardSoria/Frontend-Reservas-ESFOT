import axios from 'axios'
import { useDispatch } from 'react-redux'
import { set } from '../store'

const useAdministradores = () => {
    const dispatch = useDispatch()

    const listarAdministradores = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/admins`, { withCredentials: true })
            dispatch(set({ administradores: data }))
        } catch (err) {
            console.error('Error al obtener administradores', err)
        }
    }

    const consultAdministrador = async (id) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/admins/${id}`, { withCredentials: true })
            dispatch(set({ userConsult: data }))
        } catch (err) {
            console.error('Error al consultar administrador', err)
        }
    };

    return {
        listarAdministradores,
        consultAdministrador
    }
}

export default useAdministradores
