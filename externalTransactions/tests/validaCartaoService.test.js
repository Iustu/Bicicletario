'use strict'

const cardValidator = require('card-validator');
const { build } = require('../src/app');
const app = build();

const callValidarCartao = async (body) => {
    return await app.inject({
        method: 'POST',
        url: '/validaCartaoDeCredito',
        body
    })
}

const request = {
    "nomeTitular": "Mariana Massine",
    "numero": "1234123412341234",
    "validade": "06/27",
    "cvv": "123"
}

describe('Credit Card Validation', () => {

    test('Valid credit card', async () => {
        cardValidator.number = jest.fn().mockReturnValueOnce({isValid: true});
        cardValidator.expirationDate = jest.fn().mockReturnValueOnce({ isValid: true });
        cardValidator.cvv = jest.fn().mockReturnValueOnce({ isValid: true });


        const response = await callValidarCartao(request);

        expect(response.body).toBe("Cartão válido");
        expect(cardValidator.number).toHaveBeenCalledWith('1234123412341234');
        expect(cardValidator.expirationDate).toHaveBeenCalledWith('06/27');
        expect(cardValidator.cvv).toHaveBeenCalledWith('123');
    });

    test('Invalid credit card number', async () => {
        cardValidator.number = jest.fn().mockReturnValueOnce({isValid: false});
        cardValidator.expirationDate = jest.fn().mockReturnValueOnce({ isValid: true });
        cardValidator.cvv = jest.fn().mockReturnValueOnce({ isValid: true });


        const response = await callValidarCartao(request);

        expect(response.body).toBe("Dados Inválidos");
    });
});
