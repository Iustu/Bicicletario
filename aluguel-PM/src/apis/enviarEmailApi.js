'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const enviarEmail = async (email, assunto, mensagem) => {

    const body = {email, assunto, mensagem}
    return axios.post('https://gentle-bee-shrug.cyclic.app/enviarEmail', body)
        .then(response  => {
            log.info('Pedido de email realizado');

            return response;
        }).catch(err => {
            log.error('Falha no pedido de email');

            return err.response;
        })
}

module.exports = {
    enviarEmail,
}