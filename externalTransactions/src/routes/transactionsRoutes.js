'use strict'

const emailSchema = require('./schemas/emailSchema');
const emailController = require('../controllers/enviarEmailController');
const validaCartaoSchema = require('./schemas/validaCartaoSchema');
const validaCartaoController = require('../controllers/validaCartaoController');
const { cobrancaSchema, processaCobrancasSchema } = require('./schemas/cobrancasSchema');
const cobrancasController = require('../controllers/cobrancasController');

const routes = async (fastify) => {
    fastify.post('/enviarEmail', emailSchema, emailController.enviarEmail);
    fastify.post('/cobranca', cobrancaSchema, cobrancasController.realizarCobranca);
    fastify.post('/processaCobrancasEmFila', processaCobrancasSchema, cobrancasController.processarCobrancasEmFila);
    fastify.post('/filaCobranca', cobrancaSchema, cobrancasController.incluirCobrancaNaFila);
    fastify.get('/cobranca/:id',  cobrancasController.obterCobranca);
    fastify.post('/validaCartaoDeCredito', validaCartaoSchema, validaCartaoController.validarCartao);
};

module.exports = routes;



