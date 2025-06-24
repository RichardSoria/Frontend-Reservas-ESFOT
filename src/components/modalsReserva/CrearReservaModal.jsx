/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ConfirmModal } from '../modals/ConfirmModal';
import { LoadingModal } from '../modals/LoadingModal';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton, CForm, CInputGroup, CInputGroupText, CFormSelect, CRow, CCol } from '@coreui/react'
import { Mail, LockKeyhole, User, Eye, EyeOff } from 'lucide-react'
import { createReservaSchema } from '../../validations/reservaSchema';
import { useForm, Controller } from 'react-hook-form'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import useAula from '../../hooks/useAula';
import useLaboratorio from '../../hooks/useLaboratorio';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import Select from 'react-select'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)
const validate = ajv.compile(createReservaSchema)

export const CrearReservaModal = ({ visible, onClose }) => {

    const reservaDefaultValues = {
        placeType: '',
        placeID: '',
        purpose: '',
        reservationDate: '',
        startTime: '',
        endTime: '',
        description: '',
    }

    const {
        register,
        control,
        handleSubmit,
        setError,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: reservaDefaultValues
    })

    // Estado para el modal de confirmación
    const [confirmVisible, setConfirmVisible] = React.useState(false);
    const [pendingAction, setPendingAction] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoadingMessage, setIsLoadingMessage] = React.useState('');
    const [generalMessage, setgeneralMessage] = React.useState('')

    // Hooks para obtener datos de aulas y laboratorios
    const { listarAulas } = useAula()
    const { listarLaboratorios } = useLaboratorio()
    const { aulas = [] } = useSelector((state) => state)
    const { laboratorios = [] } = useSelector((state) => state)

    const watchedFields = watch()


    // Limpia el mensaje general cuando cambian inputs
    React.useEffect(() => {
        if (watchedFields) {
            setgeneralMessage('')
        }
        console.log('watchedFields', watchedFields)
    }, [watchedFields])

    // Cargar aulas y laboratorios al abrir el modal
    React.useEffect(() => {
        listarAulas()
        listarLaboratorios()
    }, [])

    // Mostrar errores con toast cuando cambian
    React.useEffect(() => {
        // Mostrar errores específicos de campos
        Object.values(errors).forEach((err) => {
            toast.error(err.message, { autoClose: 4000 })
        })
    }, [errors])

    // Mostrar mensaje general con toast cuando cambia
    React.useEffect(() => {
        if (generalMessage) {
            toast.error(generalMessage, {
                autoClose: 5000,
                onClose: () => setgeneralMessage(''),
            })
        }
    }, [generalMessage])

    const validateForm = (data) => {
        const valid = validate(data)
        if (!valid) {
            validate.errors.forEach(err => {
                const field = err.instancePath.replace('/', '')
                setError(field, { type: 'manual', message: err.message })
            })
            return false
        }
        return true
    }

    const resetForm = () => {
        reset(reservaDefaultValues)
    }


    const showConfirm = (action) => {
        if (pendingAction) pendingAction()
        setPendingAction(() => action)
        setConfirmVisible(true)
    }

    const handleConfirm = () => {
        if (pendingAction) pendingAction()
        setConfirmVisible(false)
        setPendingAction(null)
    };

    const handleCancel = () => {
        setConfirmVisible(false)
        setPendingAction(null)
        resetForm()
    }

    const onSubmitCreateReserva = async (data) => {
        if (!validateForm(data)) {
            return
        }
        resetForm()
    }

    // Función para confirmar la creación de la reserva
    const confirmCreateReserva = (data) => {
        if (!validateForm(data)) {
            return
        }
        showConfirm(() => onSubmitCreateReserva(data))
    }

    return (
        <>
            {/* Modal de confirmación */}
            <ConfirmModal
                visible={confirmVisible}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                title={'Confirmar creación de reserva'}
                message={'¿Estás seguro de que deseas crear esta reserva? Esta acción no se puede deshacer.'}
            />

            {/* Modal de carga */}
            <LoadingModal
                visible={isLoading}
                message={isLoadingMessage}
            />

            <CModal backdrop="static" visible={visible} onClose={onClose} alignment='center'>
                <CModalHeader>
                    <CModalTitle className='textos-esfot'> Crear Reserva </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        { /* Tipo de Espacio Académico */}
                        <CInputGroup className={`${errors.placeType ? 'is-invalid' : ''} mb-2`}>
                            <CInputGroupText
                                className={`${errors.placeType ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <User className={`${errors.placeType}` ? 'text-white' : ''} />
                            </CInputGroupText>
                            <CFormSelect
                                className={`${errors.placeType ? 'border-danger text-danger' : ''
                                    }`}
                                invalid={!!errors.placeType}
                                {...register('placeType')}>
                                <option value="">{`${errors.placeType ? errors.placeType.message : 'Seleccione un espacio académico'}`}</option>
                                <option value="Aula">Aula</option>
                                <option value="Laboratorio">Laboratorio</option>
                            </CFormSelect>
                        </CInputGroup>
                        { /* Espacio Académico */}
                        <CInputGroup className={`${errors.placeID ? 'is-invalid' : ''} mb-2`}>
                            <CInputGroupText
                                className={`${errors.placeID ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <Mail className={`${errors.placeID ? 'text-white' : ''}`} />
                            </CInputGroupText>

                            <div className="flex-grow-1">
                                <Controller
                                    name="placeID"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => {
                                        const selectedOptions =
                                            watchedFields.placeType === 'Aula'
                                                ? aulas.map(a => ({ value: a._id, label: a.name }))
                                                : watchedFields.placeType === 'Laboratorio'
                                                    ? laboratorios.map(l => ({ value: l._id, label: l.name }))
                                                    : [];

                                        const selectedValue = selectedOptions.find(option => option.value === field.value) || null;

                                        return (
                                            <Select
                                                value={selectedValue}
                                                onChange={(option) => field.onChange(option?.value || '')}
                                                options={selectedOptions}
                                                isClearable
                                                classNamePrefix="react-select"
                                                menuPosition="fixed"
                                                menuPortalTarget={document.body}
                                                styles={{
                                                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                                                }}
                                                noOptionsMessage={() => 'No se han encontrado coincidencias'}
                                                className={`react-select-container ${errors.placeID ? 'is-invalid-select' : ''}`}
                                                placeholder={
                                                    watchedFields.placeType === 'Aula'
                                                        ? 'Seleccione un aula'
                                                        : 'Seleccione un laboratorio'
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>
                        </CInputGroup>
                        { /* Propósito */}
                        <CInputGroup className={`${errors.purpose ? 'is-invalid' : ''} mb-2`}>
                            <CInputGroupText
                                className={`${errors.purpose ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <LockKeyhole className={`${errors.purpose ? 'text-white' : ''}`} />
                            </CInputGroupText>
                            <CFormSelect
                                className={`${errors.purpose ? 'border-danger text-danger' : ''}`}
                                invalid={!!errors.purpose}
                                {...register('purpose')}>
                                <option value="">{`${errors.purpose ? errors.purpose.message : 'Seleccione un propósito'}`}</option>
                                <option value="Clase">Clase</option>
                                <option value="Prueba/Examen">Prueba/Examen</option>
                                <option value="Proyecto">Proyecto</option>
                                <option value="Evento/Capacitación">Evento/Capacitación</option>
                                <option value="Otro">Otro</option>
                            </CFormSelect>
                        </CInputGroup>
                        { /* Fecha de Reserva */}
                        <CInputGroup className={`${errors.reservationDate ? 'is-invalid' : ''} mb-2`}>
                            <CInputGroupText
                                className={`${errors.reservationDate ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <Eye className={`${errors.reservationDate ? 'text-white' : ''}`} />
                            </CInputGroupText>
                            <CFormSelect
                                className={`${errors.reservationDate ? 'border-danger text-danger' : ''}`}
                                invalid={!!errors.reservationDate}
                                {...register('reservationDate')}>
                                <option value="">{`${errors.reservationDate ? errors.reservationDate.message : 'Seleccione una fecha'}`}</option>
                                {Array.from({ length: 30 }, (_, i) => {
                                    const date = new Date();
                                    date.setDate(date.getDate() + i);
                                    const formattedDate = date.toISOString().split('T')[0];
                                    return (
                                        <option key={i} value={formattedDate}>
                                            {date.toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </option>
                                    );
                                })}
                            </CFormSelect>
                        </CInputGroup>
                        <CRow>
                            <CCol xs={6}>
                                { /* Hora de Inicio */}
                                <CInputGroup className={`${errors.startTime ? 'is-invalid' : ''} mb-2`}>
                                    <CInputGroupText
                                        className={`${errors.startTime ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                        <EyeOff className={`${errors.startTime ? 'text-white' : ''}`} />
                                    </CInputGroupText>
                                    <CFormSelect
                                        className={`${errors.startTime ? 'border-danger text-danger' : ''}`}
                                        invalid={!!errors.startTime}
                                        {...register('startTime')}>
                                        <option value="">{`${errors.startTime ? errors.startTime.message : 'Seleccione una hora de inicio'}`}</option>
                                        {Array.from({ length: 13 }, (_, i) => {
                                            const hour = (i + 7).toString().padStart(2, '0');
                                            return (
                                                <option key={i} value={`${hour}:00`}>
                                                    {`${hour}:00`}
                                                </option>
                                            );
                                        })}
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol xs={6}>
                                { /* Hora de Fin */}
                                <CInputGroup className={`${errors.endTime ? 'is-invalid' : ''} mb-2`}>
                                    <CInputGroupText
                                        className={`${errors.endTime ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                        <EyeOff className={`${errors.endTime ? 'text-white' : ''}`} />
                                    </CInputGroupText>
                                    <CFormSelect
                                        className={`${errors.endTime ? 'border-danger text-danger' : ''}`}
                                        invalid={!!errors.endTime}
                                        {...register('endTime')}>
                                        <option value="">{`${errors.endTime ? errors.endTime.message : 'Seleccione una hora de fin'}`}</option>
                                        {Array.from({ length: 13 }, (_, i) => {
                                            const hour = (i + 8).toString().padStart(2, '0');
                                            return (
                                                <option key={i} value={`${hour}:00`}>
                                                    {`${hour}:00`}
                                                </option>
                                            );
                                        })}
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        { /* Descripción */}
                        <CInputGroup className={`${errors.description ? 'is-invalid' : ''} mb-2`}>
                            <CInputGroupText
                                className={`${errors.description ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <Eye className={`${errors.description ? 'text-white' : ''}`} />
                            </CInputGroupText>
                            <textarea
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                rows="3"
                                {...register('description')}
                                placeholder={`${errors.description ? errors.description.message : 'Ingrese una descripción (opcional)'}`}
                            ></textarea>
                        </CInputGroup>

                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={() => { onClose(); resetForm(); }}>Cancelar</CButton>
                    <CButton className='btn-esfot' onClick={handleSubmit(confirmCreateReserva)}>Crear Reserva</CButton>
                </CModalFooter>
            </CModal>
        </>
    )

}