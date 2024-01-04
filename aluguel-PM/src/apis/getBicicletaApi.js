'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const getBicicleta = async () => {

    return axios.get(`https://gentle-bracelet-wasp.cyclic.app/bicicleta`)
        .then(response  => {
            log.info('Requisição getBicicleta retornada com sucesso');

            return response.data;
        }).catch(err => {
            log.error('Falha no requisição lista de bicicletas');

            return err.response.data;
        })
}

const getBicicletaByID = async (idBicicleta) => {

    return axios.get(`https://gentle-bracelet-wasp.cyclic.app/bicicleta/${idBicicleta}`)
        .then(response  => {
            log.info('Requisição getBicicletaID retornada com sucesso');
            return response.data;
        }).catch(err => {
            log.error('Falha no requisição lista de bicicletas');

            return err.response.data;
        })
}

module.exports = {
    getBicicleta,
    getBicicletaByID
}