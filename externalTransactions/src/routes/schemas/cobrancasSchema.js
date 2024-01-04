'use strict'

const cobrancaSchema = {
    type: 'object',
    required: ['valor', 'ciclista'],
    properties: {
        valor: { type: 'number' },
        ciclista: { type: 'number' },
    }
};

const processaCobrancasSchema = {
    type: 'array',
    properties: [{
        id: { type: 'number' },
        status: { type: 'string' },
        horaSolicitacao: { type: 'string' },
        horaFinalizacao: { type: 'string' },
        valor: { type: 'number' },
        ciclista: { type: 'number' },}
    ]
};

module.exports = {
    cobrancaSchema,
    processaCobrancasSchema,

}

