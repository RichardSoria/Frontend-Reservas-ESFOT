import FormularioAdministrador from '../../../components/admin/FormularioAdministrador'
import TablaAdministradores from '../../../components/admin/TablaAdministrador'
import { CCard, CCardBody } from '@coreui/react'

const Administradores = () => {
    return (
        <CCard className="shadow-sm border-0 mt-3 mb-3">
            <CCardBody>
                {/* Encabezado */}
                <div className="ms-3 me-3">
                    <h1 className="text-4xl textos-esfot">Gestionar Administradores</h1>
                    <hr/>
                    <p className="text-muted">Este módulo permite la gestión de los usuarios administradores del sistema.</p>
                </div>

                {/* Tabla */}
                <div>
                    <TablaAdministradores />
                </div>

                {/* Formulario */}
                <div>
                    <FormularioAdministrador />
                </div>
            </CCardBody>
        </CCard>
    )
}

export default Administradores
