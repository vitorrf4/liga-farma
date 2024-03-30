const Vaga = require('../models/Vaga');

class VagaService {
    async getVagas() {
        return await Vaga.findAll();
    }

    async getVagaPorId(id) {
        const vaga = await Vaga.findOne({ where: { id: id } });

        if (!vaga) {
            return null;
        }

        return vaga;
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