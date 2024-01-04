'use strict'

const realizarCobranca = async (request, reply) => {

    return reply.send(200).message();
};

const processarCobrancasEmFila = async (request, reply) => {

    return reply.send(200).message();
};

const incluirCobrancaNaFila = async (request, reply) => {

    return reply.send(200).message();
};

const obterCobranca = async (request, reply) => {

    return reply.send(200).message();
};

module.exports = {
    realizarCobranca,
    processarCobrancasEmFila,
    incluirCobrancaNaFila,
    obterCobranca,
}