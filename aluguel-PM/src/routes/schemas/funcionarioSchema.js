'use strict'

const novoFuncionarioSchema = {
    type: 'object',
    required: ['senha', 'confirmacaoSenha', 'email', 'nome', 'idade', 'funcao', 'cpf'],
    properties: {
      senha: { type: 'string' },
      confirmacaoSenha: { type: 'string' },
      email: { type: 'string', format: 'email' },
      nome: { type: 'string' },
      idade: { type: 'integer' },
      funcao: { type: 'string' },
      cpf: { type: 'string' }
    },
  };

const funcionarioSchema = {
    type: 'object',
    required: [
        'id',
        'matricula',
        'senha',
        'confirmacaoSenha',
        'email',
        'nome',
        'idade',
        'funcao',
        'cpf'],
    properties: {
        id: {type: 'string'},
        matricula: {type: 'string'},
        senha: {type: 'string'},
        confirmacaoSenha: {type: 'string'},
        email: {type: 'string', format: 'email'},
        nome: {type: 'string'},
        idade: {type: 'number'},
        funcao: {type: 'string'},
        cpf: {type: 'string'}
    }
};

module.exports = { novoFuncionarioSchema, funcionarioSchema }