const { funcionarios } = require('../data/dataFuncionarios.js');

function validarSenha(senha,confirmacaoSenha){
if (senha !== confirmacaoSenha) {
    return {
    success: false,
    status: 422,
    mensagem: 'Dados inválidos. A senha e a confirmação de senha devem ser iguais.',
    };
}
return { success: true };
};

function validarCamposObrigatorios(objeto, campos) {
    for (const campo of campos) {
      if (!objeto[campo]) {
        return {
          success: false,
          status: 422,
          mensagem: 'Dados inválidos. Insira todos os campos obrigatórios.'
        };
      }
    }
    return {success: true};
  };
   
function validarEmail(email){
  
    const EmailValido = validarFormatoEmail(email);
    //console.log("Email formato valido: "+EmailValido)
    
    if (!EmailValido) {
      return {
        success: false,
        status: 422,
        mensagem: 'Dados inválidos. Formato de e-mail inválido',
      };
    }
  
    const emailEmUso = funcionarios.find((f) => f.email === email);
    if (emailEmUso) {
      //console.log("Email esta em uso")
      return {
        success: false,
        status: 422,
        mensagem: 'Dados inválidos. E-mail já está em uso por outro funcionário. Escolha um e-mail diferente.'
      };
    } else {
        return {success: true};
    }
  };
  
function validarFormatoEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
};

const validarID = async (id) => {
    if (id.length!=36) { 
      return ({
      success: false,
      status: 422,
      mensagem: 'Dados inválidos. ID invalido.',
      });
    } else {
      return {success: true};
    };
  }

module.exports = {
    validarSenha,
    validarCamposObrigatorios,
    validarEmail,
    validarFormatoEmail,
    validarID
};
