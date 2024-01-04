'use strict'

const { build } = require('../src/app');
const app = build();
let { devedores } = require('../src/filaCobranca');
const { processaFilaCobrancas } = require('../src/services/processaCobrancasEmFilaService');
const getCiclistasApi = require('../src/apis/getCiclistasApi');

const callProcessarFila = async () => {
    return await app.inject({
        method: 'POST',
        url: '/processaCobrancasEmFila'
    })
};

describe('processar fila de cobrança tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Should return 200 when call /processaCobrancasEmFila - testa o fluxo todo', async () => {
        const response = await callProcessarFila();

        expect(response.statusCode).toBe(200);
    });

    test('Should return "Não há cobranças pendentes a serem feitas" when devedores array is empty', async () => {
        devedores.length = 0;
        const response = await processaFilaCobrancas();

        expect(response.statusCode).toBe(200);
        expect(response.message).toBe('Não há cobranças pendentes a serem feitas');
    });
});
