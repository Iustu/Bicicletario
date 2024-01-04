'use strict';

require('dotenv').config();

const { build } = require('./app');
const log = require('./utils/logUtils');

const server = build();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

server.listen({port: SERVER_PORT, host: "0.0.0.0"}, (err, address) => {
    if(err) {
        log.error(err);
        process.exit(1);
    }

    log.info(`Server listening on ${address}`);
});

