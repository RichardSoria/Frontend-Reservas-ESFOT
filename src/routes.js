import React from 'react'

// Módulos
const Modulos = React.lazy(() => import('./views/dashboard/Modulos'))


// Usuarios
const Administradores = React.lazy(() => import('./views/pages/Administradores/Administradores'))

const routes = [
  { path: '/modulos', name: 'Módulos', element: Modulos },
  { path: '/admin/administradores', name: 'Administradores', element: Administradores, roles: ['Admin'] },
]

export default routes
