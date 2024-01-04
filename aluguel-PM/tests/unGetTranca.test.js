'use strict';

const axios = require('axios');
const { getTranca } = require('../src/apis/getTrancaApi.js');

jest.mock('axios');

describe('getTranca  test route API', () => {
  test('deve retornar os dados da tranca', async () => {
    const responseData = { id: 1, nome: 'Tranca A' };
    axios.get.mockResolvedValue({ data: responseData });

    const result = await getTranca();

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith('https://gentle-bracelet-wasp.cyclic.app/tranca');
  });

  test('deve lidar com falha na requisição', async () => {
    const errorResponse = { message: 'Falha na requisição' };
    axios.get.mockRejectedValue({ response: { data: errorResponse } });

    const result = await getTranca();

    expect(result).toEqual(errorResponse);
    expect(axios.get).toHaveBeenCalledWith('https://gentle-bracelet-wasp.cyclic.app/tranca');
  });
});
