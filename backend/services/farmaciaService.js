const Farmaceutico = require('../models/Farmacia');

class FarmaciaService {
    async getFarmacia() {
        return await Farmaceutico.findAll();
    }

    async getFarmaciaPorId(id) {
        const farmacia = await Farmaceutico.findOne({ where: { id: id } });

        if (!farmacia) {
            return null;
        }

        return farmacia;
    }

    async cadastrarFarmacia(nome, cnpj, endereco, email, senha, telefone) {
        return Farmaceutico.create({nome, cnpj, endereco, email, senha, telefone});
    }

    async atualizarFarmacia(farmaceutico) {
        const farmaciaDb = await this.getFarmaciaPorId(farmaceutico.id);

        if (!farmaciaDb) {
            return false;
        }

        await Farmaceutico.update(
            farmaceutico,
            { where: { id: farmaceutico.id } }
        );

        return true;
    }

    async deletarFarmacia(id) {
        return Farmaceutico.destroy({
            where: { id: id }
        });
    }
}

module.exports = new FarmaciaService();