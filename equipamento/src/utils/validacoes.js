function passaNullBicicleta(marca,modelo,ano, numero){
    return !(marca == null || modelo == null || ano == null || numero==null);
}
function passaEmptyBicicleta(marca,modelo,ano,numero){
    return !(marca == "" || modelo == "" || ano == "" || numero=="");
}
function passaNullTotem(localizacao,descricao){
    return !(localizacao == null || descricao == null);
}
function passaEmptyTotem(localizacao,descricao){
    return !(localizacao == "" || descricao == "");
}
function passaNullTranca(localizacao,modelo,anoFabricacao,numero){
    return !(localizacao == null || modelo == null || anoFabricacao == null || numero==null);
}
function passaEmptyTranca(localizacao,modelo,anoFabricacao,numero){
    return !(localizacao == "" || modelo == "" || anoFabricacao == "" || numero=="");
}

module.exports = {
    passaNullBicicleta,
    passaEmptyBicicleta,
    passaNullTotem,
    passaEmptyTotem,
    passaNullTranca,
    passaEmptyTranca,
}