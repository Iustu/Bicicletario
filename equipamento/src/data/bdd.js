//
//Bicicletas
//
let bicicletas = [
    {id: 1,
    marca: "Caloi",
    modelo: "Caloteira",
    numero: 2000,
    ano: 2020,
    status: "NOVA"},
    {id: 2,marca: "Caloi", modelo: "Caloteira", numero: 2, ano: 2021, status: "DISPONÍVEL"},
];

function retornaBicicletas(){
    return bicicletas;
}

function retornaBicicletaIndice(indice){
    return bicicletas[indice];
}

function colocaBicicleta(marca, modelo, ano, numero){
    const newId = bicicletas.length+1;
    const bike = {
            id: newId,
            marca: marca,
            modelo: modelo,
            numero: numero,
            ano: ano,
            status: "NOVA",
        };
    bicicletas.push(bike);
    return bike;
}

function atualizaBicicleta(indice,marca,modelo,numero,ano,status){
    const bicicletaSelecionada = bicicletas[indice];

    bicicletaSelecionada.marca = marca;
    bicicletaSelecionada.modelo = modelo;
    bicicletaSelecionada.ano = ano;
    bicicletaSelecionada.numero = numero;
    bicicletaSelecionada.status = status;

    return bicicletaSelecionada;
}

function bicicletaStatus(indice,status){
    const bicicletaSelecionada = bicicletas[indice];

    bicicletaSelecionada.status = status;

    return bicicletaSelecionada;
}

function deletaBicicleta(indice){
    bicicletas.splice(indice,1);
}

function pegaIndiceBicicletaId(id) {
    const len = bicicletas.length;

    for (let i = 0; i < len; i++) {
        if (bicicletas[i].id == id) {
            return i;
        }
    }
    return -1;
}
function pegaIndiceBicicletaNumero(numero) {
    const len = bicicletas.length;

    for (let i = 0; i < len; i++) {
        if (bicicletas[i].numero == numero) {
            return i;
        }
    }
    return -1;
}

//
//Trancas
//
let trancas = [
    {id: 1,
    localizacao: "Rua da tranca",
    modelo: "Tranca bem firme",
    numero: 2000,
    anoFabricacao: 2019,
    bicicleta:0,
    status: "NOVA"},
    {id: 2, localizacao: "Rua da tranca", modelo: "Tranca bem firme", numero: 2, anoFabricacao: 2019, bicicleta:2, status: "OCUPADA"},
];

function retornaTrancas(){
    return trancas;
}

function retornaTrancaIndice(indice){
    return trancas[indice];
}

function colocaTranca(localizacao, modelo, anoFabricacao, numero){
    const newId = trancas.length+1;
    const tranca = {
        id: newId,
        localizacao: localizacao,
        modelo: modelo,
        numero: numero,
        anoFabricacao: anoFabricacao,
        bicicleta:0,
        status: "NOVA",
    };
    trancas.push(tranca);
    return tranca;
}

function atualizaTranca(indice,localizacao,modelo,anoFabricacao,numero,status,bicicleta){
    const trancaSelecionada = trancas[indice];

    trancaSelecionada.localizacao = localizacao;
    trancaSelecionada.modelo = modelo;
    trancaSelecionada.anoFabricacao = anoFabricacao;
    trancaSelecionada.bicicleta = bicicleta;
    trancaSelecionada.numero = numero;
    trancaSelecionada.status = status;

    return trancaSelecionada;
}

function trancaStatus(indice,status){
    const trancaSelecionada = trancas[indice];

    trancaSelecionada.status = status;

    return trancaSelecionada;
}

function deletaTranca(indice){
    trancas.splice(indice,1);
}

function trancar(indiceTranca,indiceBicicleta){
    let trancaSelecionada = trancas[indiceTranca];
    let bicicletaSelecionada = bicicletas[indiceBicicleta];
    trancaSelecionada.status = "OCUPADA";
    trancaSelecionada.bicicleta = bicicletaSelecionada.numero;
    bicicletaSelecionada.status = "LIVRE"
}
function destrancar(indiceTranca){
    let trancaSelecionada = trancas[indiceTranca];
    trancaSelecionada.status = "LIVRE";
    trancaSelecionada.bicicleta = 0;
}

function pegaIndiceTrancaId(id) {
    const len = trancas.length;

    for (let i = 0; i < len; i++) {
        if (trancas[i].id == id) {
            return i;
        }
    }
    return -1;
}
function pegaIndiceTrancaNumero(numero) {
    const len = trancas.length;

    for (let i = 0; i < len; i++) {
        if (trancas[i].numero == numero) {
            return i;
        }
    }
    return -1;
}

//
//Totem
//
let totens = [
    {id: 1,
    localizacao: "Teste",
    descricao: "Teste",
    trancas: []},
    {id: 2, localizacao: "Teste", descricao: "Teste", trancas: [2,]},
];

function retornaTotens(){
    return totens;
}

function retornaTotemIndice(indice){
    return totens[indice];
}

function colocaTotem(localizacao, descricao){
    const newId = totens.length+1;
    const totem = {
        id: newId,
        localizacao: localizacao,
        descricao: descricao,
        trancas:[],
    };
    totens.push(totem);
    return totem;
}

