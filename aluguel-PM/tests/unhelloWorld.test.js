'use strict'

const { build } = require('../src/app');

describe('Hello World route test', () => {

    test('Should return Hello World when call route', async () => {
        const app = build();

        const response = await app.inject({
           method: "GET",
           url: "/helloWorld"
        });

        const expectedResponse = "Hello World";

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(expectedResponse);
    })
})