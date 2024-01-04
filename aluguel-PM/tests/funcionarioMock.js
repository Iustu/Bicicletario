'use strict'

const bodyFuncionario = {
    senha: "senhafuncionario6",
    confirmacaoSenha: "senhafuncionario6",
    email: "funcionario6@example.com",
    nome: "funcionario6",
    idade: 25,
    funcao: "funcionario",
    cpf: "cpfdofuncionario6"
}

const bodyFuncionarioSemEmail = {
    senha: "senhafuncionario7",
    confirmacaoSenha: "senhafuncionario7",
    nome: "funcionario7",
    idade: 0,
    funcao: "funcionario",
    cpf: "cpfdofuncionario7"
}

const bodyFuncionarioSemCampoNomeESemSenha = {
    email: "funcionario10@example.com",
    idade: 0,
    funcao: "funcionario",
    cpf: "cpfdofuncionario10"
}

const bodyFuncionarioSemCampoNome = {
    senha: "senhafuncionario6",
    confirmacaoSenha: "senhafuncionario6",
    email: "funcionario1@example.com",
    idade: 0,
    funcao: "funcionario",
    cpf: "cpfdofuncionario6"
}

const bodyFuncionarioSemCampoEmail = {
    senha: "senhafuncionario6",
    confirmacaoSenha: "senhafuncionario6",
    nome: "funcionario6",
    idade: 0,
    funcao: "funcionario",
    cpf: "cpfdofuncionario6"
}

const bodyFuncionarioComEmailInvalido = {
    senha: "senhafuncionario8",
    confirmacaoSenha: "senhafuncionario8",
    email: "funcionario8email",
    nome: "funcionario8",
    idade: 0,
    funcao: "funcionario",
    cpf: "cpfdofuncionario8"
}

const bodyFuncionarioComEmailRepetido = {
    senha: "senhafuncionario9",
    confirmacaoSenha: "senhafuncionario9",
    email: "funcionario2@example.com",
    nome: "funcionario9",
    idade: 0,
    funcao: "funcionario",
    cpf: "cpfdofuncionario9"
}

const bodyFuncionarioComSenhasDiferentes1 = {
    senha: "senha7",
    confirmacaoSenha: "senhafuncionario6",
    email: "funcionario6email",
    nome: "funcionario6",
    idade: 0,
    funcao: "funcionario",
    cpf: "cpfdofuncionario6"
}

const bodyFuncionarioComSenhasDiferentes2 = {
    senha: "senhafuncionario11",
    confirmacaoSenha: "senha11",
    email: "funcionario11@example.com",
    nome: "funcionario11",
    idade: 0,
    funcao: "funcionario",
    cpf: "cpfdofuncionario11"
}

module.exports = {
    bodyFuncionario,
    bodyFuncionarioSemEmail,
    bodyFuncionarioSemCampoNomeESemSenha,
    bodyFuncionarioSemCampoNome,
    bodyFuncionarioSemCampoEmail,
    bodyFuncionarioComEmailInvalido,
    bodyFuncionarioComEmailRepetido,
    bodyFuncionarioComSenhasDiferentes1,
    bodyFuncionarioComSenhasDiferentes2,
}