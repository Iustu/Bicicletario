'use strict';

const axios = require('axios');
const { destrancarTranca, trancarTranca } = require('../src/apis/trancaStatusApi.js');

jest.mock('axios');

describe('mudarStatusTranca', () => {

    test('deve destrancar a tranca com sucesso', async () => {
      const idTranca = 1;
      const bicicletaId = 123;
      const responseStatus = 200;
      axios.post.mockResolvedValue({ status: responseStatus });
  
      const result = await destrancarTranca(idTranca, bicicletaId);
  
      expect(result).toEqual(responseStatus);
      expect(axios.post).toHaveBeenCalledWith(`https://gentle-bracelet-wasp.cyclic.app/tranca/${idTranca}/destrancar`, {
        idBicicleta: bicicletaId,
      });
    });

    test('deve lidar com falha na requisição para destrancar a tranca', async () => {
        const idTranca = 1;
        const bicicletaId = 123;
        const errorResponse = { message: 'Falha na requisição para destrancar a tranca' };
        axios.post.mockRejectedValue({ response: { data: errorResponse } });
    
        const result = await destrancarTranca(idTranca, bicicletaId);
    
        expect(result).toEqual(errorResponse);
        expect(axios.post).toHaveBeenCalledWith(`https://gentle-bracelet-wasp.cyclic.app/tranca/${idTranca}/destrancar`, {
          idBicicleta: bicicletaId,
        });
      });

    test('deve lidar com falha na requisição para trancar a tranca', async () => {
        const idTranca = 1;
        const bicicletaId = 123;
        const errorResponse = { message: 'Falha na requisição para destrancar a tranca' };
        axios.post.mockRejectedValue({ response: { data: errorResponse } });

        const result = await trancarTranca(idTranca, bicicletaId);

        expect(result.data.message).toEqual("Falha na requisição para destrancar a tranca");
        expect(axios.post).toHaveBeenCalledWith(`https://gentle-bracelet-wasp.cyclic.app/tranca/${idTranca}/trancar`, {
          idBicicleta: bicicletaId,
        });
      });
  
  });