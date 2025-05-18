import React from 'react'
import { useForm } from 'react-hook-form'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import { loginSchema } from '../../../validations/loginSchema.js'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CAlert, CFormSelect, } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { CiMail, CiUser } from 'react-icons/ci'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


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

  const [generalMessage, setgeneralMessage] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const watchedFields = watch()

  // si hay cambios en el correo o contraseña, se limpia el error general
  React.useEffect(() => {
    if (watchedFields.email || watchedFields.password) {
      setgeneralMessage('')
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
      if (data.role === 'admin') {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, data)
        localStorage.setItem('token', response.data.tokenJWT)
      } else if (data.role === 'docente') {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/docente/login`, data)
        localStorage.setItem('token', response.data.tokenJWT)
      }
      else if (data.role === 'estudiante') {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/estudiante/login`, data)
        localStorage.setItem('token', response.data.tokenJWT)
      }
    } catch (error) {
      setgeneralMessage(error.response?.data?.message || 'Error en el inicio de sesión')
    }
  }
  return (
    <div className="bg-esfot min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12} >
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
                    <CAlert color="danger">
                      {generalMessage}
                    </CAlert>
                  )}
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CRow>
                      <CCol xs={12} md={7} className="text-md-start text-center">
                        <h1 className="titulos-esfot">Iniciar Sesión</h1>
                        <p className="subtitulos-esfot">
                          Sistema de Gestión de Reservas de Aulas y Laboratorios
                        </p>
                      </CCol>
                      <CCol xs={12} md={5} className="text-md-end text-center mb-3">
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

                    <CInputGroup className={`mb-3 ${errors.password ? 'is-invalid' : ''}`}>
                      <CInputGroupText className={`bg-secondary border-secondary ${errors.password ? 'border-danger bg-danger' : ''}`}>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        className={`bg-light border-secondary text-secondary custom-input ${errors.password ? 'border-danger' : ''}`}
                        invalid={!!errors.password}
                        {...register('password')}
                      />
                      <CInputGroupText
                        className={`bg-secondary border-secondary ${errors.password ? 'border-danger bg-danger' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </CInputGroupText>
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
                        <CButton type='submit' className="btn-esfot px-4">Iniciar Sesión</CButton>
                      </CCol>
                      <CCol md={6} xs={12} className='text-md-end text-center'>
                        <CButton color="link"
                          className="px-0 text-secondary"
                          to="/recover-password" as={NavLink}>
                          ¿Olvidaste tu contraseña?
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

export default Login
