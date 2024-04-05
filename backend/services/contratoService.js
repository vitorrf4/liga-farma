const {Contrato} = require('../models/Contrato');
const {Vaga} = require('../models/Vaga');
const {Candidatura} = require('../models/Candidatura');

class ContratoService {
    async getContratos() {
        return await Contrato.findAll({
            include: ['candidatura', 'vaga']
        });
    }

    async getContratoPorId(id) {
        return await Contrato.findOne({
            where: {id: id},
            include: ['candidatura', 'vaga']
        });
    }
    
    async cadastrarContrato(json) {
        const {candidaturaId, vagaId, dataInicio, dataFim} = json;
        if (await this.candidaturaJaTemContrato(candidaturaId)) {
            return null;
        }
        
        const contrato =  Contrato.create({dataInicio, dataFim, candidaturaId, vagaId});

        const vagasAtualizadas = await this.atualizarQuantidadeVagas(vagaId);
        if (!vagasAtualizadas) {
            return null;
        }
        
        return contrato;
    }

    async candidaturaJaTemContrato(candidaturaId) {
        const candidatura = await Candidatura.findByPk(candidaturaId, {include: 'contrato'});
        return candidatura.contrato;
    }
    
    async atualizarQuantidadeVagas(vagaId) {
        const vaga = await Vaga.findByPk(vagaId);
        if (vaga.quantidadeVagas <= 0) {
            return false;
        }

        await vaga.decrement('quantidadeVagas');
        await vaga.save();
        
        return true;
    }

    async atualizarContrato(contrato) {
        const contratoDb = await this.getContratoPorId(contrato.id);

        if (!contratoDb) {
            return false;
        }

        await Contrato.update(
            contrato,
            { where: { id: contrato.id } }
        );

        return true;
    }
}

module.exports = new ContratoService();