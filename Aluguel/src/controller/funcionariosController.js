const { v4: uuidv4 } = require('uuid');
const { funcionarios } = require('../data.js');

const getFuncionarios = async (request, reply) => {
    try {
      return reply.status(201).send(funcionarios)
    } catch (error) {
      console.error(error)
      reply.status(500).send('Erro ao obter funcionarios')
    }
};

const criarFuncionario = async (request, reply) => {
    try {
      const novoFuncionario = request.body
  
      // ID usando UUID
      const id = uuidv4();
      novoFuncionario.id = id;
  
      // Verificar se o e-mail já foi utilizado por algum funcionario
      const emailExistente = funcionarios.some(c => c.email === novoFuncionario.email);
      if (emailExistente) {
        return reply.status(400).send('E-mail já está em uso por outro funcionario. Escolha um email diferente.');
      }
  
      if (!novoFuncionario.email || !novoFuncionario.nome || !novoFuncionario.senha) {
        return reply.status(400).send('Preencha o todos os campos obrigatórios e tente novamente')
      }
  
      funcionarios.push(novoFuncionario)
      reply.status(201).send('Funcionario cadastrado com sucesso!')
  
      return reply.send(novoFuncionario)
    } catch (error) {
      console.error(error)
      reply.status(500).send('Erro ao criar funcionario')
    }
  }

const getFuncionarioById = async (request, reply) => {
    try {
        const id = request.params.id
        const funcionario = funcionarios.find(c => c.id === id)

        if (!funcionario) {
        return reply.status(404).send('Funcionario não encontrado')
        }

        return reply.send(funcionario)
    } catch (error) {
        console.error(error)
        reply.status(500).send('Erro ao obter funcionario')
    }
}

const atualizarFuncionario = async (request, reply) => {
    try {
      const id = request.params.id
      //console.log("ID: "+id)
      const dadosAtualizados = request.body
      const funcionario = funcionarios.find(c => c.id === id)
  
      if (!funcionario) {
        return reply.status(404).send('Funcionario não encontrado')
      }
  
      const funcionarioAtualizado = { ...funcionario, ...dadosAtualizados }
      funcionarios[funcionarios.indexOf(funcionario)] = { ...funcionario, ...dadosAtualizados }
  
      return reply.send(funcionarioAtualizado)
    } catch (error) {
      console.error(error)
      reply.status(500).send('Erro ao atualizar funcionario')
    }
  }

const removerFuncionario = async(request, reply) => {
    try{
    const id = request.params.id
    console.log("ID a ser removido: "+id)
    const funcionario = funcionarios.find(c => c.id === id)
    console.log("Funcionario a ser removido: "+funcionario)

    if (!funcionario) {
    return reply.status(404).send('Funcionario não encontrado')
    }

    //Remover apenas um elemento a partir do indice
    funcionarios.splice(funcionarios.indexOf(funcionario),1)

    return reply.status(200).send("Funcionario removido")
    
    } catch (error) {
        console.error(error)
        reply.status(500).send('Erro ao obter funcionario')
  }
}

module.exports = {
    getFuncionarios,
    criarFuncionario,
    getFuncionarioById,
    atualizarFuncionario,
    removerFuncionario
  }