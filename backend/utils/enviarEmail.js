const nodemailer = require('nodemailer');
const usuario = process.env.EMAIL_USER;
const senha = process.env.EMAIL_PASSWORD;

const smtpConfig = {
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: usuario,
        pass: senha
    }
};

class EmailSender {
    constructor() {
        this.transporter = nodemailer.createTransport(smtpConfig);
    }

    async enviarEmail(destinatario, assunto, mensagem) {
        const mailOptions = {
            from: usuario,
            to: destinatario,
            subject: assunto,
            html: mensagem
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailSender(smtpConfig);