const {passaNullTotem, passaEmptyTotem} = require("../utils/validacoes");
const {retornaTotens, pegaIndiceTotemId, retornaTotemIndice, colocaTotem, atualizaTotem, deletaTotem,
    puxaBicicletaTotem
} = require("../data/bdd");


const getTotens = async (request, reply) => {
    return reply.status(200).send(retornaTotens());
};

const getTotemById = async(request, reply) => {
    try {
        const indice = pegaIndiceTotemId(request.params.id);

        if (indice == -1) {
            reply.status(404);
            reply.send({codigo:404,message: "Não encontrado"});
            return;
        }

        reply.status(200);
        reply.send({message: "Totem encontrada",totem:retornaTotemIndice(indice)});


    } catch (error) {
        console.error(error);
        reply.status(404).send({
            codigo: "404",
            mensagem: "Requisição não encontrada."
        });
    }
};

const criarTotem = async (request, reply) => {
    try {
        const passaN = passaNullTotem(request.body.localizacao, request.body.descricao);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"})
            return;
        }
        const passaE = passaEmptyTotem(request.body.localizacao,request.body.descricao);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"})
            return;
        }

        const novoTotem = colocaTotem(request.body.localizacao,request.body.descricao);

        const json = {
            message:"Dados cadastrados",
            totem: novoTotem,
        }
        reply.status(200);
        reply.send(json);
    }
    catch (error) {
        console.error(error);
    }
};

const atualizarTotem = async(request, reply) => {
    try {
        const indice = pegaIndiceTotemId(request.params.id);

        if(indice == -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }
        const passaN = passaNullTotem(request.body.localizacao, request.body.descricao,request.body.numero);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"});
            return;
        }
        const passaE = passaEmptyTotem(request.body.localizacao, request.body.descricao,request.body.numero);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"});
            return;
        }

        const totemSelecionado = atualizaTotem(indice,request.body.localizacao,request.body.descricao);

        reply.status(200);
        reply.send({message:"Dados atualizados",totem:totemSelecionado});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const removerTotemById = async(request, reply) => {
    try {
        const indice = pegaIndiceTotemId(request.params.id);

        if(indice == -1) {
            reply.status(404)
            reply.send({message: "Não encontrado"});
            return;
        }

        deletaTotem(indice);

        reply.status(200);
        reply.send({message: "Dados removidos"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};

const retornaTrancaTotem = async (request,reply) =>{
    try{
        const indice = pegaIndiceTotemId(request.params.id);

        if (indice == -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }

        let totem = retornaTotemIndice(indice);

        reply.status(200);
        reply.send(totem.trancas);
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
}
const retornaBicicletaTotem = async (request,reply) =>{
    try{
        const indice = pegaIndiceTotemId(request.params.id);

        if (indice == -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }

        let bicicletas = puxaBicicletaTotem(indice);

        reply.status(200);
        reply.send(bicicletas);
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
}

module.exports = {
    getTotens,
    getTotemById,
    criarTotem,
    atualizarTotem,
    removerTotemById,
    retornaTrancaTotem,
    retornaBicicletaTotem,
}