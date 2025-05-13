import React from 'react'
import { Link } from 'react-router-dom'
import {
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
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { CiMail } from 'react-icons/ci'

const Login = () => {
  return (
    <div className="bg-esfot min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <h2 className="text-center mb-4 fw-bold">
              Sistema de Gestión de Reservas y Laboratorios - ESFOT
            </h2>
            <CCardGroup>
              <CCard className="p-4 bg-white">
                <CCardBody>
                  <CForm>
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
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="bg-secondary border-secondary">
                        <CiMail />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Correo Electrónico"
                        autoComplete="email"
                        className="bg-light border-secondary text-secondary custom-input"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText className="bg-secondary border-secondary">
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        className="bg-light border-secondary text-secondary custom-input"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton className="btn-esfot px-4">Iniciar sesión</CButton>
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
