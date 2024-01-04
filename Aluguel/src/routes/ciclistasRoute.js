'use strict'

const ciclistasController = require('../controller/ciclistasController');

const routesCiclista = async (fastify) => {

    fastify.get('/ciclistas', ciclistasController.getCiclistas);
    fastify.post('/ciclistas', ciclistasController.criarCiclista);
    fastify.get('/ciclistas/:id', ciclistasController.getCiclistaById);
    fastify.put('/ciclistas/:id', ciclistasController.atualizarCiclista);
    fastify.post('/ciclistas/:id/ativar', ciclistasController.ativarCadastroCiclista);
    fastify.get('/ciclistas/:id/permite-aluguel', ciclistasController.permiteAluguel);
    fastify.get('/ciclistas/:id/cartao-credito', ciclistasController.getCartaoCredito);
    fastify.put('/ciclistas/:id/atualizar-cartao', ciclistasController.atualizarCartaoCredito);
    
}

module.exports = routesCiclista;