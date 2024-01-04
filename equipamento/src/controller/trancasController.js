const {passaNullTranca, passaEmptyTranca} = require("../utils/validacoes");
const{pegaIndiceTrancaId, retornaTrancas, retornaTrancaIndice, colocaTranca, atualizaTranca, deletaTranca,
    trancar,
    destrancar,
    registraInclusaoTT,
    trancaStatus,
    registraExclusaoTT,
    pegaIndiceTotemId,
    colocaTrancaTotem,
    removeTrancaTotem,
    comparaExclusaoTT,
    pegaIndiceBicicletaId,
} = require("../data/bdd");
const {getFuncionario} = require("../apis/funcionarioApi");
const {enviarEmail} = require("../apis/enviarEmailApi");

const getTrancas = async (request, reply) => {
    return reply.status(200).send(retornaTrancas());
};

const getTrancaById = async(request, reply) => {
    try {
        const indice = pegaIndiceTrancaId(request.params.id);

        if (indice == -1) {
            reply.status(404);
            reply.send({codigo:404,message: "Não encontrado"});
            return;
        }

        reply.status(200);
        reply.send({message: "Tranca encontrada",tranca:retornaTrancaIndice(indice)});


    } catch (error) {
        console.error(error);
        reply.status(404).send({
            codigo: "404",
            mensagem: "Requisição não encontrada."
        });
    }
};

const criarTranca = async (request, reply) => {
    try {
        const passaN = passaNullTranca(request.body.localizacao, request.body.modelo, request.body.anoFabricacao,request.body.numero);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"})
            return;
        }
        const passaE = passaEmptyTranca(request.body.localizacao, request.body.modelo, request.body.anoFabricacao,request.body.numero);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"})
            return;
        }

        const novaTranca = colocaTranca(request.body.localizacao,request.body.modelo,request.body.anoFabricacao,request.body.numero);

        const json = {
            message:"Dados cadastrados",
            tranca: novaTranca,
        }
        reply.status(200);
        reply.send(json);
    }
    catch (error) {
        console.error(error);
    }
};

