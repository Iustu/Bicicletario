'use strict'

const log = require('../utils/logUtils');
const realizarCobrancaService = require('../services/realizarCobrancaService');
const historicoCobrancas = require('../historicoCobrancas');
const filaCobrancaService = require("../services/filaCobrancaService");
const { processaFilaCobrancas } = require("../services/processaCobrancasEmFilaService");

const realizarCobranca = async (request, reply) => {
    log.info("Rota cobrança chamada");

    const { valor, ciclista } = request.body;
    const cobrancaResult = await realizarCobrancaService.realizarCobranca(valor, ciclista);

    return reply.status(cobrancaResult.statusCode).send(cobrancaResult.message);
};

const processarCobrancasEmFila = async (request, reply) => {

    const processamentoResult = await processaFilaCobrancas();
    return reply.status(processamentoResult.statusCode).send(processamentoResult.message);
};

const incluirCobrancaNaFila = async (request, reply) => {

    const { valor, ciclista } = request.body;
    const inclusaoResult = await filaCobrancaService.filaCobranca(valor, ciclista);

    return reply.status(inclusaoResult.statusCode).send(inclusaoResult.message);
};

const obterCobranca = async (request, reply) => {

    const cobrancaId = request.params.id;

    const cobrancaCiclista = historicoCobrancas.cobrancas.find(c => c.id === cobrancaId);
    if(cobrancaCiclista === undefined){
        return reply.status(404).send('Cobrança não encontrada');
    } else {
        return reply.status(200).send(cobrancaCiclista);
    }
};

module.exports = {
    realizarCobranca,
    processarCobrancasEmFila,
    incluirCobrancaNaFila,
    obterCobranca,
}