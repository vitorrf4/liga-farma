const Farmacia = require('../models/Farmacia');
const bcrypt = require("bcryptjs");

class FarmaciaService {
    async getFarmacia() {
        return await Farmacia.findAll();
    }

    async getFarmaciaPorId(id) {
        return await Farmacia.findOne({where: {id: id}});
    }

    async cadastrarFarmacia(nome, cnpj, endereco, descricao, email, senha, telefone) {
        return Farmacia.create({nome, cnpj, endereco, descricao, email, senha, telefone});
    }

    async atualizarFarmacia(farmacia) {
        const farmaciaDb = await this.getFarmaciaPorId(farmacia.id);

        if (!farmaciaDb) {
            return false;
        }

        if (farmacia.senha) {
            farmacia.senha = await bcrypt.hash(farmacia.senha, 10);
        } else {
            farmacia.senha = farmaciaDb.senha;
        }

        await Farmacia.update(
            farmacia,
            { where: { id: farmacia.id } }
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