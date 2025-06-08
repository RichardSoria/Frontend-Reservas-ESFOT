import React from 'react'
import { useSelector } from 'react-redux'
import navigation from '../_nav'
import { AppSidebarNav } from './AppSidebarNav' // tu componente CoreUI sidebar

const filterNavByRole = (items, role) => {
    return items
        .filter(item => !item.roles || item.roles.includes(role))
        .map(item => {
            const to = item.routes ? item.routes[role] : item.to

            // Si no hay ruta y no es título, lo eliminamos
            /*if (!to && item.component?.name !== 'CNavTitle') return null*/

            return {
                ...item,
                to,
            }
        })
        .filter(Boolean)
}

const AppSidebarNavFiltered = () => {
    const userRole = useSelector(state => state.user?.rol)

    const filteredNav = filterNavByRole(navigation, userRole)

    return <AppSidebarNav items={filteredNav} />
}

export default AppSidebarNavFiltered
