'use strict'

const emailSchema = require('./schemas/emailSchema');
const emailService = require('../services/enviarEmailService');

//Todo:
//ver o que tem que fixar exposto ou nao
//POST /enviarEmail -done
//POST /cobranca
//POST /processaCobrancasEmFila
//POST /filaCobranca
//GET /cobranca/{idCobranca}
//POST /validaCartaoDeCredito



const routes = async (fastify) => {
    fastify.post('/enviarEmail', emailSchema, emailService.enviarEmail)
}

module.exports = routes;