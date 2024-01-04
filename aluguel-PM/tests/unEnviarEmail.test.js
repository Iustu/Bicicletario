'use strict';

const enviarEmailApi = require ('../src/apis/enviarEmailApi.js')

const axios = require('axios');
jest.mock('axios');

describe('ENVIAREMAILAPI Test route test', () => {

    test ('Should return success when email is sent', async () => {
        axios.post = jest.fn().mockResolvedValue({});
        await expect(enviarEmailApi.enviarEmail("contatojlira@gmail.com", "Bike", "Bike")).resolves.not.toThrow();
    });

    test ('Should return error when email is not sent', async () => {
        axios.post = jest.fn().mockRejectedValue({response:
            {
                status: 404,
                data: "Error message."
            }
        });
        const response = await enviarEmailApi.enviarEmail("contatojlira@gmail.com", "Bike", "Bike");
        expect(response.status).toBe(404);
    });
    
  });