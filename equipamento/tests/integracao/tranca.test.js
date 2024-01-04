'use strict'

const { build } = require('../../src/app');

//testa get
describe('get/', () => {
    test('Should return 200', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: '/tranca'
        });

        expect(response.statusCode).toBe(200);
    });

    test('Should return error when wrong url called', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: '/trancas'
        });

        expect(response.statusCode).toBe(404);
    });

    test("Should a populated array size be bigger than 0", async ()=>{
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                numero: "1234"
            }
        });

        //Necessário parsear os bodys
        const parsedPost = JSON.parse(post.body);

        const response = await app.inject({
            method: 'GET',
            url: '/tranca'
        });

        expect(JSON.parse(response.body).length >= 1 ).toBe(true);

        await app.inject({
            method:'put',
            url: `tranca/${parsedPost.tranca.id}/status/APOSENTADA`,
        })

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        });
    });
});

//testa get/id
describe('get/id', () => {
    test('Should return one trancazada when called and status 200', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response = await app.inject({
            method: 'GET',
            url: `tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.tranca).toStrictEqual(
            {
                id: parsedPost.tranca.id,
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "NOVA",
                bicicleta: 0,
                numero: "1234"
            }
        );

        await app.inject({
            method:'put',
            url: `tranca/${parsedPost.tranca.id}/status/APOSENTADA`,
        })

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });

    test('Should return 404 due to miss', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: 'tranca/0'
        });

        expect(response.statusCode).toBe(404);

    });

    test('Should return 404 due to error', async () => {
        const app = build();

        const response = await app.inject({
            method: 'GET',
            url: 'tranca/aba'
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
            url: '/tranca'
        });
        const parsedResponse1 = JSON.parse(response1.body);

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response2 = await app.inject({
            method: 'GET',
            url: '/tranca'
        });
        const parsedResponse2 = JSON.parse(response2.body);

        const response3 = await app.inject({
            method: 'GET',
            url: `tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse3 = JSON.parse(response3.body);

        expect(post.statusCode).toBe(200);
        expect(parsedResponse2.length>parsedResponse1.length).toBe(true);
        expect(parsedResponse3.tranca).toStrictEqual(parsedPost.tranca);

        await app.inject({
            method:'put',
            url: `tranca/${parsedPost.tranca.id}/status/APOSENTADA`,
        })

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });
    test('Should return 422 due to null', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                modelo: "trancafirme",
                anoFabricacao: "2011",
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
            url: '/tranca',
            body:{
                localizacao: "",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        expect(post.statusCode).toBe(422);
        expect(parsedPost.message).toBe("Dados inválidos (Empty)");
    });
});

//teste put
describe("PUT /id", () => {
    test('Should return 200 and update the data correctly', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response1 = await app.inject({
            method: 'GET',
            url: `/tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse1 = JSON.parse(response1.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/${parsedPost.tranca.id}`,
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "APOSENTADA",
                bicicleta: "0",
                numero: "1234"
            }
        })
        const parsedPut = JSON.parse(put.body);

        const response = await app.inject({
            method: 'GET',
            url: `/tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(put.statusCode).toBe(200);
        expect(parsedResponse1.tranca != parsedResponse.tranca).toBe(true);
        expect(parsedResponse.tranca).toStrictEqual(parsedPut.tranca);

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });
    test('Should return 422 due to null', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/${parsedPost.tranca.id}`,
            body:{
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "APOSENTADA",
                numero: "1234",
                bicicleta: 0
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(422);
        expect(parsedPut.message).toBe("Dados inválidos (Null)");
        await app.inject({
            method:'put',
            url: `tranca/${parsedPost.tranca.id}/status/APOSENTADA`,
        })
        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })

    });
    test('Should return 422 due to empty', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/${parsedPost.tranca.id}`,
            body:{
                localizacao: "",
                modelo: "Caloteira",
                anoFabricacao: "2025",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(422);
        expect(parsedPut.message).toBe("Dados inválidos (Empty)");
        await app.inject({
            method:'put',
            url: `tranca/${parsedPost.tranca.id}/status/APOSENTADA`,
        })
        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });
    test('Should return 404', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/0`,
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(404);
        expect(parsedPut.message).toBe("Não encontrado");
        await app.inject({
            method:'put',
            url: `tranca/${parsedPost.tranca.id}/status/APOSENTADA`,
        })
        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })

    });
});