const atualizarTranca = async(request, reply) => {
    try {
        const indice = pegaIndiceTrancaId(request.params.id);

        if(indice == -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }
        const passaN = passaNullTranca(request.body.localizacao, request.body.modelo, request.body.anoFabricacao,request.body.numero,request.body.status);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"});
            return;
        }
        const passaE = passaEmptyTranca(request.body.localizacao, request.body.modelo, request.body.anoFabricacao,request.body.numero,request.body.status);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"});
            return;
        }

        const trancaSelecionada = atualizaTranca(indice,request.body.localizacao,request.body.modelo,request.body.anoFabricacao,request.body.numero,request.body.status,request.body.bicicleta);

        reply.status(200);
        reply.send({message:"Dados atualizados",tranca:trancaSelecionada});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const atualizarTrancaStatus = async(request, reply) => {
    try {
        const indice = pegaIndiceTrancaId(request.params.id);

        if(indice === -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }

        const trancaSelecionada = trancaStatus(indice, request.params.acao);

        reply.status(200);
        reply.send({message:"Dados atualizados",tranca:trancaSelecionada});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const removerTrancaById = async(request, reply) => {
    try {
        const indice = pegaIndiceTrancaId(request.params.id);
        if(indice == -1) {
            reply.status(404)
            reply.send({message: "Não encontrado"});
            return;
        }

        const tranca = retornaTrancaIndice(indice);
        if (tranca.status!="APOSENTADA"){
            reply.status(422);
            reply.status({message: "SO DELETA APOSENTADA"});
            return;
        }

        deletaTranca(indice);
        reply.status(200);
        reply.send({message: "Dados removidos"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};

const trancarEndpoint = async(request, reply) => {
    try {
        let indiceTranca = pegaIndiceTrancaId(request.params.id);
        if (indiceTranca == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }
        const indiceBicicleta = pegaIndiceBicicletaId(request.body.idBicicleta)
        if (indiceBicicleta == -1){
            reply.status(404);
            reply.send({message:"Bicicleta não encontrada"});
            return;
        }

        trancar(indiceTranca,indiceBicicleta);
        reply.status(200);
        reply.send(retornaTrancaIndice(indiceTranca));
    }
    catch (error){
        console.error(error);
        reply.status(422).send('inválido');
    }
};

//SINUCA DE BICO
const destrancarEndpoint = async(request, reply) => {
    try {
        let indiceTranca = pegaIndiceTrancaId(request.params.id);
        if (indiceTranca == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }

        destrancar(indiceTranca);
        reply.status(200);
        reply.send(retornaTrancaIndice(indiceTranca));
        return;
    }
    catch (error){
        console.error(error);
        reply.status(422).send('inválido');
    }
};

const integrarNaRede = async (request,reply) => {
    try {
        let indiceTotem = pegaIndiceTotemId(request.body.idTotem);
        if (indiceTotem == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }

        let indice = pegaIndiceTrancaId(request.body.idTranca);
        if (indice == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }
        let tranca = retornaTrancaIndice(indice);

        let teste = tranca.status;
        //REPARO
        if (teste=="EM_REPARO"){
            if (!comparaExclusaoTT(request.body.idFuncionario,request.body.idTranca)){
                reply.status(422);
                reply.send({message:"QUEM TIRA BOTA"});
                return;
            }
        }


        //atrelar tranca no totem;
        colocaTrancaTotem(indiceTotem,tranca.numero);

        //registrar dados inclusao
        const dadoInclusao= registraInclusaoTT(tranca.numero,request.body.idFuncionario);

        //alterar tranca
        trancaStatus(indice,"LIVRE");

        //mensagem
        const funcionario = await getFuncionario(request.body.idFuncionario);
        if(funcionario === undefined){
            return reply.status(404).send("Funcionario não encontrado.");
        }
        const resultadoEnvioEmail = await enviarEmail(funcionario.email, "Bicicletário System - Inclusao Tranca", "Cadastro realizado."  + JSON.stringify(dadoInclusao));
        if (resultadoEnvioEmail.status !== 200) {
            return reply.status(resultadoEnvioEmail.status).send(resultadoEnvioEmail.data + ". Email não enviado");
        }

        reply.status(200);
        reply.send({message: "TRANCA INCLUIDA"});
    }
    catch (error){
        console.error(error);
        reply.status(422).send('inválido');
    }
};
const removerDaRede = async (request,reply) => {
    try {
        let indiceTotem = pegaIndiceTotemId(request.body.idTotem);
        if (indiceTotem == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }

        let indice = pegaIndiceTrancaId(request.body.idTranca);
        if (indice == -1){
            reply.status(404);
            reply.send({message:"Não encontrado"});
            return;
        }
        let tranca = retornaTrancaIndice(indice);
        //REPARO

        removeTrancaTotem(indiceTotem,tranca.numero);

        //registrar dados exclusão
        const dadoExclusao = registraExclusaoTT(tranca.numero,request.body.idFuncionario,request.body.status);

        //alterar tranca
        trancaStatus(indice,request.body.status);

        //mensagem
        const funcionario = await getFuncionario(request.body.idFuncionario);
        if(funcionario === undefined){
            return reply.status(404).send("Funcionario não encontrado.");
        }
        const resultadoEnvioEmail = await enviarEmail(funcionario.email, "Bicicletário System - Remover Tranca da rede", "Remoção realizada."  + JSON.stringify(dadoExclusao));
        if (resultadoEnvioEmail.status !== 200) {
            return reply.status(resultadoEnvioEmail.status).send(resultadoEnvioEmail.data + ". Email não enviado");
        }

        reply.status(200);
        reply.send({message: "TRANCA REMOVIDA"});

    }catch (error){
        console.error(error);
        reply.status(422).send('inválido');
    }
};

module.exports = {
    getTrancas,
    getTrancaById,
    criarTranca,
    atualizarTranca,
    atualizarTrancaStatus,
    removerTrancaById,
    trancarEndpoint,
    destrancarEndpoint,
    integrarNaRede,
    removerDaRede,
}