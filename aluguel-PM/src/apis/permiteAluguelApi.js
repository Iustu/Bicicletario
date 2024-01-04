'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const getPermiteAluguel = async (idCiclista) => {


    return axios.get(`https://sore-jade-clownfish-veil.cyclic.app/ciclistas/${idCiclista}/permiteAluguel`)
        .then(response  => {
            log.info('Requisição permiteAluguel retornada com sucesso');
            return response.data;
        }).catch(err => {
            log.error('Falha na requisição permiteAluguel');
            return err.response.data;
        })
}

module.exports = {
    getPermiteAluguel,
}