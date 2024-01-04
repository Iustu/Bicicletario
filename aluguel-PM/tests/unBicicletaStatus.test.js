'use strict';

const axios = require('axios');
const { bicicletaStatus } = require('../src/apis/bicicletaStatusApi.js');

jest.mock('axios');

describe('bicicletaStatusApi', () => {

  test('deve alterar o status da bicicleta com sucesso', async () => {
    const idBicicleta = 1;
    const acao = 'em_manutencao';
    const responseData = { status: 'success', message: 'Status da bicicleta alterado com sucesso' };
    axios.post.mockResolvedValue({ data: responseData });

    const result = await bicicletaStatus(idBicicleta, acao);

    expect(result).toEqual(responseData);
    expect(axios.post).toHaveBeenCalledWith(`https://gentle-bracelet-wasp.cyclic.app/bicicleta/${idBicicleta}/status/${acao}`, {
      idBicicleta,
      acao,
    });
  });

  test('deve lidar com falha na requisição para alterar o status da bicicleta', async () => {
    const idBicicleta = 1;
    const acao = 'em_manutencao';
    const errorResponse = { message: 'Falha na requisição para alterar status bicicleta' };
    axios.post.mockRejectedValue({ response: { data: errorResponse } });

    const result = await bicicletaStatus(idBicicleta, acao);

    expect(result).toEqual(errorResponse);
    expect(axios.post).toHaveBeenCalledWith(`https://gentle-bracelet-wasp.cyclic.app/bicicleta/${idBicicleta}/status/${acao}`, {
      idBicicleta,
      acao,
    });
  });
  
});
