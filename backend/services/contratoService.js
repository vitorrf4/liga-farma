const Contrato = require('../models/Contrato');

class ContratoService {
    async getContratos() {
        return await Contrato.findAll({
            include: ['farmacia', 'farmaceutico']
        });
    }

    async getContratoPorId(id) {
        const contrato = await Contrato.findOne({ 
            where: { id: id },
            include: ['farmacia', 'farmaceutico']
        });

        if (!contrato) {
            return null;
        }

        return contrato;
    }

    async cadastrarContrato(farmaciaId, farmaceuticoId, vagaId, dataInicio, dataFim) {
        return Contrato.create({ 
            farmaciaId, farmaceuticoId, vagaId, dataInicio, dataFim
        });
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