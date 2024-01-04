'use strict';

const axios = require('axios');
const { getPermiteAluguel } = require('../src/apis/permiteAluguelApi.js');

jest.mock('axios');

describe('permiteAluguel test route API', () => {
    
  test('deve retornar o status de permissão de aluguel', async () => {
    const idCiclista = 1;
    const responseData = { permiteAluguel: true };
    axios.get.mockResolvedValue({ data: responseData });

    const result = await getPermiteAluguel(idCiclista);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(`https://sore-jade-clownfish-veil.cyclic.app/ciclistas/${idCiclista}/permiteAluguel`);
  });

  test('deve lidar com falha na requisição', async () => {
    const idCiclista = 1;
    const errorResponse = { message: 'Falha na requisição permiteAluguel' };
    axios.get.mockRejectedValue({ response: { data: errorResponse } });

    const result = await getPermiteAluguel(idCiclista);

    expect(result).toEqual(errorResponse);
    expect(axios.get).toHaveBeenCalledWith(`https://sore-jade-clownfish-veil.cyclic.app/ciclistas/${idCiclista}/permiteAluguel`);
  });

});
