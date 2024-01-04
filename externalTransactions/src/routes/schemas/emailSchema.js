'use strict'

const bodyJsonSchema = {
    type: 'object',
    required: ['id', 'email', 'mensagem'],
    properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        assunto: { type: 'string' },
        mensagem: { type: 'string' }
    }
}

module.exports = {
    bodyJsonSchema,
}