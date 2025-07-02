/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import useReserva from '../../hooks/useReserva';
import { useSelector } from 'react-redux';
import { CModal } from '@coreui/react';
import { CModalHeader, CModalTitle, CModalBody, CRow, CCol, CButton, CModalFooter, CFormTextarea } from '@coreui/react';
import { toast } from 'react-toastify';



export const VerReservaModal = ({ id, visible, onClose }) => {
    const { elementConsult } = useSelector((state) => state)
    const { consultReserva } = useReserva();
    const [reason, setRazon] = useState('');

    useEffect(() => {
        if (!visible || !id) return;

        const fetchData = async () => {
            const result = await consultReserva(id);
            if (!result) {
                onClose();
            }
        };
        fetchData();
    }, [id, visible]);

    if (!elementConsult) return null;


    return (
        <CModal backdrop="static" visible={visible} onClose={onClose} alignment='center'>
            <CModalHeader>
                <CModalTitle className='textos-esfot'> Ver Reserva </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    {/* Información de la reserva */}
                    <CCol md={6}>
                        <h5 className="subtitulos-esfot mb-3">Datos de la Reserva</h5>
                        <p><strong>Solicitante:</strong> {elementConsult?.solicitante}</p>
                        <p><strong>Rol:</strong> {elementConsult?.userRol === 'Admin' ? 'Administrador' : elementConsult?.userRol}</p>
                        <p><strong>Tipo de espacio:</strong> {elementConsult?.placeType}</p>
                        <p><strong>Nombre del espacio:</strong> {elementConsult?.lugarNombre}</p>
                        <p><strong>Propósito:</strong> {elementConsult?.purpose}</p>
                        <p><strong>Descripción:</strong> {elementConsult?.description}</p>
                        <p><strong>Fecha:</strong> {new Date(elementConsult?.reservationDate).toLocaleDateString('es-EC')}</p>
                        <p><strong>Horario:</strong> {elementConsult?.startTime} - {elementConsult?.endTime}</p>
                        <p>
                            <strong>Estado:</strong>{' '}
                            <span
                                style={{
                                    backgroundColor:
                                        elementConsult?.status === 'Aprobada' ? '#198754' :
                                            elementConsult?.status === 'Pendiente' ? '#ffc008' :
                                                elementConsult?.status === 'Rechazada' ? '#7b2626' :
                                                    elementConsult?.status === 'Cancelada' ? '#6c757d' : '#adb5bd',
                                    color:
                                        elementConsult?.status === 'Pendiente' ? 'black' : 'white',
                                    padding: '3px 12px',
                                    borderRadius: '12px',
                                    fontWeight: '500',
                                    fontSize: '0.9rem',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                }}
                            >
                                {elementConsult?.status}
                            </span>
                        </p>
                        {elementConsult?.rejectReason && (
                            <p><strong>Motivo de rechazo:</strong> {elementConsult?.rejectReason}</p>
                        )}
                    </CCol>

                    {/* Información del responsable */}
                    <CCol md={6}>
                        <h5 className="subtitulos-esfot mb-3">Información de Autorización</h5>
                        <p><strong>Autorizado por:</strong> {elementConsult?.autorizadoPor ?? 'Sin registro'}</p>
                        <p><strong>Fecha de autorización:</strong> {elementConsult?.authorizationDate
                            ? new Date(elementConsult?.authorizationDate).toLocaleString('es-EC')
                            : 'Sin registro'}
                        </p>

                        <p>
                            <strong>Registrada el:</strong> {new Date(elementConsult?.createdDate).toLocaleString('es-EC')}
                        </p>
                        <hr />

                        <CFormTextarea
                            id="razonRechazo"
                            placeholder="Ingrese el motivo de aprobación o rechazo de la reserva"
                            rows={6}
                            value={reason}
                            onChange={(e) => setRazon(e.target.value)}
                            className="mb-3"
                        />
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton onClick={() => { onClose(); toast.dismiss() }}>Cancelar</CButton>
            </CModalFooter>
        </CModal>
    );
}