'use strict'

const cron = require('node-schedule');
const { build } = require('../src/app');
const app = build();
const log = require('../src/utils/logUtils');
const axios = require("axios");
const CRON = process.env.CRON || '0 */12 * * *';

const runCron = () => {
    return cron.scheduleJob(CRON, () => {
        callProcessarFila().then(r => log.info('Fila de cobranças processada')).catch(err => console.log(err));
    });
};

const callProcessarFila = async () => {
    return await app.inject({
        method: 'POST',
        url: '/processaCobrancasEmFila'
    })
};


module.exports = { runCron };
