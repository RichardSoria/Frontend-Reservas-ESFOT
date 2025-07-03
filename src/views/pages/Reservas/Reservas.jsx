import React from 'react'
import CalendarioReservas from '../../../components/reserva/CalendarioReserva'
import { CCard, CCardBody, CRow, CCol, CButton } from '@coreui/react'
import { CalendarPlus, CalendarCog } from 'lucide-react';
import { CrearReservaModal } from '../../../components/modalsReserva/CrearReservaModal';
import { AsignarReservaModal } from '../../../components/modalsReserva/AsignarReservaModal';
import { toast } from 'react-toastify';
const Reservas = () => {

    // Estado para el modal de confirmación
    const [confirmVisibleCreateModal, setConfirmVisibleCreateModal] = React.useState(false);
    const [confirmVisibleAssignModal, setConfirmVisibleAssignModal] = React.useState(false);


    // Función para manejar la cancelación
    const handleCancel = () => {
        setConfirmVisibleCreateModal(false);
        setConfirmVisibleAssignModal(false);
        toast.dismiss();
    };

    // Función para abrir el modal de creación de reserva
    const handleCreateReserva = () => {
        setConfirmVisibleCreateModal(true);
    };

    // Función para abrir el modal de asignación de reserva
    const handleAsignarReserva = () => {
        setConfirmVisibleAssignModal(true);
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
                    visible={confirmVisibleCreateModal}
                    onClose={handleCancel}
                />

                { /* Modal de asignación de reserva */}
                <AsignarReservaModal
                    visible={confirmVisibleAssignModal}
                    onClose={handleCancel}
                />

                <div>
                    {/* Botones de acción */}
                    <CRow className="ms-2 me-2 justify-content-center">
                        <CCol md={3} className="text-center">
                            <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3 mb-2" onClick={handleCreateReserva}>
                                <CalendarPlus className="me-2" />
                                Crear Reserva
                            </CButton>
                        </CCol>

                        <CCol md={3} className="text-center">
                            <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3 mb-2" onClick={handleAsignarReserva}>
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
