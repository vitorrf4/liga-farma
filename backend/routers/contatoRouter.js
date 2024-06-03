const express = require('express');
const router = express.Router();
const emailUtil = require('../utils/enviarEmail');
const emailContato = process.env.EMAIL_USER_CONTATO;

router.post('/', async (req, res) => {
    try {
        const contato = req.body;

        await emailUtil.enviarEmail(emailContato, 'Contato', `
            <h1>Contato</h1>
            <p>Nome: ${contato.nome}</p>
            <p>Email: ${contato.email}</p>
            <p>Assunto: ${contato.assunto}</p>
            <p>Mensagem: ${contato.mensagem}</p>
        `);

        return res.status(200).json({message: 'Email enviado com sucesso'});
    } catch (error) {
        console.log(error);
        return res.status(500).send('Erro ao enviar email');
    }
});

module.exports = router;