function atualizaTotem(indice,localizacao,descricao){
    const totemSelecionado = totens[indice];

    totemSelecionado.localizacao = localizacao;
    totemSelecionado.descricao = descricao;

    return totemSelecionado;
}

function deletaTotem(indice){
    totens.splice(indice,1);
}

function colocaTrancaTotem(indiceTotem,numeroTranca){
    let totemSelecionado = totens[indiceTotem];
    totemSelecionado.trancas.push(numeroTranca);
}

function removeTrancaTotem(indiceTotem, numeroTranca){
    let totemSelecionado = totens[indiceTotem];
    const len = totemSelecionado.trancas.length;

    for (let i = 0; i < len; i++) {
        if (totemSelecionado.trancas[i] == numeroTranca) {
            totemSelecionado.trancas.splice(i,1);
            return;
        }
    }
    return -1;
}

function puxaBicicletaTotem(indiceTotem){
    let totemSelecionado = totens[indiceTotem];
    const len = totemSelecionado.trancas.length;
    let bicicletas = [];

    for (let i = 0; i < len; i++) {
        let tranca = retornaTrancaIndice(pegaIndiceTrancaNumero(totemSelecionado.trancas[i]));
        if (tranca.bicicleta != 0 ) {
            bicicletas.push(tranca.bicicleta);
        }
    }
    return bicicletas;
}

function pegaIndiceTotemId(id) {
    const len = totens.length;
    for (let i = 0; i < len; i++) {
        if (totens[i].id == id) {
            return i;
        }
    }
    return -1;
}

//Inclusao
let inclusaoBicicletaTranca = [];
function registraInclusaoBT(idTranca, idBicicleta, idFuncionario){
    const newId = inclusaoBicicletaTranca.length+1;
    const inclusao = {
        id: newId,
        dataHora: Date(),
        idBicicleta: idBicicleta,
        idTranca: idTranca,
        idFuncionario: idFuncionario
    };
    inclusaoBicicletaTranca.push(inclusao);
    return inclusao;
}

//Exclusao
let exclusaoBicicletaTranca = [];
function registraExclusaoBT(idTranca, idBicicleta, idFuncionario,acaoRetirada){
    const newId = exclusaoBicicletaTranca.length+1;
    const exclusao = {
        id: newId,
        dataHora: Date(),
        idBicicleta: idBicicleta,
        idTranca: idTranca,
        idFuncionario: idFuncionario,
        acaoRetirada: acaoRetirada,
    };
    exclusaoBicicletaTranca.push(exclusao);
    return exclusao;
}
function comparaExclusaoBT(idFuncionario,idBicicleta){
    const len = exclusaoBicicletaTranca.length;

    for (let i = len-1; i >= 0; i--) {

        if (exclusaoBicicletaTranca[i].idBicicleta == idBicicleta && exclusaoBicicletaTranca[i].idFuncionario==idFuncionario) {
            return true;
        }
    }
    return false;
}

let inclusaoTrancaTotem = [];
function registraInclusaoTT(numeroTranca, idFuncionario){
    const newId = inclusaoTrancaTotem.length+1;
    const inclusao = {
        id: newId,
        dataHora: Date(),
        numeroTranca: numeroTranca,
        idFuncionario: idFuncionario
    };
    inclusaoTrancaTotem.push(inclusao);

    return inclusao;
}

//Exclusao
let exclusaoTrancaTotem = [];
function registraExclusaoTT(idTranca, idFuncionario,acaoRetirada){
    const newId = exclusaoTrancaTotem.length+1;
    const exclusao = {
        id: newId,
        dataHora: Date(),
        idTranca: idTranca,
        idFuncionario: idFuncionario,
        acaoRetirada: acaoRetirada,
    };
    exclusaoTrancaTotem.push(exclusao);
    return exclusao;
}
function comparaExclusaoTT(idFuncionario,numeroTranca){
    const len = exclusaoTrancaTotem.length;

    for (let i = len-1; i >= 0; i--) {

        if (exclusaoTrancaTotem[i].idTranca == numeroTranca && exclusaoTrancaTotem[i].idFuncionario==idFuncionario) {
            return true;
        }
    }
    return false;
}

module.exports = {
    retornaBicicletas,
    retornaBicicletaIndice,
    colocaBicicleta,
    atualizaBicicleta,
    bicicletaStatus,
    deletaBicicleta,
    pegaIndiceBicicletaId,
    pegaIndiceBicicletaNumero,
    retornaTrancas,
    retornaTrancaIndice,
    colocaTranca,
    atualizaTranca,
    trancaStatus,
    deletaTranca,
    trancar,
    destrancar,
    pegaIndiceTrancaId,
    pegaIndiceTrancaNumero,
    retornaTotens,
    retornaTotemIndice,
    colocaTotem,
    atualizaTotem,
    deletaTotem,
    pegaIndiceTotemId,
    puxaBicicletaTotem,
    registraInclusaoBT,
    registraExclusaoBT,
    comparaExclusaoBT,
    registraInclusaoTT,
    registraExclusaoTT,
    comparaExclusaoTT,
    colocaTrancaTotem,
    removeTrancaTotem,
}

