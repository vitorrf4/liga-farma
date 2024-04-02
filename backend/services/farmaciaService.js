const Farmacia = require('../models/Farmacia');

class FarmaciaService {
    async getFarmacia() {
        return await Farmacia.findAll({include: 'farmacia'});
    }

    async getFarmaciaPorId(id) {
        return await Farmacia.findOne({where: id, include: 'farmacia'});
    }

    async cadastrarFarmacia(nome, cnpj, endereco, email, senha, telefone) {
        return Farmacia.create({nome, cnpj, endereco, email, senha, telefone});
    }

    async atualizarFarmacia(farmaceutico) {
        const farmaciaDb = await this.getFarmaciaPorId(farmaceutico.id);

        if (!farmaciaDb) {
            return false;
        }

        await Farmacia.update(
            farmaceutico,
            { where: { id: farmaceutico.id } }
        );

        return true;
    }

    async deletarFarmacia(id) {
        return Farmacia.destroy({
            where: { id: id }
        });
    }
}

module.exports = new FarmaciaService();