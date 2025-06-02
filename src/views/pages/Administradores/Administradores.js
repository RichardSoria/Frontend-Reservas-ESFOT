import FormularioAdministrador from '../../../components/admin/FormularioAdministrador'
import TablaAdministradores from '../../../components/admin/TablaAdministrador'
import { CCard } from '@coreui/react'

const Administradores = () => {
    return (
        <>
            <CCard className="mb-4">
                <h2>Gestión de Administradores</h2>
                <TablaAdministradores />
                <FormularioAdministrador />
            </CCard>
        </>
    )
}

export default Administradores
