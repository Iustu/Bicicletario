'use strict';

const axios = require('axios');
const log = require('../utils/logUtils');

const validaCartaoDeCredito = async (nomeTitular, numero, validade, cvv) => {
    
    const body = {nomeTitular, numero, validade, cvv}
    return axios.post('https://gentle-bee-shrug.cyclic.app/validaCartaoDeCredito', body)
        .then(response  => {
            log.info('Pedido para validar cartao de credito realizado');
          
            return response;
        }).catch(err => {
            log.error('Falha no pedido para validar cartao de credito');
           
            return err.response;
        })
}

module.exports = {
    validaCartaoDeCredito,
}