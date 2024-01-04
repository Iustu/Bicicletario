'use strict'

const bodyJsonSchema = {
    type: 'object',
    required: ['nomeTitular', 'numero', 'validade', 'cvv'],
    properties: {
        nomeTitular: { type: 'string' },
        numero: { type: 'string' },
        validade: { type: 'string' },
        cvv: { type: 'string' }
    }
}

module.exports = {
    bodyJsonSchema,
}