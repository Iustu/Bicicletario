'use strict'

const trancaController = require('../controller/trancasController');

const routesTranca = async (fastify) => {

    fastify.get('/tranca', trancaController.getTrancas);
    fastify.get('/tranca/:id', trancaController.getTrancaById);
    fastify.post('/tranca', trancaController.criarTranca);
    fastify.delete('/tranca/:id', trancaController.removerTrancaById);
    fastify.put('/tranca/:id', trancaController.atualizarTranca);
    fastify.put('/tranca/:id/trancar', trancaController.trancarEndpoint);
    fastify.put('/tranca/:id/destrancar', trancaController.destrancarEndpoint);
    fastify.put('/tranca/:id/status/:acao',trancaController.atualizarTrancaStatus);
    fastify.post('/tranca/integrarNaRede', trancaController.integrarNaRede);
    fastify.post('/tranca/removerDaRede', trancaController.removerDaRede);

}

module.exports = routesTranca;