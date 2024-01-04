'use strict';

const { build } = require('../src/app')

const {
  bodyFuncionario, bodyFuncionarioSemEmail, bodyFuncionarioSemCampoNomeESemSenha, bodyFuncionarioSemCampoNome, 
  bodyFuncionarioSemCampoEmail, bodyFuncionarioComEmailInvalido, bodyFuncionarioComEmailRepetido, 
  bodyFuncionarioComSenhasDiferentes1, bodyFuncionarioComSenhasDiferentes2,
} = require("./funcionarioMock");
const app = build();

const callCriarFuncionario = async (body) => {
  return await app.inject({
    method: 'POST',
    url: '/funcionarios',
    payload: body
  })
};

describe('requests the "/funcionarios" route', () => {
  test('Deve retornar a lista de funcionarios quando chamada', async () => {
      const app = build();

      const response = await app.inject({
         method: "GET",
         url: "/funcionarios"
      });
      
      expect(response.statusCode).toBe(200);
  })
})

/************* TESTES DE POST DE FUNCIONARIO *************/

describe('POST de Funcionario na rota /funcionarios', () => {
  test('Deve dar SUCESSO no POST de um funcionario', async () => {
    const response = await callCriarFuncionario(bodyFuncionario);
    expect(response.statusCode).toBe(200);
  });
}); 

//CAMPOS OBRIGATÓRIOS

describe('POST de Funcionario na rota /funcionarios SEM EMAIL', () => {
  test('Deve dar ERRO no POST de um funcionario', async () => {
    const response = await callCriarFuncionario(bodyFuncionarioSemEmail);
    expect(response.statusCode).toBe(422);
  });
}); 

describe('POST de Funcionario na rota /funcionarios SEM CAMPOS DE SENHA E NOME', () => {
  test('Deve dar erro de post de um funcionario', async () => {
    const response = await callCriarFuncionario(bodyFuncionarioSemCampoNomeESemSenha);
    expect(response.statusCode).toBe(422);
  });
});  

describe('POST de Funcionario na rota /funcionarios SEM CAMPO NOME', () => {
  test('Deve dar erro de post de um funcionario', async () => {
    const response = await callCriarFuncionario(bodyFuncionarioSemCampoNome);
    expect(response.statusCode).toBe(422);
  });
}); 

describe('POST de Funcionario na rota /funcionarios SEM CAMPO EMAIL', () => {
  test('Deve dar erro de post de um funcionario', async () => {
    const response = await callCriarFuncionario(bodyFuncionarioSemCampoEmail);
    expect(response.statusCode).toBe(422);
  });
});  

//EMAIL

describe('POST de Funcionario na rota /funcionarios COM EMAIL INVALIDO', () => {
  test('Deve dar erro de post de um funcionario', async () => {
    const response = await callCriarFuncionario(bodyFuncionarioComEmailInvalido);
    expect(response.statusCode).toBe(422);
  });
}); 


describe('POST de Funcionario na rota /funcionarios COM EMAIL REPETIDO', () => {
  test('Deve dar erro de post de um funcionario', async () => {
    const response = await callCriarFuncionario(bodyFuncionarioComEmailRepetido);
    expect(response.statusCode).toBe(422);
  });
});  


//TESTES DE CAMPOS DE SENHA

describe('POST de Funcionario na rota /funcionarios COM SENHAS DIFERENTES', () => {
  test('Deve dar erro de post de um funcionario', async () => {
    const response = await callCriarFuncionario(bodyFuncionarioComSenhasDiferentes1);
    expect(response.statusCode).toBe(422);
  });
});

describe('POST de Funcionario na rota /funcionarios COM SENHAS DIFERENTES', () => {
  test('Deve dar erro de post de um funcionario', async () => {
    const response = await callCriarFuncionario(bodyFuncionarioComSenhasDiferentes2);
    expect(response.statusCode).toBe(422);
  });
});  

/************* TESTES DE BUSCA DE FUNCIONARIOS POR ID *************/

describe('GET de Funcionario na rota /funcionarios/:id com ID VALIDO', () => {
  test('Deve dar SUCESSO no GET de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'GET',
      url: '/funcionarios/b57a9ded-dd1e-44ba-8c10-d231efb70ad1'
    });
    //console.log(response.body)
    expect(response.statusCode).toBe(200);
  });
});  

describe('GET de Funcionario na rota /funcionarios/:id com ID INVALIDO', () => {
  test('Deve dar FALHA no GET de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'GET',
      url: '/funcionarios/10'
    });
    //console.log(response.body)
    expect(response.statusCode).toBe(422);
  });
}); 

describe('GET de Funcionario na rota /funcionarios/:id com ID INEXISTENTE', () => {
  test('Deve dar FALHA no GET de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'GET',
      url: '/funcionarios/54d268a8-a397-4b1d-b116-18c53059566c'
    });
    //console.log(response.body)
    expect(response.statusCode).toBe(404);
  });
}); 

