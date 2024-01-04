const serviceAluguel = require('../src/services/serviceAluguel');

test('VALIDAÇÃO de ALUGUEL ATIVO deve ser um SUCESSO', () => {
    expect(serviceAluguel.verificarAtivo(true)).toBe(true)
  });

test('VALIDAÇÃO de ALUGUEL INATIVO deve ser uma FALHA', () => {
expect(serviceAluguel.verificarAtivo(false)).toBe(false)
});

test('VALIDAÇÃO de STATUS ATIVO deve ser um SUCESSO', () => {
    expect(serviceAluguel.verificarStatus(true)).toBe(true)
  });

test('VALIDAÇÃO de STATUS INATIVO deve ser uma FALHA', () => {
expect(serviceAluguel.verificarStatus(false)).toBe(false)
});

