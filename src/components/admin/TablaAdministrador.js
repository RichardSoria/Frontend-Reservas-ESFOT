import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useAdministradores from '../../hooks/useAdministradores'
import { set } from '../../store'

const TablaAdministradores = () => {
    const dispatch = useDispatch()
    const { listarAdministradores } = useAdministradores()
    const { administradores = [] } = useSelector(state => state)

    useEffect(() => {
        listarAdministradores()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                </tr>
            </thead>
            <tbody>
                {administradores.map(admin => (
                    <tr key={admin._id} onClick={() => dispatch(set({ administradorSeleccionado: admin }))}>
                        <td>{admin._id}</td>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.rol}</td>
                        <td>{admin.lastLogin}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TablaAdministradores
