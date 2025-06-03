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
import { adminSchema } from '../../validations/adminSchema'
import {CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow,
} from '@coreui/react'
import { CiUser } from 'react-icons/ci'
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
            toast.error(error.message, {autoClose: 4000})
        })
    }, [errors])

    const onSubmit = async (data) => {
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
                            <CForm onSubmit={handleSubmit(onSubmit)} className="row g-3">
                                {/* Nombre */}
                                <CCol md={6}>
                                    <CInputGroup className={`${errors.name ? 'is-invalid' : ''}`}>
                                        <CInputGroupText className={`${errors.name ? 'border-danger bg-danger' : 'bg-light'}`}>
                                            <CiUser className={`${errors.name ? 'text-white' : ''}`} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Nombre"
                                            className={`${errors.name ? 'border-danger' : ''}`}
                                            invalid={!!errors.name}
                                            {...register('name')}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name.message}</div>
                                        )}
                                    </CInputGroup>
                                </CCol>

                                {/* Apellido */}
                                <CCol md={6}>
                                    <CInputGroup className={`${errors.lastName ? 'is-invalid' : ''}`}>
                                        <CInputGroupText className={`${errors.lastName ? 'border-danger bg-danger' : 'bg-light'}`}>
                                            <CiUser className={`${errors.lastName ? 'text-white' : ''}`} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Apellido"
                                            className={`${errors.lastName ? 'border-danger' : ''}`}
                                            invalid={!!errors.lastName}
                                            {...register('lastName')}
                                        />
                                        {errors.lastName && (
                                            <div className="invalid-feedback">{errors.lastName.message}</div>
                                        )}
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
                                            placeholder="Correo"
                                            className={`${errors.email ? 'border-danger' : ''}`}
                                            invalid={!!errors.email}
                                            {...register('email')}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email.message}</div>
                                        )}
                                    </CInputGroup>
                                </CCol>

                                {/* Cédula */}
                                <CCol md={6}>
                                    <CInputGroup className={`${errors.cedula ? 'is-invalid' : ''}`}>
                                        <CInputGroupText className={`${errors.cedula ? 'border-danger bg-danger' : 'bg-light'}`}>
                                            <MdFingerprint className={`${errors.cedula ? 'text-white' : ''}`} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Cédula"
                                            className={`${errors.cedula ? 'border-danger' : ''}`}
                                            invalid={!!errors.cedula}
                                            {...register('cedula')}
                                        />
                                        {errors.cedula && (
                                            <div className="invalid-feedback">{errors.cedula.message}</div>
                                        )}
                                    </CInputGroup>
                                </CCol>

                                {/* Teléfono */}
                                <CCol md={6}>
                                    <CInputGroup className={`${errors.phone ? 'is-invalid' : ''}`}>
                                        <CInputGroupText className={`${errors.phone ? 'border-danger bg-danger' : 'bg-light'}`}>
                                            <MdPhoneAndroid className={`${errors.phone ? 'text-white' : ''}`} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Teléfono"
                                            className={`${errors.phone ? 'border-danger' : ''}`}
                                            invalid={!!errors.phone}
                                            {...register('phone')}
                                        />
                                        {errors.phone && (
                                            <div className="invalid-feedback">{errors.phone.message}</div>
                                        )}
                                    </CInputGroup>
                                </CCol>

                                {/* Botones */}
                                <CCol xs={12} className="text-center">
                                    <CButton type="submit" color="primary" className="me-2">
                                        Registrar
                                    </CButton>
                                    <CButton type="button" color="secondary" onClick={resetForm}>
                                        Limpiar
                                    </CButton>
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
