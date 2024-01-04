'use strict'

const log = require('../utils/logUtils');
const cardValidator = require('card-validator');

const validarCartao = async (numero, validade, cvv) => {
    log.info('Iniciando a função validarCartao');

    const cardNumberValidation = cardValidator.number(numero);
    const expirationDateValidation = cardValidator.expirationDate(validade);
    const cvvValidation = cardValidator.cvv(cvv);

    const responses = {
        cardNumberValidation,
        expirationDateValidation,
        cvvValidation
    }

    console.log("Responses: ", responses);

    if (!cardNumberValidation.isValid || !expirationDateValidation.isValid || !cvvValidation.isValid) {
        return { statusCode: 422, message: "Dados Inválidos" };
    }

    return { statusCode: 200, message: "Cartão válido" };
};

module.exports = {
    validarCartao,
};