/************* TESTES DE ATUALIZAÇÃO DE FUNCIONARIOS POR ID *************/

describe('PUT de Funcionario na rota /funcionarios/:id com ID VALIDO', () => {
  test('Deve dar sucesso no put de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'PUT',
      url: '/funcionarios/b57a9ded-dd1e-44ba-8c10-d231efb70ad1',
      payload: { 
        senha: "senhafuncionario1",
        confirmacaoSenha: "senhafuncionario1",
        email: "funcionarioteste1@example.com",
        nome: "funcionarioteste1",
        idade: 0,
        funcao: "funcionario",
        cpf: "cpfdofuncionario1"
    }});
    //console.log(response.body)
    expect(response.statusCode).toBe(200);
  });
});  

describe('PUT de Funcionario na rota /funcionarios/:id com ID INVALIDO', () => {
  test('Deve dar falha no put de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'PUT',
      url: '/funcionarios/10',
      payload: { 
        senha: "senhafuncionario1",
        confirmacaoSenha: "senhafuncionario1",
        email: "funcionarioteste1@example.com",
        nome: "funcionarioteste1",
        idade: 0,
        funcao: "funcionario",
        cpf: "cpfdofuncionario1"
    }});
    //console.log(response.body)
    expect(response.statusCode).toBe(422);
  });
});  

describe('PUT de Funcionario na rota /funcionarios/:id com ID INEXISTENTE', () => {
  test('Deve dar falha no put de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'PUT',
      url: '/funcionarios/54d268a8-a397-4b1d-b116-18c53059566c',
      payload: { 
        senha: "senhafuncionario1",
        confirmacaoSenha: "senhafuncionario1",
        email: "funcionarioteste1@example.com",
        nome: "funcionarioteste1",
        idade: 0,
        funcao: "funcionario",
        cpf: "cpfdofuncionario1"
    }});
    //console.log(response.body)
    expect(response.statusCode).toBe(404);
  });
}); 

//CAMPOS OBRIGATÓRIOS

describe('PUT de Funcionario na rota /funcionarios/:id SEM CAMPOS SENHA', () => {
  test('Deve dar FALHA no PUT de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'PUT',
      url: '/funcionarios/b57a9ded-dd1e-44ba-8c10-d231efb70ad1',
      payload: { 
        email: "funcionarioteste1@example.com",
        nome: "funcionarioteste1",
        idade: 0,
        funcao: "funcionario",
        cpf: "cpfdofuncionario1"
    }});
    //console.log(response.body)
    expect(response.statusCode).toBe(422);
  });
});  

describe('PUT de Funcionario na rota /funcionarios/:id SEM CAMPO EMAIL', () => {
  test('Deve dar FALHA no PUT de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'PUT',
      url: '/funcionarios/b57a9ded-dd1e-44ba-8c10-d231efb70ad1',
      payload: { 
        senha: "senhafuncionario1",
        confirmacaoSenha: "senhafuncionario1",
        email: "funcionarioteste1@example.com",
        nome: "funcionarioteste1",
        idade: 0,
        funcao: "funcionario",
        cpf: "cpfdofuncionario1"
    }});
    //console.log(response.body)
    expect(response.statusCode).toBe(422);
  });
});  

describe('PUT de Funcionario na rota /funcionarios/:id SEM CAMPO NOME', () => {
  test('Deve dar FALHA no PUT de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'PUT',
      url: '/funcionarios/b57a9ded-dd1e-44ba-8c10-d231efb70ad1',
      payload: { 
        senha: "senhafuncionario1",
        confirmacaoSenha: "senhafuncionario1",
        email: "funcionarioteste1@example.com",
        idade: 0,
        funcao: "funcionario",
        cpf: "cpfdofuncionario1"
    }});
    //console.log(response.body)
    expect(response.statusCode).toBe(422);
  });
}); 

/************* TESTES DE REMOÇÃO DE FUNCIONARIOS POR ID *************/

describe('DELETE de Funcionario na rota /funcionarios/:id com id valido', () => {
  test('Deve dar SUCESSO no DELETE de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'DELETE',
      url: '/funcionarios/b57a9ded-dd1e-44ba-8c10-d231efb70ad1'
    });
    //console.log(response.body)
    expect(response.statusCode).toBe(200);
  });
}); 

describe('DELETE de Funcionario na rota /funcionarios/:id com id invalido', () => {
  test('Deve dar FALHA no DELETE de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'DELETE',
      url: '/funcionarios/AAA'
    });
    //console.log(response.body)
    expect(response.statusCode).toBe(422);
  });
}); 

describe('DELETE de Funcionario na rota /funcionarios/:id com id INEXISTENTE', () => {
  test('Deve dar FALHA no DELETE de um funcionario', async () => {
    const app = build();

    const response = await app.inject({
      method: 'DELETE',
      url: '/funcionarios/54d268a8-a397-4b1d-b116-18c53059566c'
    });
    //console.log(response.body)
    expect(response.statusCode).toBe(404);
  });
}); 
