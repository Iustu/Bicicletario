'use strict'

const erroSschema = {
    type: 'object',
    required: ['codigo', 'mensagem'],
    properties: {
      codigo: { type: 'string' },
      mensagem: { type: 'string' }
    },
  };