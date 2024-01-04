'use strict'

const novoCiclistaSchema = {
    type: 'object',
    required: ['nome', 'nascimento', 'cpf', 'nacionalidade', 'email', 'urlFotoDocumento'],
    properties: {
        nome: { type: 'string' },
        nascimento: { type: 'string', format: 'date' },
        cpf: { type: 'string', pattern: '\\d{11}' },
        passaporte: {
        type: 'object',
        properties: {
            numero: { type: 'string' },
            validade: { type: 'string', format: 'date' },
            pais: { type: 'string', pattern: '[A-Z]{2}' }
        },
        required: ['numero', 'validade', 'pais']
        },
        nacionalidade: { type: 'string', enum: ['BRASILEIRO', 'ESTRANGEIRO'] },
        email: { type: 'string', format: 'email' },
        urlFotoDocumento: { type: 'string', format: 'uri' }
    }
};

const ciclistaSchema = {
    type: 'object',
    required: ['id', 'status', 'nome', 'nascimento', 'cpf', 'nacionalidade', 'email', 'urlFotoDocumento'],
    properties: {
        id: { type: 'integer' },
        status: { type: 'string', enum: ['ATIVO', 'INATIVO', 'AGUARDANDO_CONFIRMACAO'] },
        nome: { type: 'string' },
        nascimento: { type: 'string', format: 'date' },
        cpf: { type: 'string', pattern: '\\d{11}' },

        passaporte: {
        type: 'object',
        properties: {
            numero: { type: 'string' },
            validade: { type: 'string', format: 'date' },
            pais: { type: 'string', pattern: '[A-Z]{2}' }
        },
        required: ['numero', 'validade', 'pais']
        },

        nacionalidade: { type: 'string', enum: ['BRASILEIRO', 'ESTRANGEIRO'] },
        email: { type: 'string', format: 'email' },
        urlFotoDocumento: { type: 'string', format: 'uri' }
    }
};

module.exports = {
    novoCiclistaSchema, ciclistaSchema,
}