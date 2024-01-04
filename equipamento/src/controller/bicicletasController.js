const {passaNullBicicleta, passaEmptyBicicleta} = require("../utils/validacoes");
const{pegaIndiceBicicletaId, retornaBicicletas,retornaBicicletaIndice,colocaBicicleta,atualizaBicicleta,deletaBicicleta,pegaIndiceTrancaId,retornaTrancaIndice,trancar,destrancar,bicicletaStatus,registraExclusaoBT,registraInclusaoBT,
    comparaExclusaoBT
} = require("../data/bdd");
const {enviarEmail} = require("../apis/enviarEmailApi");
const {getFuncionario} = require("../apis/funcionarioApi");

const getBicicletas = async (request, reply) => {
    return reply.status(200).send(retornaBicicletas());
};

const getBicicletaById = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicletaId(request.params.id);

        if (indice === -1) {
            reply.status(404);
            reply.send({codigo:404,message: "Não encontrado"});
            return;
        }

        reply.status(200);
        reply.send({message: "Bicicleta encontrada",bicicleta:retornaBicicletaIndice(indice)});

    } catch (error) {
        console.error(error);
        reply.status(404).send({
            codigo: "404",
            mensagem: "Requisição não encontrada."
        });
    }
};

const criarBicicleta = async (request, reply) => {
    try {
        const passaN = passaNullBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"})
            return;
        }
        const passaE = passaEmptyBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"})
            return;
        }

        const novaBike = colocaBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);

        const json = {
            message:"Dados cadastrados",
            bicicleta:novaBike
        }

        reply.status(200);
        reply.send(json);
    }
    catch (error) {
        console.error(error);
    }
};

const atualizarBicicleta = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicletaId(request.params.id);

        if(indice === -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }
        const passaN = passaNullBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);
        if (!passaN){
            reply.status(422);
            reply.send({message:"Dados inválidos (Null)"});
            return;
        }
        const passaE = passaEmptyBicicleta(request.body.marca, request.body.modelo, request.body.ano,request.body.numero);
        if (!passaE){
            reply.status(422);
            reply.send({message:"Dados inválidos (Empty)"});
            return;
        }

        const bicicletaSelecionada = atualizaBicicleta(indice,request.body.marca, request.body.modelo, request.body.numero,request.body.ano,request.body.status);

        reply.status(200);
        reply.send({message:"Dados atualizados",bicicleta:bicicletaSelecionada});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const atualizarBicicletaStatus = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicletaId(request.params.id);

        if(indice === -1) {
            reply.status(404);
            reply.send({message: "Não encontrado"});
            return;
        }

        const bicicletaSelecionada = bicicletaStatus(indice, request.params.acao);

        reply.status(200);
        reply.send({message:"Dados atualizados",bicicleta:bicicletaSelecionada});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dados inválidos');
    }
};

