'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const cobranca = async (valor, ciclista) => {

    const body = {valor, ciclista}
    return axios.post('https://gentle-bee-shrug.cyclic.app/cobranca', body)
        .then(response  => {
            log.info('Pedido de cobranca realizado');

            return response;
        }).catch(err => {
            log.error('Falha no pedido de cobranca');

            return err.response;
        })
}

module.exports = {
    cobranca,
}