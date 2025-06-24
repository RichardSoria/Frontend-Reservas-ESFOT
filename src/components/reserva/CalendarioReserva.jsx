/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useSelector } from 'react-redux'
import useReserva from '../../hooks/useReservas'
import { CCard, CCardBody, CContainer, CRow, CCol } from '@coreui/react'
import { toast } from 'react-toastify'
import CustomToolbar from '../../components/reserva/CustomToolbar'  // <-- Importa aquí

const locales = { es }

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const CalendarioReservas = () => {
    const { listarReservas } = useReserva()
    const { reservas = [] } = useSelector((state) => state)
    const [eventos, setEventos] = useState([])

    const [vistaActual, setVistaActual] = useState('agenda')
    const [fechaActual, setFechaActual] = useState(new Date())

    useEffect(() => {
        listarReservas()
    }, [])

    useEffect(() => {
        const eventosListos = reservas.map((e) => ({
            id: e.id,
            title: e.title,
            start: new Date(e.start),
            end: new Date(e.end),
            allDay: false,
            reserva: e,
        }))
        setEventos(eventosListos)
    }, [reservas])

    const eventStyleGetter = (event) => {
        let backgroundColor = '#0d6efd'
        let color = 'white'

        switch (event.reserva.status) {
            case 'Aprobada':
                backgroundColor = '#198754' // Verde
                break
            case 'Pendiente':
                backgroundColor = '#ffc008' // Amarillo
                color = 'black'
                break
            case 'Rechazada':
                backgroundColor = '#dc3545' // Rojo
                break
            case 'Cancelada':
                backgroundColor = '#6c757d' // Gris
                break
        }

        return {
            style: {
                backgroundColor,
                color,
                borderRadius: '6px',
                padding: '4px',
                border: 'none',
            },
        }
    }

    const handleSelectEvent = (event) => {
        toast.info(
            `Reserva: ${event.title}\nEstado: ${event.reserva?.status || 'Desconocido'}`,
        )
    }

    return (
        <CContainer className="mt-4 mb-4" fluid>
            <CRow className="justify-content-center">
                <CCol>
                    <CCard className="border-0 shadow-sm">
                        <CCardBody>
                            <Calendar
                                localizer={localizer}
                                events={eventos}
                                startAccessor="start"
                                endAccessor="end"
                                eventPropGetter={eventStyleGetter}
                                style={{ height: '45vh' }}
                                views={['month', 'week', 'day', 'agenda']}
                                view={vistaActual}
                                onView={setVistaActual}
                                date={fechaActual}
                                onNavigate={setFechaActual}
                                popup
                                culture="es"
                                showAllDayEvents={false}
                                min={new Date(1970, 1, 1, 7, 0)}
                                max={new Date(1970, 1, 1, 21, 0)}
                                onSelectEvent={handleSelectEvent}
                                messages={{
                                    date: 'Fecha',
                                    time: 'Hora',
                                    event: 'Reservas',
                                    noEventsInRange: 'No hay reservas registradas.',
                                }}
                                components={{ toolbar: CustomToolbar }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default CalendarioReservas
