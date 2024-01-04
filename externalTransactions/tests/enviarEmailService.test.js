'use strict'

const { bodyEnviarEmail } = require('./enviarEmailMock');
const { build } = require('../src/app');
const app = build();

const axios = require('axios');
jest.mock('axios');

const nodemailer = require('nodemailer');
jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockResolvedValueOnce({ status: 200}),
    }),
}));

const callEnviarEmail = async (body) => {
    return await app.inject({
        method: 'POST',
        url: '/enviarEmail',
        body
    })
};

describe('enviarEmail and hello world tests', () => {
    test('Should return Hello World when call route', async () => {
        const response = await app.inject({
           method: "GET",
           url: "/helloWorld"
        });

        const expectedResponse = "Hello World";

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(expectedResponse);
    })

    test('Should return 200 when call enviarEmail route', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({status:200, data: { is_verified: 'True'}});
        const response = await callEnviarEmail(bodyEnviarEmail);

        expect(response.statusCode).toBe(200);
    })

    test('Should return 404 when email is not valid', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({status:200, data: { is_verified: 'False'}});
        const response = await callEnviarEmail(bodyEnviarEmail);

        expect(response.statusCode).toBe(404);
    })

    test('Should return 500 when the sendMail api returns error', async () => {
        nodemailer.createTransport.mockReturnValue({sendMail: jest.fn().mockRejectedValueOnce({ status: 503})});
        axios.get = jest.fn().mockResolvedValueOnce({status:200, data: { is_verified: 'True'}});

        const response = await callEnviarEmail(bodyEnviarEmail);

        expect(response.statusCode).toBe(500);
    })

    test('Should return error message when verifyEmail api returns error', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({status:500});

        const response = await callEnviarEmail(bodyEnviarEmail);

        expect(response.statusCode).toBe(500);
    })

    test('Should return 422 when email format is not valid', async () => {
        axios.get = jest.fn().mockResolvedValueOnce({status:200, data: { is_syntax: 'False'}});
        const response = await callEnviarEmail(bodyEnviarEmail);

        expect(response.statusCode).toBe(422);
    })
})