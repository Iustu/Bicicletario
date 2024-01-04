const { v4: uuidv4 } = require('uuid');
const { v1: uuidv1 } = require('uuid');
const { funcionarios } = require('../data/dataFuncionarios');
const validacoes = require('../services/validacoesFuncionario.js')

const getFuncionarios = async (request, reply) => {
    try {
      return reply.status(200).send(funcionarios)
    } catch (error) {
      console.error(error)
      reply.status(500).send('Erro ao obter funcionarios')
    }
};

const criarFuncionario = async (request, reply) => {
    try {
      const novoFuncionario = request.body
  
      // Inserindo ID e Matricula ao criar Funcionario
      novoFuncionario.id = uuidv4();
      novoFuncionario.matricula = uuidv1();

      //Verificando campos obrigatórios
      const camposObrigatorios = ['email', 'nome', 'senha', 'confirmacaoSenha'];
      const resultadoVerificacaoCamposObrigatorios = await validacoes.validarCamposObrigatorios(novoFuncionario, camposObrigatorios);
      //console.log("Campos Obrigatorios Resultado Verificacao: "+resultadoVerificacaoCamposObrigatorios.success)
      if (!resultadoVerificacaoCamposObrigatorios.success) {
        return reply.status(resultadoVerificacaoCamposObrigatorios.status).send(resultadoVerificacaoCamposObrigatorios);
      }
  
      //Verificando Email
      const resultadoVerificacaoEmail = await validacoes.validarEmail(novoFuncionario.email);
      //console.log("Email Resultado Verificacao: "+resultadoVerificacaoEmail.success)
      if (!resultadoVerificacaoEmail.success) {
        //console.log("Verificando Email na criação de Funcionario")
        return reply.status(resultadoVerificacaoEmail.status).send(resultadoVerificacaoEmail);
      }

      //Verificando campos de senha
      const resultadoVerificacaoSenha = await validacoes.validarSenha(novoFuncionario.senha, novoFuncionario.confirmacaoSenha);
      //console.log("Senha Resultado Verificacao: "+resultadoVerificacaoSenha.success)
      if (!resultadoVerificacaoSenha.success) {
        return reply.status(resultadoVerificacaoSenha.status).send(resultadoVerificacaoSenha);
      }

      funcionarios.push(novoFuncionario)

      reply.status(200).send({
        codigo: "200",
        mensagem: "Dados Cadastrados."
      });
  
      return reply.send(novoFuncionario)
    } catch (error) {
      console.error(error)
      reply.status(500).send('TESTE Erro ao criar funcionario')
    }
  }

const getFuncionarioById = async (request, reply) => {
    try {
        const id = request.params.id

        const resultadoVerificacaoID = await validacoes.validarID(id);
        if (!resultadoVerificacaoID.success) {
          //console.log("Verificando ID valido no GET")
          return reply.status(resultadoVerificacaoID.status).send(resultadoVerificacaoID);
        } 

        const funcionario = funcionarios.find(f => f.id === id)
        //console.log("Funcionario: "+funcionario)
        const dadosFuncionario = getDadosFuncionario(funcionario)

        return reply.status(200).send(dadosFuncionario);

    } catch (error) {
        //console.error(error)
        reply.status(404).send({
          codigo: "404",
          mensagem: "Não encontrado. Funcionario não encontrado."
        });
    }
}

const atualizarFuncionario = async (request, reply) => {
    try {
      const id = request.params.id
      const dadosAtualizados = request.body
      const funcionario = funcionarios.find(f => f.id === id)

      //Verificando ID
      const resultadoVerificacaoID = await validacoes.validarID(id);
      if (!resultadoVerificacaoID.success) {
        //console.log("Verificando ID valido no GET: "+validarID(id))
        return reply.status(resultadoVerificacaoID.status).send(resultadoVerificacaoID);
      } 

      if (!funcionario) {
        return reply.status(404).send({
          codigo: "404",
          mensagem: "Não encontrado. Funcionário não encontrado."
        });
      }

      //Verificando campos obrigatórios
      const camposObrigatorios = ['senha', 'confirmacaoSenha','nome','email'];
      const resultadoVerificacaoCamposObrigatorios = await validacoes.validarCamposObrigatorios(dadosAtualizados, camposObrigatorios);
      //console.log("Resultado Verificacao Campos Obrigatorios: "+resultadoVerificacaoCamposObrigatorios.success)
      if (!resultadoVerificacaoCamposObrigatorios.success) {
        return reply.status(resultadoVerificacaoCamposObrigatorios.status).send(resultadoVerificacaoCamposObrigatorios);
      } 

      //Verificando Email
      const resultadoVerificacaoEmail = await validacoes.validarEmail(dadosAtualizados.email);
      //console.log("Resultado Verificacao Email: "+resultadoVerificacaoEmail.success)
      if (!resultadoVerificacaoEmail.success) {
        return reply.status(resultadoVerificacaoEmail.status).send(resultadoVerificacaoEmail);
      }
         
      //Verificando campos de senha
      const resultadoVerificacaoSenha = await validacoes.validarSenha(dadosAtualizados.senha, dadosAtualizados.confirmacaoSenha);
      //console.log("Resultado Verificacao Senha: "+resultadoVerificacaoSenha.success)
      if (!resultadoVerificacaoSenha.success) {
        return reply.status(resultadoVerificacaoSenha.status).send(resultadoVerificacaoSenha);
      }
      
      const funcionarioAtualizado = { ...funcionario, ...dadosAtualizados }
      funcionarios[funcionarios.indexOf(funcionario)] = { ...funcionario, ...dadosAtualizados }
  
      return reply.status(200).send(funcionarioAtualizado)
    
    } catch (error) {
      //console.error(error)
      reply.status(404).send({
        codigo: "404",
        mensagem: 'Não encontrado. Erro ao obter funcionario'
      });
    }
  };

  const removerFuncionario = async(request, reply) => {
    try {
    const id = request.params.id
    const funcionario = funcionarios.find(c => c.id === id)
    
    //Verificando campos ID
    const resultadoVerificacaoID = await validacoes.validarID(id);
    if (!resultadoVerificacaoID.success) {
      return reply.status(resultadoVerificacaoID.status).send(resultadoVerificacaoID);
    } 

    if (!funcionario) {
      return reply.status(404).send({
        codigo: "404",
        mensagem: "Requisição não encontrada."
      });
    }

    //Remover apenas um elemento a partir do indice
    funcionarios.splice(funcionarios.indexOf(funcionario),1)
    return reply.status(200).send({
          codigo: "200",
          mensagem: "Funcionario removido."
        });
    
    } catch (error) {
      console.error(error);
      reply.status(404).send({
        codigo: "404",
        mensagem: "Requisição não encontrada."
      });
    }
}

/*************** BUSCA DE DADOS DE FUNCIONARIOS ***************/

function getDadosFuncionario(funcionario){
  return {
    matricula: funcionario.matricula,
    senha: funcionario.senha,
    confirmacaoSenha: funcionario.confirmacaoSenha,
    email: funcionario.email,
    nome: funcionario.nome,
    idade: funcionario.idade,
    funcao: funcionario.funcao,
    cpf: funcionario.cpf
  };
};

/*************** MODULOS EXPORTADOS ***************/

module.exports = {
    getFuncionarios,
    criarFuncionario,
    getFuncionarioById,
    atualizarFuncionario,
    removerFuncionario
  }