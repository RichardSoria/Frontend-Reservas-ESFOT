export const adminSchema = {
    type: 'object',
    required: ['cedula', 'name', 'lastName', 'email', 'phone'],
    properties: {
        cedula: {
            type: 'string',
            pattern: '^[0-9]{10}$',
            errorMessage: 'La cédula debe tener 10 dígitos numéricos',
        },
        name: {
            type: 'string',
            minLength: 2,
            errorMessage: 'El nombre es obligatorio y debe tener al menos 2 caracteres',
        },
        lastName: {
            type: 'string',
            minLength: 2,
            errorMessage: 'El apellido es obligatorio y debe tener al menos 2 caracteres',
        },
        email: {
            type: 'string',
            format: 'email',
            errorMessage: 'El correo debe tener un formato válido',
        },
        phone: {
            type: 'string',
            pattern: '^[0-9]{10}$',
            errorMessage: 'El teléfono debe tener 10 dígitos numéricos',
        },
    },
    additionalProperties: false,
    errorMessage: {
        required: {
            cedula: 'La cédula es obligatoria',
            name: 'El nombre es obligatorio',
            lastName: 'El apellido es obligatorio',
            email: 'El correo es obligatorio',
            phone: 'El teléfono es obligatorio',
        },
    },
}
