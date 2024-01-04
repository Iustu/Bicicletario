'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const getTranca = async () => {

    return axios.get(`https://gentle-bracelet-wasp.cyclic.app/tranca`)
        .then(response  => {
            log.info('Requisição de tranca retornada com sucesso');

            return response.data;
        }).catch(err => {
            log.error('Falha no requisição lista de trancas');

            return err.response.data;
        })
}

module.exports = {
    getTranca,
}