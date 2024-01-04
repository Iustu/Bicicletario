'use strict'

const novaDevolucaoSchema = {
    type: 'object',
    required: ['ciclista', 'trancaFim'],
    properties: {
      ciclista: { type: 'integer' },
      trancaFim: { type: 'integer' }
    },
};

const devolucaoSchema = {
    type: 'object',
    required: ['bicicleta', 'horaInicio', 'trancaFim', 'horaFim', 'cobranca', 'ciclista'],
    properties: {
        bicicleta: { type: 'integer' },
        horaInicio: { type: 'string', format: 'date-time' },
        trancaFim: { type: 'integer' },
        horaFim: { type: 'string', format: 'date-time' },
        cobranca: { type: 'integer' },
        ciclista: { type: 'integer' }
    },
};
      

module.exports = {
    novaDevolucaoSchema, devolucaoSchema,
}