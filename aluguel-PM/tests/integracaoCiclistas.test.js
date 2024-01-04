'use strict';

const { build } = require('../src/app');
const {
  bodyCiclista, bodyCiclistaSemCampoNACIONALIDADE, bodyDadosAtualizados
} = require("./ciclistaMock");
const app = build();
const axios = require('axios');
const { criarCiclista } = require('../src/controller/ciclistasController.js');
const getEmailApi = require('../src/apis/getEmailApi.js');
const validaCartaoDeCreditoApi = require('../src/apis/validaCartaoDeCreditoApi.js');
const enviarEmailApi = require('../src/apis/enviarEmailApi.js');
const getTrancaApi = require("../src/apis/getTrancaApi");

const callCriarCiclista = async (body) => {
  return await app.inject({
    method: 'POST',
    url: '/ciclistas',
    payload: body
  })
};

const callGetCiclistas = async () => {
  return await app.inject({
    method: 'GET',
    url: '/ciclistas'
  })
}

describe('atualizarCartaoCredito route test', () => {
  const callAtualizarCartao = async (body, id) => {
    return await app.inject({
      method: 'PUT',
      url: `/cartaoDeCredito/${id}`,
      payload: body
    })
  };

  test('Should update the credit card information of a cyclist', async () => {

    const response = await callAtualizarCartao({
      nomeTitular: 'Novo nome',
      numero: '4242424242424242',
      validade: '2024-12',
      cvv: '456',
    }, 6)

    expect(response.statusCode).toBe(200);
  });

  test('Should return 404 if cyclist is not found', async () => {

    const response = await callAtualizarCartao({
      nomeTitular: 'Novo nome',
      numero: '4242424242424242',
      validade: '2024-12',
      cvv: '456',
    }, 32)

    expect(response.statusCode).toBe(404);
  });

  test('Should return 422 if the credit card is not valid', async () => {
    const response = await callAtualizarCartao({
      nomeTitular: 'Novo nome',
      numero: '987654343',
      validade: '2024-12',
      cvv: '456',
    }, 6)

    expect(response.statusCode).toBe(422);
  });

  test('Should return 404 if the email is invalid', async () => {
    const response = await callAtualizarCartao({
      nomeTitular: 'Novo nome',
      numero: '4242424242424242',
      validade: '2024-12',
      cvv: '456',
    }, 1)

    expect(response.statusCode).toBe(404);
    expect(response.body).toBe("Email inválido. Email não enviado.");
  });
});

describe('atualizarCiclista route test', () => {
  const callAtualizarCiclista = async (body, id) => {
    return await app.inject({
      method: 'PUT',
      url: `/ciclistas/${id}`,
      payload: body
    })
  };
  test('Should update cyclist when valid data is provided', async () => {

    const response = await callAtualizarCiclista(bodyDadosAtualizados, 4);

    expect(response.statusCode).toBe(200);
  });


  test('deve retornar 404 se o ciclista não for encontrado', async () => {

    const response = await callAtualizarCiclista(bodyDadosAtualizados, 34);

    expect(response.statusCode).toBe(404);
    expect(response.body).toBe('Ciclista não encontrado');
  });

  test('deve retornar 422 se os dados atualizados forem inválidos', async () => {
    const response = await callAtualizarCiclista(bodyCiclistaSemCampoNACIONALIDADE, 4);

    expect(response.statusCode).toBe(422);
    expect(response.body).toBe('Dados inválidos. Preencha todos os campos obrigatórios corretamente.');
  });
});

describe('getCiclistas route test', () => {

  test('Should return the list of cyclists when called', async () => {
    const response = await callGetCiclistas();

    expect(response.statusCode).toBe(200);
  });

  test('Should return error when wrong url called', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/ciclista'
    });

    expect(response.statusCode).toBe(404);
  });

});

