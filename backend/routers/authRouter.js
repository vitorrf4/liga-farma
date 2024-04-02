const express = require('express');
const router = express();
const Usuario = require('../models/Usuario');

router.post('/cadastro', async (req, res) => {
    const {email, senha, tipo} = req.body;

    const usuario = await Usuario.create({email, senha, tipo});

    return res.status(200).json(usuario);
});

router.post('/login', (req, res) => {
    
});

router.get('/usuarios', async (req, res) => {
    return res.status(200).json(await Usuario.findAll());
});

module.exports = router;