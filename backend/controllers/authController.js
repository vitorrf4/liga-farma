const {Farmaceutico} = require('../models/Farmaceutico');
const Farmacia = require('../models/Farmacia');
const Email = require('../util/enviarEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {logger} = require("sequelize/lib/utils/logger");
const clientUrl = process.env.FRONT_URL;
const secret = process.env.SECRET;

class AuthController {
    async cadastrarUsuario(req, res) {
        const {tipo, informacoes} = req.body;

        informacoes.senha = await bcrypt.hash(informacoes.senha, 10);
        
        if (await this.emailJaExiste(informacoes.email)) {
            return res.status(400).json({error: 'Informações inválidas'});
        }

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

        delete entidade.dataValues.senha;
        const usuario = {
            tipo: tipo,
            informacoes: entidade.dataValues
        }
        
        return res.status(200).json(usuario);
    }
    
    async emailJaExiste(email) {
        let entidade = await Farmaceutico.findOne({where: {email: email}});
        if (entidade) 
            return true;
        
        return await Farmacia.findOne({where: {email: email}});
    }

    async logarUsuario(req, res) {
        try {
            const {email, senha} = req.body;
            let entidade = await Farmaceutico.scope('comSenha').findOne(
                {where: {email: email},
                include: 'curriculo'
            });
            let tipo = 'PESSOA';
                
            if (!entidade) {
                entidade = await Farmacia.scope('comSenha').findOne({where: {email: email}});
                tipo = 'EMPRESA';
            }
            
            if (!entidade) {
                return res.status(404).json({error: 'Credenciais inválidas'});
            }

            const senhaMatch = await bcrypt.compare(senha, entidade.senha);
            if (!senhaMatch) {
                return res.status(401).json({error: 'Credenciais inválidas'});
            }
            
            delete entidade.dataValues.senha;
            const token = jwt.sign({ id: entidade.id }, secret);

            const usuario = {
                tipo: tipo, 
                informacoes: entidade.dataValues,
                token: token
            };
            
            return res.status(200).json(usuario);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Erro do servidor'});
        }
    }
    
    async criarLinkResetSenha(req, res) {
        const { email } = req.body;
        
        let tipo = 'PESSOA';
        let entidade = await Farmaceutico.findOne({where: {email: email}});
        if (!entidade) {
            entidade = await Farmacia.findOne({where: {email: email}});
            tipo = 'EMPRESA';
        }
        
        if (!entidade) {
            return res.status(404).json({error: 'Entidade com esse email não existe'});
        }

        const token = jwt.sign({id: entidade.id, tipo: tipo}, secret, {
            expiresIn: '10m'
        });

        const link = `${clientUrl}/redefinir-senha?token=${token}&id=${entidade.id}`;
        const body = `<h2>Liga Farma</h2> Link para resetar sua senha: ${link}`;
        await Email.enviarEmail(email, 'Redefinição de Senha', body);
        
        return res.status(200).send();
    }
    
    async resetarSenha(req, res) {
        const { token, id, senha } = req.body;
        
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, secret);
        } catch(err) {
            return res.status(403).json({error: 'Token inválido'});
        }
        
        if (decodedToken.id !== id) {
            return res.status(400).json({error: 'Token incompatível com usuário'});
        }
        const hashedSenha = await bcrypt.hash(senha, 10);
        
        let camposAtualizado = 0;
        if (decodedToken.tipo === 'EMPRESA') {
            camposAtualizado = await Farmacia.update(
                {senha: hashedSenha},
                {where: {id: decodedToken.id}}
            )
        } else if (decodedToken.tipo === 'PESSOA') {
            camposAtualizado = await Farmaceutico.update(
                {senha: hashedSenha},
                {where: {id: id}}
            )
        }
        
        if (camposAtualizado[0] <= 0) {
            return res.status(400).json({error: 'Usuário não existente'});
        }
        
        return res.status(200).send();
    }
}

module.exports = new AuthController();