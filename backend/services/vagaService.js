const Vaga = require('../models/Vaga');

class VagaService {
    async getVagas() {
        return await Vaga.findAll({include: 'farmacia'});
    }

    async getVagaPorId(id) {
        return await Vaga.findOne({
            where: {id: id},
            include: 'farmacia'
        });
    }

    async cadastrarVaga(titulo, descricao, salario, estado,
                        cidade, quantidadeVagas, farmaciaId) {
        return Vaga.create({titulo, descricao, salario, 
            estado, cidade, quantidadeVagas, farmaciaId});
    }

    async atualizarVaga(vaga) {
        const vagaDb = await this.getVagaPorId(vaga.id);

        if (!vagaDb) {
            return false;
        }

        await Vaga.update(
            vaga,
            { where: { id: vaga.id } }
        );

        return true;
    }

    async deletarVaga(id) {
        return Vaga.destroy({
            where: { id: id }
        });
    }
}

module.exports = new VagaService();