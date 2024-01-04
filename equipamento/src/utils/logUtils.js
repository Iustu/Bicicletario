'use strict'

const fastify = require('fastify')({
    logger: {
        level: "info",
        messageKey: "message",
        timestamp: () => `, "timestamp":"${new Date(Date.now()).toISOString()}"`
    }
});

module.exports = fastify.log;