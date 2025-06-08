import React from 'react'

// Módulos
const Modulos = React.lazy(() => import('./views/dashboard/Modulos'))

// Usuarios
const Administradores = React.lazy(() => import('./views/pages/Administradores/Administradores'))
const VisualizarAdministrador = React.lazy(() => import('./views/pages/Administradores/VisualizarAdministrador.jsx'))

const routes = [
  { path: '/modulos', name: 'Módulos', element: Modulos },
  { path: '/admin/administradores', name: 'Administradores', element: Administradores, roles: ['Admin'] },
  { path: '/admin/administradores/:id', name: 'Visualizar Administrador', element: VisualizarAdministrador, roles: ['Admin'] },
]

export default routes
