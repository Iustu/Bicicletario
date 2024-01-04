'use strict'

let { filaCobranca } = require('../src/services/filaCobrancaService'); // Substitua pelo caminho correto para o arquivo
let { devedores } = require('../src/filaCobranca');
const { build } = require('../src/app');
const app = build();


const callIncluirCobrancaFila = async (body) => {
    return await app.inject({
        method: 'POST',
        url: '/filaCobranca',
        body
    })
};

describe('filaCobranca', () => {

    test('Should add a new debt to the queue and return success message', async () => {
        const valor = 100;
        const ciclista = 69;

        const response = await filaCobranca(valor, ciclista);

        expect(response.statusCode).toBe(200);
        expect(devedores.length).toBe(4);
        expect(devedores[3]).toEqual({ valor, ciclista });
    });

    test('Should return error message when invalid data is provided', async () => {
        const valor = undefined;
        const ciclista = 69;

        const response = await filaCobranca(valor, ciclista);

        expect(response.statusCode).toBe(422);
        expect(response.message).toBe('Dados Inválidos');
    });
    test('Should return 200 when call /filaCobranca ', async () => {
        filaCobranca = jest.fn().mockResolvedValueOnce({statusCode: 200, message: "ok"});
        const response = await callIncluirCobrancaFila({valor: "10", ciclista: "2"});

        expect(response.statusCode).toBe(200);
    });
});


