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
    const usuario = await Usuario.create({ email, senha: hashedSenha, tipo, entidadeId });

    return res.status(200).json(usuario);
});

router.post('/login', async (req, res) => {
    try {
        const {email, senha} = req.body;
        const usuario = await Usuario.findOne({where: {email: email}});

        if (!usuario) {
            return res.status(404).json({error: 'Credenciais inválidas'});
        }

        const senhaMatch = await bcrypt.compare(senha, usuario.senha);

        if (!senhaMatch) {
            return res.status(401).json({error: 'Credenciais inválidas'});
        }
        
        delete usuario.dataValues.senha;
        
        const usuarioJson = usuario.dataValues;
        
        switch (usuarioJson.tipo) {
            case 'EMPRESA':
                const farmacia = await Farmacia.findByPk(usuario.entidadeId);
                usuarioJson.informacoes = farmacia;
                break;
            case 'PESSOA':
                const farmaceutico = await Farmaceutico.findByPk(usuario.entidadeId);
                usuarioJson.informacoes = farmaceutico;
                break;
        }

        return res.status(200).json(usuarioJson);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Erro do servidor'});
    }
});

module.exports = router;