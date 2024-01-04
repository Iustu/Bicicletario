'use strict'

const { build } = require('../../src/app');

//testa get
describe('get/', () => {
    test('Should return 200', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: '/bicicleta'
        });

        expect(response.statusCode).toBe(200);
    });

    test('Should return error when wrong url called', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: '/bicicletas'
        });

        expect(response.statusCode).toBe(404);
    });

    test("Should a populated array size be bigger than 0", async ()=>{
        const app = build();

        await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                numero: "1234"
            }
        });

        const response = await app.inject({
            method: 'GET',
            url: '/bicicleta'
        });

        expect(JSON.parse(response.body).length >= 1 ).toBe(true);
    });
});

//testa get/id
describe('get/id', () => {
    test('Should return one bikezada when called and status 200', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response = await app.inject({
            method: 'GET',
            url: `bicicleta/${parsedPost.bicicleta.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.bicicleta).toStrictEqual(
            {
                id: parsedPost.bicicleta.id,
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "NOVA",
                numero: "1234"
            }
        );

    });

    test('Should return 404 due to miss', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: 'bicicleta/0'
        });

        expect(response.statusCode).toBe(404);

    });

    test('Should return 404 due to error', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: 'bicicleta/aba'
        });

        expect(response.statusCode).toBe(404);

    });
});

//testa Post
 describe("POST /", () => {
     test('Should return 200 and add to array', async () => {
         const app = build();

         const response1 = await app.inject({
             method: 'GET',
             url: '/bicicleta'
         });
         const parsedResponse1 = JSON.parse(response1.body);

         const post = await app.inject({
             method:'POST',
             url: '/bicicleta',
             body:{
                 marca: "caloi",
                 modelo: "Caloteira",
                 ano: "2025",
                 status: "nova",
                 numero: "1234"
             }
         })
         const parsedPost = JSON.parse(post.body);

         const response2 = await app.inject({
             method: 'GET',
             url: '/bicicleta'
         });
         const parsedResponse2 = JSON.parse(response2.body);

         const response3 = await app.inject({
             method: 'GET',
             url: `bicicleta/${parsedPost.bicicleta.id}`
         });
         const parsedResponse3 = JSON.parse(response3.body);

         expect(post.statusCode).toBe(200);
         expect(parsedResponse2.length>parsedResponse1.length).toBe(true);
         expect(parsedResponse3.bicicleta).toStrictEqual(parsedPost.bicicleta);

     });
     test('Should return 422 due to null', async () => {
         const app = build();

         const post = await app.inject({
             method:'POST',
             url: '/bicicleta',
             body:{
                 modelo: "Caloteira",
                 ano: "2025",
                 numero: "1234"
             }
         })
         const parsedPost = JSON.parse(post.body);

         expect(post.statusCode).toBe(422);
         expect(parsedPost.message).toBe("Dados inválidos (Null)");

     });
     test('Should return 422 due to empty', async () => {
         const app = build();

         const post = await app.inject({
             method:'POST',
             url: '/bicicleta',
             body:{
                 marca: "",
                 modelo: "Caloteira",
                 ano: "2025",
                 numero: "1234"
             }
         })
         const parsedPost = JSON.parse(post.body);

         expect(post.statusCode).toBe(422);
         expect(parsedPost.message).toBe("Dados inválidos (Empty)");
     });
 });

describe("PUT /id", () => {
    test('Should return 200 and change the data correctly', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response1 = await app.inject({
            method: 'GET',
            url: `/bicicleta/${parsedPost.bicicleta.id}`
        });
        const parsedResponse1 = JSON.parse(response1.body);

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/${parsedPost.bicicleta.id}`,
            body:{
                marca: "caloi",
                modelo: "Caloteira2",
                ano: "2022",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPut = JSON.parse(put.body);

        const response = await app.inject({
            method: 'GET',
            url: `/bicicleta/${parsedPost.bicicleta.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(put.statusCode).toBe(200);
        expect(parsedResponse1.bicicleta != parsedResponse.bicicleta).toBe(true);
        expect(parsedResponse.bicicleta).toStrictEqual(parsedPut.bicicleta);
    });
    test('Should return 422 due to null', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca:"Caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/${parsedPost.bicicleta.id}`,
            body:{
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(422);
        expect(parsedPut.message).toBe("Dados inválidos (Null)");
    });
    test('Should return 422 due to empty', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca: "Caloi",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/${parsedPost.bicicleta.id}`,
            body:{
                marca: "",
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(422);
        expect(parsedPut.message).toBe("Dados inválidos (Empty)");
    });
    test('Should return 404', async () => {
        const app = build();

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/0`,
            body:{
                modelo: "Caloteira",
                ano: "2025",
                status: "nova",
                numero: "1234"

            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(404);
        expect(parsedPut.message).toBe("Não encontrado");
    });
});

//teste atualizar status
describe("PUT /id/status/acao", () => {
    test('Should return 200 and change the data correctly', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca: "caloi",
                modelo: "Caloteira",
                ano: "2025",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/${parsedPost.bicicleta.id}/status/APOSENTADA`
        })

        const response = await app.inject({
            method: 'GET',
            url: `/bicicleta/${parsedPost.bicicleta.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(put.statusCode).toBe(200);
        expect(parsedResponse.bicicleta.status).toStrictEqual("APOSENTADA");

        await app.inject({
            method:'delete',
            url: `bicicleta/${parsedPost.bicicleta.id}`,
        })
    });

    test('Should return 404', async () => {
        const app = build();

        const put = await app.inject({
            method:'PUT',
            url: `/bicicleta/0/status/EM_REPARO`
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(404);
        expect(parsedPut.message).toBe("Não encontrado");
    });
});


//testa Delete
describe("Delete /id", ()=>{
    test("Should return 200 and remove from array",async ()=>{
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/bicicleta',
            body:{
                marca:"Caloi",
                modelo: "Caloteira",
                ano: "2025",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        await app.inject({
            method:'PUT',
            url: `/bicicleta/${parsedPost.bicicleta.id}/status/APOSENTADA`
        })

        const response1 = await app.inject({
            method: 'GET',
            url: `/bicicleta`
        });
        const parsedResponse1 = JSON.parse(response1.body);

        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/${parsedPost.bicicleta.id}`,
        })

        const response2 = await app.inject({
            method: 'GET',
            url: `/bicicleta`
        });
        const parsedResponse2 = JSON.parse(response2.body);

        expect(deletE.statusCode).toBe(200);
        expect(parsedResponse2.length<parsedResponse1.length).toBe(true);

        const response3 = await app.inject({
            method: 'GET',
            url: `/bicicleta/${parsedPost.bicicleta.id}`
        });

        expect(response3.statusCode).toBe(404);

    });
    test("Should return 404 and remove Nothing",async ()=>{
        const app = build();
        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/0`,
        })

        expect(deletE.statusCode).toBe(404);
    });
    test("Should not delete a non aposentada",async ()=>{
        const app = build();
        const deletE = await app.inject({
            method:'delete',
            url: `bicicleta/1`,
        })
        const parsedDelete = JSON.parse(deletE.body);

        expect(deletE.statusCode).toBe(422);
        expect(parsedDelete.message).toBe("SO DELETA APOSENTADA");
    });
});

//testa integração
describe("integra", ()=>{
    test("Should return 200 and integrate",async ()=>{
        const app = build();

        await app.inject({
            method:'POST',
            url: '/tranca/integrarNaRede',
            body:{
                idTranca:"1",
                idFuncionario:"b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTotem: "1",
            }
        })

        const integraBicicleta = await app.inject({
            method:'POST',
            url: '/bicicleta/integrarNaRede',
            body:{
                idBicicleta:"1",
                idFuncionario: "b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTranca: "1",
            }
        })
        const parsedIntegracao = JSON.parse(integraBicicleta.body);
        expect(integraBicicleta.statusCode).toBe(200);
        expect(parsedIntegracao.message).toBe("Bicicleta inserida com sucesso");

        await app.inject({
            method:'POST',
            url: '/bicicleta/retirarDaRede',
            body:{
                idBicicleta:"1",
                idFuncionario: "b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTranca: "1",
                status: "EM_REPARO"
            }
        })
    });
    test("Should return 422 due to bicicleta n existe",async ()=>{
        const app = build();

        await app.inject({
            method:'POST',
            url: '/tranca/integrarNaRede',
            body:{
                idTranca:"1",
                idFuncionario:"b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTotem: "1",
            }
        })

        const integraBicicleta = await app.inject({
            method:'POST',
            url: '/bicicleta/integrarNaRede',
            body:{
                idBicicleta:"10000",
                idFuncionario: "b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTranca: "1",
            }
        })
        const parsedIntegracao = JSON.parse(integraBicicleta.body);
        expect(integraBicicleta.statusCode).toBe(422);
        expect(parsedIntegracao.message).toBe("Id bicicleta invalido");

    });
    test("Should return 422 due to tranca n existe",async ()=>{
        const app = build();

        await app.inject({
            method:'POST',
            url: '/tranca/integrarNaRede',
            body:{
                idTranca:"1",
                idFuncionario:"b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTotem: "1",
            }
        })

        const integraBicicleta = await app.inject({
            method:'POST',
            url: '/bicicleta/integrarNaRede',
            body:{
                idBicicleta:"1",
                idFuncionario: "b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTranca: "100000",
            }
        })
        const parsedIntegracao = JSON.parse(integraBicicleta.body);
        expect(integraBicicleta.statusCode).toBe(422);
        expect(parsedIntegracao.message).toBe("Id tranca invalido");
    });
    test("Should return 422 due to funcionario n existe",async ()=>{
        const app = build();

        await app.inject({
            method:'POST',
            url: '/tranca/integrarNaRede',
            body:{
                idTranca:"1",
                idFuncionario:"b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTotem: "1",
            }
        })

        const integraBicicleta = await app.inject({
            method:'POST',
            url: '/bicicleta/integrarNaRede',
            body:{
                idBicicleta:"1",
                idFuncionario: "1",
                idTranca: "1",
            }
        })

        expect(integraBicicleta.statusCode).toBe(422);
    });
    test("Should return 422 due to tranca ruim",async ()=>{
        const app = build();

        await app.inject({
            method:'PUT',
            url: "/tranca/1/status/APOSENTADA"
        })

        const integraBicicleta = await app.inject({
            method:'POST',
            url: '/bicicleta/integrarNaRede',
            body:{
                idBicicleta:"1",
                idFuncionario: "b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTranca: "1",
            }
        })
        const parsedIntegracao = JSON.parse(integraBicicleta.body);

        expect(integraBicicleta.statusCode).toBe(422);
        expect(parsedIntegracao.message).toBe("Estado tranca noggers");
    });
    test("Should return 422 due to bicicleta ruim",async ()=>{
        const app = build();

        await app.inject({
            method:'POST',
            url: '/tranca/integrarNaRede',
            body:{
                idTranca:"1",
                idFuncionario:"b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTotem: "1",
            }
        })

        await app.inject({
            method:'PUT',
            url: "/bicicleta/1/status/DISPONIVEL"
        })

        const integraBicicleta = await app.inject({
            method:'POST',
            url: '/bicicleta/integrarNaRede',
            body:{
                idBicicleta:"1",
                idFuncionario: "b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTranca: "1",
            }
        })
        const parsedIntegracao = JSON.parse(integraBicicleta.body);

        expect(integraBicicleta.statusCode).toBe(422);
        expect(parsedIntegracao.message).toBe("Estado da bicicleta noggers.");

        await app.inject({
            method:'PUT',
            url: "/bicicleta/1/status/NOVA"
        })
    });
    test("Should return 422 due to quem tirou nao botou",async ()=>{
        const app = build();

        await app.inject({
            method:'POST',
            url: '/bicicleta/integrarNaRede',
            body:{
                idBicicleta:"1",
                idFuncionario: "b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTranca: "1",
            }
        })

        await app.inject({
            method:'POST',
            url: '/bicicleta/retirarDaRede',
            body:{
                idBicicleta:"1",
                idFuncionario: "b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTranca: "1",
                status:"EM_REPARO",
            }
        })

        const integraBicicleta2 = await app.inject({
            method:'POST',
            url: '/bicicleta/integrarNaRede',
            body:{
                idBicicleta:"1",
                idFuncionario: "1",
                idTranca: "1",
            }
        })
        const parsedIntegracao2 = JSON.parse(integraBicicleta2.body);

        expect(integraBicicleta2.statusCode).toBe(422);
        expect(parsedIntegracao2.message).toBe("QUEM TIRA BOTA");
    });

});



