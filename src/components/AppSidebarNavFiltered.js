import { useSelector } from 'react-redux'
import navigation from '../_nav'
import { AppSidebarNav } from './AppSidebarNav'

// Función recursiva para filtrar por rol
const filterNavByRole = (items, role) => {
    return items
        .filter((item) => !item.role || item.role === role)
        .map((item) => {
            if (item.items) {
                const filteredItems = filterNavByRole(item.items, role)
                if (filteredItems.length > 0) {
                    return { ...item, items: filteredItems }
                }
                return null
            }
            return item
        })
        .filter(Boolean)
}

const AppSidebarNavFiltered = () => {
    const user = useSelector((state) => state.user)
    const role = user?.rol 

    const filteredNav = filterNavByRole(navigation, role)

    return <AppSidebarNav items={filteredNav} />
}

export default AppSidebarNavFiltered
