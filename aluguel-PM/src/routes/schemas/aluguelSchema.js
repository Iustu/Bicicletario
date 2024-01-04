'use strict'

const novoAluguelSchema = {
    type: 'object',
    required: ['ciclista', 'trancaInicio'],
    properties: {
      ciclista: { type: 'integer' },
      trancaInicio: { type: 'integer' }
    },
};

const aluguelSchema = {
    type: 'object',
    required: ['bicicleta', 'horaInicio', 'trancaFim', 'horaFim', 'cobranca', 'ciclista', 'trancaInicio'],
    properties: {
      bicicleta: { type: 'integer' },
      horaInicio: { type: 'string', format: 'date-time' },
      trancaFim: { type: 'integer' },
      horaFim: { type: 'string', format: 'date-time' },
      cobranca: { type: 'integer' },
      ciclista: { type: 'integer' },
      trancaInicio: { type: 'integer' }
    },
  };

module.exports = {
    novoAluguelSchema, aluguelSchema,
}