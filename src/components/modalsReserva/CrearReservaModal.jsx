/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ConfirmModal } from '../modals/ConfirmModal';
import { LoadingModal } from '../modals/LoadingModal';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton, CForm, CInputGroup, CInputGroupText, CFormSelect, CRow, CCol, CFormInput, CFormLabel } from '@coreui/react'
import { University, HouseWifi, NotebookPen, CalendarDays, Clock3, Clock9, FileText } from 'lucide-react'
import { createReservaSchema } from '../../validations/reservaSchema';
import { useForm, Controller } from 'react-hook-form'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import useAula from '../../hooks/useAula';
import useLaboratorio from '../../hooks/useLaboratorio';
import useReserva from '../../hooks/useReserva';
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
    const { listarReservas } = useReserva()
    const { aulas = [] } = useSelector((state) => state)
    const { laboratorios = [] } = useSelector((state) => state)

    const watchedFields = watch()


    // Limpia el mensaje general cuando cambian inputs
    React.useEffect(() => {
        if (watchedFields) {
            setgeneralMessage('')
        }
    }, [watchedFields])

    // Cargar aulas y laboratorios al abrir el modal
    React.useEffect(() => {
        if (visible) {
            listarAulas();
            listarLaboratorios();
        }
    }, [visible]);

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
    }

    const onSubmitCreateReserva = async (data) => {
        if (!validateForm(data)) return;

        try {
            setIsLoadingMessage('Creando reserva...');
            setIsLoading(true);

            // Intenta crear la reserva
            await axios.post(`${import.meta.env.VITE_API_URL}/reserva/create`, data, { withCredentials: true });
            toast.success('Reserva creada exitosamente');
            listarReservas();
            resetForm();
            onClose(); 
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al crear la reserva');

        } finally {
            setIsLoading(false);
        }
    };

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
                        <CInputGroup className={`${errors.placeType ? 'is-invalid' : ''} mb-3`}>
                            <CInputGroupText
                                className={`${errors.placeType ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <University className={`${errors.placeType}` ? 'text-white' : ''} />
                            </CInputGroupText>
                            <CFormSelect
                                className={`${errors.placeType ? 'border-danger text-danger' : ''
                                    }`}
                                invalid={!!errors.placeType}
                                {...register('placeType')}>
                                <option value="">{`${errors.placeType ? errors.placeType.message : 'Seleccione el tipo de espacio académico'}`}</option>
                                <option value="Aula">Aula</option>
                                <option value="Laboratorio">Laboratorio</option>
                            </CFormSelect>
                        </CInputGroup>
                        { /* Espacio Académico */}
                        <CInputGroup className={`${errors.placeID ? 'is-invalid' : ''} mb-3`}>
                            <CInputGroupText
                                className={`${errors.placeID ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <HouseWifi className={`${errors.placeID ? 'text-white' : ''}`} />
                            </CInputGroupText>

                            <div className="flex-grow-1">
                                <Controller
                                    name="placeID"
                                    control={control}
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
                                                        : watchedFields.placeType === 'Laboratorio'
                                                            ? 'Seleccione un laboratorio'
                                                            : 'Seleccione un espacio académico'
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>
                        </CInputGroup>
                        { /* Propósito */}
                        <CInputGroup className={`${errors.purpose ? 'is-invalid' : ''} mb-3`}>
                            <CInputGroupText
                                className={`${errors.purpose ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <NotebookPen className={`${errors.purpose ? 'text-white' : ''}`} />
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
                        <div className="mb-3">
                            <CFormLabel htmlFor="reservationDate" className="fw-semibold">
                                Fecha de reserva
                            </CFormLabel>
                            <CInputGroup className={`${errors.reservationDate ? 'is-invalid' : ''}`}>
                                <CInputGroupText
                                    className={`${errors.reservationDate ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                    <CalendarDays className={`${errors.reservationDate ? 'text-white' : ''}`} />
                                </CInputGroupText>
                                <CFormInput
                                    id="reservationDate"
                                    type="date"
                                    className={`${errors.reservationDate ? 'border-danger text-danger' : ''}`}
                                    invalid={!!errors.reservationDate}
                                    {...register('reservationDate')}
                                />
                            </CInputGroup>
                        </div>
                        <CRow className="g-2 mb-3">
                            <CCol md={6}>
                                <CFormLabel htmlFor="startTime" className="fw-semibold">
                                    Hora de inicio
                                </CFormLabel>
                                <CInputGroup className={`${errors.startTime ? 'is-invalid' : ''}`}>
                                    <CInputGroupText
                                        className={`${errors.startTime ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                        <Clock3 className={`${errors.startTime ? 'text-white' : ''}`} />
                                    </CInputGroupText>
                                    <CFormInput
                                        id="startTime"
                                        type="time"
                                        className={`${errors.startTime ? 'border-danger text-danger' : ''}`}
                                        invalid={!!errors.startTime}
                                        {...register('startTime')}
                                    />
                                </CInputGroup>
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="endTime" className="fw-semibold subittulos-esfot">
                                    Hora de finalización
                                </CFormLabel>
                                <CInputGroup className={`${errors.endTime ? 'is-invalid' : ''}`}>
                                    <CInputGroupText
                                        className={`${errors.endTime ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                        <Clock9 className={`${errors.endTime ? 'text-white' : ''}`} />
                                    </CInputGroupText>
                                    <CFormInput
                                        id="endTime"
                                        type="time"
                                        className={`${errors.endTime ? 'border-danger text-danger' : ''}`}
                                        invalid={!!errors.endTime}
                                        {...register('endTime')}
                                    />
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        { /* Descripción */}
                        <CInputGroup className={`${errors.description ? 'is-invalid' : ''} mb-3`}>
                            <CInputGroupText
                                className={`${errors.description ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <FileText className={`${errors.description ? 'text-white' : ''}`} />
                            </CInputGroupText>
                            <textarea
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                placeholder={`${errors.description ? errors.description.message : 'Ingrese la descripción de la reserva'}`}
                                rows="3"
                                {...register('description')}
                            ></textarea>
                        </CInputGroup>

                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton onClick={() => { onClose(); resetForm(); toast.dismiss() }}>Cancelar</CButton>
                    <CButton className='btn-esfot' onClick={handleSubmit(confirmCreateReserva)}>Crear Reserva</CButton>
                </CModalFooter>
            </CModal>
        </>
    )

}