import CalendarioReservas from '../../../components/reserva/CalendarioReserva'
import { CCard, CCardBody, CRow, CCol} from '@coreui/react'

const Reservas = () => {
    return (
        <CCard className="shadow-sm border-0">
            <CCardBody>
                {/* Encabezado */}
                <div className="ms-3 me-3">
                    <h1 className="text-4xl textos-esfot">Gestionar Reservas</h1>
                    <hr />
                    <CRow className="align-items-center">
                        <CCol md={12}>
                            <p className="text-muted mb-0">
                                Este módulo permite la gestión de las reservas del sistema.
                            </p>
                        </CCol>
                    </CRow>
                </div>

                {/* Calendario */}
                <div>
                    <CalendarioReservas />
                </div>

            </CCardBody>
        </CCard>
    )
}

export default Reservas
