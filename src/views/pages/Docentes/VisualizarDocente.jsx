/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import useDocente from '../../../hooks/useDocente'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
    CBadge,
    CButton,
} from '@coreui/react'
import clsx from 'clsx'
import { set } from '../../../store'
import { ArrowBigLeft } from 'lucide-react';

const VisualizarDocente = () => {
    const dispatch = useDispatch()
    const { consultDocente } = useDocente()
    const { userConsult } = useSelector((state) => state)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        consultDocente(id)
    }, [])
    


    if (!userConsult) return null

    const formatFecha = (fecha) => {
        return fecha
            ? new Date(fecha).toLocaleString('es-EC', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).replace(',', '')
            : 'Sin registro'
    }


    return (
        <CCard className="shadow-sm border-0">
            <CCardBody>
                {/* Título */}
                <div className="mb-3 ms-3 me-3">
                    <h1 className="text-4xl textos-esfot ">Visualizar Docente</h1>
                    <hr />
                    <CRow className="align-items-center">
                        <CCol md={9} className="mt-2">
                            <p className="text-muted">
                                Este módulo permite visualizar a detalle los datos del Docente seleccionado.
                            </p>
                        </CCol>
                        <CCol md={3} className={clsx('text-md-end', 'text-center')}>
                            <CButton
                                className="btn-esfot-form "
                                onClick={() => {
                                    navigate('/admin/docentes');
                                    dispatch(set({ userConsult: null }));
                                }}
                            >
                                <ArrowBigLeft className="me-2" />
                                Volver a Docentes
                            </CButton>
                        </CCol>
                    </CRow>
                </div>

                <CRow className="ms-3 me-3">
                    {/* Datos personales */}
                    <CCol md={3}>
                        <h5 className="subtitulos-esfot mb-3">Datos Personales</h5>
                        <p><strong>Nombre:</strong> {userConsult.name}</p>
                        <p><strong>Apellido:</strong> {userConsult.lastName}</p>
                        <p><strong>Cédula:</strong> {userConsult.cedula}</p>
                        <p><strong>Correo:</strong> {userConsult.email}</p>
                        <p><strong>Teléfono:</strong> {userConsult.phone}</p>
                        <p><strong>Carrera:</strong> {userConsult.career}</p>
                        <p><strong>Facultad:</strong> {userConsult.otherFaculty ? userConsult.otherFaculty : 'ESFOT'}</p>
                    </CCol>

                    {/* Cuenta */}
                    <CCol md={3}>
                        <h5 className="subtitulos-esfot mb-3">Información de Cuenta</h5>
                        <p>
                            <strong>Estado:</strong>{' '}
                            <CBadge color={userConsult.status ? 'success' : 'danger'}>
                                {userConsult.status ? 'Habilitado' : 'Deshabilitado'}
                            </CBadge>
                        </p>
                        <p><strong>Rol:</strong> {userConsult.rol ? 'Docente' : ''}</p>
                        <p><strong>Último Acceso:</strong> {formatFecha(userConsult.lastLogin)}</p>
                        <p><strong>Intentos fallidos:</strong> {userConsult.loginAttempts ?? 0}</p>
                        <p><strong>Fecha de bloqueo:</strong> {formatFecha(userConsult.blockedDate)}</p>
                    </CCol>

                    {/* Fechas */}
                    <CCol md={3}>
                        <h5 className="subtitulos-esfot mb-3">Fechas de Registro</h5>
                        <p><strong>Creación:</strong> {formatFecha(userConsult.createdDate)}</p>
                        <p><strong>Actualización:</strong> {formatFecha(userConsult.updatedDate)}</p>
                        <p><strong>Habilitación:</strong> {formatFecha(userConsult.enableDate)}</p>
                        <p><strong>Deshabilitación:</strong> {formatFecha(userConsult.disableDate)}</p>
                    </CCol>

                    {/* Responsables */}
                    <CCol md={3}>
                        <h5 className="subtitulos-esfot mb-3">Responsables</h5>
                        <p><strong>Creado por:</strong> {userConsult.createFor ? `${userConsult.createFor.name} ${userConsult.createFor.lastName}` : 'Sin registro'}</p>
                        <p><strong>Actualizado por:</strong> {userConsult.updateFor ? `${userConsult.updateFor.name} ${userConsult.updateFor.lastName}` : 'Sin registro'}</p>
                        <p><strong>Habilitado por:</strong> {userConsult.enableFor ? `${userConsult.enableFor.name} ${userConsult.enableFor.lastName}` : 'Sin registro'}</p>
                        <p><strong>Deshabilitado por:</strong> {userConsult.disableFor ? `${userConsult.disableFor.name} ${userConsult.disableFor.lastName}` : 'Sin registro'}</p>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard >
    )
}

export default VisualizarDocente
