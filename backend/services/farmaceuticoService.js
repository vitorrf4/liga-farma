const {Farmaceutico} = require('../models/Farmaceutico');
const bcrypt = require("bcryptjs");
const Farmacia = require("../models/Farmacia");

class FarmaceuticoService {
    async getFarmaceuticos() {
        return await Farmaceutico.findAll();
    }

    async getFarmaceuticoPorId(id) {
        return await Farmaceutico.findOne({include: 'curriculo', where: {id: id}});
    }

    async cadastrarFarmaceutico(nome, cpf, crf, telefone, especializacao, email, senha) {
        return Farmaceutico.create({nome, cpf, crf, telefone, especializacao, email, senha});
    }

    async atualizarFarmaceutico(farmaceutico) {
        const farmaceuticoDb = await this.getFarmaceuticoPorId(farmaceutico.id);

        if (!farmaceuticoDb) {
            return false;
        }

        const emailJaExiste = await Farmacia.findOne({where: {email: farmaceutico.email}});
        if (emailJaExiste && emailJaExiste.id !== farmaceutico.id) {
            return false;
        }
        
        if (farmaceutico.senha) {
            farmaceutico.senha = await bcrypt.hash(farmaceutico.senha, 10);
        } else {
            farmaceutico.senha = farmaceuticoDb.senha;
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