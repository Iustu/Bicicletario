const bdd = require("../../src/data/bdd");
const {colocaBicicleta, deletaBicicleta, retornaBicicletaIndice, retornaBicicletas, atualizaBicicleta, colocaTranca,
   deletaTranca, retornaTrancaIndice, retornaTrancas, atualizaTranca, colocaTotem, deletaTotem, retornaTotemIndice,
   retornaTotens, atualizaTotem, bicicletaStatus, pegaIndiceBicicletaId, pegaIndiceBicicletaNumero, trancaStatus,
   pegaIndiceTrancaId, pegaIndiceTrancaNumero, pegaIndiceTotemId, trancar, destrancar, colocaTrancaTotem,
   removeTrancaTotem, puxaBicicletaTotem, registraInclusaoBT, registraExclusaoBT, comparaExclusaoBT, registraInclusaoTT,
   registraExclusaoTT, comparaExclusaoTT
} = require("../../src/data/bdd");

//BICICLETAS
describe("Testa recuperação de array Bicicleta",()=>{
   test ("Should return an array of bikes",()=>{
      expect(Array.isArray(bdd.retornaBicicletas())).toBe(true);
   });
});

describe("Testa recuperação de um elemento do array Bicicleta",()=>{
   let novaBike;

   beforeAll(()=>{
      novaBike = colocaBicicleta("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaBicicleta(novaBike.id-1);
   });

   test ("Should return an object",()=>{
      expect(bdd.retornaBicicletaIndice(novaBike.id-1) !== null).toBe(true);
   });
   test ("Should an object of bike",()=>{
      expect(retornaBicicletaIndice(novaBike.id-1)).toStrictEqual(novaBike);
   });
   test ("Should return undefined",()=>{
      expect(bdd.retornaBicicletaIndice(1000)).toBe(undefined);
   });

});

describe("Testa colocação de um elemento no array de Bicicleta",()=>{
   let array;
   let size;
   beforeAll(()=>{
      array = retornaBicicletas();
      size = array.length;
   });
   afterAll(()=>{
      deletaBicicleta(array.length-1);
   });

   test ("Should return an object",()=>{
      expect(colocaBicicleta("Teste","Teste",2000,2000)!==null).toBe(true);
      deletaBicicleta(array.length-1);
   });
   test ("Should put an object in array",()=>{
      colocaBicicleta("Teste","Teste",2000,2000);
      expect(size<array.length).toBe(true);
   });
});

describe("Testa atualização de um elemento no array de Bicicleta",()=>{
   let bicicleta;
   beforeAll(()=>{
      bicicleta = colocaBicicleta("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaBicicleta(bicicleta.id-1);
   });

   test ("Should return an object",()=>{
      expect(atualizaBicicleta(bicicleta.id-1,"Teste","Teste",2000,2000)!==null).toBe(true);
   });
   test ("Should actualize an object in array",()=>{
      bicicleta = atualizaBicicleta(bicicleta.id-1,"Teste2","Teste",2000,2000,"nova");

      const bicicletaDummy = {
         id: 1,
         marca: "Teste",
         modelo: "Teste",
         numero: 2000,
         ano: 2000,
         status: "nova"
      }

      expect(bicicleta !== bicicletaDummy).toBe(true);
   });
});

describe("Testa remoção de um elemento no array de Bicicleta",()=>{

   let size;
   beforeAll(()=>{
      colocaBicicleta("Teste","Teste",2000,2000);
      size = retornaBicicletas().length;
   });

   test ("Should remove just one object in array",()=>{
      deletaBicicleta(size-1);
      expect((size-retornaBicicletas().length)==1).toBe(true);
   });
});

describe("Testa a alteracao de status da bicicleta",()=>{
   let bicicleta;
   beforeAll(()=>{
      bicicleta = colocaBicicleta("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaBicicleta(bicicleta.id-1);
   });

   test ("Should return an object",()=>{
      expect(bicicletaStatus(bicicleta.id-1,"Teste3")!=null).toBe(true);
   });
   test ("Should actualize an status in array",()=>{

      bicicleta = bicicletaStatus(bicicleta.id-1,"Teste2");

      const statusDummy = "Teste";

      expect(bicicleta.status !== statusDummy).toBe(true);
   });
});

describe("Testa recuperação de um indice com id",()=>{
   let novaBike;

   beforeAll(()=>{
      novaBike = colocaBicicleta("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaBicicleta(novaBike.id-1);
   });

   test ("Should an indice of bike",()=>{
      expect(pegaIndiceBicicletaId(novaBike.id)).toBe(2);
   });
   test ("Should return -1",()=>{
      expect(pegaIndiceBicicletaId(10000)).toBe(-1);
   });

});

describe("Testa recuperação de um indice com numero",()=>{
   let novaBike;

   beforeAll(()=>{
      novaBike = colocaBicicleta("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaBicicleta(novaBike.id-1);
   });

   test ("Should an indice of bike",()=>{
      expect(pegaIndiceBicicletaNumero(novaBike.numero)).toBe(0);
   });
   test ("Should return -1",()=>{
      expect(pegaIndiceBicicletaNumero(10000)).toBe(-1);
   });

});

//
//TRANCAS
//
describe("Testa recuperação de array trancas",()=>{
   test ("Should return an array of bikes",()=>{
      expect(Array.isArray(bdd.retornaTrancas())).toBe(true);
   });
});

describe("Testa recuperação de um elemento do array TRANCAS",()=>{
   let novaTranca;

   beforeAll(()=>{
      novaTranca = colocaTranca("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaTranca(novaTranca.id-1);
   });

   test ("Should return an object",()=>{
      expect(bdd.retornaTrancaIndice(novaTranca.id-1) !== null).toBe(true);
   });
   test ("Should an object of tranca",()=>{
      expect(retornaTrancaIndice(novaTranca.id-1)).toStrictEqual(novaTranca);
   });
   test ("Should return undefined",()=>{
      expect(bdd.retornaTrancaIndice(1000)).toBe(undefined);
   });

});

describe("Testa colocação de um elemento no array de Tranca",()=>{
   let array;
   let size;
   beforeAll(()=>{
      array = retornaTrancas();
      size = array.length;
   });
   afterAll(()=>{
      deletaTranca(array.length-1);
   });

   test ("Should return an object",()=>{
      expect(colocaTranca("Teste","Teste",2000,2000)!==null).toBe(true);
      deletaTranca(array.length-1);
   });
   test ("Should put an object in array",()=>{
      colocaTranca("Teste","Teste",2000,2000);
      expect(size<array.length).toBe(true);
   });
});

describe("Testa atualização de um elemento no array de Tranca",()=>{
   let tranca;
   beforeAll(()=>{
      tranca = colocaTranca("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaTranca(tranca.id-1);
   });

   test ("Should return an object",()=>{
      expect(atualizaTranca(tranca.id-1,"Teste","Teste",2000,2000)!==null).toBe(true);
   });
   test ("Should actualize an object in array",()=>{
      tranca = atualizaTranca(tranca.id-1,"Teste2","Teste",2000,2000,"nova");

      const trancaDummy = {
         id: 1,
         localizacao: "Teste",
         modelo: "Teste",
         numero: 2000,
         anoFabricacao: 2000,
         bicicleta:0,
         status: "NOVA"
      }

      expect(tranca !== trancaDummy).toBe(true);
   });
});

describe("Testa remoção de um elemento no array de Tranca",()=>{

   let size;
   beforeAll(()=>{
      colocaTranca("Teste","Teste",2000,2000);
      size = retornaTrancas().length;
   });

   test ("Should remove just one object in array",()=>{
      deletaTranca(size-1);
      expect((size-retornaTrancas().length)==1).toBe(true);
   });
});

describe("Testa a alteracao de status da tranca",()=>{
   let tranca;
   beforeAll(()=>{
      tranca = colocaTranca("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaTranca(tranca.id-1);
   });

   test ("Should return an object",()=>{
      expect(trancaStatus(tranca.id-1,"Teste3")!=null).toBe(true);
   });
   test ("Should actualize an status in array",()=>{

      tranca = trancaStatus(tranca.id-1,"Teste2");

      const statusDummy = "Teste";

      expect(tranca.status !== statusDummy).toBe(true);
   });
});

describe("Testa a alteracao de destrancado para trancado",()=>{
   let tranca;
   beforeAll(()=>{
      tranca = colocaTranca("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaTranca(tranca.id-1);
   });

   test ("Should actualize an tranca in array",()=>{
      trancar(tranca.id-1,0);

      expect(tranca.status == "OCUPADA" && tranca.bicicleta==2000).toBe(true);
   });
});
describe("Testa a alteracao de trancado para destrancado",()=>{
   let tranca;
   beforeAll(()=>{
      tranca = colocaTranca("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaTranca(tranca.id-1);
   });

   test ("Should actualize an tranca in array",()=>{
      destrancar(tranca.id-1);

      expect(tranca.status == "LIVRE" && tranca.bicicleta==0).toBe(true);
   });
});

describe("Testa recuperação de um indice com id",()=>{
   let tranca;

   beforeAll(()=>{
      tranca = colocaTranca("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaTranca(tranca.id-1);
   });

   test ("Should an indice of a tranca",()=>{
      expect(pegaIndiceTrancaId(tranca.id)).toBe(2);
   });
   test ("Should return -1",()=>{
      expect(pegaIndiceTrancaId(10000)).toBe(-1);
   });

});

describe("Testa recuperação de um indice com numero",()=>{
   let tranca;

   beforeAll(()=>{
      tranca = colocaTranca("Teste","Teste",2000,2000);
   });
   afterAll(()=>{
      deletaTranca(tranca.id-1);
   });

   test ("Should an indice of bike",()=>{
      expect(pegaIndiceTrancaNumero(tranca.numero)).toBe(0);
   });
   test ("Should return -1",()=>{
      expect(pegaIndiceTrancaNumero(10000)).toBe(-1);
   });

});

//
//Totem
//
describe("Testa recuperação de array totens",()=>{
   test ("Should return an array of totem",()=>{
      expect(Array.isArray(bdd.retornaTotens())).toBe(true);
   });
});

describe("Testa recuperação de um elemento do array totens",()=>{
   let novaTotem;

   beforeAll(()=>{
      novaTotem = colocaTotem("Teste","Teste");
   });
   afterAll(()=>{
      deletaTotem(novaTotem.id-1);
   });

   test ("Should return an object",()=>{
      expect(bdd.retornaTotemIndice(novaTotem.id-1) !== null).toBe(true);
   });
   test ("Should an object of tranca",()=>{
      expect(retornaTotemIndice(novaTotem.id-1)).toStrictEqual(novaTotem);
   });
   test ("Should return undefined",()=>{
      expect(bdd.retornaTotemIndice(1000)).toBe(undefined);
   });

});

describe("Testa colocação de um elemento no array de Totem",()=>{
   let array;
   let size;
   beforeAll(()=>{
      array = retornaTotens();
      size = array.length;
   });
   afterAll(()=>{
      deletaTotem(array.length-1);
   });

   test ("Should return an object",()=>{
      expect(colocaTotem("Teste","Teste")!==null).toBe(true);
      deletaTotem(array.length-1);
   });
   test ("Should put an object in array",()=>{
      colocaTotem("Teste","Teste");
      expect(size<array.length).toBe(true);
   });
});

describe("Testa atualização de um elemento no array de totem",()=>{
   let totem;
   beforeAll(()=>{
      totem = colocaTotem("Teste","Teste");
   });
   afterAll(()=>{
      deletaTotem(totem.id-1);
   });

   test ("Should return an object",()=>{
      expect(atualizaTotem(totem.id-1,"Teste","Teste")!==null).toBe(true);
   });
   test ("Should actualize an object in array",()=>{
      totem = atualizaTotem(totem.id-1,"Teste2","Teste");

      const totemDummy = {
         id: 1,
         localizacao: "Teste",
         descricao: "Teste",
         trancas: []
      }

      expect(totem !== totemDummy).toBe(true);
   });
});

describe("Testa remoção de um elemento no array de Totem",()=>{

   let size;
   beforeAll(()=>{
      colocaTotem("Teste","Teste");
      size = retornaTotens().length;
   });

   test ("Should remove just one object in array",()=>{
      deletaTotem(size-1);
      expect((size-retornaTotens().length)==1).toBe(true);
   });
});

describe("Testa recuperação de um indice de totem com id",()=>{
   let totem;

   beforeAll(()=>{
      totem = colocaTotem("Teste","Teste");
   });
   afterAll(()=>{
      deletaTotem(totem.id-1);
   });

   test ("Should an indice of totem",()=>{
      expect(pegaIndiceTotemId(totem.id)).toBe(2);
   });
   test ("Should return -1",()=>{
      expect(pegaIndiceTotemId(10000)).toBe(-1);
   });

});

describe("Testa a inserção de tranca em totem",()=>{
   let array;
   let size;
   let totem;
   beforeAll(()=>{
      totem = colocaTotem("Teste","Teste");
      array = totem.trancas;
      size = array.length;
   });
   afterAll(()=>{
      deletaTotem(totem.id-1);
   });


   test ("Should put an object in array",()=>{
      colocaTrancaTotem(totem.id-1,1234);
      expect(size<array.length).toBe(true);
   });
});
describe("Testa a remoção de tranca de totem",()=>{
   let array;
   let size;
   let totem;
   beforeAll(()=>{
      totem = colocaTotem("Teste","Teste");
      colocaTrancaTotem(totem.id-1,1234);
      array = totem.trancas;
      size = array.length;
   });
   afterAll(()=>{
      deletaTotem(totem.id-1);
   });

   test ("Should remove an object in array",()=>{
      removeTrancaTotem(totem.id-1,1234);
      expect(size>array.length).toBe(true);
   });
   test ("Should remove nothing ",()=>{
      expect(removeTrancaTotem(totem.id-1,12344)).toBe(-1);
   });
});

describe("Testa a obtenção de bicicletas do totem",()=>{
   let totem;
   beforeAll(()=>{
      totem = colocaTotem("Teste","Teste");
   });
   afterAll(()=>{
      deletaTotem(totem.id-1);
   });

   test ("Should return array ",()=>{
      expect(Array.isArray(puxaBicicletaTotem(totem.id-1))).toBe(true);
   });
});

//
//Inclusões
//
describe("Testa o resgitro da inserção de bicicleta em tranca",()=>{

   test ("Should return array ",()=>{
      expect(registraInclusaoBT(1,1,1)!=null).toBe(true);
   });
});

describe("Testa o resgitro da exclusao de bicicleta em tranca",()=>{

   test ("Should return array ",()=>{
      expect(registraExclusaoBT(1,1,1,"EM_REPARO")!=null).toBe(true);
   });
});

describe("Testa a comparacao de de exclusao BT",()=>{
   beforeAll(()=>{
      registraExclusaoBT(1,1,1,"EM_REPARO");
   });
   afterAll(()=>{

   });

   test ("Should return true ",()=>{
      expect(comparaExclusaoBT(1,1)).toBe(true);
   });

   test ("Should return true ",()=>{
      expect(comparaExclusaoBT(10,10)).toBe(false);
   });
});

describe("Testa o resgitro da inserção de tranca em totem",()=>{

   test ("Should return array ",()=>{
      expect(registraInclusaoTT(1,1)!=null).toBe(true);
   });
});

describe("Testa o resgitro da exclusao de bicicleta em tranca",()=>{

   test ("Should return array ",()=>{
      expect(registraExclusaoTT(1,1,"EM_REPARO")!=null).toBe(true);
   });
});

describe("Testa a comparacao de de exclusao TT",()=>{
   beforeAll(()=>{
      registraExclusaoTT(1,1,"EM_REPARO");
   });
   afterAll(()=>{

   });

   test ("Should return true ",()=>{
      expect(comparaExclusaoTT(1,1)).toBe(true);
   });

   test ("Should return true ",()=>{
      expect(comparaExclusaoTT(10,10)).toBe(false);
   });
});