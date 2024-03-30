const Contrato = require('../models/Contrato');

class ContratoService {
    async getContratos() {
        return await Contrato.findAll();
    }

    async getContratoPorId(id) {
        const contrato = await Contrato.findOne({ where: { id: id } });

        if (!contrato) {
            return null;
        }

        return contrato;
    }

    async cadastrarContrato(farmaciaId, farmaceuticoId, dataInicio, dataFim) {
        return Contrato.create({ 
            farmacia_id: farmaciaId, idFarmaceutico: farmaceuticoId, dataInicio, dataFim
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