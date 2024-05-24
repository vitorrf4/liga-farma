const {Contrato} = require('../models/Contrato');
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

        return Contrato.create({dataInicio, dataFim, candidaturaId, vagaId});
    }

    async candidaturaJaTemContrato(candidaturaId) {
        const candidatura = await Candidatura.findByPk(candidaturaId, {include: 'contrato'});
        return (candidatura) ? candidatura.contrato : false;
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
    }
}

module.exports = new ContratoService();