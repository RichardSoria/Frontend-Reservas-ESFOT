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

    const {
        register,
        control,
        handleSubmit,
        setError,
        reset,
        watch,
        formState: { errors },
    } = useForm()

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

    const reservaDefaultValues = {
        placeType: '',
        placeID: '',
        reservationDate: '',
        startTime: '',
        endTime: '',
        purpose: '',
        description: '',
    }

    // Limpia el mensaje general cuando cambian inputs
    React.useEffect(() => {
        if (watchedFields) {
            setgeneralMessage('')
        }
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
                                <option value="">{`${errors.placeType ? errors.placeType.message : 'Selecciona un espacio académico'}`}</option>
                                <option value="aula">Aula</option>
                                <option value="laboratorio">Laboratorio</option>
                            </CFormSelect>
                        </CInputGroup>

                        <CInputGroup className={`${errors.placeID ? 'is-invalid' : ''} mb-2`}>
                            <CInputGroupText
                                className={`${errors.placeID ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                <Mail className={`${errors.placeID ? 'text-white' : ''}`} />
                            </CInputGroupText>

                            <div className="flex-grow-1">
                                <Controller
                                    name="placeID"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            classNamePrefix="react-select"
                                            className={`react-select-container ${errors.placeID ? 'is-invalid-select' : ''}`}
                                            placeholder={
                                                watchedFields.placeType
                                                    ? watchedFields.placeType === 'aula'
                                                        ? 'Selecciona un aula'
                                                        : 'Selecciona un laboratorio'
                                                    : 'Selecciona el tipo de espacio'
                                            }
                                            isClearable
                                            options={
                                                watchedFields.placeType === 'aula'
                                                    ? aulas.map(a => ({ value: a._id, label: a.name }))
                                                    : watchedFields.placeType === 'laboratorio'
                                                        ? laboratorios.map(l => ({ value: l._id, label: l.name }))
                                                        : []
                                            }
                                        />
                                    )}
                                />
                            </div>
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