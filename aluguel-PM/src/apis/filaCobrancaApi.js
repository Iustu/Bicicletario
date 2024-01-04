'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const filaCobranca = async (valor, ciclista) => {

    const body = {valor, ciclista}
    return axios.post('https://gentle-bee-shrug.cyclic.app/filaCobranca', body)
        .then(response  => {
            log.info('Adicionado na fila de cobranca com sucesso');

            return response;
        }).catch(err => {
            log.error('Falha no pedido de adicionar na fila de cobranca');

            return err.response.data;
        })
}

module.exports = {
    filaCobranca,
}