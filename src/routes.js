import React from 'react'
import { useSelector } from 'react-redux'

// Módulos
const Modulos = React.lazy(() => import('./views/dashboard/Modulos'))

// Usuarios
const Administradores = React.lazy(() => import('./views/pages/Administradores/Administradores'))
const VisualizarAdministrador = React.lazy(() => import('./views/pages/Administradores/VisualizarAdministrador.jsx'))

const Docentes = React.lazy(() => import('./views/pages/Docentes/Docentes'))
const VisualizarDocente = React.lazy(() => import('./views/pages/Docentes/VisualizarDocente.jsx'))

const allRoutes = [
  { path: '/modulos', name: 'Módulos', element: Modulos },
  { path: '/admin/administradores', name: 'Administradores', element: Administradores, roles: ['Admin'] },
  { path: '/admin/administradores/:id', name: 'Visualizar Administrador', element: VisualizarAdministrador, roles: ['Admin'] },
  { path: '/admin/docentes', name: 'Docentes', element: Docentes, roles: ['Admin'] },
  { path: '/admin/docentes/:id', name: 'Visualizar Docente', element: VisualizarDocente, roles: ['Admin'] },
]

export function useRoutesByRole() {
  const role = useSelector((state) => state.user?.rol)
  return allRoutes.filter((r) => !r.roles || r.roles.includes(role))
}

