export const createReservaSchema = {
    type: 'object',
    properties: {
        userID: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
                pattern: 'El userID debe ser un ID de objeto válido de MongoDB'
            }
        },
        userRol: {
            type: 'string',
            enum: ['Estudiante', 'Docente', 'Admin'],
            errorMessage: {
                enum: 'El rol debe ser Estudiante, Docente o Admin'
            }
        },
        placeID: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
                pattern: 'El placeID debe ser un ID válido de MongoDB'
            }
        },
        placeType: {
            type: 'string',
            enum: ['Aula', 'Laboratorio'],
            errorMessage: {
                enum: 'El tipo de lugar debe ser Aula o Laboratorio'
            }
        },
        purpose: {
            type: 'string',
            enum: ['Clase', 'Prueba/Examen', 'Proyecto', 'Evento/Capacitación', 'Otro'],
            errorMessage: {
                enum: 'El propósito debe ser válido'
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
        status: {
            type: 'string',
            enum: ['Pendiente', 'Aprobada', 'Rechazada', 'Cancelada'],
            default: 'Pendiente',
            errorMessage: {
                enum: 'El estado debe ser Pendiente, Aprobada, Rechazada o Cancelada'
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
        }
    },
    required: [
        'userID',
        'userRol',
        'placeID',
        'placeType',
        'purpose',
        'description',
        'startTime',
        'endTime'
    ],
    additionalProperties: false
};
