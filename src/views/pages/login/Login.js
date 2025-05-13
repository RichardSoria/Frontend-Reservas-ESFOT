import React from 'react'
import { useForm } from 'react-hook-form'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import { loginSchema } from '../../../validations/loginSchema.js'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CAlert, } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { CiMail } from 'react-icons/ci'


const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
ajvErrors(ajv)
const validate = ajv.compile(loginSchema)

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm()

  const [generalError, setGeneralError] = React.useState('')

  const watchedFields = watch()

  // si hay cambios en el correo o contraseña, se limpia el error general
  React.useEffect(() => {
    if (watchedFields.email || watchedFields.password) {
      setGeneralError('')
    }
  }
  , [watchedFields.email, watchedFields.password])

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, data)
      setGeneralError('Inicio de sesión exitoso')
      // Aquí puedes redirigir o guardar el token
    } catch (error) {
      setGeneralError(error.response?.data?.message || 'Error en el inicio de sesión')
    }
  }
  return (
    <div className="bg-esfot min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <h2 className="text-center mb-4 fw-bold text-white">
              Sistema de Gestión de Reservas y Laboratorios - ESFOT
            </h2>
            <CCardGroup>
              <CCard className="p-4 bg-white">
                <CCardBody>
                  {Object.values(errors).map((err, index) => (
                    <CAlert key={index} color="danger">
                      {err.message}
                    </CAlert>
                  ))}
                  {generalError && (
                    <CAlert color="danger">
                      {generalError}
                    </CAlert>
                  )}
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CRow>
                      <CCol xs={6}>
                        <h1 className="titulos-esfot">Iniciar Sesión</h1>
                        <p className="subtitulos-esfot">
                          Ingresa tus credenciales para iniciar sesión
                        </p>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <img
                          src="https://esfot.epn.edu.ec/images/logo_esfot_buho.png"
                          alt="Logo"
                          style={{ width: '50%', maxWidth: '180px', height: 'auto' }}
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
                        className={`bg-light border-secondary text-secondary custom-input" ${errors.email ? 'border-danger' : ''}`}
                        invalid={!!errors.email}
                        {...register('email')}
                      />

                    </CInputGroup>

                    <CInputGroup className={`mb-4 ${errors.password ? 'is-invalid' : ''}`}>
                      <CInputGroupText className={`bg-secondary border-secondary ${errors.password ? 'border-danger bg-danger' : ''}`}>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        className={`bg-light border-secondary text-secondary custom-input" ${errors.password ? 'border-danger' : ''}`}
                        invalid={!!errors.password}
                        {...register('password')}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' className="btn-esfot px-4">Iniciar Sesión</CButton>
                      </CCol>
                      <CCol xs={6}>
                        <div className="text-end">
                          <CButton color="link" className="px-0 text-secondary">
                            ¿Olvidaste tu contraseña?
                          </CButton>
                        </div>
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

export default Login
