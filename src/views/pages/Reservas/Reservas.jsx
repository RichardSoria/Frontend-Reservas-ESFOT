import React from 'react'
import CalendarioReservas from '../../../components/reserva/CalendarioReserva'
import { CCard, CCardBody, CRow, CCol, CButton } from '@coreui/react'
import { CalendarPlus, CalendarCog } from 'lucide-react';
import { CrearReservaModal } from '../../../components/modalsReserva/CrearReservaModal';


const Reservas = () => {

    // Estado para el modal de confirmación
    const [confirmVisible, setConfirmVisible] = React.useState(false);


    // Función para manejar la cancelación
    const handleCancel = () => {
        // Aquí puedes agregar la lógica que se ejecutará al cancelar
        console.log('Acción cancelada');
        setConfirmVisible(false);
    };

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

                {/* Modal de confirmación */}
                <CrearReservaModal
                    visible={confirmVisible}
                    onClose={handleCancel}
                />

                <div>
                    {/* Botones de acción */}
                    <CRow className="ms-2 me-2 justify-content-center">
                        <CCol md={3} className="text-center">
                            <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3 mb-2" onClick={() => {
                                setConfirmVisible(true);
                            }}>
                                <CalendarPlus className="me-2" />
                                Crear Reserva
                            </CButton>
                        </CCol>

                        <CCol md={3} className="text-center">
                            <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3">
                                <CalendarCog className="me-2" />
                                Asignar Reserva
                            </CButton>
                        </CCol>
                    </CRow>
                </div>


            </CCardBody>
        </CCard>
    )
}

export default Reservas
