'use strict'

const { build } = require('../src/app');
const app = build();
const axios = require('axios');

const realizarCobrancaService = require('../src/services/realizarCobrancaService');
const {ciclistas, bodyRequest} = require('./cobrancaCiclistasMock');
const {enviarEmail} = require('../src/services/enviarEmailService');
jest.mock('../src/services/enviarEmailService');
const getCiclistasApi = require("../src/apis/getCiclistasApi");

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockRejectedValueOnce({ status: 500}),
    }),
}));

const callRealizarCobranca = async (body) => {
    return await app.inject({
        method: 'POST',
        url: '/cobranca',
        body
    })
};

describe('realizar cobrança tests', () => {

    test('Should return 200 when call cobrança route', async () => {
        const response = await callRealizarCobranca(bodyRequest);

        expect(response.statusCode).toBe(200);
    })

    test('Should return 422 when call cobrança route', async () => {
        enviarEmail.mockRejectedValueOnce({});
        const response = await callRealizarCobranca(bodyRequest);

        expect(response.statusCode).toBe(422);
        expect(response.body).toBe('Dados Inválidos');
    })

    test('Should return 422 when call cobrança route and getCiclistas fail', async () => {
        jest.mock('axios');
        axios.get = jest.fn().mockRejectedValue({
            response:
                {
                    status: 422,
                    data: "Error message."
                }
        });
        const response = await callRealizarCobranca(bodyRequest);

        expect(response.statusCode).toBe(422);
    })
})