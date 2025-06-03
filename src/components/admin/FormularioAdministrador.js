
import React from 'react'
import { useForm } from 'react-hook-form'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { set } from '../../store'
import { adminSchema } from '../../validations/adminSchema'
import {
    CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow,
} from '@coreui/react'
import { CiUser } from 'react-icons/ci'
import {
    UserPlus,
    Pencil,
    UserCheck,
    UserX,
    Eraser,
} from 'lucide-react'
import { MdEmail, MdPhoneAndroid, MdFingerprint } from 'react-icons/md'
import useAdministradores from '../../hooks/useAdministradores'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)
const validate = ajv.compile(adminSchema)


const FormularioAdministrador = () => {
    const dispatch = useDispatch()
    const { administradorSeleccionado } = useSelector(state => state)
    const { listarAdministradores } = useAdministradores()

    const {
        register, handleSubmit, setError, reset,
        formState: { errors }
    } = useForm()

    React.useEffect(() => {
        if (administradorSeleccionado) {
            const { name, lastName, email, cedula, phone } = administradorSeleccionado
            reset({ name, lastName, email, cedula, phone })
        } else {
            reset({
                name: '',
                lastName: '',
                email: '',
                cedula: '',
                phone: ''
            })
        }
    }, [administradorSeleccionado, reset])


    React.useEffect(() => {
        Object.entries(errors).forEach(([field, error]) => {
            toast.error(error.message, { autoClose: 4000 })
        })
    }, [errors])

    const onSubmitRegister = async (data) => {
        const valid = validate(data)
        if (!valid) {
            validate.errors.forEach(err => {
                const field = err.instancePath.replace('/', '')
                setError(field, { type: 'manual', message: err.message })
            })
            return
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/admin/register`, data, { withCredentials: true })
            await listarAdministradores()
            toast.success('¡Administrador registrado con éxito!')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al registrar administrador', { autoClose: 5000 })
        }
    }

    const onSubmitUpdate = async (data) => {
        const valid = validate(data)
        if (!valid) {
            validate.errors.forEach(err => {
                const field = err.instancePath.replace('/', '')
                setError(field, { type: 'manual', message: err.message })
            })
            return
        }
        try {
            if (!administradorSeleccionado) {
                toast.error('Debe seleccionar un administrador para actualizar', { autoClose: 4000 })
                return
            }
            await axios.put(`${import.meta.env.VITE_API_URL}/admin/update/${administradorSeleccionado._id}`, data, { withCredentials: true })
            await listarAdministradores()
            toast.success('¡Administrador actualizado con éxito!')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al actualizar administrador', { autoClose: 5000 })
        }
    }

    const onSubmitEnable = async () => {
        if (!administradorSeleccionado) {
            toast.error('Debe seleccionar un administrador para habilitar', { autoClose: 4000 })
            return
        }
        if (administradorSeleccionado.status) {
            toast.error('El administrador ya está habilitado', { autoClose: 4000 })
            return
        }
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/admin/enable/${administradorSeleccionado._id}`, {}, { withCredentials: true })
            await listarAdministradores()
            toast.success('¡Administrador habilitado con éxito!')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al habilitar administrador', { autoClose: 5000 })
        }
    }

    const onSubmitDisable = async () => {
        if (!administradorSeleccionado) {
            toast.error('Debe seleccionar un administrador para deshabilitar', { autoClose: 4000 })
            return
        }
        if (!administradorSeleccionado.status) {
            toast.error('El administrador ya está deshabilitado', { autoClose: 4000 })
            return
        }
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/admin/disable/${administradorSeleccionado._id}`, {}, { withCredentials: true })
            await listarAdministradores()
            toast.success('¡Administrador deshabilitado con éxito!')
            resetForm()
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error al deshabilitar administrador', { autoClose: 5000 })
        }
    }

    const resetForm = () => {
        reset({
            name: '',
            lastName: '',
            email: '',
            cedula: '',
            phone: ''
        })
        dispatch(set({ administradorSeleccionado: null }))
    }

    return (
        <CContainer className="mb-3">
            <CRow className="justify-content-center">
                <CCol>
                    <CCard className="border-0 shadow-sm">
                        <CCardBody>
                            <CForm className="row g-3">
                                {/* Nombre */}
                                <CCol md={6}>
                                    <CInputGroup className={`${errors.name ? 'is-invalid' : ''}`}>
                                        <CInputGroupText className={`${errors.name ? 'border-danger bg-danger' : 'bg-light'}`}>
                                            <CiUser className={`${errors.name ? 'text-white' : ''}`} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder={errors.name ? errors.name.message : "Nombre"}
                                            className={`${errors.name ? 'border-danger text-danger' : ''}`}
                                            invalid={!!errors.name}
                                            {...register('name')}
                                        />
                                    </CInputGroup>
                                </CCol>

                                {/* Apellido */}
                                <CCol md={6}>
                                    <CInputGroup className={`${errors.lastName ? 'is-invalid' : ''}`}>
                                        <CInputGroupText className={`${errors.lastName ? 'border-danger bg-danger' : 'bg-light'}`}>
                                            <CiUser className={`${errors.lastName ? 'text-white' : ''}`} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder={errors.lastName ? errors.lastName.message : "Apellido"}
                                            className={`${errors.lastName ? 'border-danger text-danger' : ''}`}
                                            invalid={!!errors.lastName}
                                            {...register('lastName')}
                                        />
                                    </CInputGroup>
                                </CCol>

                                {/* Correo */}
                                <CCol md={12}>
                                    <CInputGroup className={`${errors.email ? 'is-invalid' : ''}`}>
                                        <CInputGroupText className={`${errors.email ? 'border-danger bg-danger' : 'bg-light'}`}>
                                            <MdEmail className={`${errors.email ? 'text-white' : ''}`} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="email"
                                            placeholder={errors.email ? errors.email.message : "Correo"}
                                            className={`${errors.email ? 'border-danger text-danger' : ''}`}
                                            invalid={!!errors.email}
                                            {...register('email')}
                                        />
                                    </CInputGroup>
                                </CCol>

                                {/* Cédula */}
                                <CCol md={6}>
                                    <CInputGroup className={`${errors.cedula ? 'is-invalid' : ''}`}>
                                        <CInputGroupText className={`${errors.cedula ? 'border-danger bg-danger' : 'bg-light'}`}>
                                            <MdFingerprint className={`${errors.cedula ? 'text-white' : ''}`} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder={errors.cedula ? errors.cedula.message : "Cédula"}
                                            className={`${errors.cedula ? 'border-danger text-danger' : ''}`}
                                            invalid={!!errors.cedula}
                                            {...register('cedula')}
                                        />
                                    </CInputGroup>
                                </CCol>

                                {/* Teléfono */}
                                <CCol md={6}>
                                    <CInputGroup className={`${errors.phone ? 'is-invalid' : ''}`}>
                                        <CInputGroupText className={`${errors.phone ? 'border-danger bg-danger' : 'bg-light'}`}>
                                            <MdPhoneAndroid className={`${errors.phone ? 'text-white' : ''}`} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder={errors.phone ? errors.phone.message : "Teléfono"}
                                            className={`${errors.phone ? 'border-danger text-danger' : ''}`}
                                            invalid={!!errors.phone}
                                            {...register('phone')}
                                        />
                                    </CInputGroup>
                                </CCol>


                                {/* Botones */}
                                <CCol className="d-flex flex-wrap justify-content-between gap-2 mt-3">
                                    <div className="flex-fill text-center">
                                        <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={handleSubmit(onSubmitRegister)}>
                                            <UserPlus size={20} className="me-2" />
                                            Crear Administrador
                                        </CButton>
                                    </div>

                                    <div className="flex-fill text-center">
                                        <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={handleSubmit(onSubmitUpdate)}>
                                            <Pencil size={18} className="me-2" />
                                            Actualizar Administrador
                                        </CButton>
                                    </div>

                                    <div className="flex-fill text-center">
                                        <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={onSubmitEnable} >
                                            <UserCheck size={18} className="me-2" />
                                            Habilitar Administrador
                                        </CButton>
                                    </div>

                                    <div className="flex-fill text-center">
                                        <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={onSubmitDisable}>
                                            <UserX size={18} className="me-2" />
                                            Deshabilitar Administrador
                                        </CButton>
                                    </div>

                                    <div className="flex-fill text-center">
                                        <CButton type="button" className="btn-esfot-form w-100 fs-6 py-3" onClick={resetForm}>
                                            <Eraser size={18} className="me-2" />
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
    )
}

export default FormularioAdministrador