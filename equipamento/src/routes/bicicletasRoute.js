'use strict'

const bicicletaController = require('../controller/bicicletasController');

const routesBicicleta = async (fastify) => {

    fastify.get('/bicicleta', bicicletaController.getBicicletas);
    fastify.get('/bicicleta/:id', bicicletaController.getBicicletaById);
    fastify.post('/bicicleta', bicicletaController.criarBicicleta);
    fastify.delete('/bicicleta/:id', bicicletaController.removerBicicletaById);
    fastify.put('/bicicleta/:id', bicicletaController.atualizarBicicleta);
    fastify.post('/bicicleta/integrarNaRede',bicicletaController.integrarNaRede);
    fastify.post('/bicicleta/retirarDaRede',bicicletaController.retirarDaRede);
    fastify.put('/bicicleta/:id/status/:acao',bicicletaController.atualizarBicicletaStatus);
}

module.exports = routesBicicleta;