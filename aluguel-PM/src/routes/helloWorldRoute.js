'use strict'


const routes = async (fastify) => {
    fastify.get('/helloWorld', (request, reply) => {
        reply.send('Hello World');     
    })
}

module.exports = routes;