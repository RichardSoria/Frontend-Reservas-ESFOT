export const recoverPasswordSchema = {
    type: 'object',
    required: ['email'],
    properties: {
        email: {
            type: 'string',
            minLength: 1,
            pattern: "^[a-z]+\\.[a-z]+((0[1-9]|[1-9][0-9])?)@epn\\.edu\\.ec$"
        },
        role: {
            type: 'string',
            enum: ['admin', 'docente', 'estudiante'],
        }
    },
    additionalProperties: false,
    errorMessage: {
        required: {
            email: 'El campo de correo es obligatorio',
            role: 'El campo de rol es obligatorio',
        },
        properties: {
            email: 'El correo debe ser institucional',
            role: 'El campo de rol es obligatorio',
        },
        _: 'Datos inválidos en el formulario',
    }
}
