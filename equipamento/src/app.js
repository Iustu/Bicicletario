'use strict'

const fastify = require('fastify');
require('./routes/bicicletasRoute');
require('./routes/trancasRoute');
require('./routes/totensRoute');

const build = (opts = {}) => {
    const app = fastify(opts);

    app.register(require('./routes/bicicletasRoute'));
    app.register(require('./routes/trancasRoute'));
    app.register(require('./routes/totensRoute'));

    return app;
}

module.exports = {
    build,
}
