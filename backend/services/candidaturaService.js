const Candidatura = require('../models/Candidatura');

class CandidaturaService {
    async getCandidaturas() {
        return await Candidatura.findAll();
    }

    async getCandidaturaPorId(id) {
        return await Candidatura.findOne({where: {id: id}});
    }

    async cadastrarCandidatura(vagaId, farmaceuticoId, mensagem) {
        // TODO verificar quantidade de vagas antes de cadastrar
        return Candidatura.create({vagaId, farmaceuticoId, mensagem});
    }

    async atualizarCandidatura(candidatura) {
        const candidaturaDb = await this.getCandidaturaPorId(candidatura.id);

        if (!candidaturaDb) {
            return false;
        }

        await Candidatura.update(
            candidatura,
            { where: { id: candidatura.id } }
        );

        return true;
    }

    async deletarCandidatura(id) {
        return Candidatura.destroy({
            where: { id: id }
        });
    }
}

module.exports = new CandidaturaService();