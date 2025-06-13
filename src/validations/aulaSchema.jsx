export const aulaSchema = {
    type: 'object',
    required: ['codigo', 'name', 'description', 'capacity', 'size'],
    properties: {
        codigo: {
            type: 'string',
            minLength: 1,
            pattern: '^E\\d{2}/PB\\d/E\\d{3}$',
            errorMessage: {
                pattern: 'El código debe seguir el formato E00/PB0/E000',
                minLength: 'El campo de código es obligatorio',
            },
        },
        name: {
            type: 'string',
            minLength: 1,
            pattern: '^[a-zA-Z]{1,20}$',
            errorMessage: {
                pattern: 'El nombre solo puede contener letras y tener hasta 20 caracteres',
                minLength: 'El campo de nombre es obligatorio',
            },
        },
        description: {
            type: 'string',
            minLength: 1,
            pattern: '^[a-zA-Z0-9\\s.,;:-]{1,100}$',
            errorMessage: {
                pattern:
                    'La descripción puede contener letras, números y algunos caracteres especiales (.,;:-) y tener hasta 100 caracteres',
                minLength: 'El campo de descripción es obligatorio',
            },
        },
        capacity: {
            type: 'string',
            minLength: 1,
            pattern: '^[1-9][0-9]*$',
            errorMessage: {
                pattern: 'La capacidad debe ser un número entero mayor o igual a 1',
                minLength: 'El campo de capacidad es obligatorio',
            },
        },
        size: {
            type: 'string',
            enum: ['Pequeño', 'Mediano', 'Grande'],
            errorMessage: {
                enum: 'El tamaño debe ser pequeño, mediano o grande',
            },
        },
    },
    additionalProperties: false,
    errorMessage: {
        required: {
            codigo: 'El código es obligatorio',
            name: 'El nombre es obligatorio',
            description: 'La descripción es obligatoria',
            capacity: 'La capacidad es obligatoria',
            size: 'El tamaño es obligatorio',
        },
    },
};
