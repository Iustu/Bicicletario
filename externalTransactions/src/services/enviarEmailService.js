'use strict'

const log = require('../utils/logUtils');
const nodemailer = require('nodemailer');
const axios = require('axios');

const EMAIL_BICICLETARIO = process.env.EMAIL_BICICLETARIO || "bicicletariogrupoa@gmail.com";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "xpnbyaknodstgici";
const REGEX_TIMEOUT = process.env.REGEX_TIMEOUT || 5000;

const enviarEmail = async (request, reply) => {
    log.info("Iniciando a funçao enviarEmail");

    const { email, assunto, mensagem } = request.body;
    const isValid = await validateEmailFormat(email);

    if (!isValid) {
        log.error("Formato de email invalido");
        return reply.status(422).send("Email com formato invalido");
    }

    const emailValidated = await validateEmail(email);

    if(emailValidated){
        const mailOptions = {
            from: EMAIL_BICICLETARIO,
            to: email,
            subject: assunto,
            text: mensagem
        };

        return transporter.sendMail(mailOptions)
            .then(response => {
                log.info(response.response);
                return reply.status(200).send("Envio de email solicitado");

            }).catch(err => {
                log.error({
                    status: err.response ? err.response.status : err.code,
                    statusText: err.response ? err.response.statusText : err.message
                }, "Error trying to send email");
                return reply.status(500).send("Erro na api de envio de emails");
            });
    } else if (!emailValidated){
        return reply.status(404).send("Email invalido");
    } else {
        return reply.status(500).send(emailValidated);
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_BICICLETARIO,
        pass: EMAIL_PASSWORD
    }
});

const validateEmail = async (email) => {
    const apiKey = '6MUMNPAB5397UVBPYOSM';
    const response = await axios.get(`https://api.mailboxvalidator.com/v1/validation/single?key=${apiKey}&email=${email}`);

    if (response.status === 200) {
        const result = response.data;

        return (result.is_verified === 'True');
    } else {
        return 'Erro na api de verificação de emails';
    }
};

const validateEmailFormat = async (email) => {
    return new Promise((resolve, reject) => {
        const emailRegex = new RegExp(/^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})$/, "gm");

        const timer = setTimeout(() => {
            resolve(false); // Timeout reached, return false indicating invalid format
        }, REGEX_TIMEOUT);

        const result = emailRegex.test(email);

        clearTimeout(timer);
        resolve(result); // Resolve with the result of the regex evaluation
    });
};

module.exports = {
    enviarEmail,
}