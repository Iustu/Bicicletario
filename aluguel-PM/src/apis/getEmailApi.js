'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const getEmail = async (email) => {

    return axios.get(`https://sore-jade-clownfish-veil.cyclic.app/ciclistas/existeEmail/${email}`)
        .then(response  => {
            log.info('Requisição de emails retornada com sucesso');

            return response.data;
        }).catch(err => {
            log.error('Falha no requisição lista de emails');

            return err.response.data;
        })
}

module.exports = {
    getEmail,
}