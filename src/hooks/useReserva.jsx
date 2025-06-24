import axios from 'axios'
import { useDispatch } from 'react-redux'
import { set } from '../store'

const useReserva = () => {
    const dispatch = useDispatch()

    const listarReservas = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reserva/reservas`, { withCredentials: true })
            dispatch(set({ reservas: data }))
        } catch (err) {
            console.error('Error al obtener reservas', err)
        }
    }

    const consultReserva = async (id) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reserva/reservas/${id}`, { withCredentials: true })
            dispatch(set({ elementConsult: data }))
            return data
        } catch (err) {
            console.error('Error al consultar reservas', err)
            dispatch(set({ elementConsult: null }))
            return null
        }
    };

    return {
        listarReservas,
        consultReserva
    }
}

export default useReserva