describe('criarCiclista route test', () => {
  
  test('deve criar um novo ciclista com sucesso', async () => {
    const app = build();

    const response = await app.inject({
      method: 'POST',
      url: '/ciclistas',
      payload: {
        "id": "9",
        "nome": "Paulo",
        "nascimento": "2023-06-11",
        "cpf": "1111111111",
        "passaporte": {
          "numero": "string",
          "validade": "2023-06-11",
          "pais": "pt"
        },
        "nacionalidade": "PT",
        "email": "contatojlira@gmail.com",
        "urlFotoDocumento": "string",
        "senha": "string",
        "confirmarSenha": "string",
        "meioDePagamento": {
          "nomeTitular": "ana",
          "numero": "4242424242424242",
          "validade": "2024-05",
          "cvv": "305"
        },
        "ativo": false,
        "statusAluguel": false
      }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual(expect.objectContaining({
        "nome": "Paulo",
        "nascimento": "2023-06-11",
        "cpf": "1111111111",
        "passaporte": {
          "numero": "string",
          "validade": "2023-06-11",
          "pais": "pt"
        },
        "nacionalidade": "PT",
        "email": "contatojlira@gmail.com",
        "urlFotoDocumento": "string",
        "senha": "string",
        "confirmarSenha": "string",
        "meioDePagamento": {
          "nomeTitular": "ana",
          "numero": "4242424242424242",
          "validade": "2024-05",
          "cvv": "305"
        },
        "ativo": false,
        "statusAluguel": false
    }));
  });

  test('deve criar um novo ciclista com sucesso', async () => {

    const reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    getEmailApi.getEmail = jest.fn().mockResolvedValue({ data: { exists: true } });
    validaCartaoDeCreditoApi.validaCartaoDeCredito = jest.fn().mockResolvedValue({ statusCode: 200, message: "ok" });
    enviarEmailApi.enviarEmail = jest.fn().mockResolvedValue({});

    await criarCiclista(bodyCiclista, reply);

    expect(reply.status).toHaveBeenCalled();
  });

  test('deve lidar com falha na chamada da API getEmailApi', async () => {

    const reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    getEmailApi.getEmail = jest.fn().mockRejectedValue(new Error('Falha na chamada da API getEmailApi'));
    validaCartaoDeCreditoApi.validaCartaoDeCredito = jest.fn().mockResolvedValue({ statusCode: 200, message: "ok" });
    enviarEmailApi.enviarEmail = jest.fn().mockResolvedValue({});

    await criarCiclista(bodyCiclista, reply);

    expect(reply.status).toHaveBeenCalledWith(404);
    expect(reply.send).toHaveBeenCalledWith('Requisição mal formada. Dados não fornecidos.');
  });

  test('Should return 404 erro when no data is provided', async () => {
    const response = await callCriarCiclista(undefined);
    expect(response.statusCode).toBe(404);
  });

});

describe('getCiclistaByID route test', () => {

  test('Should return 200 when search get ciclista', async () => {
    const app = build();

    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/1',
      payload: {
        id: "1",
      }});

    expect(response.statusCode).toBe(200);
  });

  test('Should return error 422 when search wrong id ciclista', async () => {
    const app = build();

    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/10',
      payload: {
        id: 10
      }});

    expect(response.statusCode).toBe(422);
  });

  test('Should return error 404 when wrong url called', async () => {
    const app = build();

    const response = await app.inject({
      method: 'GET',
      url: '/ciclista'
    });

    expect(response.statusCode).toBe(404);
  });

});

describe('ativarCadastroCiclista route test', () => {

  test('Should activate a cyclist when valid ID is provided and cyclist is not active', async () => {
    const app = build();
    const response = await app.inject({
      method: 'POST',
      url: '/ciclistas/1/ativar',
      payload: {
        ativo: true
      }
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return success if cyclist is active', async () => {
    const app = build();
    const response = await app.inject({
      method: 'POST',
      url: '/ciclistas/1/ativar',
      payload: {
        ativo: true
      }
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return 404 when invalid ID is provided', async () => {
    const app = build();
    const response = await app.inject({
      method: 'PUT',
      url: '/ciclistas/50/ativar',
    });
    expect(response.statusCode).toBe(404);
  });

});

describe('permiteAluguel route test', () => {

  test('Should allow rental for an active cyclist SEM ALUGUEL EM ANDAMENTO', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/3/permiteAluguel',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return 404 for non-existent cyclist', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/20/permiteAluguel',
    });
    expect(response.statusCode).toBe(404);
  });

  test('Should return 200 for cyclist COM ALUGUEL EM ANDAMENTO', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/2/permiteAluguel',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('Ciclista já possui um aluguel em andamento');
  });

  test('Should return 200 for cyclist COM CONTA INATIVA mesmo sem aluguel em andamento', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/5/permiteAluguel',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('Ciclista inativo. Ative sua conta.');
  });

});

