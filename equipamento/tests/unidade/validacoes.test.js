const validacao = require ("../../src/utils/validacoes");
const {passaEmptyBicicleta, passaEmptyTranca, passaEmptyTotem, passaNullBicicleta, passaNullTranca, passaNullTotem} = require("../../src/utils/validacoes");

describe ("Testa as validacoes de vazio empty",() => {
    test("bicicleta",() =>{
        expect(passaEmptyBicicleta("","","","")).toBe(false);
    })
    test("bicicleta",() =>{
        expect(passaEmptyBicicleta("teste","teste",2018,123)).toBe(true);
    })

    test("tranca",() =>{
        expect(passaEmptyTranca("","","","")).toBe(false);
    })
    test("tranca",() =>{
        expect(passaEmptyTranca("teste","teste",2017,1234)).toBe(true);
    })

    test("totem",() =>{
        expect(passaEmptyTotem("","")).toBe(false);
    })
    test("totem",() =>{
        expect(passaEmptyTotem("Teste","Teste")).toBe(true);
    })
});

describe ("Testa as validacoes de null",() => {
    test("bicicleta",() =>{
        expect(passaNullBicicleta()).toBe(false);
    })
    test("bicicleta",() =>{
        expect(passaNullBicicleta("teste","teste",2018,1234)).toBe(true);
    })

    test("tranca",() =>{
        expect(passaNullTranca()).toBe(false);
    })
    test("tranca",() =>{
        expect(passaNullTranca("teste","teste",2017,1234)).toBe(true);
    })

    test("totem",() =>{
        expect(passaNullTotem()).toBe(false);
    })
    test("totem",() =>{
        expect(passaNullTotem("Teste","Teste")).toBe(true);
    })
});