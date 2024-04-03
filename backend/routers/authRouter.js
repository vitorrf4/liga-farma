const express = require('express');
const router = express();
const Usuario = require('../models/Usuario');
const Farmaceutico = require('../models/Farmaceutico');
const Farmacia = require('../models/Farmacia');
const bcrypt = require('bcryptjs');

router.post('/cadastro', async (req, res) => {
    const { email, senha, tipo, informacoes } = req.body;

    const hashedSenha = await bcrypt.hash(senha, 10);

    let entidade;
    switch (tipo) {
        case 'EMPRESA':
            entidade = await Farmacia.create(informacoes);
            break;
        case 'PESSOA':
            entidade = await Farmaceutico.create(informacoes);
            break;
        default:
            return res.status(404).json({ error: 'Tipo de usuario invalido' });
    }

    const entidadeId = entidade.id;
    const usuario = await Usuario.create({ email, senha: hashedSenha, tipo, entidadeId }); // Use the hashed password

    return res.status(200).json(usuario);
});

router.post('/login', (req, res) => {
});

router.get('/usuarios', async (req, res) => {
    return res.status(200).json(await Usuario.findAll());
});

module.exports = router;