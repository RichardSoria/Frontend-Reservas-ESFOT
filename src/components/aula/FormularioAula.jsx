/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import { useForm } from 'react-hook-form'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { set } from '../../store'
import { limpiarSeleccionados } from '../../store'
import { aulaSchema } from '../../validations/aulaSchema'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CFormSelect } from '@coreui/react'
import {
    Presentation,
    Barcode,
    Ratio,
    ChartNoAxesColumnIncreasing,
    FileType,
    UserPlus,
    UserRoundPen,
    UserCheck,
    UserX,
    Eraser,
} from 'lucide-react'
import useAula from '../../hooks/useAula'
import { ConfirmModal } from '../modals/ConfirmModal'
import { LoadingModal } from '../modals/LoadingModal'


const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)
const validate = ajv.compile(aulaSchema)


const FormularioAula = () => {

    // Hooks y estados

    const dispatch = useDispatch()
    const { aulaSeleccionado } = useSelector(state => state)
    const { listarAulas } = useAula()
    const [confirmVisible, setConfirmVisible] = React.useState(false)
    const [pendingAction, setPendingAction] = React.useState(null)
    const [operation, setOperation] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLoadingMessage, setIsLoadingMessage] = React.useState('Cargando...')


    // Configuración del formulario

    const {
        register, handleSubmit, setError, reset, setValue, watch,
        formState: { errors }
    } = useForm()

    const fullNameForm = `${watch('name') || ''} ${watch('codigo') || ''}`.trim()
    const fullNameAula = `${aulaSeleccionado?.name || ''} ${aulaSeleccionado?.codigo || ''}`.trim()

    const defaultAulaValues = {
        name: '',
        codigo: '',
        description: '',
        capacity: '',
        size: ''
    }

    // Validación de errores

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

    // Función para limpiar el formulario

    React.useEffect(() => {
        dispatch(limpiarSeleccionados())
    }, [])

    // Cargar datos del administrador seleccionado al formulario

    React.useEffect(() => {
        if (aulaSeleccionado) {
            const { name, codigo, description, capacity, size } = aulaSeleccionado
            reset({ name, codigo, description, capacity: capacity != null ? String(capacity) : '', size })
        } else {
            reset(defaultAulaValues)
        }
    }, [aulaSeleccionado, reset])

    // Mostrar errores de validación

    React.useEffect(() => {
        Object.entries(errors).forEach(([field, error]) => {
            toast.error(error.message, { autoClose: 4000 })
        })
    }, [errors])

    // Funciones de confirmación

    const showConfirm = (operation, action) => {
        setOperation(operation)
        setPendingAction(() => action)
        setConfirmVisible(true)
    }

    const handleConfirm = () => {
        if (pendingAction) pendingAction()
        setConfirmVisible(false)
        setPendingAction(null)
    }

    const handleCancel = () => {
        setConfirmVisible(false)
        setPendingAction(null)
    }

    // Funciones de envío

    const onSubmitRegister = async (data) => {
        if (!validateForm(data)) {
            return
        }

        try {
            setIsLoadingMessage('Creando aula...')
            setIsLoading(true)
            await axios.post(`${import.meta.env.VITE_API_URL}/aula/create`, data, { withCredentials: true })
            await listarAulas()
            toast.success('Aula registrado con éxito!')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al registrar aula', { autoClose: 5000 })
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmitUpdate = async (data) => {
        if (!aulaSeleccionado) {
            toast.error('Debe seleccionar un aula para actualizar', { autoClose: 4000 })
            return
        }
        if (!validateForm(data)) {
            return
        }

        try {
            setIsLoadingMessage('Actualizando aula...')
            setIsLoading(true)
            await axios.put(`${import.meta.env.VITE_API_URL}/aula/update/${aulaSeleccionado._id}`, data, { withCredentials: true })
            await listarAulas()
            toast.success('Aula actualizado con éxito!')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al actualizar Aula', { autoClose: 5000 })
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmitEnable = async () => {
        if (!aulaSeleccionado) {
            toast.error('Debe seleccionar un aula para habilitar', { autoClose: 4000 })
            return
        }
        if (aulaSeleccionado.status) {
            toast.error('El aula ya está habilitado', { autoClose: 4000 })
            return
        }
        try {
            setIsLoadingMessage('Habilitando aula...')
            setIsLoading(true)
            await axios.put(`${import.meta.env.VITE_API_URL}/aula/enable/${aulaSeleccionado._id}`, {}, { withCredentials: true })
            await listarAulas()
            toast.success('Aula habilitado con éxito!')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al habilitar aula', { autoClose: 5000 })
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmitDisable = async () => {
        if (!aulaSeleccionado) {
            toast.error('Debe seleccionar un aula para deshabilitar', { autoClose: 4000 })
            return
        }
        if (!aulaSeleccionado.status) {
            toast.error('El aula ya está deshabilitado', { autoClose: 4000 })
            return
        }
        try {
            setIsLoadingMessage('Deshabilitando aula...')
            setIsLoading(true)
            await axios.put(`${import.meta.env.VITE_API_URL}/aula/disable/${aulaSeleccionado._id}`, {}, { withCredentials: true })
            await listarAulas()
            toast.success('Aula deshabilitado con éxito!')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al deshabilitar aula', { autoClose: 5000 })
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        reset(defaultAulaValues)
        dispatch(set({ aulaSeleccionado: null }))
    }

    // Texto del modal de confirmación

    const getModalText = () => {
        switch (operation) {
            case 'create':
                return {
                    title: 'Registrar Aula',
                    message: `¿Deseas registrar al nuevo aula ${fullNameForm}?`
                };
            case 'update':
                return {
                    title: 'Actualizar Aula',
                    message: `¿Deseas actualizar la información del aula ${fullNameAula}?`
                };
            case 'enable':
                return {
                    title: 'Habilitar Aula',
                    message: `¿Deseas habilitar al aula ${fullNameAula}?`
                };
            case 'disable':
                return {
                    title: 'Deshabilitar Aula',
                    message: `¿Deseas deshabilitar al aula ${fullNameAula}?`
                };
            default:
                return {
                    title: 'Confirmar Acción',
                    message: '¿Estás seguro de realizar esta acción?'
                };
        }
    };

    const { title, message } = getModalText()

    // Funciones de confirmación

    const confirmRegister = (data) => {
        if (!validateForm(data)) {
            return
        }
        showConfirm('create', () => onSubmitRegister(data))
    }

    const confirmUpdate = (data) => {
        if (!aulaSeleccionado) {
            toast.error('Debe seleccionar un aula para actualizar', { autoClose: 4000 })
            return
        }
        if (!validateForm(data)) {
            return
        }
        showConfirm('update', () => onSubmitUpdate(data))
    }

    const confirmEnable = () => {
        if (!aulaSeleccionado) {
            toast.error('Debe seleccionar un aula para habilitar', { autoClose: 4000 })
            return
        }
        if (aulaSeleccionado.status) {
            toast.error('El aula ya está habilitado', { autoClose: 4000 })
            return
        }
        showConfirm('enable', onSubmitEnable)
    }
    const confirmDisable = () => {
        if (!aulaSeleccionado) {
            toast.error('Debe seleccionar un aula para deshabilitar', { autoClose: 4000 })
            return
        }
        if (!aulaSeleccionado.status) {
            toast.error('El aula ya está deshabilitado', { autoClose: 4000 })
            return
        }
        showConfirm('disable', onSubmitDisable)
    }

    return (
        <>
            <CContainer className="mb-3">
                <CRow className="justify-content-center">
                    <CCol>
                        <CCard className="border-0 shadow-sm">
                            <CCardBody>
                                <CForm className="row g-3">
                                    {/* Nombre */}
                                    <CCol md={3}>
                                        <CInputGroup className={`${errors.name ? 'is-invalid' : ''}`}>
                                            <CInputGroupText className={`${errors.name ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                                <Presentation className={`${errors.name ? 'text-white' : ''}`} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder={errors.name ? errors.name.message : "Nombre"}
                                                className={`${errors.name ? 'border-danger text-danger' : ''}`}
                                                invalid={!!errors.name}
                                                {...register('name')}
                                            />
                                        </CInputGroup>
                                    </CCol>

                                    {/* Código */}
                                    <CCol md={3}>
                                        <CInputGroup className={`${errors.codigo ? 'is-invalid' : ''}`}>
                                            <CInputGroupText className={`${errors.codigo ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                                <Barcode className={`${errors.codigo ? 'text-white' : ''}`} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder={errors.codigo ? errors.codigo.message : "Código"}
                                                className={`${errors.codigo ? 'border-danger text-danger' : ''}`}
                                                invalid={!!errors.codigo}
                                                {...register('codigo')}
                                            />
                                        </CInputGroup>
                                    </CCol>


                                    {/* Capacidad */}
                                    <CCol md={3}>
                                        <CInputGroup className={`${errors.capacity ? 'is-invalid' : ''}`}>
                                            <CInputGroupText className={`${errors.capacity ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                                <Ratio className={`${errors.capacity ? 'text-white' : ''}`} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type='text'
                                                placeholder={errors.capacity ? errors.capacity.message : "Capacidad"}
                                                className={`${errors.capacity ? 'border-danger text-danger' : ''}`}
                                                invalid={!!errors.capacity}
                                                {...register('capacity')}
                                            />
                                        </CInputGroup>
                                    </CCol>

                                    {/* Tamaño */}
                                    <CCol md={3}>
                                        <CInputGroup className={`${errors.size ? 'is-invalid' : ''}`}>
                                            <CInputGroupText className={`${errors.size ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                                <ChartNoAxesColumnIncreasing className={`${errors.size ? 'text-white' : ''}`} />
                                            </CInputGroupText>
                                            <CFormSelect
                                                className={`${errors.size ? 'border-danger text-danger' : ''}`}
                                                invalid={!!errors.size}
                                                {...register('size')}
                                            >
                                                <option value="">{`${errors.size ? errors.size.message : 'Seleccione el tamaño'}`}</option>
                                                <option value="Pequeño">Pequeño</option>
                                                <option value="Mediano">Mediano</option>
                                                <option value="Grande">Grande</option>
                                            </CFormSelect>
                                        </CInputGroup>
                                    </CCol>

                                    {/* Descripción */}
                                    <CCol md={12}>
                                        <CInputGroup className={`${errors.description ? 'is-invalid' : ''}`}>
                                            <CInputGroupText className={`${errors.description ? 'border-danger bg-danger' : 'text-white bg-esfot'}`}>
                                                <FileType className={`${errors.description ? 'text-white' : ''}`} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder={errors.description ? errors.description.message : "Descripción"}
                                                className={`${errors.description ? 'border-danger text-danger' : ''}`}
                                                invalid={!!errors.description}
                                                {...register('description')}
                                            />
                                        </CInputGroup>
                                    </CCol>

                                    {/* Modal de confirmación */}
                                    <ConfirmModal
                                        visible={confirmVisible}
                                        onClose={handleCancel}
                                        onConfirm={handleConfirm}
                                        title={title}
                                        message={message}
                                    />

                                    {/* Modal de carga */}
                                    <LoadingModal
                                        visible={isLoading}
                                        message={isLoadingMessage}
                                    />

                                    {/* Botones */}
                                    <CCol className="d-flex flex-wrap justify-content-between gap-1 mt-3">
                                        <div className="flex-fill text-center">
                                            <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={handleSubmit(confirmRegister)} >
                                                <UserPlus className="me-2" />
                                                Crear Aula
                                            </CButton>
                                        </div>

                                        <div className="flex-fill text-center">
                                            <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={handleSubmit(confirmUpdate)}>
                                                <UserRoundPen className="me-2" />
                                                Actualizar Aula
                                            </CButton>
                                        </div>

                                        <div className="flex-fill text-center">
                                            <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={confirmEnable} >
                                                <UserCheck className="me-2" />
                                                Habilitar Aula
                                            </CButton>
                                        </div>

                                        <div className="flex-fill text-center">
                                            <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={confirmDisable}>
                                                <UserX className="me-2" />
                                                Deshabilitar Aula
                                            </CButton>
                                        </div>

                                        <div className="flex-fill text-center">
                                            <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={resetForm}>
                                                <Eraser className="me-2" />
                                                Limpiar Formulario
                                            </CButton>
                                        </div>
                                    </CCol>

                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </>
    )
}

export default FormularioAula