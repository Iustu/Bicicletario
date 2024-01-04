'use strict';

const filaCobranca = require ('../src/apis/filaCobrancaApi.js')
const axios = require('axios');
jest.mock('axios');

describe('filaCobranca Test route test', () => {

    test ('Should return success', async () => {
        axios.post = jest.fn().mockResolvedValue({statusCode: 200, message: "ok"});
        await expect(filaCobranca.filaCobranca({valor: "10", ciclista: "2"})).resolves.not.toThrow();
    });

    test('Should return failure', async () => {
        axios.post = jest.fn().mockRejectedValue({ statusCode: 404, message: 'Error message' });
        await expect(filaCobranca.filaCobranca({ valor: '10', ciclista: '2' })).rejects.toThrow();
      });

});