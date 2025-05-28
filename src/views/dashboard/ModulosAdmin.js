import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CContainer
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { RiAdminLine } from "react-icons/ri"
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi"
import { SiGoogleclassroom } from "react-icons/si"
import { BsPcDisplay } from "react-icons/bs"
import { CiCalendar } from "react-icons/ci"

const baseColor = '#f8ad25'
const hoverColor = '#0e4c71'

const ModulosAdmin = () => {
  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const modules = [
    { title: 'Administradores', Icon: RiAdminLine, route: '/admin/administradores' },
    { title: 'Docentes', Icon: PiChalkboardTeacherLight, route: '/admin/docentes' },
    { title: 'Estudiantes', Icon: PiStudent, route: '/admin/estudiantes' },
    { title: 'Aulas', Icon: SiGoogleclassroom, route: '/admin/aulas' },
    { title: 'Laboratorios', Icon: BsPcDisplay, route: '/admin/laboratorios' },
    { title: 'Reservas', Icon: CiCalendar, route: '/admin/reservas' }
  ]

  const handleCardClick = (route) => {
    navigate(route)
  }

  return (
    <CContainer fluid className="px-4 py-4">
      <CRow className="g-4 justify-content-center">
        {modules.map(({ title, Icon, route }, index) => {
          const isHovered = hoveredIndex === index
          const bgColor = isHovered ? hoverColor : baseColor
          const textColor = isHovered ? 'white' : 'black'

          return (
            <CCol md="4" sm="6" key={index}>
              <CCard
                className="h-100 border-0 shadow-sm"
                style={{
                  minHeight: '315px',
                  cursor: 'pointer',
                  backgroundColor: bgColor,
                  color: textColor,
                }}
                onClick={() => handleCardClick(route)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(route)
                  }
                }}
              >
                <CCardBody className="text-center d-flex flex-column justify-content-center align-items-center">
                  <Icon size={200} className="mb-3" />
                  <h5 style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{title}</h5>
                </CCardBody>
              </CCard>
            </CCol>
          )
        })}
      </CRow>
    </CContainer>
  )
}

export default ModulosAdmin
