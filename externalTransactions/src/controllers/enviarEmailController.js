'use strict'

const log = require('../utils/logUtils');
const enviarEmailService = require('../services/enviarEmailService');

const enviarEmail = async (request, reply) => {
    log.info("Rota enviarEmail chamada.");

    const { email, assunto, mensagem } = request.body;
    const enviarEmailResult = await enviarEmailService.enviarEmail(email, assunto, mensagem);

    log.info(enviarEmailResult);

    return reply.status(enviarEmailResult.statusCode).send(enviarEmailResult.message);
};

module.exports = {
    enviarEmail,
};