import React from 'react'
import { useSelector } from 'react-redux'

// Módulos
const Modulos = React.lazy(() => import('./views/dashboard/Modulos'))

// Usuarios
const Administradores = React.lazy(() => import('./views/pages/Administradores/Administradores.jsx'))
const VisualizarAdministrador = React.lazy(() => import('./views/pages/Administradores/VisualizarAdministrador.jsx'))

const Docentes = React.lazy(() => import('./views/pages/Docentes/Docentes.jsx'))
const VisualizarDocente = React.lazy(() => import('./views/pages/Docentes/VisualizarDocente.jsx'))

const Estudiantes = React.lazy(() => import('./views/pages/Estudiantes/Estudiante.jsx'))
const VisualizarEstudiante = React.lazy(() => import('./views/pages/Estudiantes/VisualizarEstudiante.jsx'))

// Espacios Acádemicos
const Aulas = React.lazy(() => import('./views/pages/Aulas/Aula.jsx'))
const VisualizarAula = React.lazy(() => import('./views/pages/Aulas/VisualizarAula.jsx'))

const allRoutes = [
  { path: '/modulos', name: 'Módulos', element: Modulos },
  { path: '/admin/administradores', name: 'Administradores', element: Administradores, roles: ['Admin'] },
  { path: '/admin/administradores/:id', name: 'Visualizar Administrador', element: VisualizarAdministrador, roles: ['Admin'] },
  { path: '/admin/docentes', name: 'Docentes', element: Docentes, roles: ['Admin'] },
  { path: '/admin/docentes/:id', name: 'Visualizar Docente', element: VisualizarDocente, roles: ['Admin'] },
  { path: '/admin/estudiantes', name: 'Estudiantes', element: Estudiantes, roles: ['Admin'] },
  { path: '/admin/estudiantes/:id', name: 'Visualizar Estudiante', element: VisualizarEstudiante, roles: ['Admin'] },
  { path: '/admin/aulas', name: 'Aulas', element: Aulas, roles: ['Admin'] },
  { path: '/admin/aulas/:id', name: 'Visualizar Aula', element: VisualizarAula, roles: ['Admin'] },
]

export function useRoutesByRole() {
  const role = useSelector((state) => state.user?.rol)
  return allRoutes.filter((r) => !r.roles || r.roles.includes(role))
}

