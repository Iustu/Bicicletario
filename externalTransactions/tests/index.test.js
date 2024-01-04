'use strict'

const { build } = require('../src/app');

const {enviarEmail} = require('./enviarEmailMock');
const enviarEmailService = require('../src/services/enviarEmailService');

const app = build();

const callEnviarEmail = async (body) => {
    return await app.inject({
        method: 'POST',
        url: '/enviarEmail',
        body
    })
}

describe('Routes test', () => {

    test('Should return Hello World when call route', async () => {


        const response = await app.inject({
           method: "GET",
           url: "/helloWorld"
        });

        const expectedResponse = "Hello World";

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(expectedResponse);
    })

    test('Should return success when call enviarEmail route', async () => {
        enviarEmailService.enviarEmail = jest.fn().mockResolvedValueOnce({})

        const response = await callEnviarEmail(enviarEmail)

        expect(response.statusCode).toBe(200);
    })
})