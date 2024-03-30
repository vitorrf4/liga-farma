const Farmaceutico = require('../models/Farmaceutico');

class FarmaceuticoService {
    async getFarmaceuticos() {
        return await Farmaceutico.findAll();
    }

    async getFarmaceuticoPorId(id) {
        const farmaceutico = await Farmaceutico.findOne({ where: { id: id } });

        if (!farmaceutico) {
            return null;
        }
        
        return farmaceutico;
    }

    async cadastrarFarmaceutico(nome, cpf, crf, telefone, especializacao, email, senha) {
        return Farmaceutico.create({nome, cpf, crf, telefone, especializacao, email, senha});
    }

    async atualizarFarmaceutico(farmaceutico) {
        const farmaceuticoDb = await this.getFarmaceuticoPorId(farmaceutico.id);

        if (!farmaceuticoDb) {
            return false;
        }

        await Farmaceutico.update(
            farmaceutico,
            { where: { id: farmaceutico.id } }
        );

        return true;
    }

    async deletarFarmaceutico(id) {
        return Farmaceutico.destroy({
            where: { id: id }
        });
    }
}

module.exports = new FarmaceuticoService();