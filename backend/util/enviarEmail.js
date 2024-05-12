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

    sendEmail(to, subject, body) {
        const mailOptions = {
            from: 'liga.farma.contato@gmail.com',
            to: to,
            subject: subject,
            html: body
        };

        // Sending email
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
}


module.exports = new EmailSender(smtpConfig);