/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import axios from 'axios'
import { NavLink, useParams } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CRow, CAlert, CAlertLink, } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { CiMail } from 'react-icons/ci'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


const VerfiyToken = () => {

    const { token } = useParams()
    const [alertColor, setAlertColor] = useState('');
    const [infoAlertColor, setInfoAlertColor] = useState('');
    const [generalMessage, setgeneralMessage] = useState('')
    const [showButtonPassword, setShowButtonPassword] = useState(false);
    const [showInfoAlert, setShowInfoAlert] = useState(false);


    const verifyToken = async () => {
        const roles = ["admin", "docente", "estudiante"];
        let foundValid = false;

        for (const rol of roles) {

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/${rol}/verify-token/${token}`);
                setgeneralMessage(response.data.message);
                setAlertColor("success");
                setShowButtonPassword(true);
                foundValid = true;
                break;
            } catch (error) {
                setgeneralMessage(error.response.data.message);
                setAlertColor("danger");
                setShowButtonPassword(false);
                continue;
            }
        }
    }

    const sendRecoverEmail = async () => {
        const roles = ["admin", "docente", "estudiante"];
        let foundValid = false;

        for (const rol of roles) {

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/${rol}/send-recover-password/${token}`);
                setInfoAlertColor("info");
                foundValid = true;
                setShowInfoAlert(response.data.message);
                break;
            } catch (error) {
                setInfoAlertColor("warning");
                setShowInfoAlert(error.response.data.message);
                continue;
            }
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    useEffect(() => {
        if (generalMessage) {
            const timer = setTimeout(() => {
                setgeneralMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [generalMessage]);

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
                                    {generalMessage && (
                                        <CAlert color={alertColor}>
                                            {generalMessage}
                                        </CAlert>
                                    )}

                                    {showInfoAlert && (<CAlert color={infoAlertColor} >
                                        {showInfoAlert}{" "}
                                        <CAlertLink href="/">
                                            Iniciar sesión
                                        </CAlertLink>
                                        {" "}con su nueva contraseña.
                                    </CAlert>
                                    )}
                                    <CForm>
                                        <CRow>
                                            <CCol xs={12} md={8} className="text-md-start text-center">
                                                <h1 className="titulos-esfot">Recuperar Contraseña</h1>
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
                                        <CRow>
                                            <CCol md={6} xs={12} className='text-md-start text-center'>
                                                {showButtonPassword && (<CButton onClick={sendRecoverEmail} className="btn-esfot px-4">Enviar Contraseña de Recuperación</CButton>)}
                                            </CCol>
                                            <CCol
                                                md={showButtonPassword ? 6 : 12}
                                                xs={12} 
                                                className={`${showButtonPassword ? "text-md-end text-center" : "text-start"} `}>
                                                <CButton
                                                    color="link"
                                                    className="px-0 text-secondary"
                                                    to={`${showButtonPassword ? "/" : "/recuperar-contrasena"}`} as={NavLink}>
                                                    {`${showButtonPassword ? "¿Recuperaste tu contraseña? Iniciar sesión" : "¿No puedes verificar tu enlace de recuperación? Enviar correo de recuperación"}`}
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

export default VerfiyToken
