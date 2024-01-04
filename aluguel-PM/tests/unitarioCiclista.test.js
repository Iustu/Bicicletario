const serviceValidacaoCiclista = require('../src/services/validacoesCiclista');
const {
  bodyCiclista, 
  bodyCiclistaSemEmail, 
  bodyCiclistaBrazilianWithCPF, 
  bodyCiclistaBrazilianWithoutCPF, 
  bodyCiclistaNonBrazilianWithPassport,
  bodyCiclistaNonBrazilianWithoutPassport
} = require("./ciclistaMock");
 
test('VALIDAÇÃO de SENHA deve ser um SUCESSO', () => {
  expect(serviceValidacaoCiclista.verificarConfirmacaoSenha("senhateste","senhateste")).toHaveProperty('success', true);
});

test('VALIDAÇÃO de SENHA deve FALHAR', () => {
  expect(serviceValidacaoCiclista.verificarConfirmacaoSenha("senhateste","senhadiferente")).toHaveProperty('success', false);
});

test('VALIDAÇÃO de CAMPOS OBRIGATÓRIOS deve ser um SUCESSO', () => {
  expect(serviceValidacaoCiclista.verificarCamposObrigatorios(bodyCiclista,['email', 'nacionalidade', 'nascimento', 'nome', 'senha', 'confirmarSenha', 'meioDePagamento'])).toBe(true);
});

test('VALIDAÇÃO de CAMPOS OBRIGATÓRIOS deve FALHAR', () => {
  expect(serviceValidacaoCiclista.verificarCamposObrigatorios(bodyCiclistaSemEmail,['email', 'nacionalidade', 'nascimento', 'nome', 'senha', 'confirmarSenha','meioDePagamento'])).toBe(false);
});

test('VALIDAÇÃO de EMAIL deve ser um SUCESSO', () => {
  expect(serviceValidacaoCiclista.verificarEmail("teste@gmail.com")).toHaveProperty('success', true);
});

test('VALIDAÇÃO de EMAIL com formato errado deve FALHAR', () => {
  expect(serviceValidacaoCiclista.verificarEmail("testegmail.com")).toHaveProperty('success', false);
});

test('VALIDAÇÃO de EMAIL repetido deve FALHAR', () => {
  expect(serviceValidacaoCiclista.verificarEmail("email@example.com")).toHaveProperty('success', false);
});

test('VALIDAÇÃO de EMAIL sem EMAIL deve FALHAR', () => {
  expect(serviceValidacaoCiclista.verificarEmail("")).toHaveProperty('success', false);
});

test('VALIDAÇÃO de DATA NASCIMENTO deve ser um SUCESSO', () => {
  //console.log(serviceValidacaoCiclista.validarDataNascimento("1990-03-13"))
  expect(serviceValidacaoCiclista.validarDataNascimento("1990-03-13")).toBe(true)
});

test('VALIDAÇÃO de DATA NASCIMENTO  deve FALHAR', () => {
  //console.log(serviceValidacaoCiclista.validarDataNascimento("13-04-1990"))
  expect(serviceValidacaoCiclista.validarDataNascimento("13-04-1990")).toBe(false)
});

test('VALIDAÇÃO de MEIO DE PAGAMENTO deve ser um SUCESSO', () => {
  expect(serviceValidacaoCiclista.validarMeioDePagamento("string",
  "984602367621417541873846007875805616119812247741040998629140438970271355",
  "2023-06-11",
  "4857")).toBe(true)
});

test('VALIDAÇÃO de MEIO DE PAGAMENTO  deve FALHAR', () => {
  expect(serviceValidacaoCiclista.validarMeioDePagamento("","","","")).toBe(false)
});

test('VALIDAÇÃO de MEIO DE PAGAMENTO  sem um campo deve FALHAR', () => {
  expect(serviceValidacaoCiclista.validarMeioDePagamento("string","","2023-06-11","485")).toBe(false)
});

test('VALIDAÇÃO de DATA VALIDADE CARTAO deve ser um SUCESSO', () => {
  expect(serviceValidacaoCiclista.validarDataValidadeCartao("2028-12")).toBe(true)
});

test('VALIDAÇÃO de DATA VALIDADE CARTAO  deve FALHAR', () => {
  expect(serviceValidacaoCiclista.validarDataValidadeCartao("12-2028")).toBe(false)
});

test('deve retornar sucesso para nacionalidade brasileira com CPF válido', () => {
  expect(serviceValidacaoCiclista.verificarNacionalidade(bodyCiclistaBrazilianWithCPF)).toHaveProperty('success', true);
});

test('deve retornar falha para nacionalidade brasileira com CPF inválido', () => {
  expect(serviceValidacaoCiclista.verificarNacionalidade(bodyCiclistaBrazilianWithoutCPF)).toHaveProperty('success', false);
});

test('deve retornar sucesso para nacionalidade estrangeira com passaporte válido', () => {
  expect(serviceValidacaoCiclista.verificarNacionalidade(bodyCiclistaNonBrazilianWithPassport)).toHaveProperty('success', true);
});

test('deve retornar falha para nacionalidade estrangeira sem passaporte válido', () => {
  expect(serviceValidacaoCiclista.verificarNacionalidade(bodyCiclistaNonBrazilianWithoutPassport)).toHaveProperty('success', false);
});

test('deve retornar true para cartão de crédito válido', () => {
  const cartao = {
    nomeTitular: 'João Silva',
    numero: '1234567812345678',
    validade: '2024/12',
    cvv: '222',
  };
  const resultado = serviceValidacaoCiclista.verificarCartaoCredito(cartao);
  expect(resultado).toBe(true);
});

test('deve retornar false para cartão de crédito inválido', () => {
  const cartao = {
    nomeTitular: '',
    numero: '',
    validade: '',
    cvv: '1',
  };
  const resultado = serviceValidacaoCiclista.verificarCartaoCredito(cartao);
  expect(resultado).toBe(false);
});