'use strict';

const log = require("../utils/logUtils");
const { buildResponse, realizarCobranca } = require('../services/realizarCobrancaService');
let { devedores, cobrancasReprocessadasSucesso } = require('../filaCobranca');
const enviarEmail = require('../services/enviarEmailService');

const processaFilaCobrancas = async () => {
    log.info("Iniciando a função para processar a fila de cobranças");
    try {
        if(devedores.length === 0){
            return { statusCode: 200, message: "Não há cobranças pendentes a serem feitas" };
        }
        const horaSolicitacao = new Date().toISOString();

        for (const cobranca of devedores) {
           log.info(`Cobrando ${cobranca.valor} reais o ciclista ${cobranca.ciclista}`);
           await realizarCobranca(cobranca.valor, cobranca.ciclista)
               .then( async () => {
                   const response = await buildResponse("PAGA", cobranca.valor, cobranca.ciclista, horaSolicitacao, true);
                   const msg = `BICICLETISTA! 
                                Estamos passando para avisar que foi feita uma cobrança de R$ ${cobranca.valor} reais, no cartão de final ${response.ultimos4Digitos} referente ao seu último aluguel.`
                   await enviarEmail.enviarEmail(response.email, "Cobrança atrasada", msg);
                   cobrancasReprocessadasSucesso.push(response);
               });
        }
        //Remover da lista os ciclistas que já quitaram a divida. Em caso de erro ele continua na lista.
        devedores = devedores.filter(cobranca => !cobrancasReprocessadasSucesso.some(cobrado => cobrado.valor === cobranca.valor && cobrado.ciclista === cobranca.ciclista));

        console.log(cobrancasReprocessadasSucesso);
        return { statusCode: 200, message: cobrancasReprocessadasSucesso };

    } catch (err) {
        return { statusCode: 422, message: "Dados Inválidos" };
    }
};

module.exports = {
    processaFilaCobrancas,
}