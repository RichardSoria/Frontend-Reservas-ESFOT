import React from 'react'
import { useForm } from 'react-hook-form'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { set } from '../../store'
import {
    CAlert,
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import { CiUser } from 'react-icons/ci'
import { MdEmail, MdPhoneAndroid, MdFingerprint } from 'react-icons/md'

import { adminSchema } from '../../validations/adminSchema' // crea este schema para validación AJV

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)
const validate = ajv.compile(adminSchema)

const FormularioAdministrador = () => {
    const dispatch = useDispatch()
    const { administradorSeleccionado } = useSelector(state => state)

    const {
        register,
        handleSubmit,
        setError,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const [generalMessage, setGeneralMessage] = React.useState('')

    React.useEffect(() => {
        if (administradorSeleccionado) {
            reset(administradorSeleccionado)
        }
    }, [administradorSeleccionado, reset])

    const watchedFields = watch()

    React.useEffect(() => {
        if (
            watchedFields.cedula ||
            watchedFields.name ||
            watchedFields.lastName ||
            watchedFields.email ||
            watchedFields.phone
        ) {
            setGeneralMessage('')
        }
    }, [watchedFields])

    const onSubmit = async (data) => {
        const valid = validate(data)
        if (!valid) {
            validate.errors.forEach((err) => {
                const field = err.instancePath.replace('/', '')
                setError(field, { type: 'manual', message: err.message })
            })
            return
        }

        try {
            if (data._id) {
                await axios.put(`${import.meta.env.VITE_API_URL}/admin/update/${data._id}`, data)
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/admin/register`, data)
            }
            dispatch(set({ administradorSeleccionado: null }))
            reset()
        } catch (err) {
            setGeneralMessage(err.response?.data?.message || 'Error al guardar administrador')
        }
    }

    return (
        <CContainer className='bg-light mt-5 p-4' fluid>
            <CRow className="justify-content-center">
                <CCol md={12}>
                    <CCardGroup>
                        <CCard className="p-4">
                            <CCardBody>
                                <h2 className="mb-4">Formulario de Administrador</h2>

                                {Object.values(errors).map((err, index) => (
                                    <CAlert key={index} color="danger">{err.message}</CAlert>
                                ))}
                                {generalMessage && (
                                    <CAlert color="danger">{generalMessage}</CAlert>
                                )}

                                <CForm onSubmit={handleSubmit(onSubmit)}>

                                    <CInputGroup className={`mb-3 ${errors.cedula ? 'is-invalid' : ''}`}>
                                        <CInputGroupText><MdFingerprint /></CInputGroupText>
                                        <CFormInput
                                            placeholder="Cédula"
                                            {...register('cedula')}
                                            className={errors.cedula ? 'border-danger' : ''}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className={`mb-3 ${errors.name ? 'is-invalid' : ''}`}>
                                        <CInputGroupText><CiUser /></CInputGroupText>
                                        <CFormInput
                                            placeholder="Nombre"
                                            {...register('name')}
                                            className={errors.name ? 'border-danger' : ''}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className={`mb-3 ${errors.lastName ? 'is-invalid' : ''}`}>
                                        <CInputGroupText><CiUser /></CInputGroupText>
                                        <CFormInput
                                            placeholder="Apellido"
                                            {...register('lastName')}
                                            className={errors.lastName ? 'border-danger' : ''}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className={`mb-3 ${errors.email ? 'is-invalid' : ''}`}>
                                        <CInputGroupText><MdEmail /></CInputGroupText>
                                        <CFormInput
                                            type="email"
                                            placeholder="Correo Electrónico"
                                            {...register('email')}
                                            className={errors.email ? 'border-danger' : ''}
                                        />
                                    </CInputGroup>

                                    <CInputGroup className={`mb-4 ${errors.phone ? 'is-invalid' : ''}`}>
                                        <CInputGroupText><MdPhoneAndroid /></CInputGroupText>
                                        <CFormInput
                                            placeholder="Teléfono"
                                            {...register('phone')}
                                            className={errors.phone ? 'border-danger' : ''}
                                        />
                                    </CInputGroup>

                                    <div className="text-center">
                                        <CButton type="submit" className="btn-esfot px-4">
                                            {administradorSeleccionado ? 'Actualizar' : 'Registrar'}
                                        </CButton>
                                    </div>

                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default FormularioAdministrador
