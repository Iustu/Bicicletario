'use strict'

const log = require('../utils/logUtils');
const axios = require('axios');
const stripe = require('stripe')('sk_test_51NN4YADiqgi4sgZFfMLPTurD8wFmFLJ9wCZx4GlWEaBJ0FmpEUPvDJpGCLlxHlNOOXwV7jjdqThZ4BZI8GUpy2G900YA5TNuDa');
const uuid = require('uuid');
const enviarEmail = require('../services/enviarEmailService');
const historicoCobrancas = require('../historicoCobrancas');
const getCiclistasApi = require("../apis/getCiclistasApi");

let infoPagamentoCiclista;

const realizarCobranca = async (valor, ciclistaId) => {
    log.info("Iniciando a função realizarCobrança");

    const valorEmCentavos = (valor*100);
    const horaSolicitacao = new Date().toISOString();

    try {
        infoPagamentoCiclista = await getCiclistaInfo(ciclistaId);

        const customerId = await createCustomer(infoPagamentoCiclista.email, infoPagamentoCiclista.nome);
        const cardId = await addCardToCustomer(customerId, 'tok_visa');
        const charge = await chargeCustomer(customerId, cardId, valorEmCentavos);
        console.log('Pagamento efetuado');

        await enviarEmail.enviarEmail(infoPagamentoCiclista.email, 'Recibo Transação Bicicletário', charge.receipt_url);
        const message = await buildResponse("PAGA", valor, ciclistaId, horaSolicitacao, false);
        historicoCobrancas.cobrancas.push(message);
        return { statusCode: 200, message };

    } catch (err) {
        log.error({
            statusCode: err.statusCode,
            statusMessage: err.message
        }, 'Erro no processo de cobrança do usuário.');
        return { statusCode: 422, message: "Dados Inválidos" };
    }
};

const getCiclistaInfo = async (ciclistaId) => {
    log.info("Acessando banco de ciclistas");
    const ciclistas = await getCiclistasApi.getCiclistas();
    const ciclista = ciclistas.data.find(c => c.id === ciclistaId);
    return {
        nome: ciclista.nome,
        email: ciclista.email,
        meioDePagamento: ciclista.meioDePagamento
    };
};

const createCustomer = async (email, name) => {
    try {
        const customer = await stripe.customers.create({
            email,
            name,
        });

        return customer.id;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao criar o cliente');
    }
};

const addCardToCustomer = async (customerId, tokenId) => {
    try {
        const card = await stripe.customers.createSource(customerId, {
            source: tokenId
        });

        return card.id;
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao adicionar o cartão ao cliente');
    }
};

const chargeCustomer = async (customerId, tokenId, amount, email) => {
    try {
        return await stripe.charges.create({
            amount: amount,
            currency: 'brl',
            customer: customerId,
            source: tokenId,
        });
    } catch (error) {
        console.log(error);
        throw new Error('Erro ao cobrar o cliente');
    }
};


const buildResponse = async (status, valor, ciclista, horaSolicitacao, incluiCartao) => {
    const response = {
        id: uuid.v4(),
        status,
        horaSolicitacao,
        horaFinalizacao: new Date().toISOString(),
        valor,
        ciclista
    }
    if(incluiCartao) {
        response.ultimos4Digitos = infoPagamentoCiclista.meioDePagamento.numero.slice(-4);
        response.email = infoPagamentoCiclista.email;
    }
    return response;
};

module.exports = {
    realizarCobranca,
    createCustomer,
    addCardToCustomer,
    chargeCustomer,
    buildResponse,
}