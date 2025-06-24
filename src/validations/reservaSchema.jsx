export const createReservaSchema = {
    type: 'object',
    properties: {
        placeType: {
            type: 'string',
            enum: ['Aula', 'Laboratorio'],
            errorMessage: {
                enum: 'El tipo de lugar debe ser Aula o Laboratorio'
            }
        },
        placeID: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
                pattern: 'El espacio académico es obligatorio'
            }
        },
        purpose: {
            type: 'string',
            enum: ['Clase', 'Prueba/Examen', 'Proyecto', 'Evento/Capacitación', 'Otro'],
            errorMessage: {
                enum: 'Seleccione una de las opciones disponibles'
            }
        },
        reservationDate: {
            type: 'string',
            format: 'date',
            errorMessage: {
                format: 'La fecha de reserva es obligatoria'
            }
        },
        startTime: {
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
            errorMessage: {
                pattern: 'La hora de inicio debe estar en formato HH:mm'
            }
        },
        endTime: {
            type: 'string',
            pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$',
            errorMessage: {
                pattern: 'La hora de fin debe estar en formato HH:mm'
            }
        },
        description: {
            type: 'string',
            minLength: 1,
            maxLength: 200,
            pattern: '^[a-zA-Z0-9\\s.,;:-]{1,200}$',
            errorMessage: {
                minLength: 'La descripción no puede estar vacía',
                pattern: 'La descripción solo puede contener letras, números y (.,;:-)',
                maxLength: 'Máximo 200 caracteres'
            }
        },
    },
    required: [
        'placeType',
        'placeID',
        'purpose',
        'reservationDate',
        'startTime',
        'endTime',
        'description',
    ],
    additionalProperties: false
};