const removerBicicletaById = async(request, reply) => {
    try {
        const indice = pegaIndiceBicicletaId(request.params.id);

        if(indice == -1) {
            reply.status(404)
            reply.send({message: "Não encontrado"});
            return;
        }
        const bicicleta = retornaBicicletaIndice(indice);
        if (bicicleta.status!="APOSENTADA"){
            reply.status(422);
            reply.send({message: "SO DELETA APOSENTADA"});
            return;
        }

        deletaBicicleta(indice);

        reply.status(200);
        reply.send({message: "Dados removidos"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};

const integrarNaRede = async (request, reply) => {
    try{
        //validar numero bicicleta
        let indiceBicicleta = pegaIndiceBicicletaId(request.body.idBicicleta);
        if (indiceBicicleta == -1) {
            reply.status(422);
            reply.send({message: "Id bicicleta invalido"});
            return;
        }

        //validar status bicicleta
        let bicicleta = retornaBicicletaIndice(indiceBicicleta);
        if (bicicleta.status !== "NOVA" && bicicleta.status !== "EM_REPARO") {
            reply.status(422);
            reply.send({message: "Estado da bicicleta noggers."});
            return;
        }
        if (bicicleta.status == "EM_REPARO") {
            if (!comparaExclusaoBT(request.body.idFuncionario, request.body.idBicicleta)) {
                reply.status(422);
                reply.send({message: "QUEM TIRA BOTA"});
                return;
            }
        }

        //validarTranca
        let indiceTranca = pegaIndiceTrancaId(request.body.idTranca);
        if (indiceTranca == -1) {
            reply.status(422);
            reply.send({message: "Id tranca invalido"});
            return;
        }
        let tranca = retornaTrancaIndice(indiceTranca);

        if (tranca.status != "LIVRE") {
            reply.status(422);
            reply.send({message: "Estado tranca noggers"});
            return;
        }

        //registrar dados inclusao
        const dadoInclusao = registraInclusaoBT(request.body.idTranca, request.body.idBicicleta, request.body.idFuncionario);

        //fechar tranca
        trancar(indiceTranca, indiceBicicleta);

        //mudar status para disponivel
        bicicletaStatus(indiceBicicleta, "DISPONÍVEL");

        //enviar email
        const funcionario = await getFuncionario(request.body.idFuncionario);
        if(funcionario === undefined){
            return reply.status(404).send("Funcionario não encontrado.");
        }
        const resultadoEnvioEmail = await enviarEmail(funcionario.email, "Bicicletário System - Inclusao Bicicleta", "Cadastro realizado."  + JSON.stringify(dadoInclusao));
        if (resultadoEnvioEmail.status !== 200) {
            return reply.status(resultadoEnvioEmail.status).send(resultadoEnvioEmail.data + ". Email não enviado");
        }

        //voltar mensagem
        reply.status(200);
        reply.send({message: "Bicicleta inserida com sucesso"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};

const retirarDaRede = async (request, reply) => {
    try {//valida número tranca
        let indiceTranca = pegaIndiceTrancaId(request.body.idTranca);
        if (indiceTranca == -1) {
            reply.status(422);
            reply.send({message: "Numero tranca inválido"});
            return;
        }
        let tranca = retornaTrancaIndice(indiceTranca);
        if (tranca.status != "OCUPADA") {
            reply.status(422);
            reply.send({message: "Estado tranca noggers"});
            return;
        }

        //abre a tranca
        destrancar(indiceTranca);

        //bicicleta
        let indiceBicicleta = pegaIndiceBicicletaId(request.body.idBicicleta);
        if (indiceBicicleta == -1) {
            reply.status(422);
            reply.send({message: "Numero tranca inválido"});
            return;
        }
        bicicletaStatus(indiceBicicleta, request.body.status);

        //retirada
        const dadoExclusao = registraExclusaoBT(request.body.idTranca, request.body.idBicicleta, request.body.idFuncionario, request.body.status);

        //enviar Mensagem
        const funcionario = await getFuncionario(request.body.idFuncionario);
        if(funcionario === undefined){
            return reply.status(404).send("Funcionario não encontrado.");
        }
        const resultadoEnvioEmail = await enviarEmail(funcionario.email, "Bicicletário System - Remover Bicicleta da rede", "Remoção realizada."  + JSON.stringify(dadoExclusao));
        if (resultadoEnvioEmail.status !== 200) {
            return reply.status(resultadoEnvioEmail.status).send(resultadoEnvioEmail.data + ". Email não enviado");
        }

        reply.status(200);
        reply.send({messagem: "Bicicleta removida!"});
    }
    catch (error) {
        console.error(error);
        reply.status(422).send('Dado inválidos');
    }
};

module.exports = {
    getBicicletas,
    getBicicletaById,
    criarBicicleta,
    atualizarBicicleta,
    atualizarBicicletaStatus,
    removerBicicletaById,
    integrarNaRede,
    retirarDaRede,
}