//teste atualizar status
describe("PUT /id/status/acao", () => {
    test('Should return 200 and change the data correctly', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "teste",
                modelo: "Caloteira",
                anoFabricacao: "2025",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/${parsedPost.tranca.id}/status/APOSENTADA`
        })

        const response = await app.inject({
            method: 'GET',
            url: `/tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(put.statusCode).toBe(200);
        expect(parsedResponse.tranca.status).toStrictEqual("APOSENTADA");

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });

    test('Should return 404', async () => {
        const app = build();

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/0/status/EM_REPARO`
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
            url: '/tranca',
            body:{
                localizacao: "endereco teste",
                modelo: "trancafirme",
                anoFabricacao: "2011",
                status: "nova",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const response1 = await app.inject({
            method: 'GET',
            url: `/tranca`
        });
        const parsedResponse1 = JSON.parse(response1.body);

        await app.inject({
            method:'put',
            url: `tranca/${parsedPost.tranca.id}/status/APOSENTADA`,
        })
        const deletE = await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })

        const response2 = await app.inject({
            method: 'GET',
            url: `/tranca`
        });
        const parsedResponse2 = JSON.parse(response2.body);

        expect(deletE.statusCode).toBe(200);
        expect(parsedResponse2.length<parsedResponse1.length).toBe(true);

        const response3 = await app.inject({
            method: 'GET',
            url: `/tranca/${parsedPost.tranca.id}`
        });

        expect(response3.statusCode).toBe(404);

    });
    test("Should return 404 and remove Nothing",async ()=>{
        const app = build();
        const deletE = await app.inject({
            method:'delete',
            url: `tranca/0`,
        })

        expect(deletE.statusCode).toBe(404);

    });
});

//teste trancar
describe("PUT /id/trancar", () => {
    test('Should return 200 and change the data correctly', async () => {
        const app = build();

        const post = await app.inject({
            method:'POST',
            url: '/tranca',
            body:{
                localizacao: "teste",
                modelo: "Caloteira",
                anoFabricacao: "2025",
                numero: "1234"
            }
        })
        const parsedPost = JSON.parse(post.body);

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/${parsedPost.tranca.id}/status/APOSENTADA`
        })

        const response = await app.inject({
            method: 'GET',
            url: `/tranca/${parsedPost.tranca.id}`
        });
        const parsedResponse = JSON.parse(response.body);

        expect(put.statusCode).toBe(200);
        expect(parsedResponse.tranca.status).toStrictEqual("APOSENTADA");

        await app.inject({
            method:'delete',
            url: `tranca/${parsedPost.tranca.id}`,
        })
    });

    test('Should return 404 due to tranca', async () => {
        const app = build();

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/0/trancar`,
            body: {
                idBicicleta:1,
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(404);
        expect(parsedPut.message).toBe("Não encontrado");
    });
    test('Should return 404 due to bicicleta', async () => {
        const app = build();

        const put = await app.inject({
            method:'PUT',
            url: `/tranca/1/trancar`,
            body: {
                idBicicleta:99999,
            }
        })
        const parsedPut = JSON.parse(put.body);

        expect(put.statusCode).toBe(404);
        expect(parsedPut.message).toBe("Bicicleta não encontrada");
    });
});

//testa integração
describe("integra", ()=>{
    test("Should return 200 and integrate",async ()=>{
        const app = build();

        const integraTranca = await app.inject({
            method:'POST',
            url: '/tranca/integrarNaRede',
            body:{
                idTranca:"1",
                idFuncionario:"b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTotem: "1",
            }
        })
        const parsedIntegracao = JSON.parse(integraTranca.body);

        expect(integraTranca.statusCode).toBe(200);
        expect(parsedIntegracao.message).toBe("TRANCA INCLUIDA");

        await app.inject({
            method:'POST',
            url: '/tranca/retirarDaRede',
            body:{
                idTranca:"1",
                idFuncionario: "b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTotem: "1",
                status: "EM_REPARO"
            }
        })
    });
    test("Should return 404 due to tranca n existe",async ()=>{
        const app = build();

        const integraTranca = await app.inject({
            method:'POST',
            url: '/tranca/integrarNaRede',
            body:{
                idTranca:"0",
                idFuncionario:"b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTotem: "1",
            }
        })
        const parsedIntegracao = JSON.parse(integraTranca.body);

        expect(integraTranca.statusCode).toBe(404);
        expect(parsedIntegracao.message).toBe("Não encontrado");
    });
    test("Should return 404 due to totem n existe",async ()=>{
        const app = build();

        const integraTranca = await app.inject({
            method:'POST',
            url: '/tranca/integrarNaRede',
            body:{
                idTranca:"1",
                idFuncionario:"b57a9ded-dd1e-44ba-8c10-d231efb70ad1",
                idTotem: "0",
            }
        })
        const parsedIntegracao = JSON.parse(integraTranca.body);

        expect(integraTranca.statusCode).toBe(404);
        expect(parsedIntegracao.message).toBe("Não encontrado");
    });
    test("Should return 422 due to funcionario n existe",async ()=>{
        const app = build();

        const integraTranca = await app.inject({
            method:'POST',
            url: '/tranca/integrarNaRede',
            body:{
                idTranca:"1",
                idFuncionario:"0",
                idTotem: "1",
            }
        })

        expect(integraTranca.statusCode).toBe(422);
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