export const loginSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            minLength: 1,
            pattern: "^[a-z]+\\.[a-z]+((0[1-9]|[1-9][0-9])?)@epn\\.edu\\.ec$"
        },
        password: {
            type: 'string',
            minLength: 8,
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$'
        }
    },
    additionalProperties: false,
    errorMessage: {
        required: {
            email: 'El campo de correo es obligatorio',
            password: 'El campo de contraseña es obligatorio',
        },
        properties: {
            email: 'El correo debe ser institucional',
            password: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
        },
        _: 'Datos inválidos en el formulario',
    }
}