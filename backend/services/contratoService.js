const {Contrato} = require('../models/Contrato');
const {Vaga} = require('../models/Vaga');

class ContratoService {
    async getContratos() {
        return await Contrato.findAll({
            include: ['farmacia', 'farmaceutico']
        });
    }

    async getContratoPorId(id) {
        return await Contrato.findOne({
            where: {id: id},
            include: ['farmacia', 'farmaceutico']
        });
    }

    async cadastrarContrato(farmaciaId, farmaceuticoId, vagaId, dataInicio, dataFim) {
        const contrato =  Contrato.create({ 
            farmaciaId, farmaceuticoId, vagaId, dataInicio, dataFim
        });

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
        vaga.quantidadeVagas -= 1;

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