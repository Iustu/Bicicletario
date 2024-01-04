'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const getCiclistas = async () => {
    console.log("Chamando função getCiclistas");
    return axios.get(`https://sore-jade-clownfish-veil.cyclic.app/ciclistas`)
        .then(response  => {
            log.info({
                statusCode: response.status,
                statusMessage: response.statusText
                }, 'Requisição retornada com sucesso');
            return response;
        }).catch(err => {
            log.error({
                statusCode: err.response.status,
                statusMessage: err.response.data
            },'Falha na requisição lista de ciclistas');
            return err.response;
        })
}

module.exports = {
    getCiclistas,
}