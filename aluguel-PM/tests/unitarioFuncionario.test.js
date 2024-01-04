const serviceValidacaoFuncionario = require('../src/services/validacoesFuncionario');
const {bodyFuncionario} = require("./funcionarioMock");

//console.log(bodyFuncionario)

test('VALIDAÇÃO de SENHA deve ser um SUCESSO', () => {
  expect(serviceValidacaoFuncionario.validarSenha("senhateste","senhateste")).toHaveProperty('success', true);
});

test('VALIDAÇÃO de SENHA deve FALHAR', () => {
  expect(serviceValidacaoFuncionario.validarSenha("senhateste","senhadiferente")).toHaveProperty('success', false);
});

test('VALIDAÇÃO de CAMPOS OBRIGATÓRIOS deve ser um SUCESSO', () => {
  expect(serviceValidacaoFuncionario.validarCamposObrigatorios(bodyFuncionario,['email', 'nome', 'senha', 'confirmacaoSenha'])).toHaveProperty('success', true);
});

test('VALIDAÇÃO de CAMPOS OBRIGATÓRIOS deve FALHAR', () => {
  expect(serviceValidacaoFuncionario.validarCamposObrigatorios(bodyFuncionario,['nome', 'senha', 'confirmacaoSenha'])).toHaveProperty('success', true);
});


