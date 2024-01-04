'use strict'

let { filaCobranca } = require('../src/services/filaCobrancaService'); // Substitua pelo caminho correto para o arquivo
let { devedores } = require('../src/filaCobranca');
const { build } = require('../src/app');
const app = build();


const callObterCobranca = async (id) => {
    return await app.inject({
        method: 'GET',
        url: `/cobranca/${id}`,
    })
};

describe('obter Cobranca', () => {

    test('Should return 200 when call /cobranca/:id ', async () => {
        const response = await callObterCobranca("a51a7021-d567-45aa-a6fb-38d81f95c08a");

        expect(response.statusCode).toBe(200);
    });

    test('Should return 404 when call /cobranca/:id and dont find cobranca', async () => {
        const response = await callObterCobranca("4");

        expect(response.statusCode).toBe(404);
    });
});