'use strict'

const log = require('../utils/logUtils');
const nodemailer = require('nodemailer');
const axios = require('axios');

const EMAIL_BICICLETARIO = process.env.EMAIL_BICICLETARIO || "bicicletariogrupoa@gmail.com";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "xpnbyaknodstgici";

const enviarEmail = async (email, assunto, mensagem) => {
    log.info("Iniciando a função enviarEmail");

    const validateEmailResponse = await validateEmail(email);

    if(validateEmailResponse === true){
        const mailOptions = {
            from: EMAIL_BICICLETARIO,
            to: email,
            subject: assunto,
            text: mensagem
        };

        return transporter.sendMail(mailOptions)
            .then(response => {
                log.info(response.response);
                return { statusCode: 200, message: "Envio de email solicitado" };
            });
    } else {
        return validateEmailResponse;
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
    const apiKey = 'NUVGBKYM2KP6X3LAESYN';
    const response = await axios.get(`https://api.mailboxvalidator.com/v1/validation/single?key=${apiKey}&email=${email}`);

    if (response.status === 200) {
        const result = response.data;

        if(result.is_syntax === 'False') {
            return { statusCode: 422, message: "Email com formato inválido" };
        }
        if(result.is_verified === 'True') {
            return true;
        } else {
            return { statusCode: 404, message: "Email inválido" };
        }
    } else {
        return { statusCode: 500, message: "Erro na api de validação" };
    }
};

module.exports = {
    enviarEmail,
}