import React from 'react'
import { CNavItem, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'

// Iconos de react-icons
import { RiAdminLine } from "react-icons/ri"
import { PiStudent, PiChalkboardTeacherLight } from "react-icons/pi"
import { SiGoogleclassroom } from "react-icons/si"
import { BsPcDisplay } from "react-icons/bs"
import { CiCalendar } from "react-icons/ci"
import { cilSpeedometer } from '@coreui/icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Módulos',
    to: '/modulos',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Usuarios',
    role: 'Admin',
  },
  {
    component: CNavItem,
    name: 'Administradores',
    to: '/administradores',
    icon: <RiAdminLine className="nav-icon" />,
    role: 'Admin',
  },
  {
    component: CNavItem,
    name: 'Docentes',
    to: '/docentes',
    icon: <PiChalkboardTeacherLight className="nav-icon" />,
    role: 'Admin',
  },
  {
    component: CNavItem,
    name: 'Estudiantes',
    to: '/estudiantes',
    icon: <PiStudent className="nav-icon" />,
    role: 'Admin',
  },
  {
    component: CNavTitle,
    name: 'Espacios Académicos',
  },
  {
    component: CNavItem,
    name: 'Aulas',
    to: '/aulas',
    icon: <SiGoogleclassroom className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Laboratorios',
    to: '/laboratorios',
    icon: <BsPcDisplay className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Reservas Espacios Académicos',
  },
  {
    component: CNavItem,
    name: 'Reservas',
    to: '/reservas',
    icon: <CiCalendar className="nav-icon" />,
  },
]

export default _nav
