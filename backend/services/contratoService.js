const {Contrato} = require('../models/Contrato');
const {Vaga} = require('../models/Vaga');

class ContratoService {
    async getContratos() {
        return await Contrato.findAll({
            include: ['farmacia', 'vaga']
        });
    }

    async getContratoPorId(id) {
        return await Contrato.findOne({
            where: {id: id},
            include: ['farmacia', 'vaga']
        });
    }

    async cadastrarContrato(json) {
        const {farmaciaId, candidaturaId, vagaId, dataInicio, dataFim} = json;
        
        const contrato =  Contrato.create({farmaciaId, candidaturaId, vagaId, dataInicio, dataFim});

        const vagasAtualizadas = await this.atualizarQuantidadeVagas(vagaId);
        if (!vagasAtualizadas) {
            return null;
        }
        
        return contrato;
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