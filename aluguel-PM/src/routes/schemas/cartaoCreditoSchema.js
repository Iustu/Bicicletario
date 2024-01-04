'use strict'

const novoCartaoDeCreditoSchema = {
    type: 'object',
    required: ['nomeTitular', 'numero', 'validade', 'cvv'],
    properties: {
      nomeTitular: { type: 'string' },
      numero: { type: 'string', pattern: '\\d+' },
      validade: { type: 'string', format: 'date' },
      cvv: { type: 'string', pattern: '\\d{3,4}' }
    },
};

const cartaoDeCreditoschema = {
    type: 'object',
    required: ['nomeTitular', 'numero', 'validade', 'cvv'],
    properties: {
      id: { type: 'integer' },
      nomeTitular: { type: 'string' },
      numero: { type: 'string', pattern: '\\d+' },
      validade: { type: 'string', format: 'date' },
      cvv: { type: 'string', pattern: '\\d{3,4}' }
    },
  };

module.exports = {
    novoCartaoDeCreditoSchema, cartaoDeCreditoschema
}