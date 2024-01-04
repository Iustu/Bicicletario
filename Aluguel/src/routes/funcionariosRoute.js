'use strict'

const funcionariosController = require('../controller/funcionariosController');

const routesFuncionario = async (fastify) => {
    
    fastify.get('/funcionarios', funcionariosController.getFuncionarios);
    fastify.post('/funcionarios', funcionariosController.criarFuncionario);
    fastify.get('/funcionarios/:id', funcionariosController.getFuncionarioById);
    fastify.put('/funcionarios/:id', funcionariosController.atualizarFuncionario);
    fastify.delete('/funcionarios/:id',funcionariosController.removerFuncionario);
    
}

module.exports = routesFuncionario;