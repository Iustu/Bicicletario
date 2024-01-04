const { ciclistas } = require('../data/dataCiclistas.js');

function verificarCamposObrigatorios(objeto, campos) {
    for (const campo of campos) {
      if (!objeto[campo]) {
        return false;
      }
    }
    return true;
};

function verificarEmail(email) {
    if (!email) {
      return ({
        success: false,
        status: 400,
        message: 'E-mail não fornecido',
      });
    }
  
    const isEmailValid = validarFormatoEmail(email);
    if (!isEmailValid) {
      return {
        success: false,
        status: 422,
        message: 'Formato de e-mail inválido',
      };
    }
  
    if (ciclistas.find((c) => c.email === email)) {
      return {
        success: false,
        status: 200,
        message: 'E-mail já está em uso por outro ciclista. Escolha um e-mail diferente.'
      };
    } else {
        return {
          success: true,
          status: 200
        };
    }
};

function validarFormatoEmail(email) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

function verificarNacionalidade(novoCiclista) {
  const { nacionalidade } = novoCiclista;
  if (nacionalidade?.toUpperCase() === 'BR') { //MUDAR PRA BRASILEIRO OU ESTRANGEIRO
    if (novoCiclista.cpf === '' || novoCiclista.cpf.length !== 11) {
      return {
        success: false,
        status: 422,
        message: 'Dados inválidos. O CPF deve ser preenchido corretamente.',
      };
    }
  } else if (!novoCiclista.passaporte?.numero || !novoCiclista.passaporte?.pais) {
      return {
        success: false,
        status: 422,
        message: 'Dados inválidos. O passaporte deve ser preenchido corretamente.',
      };
  }
    return { success: true };
}; 

function verificarConfirmacaoSenha(senha,confirmarSenha) {
 
  if (senha !== confirmarSenha) {
    return {
      success: false,
      status: 422,
      message: 'Dados inválidos. A senha e a confirmação de senha devem ser iguais.',
    };
  }
  return { success: true };
};

function verificarCartaoCredito(cartao) {
  const { nomeTitular, numero, validade, cvv } = cartao;

  return (
    (nomeTitular !== undefined && typeof nomeTitular === 'string') &&
    (numero !== undefined && numero.length === 16) &&
    (validade !== undefined && typeof validade === 'string') &&
    (cvv !== undefined && cvv.length === 3)
  );
};

function validarDataNascimento(dataNascimento){
 const regexDataNascimento = /^\d{4}-\d{2}-\d{2}$/;
   return regexDataNascimento.test(dataNascimento) 
}

function validarMeioDePagamento(nome,cvv,numero,validade){
  return !(nome === '' || cvv ==='' || numero === '' || validade === '') 
} 

function validarDataValidadeCartao(dataValidadeCartao){
  const regexDataValidadeCartao = /^\d{4}-\d{2}$/; 
  return regexDataValidadeCartao.test(dataValidadeCartao)
}

module.exports = {
    verificarCamposObrigatorios,
    verificarEmail,
    validarFormatoEmail,
    verificarNacionalidade,
    verificarConfirmacaoSenha,
    verificarCartaoCredito,
    validarDataNascimento,
    validarMeioDePagamento,
    validarDataValidadeCartao
};
