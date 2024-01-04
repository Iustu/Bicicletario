'use strict'

const totemController = require('../controller/totensController');

const routesTotem = async (fastify) => {

    fastify.get('/totem', totemController.getTotens);
    fastify.get('/totem/:id', totemController.getTotemById);
    fastify.post('/totem', totemController.criarTotem);
    fastify.delete('/totem/:id', totemController.removerTotemById);
    fastify.put('/totem/:id', totemController.atualizarTotem);
    fastify.get('/totem/:id/trancas', totemController.retornaTrancaTotem);
    fastify.get('/totem/:id/bicicletas', totemController.retornaBicicletaTotem);

}

module.exports = routesTotem;