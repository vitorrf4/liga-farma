const service = require('../services/farmaciaService');

class FarmaciaController {
    async getFarmacias(req, res) {
        try {
            const farmacias = await service.getFarmacia();

            res.status(200).json(farmacias);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async getFarmaciaPorId(req, res) {
        try {
            const { id } = req.params;
            const farmacia = await service.getFarmaciaPorId(id);

            if (!farmacia) {
                return res.status(404).json({error: "Farmácia não encontrado"});
            }

            res.status(200).json(farmacia);
        } catch (error) {
            console.error('Erro na busca:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async cadastraFarmacia(req, res) {
        try {
            const { nome, cnpj, endereco, email, senha, telefone } = req.body;

            const novaFarmacia = await service.cadastrarFarmacia(
                nome, cnpj, endereco, email, senha, telefone);

            res.status(201).json(novaFarmacia);
        } catch (error) {
            console.error('Erro na criação:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async atualizarFarmacia(req, res) {
        try {
            const farmacia = req.body;

            const farmaciaFoiAtualizada = await service.atualizarFarmacia(farmacia);

            if (!farmaciaFoiAtualizada) {
                return res.status(404).json({error: "Farmácia não encontrado"});
            }

            return res.status(204).send();
        } catch(error) {
            console.error('Erro na alteracao:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }

    async deletarFarmacia(req, res) {
        try {
            const { id } = req.params;

            const farmaciasDeletadas = await service.deletarFarmacia(id);
            if (farmaciasDeletadas <= 0) {
                return res.status(404).json({error: "Farmácia não encontrado"});
            }

            res.status(204).send();
        } catch(error) {
            console.error('Erro na exclusão:', error);
            res.status(500).json({ error: 'Ocorreu um erro na aplicação.' });
        }
    }
}

module.exports = new FarmaciaController();