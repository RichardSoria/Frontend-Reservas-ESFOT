import React from 'react'
import { useForm } from 'react-hook-form'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import { recoverPasswordSchema } from '../../../validations/authenticationSchema.js'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CAlert, CFormSelect, } from '@coreui/react'
import { CiMail, CiUser } from 'react-icons/ci'


const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)
const validate = ajv.compile(recoverPasswordSchema)

const RecoverPassword = () => {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors },
    } = useForm()

    const [generalMessage, setgeneralMessage] = React.useState('')

    const watchedFields = watch()

    // si hay cambios en el correo o contraseña, se limpia el error general
    React.useEffect(() => {
        if (watchedFields.email) {
            setgeneralMessage('')
        }
    }, [watchedFields.email])

    React.useEffect(() => {
        if (generalMessage) {
            const timer = setTimeout(() => {
                setgeneralMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [generalMessage]);

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
            if (data.role === 'admin') {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/recover-password`, data)
                setgeneralMessage(response.data.message)
            } else if (data.role === 'docente') {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/docente/recover-password`, data)
                setgeneralMessage(response.data.message)
            }
            else if (data.role === 'estudiante') {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/estudiante/recover-password`, data)
                setgeneralMessage(response.data.message)
            }
        } catch (error) {
            setgeneralMessage(error.response?.data?.message || 'Error en el inicio de sesión')
        }
    }
    return (
        <div className="bg-esfot min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={12}>
                        {/*<h2 className="text-center mb-4 fw-bold text-white">
                        Sistema de Gestión de Reservas y Laboratorios - ESFOT
                        </h2>*/}
                        <CCardGroup>
                            <CCard className="p-4 bg-white">
                                <CCardBody>
                                    {Object.values(errors).map((err, index) => (
                                        <CAlert key={index} color="danger">
                                            {err.message}
                                        </CAlert>
                                    ))}
                                    {generalMessage && (
                                        <CAlert color="success">
                                            {generalMessage}
                                        </CAlert>
                                    )}
                                    <CForm onSubmit={handleSubmit(onSubmit)}>
                                        <CRow>
                                            <CCol xs={12} md={8} className="text-md-start text-center">
                                                <h1 className="titulos-esfot">Enviar Correo de Recuperación</h1>
                                                <p className="subtitulos-esfot">
                                                    Sistema de Gestión de Reservas de Aulas y Laboratorios
                                                </p>
                                            </CCol>
                                            <CCol xs={12} md={4} className="text-md-end text-center mb-3">
                                                <img
                                                    src="https://esfot.epn.edu.ec/images/logo_esfot_buho.png"
                                                    alt="Logo"
                                                    style={{ width: '50%', maxWidth: '200px', height: 'auto' }}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CInputGroup className={`mb-3 ${errors.email ? 'is-invalid' : ''}`}>
                                            <CInputGroupText className={`bg-secondary border-secondary ${errors.email ? 'border-danger bg-danger' : ''}`}>
                                                <CiMail />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Correo Electrónico"
                                                autoComplete="email"
                                                className={`bg-light border-secondary text-secondary custom-input ${errors.email ? 'border-danger' : ''}`}
                                                invalid={!!errors.email}
                                                {...register('email')}
                                            />
                                        </CInputGroup>
                                        {<CInputGroup className={`mb-4 ${errors.role ? 'is-invalid' : ''}`}>
                                            <CInputGroupText className={`bg-secondary border-secondary ${errors.role ? 'border-danger bg-danger' : ''}`}>
                                                <CiUser />
                                            </CInputGroupText>
                                            <CFormSelect
                                                className={`bg-light border-secondary text-secondary custom-input ${errors.role ? 'border-danger' : ''}`}
                                                invalid={!!errors.role}
                                                {...register('role')}
                                            >
                                                <option value="">Selecciona un rol</option>
                                                <option value="admin">Administrador</option>
                                                <option value="docente">Docente</option>
                                                <option value="estudiante">Estudiante</option>
                                            </CFormSelect>
                                        </CInputGroup>}

                                        <CRow>
                                            <CCol md={6} xs={12} className='text-md-start text-center'>
                                                <CButton type='submit' className="btn-esfot px-4">Enviar Correo de Recuperación</CButton>
                                            </CCol>
                                            <CCol md={6} xs={12} className='text-md-end text-center'>
                                                <CButton
                                                    color="link"
                                                    className="px-0 text-secondary"
                                                    to="/" as={NavLink}>
                                                    ¿Recordaste tu contraseña? Iniciar sesión
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default RecoverPassword
