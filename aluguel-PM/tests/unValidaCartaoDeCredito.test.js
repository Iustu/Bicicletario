'use strict';

const validaCartaoDeCredito = require ('../src/apis/validaCartaoDeCreditoApi.js')
const axios = require('axios');
jest.mock('axios');

describe('validaCartaoDeCredito Test route test', () => {

    test ('Should return success', async () => {
        const nomeTitular = "nome";
        const numero = "4242424242424242";
        const validade = "2024-05";
        const cvv = 305;
        axios.post = jest.fn().mockResolvedValue({statusCode: 200, message: "ok"});
        await expect(validaCartaoDeCredito.validaCartaoDeCredito({nomeTitular, numero, validade, cvv})).resolves.not.toThrow();
    });

});