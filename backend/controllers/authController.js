const Usuario = require('../models/Usuario');
const {Farmaceutico} = require('../models/Farmaceutico');
const Farmacia = require('../models/Farmacia');
const bcrypt = require('bcryptjs');

class AuthController {
    async cadastrarUsuario(req, res) {
        const {tipo, informacoes} = req.body;

        informacoes.senha = await bcrypt.hash(informacoes.senha, 10);

        let entidade;
        switch (tipo) {
            case 'EMPRESA':
                entidade = await Farmacia.create(informacoes);
                break;
            case 'PESSOA':
                entidade = await Farmaceutico.create(informacoes);
                break;
            default:
                return res.status(400).json({error: 'Tipo de usuario invalido'});
        }
        
        const usuario = {
            tipo: tipo,
            informacoes: entidade
        }
        
        return res.status(200).json(usuario);
    }

    async logarUsuario(req, res) {
        try {
            const {email, senha} = req.body;
            let entidade = await Farmaceutico.findOne({where: {email: email}});
            let tipo = 'PESSOA';
                
            if (!entidade) {
                entidade = await Farmacia.findOne({where: {email: email}});
                tipo = 'EMPRESA';
            }
            
            if (!entidade) {
                return res.status(404).json({error: 'Credenciais inválidas'});
            }

            const senhaMatch = await bcrypt.compare(senha, entidade.senha);
            if (!senhaMatch) {
                return res.status(401).json({error: 'Credenciais inválidas'});
            }
            
            delete entidade.senha;
            
            const usuario = {
                tipo: tipo, 
                informacoes: entidade
            };
            
            return res.status(200).json(usuario);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Erro do servidor'});
        }
    }
}

module.exports = new AuthController();