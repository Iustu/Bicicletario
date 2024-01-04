'use strict';

const axios = require('axios');
const { getEmail } = require('../src/apis/getEmailApi.js');

jest.mock('axios');

describe('getEmailApi test route API', () => {

  test('deve retornar os dados de email', async () => {
    const email = 'teste@example.com';
    const responseData = { exists: true };
    axios.get.mockResolvedValue({ data: responseData });

    const result = await getEmail(email);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(`https://sore-jade-clownfish-veil.cyclic.app/ciclistas/existeEmail/${email}`);
  });

  test('deve lidar com falha na requisição', async () => {
    const email = 'teste@example.com';
    const errorResponse = { message: 'Falha na requisição' };
    axios.get.mockRejectedValue({ response: { data: errorResponse } });

    const result = await getEmail(email);

    expect(result).toEqual(errorResponse);
    expect(axios.get).toHaveBeenCalledWith(`https://sore-jade-clownfish-veil.cyclic.app/ciclistas/existeEmail/${email}`);
  });
  
});
