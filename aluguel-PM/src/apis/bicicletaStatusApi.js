'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const bicicletaStatus = async (idBicicleta, acao) => {

    const body = {idBicicleta, acao}
    return axios.post(`https://gentle-bracelet-wasp.cyclic.app/bicicleta/${idBicicleta}/status/${acao}`, body)
        .then(response  => {
            log.info('Status da bicicleta alterado com sucesso');

            return response.data;
        }).catch(err => {
            log.error('Falha na requisição para alterar status bicicleta');

            return err.response.data;
        })
}

module.exports = {
    bicicletaStatus,
}