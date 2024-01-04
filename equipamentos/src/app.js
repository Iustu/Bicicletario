'use strict'

const fastify = require('fastify');

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(require('./routes/helloWorldRoute'));

    return app;
}

module.exports = {
    build,
}