describe('getCartaoCredito route test', () => {

  test('Should return the credit card information of a cyclist', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/cartaoDeCredito/1',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return 404 if cyclist is not found', async () => {
    const app = build();

    const response = await app.inject({
      method: 'GET',
      url: '/cartaoDeCredito/20',
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toBe('Ciclista não encontrado');
  });

});



describe('getExisteEmail route test', () => {
  
  test('Should return sucess if email exists in a cyclist', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/existeEmail/user@example.com',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return 200 if email is available', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/existeEmail/joaopedro@gmail.com',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return sucess if email available', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/existeEmail/email@example.com',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return 400 if without email', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/existeEmail/',
    });
    expect(response.statusCode).toBe(400);
  });

  test('Should return 422 if with wrong email format', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/existeEmail/user.com',
    });
    expect(response.statusCode).toBe(422);
  });

});

describe('getBiciletaAlugada route test', () => {

  test('Should return sucess if cyclist have a rent', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/2/bicicletaAlugada',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return sucess if cyclist dont have a rent', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/1/bicicletaAlugada',
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return error 404 if cyclist dont exist', async () => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/ciclistas/898/bicicletaAlugada'
    });
    expect(response.statusCode).toBe(404);
  });

});

  const bodyTranca = [{
    "id": 1,
    "localizacao": "Rua da tranca",
    "modelo": "Tranca bem firme",
    "numero": 2000,
    "anoFabricacao": 2019,
    "bicicleta": 2000,
    "status": "NOVA"
  }];

describe('postAluguel route test', () => {
  test('Should return success if Aluguel success', async () => {
    const app = build();
    //só está mockado pq a api do joao fica destrancada e a gnt precisa dela trancada
    getTrancaApi.getTranca = jest.fn().mockResolvedValueOnce(bodyTranca);

    const response = await app.inject({
      method: 'POST',
      url: '/aluguel',
      payload: {
        "ciclista": "3",
        "trancaInicio": "2000"
      }
    });
    expect(response.body).toBe('Aluguel solicitado com sucesso')
    expect(response.statusCode).toBe(200);
  });
  
  test('Should return message if Aluguel fail because another aluguel exist', async () => {
    const app = build();
    const response = await app.inject({
      method: 'POST',
      url: '/aluguel',
      payload: {
        "ciclista": "2",
        "trancaInicio": "0"
      }
    });
    expect(response.body).toBe('Ciclista já possui um aluguel em andamento.')
  });

  test('Should return message if Aluguel fail because cyclist is not active', async () => {
    const app = build();
    const response = await app.inject({
      method: 'POST',
      url: '/aluguel',
      payload: {
        "ciclista": "5",
        "trancaInicio": "0"
      }
    });
    expect(response.statusCode).toBe(422);
    expect(response.body).toBe('Ciclista inativo. Ative sua conta.');
  });

  test('Should return message if Aluguel fail because cyclist dont exist', async () => {
    const app = build();
    const response = await app.inject({
      method: 'POST',
      url: '/aluguel',
      payload: {
        "ciclista": "896",
        "trancaInicio": "0"
      }
    });
    expect(response.body).toBe('Ciclista não encontrado');
    expect(response.statusCode).toBe(404);
  });

})

describe('postDevolucao route test', () => {
  test('Should return sucess if Devolucao sucess', async () => {
    const app = build();
    const response = await app.inject({
      method: 'POST',
      url: '/devolucao',
      payload: {
        "idTranca": 1,
        "idBicicleta": "1"
      }
    });
    expect(response.statusCode).toBe(200);
  });

  test('Should return 422 if Devolucao failed', async () => {
    const app = build();
    const response = await app.inject({
      method: 'POST',
      url: '/devolucao',
      payload: {
        "idTranca": 0,
        "idBicicleta": "2"
      }
    });
    expect(response.statusCode).toBe(422);
  });
})
