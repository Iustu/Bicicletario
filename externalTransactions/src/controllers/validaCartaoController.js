'use strict'

const log = require('../utils/logUtils');
const validaCartaoService = require('../services/validaCartaoService');

const validarCartao = async (request, reply) => {
    log.info('Rota validarCartão chamada');

    const { numero, validade, cvv } = request.body;

    const validarCartaoResponse = await validaCartaoService.validarCartao(numero, validade, cvv);

    return reply.status(validarCartaoResponse.statusCode).send(validarCartaoResponse.message);
};

module.exports = {
    validarCartao,
};
