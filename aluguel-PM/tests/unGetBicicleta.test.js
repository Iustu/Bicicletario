'use strict';

const axios = require('axios');
const { getBicicleta, getBicicletaByID } = require('../src/apis/getBicicletaApi.js');

jest.mock('axios');

describe('getBicicleta test route API', () => {

  test('deve retornar os dados da bicicleta', async () => {
    const responseData = { id: 1, nome: 'Bicicleta A' };
    axios.get.mockResolvedValue({ data: responseData });

    const result = await getBicicleta();

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith('https://gentle-bracelet-wasp.cyclic.app/bicicleta');
  });

  test('deve lidar com falha na busca', async () => {
    const errorResponse = { message: 'Erro na requisição' };
    axios.get.mockRejectedValue({ response: { data: errorResponse } });

    const result = await getBicicleta();

    expect(result).toEqual(errorResponse);
    expect(axios.get).toHaveBeenCalledWith('https://gentle-bracelet-wasp.cyclic.app/bicicleta');
  });

  test('deve retornar os dados da bicicleta pelo ID', async () => {
    const idBicicleta = 1;
    const responseData = { id: 1, nome: 'Bicicleta A' };
    axios.get.mockResolvedValue({ data: responseData });

    const result = await getBicicletaByID(idBicicleta);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(`https://gentle-bracelet-wasp.cyclic.app/bicicleta/${idBicicleta}`);
  });

  test('deve lidar com falha na requisição da bicicleta por ID', async () => {
    const idBicicleta = 1;
    const errorResponse = { message: 'Erro na requisição' };
    axios.get.mockRejectedValue({ response: { data: errorResponse } });

    const result = await getBicicletaByID(idBicicleta);

    expect(result).toEqual(errorResponse);
    expect(axios.get).toHaveBeenCalledWith(`https://gentle-bracelet-wasp.cyclic.app/bicicleta/${idBicicleta}`);
  });
  
});
